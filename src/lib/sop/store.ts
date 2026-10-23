import "server-only";
import { sql } from "drizzle-orm";
import { getDb } from "@/lib/db";
import type { Mission } from "@/lib/types";

/**
 * SOP 임무 저장 — 여러 사람이 같은 상황을 동시에 실행해도 서로의 변경을 덮어쓰지 않도록
 * 「읽고 → 고치고 → 통째로 쓰기」 대신 DB 안에서 해당 임무만 바꾼다 (UPDATE 한 문장 = 행 잠금 후 최신 값 기준).
 */

const missionsOf = sql`coalesce(sop->'missions', '[]'::jsonb)`;

async function run(id: string, missionsExpr: ReturnType<typeof sql>) {
  const db = await getDb();
  await db.execute(
    sql`update situations set sop = jsonb_set(sop, '{missions}', ${missionsExpr}), updated_at = now() where id = ${id} and sop is not null`,
  );
}

/** 임무 하나를 통째로 바꾼다. 없으면 끝에 추가 */
export async function putMission(id: string, m: Mission) {
  const v = JSON.stringify(m);
  await run(
    id,
    sql`case when exists (select 1 from jsonb_array_elements(${missionsOf}) e where e->>'id' = ${m.id})
      then (select jsonb_agg(case when e->>'id' = ${m.id} then ${v}::jsonb else e end order by o)
            from jsonb_array_elements(${missionsOf}) with ordinality t(e, o))
      else ${missionsOf} || jsonb_build_array(${v}::jsonb) end`,
  );
}

/** 임무 하나의 일부 항목만 고친다 (예: 전파 결과) */
export async function patchMission(id: string, missionId: string, patch: Partial<Mission>) {
  const v = JSON.stringify(patch);
  await run(
    id,
    sql`(select coalesce(jsonb_agg(case when e->>'id' = ${missionId} then e || ${v}::jsonb else e end order by o), '[]'::jsonb)
         from jsonb_array_elements(${missionsOf}) with ordinality t(e, o))`,
  );
}

export async function removeMission(id: string, missionId: string) {
  await run(
    id,
    sql`(select coalesce(jsonb_agg(e order by o), '[]'::jsonb)
         from jsonb_array_elements(${missionsOf}) with ordinality t(e, o) where e->>'id' <> ${missionId})`,
  );
}

/** 순서 바꾸기 — 목록에 없는 임무(그 사이 다른 사람이 추가한 것)는 뒤에 그대로 둔다 */
export async function orderMissions(id: string, ids: string[]) {
  await run(
    id,
    sql`(select coalesce(jsonb_agg(e order by coalesce(
           (select x.n from jsonb_array_elements_text(${JSON.stringify(ids)}::jsonb) with ordinality x(v, n) where x.v = e->>'id'),
           100000 + o)), '[]'::jsonb)
         from jsonb_array_elements(${missionsOf}) with ordinality t(e, o))`,
  );
}

/**
 * SOP 초기화 — 임무 구성은 두고 실행 상태만 실행 전으로 (한 문장).
 * 임무: 상태 대기, 착수·완료 시각·조치결과·피해조치·수행 확인·전파 결과를 비움. 머리: 실행 시작·종료·첫 종료 시각을 지움
 */
export async function resetSopRun(id: string) {
  const db = await getDb();
  await db.execute(sql`update situations set sop = jsonb_set(
      sop - 'startedAt' - 'endedAt' - 'firstEndedAt',
      '{missions}',
      (select coalesce(jsonb_agg(
         (e - 'startedAt' - 'doneAt')
           || jsonb_build_object('status', 'todo', 'result', '', 'damage', '',
                'details', case when jsonb_typeof(e->'details') = 'array'
                  then coalesce((select jsonb_agg((d - 'doneAt') || '{"done": false}'::jsonb order by k)
                                 from jsonb_array_elements(e->'details') with ordinality u(d, k)), '[]'::jsonb)
                  else '[]'::jsonb end)
           || case when jsonb_typeof(e->'propagation') = 'object'
                then jsonb_build_object('propagation', (e->'propagation') - 'sentAt' - 'sentTo') else '{}'::jsonb end
         order by o), '[]'::jsonb)
       from jsonb_array_elements(${missionsOf}) with ordinality t(e, o))),
      updated_at = now()
    where id = ${id} and sop is not null`);
}

/** SOP 머리 항목(startedAt·endedAt 등)만 고친다. null 이면 지운다 */
export async function patchSopHead(id: string, patch: Record<string, string | null>) {
  const set = Object.fromEntries(Object.entries(patch).filter(([, v]) => v !== null));
  const drop = Object.keys(patch).filter((k) => patch[k] === null);
  let expr = sql`(sop || ${JSON.stringify(set)}::jsonb)`;
  for (const k of drop) expr = sql`(${expr} - ${k}::text)`;
  const db = await getDb();
  await db.execute(sql`update situations set sop = ${expr}, updated_at = now() where id = ${id} and sop is not null`);
}

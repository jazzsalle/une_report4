import type { Mission } from "@/lib/types";

type Bundle = {
  groups: { id: string; name: string; memberIds: string[] }[];
  contacts: { id: string; name: string; title: string }[];
  units?: { id: string; name: string }[];
};

/** 임무별 전파 대상 이름 (그룹명 + 조직 + 개별 담당자) — 흐름도 마우스 올리기용 */
export function propagationTargets(missions: Mission[], b: Bundle): Record<string, string[]> {
  const g = new Map(b.groups.map((x) => [x.id, x.name]));
  const c = new Map(b.contacts.map((x) => [x.id, `${x.name} ${x.title}`.trim()]));
  const u = new Map((b.units ?? []).map((x) => [x.id, x.name]));
  return Object.fromEntries(
    missions.map((m) => [
      m.id,
      [
        ...m.propagation.groupIds.map((id) => g.get(id)).filter(Boolean),
        ...(m.propagation.unitIds ?? []).map((id) => u.get(id)).filter(Boolean),
        ...m.propagation.contactIds.map((id) => c.get(id)).filter(Boolean),
      ] as string[],
    ]),
  );
}

/** 두 창(본 화면·분리된 SOP 창) 사이 동기화 채널 */
export const sopChannel = (situationId: string) => `r4-sop-${situationId}`;
export type SopMessage = { type: "select"; id: string } | { type: "changed" } | { type: "dock" } | { type: "hello" };

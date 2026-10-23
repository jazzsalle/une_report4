"use client";
import { useMemo, useState } from "react";
import clsx from "clsx";
import type { ContactsBundle } from "@/lib/data";
import { Card } from "@/components/ui";
import { mask, ShowNumbers } from "./ContactsView";

type Unit = ContactsBundle["units"][number];
type Contact = ContactsBundle["contacts"][number];

/** 비상연락망 — 왼쪽 조직도 목록(최상위 조직) + 오른쪽 고른 조직도 (T-01) */
export function EmergencyTree({ bundle, show, onToggleShow }: { bundle: ContactsBundle; show: boolean; onToggleShow: () => void }) {
  const { units, contacts } = bundle;
  const kids = useMemo(() => {
    const m = new Map<string | null, Unit[]>();
    units.forEach((u) => m.set(u.parentId, [...(m.get(u.parentId) ?? []), u]));
    return m;
  }, [units]);
  const people = useMemo(() => {
    const m = new Map<string, Contact[]>();
    contacts.forEach((c) => m.set(c.unitId, [...(m.get(c.unitId) ?? []), c]));
    return m;
  }, [contacts]);
  const roots = kids.get(null) ?? [];
  const [selId, setSel] = useState(roots[0]?.id ?? "");
  const root = roots.find((r) => r.id === selId) ?? roots[0];

  return (
    <div className="grid gap-6 lg:grid-cols-[300px_1fr]">
      <Card className="h-fit p-3">
        <h2 className="px-2 pb-2 pt-1 text-[19px] font-bold">조직도</h2>
        {roots.map((r) => (
          <button
            key={r.id}
            onClick={() => setSel(r.id)}
            className={clsx(
              "flex w-full items-center rounded-md px-3 py-3 text-left",
              root?.id === r.id ? "bg-primary-weak font-semibold text-primary-strong" : "hover:bg-canvas",
            )}
          >
            <span className="flex-1 truncate">{r.name}</span>
          </button>
        ))}
      </Card>
      {root && (
        <Card className="overflow-x-auto p-6">
          <div className="mb-5 flex items-center gap-3">
            <h2 className="text-[19px] font-bold">{root.name}</h2>
            <span className="ml-auto">
              <ShowNumbers show={show} onToggle={onToggleShow} />
            </span>
          </div>
          {root.kind === "hq" ? (
            <HqChart root={root} kids={kids} people={people} show={show} />
          ) : (
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
              {(kids.get(root.id) ?? []).map((u) => (
                <DeptBox key={u.id} unit={u} people={people.get(u.id) ?? []} show={show} />
              ))}
              {!(kids.get(root.id) ?? []).length && (people.get(root.id) ?? []).length > 0 && (
                <DeptBox unit={root} people={people.get(root.id) ?? []} show={show} />
              )}
            </div>
          )}
        </Card>
      )}
    </div>
  );
}

/** 재난안전대책본부: 본부 → 반 → 과 조직도 */
function HqChart({
  root,
  kids,
  people,
  show,
}: {
  root: Unit;
  kids: Map<string | null, Unit[]>;
  people: Map<string, Contact[]>;
  show: boolean;
}) {
  const teams = kids.get(root.id) ?? [];
  return (
    <div className="mx-auto w-fit min-w-full">
      <div className="flex justify-center">
        <div className="w-[420px] rounded-xl border-2 border-primary bg-primary-weak/60 p-5 text-center">
          <div className="text-[20px] font-bold text-primary-strong">{root.name}</div>
          <div className="mt-3 space-y-1.5">
            {(people.get(root.id) ?? []).map((p) => (
              <PersonLine key={p.id} p={p} show={show} center />
            ))}
          </div>
        </div>
      </div>
      {teams.length > 0 && (
        <>
          <div className="mx-auto h-8 w-0.5 bg-primary-line" />
          <div className="relative flex justify-center gap-5">
            {teams.length > 1 && (
              <div
                className="absolute top-0 h-0.5 bg-primary-line"
                style={{
                  left: `calc(${100 / teams.length / 2}% )`,
                  right: `calc(${100 / teams.length / 2}% )`,
                }}
              />
            )}
            {teams.map((t) => (
              <div key={t.id} className="flex min-w-[230px] flex-1 flex-col items-center">
                <div className="h-6 w-0.5 bg-primary-line" />
                <div className="w-full rounded-lg bg-tab px-4 py-3 text-center text-[17px] font-bold text-white">{t.name}</div>
                <div className="mt-3 w-full space-y-3">
                  {(people.get(t.id) ?? []).length > 0 && (
                    <div className="rounded-lg border border-line bg-white p-3">
                      {(people.get(t.id) ?? []).map((p) => (
                        <PersonLine key={p.id} p={p} show={show} />
                      ))}
                    </div>
                  )}
                  {(kids.get(t.id) ?? []).map((d) => (
                    <DeptBox key={d.id} unit={d} people={people.get(d.id) ?? []} show={show} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function DeptBox({ unit, people, show }: { unit: Unit; people: Contact[]; show: boolean }) {
  return (
    <div className="rounded-lg border border-line bg-white">
      <div className="border-b border-line-weak bg-canvas px-4 py-2.5 font-bold">{unit.name}</div>
      <div className="space-y-1.5 px-4 py-3">
        {people.length ? people.map((p) => <PersonLine key={p.id} p={p} show={show} />) : <div className="text-mute">-</div>}
      </div>
    </div>
  );
}

function PersonLine({ p, show, center }: { p: Contact; show: boolean; center?: boolean }) {
  return (
    <div className={clsx("flex flex-wrap items-baseline gap-x-2", center && "justify-center")}>
      <span className="font-semibold">{p.name}</span>
      <span className="text-[15px] text-sub">{p.title}</span>
      <a href={`tel:${p.phone}`} className="ml-auto text-[15px] tabular-nums text-primary-strong hover:underline">
        {mask(p.phone, show)}
      </a>
    </div>
  );
}

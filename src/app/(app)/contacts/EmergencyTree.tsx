"use client";
import { useMemo, useState } from "react";
import clsx from "clsx";
import { ChevronDown } from "lucide-react";
import type { ContactsBundle } from "@/lib/data";
import { mask } from "./ContactsView";

type Unit = ContactsBundle["units"][number];
type Contact = ContactsBundle["contacts"][number];

/** 비상연락망 — 본부 → 실무반 → 부서 → 담당자 트리 */
export function EmergencyTree({ bundle, show }: { bundle: ContactsBundle; show: boolean }) {
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
  const hq = roots.filter((r) => r.kind === "hq");
  const others = roots.filter((r) => r.kind !== "hq");

  return (
    <div className="space-y-10">
      {hq.map((root) => {
        const teams = kids.get(root.id) ?? [];
        return (
          <section key={root.id} className="card overflow-x-auto p-8">
            <div className="mx-auto w-fit min-w-full">
              {/* 본부 */}
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
                        <div className="w-full rounded-lg bg-tab px-4 py-3 text-center text-[17px] font-bold text-white">
                          {t.name}
                        </div>
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
          </section>
        );
      })}

      {others.map((root) => (
        <AgencySection key={root.id} root={root} kids={kids} people={people} show={show} />
      ))}
    </div>
  );
}

function AgencySection({
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
  const [open, setOpen] = useState(true);
  const list = kids.get(root.id) ?? [];
  return (
    <section className="card p-6">
      <button onClick={() => setOpen((v) => !v)} className="flex w-full items-center gap-2 text-left">
        <h3 className="text-[20px] font-bold">{root.name}</h3>
        <span className="text-sub">{list.length}곳</span>
        <ChevronDown size={20} className={clsx("ml-auto transition", open && "rotate-180")} />
      </button>
      {open && (
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {list.map((u) => (
            <DeptBox key={u.id} unit={u} people={people.get(u.id) ?? []} show={show} />
          ))}
        </div>
      )}
    </section>
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

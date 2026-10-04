"use client";
import { useEffect, useMemo, useState } from "react";
import clsx from "clsx";
import { ChevronRight } from "lucide-react";
import { Button, Modal } from "@/components/ui";
import type { ContactsBundle } from "@/lib/data";

export function resolveRecipients(b: ContactsBundle, contactIds: string[], groupIds: string[]) {
  const ids = new Set(contactIds);
  b.groups.filter((g) => groupIds.includes(g.id)).forEach((g) => g.memberIds.forEach((i) => ids.add(i)));
  const unit = new Map(b.units.map((u) => [u.id, u.name]));
  return b.contacts.filter((c) => ids.has(c.id)).map((c) => ({ ...c, unit: unit.get(c.unitId) ?? "" }));
}

export function RecipientPicker({
  open,
  onClose,
  contacts: b,
  contactIds,
  groupIds,
  onSave,
}: {
  open: boolean;
  onClose: () => void;
  contacts: ContactsBundle;
  contactIds: string[];
  groupIds: string[];
  onSave: (contactIds: string[], groupIds: string[]) => void;
}) {
  const [c, setC] = useState<string[]>(contactIds);
  const [g, setG] = useState<string[]>(groupIds);
  const [openUnits, setOpenUnits] = useState<Set<string>>(new Set());
  useEffect(() => {
    if (open) {
      setC(contactIds);
      setG(groupIds);
      setOpenUnits(new Set(b.units.filter((u) => !u.parentId).map((u) => u.id)));
    }
  }, [open, contactIds, groupIds, b.units]);

  const children = useMemo(() => {
    const m = new Map<string | null, typeof b.units>();
    b.units.forEach((u) => m.set(u.parentId, [...(m.get(u.parentId) ?? []), u]));
    return m;
  }, [b]);
  const people = useMemo(() => {
    const m = new Map<string, typeof b.contacts>();
    b.contacts.forEach((p) => m.set(p.unitId, [...(m.get(p.unitId) ?? []), p]));
    return m;
  }, [b]);

  const descendants = (uid: string): string[] => [
    ...(people.get(uid) ?? []).map((p) => p.id),
    ...(children.get(uid) ?? []).flatMap((u) => descendants(u.id)),
  ];
  const toggle = (ids: string[], on: boolean) =>
    setC((cur) => (on ? Array.from(new Set([...cur, ...ids])) : cur.filter((x) => !ids.includes(x))));

  const Unit = ({ id, depth }: { id: string; depth: number }) => {
    const u = b.units.find((x) => x.id === id)!;
    const all = descendants(id);
    const checked = all.length > 0 && all.every((x) => c.includes(x));
    const isOpen = openUnits.has(id);
    return (
      <div>
        <div className="flex items-center gap-2 py-2" style={{ paddingLeft: depth * 22 }}>
          <button
            className="text-sub"
            onClick={() =>
              setOpenUnits((s) => {
                const n = new Set(s);
                if (n.has(id)) n.delete(id);
                else n.add(id);
                return n;
              })
            }
          >
            <ChevronRight size={18} className={clsx("transition", isOpen && "rotate-90")} />
          </button>
          <label className="flex items-center gap-2 font-semibold">
            <input
              type="checkbox"
              className="h-5 w-5 accent-primary"
              checked={checked}
              disabled={!all.length}
              onChange={(e) => toggle(all, e.target.checked)}
            />
            {u.name}
          </label>
        </div>
        {isOpen && (
          <>
            {(people.get(id) ?? []).map((p) => (
              <label key={p.id} className="flex items-center gap-2 py-1.5" style={{ paddingLeft: depth * 22 + 50 }}>
                <input
                  type="checkbox"
                  className="h-5 w-5 accent-primary"
                  checked={c.includes(p.id)}
                  onChange={(e) => toggle([p.id], e.target.checked)}
                />
                <span>{p.name}</span>
                <span className="text-sub">{p.title}</span>
              </label>
            ))}
            {(children.get(id) ?? []).map((ch) => (
              <Unit key={ch.id} id={ch.id} depth={depth + 1} />
            ))}
          </>
        )}
      </div>
    );
  };

  const total = resolveRecipients(b, c, g).length;

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="전파 담당자 선택"
      width={720}
      footer={
        <>
          <span className="mr-auto self-center text-sub">총 {total}명</span>
          <Button onClick={onClose}>취소</Button>
          <Button variant="primary" onClick={() => onSave(c, g)}>
            적용
          </Button>
        </>
      }
    >
      <h4 className="mb-2 font-bold">전파그룹</h4>
      <div className="mb-6 flex flex-wrap gap-2">
        {b.groups.map((gr) => (
          <button
            key={gr.id}
            onClick={() => setG((cur) => (cur.includes(gr.id) ? cur.filter((x) => x !== gr.id) : [...cur, gr.id]))}
            className={clsx(
              "h-11 rounded-md border px-4 font-medium",
              g.includes(gr.id) ? "border-primary bg-primary-weak text-primary-strong" : "border-line hover:border-primary",
            )}
          >
            {gr.name} {gr.memberIds.length}
          </button>
        ))}
      </div>
      <h4 className="mb-1 font-bold">조직</h4>
      <div>
        {(children.get(null) ?? []).map((u) => (
          <Unit key={u.id} id={u.id} depth={0} />
        ))}
      </div>
    </Modal>
  );
}

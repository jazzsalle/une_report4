"use client";
import { useMemo, useState } from "react";
import clsx from "clsx";
import { Building2, Check, ChevronRight, Search, User, Users, X } from "lucide-react";
import { Button, Modal, Tabs } from "@/components/ui";
import type { ContactsBundle } from "@/lib/data";
import { recipientIds, resolveRecipients, unitMembers, unitTree, type Selection } from "@/lib/sop/recipients";

export { resolveRecipients };

type Way = "group" | "unit" | "person";
type Sel = Required<Selection>;

const WAYS: { value: Way; label: string }[] = [
  { value: "group", label: "전파그룹" },
  { value: "unit", label: "조직·부서" },
  { value: "person", label: "담당자" },
];

function toggle(list: string[], id: string) {
  return list.includes(id) ? list.filter((x) => x !== id) : [...list, id];
}

/** 선택된 대상 칩 (그룹·조직·담당자) — 팝업 위쪽과 임무 화면에서 함께 쓴다 */
export function SelectionChips({
  b,
  sel,
  onRemove,
}: {
  b: ContactsBundle;
  sel: Selection;
  onRemove?: (kind: keyof Selection, id: string) => void;
}) {
  const items = [
    ...b.groups.filter((g) => sel.groupIds.includes(g.id)).map((g) => ({ kind: "groupIds" as const, id: g.id, icon: Users, label: g.name })),
    ...b.units.filter((u) => (sel.unitIds ?? []).includes(u.id)).map((u) => ({ kind: "unitIds" as const, id: u.id, icon: Building2, label: u.name })),
    ...b.contacts
      .filter((c) => sel.contactIds.includes(c.id))
      .map((c) => ({ kind: "contactIds" as const, id: c.id, icon: User, label: `${c.name} ${c.title}`.trim() })),
  ];
  if (!items.length) return null;
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((it) => (
        <span key={it.kind + it.id} className="flex h-10 items-center gap-1.5 rounded-md border border-primary bg-primary-weak pl-3 pr-2 font-medium text-primary-strong">
          <it.icon size={16} />
          {it.label}
          {onRemove && (
            <button className="rounded p-0.5 hover:bg-white" aria-label={`${it.label} 빼기`} onClick={() => onRemove(it.kind, it.id)}>
              <X size={16} />
            </button>
          )}
          {!onRemove && <span className="w-1" />}
        </span>
      ))}
    </div>
  );
}

function UnitRow({
  b,
  id,
  depth,
  sel,
  openSet,
  onOpen,
  onToggle,
  inherited,
}: {
  b: ContactsBundle;
  id: string;
  depth: number;
  sel: Sel;
  openSet: Set<string>;
  onOpen: (id: string) => void;
  onToggle: (id: string) => void;
  inherited: boolean;
}) {
  const u = b.units.find((x) => x.id === id)!;
  const kids = b.units.filter((x) => x.parentId === id);
  const count = unitMembers(b, id).length;
  const on = inherited || sel.unitIds.includes(id);
  const isOpen = openSet.has(id);
  return (
    <div>
      <div className="flex items-center gap-2 border-b border-line-weak py-1.5" style={{ paddingLeft: depth * 24 }}>
        <button className={clsx("rounded p-1 text-sub hover:bg-canvas", !kids.length && "invisible")} onClick={() => onOpen(id)} aria-label="펼치기">
          <ChevronRight size={18} className={clsx("transition", isOpen && "rotate-90")} />
        </button>
        <label className={clsx("flex flex-1 cursor-pointer items-center gap-3 py-1.5", inherited && "cursor-default opacity-70")}>
          <input type="checkbox" className="h-5 w-5 accent-primary" checked={on} disabled={inherited || !count} onChange={() => onToggle(id)} />
          <span className="font-semibold">{u.name}</span>
          <span className="ml-auto pr-2 text-sub">{count}명</span>
        </label>
      </div>
      {isOpen &&
        kids.map((k) => (
          <UnitRow key={k.id} b={b} id={k.id} depth={depth + 1} sel={sel} openSet={openSet} onOpen={onOpen} onToggle={onToggle} inherited={on} />
        ))}
    </div>
  );
}

export function RecipientPicker({
  open,
  onClose,
  contacts: b,
  value,
  recommended,
  hint = [],
  onSave,
}: {
  open: boolean;
  onClose: () => void;
  contacts: ContactsBundle;
  value: Selection;
  /** 매뉴얼 전파대상과 비슷한 전파그룹 */
  recommended: Set<string>;
  /** 임무의 매뉴얼 전파대상 원문 — 창 제목 아래에 그대로 보인다 (P-19) */
  hint?: string[];
  onSave: (v: Sel) => void;
}) {
  const [sel, setSel] = useState<Sel>({ contactIds: [], groupIds: [], unitIds: [] });
  const [way, setWay] = useState<Way>("group");
  const [q, setQ] = useState("");
  const [openSet, setOpenSet] = useState<Set<string>>(new Set());
  const [prevOpen, setPrevOpen] = useState(false);
  if (open !== prevOpen) {
    setPrevOpen(open);
    if (open) {
      setSel({ contactIds: value.contactIds, groupIds: value.groupIds, unitIds: value.unitIds ?? [] });
      setQ("");
      setWay("group");
      setOpenSet(new Set(b.units.filter((u) => !u.parentId).map((u) => u.id)));
    }
  }

  const unitName = useMemo(() => new Map(b.units.map((u) => [u.id, u.name])), [b.units]);
  const people = useMemo(() => {
    const k = q.trim();
    return b.contacts.filter((c) => !k || `${c.name} ${c.title} ${c.duty} ${unitName.get(c.unitId) ?? ""}`.includes(k));
  }, [b.contacts, q, unitName]);

  const total = resolveRecipients(b, sel).length;
  // 그룹·조직으로 이미 들어간 사람
  const viaOthers = recipientIds(b, { ...sel, contactIds: [] });
  const toggleUnit = (id: string) =>
    setSel((s) => {
      if (s.unitIds.includes(id)) return { ...s, unitIds: s.unitIds.filter((x) => x !== id) };
      // 상위 조직을 고르면 하위 조직 개별 선택은 정리
      const sub = new Set(unitTree(b.units, id));
      return { ...s, unitIds: [...s.unitIds.filter((x) => !sub.has(x)), id] };
    });

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="전파 대상 선택"
      width={760}
      footer={
        <>
          <span className="mr-auto self-center text-[18px] font-bold">수신 {total}명</span>
          <Button onClick={onClose}>취소</Button>
          <Button variant="primary" onClick={() => onSave(sel)}>
            적용
          </Button>
        </>
      }
    >
      {hint.length > 0 && (
        <div className="mb-4 rounded-md bg-canvas px-4 py-3">
          <span className="font-medium text-sub">매뉴얼 전파대상</span> · {hint.join(", ")}
        </div>
      )}
      {b.contacts.length === 0 && (
        <div className="mb-4 rounded-md bg-warning-weak px-4 py-4 text-warning">
          등록된 연락망이 없습니다.{" "}
          <a href="/contacts" className="font-bold underline">
            연락망 관리
          </a>
        </div>
      )}
      <div className="mb-4 empty:hidden">
        <SelectionChips b={b} sel={sel} onRemove={(kind, id) => setSel((s) => ({ ...s, [kind]: s[kind].filter((x) => x !== id) }))} />
      </div>
      <Tabs value={way} onChange={setWay} items={WAYS} />
      <div className="scroll-thin mt-4 h-[46vh] min-h-[280px] overflow-y-auto pr-1">
        {way === "group" && (
          <div className="grid gap-2 sm:grid-cols-2">
            {b.groups.map((g) => {
              const on = sel.groupIds.includes(g.id);
              return (
                <button
                  key={g.id}
                  onClick={() => setSel((s) => ({ ...s, groupIds: toggle(s.groupIds, g.id) }))}
                  className={clsx(
                    "flex h-14 items-center gap-2 rounded-md border px-4 text-left font-semibold transition",
                    on ? "border-primary bg-primary text-white" : "border-line bg-white hover:border-primary",
                  )}
                >
                  {on ? <Check size={18} /> : <Users size={18} className="text-sub" />}
                  {g.name}
                  {!on && recommended.has(g.id) && <span className="shrink-0 whitespace-nowrap rounded bg-warning-weak px-1.5 text-[14px] text-warning">추천</span>}
                  <span className={clsx("ml-auto font-medium", on ? "text-white" : "text-sub")}>{g.memberIds.length}명</span>
                </button>
              );
            })}
            {!b.groups.length && <div className="py-10 text-center text-sub">등록된 전파그룹이 없습니다</div>}
          </div>
        )}
        {way === "unit" && (
          <div>
            {b.units
              .filter((u) => !u.parentId)
              .map((u) => (
                <UnitRow
                  key={u.id}
                  b={b}
                  id={u.id}
                  depth={0}
                  sel={sel}
                  openSet={openSet}
                  inherited={false}
                  onOpen={(id) => setOpenSet((s) => new Set(toggle(Array.from(s), id)))}
                  onToggle={toggleUnit}
                />
              ))}
          </div>
        )}
        {way === "person" && (
          <div>
            <div className="relative mb-3">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-sub" />
              <input className="input pl-10" placeholder="이름·직위·부서 검색" value={q} onChange={(e) => setQ(e.target.value)} />
            </div>
            <div className="divide-y divide-line-weak">
              {people.map((p) => (
                <label key={p.id} className={clsx("flex items-center gap-3 py-2.5", viaOthers.has(p.id) ? "opacity-60" : "cursor-pointer")}>
                  <input
                    type="checkbox"
                    className="h-5 w-5 accent-primary"
                    checked={viaOthers.has(p.id) || sel.contactIds.includes(p.id)}
                    disabled={viaOthers.has(p.id)}
                    onChange={() => setSel((s) => ({ ...s, contactIds: toggle(s.contactIds, p.id) }))}
                  />
                  <span className="font-semibold">{p.name}</span>
                  <span>{p.title}</span>
                  <span className="ml-auto text-sub">{unitName.get(p.unitId)}</span>
                </label>
              ))}
              {!people.length && <div className="py-10 text-center text-sub">찾는 담당자가 없습니다</div>}
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
}

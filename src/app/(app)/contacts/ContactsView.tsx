"use client";
import { useMemo, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import clsx from "clsx";
import { ChevronRight, Eye, EyeOff, Pencil, Plus, Trash2 } from "lucide-react";
import { Button, Card, Empty, Modal, Tabs } from "@/components/ui";
import type { ContactsBundle } from "@/lib/data";
import {
  deleteContact,
  deleteGroup,
  deleteUnit,
  saveContact,
  saveGroup,
  saveUnit,
  type ContactInput,
} from "@/app/actions/contacts";
import { EmergencyTree } from "./EmergencyTree";

type Tab = "people" | "groups" | "tree";
type Unit = ContactsBundle["units"][number];
type Contact = ContactsBundle["contacts"][number];
type Group = ContactsBundle["groups"][number];

export function mask(phone: string, show: boolean) {
  return show ? phone : phone.replace(/^(\d{3})-(\d{3,4})-(\d{4})$/, "$1-****-$3");
}

export function ContactsView({
  orgId,
  orgs,
  bundle,
  canManage,
}: {
  orgId: string;
  orgs: { id: string; name: string }[];
  bundle: ContactsBundle;
  canManage: boolean;
}) {
  const router = useRouter();
  const [tab, setTab] = useState<Tab>("tree");
  const [show, setShow] = useState(false);

  return (
    <main className="mx-auto max-w-[1600px] px-6 py-8">
      <div className="mb-4 flex flex-wrap items-center gap-3">
        <h1 className="text-[28px] font-bold">연락망</h1>
        {orgs.length > 0 && (
          <select className="input ml-2 w-48" value={orgId} onChange={(e) => router.push(`/contacts?org=${e.target.value}`)}>
            {orgs.map((o) => (
              <option key={o.id} value={o.id}>
                {o.name}
              </option>
            ))}
          </select>
        )}
        <Button variant="ghost" size="sm" className="ml-auto" onClick={() => setShow((v) => !v)}>
          {show ? <EyeOff size={18} /> : <Eye size={18} />} {show ? "번호 가리기" : "번호 보기"}
        </Button>
      </div>
      <Tabs
        value={tab}
        onChange={setTab}
        items={[
          { value: "tree", label: "비상연락망" },
          { value: "people", label: "조직·담당자" },
          { value: "groups", label: "전파그룹" },
        ]}
      />
      <div className="mt-6">
        {tab === "tree" && <EmergencyTree bundle={bundle} show={show} />}
        {tab === "people" && <People orgId={orgId} bundle={bundle} canManage={canManage} show={show} />}
        {tab === "groups" && <Groups orgId={orgId} bundle={bundle} canManage={canManage} />}
      </div>
    </main>
  );
}

function useRun() {
  const router = useRouter();
  const [pending, start] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const run = (fn: () => Promise<unknown>, after?: () => void) =>
    start(async () => {
      setError(null);
      try {
        await fn();
        after?.();
        router.refresh();
      } catch (e) {
        setError(e instanceof Error ? e.message : "오류가 발생했습니다.");
      }
    });
  return { pending, error, run, setError };
}

function People({ orgId, bundle, canManage, show }: { orgId: string; bundle: ContactsBundle; canManage: boolean; show: boolean }) {
  const { units, contacts } = bundle;
  const roots = units.filter((u) => !u.parentId);
  const [sel, setSel] = useState<string>(roots[0]?.id ?? "");
  const [editC, setEditC] = useState<ContactInput | null>(null);
  const [editU, setEditU] = useState<{ id?: string; parentId: string | null; name: string; kind: string } | null>(null);
  const { pending, error, run, setError } = useRun();

  const childrenOf = useMemo(() => {
    const m = new Map<string | null, Unit[]>();
    units.forEach((u) => m.set(u.parentId, [...(m.get(u.parentId) ?? []), u]));
    return m;
  }, [units]);
  const desc = (id: string): string[] => [id, ...(childrenOf.get(id) ?? []).flatMap((c) => desc(c.id))];
  const unitName = new Map(units.map((u) => [u.id, u.name]));
  const list = sel ? contacts.filter((c) => desc(sel).includes(c.unitId)) : contacts;

  const UnitRow = ({ u, depth }: { u: Unit; depth: number }) => (
    <>
      <div
        onClick={() => setSel(u.id)}
        className={clsx(
          "group flex cursor-pointer items-center gap-1 rounded-md py-2 pr-2",
          sel === u.id ? "bg-primary-weak font-semibold text-primary-strong" : "hover:bg-canvas",
        )}
        style={{ paddingLeft: 12 + depth * 18 }}
      >
        {(childrenOf.get(u.id) ?? []).length > 0 ? <ChevronRight size={16} className="rotate-90 text-mute" /> : <span className="w-4" />}
        <span className="flex-1 truncate">{u.name}</span>
        {canManage && (
          <span className="invisible flex gap-0.5 group-hover:visible">
            <button className="rounded p-1 hover:bg-white" aria-label="하위 조직 추가" onClick={(e) => (e.stopPropagation(), setEditU({ parentId: u.id, name: "", kind: "dept" }))}>
              <Plus size={15} />
            </button>
            <button className="rounded p-1 hover:bg-white" aria-label="이름 수정" onClick={(e) => (e.stopPropagation(), setEditU({ id: u.id, parentId: u.parentId, name: u.name, kind: u.kind }))}>
              <Pencil size={15} />
            </button>
          </span>
        )}
      </div>
      {(childrenOf.get(u.id) ?? []).map((c) => (
        <UnitRow key={c.id} u={c} depth={depth + 1} />
      ))}
    </>
  );

  return (
    <div className="grid gap-6 lg:grid-cols-[340px_1fr]">
      <Card className="h-fit p-3">
        <div className="flex items-center justify-between px-2 pb-2 pt-1">
          <h2 className="text-[19px] font-bold">조직</h2>
          {canManage && (
            <Button size="sm" variant="ghost" onClick={() => setEditU({ parentId: null, name: "", kind: "hq" })}>
              <Plus size={16} /> 추가
            </Button>
          )}
        </div>
        {roots.map((u) => (
          <UnitRow key={u.id} u={u} depth={0} />
        ))}
      </Card>
      <Card className="p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-[19px] font-bold">
            {unitName.get(sel) ?? "전체"} <span className="ml-1 font-normal text-sub">{list.length}명</span>
          </h2>
          {canManage && sel && (
            <Button
              size="sm"
              onClick={() => setEditC({ orgId, unitId: sel, name: "", title: "", duty: "", phone: "", email: "" })}
            >
              <Plus size={16} /> 담당자 추가
            </Button>
          )}
        </div>
        {list.length === 0 ? (
          <Empty>담당자가 없습니다.</Empty>
        ) : (
          <table className="w-full text-left">
            <thead className="bg-canvas text-[15px] font-semibold text-sub">
              <tr>
                <th className="px-4 py-3">이름</th>
                <th className="px-4 py-3">직위</th>
                <th className="px-4 py-3">소속</th>
                <th className="px-4 py-3">임무</th>
                <th className="px-4 py-3">휴대전화</th>
                <th className="w-24 px-4 py-3" />
              </tr>
            </thead>
            <tbody>
              {list.map((c) => (
                <tr key={c.id} className="border-b border-line-weak">
                  <td className="px-4 py-3.5 font-medium">{c.name}</td>
                  <td className="px-4 py-3.5">{c.title}</td>
                  <td className="px-4 py-3.5 text-sub">{unitName.get(c.unitId)}</td>
                  <td className="px-4 py-3.5 text-sub">{c.duty}</td>
                  <td className="px-4 py-3.5 tabular-nums">{mask(c.phone, show)}</td>
                  <td className="px-4 py-3.5">
                    {canManage && (
                      <div className="flex justify-end gap-1">
                        <Button size="sm" variant="ghost" aria-label="수정" onClick={() => setEditC({ ...c })}>
                          <Pencil size={16} />
                        </Button>
                        <Button size="sm" variant="ghost" aria-label="삭제" disabled={pending} onClick={() => run(() => deleteContact(orgId, c.id))}>
                          <Trash2 size={16} />
                        </Button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </Card>

      <Modal
        open={!!editC}
        onClose={() => (setEditC(null), setError(null))}
        title={editC?.id ? "담당자 수정" : "담당자 추가"}
        footer={
          <>
            {error && <span className="mr-auto self-center text-danger">{error}</span>}
            <Button onClick={() => setEditC(null)}>취소</Button>
            <Button variant="primary" disabled={pending} onClick={() => run(() => saveContact(editC!), () => setEditC(null))}>
              저장
            </Button>
          </>
        }
      >
        {editC && (
          <div className="space-y-3">
            <select className="input" value={editC.unitId} onChange={(e) => setEditC({ ...editC, unitId: e.target.value })}>
              {units.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.name}
                </option>
              ))}
            </select>
            {(
              [
                ["name", "이름"],
                ["title", "직위"],
                ["duty", "임무"],
                ["phone", "휴대전화 (010-0000-0000)"],
                ["email", "이메일"],
              ] as const
            ).map(([k, l]) => (
              <input key={k} className="input" placeholder={l} value={editC[k]} onChange={(e) => setEditC({ ...editC, [k]: e.target.value })} />
            ))}
          </div>
        )}
      </Modal>

      <Modal
        open={!!editU}
        onClose={() => (setEditU(null), setError(null))}
        title={editU?.id ? "조직 수정" : "조직 추가"}
        width={480}
        footer={
          <>
            {error && <span className="mr-auto self-center text-danger">{error}</span>}
            {editU?.id && (
              <Button variant="danger" disabled={pending} onClick={() => run(() => deleteUnit(orgId, editU.id!), () => setEditU(null))}>
                삭제
              </Button>
            )}
            <Button onClick={() => setEditU(null)}>취소</Button>
            <Button variant="primary" disabled={pending} onClick={() => run(() => saveUnit({ ...editU!, orgId }), () => setEditU(null))}>
              저장
            </Button>
          </>
        }
      >
        {editU && (
          <div className="space-y-3">
            <input className="input" placeholder="조직명" autoFocus value={editU.name} onChange={(e) => setEditU({ ...editU, name: e.target.value })} />
            <select className="input" value={editU.kind} onChange={(e) => setEditU({ ...editU, kind: e.target.value })}>
              <option value="hq">본부</option>
              <option value="team">실무반</option>
              <option value="dept">부서</option>
              <option value="agency">유관기관</option>
            </select>
          </div>
        )}
      </Modal>
    </div>
  );
}

function Groups({ orgId, bundle, canManage }: { orgId: string; bundle: ContactsBundle; canManage: boolean }) {
  const { groups, contacts, units } = bundle;
  const [edit, setEdit] = useState<{ id?: string; name: string; memberIds: string[] } | null>(null);
  const { pending, error, run, setError } = useRun();
  const byId = new Map(contacts.map((c) => [c.id, c]));
  const unitName = new Map(units.map((u) => [u.id, u.name]));

  return (
    <div>
      {canManage && (
        <div className="mb-4 flex justify-end">
          <Button onClick={() => setEdit({ name: "", memberIds: [] })}>
            <Plus size={18} /> 그룹 추가
          </Button>
        </div>
      )}
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {groups.map((g: Group) => (
          <Card key={g.id} className="p-6">
            <div className="mb-3 flex items-center gap-2">
              <h3 className="text-[19px] font-bold">{g.name}</h3>
              <span className="text-sub">{g.memberIds.length}명</span>
              {canManage && (
                <div className="ml-auto flex gap-1">
                  <Button size="sm" variant="ghost" aria-label="수정" onClick={() => setEdit({ id: g.id, name: g.name, memberIds: g.memberIds })}>
                    <Pencil size={16} />
                  </Button>
                  <Button size="sm" variant="ghost" aria-label="삭제" disabled={pending} onClick={() => run(() => deleteGroup(orgId, g.id))}>
                    <Trash2 size={16} />
                  </Button>
                </div>
              )}
            </div>
            <ul className="space-y-1.5">
              {g.memberIds.slice(0, 8).map((id) => {
                const c = byId.get(id);
                return c ? (
                  <li key={id} className="flex gap-2">
                    <span className="font-medium">{c.name}</span>
                    <span className="text-sub">{c.title}</span>
                    <span className="ml-auto truncate text-[15px] text-mute">{unitName.get(c.unitId)}</span>
                  </li>
                ) : null;
              })}
              {g.memberIds.length > 8 && <li className="text-sub">외 {g.memberIds.length - 8}명</li>}
            </ul>
          </Card>
        ))}
      </div>
      <Modal
        open={!!edit}
        onClose={() => (setEdit(null), setError(null))}
        title={edit?.id ? "전파그룹 수정" : "전파그룹 추가"}
        width={680}
        footer={
          <>
            {error && <span className="mr-auto self-center text-danger">{error}</span>}
            <Button onClick={() => setEdit(null)}>취소</Button>
            <Button variant="primary" disabled={pending} onClick={() => run(() => saveGroup({ ...edit!, orgId }), () => setEdit(null))}>
              저장
            </Button>
          </>
        }
      >
        {edit && (
          <div>
            <input className="input mb-4" placeholder="그룹명" value={edit.name} onChange={(e) => setEdit({ ...edit, name: e.target.value })} />
            {units
              .filter((u) => contacts.some((c) => c.unitId === u.id))
              .map((u) => (
                <div key={u.id} className="mb-3">
                  <div className="mb-1 font-semibold">{u.name}</div>
                  <div className="flex flex-wrap gap-x-5 gap-y-1">
                    {contacts
                      .filter((c) => c.unitId === u.id)
                      .map((c) => (
                        <label key={c.id} className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            className="h-5 w-5 accent-primary"
                            checked={edit.memberIds.includes(c.id)}
                            onChange={(e) =>
                              setEdit({
                                ...edit,
                                memberIds: e.target.checked ? [...edit.memberIds, c.id] : edit.memberIds.filter((x) => x !== c.id),
                              })
                            }
                          />
                          {c.name} <span className="text-sub">{c.title}</span>
                        </label>
                      ))}
                  </div>
                </div>
              ))}
          </div>
        )}
      </Modal>
    </div>
  );
}

export type { Contact };

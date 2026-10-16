"use client";
import { useMemo, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import clsx from "clsx";
import { ChevronRight, Eye, EyeOff, Pencil, Plus, Sparkles, Trash2, UsersRound } from "lucide-react";
import { Button, Card, Empty, Modal, MoreMenu, Tabs } from "@/components/ui";
import type { ContactsBundle } from "@/lib/data";
import {
  deleteContact,
  deleteGroup,
  deleteUnit,
  saveContact,
  saveGroup,
  saveUnit,
  seedExampleContacts,
  type ContactInput,
} from "@/app/actions/contacts";
import { EmergencyTree } from "./EmergencyTree";
import { ContactsExcel } from "./ContactsExcel";
import { ManualContacts } from "./ManualContacts";

/** 「매뉴얼에서 가져오기」(T3Q API-04) — 당분간 엑셀 업로드로만 연락망을 구성하므로 숨긴다. 다시 쓰려면 true */
const SHOW_MANUAL_IMPORT = false;

type Tab = "people" | "groups" | "tree";
type Unit = ContactsBundle["units"][number];
type Contact = ContactsBundle["contacts"][number];
type Group = ContactsBundle["groups"][number];

/** 조직 트리 순서(본부 → 반 → 과, 같은 단계는 sort 순)로 조직 id → 순번 */
function treeRank(units: Unit[]) {
  const kids = new Map<string | null, Unit[]>();
  units.forEach((u) => kids.set(u.parentId, [...(kids.get(u.parentId) ?? []), u]));
  const rank = new Map<string, number>();
  const walk = (pid: string | null) =>
    (kids.get(pid) ?? []).forEach((u) => {
      rank.set(u.id, rank.size);
      walk(u.id);
    });
  walk(null);
  return rank;
}

/** 담당자를 조직 트리 순서로 (같은 조직 안은 원래 순서) */
function byTree(list: Contact[], rank: Map<string, number>) {
  return list
    .map((c, i) => ({ c, i }))
    .sort((a, b) => (rank.get(a.c.unitId) ?? 1e9) - (rank.get(b.c.unitId) ?? 1e9) || a.i - b.i)
    .map((x) => x.c);
}

export function mask(phone: string, show: boolean) {
  return show ? phone : phone.replace(/^(\d{3})-(\d{3,4})-(\d{4})$/, "$1-****-$3");
}

/** 「번호 보기 / 가리기」 — 번호가 있는 탭의 오른쪽 영역 제목 줄에 둔다 (T-04) */
export function ShowNumbers({ show, onToggle }: { show: boolean; onToggle: () => void }) {
  return (
    <Button size="sm" onClick={onToggle}>
      {show ? <EyeOff size={18} /> : <Eye size={18} />} {show ? "번호 가리기" : "번호 보기"}
    </Button>
  );
}

/** 삭제 확인 창 */
type Confirm = { title: string; message: string; action: () => Promise<unknown> } | null;

function ConfirmDelete({
  confirm,
  onClose,
  pending,
  error,
  run,
}: {
  confirm: Confirm;
  onClose: () => void;
  pending: boolean;
  error: string | null;
  run: (fn: () => Promise<unknown>, after?: () => void) => void;
}) {
  return (
    <Modal
      open={!!confirm}
      onClose={onClose}
      title={confirm?.title ?? ""}
      width={460}
      footer={
        <>
          {error && <span className="mr-auto self-center text-danger">{error}</span>}
          <Button onClick={onClose}>취소</Button>
          <Button variant="danger" disabled={pending} onClick={() => confirm && run(confirm.action, onClose)}>
            삭제
          </Button>
        </>
      }
    >
      <p className="text-[18px] leading-relaxed">{confirm?.message}</p>
    </Modal>
  );
}

export function ContactsView({
  orgId,
  orgName,
  orgs,
  bundle,
  canManage,
}: {
  orgId: string;
  orgName: string;
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
        <div className="ml-auto flex flex-wrap gap-2">
          {canManage && SHOW_MANUAL_IMPORT && <ManualContacts orgId={orgId} />}
          {canManage && <ContactsExcel orgId={orgId} orgName={orgName} bundle={bundle} />}
        </div>
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
        {tab === "tree" &&
          (bundle.units.length === 0 ? (
            <EmptyGuide orgId={orgId} orgName={orgName} bundle={bundle} canManage={canManage} onDirect={() => setTab("people")} />
          ) : (
            <EmergencyTree bundle={bundle} show={show} onToggleShow={() => setShow((v) => !v)} />
          ))}
        {tab === "people" && (
          <People orgId={orgId} bundle={bundle} canManage={canManage} show={show} onToggleShow={() => setShow((v) => !v)} />
        )}
        {tab === "groups" && <Groups orgId={orgId} bundle={bundle} canManage={canManage} />}
      </div>
    </main>
  );
}

/** 연락망이 비었을 때 — 시작 방법 3가지 안내 */
function EmptyGuide({
  orgId,
  orgName,
  bundle,
  canManage,
  onDirect,
}: {
  orgId: string;
  orgName: string;
  bundle: ContactsBundle;
  canManage: boolean;
  onDirect: () => void;
}) {
  const { pending, error, run } = useRun();
  return (
    <Card className="px-8 py-10">
      <div className="flex items-center gap-3">
        <UsersRound size={30} className="text-primary" />
        <h2 className="text-[22px] font-bold">등록된 연락망이 없습니다</h2>
      </div>
      <p className="mt-2 text-[17px] text-sub">연락망을 넣으면 SOP 상황전파에서 전파 대상으로 고를 수 있습니다.</p>
      {canManage ? (
        <div className="mt-7 grid gap-4 lg:grid-cols-3">
          <div className="rounded-lg border-2 border-primary bg-primary-weak/50 p-6">
            <div className="text-[19px] font-bold">1. 예시 조직으로 시작</div>
            <p className="mt-2 text-[16px] text-sub">재난안전대책본부 › 자연재난과 · 재난안전상황실 · OOO과, 유관기관 5곳(소방·경찰·기상청·군·한전)과 담당자 11명(홍OO 등)을 넣습니다. 이름·번호를 실제 담당자로 고쳐 쓰세요.</p>
            <Button variant="primary" className="mt-4" disabled={pending} onClick={() => run(() => seedExampleContacts(orgId))}>
              <Sparkles size={18} /> {pending ? "넣는 중" : "예시 조직 넣기"}
            </Button>
            {error && <p className="mt-2 text-danger">{error}</p>}
          </div>
          <div className="rounded-lg border border-line p-6">
            <div className="text-[19px] font-bold">2. {SHOW_MANUAL_IMPORT ? "매뉴얼·엑셀로" : "엑셀로"} 한 번에</div>
            <p className="mt-2 text-[16px] text-sub">
              {SHOW_MANUAL_IMPORT ? "재난 매뉴얼의 비상연락망(유관기관 등)을 가져오거나, 엑셀 양식을 채워 올립니다." : "엑셀 양식을 내려받아 채운 뒤 올립니다."}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {SHOW_MANUAL_IMPORT && <ManualContacts orgId={orgId} big />}
              <ContactsExcel orgId={orgId} orgName={orgName} bundle={bundle} big />
            </div>
          </div>
          <div className="rounded-lg border border-line p-6">
            <div className="text-[19px] font-bold">3. 화면에서 직접</div>
            <p className="mt-2 text-[16px] text-sub">조직·담당자 탭에서 조직을 만들고 담당자를 한 명씩 추가합니다.</p>
            <Button className="mt-4" onClick={onDirect}>
              <Plus size={18} /> 조직·담당자 추가
            </Button>
          </div>
        </div>
      ) : (
        <p className="mt-6 text-[17px]">기관 관리자가 연락망을 등록하면 여기에 보입니다.</p>
      )}
    </Card>
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

function People({
  orgId,
  bundle,
  canManage,
  show,
  onToggleShow,
}: {
  orgId: string;
  bundle: ContactsBundle;
  canManage: boolean;
  show: boolean;
  onToggleShow: () => void;
}) {
  const { units, contacts } = bundle;
  const roots = units.filter((u) => !u.parentId);
  const [sel, setSel] = useState<string>(roots[0]?.id ?? "");
  const [editC, setEditC] = useState<ContactInput | null>(null);
  const [editU, setEditU] = useState<{ id?: string; parentId: string | null; name: string; kind: string } | null>(null);
  const [confirm, setConfirm] = useState<Confirm>(null);
  const { pending, error, run, setError } = useRun();

  const childrenOf = useMemo(() => {
    const m = new Map<string | null, Unit[]>();
    units.forEach((u) => m.set(u.parentId, [...(m.get(u.parentId) ?? []), u]));
    return m;
  }, [units]);
  const desc = (id: string): string[] => [id, ...(childrenOf.get(id) ?? []).flatMap((c) => desc(c.id))];
  const unitName = new Map(units.map((u) => [u.id, u.name]));
  const rank = useMemo(() => treeRank(units), [units]);
  const list = byTree(sel ? contacts.filter((c) => desc(sel).includes(c.unitId)) : contacts, rank);

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
          <span onClick={(e) => e.stopPropagation()}>
            <MoreMenu
              label={`${u.name} 더보기`}
              items={[
                { label: "하위 조직 추가", icon: <Plus size={18} />, onClick: () => setEditU({ parentId: u.id, name: "", kind: "dept" }) },
                { label: "수정", icon: <Pencil size={18} />, onClick: () => setEditU({ id: u.id, parentId: u.parentId, name: u.name, kind: u.kind }) },
                {
                  label: "삭제",
                  icon: <Trash2 size={18} />,
                  danger: true,
                  onClick: () => {
                    setError(null);
                    setConfirm({ title: "조직 삭제", message: `「${u.name}」 조직을 삭제할까요?`, action: () => deleteUnit(orgId, u.id) });
                  },
                },
              ]}
            />
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
            <Button size="sm" onClick={() => setEditU({ parentId: null, name: "", kind: "hq" })}>
              <Plus size={16} /> 조직 추가
            </Button>
          )}
        </div>
        {roots.map((u) => (
          <UnitRow key={u.id} u={u} depth={0} />
        ))}
      </Card>
      <Card className="p-6">
        <div className="mb-4 flex items-center gap-2">
          <h2 className="mr-auto text-[19px] font-bold">
            {unitName.get(sel) ?? "전체"} <span className="ml-1 font-normal text-sub">{list.length}명</span>
          </h2>
          <ShowNumbers show={show} onToggle={onToggleShow} />
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
                <th className="w-14 px-2 py-3" />
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
                  <td className="px-2 py-2 text-right">
                    {canManage && (
                      <MoreMenu
                        label={`${c.name} 더보기`}
                        items={[
                          { label: "수정", icon: <Pencil size={18} />, onClick: () => setEditC({ ...c }) },
                          {
                            label: "삭제",
                            icon: <Trash2 size={18} />,
                            danger: true,
                            onClick: () => {
                              setError(null);
                              setConfirm({ title: "담당자 삭제", message: `「${c.name}」 담당자를 삭제할까요?`, action: () => deleteContact(orgId, c.id) });
                            },
                          },
                        ]}
                      />
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
      <ConfirmDelete confirm={confirm} onClose={() => setConfirm(null)} pending={pending} error={error} run={run} />
    </div>
  );
}

function Groups({ orgId, bundle, canManage }: { orgId: string; bundle: ContactsBundle; canManage: boolean }) {
  const { groups, contacts, units } = bundle;
  const [edit, setEdit] = useState<{ id?: string; name: string; memberIds: string[] } | null>(null);
  const { pending, error, run, setError } = useRun();
  const byId = new Map(contacts.map((c) => [c.id, c]));
  const unitName = new Map(units.map((u) => [u.id, u.name]));
  const rank = useMemo(() => treeRank(units), [units]);
  const treeUnits = [...units].sort((a, b) => (rank.get(a.id) ?? 1e9) - (rank.get(b.id) ?? 1e9));
  const membersOf = (g: Group) => byTree(g.memberIds.map((id) => byId.get(id)).filter((c): c is Contact => !!c), rank);

  const [selId, setSel] = useState(groups[0]?.id ?? "");
  const [confirm, setConfirm] = useState<Confirm>(null);
  const g = groups.find((x) => x.id === selId) ?? groups[0];
  const members = g ? membersOf(g) : [];

  // 전파그룹: 왼쪽 그룹 목록 + 오른쪽 고른 그룹 구성원 (T-01)
  return (
    <div className="grid gap-6 lg:grid-cols-[340px_1fr]">
      <Card className="h-fit p-3">
        <div className="flex items-center justify-between px-2 pb-2 pt-1">
          <h2 className="text-[19px] font-bold">전파그룹</h2>
          {canManage && (
            <Button size="sm" onClick={() => setEdit({ name: "", memberIds: [] })}>
              <Plus size={16} /> 그룹 추가
            </Button>
          )}
        </div>
        {!groups.length && <Empty>등록된 전파그룹이 없습니다.</Empty>}
        {groups.map((x: Group) => (
          <button
            key={x.id}
            onClick={() => setSel(x.id)}
            className={clsx(
              "flex w-full items-center gap-2 rounded-md px-3 py-3 text-left",
              g?.id === x.id ? "bg-primary-weak font-semibold text-primary-strong" : "hover:bg-canvas",
            )}
          >
            <span className="flex-1 truncate">{x.name}</span>
            <span className="text-sub">{x.memberIds.length}명</span>
          </button>
        ))}
      </Card>
      {g && (
        <Card className="p-6">
          <div className="mb-4 flex items-center gap-2">
            <h2 className="mr-auto text-[19px] font-bold">
              {g.name} <span className="ml-1 font-normal text-sub">{g.memberIds.length}명</span>
            </h2>
            {canManage && (
              <>
                <Button size="sm" onClick={() => setEdit({ id: g.id, name: g.name, memberIds: g.memberIds })}>
                  <Pencil size={16} /> 수정
                </Button>
                <Button
                  size="sm"
                  variant="danger"
                  onClick={() => {
                    setError(null);
                    setConfirm({
                      title: "전파그룹 삭제",
                      message: `「${g.name}」 그룹을 삭제할까요? 담당자는 연락망에 그대로 남습니다.`,
                      action: () => deleteGroup(orgId, g.id),
                    });
                  }}
                >
                  <Trash2 size={16} /> 삭제
                </Button>
              </>
            )}
          </div>
          {members.length === 0 ? (
            <Empty>구성원이 없습니다.</Empty>
          ) : (
            <table className="w-full text-left">
              <thead className="bg-canvas text-[15px] font-semibold text-sub">
                <tr>
                  <th className="px-4 py-3">이름</th>
                  <th className="px-4 py-3">직위</th>
                  <th className="px-4 py-3">소속</th>
                </tr>
              </thead>
              <tbody>
                {members.map((c) => (
                  <tr key={c.id} className="border-b border-line-weak">
                    <td className="px-4 py-3.5 font-medium">{c.name}</td>
                    <td className="px-4 py-3.5">{c.title}</td>
                    <td className="px-4 py-3.5 text-sub">{unitName.get(c.unitId)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </Card>
      )}
      <ConfirmDelete confirm={confirm} onClose={() => setConfirm(null)} pending={pending} error={error} run={run} />
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
            {treeUnits
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

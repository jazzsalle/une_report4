"use client";
import { useMemo, useState, useTransition } from "react";
import clsx from "clsx";
import { ChevronRight, ExternalLink, Plus, Send, Trash2, UserPlus, X } from "lucide-react";
import { nanoid } from "nanoid";
import { Badge, Button, Modal } from "@/components/ui";
import type { Mission } from "@/lib/types";
import type { ContactsBundle } from "@/lib/data";
import { ackDispatch, propagate, type DispatchLink } from "@/app/actions/situation";
import { FieldView } from "@/components/FieldView";
import type { DispatchRow } from "./SopWorkspace";
import QRCode from "qrcode";
import { fmtTime } from "@/lib/format";
import { MISSION_STATUS } from "./SopWorkspace";
import { RecipientPicker, resolveRecipients, SelectionChips } from "./RecipientPicker";
import { KindIcon } from "./KindIcon";
import { KIND_LABEL, missionKind } from "@/lib/sop/kind";

/** 매뉴얼 전파대상 문구와 비슷한 전파그룹 추천 */
function recommended(groups: ContactsBundle["groups"], hints: string[]) {
  const text = hints.join(" ");
  const keys: [RegExp, RegExp][] = [
    [/구·군|구군|시·군|시군|구청|군청/, /구·군|시·군/],
    [/유관|경찰|소방|기상|군부대|사단|한전|한국전력/, /유관/],
    [/시장|부시장|도지사|부지사|본부장|지휘/, /지휘부/],
    [/상황실|자연재난|재난안전|상황관리|재난공무원/, /상황관리/],
    [/산림|진화|산불/, /산불|진화/],
  ];
  const ids = new Set<string>();
  keys.forEach(([hint, group]) => {
    if (hint.test(text)) groups.filter((g) => group.test(g.name)).forEach((g) => ids.add(g.id));
  });
  return ids;
}

export function MissionDetail({
  mission: m,
  mode,
  running,
  started,
  editable,
  me,
  contacts,
  situationId,
  onChange,
  onDelete,
  onDone,
  dispatches,
  preview,
}: {
  mission: Mission;
  mode: "edit" | "run";
  running: boolean;
  started: boolean;
  /** 실행 종료 — 입력란 읽기 전용 (P-04) */
  editable: boolean;
  me: string;
  contacts: ContactsBundle;
  situationId: string;
  onChange: (m: Mission, immediate?: boolean) => void;
  onDelete: () => void;
  /** 조치 완료 후 — 다음 현재 임무로 */
  onDone?: () => void;
  dispatches: DispatchRow[];
  preview: { orgName: string; situationTitle: string };
}) {
  const [picking, setPicking] = useState(false);
  const [confirmSend, setConfirmSend] = useState(false);
  const [sendError, setSendError] = useState<string | null>(null);
  const [sent, setSent] = useState<DispatchLink[] | null>(null);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [newDetail, setNewDetail] = useState("");
  const [sending, startSend] = useTransition();
  // 발송 방법 (P-20) — 둘 다 고를 수 있고 기본은 문자
  const [ways, setWays] = useState<{ sms: boolean; email: boolean }>({ sms: true, email: false });
  const set = (patch: Partial<Mission>, immediate = false) => onChange({ ...m, ...patch }, immediate);
  const st = MISSION_STATUS[m.status];
  const recipients = useMemo(
    () => resolveRecipients(contacts, m.propagation),
    [contacts, m.propagation],
  );
  const rec = useMemo(() => recommended(contacts.groups, m.propagation.targetHint), [contacts.groups, m.propagation.targetHint]);
  const now = () => new Date().toISOString();

  const edit = editable && mode === "edit";
  const run = editable && mode === "run";
  /** 전파 내용·조치 기록을 고칠 수 있음 — SOP는 실행 종료 후에도 언제나 수정 가능 */
  const writable = editable;
  // 상황전파 영역은 상황전파 임무에만 (P-19). 이미 보낸 기록이 있으면 종류와 상관없이 보인다
  const isProp = missionKind(m) === "propagation";
  const showProp = isProp || !!m.propagation.sentAt || dispatches.length > 0;
  // 주 버튼은 흐름 순서대로 하나: 착수 → 전파 → 조치 완료 (P-18·P-19)
  const sendFirst = isProp && m.status === "doing" && !m.propagation.sentAt;
  const recGroups = contacts.groups.filter((g) => rec.has(g.id) && !m.propagation.groupIds.includes(g.id));
  const addGroup = (gid: string) =>
    set({ propagation: { ...m.propagation, groupIds: [...m.propagation.groupIds, gid] } }, true);
  // 고른 발송 방법으로 연락처가 있는 수신자만 보낸다
  const reachable = recipients.filter((r) => (ways.sms && r.phone) || (ways.email && r.email));

  const setStatus = (status: Mission["status"]) => {
    const patch: Partial<Mission> = { status };
    if (status === "doing" && !m.startedAt) patch.startedAt = now();
    if (status === "done" || status === "skipped") {
      patch.doneAt = now();
      if (!m.startedAt) patch.startedAt = now();
      if (!m.assignee) patch.assignee = me;
      // 조치결과가 비어 있으면 수행한 세부항목으로 정리
      if (status === "done" && !m.result.trim()) {
        const done = m.details.filter((d) => d.done).map((d) => d.text);
        if (done.length) patch.result = done.join("\n");
      }
    }
    if (status === "done") onDone?.();
    if (status === "todo") {
      patch.startedAt = undefined;
      patch.doneAt = undefined;
    }
    set(patch, true);
  };

  const removeTarget = (kind: "contactIds" | "groupIds" | "unitIds", id: string) =>
    set({ propagation: { ...m.propagation, [kind]: (m.propagation[kind] ?? []).filter((x) => x !== id) } }, true);

  const addDetail = () => {
    if (!newDetail.trim()) return;
    set({ details: [...m.details, { id: nanoid(6), text: newDetail.trim(), done: false }] });
    setNewDetail("");
  };

  return (
    <div className="flex h-full flex-col" data-tour="mission-detail">
      {/* 머리 — 상위 임무 이름만 (P-14) */}
      {m.group && (
        <div className="border-b border-line-weak bg-canvas px-6 py-2.5 text-[15px] font-semibold text-sub">
          [{m.group.code}] {m.group.name}
        </div>
      )}
      <div className="flex flex-wrap items-center gap-3 border-b border-line-weak px-6 py-5">
        <KindIcon kind={missionKind(m)} size={34} />
        {edit ? (
          <input
            className="min-w-0 flex-1 rounded-md border border-line px-3 py-1.5 text-[20px] font-bold outline-none focus:border-primary"
            value={m.title}
            placeholder="임무명"
            onChange={(e) => set({ title: e.target.value })}
          />
        ) : (
          <h2 className="min-w-0 flex-1 text-[21px] font-bold">{m.title}</h2>
        )}
        {m.condition && <Badge tone="orange">{m.condition}</Badge>}
        {started && <Badge tone={st.tone}>{st.label}</Badge>}
        {m.startedAt && <span className="text-[16px] text-sub">착수 {fmtTime(m.startedAt)}</span>}
        {edit && (
          <Button variant="ghost" size="sm" onClick={() => setConfirmDelete(true)}>
            <Trash2 size={17} /> 임무 삭제
          </Button>
        )}
      </div>

      <div className="scroll-thin min-h-0 flex-1 space-y-6 overflow-y-auto px-6 py-5">
        {!started && !edit && (
          <div className="rounded-md bg-info-weak px-4 py-3 text-info">
            실행 전입니다. 「SOP 실행 시작」을 누르면 착수·완료·전파를 기록할 수 있습니다.
          </div>
        )}
        {/* 임무 정보 (P-17) */}
        <Group title="임무 정보">
          <div className="space-y-3 rounded-lg bg-canvas p-5">
            {edit && (
              <InfoRow label="임무 종류">
                <div className="flex flex-wrap gap-2">
                  {(["process", "decision", "propagation"] as const).map((k) => (
                    <button
                      key={k}
                      onClick={() => set({ kind: k }, true)}
                      className={clsx(
                        "flex h-11 items-center gap-2 rounded-md border px-4 font-medium",
                        missionKind(m) === k ? "border-primary bg-primary-weak text-primary-strong" : "border-line bg-white hover:border-primary",
                      )}
                    >
                      <KindIcon kind={k} size={24} />
                      {KIND_LABEL[k]}
                    </button>
                  ))}
                </div>
              </InfoRow>
            )}
            <InfoRow label="임무내용">
              {edit ? (
                <textarea rows={2} className="input" value={m.content} onChange={(e) => set({ content: e.target.value })} />
              ) : (
                <p className="leading-relaxed">{m.content || "-"}</p>
              )}
            </InfoRow>
            {/* 지원·협업기관은 데이터로는 보존하되 보기 화면에서는 숨긴다(담당부서 몫에 집중). 편집 모드에서만 노출·수정 */}
            {(
              [
                ["주관", m.lead, (v: string) => set({ lead: v })],
                ["지원", m.support.join(", "), (v: string) => set({ support: v.split(/,\s*/) })],
                ["협업기관", m.collab.join(", "), (v: string) => set({ collab: v.split(/,\s*/) })],
              ] as const
            )
              .filter(([label]) => edit || label === "주관")
              .map(([label, value, onSet]) => (
                <InfoRow key={label} label={label}>
                  {edit ? <input className="input" value={value} onChange={(e) => onSet(e.target.value)} /> : <p>{value || "-"}</p>}
                </InfoRow>
              ))}
            {m.notes && m.notes.length > 0 && (
              <InfoRow label="비고">
                <ul className="space-y-1 leading-snug">
                  {m.notes.map((n, i) => (
                    <li key={i}>※ {n}</li>
                  ))}
                </ul>
              </InfoRow>
            )}
            {m.resources.length > 0 && (
              <InfoRow label="필요자원">
                <div className="flex flex-wrap gap-2">
                  {m.resources.map((r) => (
                    <Badge key={r} tone="gray">
                      {r}
                    </Badge>
                  ))}
                </div>
              </InfoRow>
            )}
            {/* T3Q 매뉴얼 원문 PDF 해당 쪽 (새 창) */}
            {m.ref && (
              <InfoRow label="매뉴얼 원문">
                <a
                  href={`/manual/${encodeURIComponent(m.ref.docId)}#page=${m.ref.pdfIndex + 1}`}
                  target="_blank"
                  rel="noopener"
                  className="inline-flex items-center gap-1.5 font-medium text-primary hover:underline"
                >
                  p.{m.ref.page} 열기 <ExternalLink size={16} />
                </a>
              </InfoRow>
            )}
          </div>
        </Group>

        {/* 수행 확인 — 세부항목 */}
        <Group title={`수행 확인 ${m.details.length ? `${m.details.filter((d) => d.done).length}/${m.details.length}` : ""}`}>
          <ul className="space-y-1">
            {m.details.map((d) => (
              <li key={d.id} className="flex items-start gap-3 rounded-md px-2 py-1.5 hover:bg-canvas">
                <input
                  type="checkbox"
                  className="mt-1 h-5 w-5 shrink-0 accent-primary"
                  checked={d.done}
                  disabled={!run || !running}
                  onChange={(e) =>
                    set(
                      {
                        details: m.details.map((x) =>
                          x.id === d.id ? { ...x, done: e.target.checked, doneAt: e.target.checked ? now() : undefined } : x,
                        ),
                        ...(m.status === "todo" && e.target.checked
                          ? { status: "doing" as const, startedAt: m.startedAt ?? now() }
                          : {}),
                      },
                      m.status === "todo" && e.target.checked,
                    )
                  }
                />
                {edit ? (
                  <input
                    className="min-w-0 flex-1 rounded border border-transparent px-1.5 py-0.5 leading-relaxed outline-none hover:border-line focus:border-primary"
                    value={d.text}
                    onChange={(e) => set({ details: m.details.map((x) => (x.id === d.id ? { ...x, text: e.target.value } : x)) })}
                  />
                ) : (
                  <span className={clsx("flex-1 whitespace-pre-line leading-relaxed", d.done && "text-sub")}>{d.text}</span>
                )}
                {d.doneAt && <span className="text-[15px] text-mute">{fmtTime(d.doneAt).split(" ")[1]}</span>}
                {edit && (
                  <button
                    className="mt-0.5 rounded p-1 text-mute hover:bg-danger-weak hover:text-danger"
                    onClick={() => set({ details: m.details.filter((x) => x.id !== d.id) })}
                    aria-label="세부항목 삭제"
                  >
                    <X size={18} />
                  </button>
                )}
              </li>
            ))}
          </ul>
          {!m.details.length && !edit && <p className="text-sub">세부항목 없음</p>}
          {edit && (
            <div className="mt-2 flex gap-2">
              <input
                className="input"
                data-tour="detail-add"
                placeholder="세부항목 추가"
                value={newDetail}
                onChange={(e) => setNewDetail(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && !e.nativeEvent.isComposing && addDetail()}
              />
              <Button disabled={!newDetail.trim()} onClick={addDetail}>
                <Plus size={18} /> 추가
              </Button>
            </div>
          )}
        </Group>

        {/* 상황전파 — 상황전파 임무에만 (P-19) */}
        {showProp && (
        <section className="rounded-lg border border-line-weak bg-canvas/60 p-5" data-tour="propagation">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="text-[18px] font-bold">상황전파</h3>
            {m.propagation.sentAt && (
              <span className="text-[16px] font-medium text-sub">
                {fmtTime(m.propagation.sentAt)} 전파 · {(m.propagation.sentTo ?? []).length}명
              </span>
            )}
          </div>
          {m.propagation.targetHint.length > 0 && (
            <div className="mb-3 text-[16px] text-sub">매뉴얼 전파대상 · {m.propagation.targetHint.join(", ")}</div>
          )}
          <textarea
            rows={3}
            className="input"
            placeholder="전파 내용"
            disabled={!writable}
            value={m.propagation.message}
            onChange={(e) => set({ propagation: { ...m.propagation, message: e.target.value } })}
          />
          <div className="mt-4">
            <div className="mb-2 font-medium">전파 대상</div>
            {contacts.contacts.length === 0 && (
              <div className="mb-2 rounded-md bg-warning-weak px-4 py-3 text-warning">
                등록된 연락망이 없습니다.{" "}
                <a href="/contacts" className="font-bold underline">
                  연락망 관리
                </a>
              </div>
            )}
            <div className="flex flex-wrap items-center gap-2">
              <SelectionChips b={contacts} sel={m.propagation} onRemove={writable ? removeTarget : undefined} />
              {editable && (
                <Button disabled={!writable} onClick={() => setPicking(true)}>
                  <UserPlus size={17} /> {recipients.length ? "대상 변경" : "전파 대상 선택"}
                </Button>
              )}
            </div>
            {writable && recGroups.length > 0 && (
              <div className="mt-3 flex flex-wrap items-center gap-2" data-tour="rec-groups">
                <span className="text-[16px] text-sub">추천 전파그룹</span>
                {recGroups.map((g) => (
                  <button
                    key={g.id}
                    onClick={() => addGroup(g.id)}
                    className="flex h-10 items-center gap-1 rounded-full border border-dashed border-primary px-3.5 font-medium text-primary hover:bg-primary-weak"
                  >
                    <Plus size={16} /> {g.name}
                  </button>
                ))}
              </div>
            )}
          </div>
          {/* 전파는 실행 중 보기 화면에서만 (편집 중에는 실행 버튼을 숨김) */}
          {run && running && (
            <div className="mt-4 flex items-center justify-end gap-3">
              <span className="text-[16px] text-sub">수신 {recipients.length}명</span>
              <Button
                variant={sendFirst ? "primary" : "secondary"}
                data-tour="propagate-send"
                disabled={!recipients.length || !m.propagation.message.trim() || sending}
                onClick={() => setConfirmSend(true)}
              >
                <Send size={17} /> {m.propagation.sentAt ? "다시 전파" : "전파"}
              </Button>
            </div>
          )}
          {editable && !running && (
            <p className="mt-4 text-right text-[16px] text-sub">전파는 SOP 실행 중에 보낼 수 있습니다</p>
          )}
          {dispatches.length > 0 && (
            <ResponseTable
              dispatches={dispatches}
              canAck={editable}
              busy={sending}
              onAck={(did) =>
                startSend(async () => {
                  await ackDispatch(situationId, did);
                  window.dispatchEvent(new Event("r4:refresh"));
                })
              }
            />
          )}
        </section>
        )}

        {/* 조치 기록 */}
        {(started || run) && (
          <Group title="조치 기록">
            <div className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <Field label="조치결과">
                  <textarea
                    rows={4}
                    className="input"
                    placeholder="수행한 조치 결과"
                    disabled={!writable}
                    value={m.result}
                    onChange={(e) => set({ result: e.target.value })}
                  />
                </Field>
                <Field label="피해·복구 조치">
                  <textarea
                    rows={4}
                    className="input"
                    placeholder="피해 발생 및 조치 내용"
                    disabled={!writable}
                    value={m.damage}
                    onChange={(e) => set({ damage: e.target.value })}
                  />
                </Field>
              </div>
              <Field label="실제 담당자">
                <input
                  className="input max-w-[360px]"
                  disabled={!writable}
                  placeholder={me}
                  value={m.assignee}
                  onChange={(e) => set({ assignee: e.target.value })}
                />
              </Field>
            </div>
          </Group>
        )}
      </div>

      {/* 상태 버튼 — 「다음」 하나: 이 임무를 완료 처리하고 다음 임무로 이동 (todo·doing 공통) */}
      {run && running && (m.status === "todo" || m.status === "doing") && (
        <div className="flex items-center justify-end gap-2 border-t border-line-weak px-6 py-4">
          <Button variant="primary" data-tour="mission-done" onClick={() => setStatus("done")}>
            다음 <ChevronRight size={18} />
          </Button>
        </div>
      )}

      <RecipientPicker
        open={picking}
        onClose={() => setPicking(false)}
        contacts={contacts}
        value={m.propagation}
        recommended={rec}
        hint={m.propagation.targetHint}
        onSave={(v) => {
          set({ propagation: { ...m.propagation, ...v } }, true);
          setPicking(false);
        }}
      />

      <Modal
        open={confirmSend}
        onClose={() => setConfirmSend(false)}
        title="상황전파"
        width={960}
        footer={
          <>
            {sendError && <span className="mr-auto self-center text-danger">{sendError}</span>}
            <Button onClick={() => setConfirmSend(false)}>취소</Button>
            <Button
              variant="primary"
              disabled={sending || !reachable.length}
              onClick={() =>
                startSend(async () => {
                  setSendError(null);
                  try {
                    const channels = [...(ways.sms ? (["SMS"] as const) : []), ...(ways.email ? (["EMAIL"] as const) : [])];
                    const r = await propagate(situationId, m.id, m.propagation.message, channels);
                    onChange(r.mission);
                    setConfirmSend(false);
                    setSent(r.links);
                    window.dispatchEvent(new Event("r4:refresh"));
                  } catch (e) {
                    setSendError(e instanceof Error ? e.message : "보내지 못했습니다.");
                  }
                })
              }
            >
              <Send size={17} /> {reachable.length}명에게 전파
            </Button>
          </>
        }
      >
        <div className="grid gap-6 md:grid-cols-[1fr_340px]">
          <div>
            <h4 className="mb-2 font-bold">전파 내용</h4>
            <div className="whitespace-pre-line rounded-md bg-canvas p-4 leading-relaxed">{m.propagation.message}</div>
            <h4 className="mb-2 mt-5 font-bold">발송 방법</h4>
            <div className="flex gap-5">
              {(
                [
                  ["sms", "문자"],
                  ["email", "이메일"],
                ] as const
              ).map(([k, label]) => (
                <label key={k} className="flex cursor-pointer items-center gap-2">
                  <input
                    type="checkbox"
                    className="h-5 w-5 accent-primary"
                    checked={ways[k]}
                    onChange={(e) => setWays((w) => ({ ...w, [k]: e.target.checked }))}
                  />
                  {label}
                </label>
              ))}
            </div>
            <h4 className="mb-2 mt-5 font-bold">수신 {recipients.length}명</h4>
            <ul className="scroll-thin max-h-[300px] divide-y divide-line-weak overflow-y-auto rounded-md border border-line-weak">
              {recipients.map((r) => (
                <li key={r.id} className="flex flex-wrap items-center gap-x-3 gap-y-0.5 px-3 py-2 text-[16px]">
                  <span className="font-medium">{r.name}</span>
                  <span className="text-sub">{r.unit}</span>
                  <span className="ml-auto flex flex-wrap justify-end gap-x-3 tabular-nums text-sub">
                    {ways.sms && (r.phone ? <span>{r.phone}</span> : <span className="text-danger">전화번호 없음</span>)}
                    {ways.email && (r.email ? <span>{r.email}</span> : <span className="text-danger">이메일 없음</span>)}
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-3 text-[15px] text-sub">수신자마다 응답 링크가 함께 발송됩니다.</p>
          </div>
          <div>
            <h4 className="mb-2 font-bold">현장 담당자 화면</h4>
            <div className="mx-auto h-[560px] w-[300px] overflow-hidden rounded-[36px] border-[10px] border-ink bg-white shadow-xl">
              <div className="scroll-thin h-full overflow-y-auto">
                <FieldView
                  data={{
                    orgName: preview.orgName,
                    situationTitle: preview.situationTitle,
                    missionTitle: m.title,
                    message: m.propagation.message,
                    name: recipients[0]?.name ?? "담당자",
                    sentAt: new Date().toISOString(),
                    readAt: null,
                    doneAt: null,
                    note: "",
                    noteAt: null,
                    ackAt: null,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </Modal>

      <Modal
        open={!!sent}
        onClose={() => setSent(null)}
        title="전파 완료"
        width={760}
        footer={
          <Button variant="primary" onClick={() => setSent(null)}>
            확인
          </Button>
        }
      >
        <p className="mb-3 text-[16px] text-sub">
          문자·메일 발송 모듈 연계 전입니다. 아래 링크를 현장 담당자에게 보내면 응답을 받을 수 있습니다.
        </p>
        <ul className="scroll-thin max-h-[440px] divide-y divide-line-weak overflow-y-auto rounded-md border border-line-weak">
          {(sent ?? []).map((l) => (
            <SentLink key={l.id} l={l} />
          ))}
        </ul>
      </Modal>

      <Modal
        open={confirmDelete}
        onClose={() => setConfirmDelete(false)}
        title="임무 삭제"
        width={440}
        footer={
          <>
            <Button onClick={() => setConfirmDelete(false)}>취소</Button>
            <Button
              variant="danger"
              onClick={() => {
                setConfirmDelete(false);
                onDelete();
              }}
            >
              삭제
            </Button>
          </>
        }
      >
        <p className="text-[18px]">{m.title}</p>
      </Modal>
    </div>
  );
}

/** 묶음 제목 (임무 정보 · 수행 확인 · 조치 기록) */
function Group({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h3 className="mb-3 text-[18px] font-bold">{title}</h3>
      {children}
    </section>
  );
}

/** 임무 정보 한 줄 — 레이블 왼쪽 고정 폭 회색, 값 검정 */
function InfoRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1 sm:flex-row sm:gap-4">
      <div className="shrink-0 font-medium text-sub sm:w-[96px]">{label}</div>
      <div className="min-w-0 flex-1 text-ink">{children}</div>
    </div>
  );
}

/** 현장 응답 현황 — 사람마다 한 줄, 칸에 시각 (P-22) */
function ResponseTable({
  dispatches,
  canAck,
  busy,
  onAck,
}: {
  dispatches: DispatchRow[];
  canAck: boolean;
  busy: boolean;
  onAck: (id: string) => void;
}) {
  const hm = (v: string | Date | null) => (v ? fmtTime(v).split(" ")[1] : null);
  const read = dispatches.filter((d) => d.readAt).length;
  const done = dispatches.filter((d) => d.doneAt).length;
  const waiting = dispatches.filter((d) => d.note && !d.ackAt).length;
  return (
    <div className="mt-5">
      <div className="mb-2 flex flex-wrap items-center gap-x-2 font-medium">
        현장 응답
        <span className="font-normal text-sub">
          수신 {read} · 완료 {done} / {dispatches.length}
        </span>
        {waiting > 0 && <span className="font-semibold text-warning">· 확인 대기 {waiting}</span>}
      </div>
      <div className="overflow-x-auto rounded-md border border-line-weak bg-white">
        <table className="w-full text-[16px]">
          <thead className="bg-canvas text-left text-sub">
            <tr>
              <th className="px-3 py-2 font-medium">이름 · 소속</th>
              <th className="px-3 py-2 font-medium">수신</th>
              <th className="px-3 py-2 font-medium">완료</th>
              <th className="px-3 py-2 font-medium">현장 조치사항</th>
              <th className="px-3 py-2 font-medium">상황실 확인</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line-weak">
            {dispatches.map((d) => (
              <tr key={d.id} className="align-top">
                <td className="whitespace-nowrap px-3 py-2.5">
                  <span className="font-medium">{d.name}</span> <span className="text-sub">{d.unit}</span>
                </td>
                <td className="whitespace-nowrap px-3 py-2.5 tabular-nums">{hm(d.readAt) ?? <span className="text-mute">미수신</span>}</td>
                <td className="whitespace-nowrap px-3 py-2.5 tabular-nums">{hm(d.doneAt) ?? <span className="text-mute">미완료</span>}</td>
                <td className="min-w-[200px] whitespace-pre-line px-3 py-2.5 leading-snug">{d.note || <span className="text-mute">-</span>}</td>
                <td className="whitespace-nowrap px-3 py-2.5 tabular-nums">
                  {d.ackAt ? (
                    hm(d.ackAt)
                  ) : canAck ? (
                    <Button size="sm" disabled={!d.note || busy} onClick={() => onAck(d.id)}>
                      확인
                    </Button>
                  ) : (
                    <span className="text-mute">-</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="mb-2 font-medium text-sub">{label}</div>
      {children}
    </div>
  );
}

/** 발송된 수신자 링크 + QR */
function SentLink({ l }: { l: DispatchLink }) {
  const [qr, setQr] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const url = typeof window !== "undefined" ? window.location.origin + "/m/" + l.token : "/m/" + l.token;
  return (
    <li className="px-3 py-2.5">
      <div className="flex flex-wrap items-center gap-2">
        <span className="font-medium">{l.name}</span>
        <span className="text-sub">{l.unit}</span>
        <span className="tabular-nums text-sub">{l.phone}</span>
        <span className="ml-auto flex gap-1.5">
          <Button
            size="sm"
            onClick={async () => {
              await navigator.clipboard.writeText(url).catch(() => {});
              setCopied(true);
              setTimeout(() => setCopied(false), 1500);
            }}
          >
            {copied ? "복사됨" : "링크 복사"}
          </Button>
          <Button size="sm" onClick={async () => setQr(qr ? null : await QRCode.toDataURL(url, { margin: 1, width: 180 }))}>
            QR
          </Button>
          <a
            href={url}
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-9 items-center rounded-md border border-line px-3 text-[15px] hover:border-primary"
          >
            열기
          </a>
        </span>
      </div>
      {qr && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={qr} alt={l.name + " 응답 링크 QR"} className="mt-2 h-[180px] w-[180px]" />
      )}
    </li>
  );
}

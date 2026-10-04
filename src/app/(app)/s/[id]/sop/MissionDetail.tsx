"use client";
import { useMemo, useState, useTransition } from "react";
import clsx from "clsx";
import { Check, Plus, Send, Trash2, UserPlus, X } from "lucide-react";
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
import { RecipientPicker, resolveRecipients } from "./RecipientPicker";
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
  onAddMission,
  dispatches,
  preview,
}: {
  mission: Mission;
  mode: "edit" | "run";
  running: boolean;
  started: boolean;
  editable: boolean;
  me: string;
  contacts: ContactsBundle;
  situationId: string;
  onChange: (m: Mission, immediate?: boolean) => void;
  onDelete: () => void;
  onAddMission?: () => void;
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
  const set = (patch: Partial<Mission>, immediate = false) => onChange({ ...m, ...patch }, immediate);
  const st = MISSION_STATUS[m.status];
  const recipients = useMemo(
    () => resolveRecipients(contacts, m.propagation.contactIds, m.propagation.groupIds),
    [contacts, m.propagation.contactIds, m.propagation.groupIds],
  );
  const rec = useMemo(() => recommended(contacts.groups, m.propagation.targetHint), [contacts.groups, m.propagation.targetHint]);
  const now = () => new Date().toISOString();

  const edit = editable && mode === "edit";
  const run = editable && mode === "run";

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
    if (status === "todo") {
      patch.startedAt = undefined;
      patch.doneAt = undefined;
    }
    set(patch, true);
  };

  const toggleGroup = (gid: string) => {
    const has = m.propagation.groupIds.includes(gid);
    set(
      {
        propagation: {
          ...m.propagation,
          groupIds: has ? m.propagation.groupIds.filter((x) => x !== gid) : [...m.propagation.groupIds, gid],
        },
      },
      true,
    );
  };

  const addDetail = () => {
    if (!newDetail.trim()) return;
    set({ details: [...m.details, { id: nanoid(6), text: newDetail.trim(), done: false }] });
    setNewDetail("");
  };

  return (
    <div className="flex h-full flex-col">
      {/* 머리 */}
      {m.group && (
        <div className="border-b border-line-weak bg-canvas px-6 py-2.5 text-[15px] font-semibold text-sub">
          [{m.group.code}] {m.group.name}
          {/^[0-9]/.test(m.code) && <span className="ml-2 text-ink">› {m.code}</span>}
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
        {m.stage && <Badge tone="gray">{m.stage}</Badge>}
        {started && <Badge tone={st.tone}>{st.label}</Badge>}
        {m.startedAt && <span className="text-[16px] text-sub">시작 {fmtTime(m.startedAt)}</span>}
        {edit && (
          <Button variant="ghost" size="sm" onClick={() => setConfirmDelete(true)}>
            <Trash2 size={17} /> 임무 삭제
          </Button>
        )}
        {onAddMission && (
          <Button size="sm" onClick={onAddMission}>
            <Plus size={17} /> 임무 추가
          </Button>
        )}
      </div>

      <div className="scroll-thin flex-1 space-y-6 overflow-y-auto px-6 py-5">
        {edit && (
          <Field label="임무 종류">
            <div className="flex gap-2">
              {(["process", "decision", "propagation"] as const).map((k) => (
                <button
                  key={k}
                  onClick={() => set({ kind: k }, true)}
                  className={clsx(
                    "flex h-11 items-center gap-2 rounded-md border px-4 font-medium",
                    missionKind(m) === k ? "border-primary bg-primary-weak text-primary-strong" : "border-line hover:border-primary",
                  )}
                >
                  <KindIcon kind={k} size={24} />
                  {KIND_LABEL[k]}
                </button>
              ))}
            </div>
          </Field>
        )}
        <Field label="임무내용">
          {edit ? (
            <textarea rows={2} className="input" value={m.content} onChange={(e) => set({ content: e.target.value })} />
          ) : (
            <p className="leading-relaxed">{m.content || "-"}</p>
          )}
        </Field>

        <div className="grid gap-4 md:grid-cols-3">
          {(
            [
              ["주관", m.lead, (v: string) => set({ lead: v })],
              ["지원", m.support.join(", "), (v: string) => set({ support: v.split(/,\s*/) })],
              ["협업기관", m.collab.join(", "), (v: string) => set({ collab: v.split(/,\s*/) })],
            ] as const
          ).map(([label, value, onSet]) => (
            <Field key={label} label={label}>
              {edit ? (
                <input className="input" value={value} onChange={(e) => onSet(e.target.value)} />
              ) : (
                <p>{value || "-"}</p>
              )}
            </Field>
          ))}
        </div>

        {/* 세부항목 */}
        <Field label={`세부항목 ${m.details.length ? `${m.details.filter((d) => d.done).length}/${m.details.length}` : ""}`}>
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
                  <span className={clsx("flex-1 leading-relaxed", d.done && "text-sub")}>{d.text}</span>
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
          {edit && (
            <div className="mt-2 flex gap-2">
              <input
                className="input"
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
        </Field>

        {/* 상황전파 */}
        <section className="rounded-lg border border-line-weak bg-canvas/60 p-5">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="text-[18px] font-bold">상황전파</h3>
            {m.propagation.sentAt && (
              <Badge tone="green">
                {fmtTime(m.propagation.sentAt)} 전파 · {(m.propagation.sentTo ?? []).length}명
              </Badge>
            )}
          </div>
          {m.propagation.targetHint.length > 0 && (
            <div className="mb-3 text-[16px] text-sub">매뉴얼 전파대상 · {m.propagation.targetHint.join(", ")}</div>
          )}
          <textarea
            rows={3}
            className="input"
            placeholder="전파 내용"
            disabled={!editable}
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
            <div className="flex flex-wrap gap-2">
              {contacts.groups.map((g) => {
                const on = m.propagation.groupIds.includes(g.id);
                return (
                  <button
                    key={g.id}
                    disabled={!editable}
                    onClick={() => toggleGroup(g.id)}
                    className={clsx(
                      "flex h-11 items-center gap-1.5 rounded-md border px-4 font-medium transition disabled:opacity-60",
                      on ? "border-primary bg-primary text-white" : "border-line bg-white hover:border-primary",
                    )}
                  >
                    {on && <Check size={16} />}
                    {g.name} {g.memberIds.length}
                    {!on && rec.has(g.id) && <span className="rounded bg-warning-weak px-1.5 text-[13px] text-warning">추천</span>}
                  </button>
                );
              })}
              {editable && (
                <Button onClick={() => setPicking(true)}>
                  <UserPlus size={17} /> 개별 선택
                </Button>
              )}
            </div>
            {m.propagation.contactIds.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-1.5">
                {contacts.contacts
                  .filter((c) => m.propagation.contactIds.includes(c.id))
                  .map((c) => (
                    <Badge key={c.id} tone="gray">
                      {c.name} {c.title}
                    </Badge>
                  ))}
              </div>
            )}
          </div>
          {editable && (
            <div className="mt-4 flex items-center justify-end gap-3">
              <span className="text-[16px] text-sub">수신 {recipients.length}명</span>
              {running ? (
                <Button
                  variant="primary"
                  disabled={!recipients.length || !m.propagation.message.trim() || sending}
                  onClick={() => setConfirmSend(true)}
                >
                  <Send size={17} /> {m.propagation.sentAt ? "다시 전파" : "전파"}
                </Button>
              ) : (
                <span className="text-[15px] text-mute">전파는 SOP 실행 중에 보낼 수 있습니다</span>
              )}
            </div>
          )}
          {dispatches.length > 0 && (
            <div className="mt-5">
              <div className="mb-2 flex items-center gap-2 font-medium">
                현장 응답
                <span className="text-[15px] font-normal text-sub">
                  수신확인 {dispatches.filter((d) => d.readAt).length} · 임무완료 {dispatches.filter((d) => d.doneAt).length} /{" "}
                  {dispatches.length}
                </span>
              </div>
              <ul className="divide-y divide-line-weak rounded-md border border-line-weak bg-white">
                {dispatches.map((d) => (
                  <li key={d.id} className="px-3 py-2.5">
                    <div className="flex flex-wrap items-center gap-2 text-[16px]">
                      <span className="font-medium">{d.name}</span>
                      <span className="text-sub">{d.unit}</span>
                      <span className="ml-auto flex flex-wrap gap-1.5">
                        <Badge tone={d.readAt ? "green" : "gray"}>
                          {d.readAt ? "수신 " + fmtTime(d.readAt).split(" ")[1] : "미확인"}
                        </Badge>
                        {d.doneAt && <Badge tone="blue">{"완료 " + fmtTime(d.doneAt).split(" ")[1]}</Badge>}
                      </span>
                    </div>
                    {d.note && (
                      <div className="mt-1.5 flex items-start gap-2">
                        <p className="flex-1 whitespace-pre-line rounded bg-canvas px-3 py-2 text-[15px] leading-snug">{d.note}</p>
                        {d.ackAt ? (
                          <Badge tone="green">{"확인 " + fmtTime(d.ackAt).split(" ")[1]}</Badge>
                        ) : (
                          editable && (
                            <Button
                              size="sm"
                              variant="primary"
                              onClick={() =>
                                startSend(async () => {
                                  await ackDispatch(situationId, d.id);
                                  window.dispatchEvent(new Event("r4:refresh"));
                                })
                              }
                            >
                              확인
                            </Button>
                          )
                        )}
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </section>

        {/* 실행 기록 */}
        {(started || run) && (
          <>
            <div className="grid gap-4 md:grid-cols-2">
              <Field label="조치결과">
                <textarea
                  rows={4}
                  className="input"
                  placeholder="수행한 조치 결과"
                  disabled={!editable}
                  value={m.result}
                  onChange={(e) => set({ result: e.target.value })}
                />
              </Field>
              <Field label="피해·복구 조치">
                <textarea
                  rows={4}
                  className="input"
                  placeholder="피해 발생 및 조치 내용"
                  disabled={!editable}
                  value={m.damage}
                  onChange={(e) => set({ damage: e.target.value })}
                />
              </Field>
            </div>
            <Field label="실제 담당자">
              <input
                className="input max-w-[360px]"
                disabled={!editable}
                placeholder={me}
                value={m.assignee}
                onChange={(e) => set({ assignee: e.target.value })}
              />
            </Field>
          </>
        )}
        {m.notes && m.notes.length > 0 && (
          <Field label="비고">
            <ul className="space-y-1 text-[16px] leading-snug text-sub">
              {m.notes.map((n, i) => (
                <li key={i}>※ {n}</li>
              ))}
            </ul>
          </Field>
        )}
        {m.resources.length > 0 && (
          <Field label="필요자원">
            <div className="flex flex-wrap gap-2">
              {m.resources.map((r) => (
                <Badge key={r} tone="gray">
                  {r}
                </Badge>
              ))}
            </div>
          </Field>
        )}
      </div>

      {run && running && (
        <div className="flex items-center justify-end gap-2 border-t border-line-weak px-6 py-4">
          {m.status !== "todo" && (
            <Button variant="ghost" onClick={() => setStatus("todo")}>
              대기로
            </Button>
          )}
          {m.status !== "skipped" && m.status !== "done" && <Button onClick={() => setStatus("skipped")}>생략</Button>}
          {m.status === "todo" && <Button onClick={() => setStatus("doing")}>착수</Button>}
          {m.status !== "done" && (
            <Button variant="primary" onClick={() => setStatus("done")}>
              <Check size={18} /> 조치 완료
            </Button>
          )}
        </div>
      )}

      <RecipientPicker
        open={picking}
        onClose={() => setPicking(false)}
        contacts={contacts}
        contactIds={m.propagation.contactIds}
        groupIds={m.propagation.groupIds}
        onSave={(contactIds, groupIds) => {
          set({ propagation: { ...m.propagation, contactIds, groupIds } }, true);
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
              disabled={sending}
              onClick={() =>
                startSend(async () => {
                  setSendError(null);
                  try {
                    const r = await propagate(situationId, m.id, m.propagation.message);
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
              <Send size={17} /> {recipients.length}명에게 전파 ({m.propagation.channel === "EMAIL" ? "이메일" : "문자"})
            </Button>
          </>
        }
      >
        <div className="grid gap-6 md:grid-cols-[1fr_340px]">
          <div>
            <h4 className="mb-2 font-bold">전파 내용</h4>
            <div className="whitespace-pre-line rounded-md bg-canvas p-4 leading-relaxed">{m.propagation.message}</div>
            <h4 className="mb-2 mt-5 font-bold">수신 {recipients.length}명</h4>
            <ul className="scroll-thin max-h-[300px] divide-y divide-line-weak overflow-y-auto rounded-md border border-line-weak">
              {recipients.map((r) => (
                <li key={r.id} className="flex items-center gap-3 px-3 py-2 text-[16px]">
                  <span className="font-medium">{r.name}</span>
                  <span className="text-sub">{r.unit}</span>
                  <span className="ml-auto tabular-nums text-sub">{r.phone}</span>
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
                    details: m.details.map((d) => d.text).slice(0, 8),
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

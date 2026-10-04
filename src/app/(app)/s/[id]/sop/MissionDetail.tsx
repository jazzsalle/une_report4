"use client";
import { useMemo, useState, useTransition } from "react";
import clsx from "clsx";
import { Check, Plus, Send, Trash2, Users, X } from "lucide-react";
import { nanoid } from "nanoid";
import { Badge, Button, Modal } from "@/components/ui";
import type { Mission } from "@/lib/types";
import type { ContactsBundle } from "@/lib/data";
import { propagate } from "@/app/actions/situation";
import { fmtTime } from "@/lib/format";
import { MISSION_STATUS } from "./SopWorkspace";
import { RecipientPicker, resolveRecipients } from "./RecipientPicker";

export function MissionDetail({
  mission: m,
  running,
  started,
  editable,
  me,
  contacts,
  situationId,
  onChange,
  onDelete,
}: {
  mission: Mission;
  running: boolean;
  started: boolean;
  editable: boolean;
  me: string;
  contacts: ContactsBundle;
  situationId: string;
  onChange: (m: Mission, immediate?: boolean) => void;
  onDelete: () => void;
}) {
  const [picking, setPicking] = useState(false);
  const [confirmSend, setConfirmSend] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [newDetail, setNewDetail] = useState("");
  const [sending, startSend] = useTransition();
  const set = (patch: Partial<Mission>, immediate = false) => onChange({ ...m, ...patch }, immediate);
  const st = MISSION_STATUS[m.status];
  const recipients = useMemo(
    () => resolveRecipients(contacts, m.propagation.contactIds, m.propagation.groupIds),
    [contacts, m.propagation.contactIds, m.propagation.groupIds],
  );
  const now = () => new Date().toISOString();

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

  const ro = !editable;

  return (
    <div className="flex h-full flex-col">
      <div className="flex flex-wrap items-center gap-3 border-b border-line-weak px-6 py-5">
        <input
          className="min-w-0 flex-1 rounded-md border border-transparent px-2 py-1 text-[21px] font-bold outline-none hover:border-line focus:border-primary disabled:bg-transparent"
          value={m.title}
          disabled={ro}
          placeholder="임무명"
          onChange={(e) => set({ title: e.target.value })}
        />
        {started && <Badge tone={st.tone}>{st.label}</Badge>}
        {m.startedAt && <span className="text-[16px] text-sub">시작 {fmtTime(m.startedAt)}</span>}
        {editable && !started && (
          <Button variant="ghost" size="sm" onClick={() => setConfirmDelete(true)} aria-label="임무 삭제">
            <Trash2 size={18} />
          </Button>
        )}
      </div>

      <div className="scroll-thin flex-1 space-y-6 overflow-y-auto px-6 py-5">
        <Field label="임무내용">
          <textarea
            rows={2}
            className="input"
            disabled={ro}
            value={m.content}
            onChange={(e) => set({ content: e.target.value })}
          />
        </Field>

        <div className="grid gap-4 md:grid-cols-3">
          <Field label="주관">
            <input className="input" disabled={ro} value={m.lead} onChange={(e) => set({ lead: e.target.value })} />
          </Field>
          <Field label="지원">
            <input
              className="input"
              disabled={ro}
              value={m.support.join(", ")}
              onChange={(e) => set({ support: e.target.value.split(/,\s*/) })}
            />
          </Field>
          <Field label="협업기관">
            <input
              className="input"
              disabled={ro}
              value={m.collab.join(", ")}
              onChange={(e) => set({ collab: e.target.value.split(/,\s*/) })}
            />
          </Field>
        </div>

        <Field label="세부항목">
          <ul className="space-y-1">
            {m.details.map((d) => (
              <li key={d.id} className="group flex items-start gap-3 rounded-md px-2 py-1.5 hover:bg-canvas">
                <input
                  type="checkbox"
                  className="mt-1 h-5 w-5 shrink-0 accent-primary"
                  checked={d.done}
                  disabled={ro || !running}
                  onChange={(e) =>
                    set({
                      details: m.details.map((x) =>
                        x.id === d.id ? { ...x, done: e.target.checked, doneAt: e.target.checked ? now() : undefined } : x,
                      ),
                      ...(m.status === "todo" && e.target.checked ? { status: "doing" as const, startedAt: m.startedAt ?? now() } : {}),
                    }, m.status === "todo" && e.target.checked)
                  }
                />
                <span className={clsx("flex-1 leading-relaxed", d.done && "text-sub")}>{d.text}</span>
                {d.doneAt && <span className="text-[15px] text-mute">{fmtTime(d.doneAt).split(" ")[1]}</span>}
                {editable && !started && (
                  <button
                    className="invisible text-mute hover:text-danger group-hover:visible"
                    onClick={() => set({ details: m.details.filter((x) => x.id !== d.id) })}
                    aria-label="삭제"
                  >
                    <X size={18} />
                  </button>
                )}
              </li>
            ))}
          </ul>
          {editable && (
            <div className="mt-2 flex gap-2">
              <input
                className="input"
                placeholder="세부항목 추가"
                value={newDetail}
                onChange={(e) => setNewDetail(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && newDetail.trim() && !e.nativeEvent.isComposing) {
                    set({ details: [...m.details, { id: nanoid(6), text: newDetail.trim(), done: false }] });
                    setNewDetail("");
                  }
                }}
              />
              <Button
                disabled={!newDetail.trim()}
                onClick={() => {
                  set({ details: [...m.details, { id: nanoid(6), text: newDetail.trim(), done: false }] });
                  setNewDetail("");
                }}
              >
                <Plus size={18} />
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
            disabled={ro}
            value={m.propagation.message}
            onChange={(e) => set({ propagation: { ...m.propagation, message: e.target.value } })}
          />
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <span className="mr-1 font-medium">전파 담당자</span>
            {contacts.groups
              .filter((g) => m.propagation.groupIds.includes(g.id))
              .map((g) => (
                <Badge key={g.id} tone="blue">
                  {g.name} {g.memberIds.length}명
                </Badge>
              ))}
            {contacts.contacts
              .filter((c) => m.propagation.contactIds.includes(c.id))
              .map((c) => (
                <Badge key={c.id} tone="gray">
                  {c.name} {c.title}
                </Badge>
              ))}
            {editable && (
              <Button size="sm" onClick={() => setPicking(true)}>
                <Users size={16} /> 선택
              </Button>
            )}
          </div>
          {editable && running && (
            <div className="mt-4 flex items-center justify-end gap-3">
              <span className="text-[16px] text-sub">수신 {recipients.length}명</span>
              <Button
                variant="primary"
                disabled={!recipients.length || !m.propagation.message.trim() || sending}
                onClick={() => setConfirmSend(true)}
              >
                <Send size={17} /> {m.propagation.sentAt ? "다시 전파" : "전파"}
              </Button>
            </div>
          )}
        </section>

        <div className="grid gap-4 md:grid-cols-2">
          <Field label="조치결과">
            <textarea
              rows={4}
              className="input"
              placeholder="수행한 조치 결과"
              disabled={ro}
              value={m.result}
              onChange={(e) => set({ result: e.target.value })}
            />
          </Field>
          <Field label="피해·복구 조치">
            <textarea
              rows={4}
              className="input"
              placeholder="피해 발생 및 조치 내용"
              disabled={ro}
              value={m.damage}
              onChange={(e) => set({ damage: e.target.value })}
            />
          </Field>
        </div>
        <Field label="실제 담당자">
          <input
            className="input max-w-[360px]"
            disabled={ro}
            placeholder={me}
            value={m.assignee}
            onChange={(e) => set({ assignee: e.target.value })}
          />
        </Field>
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

      {editable && running && (
        <div className="flex items-center justify-end gap-2 border-t border-line-weak px-6 py-4">
          {m.status !== "todo" && (
            <Button variant="ghost" onClick={() => setStatus("todo")}>
              대기로
            </Button>
          )}
          {m.status !== "skipped" && m.status !== "done" && <Button onClick={() => setStatus("skipped")}>생략</Button>}
          {m.status === "todo" && (
            <Button onClick={() => setStatus("doing")}>착수</Button>
          )}
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
        width={620}
        footer={
          <>
            <Button onClick={() => setConfirmSend(false)}>취소</Button>
            <Button
              variant="primary"
              disabled={sending}
              onClick={() =>
                startSend(async () => {
                  const updated = await propagate(
                    situationId,
                    m.id,
                    recipients.map((r) => `${r.name}(${r.unit})`),
                    m.propagation.message,
                  );
                  onChange(updated);
                  setConfirmSend(false);
                  window.dispatchEvent(new Event("r4:refresh"));
                })
              }
            >
              <Send size={17} /> {recipients.length}명에게 전파
            </Button>
          </>
        }
      >
        <div className="rounded-md bg-canvas p-4 leading-relaxed whitespace-pre-line">{m.propagation.message}</div>
        <div className="mt-4 text-[16px] text-sub">
          {recipients
            .slice(0, 12)
            .map((r) => r.name)
            .join(", ")}
          {recipients.length > 12 && ` 외 ${recipients.length - 12}명`}
        </div>
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

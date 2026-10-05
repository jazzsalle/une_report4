"use client";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import clsx from "clsx";
import { BookOpen } from "lucide-react";
import { Button, Modal } from "@/components/ui";
import { fetchManualContacts, importContacts } from "@/app/actions/contacts";
import { CATEGORY_LABEL, entryToRow } from "@/lib/manual-contacts";
import type { ContactCategory, ContactsResponse } from "@/lib/t3q/types";

type Data = ContactsResponse & { fallback: boolean };
const ORDER: ContactCategory[] = ["AGENCY", "LOCAL_GOV", "INTERNAL", "HIGHER"];

/** 매뉴얼에서 연락망 가져오기 (API-04) — 미리 보고 고른 줄만 추가·수정 (지우지 않음) */
export function ManualContacts({ orgId, big }: { orgId: string; big?: boolean }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [data, setData] = useState<Data | null>(null);
  const [pick, setPick] = useState<Set<number>>(new Set());
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState<string | null>(null);
  const [pending, start] = useTransition();

  const load = () => {
    setOpen(true);
    setData(null);
    setDone(null);
    setError(null);
    start(async () => {
      try {
        const d = await fetchManualContacts(orgId);
        setData(d);
        // 기본: 유관기관·시군구·내부 부서 선택, 상급 보고처는 직접 고름
        setPick(new Set(d.entries.map((e, i) => (e.category === "HIGHER" ? -1 : i)).filter((i) => i >= 0)));
      } catch (e) {
        setError(e instanceof Error ? e.message : "연락망을 가져오지 못했습니다.");
      }
    });
  };
  const toggle = (i: number) => setPick((s) => (s.has(i) ? new Set([...s].filter((x) => x !== i)) : new Set([...s, i])));
  const toggleAll = (idx: number[], on: boolean) =>
    setPick((s) => {
      const n = new Set(s);
      idx.forEach((i) => (on ? n.add(i) : n.delete(i)));
      return n;
    });
  const submit = () =>
    start(async () => {
      if (!data) return;
      try {
        const rows = data.entries.filter((_, i) => pick.has(i)).map(entryToRow);
        const s = await importContacts(orgId, rows);
        setDone(`추가 ${s.added}건 · 수정 ${s.updated}건` + (s.units ? ` · 새 조직 ${s.units}개` : ""));
        router.refresh();
      } catch (e) {
        setError(e instanceof Error ? e.message : "넣지 못했습니다.");
      }
    });

  return (
    <>
      <Button variant={big ? "secondary" : "ghost"} size={big ? "md" : "sm"} onClick={load}>
        <BookOpen size={18} /> 매뉴얼에서 가져오기
      </Button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="매뉴얼에서 연락망 가져오기"
        width={860}
        footer={
          <>
            {data && !done && <span className="mr-auto self-center text-[17px] font-semibold">선택 {pick.size}건</span>}
            <Button onClick={() => setOpen(false)}>{done ? "닫기" : "취소"}</Button>
            {!done && (
              <Button variant="primary" disabled={!data || !pick.size || pending} onClick={submit}>
                {pending && data ? "넣는 중" : "가져오기"}
              </Button>
            )}
          </>
        }
      >
        {done ? (
          <div className="rounded-md bg-success-weak px-5 py-6 text-[18px] font-semibold text-success">넣었습니다. {done}</div>
        ) : !data ? (
          <div className="py-12 text-center text-[17px] text-sub">{error ?? "매뉴얼에서 연락망을 찾는 중"}</div>
        ) : (
          <>
            <div className="mb-3 text-[16px]">
              {data.manuals.map((m) => m.docTitle).join(", ")}
              {data.fallback && <span className="ml-2 font-semibold text-warning">연계 실패 — 예시 연락망</span>}
            </div>
            {data.warnings?.map((w, i) => (
              <div key={i} className="mb-2 rounded-md bg-warning-weak px-4 py-2.5 text-[16px] text-warning">
                {w.message}
                {w.page ? ` (p.${w.page})` : ""}
              </div>
            ))}
            <p className="mb-3 text-[16px] text-sub">고른 줄만 연락망에 추가합니다. 같은 기관·이름이 있으면 번호를 고칩니다. 지우는 것은 없습니다.</p>
            <div className="scroll-thin max-h-[52vh] space-y-4 overflow-y-auto pr-1">
              {ORDER.map((cat) => {
                const idx = data.entries.map((e, i) => (e.category === cat ? i : -1)).filter((i) => i >= 0);
                if (!idx.length) return null;
                const all = idx.every((i) => pick.has(i));
                return (
                  <div key={cat} className="rounded-lg border border-line">
                    <label className="flex cursor-pointer items-center gap-2 border-b border-line-weak bg-canvas px-4 py-2.5 font-bold">
                      <input type="checkbox" className="h-5 w-5 accent-primary" checked={all} onChange={() => toggleAll(idx, !all)} />
                      {CATEGORY_LABEL[cat]} <span className="font-normal text-sub">{idx.length}곳</span>
                    </label>
                    {idx.map((i) => {
                      const e = data.entries[i];
                      return (
                        <label
                          key={i}
                          className={clsx("flex cursor-pointer items-center gap-3 border-b border-line-weak px-4 py-2.5 last:border-b-0", pick.has(i) && "bg-primary-weak/40")}
                        >
                          <input type="checkbox" className="h-5 w-5 shrink-0 accent-primary" checked={pick.has(i)} onChange={() => toggle(i)} />
                          <span className="min-w-0 flex-1">
                            <span className="font-semibold">{e.org}</span>
                            {e.dept && <span className="ml-2">{e.dept}</span>}
                            {(e.title || e.name) && <span className="ml-2 text-sub">{[e.title, e.name].filter(Boolean).join(" ")}</span>}
                          </span>
                          <span className="shrink-0 text-right text-[16px]">
                            {[e.mobile, ...e.phones].filter(Boolean).slice(0, 2).join(" · ")}
                            {e.fax?.length ? <span className="ml-2 text-sub">팩스 {e.fax[0]}</span> : null}
                          </span>
                          {e.source.page && <span className="w-14 shrink-0 text-right text-[15px] text-sub">p.{e.source.page}</span>}
                        </label>
                      );
                    })}
                  </div>
                );
              })}
            </div>
            {error && <p className="mt-3 text-danger">{error}</p>}
          </>
        )}
      </Modal>
    </>
  );
}

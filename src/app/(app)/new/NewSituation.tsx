"use client";
import { useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Sparkles, Wand2 } from "lucide-react";
import { Button, Card, CardHead, Modal } from "@/components/ui";
import { SituationFields, defaultInput, useSubmit } from "@/components/SituationForm";
import { createSituation, generateSop, updateSituation, type SituationInput } from "@/app/actions/situation";
import { sidoShort } from "@/lib/regions";
import { fmtDateTime } from "@/lib/format";

/**
 * 새 상황정보 등록 / 상황정보 등록(이어서 작성, N-05)
 * tutorial: 따라하기로 열었을 때 한 번에 채울 시드 값 (이때 만든 상황은 시드 기상·SOP를 쓴다)
 * resume: 「상황 저장」으로 SOP 없이 저장한 상황 — 저장한 값으로 채워 이어서 작성
 */
export function NewSituation({
  sido,
  hazard,
  tutorial,
  resume,
}: {
  sido: string;
  hazard: string;
  tutorial?: SituationInput;
  resume?: { id: string; input: SituationInput; savedAt: string };
}) {
  const router = useRouter();
  const [initial] = useState<SituationInput>(() => resume?.input ?? defaultInput(sido, hazard));
  const [v, setV] = useState<SituationInput>(initial);
  // 현재 위치(상단)를 바꾸면 발생지역도 그 시도 기본값으로 맞춘다. 발생지역을 바꿔도 현재 위치는 그대로.
  // 이어서 작성은 저장한 발생지역을 지킨다.
  const [locSido, setLocSido] = useState(sido);
  if (!resume && locSido !== sido) {
    setLocSido(sido);
    const prev = sidoShort(v.sido);
    setV({
      ...v,
      sido,
      areas: [],
      title: v.title.includes(prev) ? v.title.replace(prev, sidoShort(sido)) : v.title,
    });
  }
  const opts = { tutorial: !!tutorial };
  const withSop = useSubmit((x: SituationInput) => createSituation(x, true, opts));
  const only = useSubmit((x: SituationInput) => createSituation(x, false, opts));

  // 이어서 작성: 저장(updateSituation) → 홈 / 저장 + SOP 생성 → SOP 탭. T3Q 실패 시 오류만 보이고 화면 유지
  const [resumeBusy, startResume] = useTransition();
  const [resumeKey, setResumeKey] = useState<"save" | "sop" | null>(null);
  const [resumeError, setResumeError] = useState<string | null>(null);
  const runResume = (key: "save" | "sop") => {
    if (!resume) return;
    setResumeKey(key);
    setResumeError(null);
    startResume(async () => {
      try {
        const r = await updateSituation(resume.id, v);
        if (r.error) return setResumeError(r.error);
        if (key === "save") return router.push("/");
        const g = await generateSop(resume.id);
        if (g.error) return setResumeError(g.error);
        router.push(`/s/${resume.id}/sop`);
      } catch (e) {
        setResumeError(e instanceof Error ? e.message : "처리 중 오류가 발생했습니다.");
      }
    });
  };

  const pending = withSop.pending || only.pending || resumeBusy;
  const error = resume ? resumeError : withSop.error || only.error;
  const sopPending = resume ? resumeBusy && resumeKey === "sop" : withSop.pending;

  // 입력 중 다른 화면으로 나가면 확인 (N-03)
  const dirty = !pending && JSON.stringify(v) !== JSON.stringify(initial);
  const leaveTo = useLeaveGuard(dirty);

  return (
    <main className="mx-auto max-w-[1280px] px-6 pt-8">
      <Card>
        <CardHead
          title={resume ? "상황정보 등록" : "새 상황정보 등록"}
          right={
            resume ? (
              <span className="text-[16px] text-sub">저장됨 · {fmtDateTime(resume.savedAt)} · SOP 미생성</span>
            ) : (
              tutorial && (
                <Button variant="primary" data-tour="tour-fill" onClick={() => setV(tutorial)}>
                  <Wand2 size={18} /> 따라하기 내용 채우기
                </Button>
              )
            )
          }
        />
        <div className="px-6 pb-8" data-tour="new-form">
          <SituationFields value={v} onChange={setV} />
        </div>
      </Card>
      {/* 버튼 줄 — 화면 아래 고정 */}
      <div className="sticky bottom-0 z-20 -mx-6 mt-6 flex items-center justify-end gap-3 border-t border-line-weak bg-white px-6 py-4">
        {error && <span className="mr-auto text-[16px] text-danger">{error}</span>}
        <Button size="lg" disabled={pending} onClick={() => (resume ? runResume("save") : only.submit(v))}>
          상황 저장
        </Button>
        <Button
          size="lg"
          variant="primary"
          data-tour="new-sop"
          disabled={pending}
          onClick={() => (resume ? runResume("sop") : withSop.submit(v))}
        >
          <Sparkles size={20} />
          {sopPending ? "SOP 생성 중" : "SOP 생성하기"}
        </Button>
      </div>
      <Modal
        open={!!leaveTo.href}
        onClose={leaveTo.cancel}
        title="화면 나가기"
        width={460}
        footer={
          <>
            <Button onClick={leaveTo.cancel}>계속 입력</Button>
            <Button variant="danger" onClick={leaveTo.confirm}>
              나가기
            </Button>
          </>
        }
      >
        <p className="text-[18px]">입력한 내용은 저장되지 않습니다.</p>
      </Modal>
    </main>
  );
}

/** 입력 중 화면 밖으로 나가는 링크·새로고침을 가로채 확인 (Next 에는 이동을 막는 기능이 없어 링크 클릭을 직접 잡는다) */
function useLeaveGuard(dirty: boolean) {
  const router = useRouter();
  const [href, setHref] = useState<string | null>(null);
  useEffect(() => {
    if (!dirty) return;
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as HTMLElement | null)?.closest?.("a[href]") as HTMLAnchorElement | null;
      if (!a || a.target === "_blank" || a.hasAttribute("download")) return;
      const url = new URL(a.href, location.href);
      if (url.origin !== location.origin || url.pathname + url.search === location.pathname + location.search) return;
      e.preventDefault();
      e.stopPropagation();
      setHref(url.pathname + url.search + url.hash);
    };
    const onUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
    };
    document.addEventListener("click", onClick, true);
    window.addEventListener("beforeunload", onUnload);
    return () => {
      document.removeEventListener("click", onClick, true);
      window.removeEventListener("beforeunload", onUnload);
    };
  }, [dirty]);
  return {
    href,
    cancel: () => setHref(null),
    confirm: () => {
      const to = href;
      setHref(null);
      if (to) router.push(to);
    },
  };
}

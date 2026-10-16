"use client";
import { useCallback, useEffect, useLayoutEffect, useState } from "react";
import { createPortal } from "react-dom";
import { usePathname, useRouter } from "next/navigation";
import { GraduationCap, X } from "lucide-react";
import { Button } from "./ui";

/**
 * 따라하기 — 부산 풍수해 시나리오를 실제 화면 위에서 말풍선으로 안내한다.
 *  - 대상 요소는 data-tour 표시로 찾는다. 「다음」, 대상 누르기, 화면 이동 중 하나로 넘어간다.
 *  - 「중지」하면 그 화면에 멈춘다. 진행 상태는 이 브라우저에만 기억한다.
 */
const KEY = "r4_tour";
type Ctx = { sid?: string; rid?: string };
type Step = {
  path: RegExp;
  /** 그 화면 주소 (다른 화면에 있을 때 「그 화면으로」) */
  href?: (c: Ctx) => string | undefined;
  target?: string;
  title: string;
  body: string;
  /** next: 다음 버튼 · click: 대상 누르면 · path: 그 주소가 되면 · appear: 그 표시가 나타나면 */
  advance: "next" | "click" | { path: RegExp } | { appear: string };
  /** SOP 화면에서 이 코드의 임무를 고른다 */
  select?: string;
};

const SOP = (c: Ctx) => (c.sid ? `/s/${c.sid}/sop` : undefined);
export const TOUR_STEPS: Step[] = [
  {
    path: /^\/new$/,
    href: () => "/new?tutorial=1",
    target: "tour-fill",
    title: "상황정보를 한 번에 채웁니다",
    body: "입력할 곳이 많은 상황정보는 따라하기에서 한 번에 채웁니다. 「따라하기 내용 채우기」를 누르세요.",
    advance: "click",
  },
  {
    path: /^\/new$/,
    target: "new-form",
    title: "상황정보 = 매뉴얼을 고르는 열쇠",
    body: "재난유형(태풍/호우)·위기경보·대응단계(1단계 징후감지)·발생지역·담당부서(자연재난과)가 채워졌습니다. 이 정보로 부산 풍수해 현장조치 행동매뉴얼에서 SOP를 뽑습니다. 실제 상황에서는 여기를 직접 고릅니다.",
    advance: "next",
  },
  {
    path: /^\/new$/,
    target: "new-sop",
    title: "SOP 만들기",
    body: "「SOP 생성하기」를 누르세요. 상황이 저장되고 매뉴얼의 조치들이 SOP로 만들어진 뒤 SOP 화면으로 넘어갑니다.",
    advance: { path: /^\/s\/[^/]+\/sop$/ },
  },
  {
    path: /^\/s\/[^/]+\/sop$/,
    href: SOP,
    target: "sop-flow",
    title: "SOP 흐름",
    body: "왼쪽에 매뉴얼의 조치가 대응단계별 번호 순으로 놓입니다. 분홍이 지금 할 임무, 노란 마름모는 상황판단, 하늘색 테두리는 상황전파입니다. 임무를 누르면 가운데에 임무 상세가 열립니다.",
    advance: "next",
  },
  {
    path: /^\/s\/[^/]+\/sop$/,
    href: SOP,
    target: "ondemand",
    title: "필요시 임무",
    body: "「태풍 한반도 북상 우려시」처럼 조건이 붙은 조치는 대응단계 끝 「필요시 임무」에 따로 둡니다. 상황이 생기면 순서와 상관없이 바로 눌러 실행합니다.",
    advance: "next",
  },
  {
    path: /^\/s\/[^/]+\/sop$/,
    href: SOP,
    target: "sop-edit",
    title: "SOP 편집",
    body: "임무나 세부항목을 고치려면 「SOP 편집」을 누르세요.",
    advance: "click",
  },
  {
    path: /^\/s\/[^/]+\/sop$/,
    href: SOP,
    select: "1-1",
    target: "detail-add",
    title: "세부항목 더하기",
    body: "임무마다 할 일을 더하거나 고칠 수 있습니다. 예) 「해운대 지하차도 침수 예찰」을 적고 「추가」를 누른 뒤 「다음」.",
    advance: "next",
  },
  {
    path: /^\/s\/[^/]+\/sop$/,
    href: SOP,
    target: "edit-done",
    title: "편집 종료",
    body: "「편집 종료」를 누르면 보기 화면으로 돌아갑니다.",
    advance: "click",
  },
  {
    path: /^\/s\/[^/]+\/sop$/,
    href: SOP,
    target: "sop-start",
    title: "SOP 실행 시작",
    body: "「SOP 실행 시작」을 누르세요. 이때부터 오른쪽 수행 이력에 시각과 함께 남습니다.",
    advance: "click",
  },
  {
    path: /^\/s\/[^/]+\/sop$/,
    href: SOP,
    select: "1-1",
    target: "mission-start",
    title: "임무 착수",
    body: "첫 임무 「기상정보 모니터링」을 「착수」합니다.",
    advance: "click",
  },
  {
    path: /^\/s\/[^/]+\/sop$/,
    href: SOP,
    select: "1-1",
    target: "mission-done",
    title: "조치 완료",
    body: "세부항목을 체크하고 조치결과를 적은 뒤 「조치 완료」를 누릅니다. 조치결과를 비워 두면 체크한 세부항목으로 채워집니다.",
    advance: "click",
  },
  {
    path: /^\/s\/[^/]+\/sop$/,
    href: SOP,
    select: "2-2",
    target: "propagation",
    title: "상황전파",
    body: "「기상특보 전파」 임무입니다. 추천 전파그룹 「+ 유관기관」을 눌러 대상에 넣고, 「착수」한 뒤 「전파」 → 발송 방법(문자·이메일)을 고르고 「n명에게 전파」를 누르면 현장 담당자에게 응답 링크가 갑니다. 보낸 뒤 「다음」.",
    advance: "next",
  },
  {
    path: /^\/s\/[^/]+\/sop$/,
    href: SOP,
    target: "sop-end",
    title: "실행 종료",
    body: "「실행 종료」를 누르고 확인 창에서 「종료」를 누르세요.",
    advance: { appear: "report-create" },
  },
  {
    path: /^\/s\/[^/]+\/sop$/,
    href: SOP,
    target: "report-create",
    title: "상황일지 작성",
    body: "「상황일지 작성」을 누르면 SOP 실행 이력·상황전파·기상특보로 상황일지가 자동으로 만들어집니다.",
    advance: { path: /^\/reports\/[^/]+$/ },
  },
  {
    path: /^\/reports\/[^/]+$/,
    href: (c) => (c.rid ? `/reports/${c.rid}` : undefined),
    target: "report-toc",
    title: "목차 편집",
    body: "목차를 눌러 그 장으로 가고, 제목을 고치거나 ↑↓로 순서를 바꾸고 ＋로 장을 더합니다. 본문은 오른쪽에서 바로 고칩니다.",
    advance: "next",
  },
  {
    path: /^\/reports\/[^/]+$/,
    href: (c) => (c.rid ? `/reports/${c.rid}` : undefined),
    target: "report-export",
    title: "내보내기",
    body: "한글(HWPX)·워드·PDF로 내려받습니다. 한글 파일은 한컴오피스에서 그대로 열립니다.",
    advance: "next",
  },
  {
    path: /^\/reports\/[^/]+$/,
    href: (c) => (c.rid ? `/reports/${c.rid}` : undefined),
    target: "report-hwp",
    title: "한글 편집",
    body: "웹 한글 편집기로 열어 한글과 같은 모양으로 고치고 저장합니다. 저장본은 내보내기 때 그대로 쓰입니다.",
    advance: "next",
  },
  {
    path: /^\/s\/[^/]+$/,
    href: (c) => (c.sid ? `/s/${c.sid}` : undefined),
    target: "weather",
    title: "기상특보 보고",
    body: "발효 중인 특보, 강수 현황과 전망이 자동으로 들어갑니다. 아래 세 칸에는 방재기상정보시스템의 특보·레이더·위성 그림을 끌어다 놓거나 Ctrl+V로 붙입니다.",
    advance: "next",
  },
];

type State = { i: number } & Ctx;
const load = (): State | null => {
  try {
    return JSON.parse(localStorage.getItem(KEY) ?? "null");
  } catch {
    return null;
  }
};
const save = (s: State | null) => {
  try {
    if (s) localStorage.setItem(KEY, JSON.stringify(s));
    else localStorage.removeItem(KEY);
  } catch {}
  window.dispatchEvent(new Event("r4-tour"));
};

/** 따라하기 시작 (홈 버튼) */
export function startTour(push: (href: string) => void) {
  save({ i: 0 });
  push("/new?tutorial=1");
}

export function Tour() {
  const path = usePathname();
  const router = useRouter();
  const [st, setSt] = useState<State | null>(null);
  const [box, setRect] = useState<DOMRect | null>(null);
  const [vw, setVw] = useState({ w: 1200, h: 800 });

  useEffect(() => {
    const sync = () => setSt(load());
    sync();
    window.addEventListener("r4-tour", sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener("r4-tour", sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  const step = st && st.i < TOUR_STEPS.length ? TOUR_STEPS[st.i] : null;
  const done = !!st && st.i >= TOUR_STEPS.length;
  const here = !!step && step.path.test(path);

  const go = useCallback((i: number) => {
    const cur = load();
    if (cur) save({ ...cur, i });
  }, []);

  // 화면 주소에서 상황·상황일지 번호를 기억
  useEffect(() => {
    if (!st) return;
    const s = path.match(/^\/s\/([^/]+)/)?.[1];
    const r = path.match(/^\/reports\/([^/]+)/)?.[1];
    if ((s && s !== st.sid) || (r && r !== st.rid)) save({ ...st, ...(s ? { sid: s } : {}), ...(r ? { rid: r } : {}) });
  }, [path, st]);

  // 주소가 바뀌면 넘어가는 단계
  useEffect(() => {
    if (!step || typeof step.advance !== "object" || !("path" in step.advance)) return;
    if (step.advance.path.test(path)) go(st!.i + 1);
  }, [path, step, st, go]);

  // 대상 위치 따라가기 · 임무 고르기 · 표시가 나타나면 넘어가기
  useLayoutEffect(() => {
    if (!step || !here) return;
    if (step.select) window.dispatchEvent(new CustomEvent("r4-tour-select", { detail: step.select }));
    let first = true;
    const tick = () => {
      setVw({ w: window.innerWidth, h: window.innerHeight });
      if (typeof step.advance === "object" && "appear" in step.advance && document.querySelector(`[data-tour="${step.advance.appear}"]`)) {
        go(st!.i + 1);
        return;
      }
      const el = step.target ? document.querySelector<HTMLElement>(`[data-tour="${step.target}"]`) : null;
      if (!el) {
        setRect(null);
        return;
      }
      if (first) {
        el.scrollIntoView({ block: "center", behavior: "smooth" });
        first = false;
      }
      setRect(el.getBoundingClientRect());
    };
    const t = setTimeout(tick, 250);
    const iv = setInterval(tick, 300);
    return () => {
      clearTimeout(t);
      clearInterval(iv);
    };
  }, [step, here, st, go]);

  // 대상을 누르면 넘어가는 단계
  useEffect(() => {
    if (!step || !here || step.advance !== "click" || !step.target) return;
    const sel = `[data-tour="${step.target}"]`;
    const on = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest(sel)) setTimeout(() => go(st!.i + 1), 60);
    };
    document.addEventListener("click", on, true);
    return () => document.removeEventListener("click", on, true);
  }, [step, here, st, go]);

  if (!st) return null;
  const stop = () => save(null);
  const n = TOUR_STEPS.length;

  if (done) {
    return createPortal(
      <Bubble style={{ right: 24, bottom: 24 }} no={n} total={n} title="따라하기를 마쳤습니다" onStop={stop}>
        <p>상황정보 등록부터 SOP 편집·실행, 상황전파, 상황일지까지 마쳤습니다. 만든 상황은 「따라하기」 꼬리표로 목록에 남습니다.</p>
        <div className="mt-4 flex justify-end">
          <Button variant="primary" onClick={stop}>
            마치기
          </Button>
        </div>
      </Bubble>,
      document.body,
    );
  }
  if (!step) return null;

  // 다른 화면에 있을 때 — 작게 띄우고 그 화면으로 가는 버튼
  if (!here) {
    const href = step.href?.(st);
    return createPortal(
      <Bubble style={{ right: 24, bottom: 24 }} no={st.i + 1} total={n} title={step.title} onStop={stop}>
        <p>따라하기를 이어 하려면 그 화면으로 가세요.</p>
        <div className="mt-4 flex justify-end gap-2">
          {st.i > 0 && <Button onClick={() => go(st.i - 1)}>이전</Button>}
          {href && (
            <Button variant="primary" onClick={() => router.push(href)}>
              그 화면으로
            </Button>
          )}
        </div>
      </Bubble>,
      document.body,
    );
  }

  // 말풍선 위치: 대상 아래가 넉넉하면 아래, 아니면 위. 대상이 없으면 오른쪽 아래
  const W = 400;
  let pos: React.CSSProperties = { right: 24, bottom: 24 };
  const rect = here ? box : null;
  if (rect) {
    const left = Math.min(Math.max(rect.left, 16), vw.w - W - 16);
    // 아래 → 위 → (대상이 화면보다 크면) 오른쪽 아래 고정. 늘 화면 안에 둔다
    if (vw.h - rect.bottom > 260) pos = { left, top: rect.bottom + 14 };
    else if (rect.top > 260) pos = { left, bottom: vw.h - rect.top + 14 };
    else pos = { right: 24, bottom: 24 };
  }
  return createPortal(
    <>
      {rect && (
        <div
          className="pointer-events-none fixed z-[70] rounded-lg ring-4 ring-[#ff3d8b] transition-all duration-200"
          style={{
            left: rect.left - 6,
            top: rect.top - 6,
            width: rect.width + 12,
            height: rect.height + 12,
            boxShadow: "0 0 0 9999px rgba(10,16,40,.45)",
          }}
        />
      )}
      <Bubble style={pos} no={st.i + 1} total={n} title={step.title} onStop={stop}>
        <p>{step.body}</p>
        <div className="mt-4 flex justify-end gap-2">
          {st.i > 0 && <Button onClick={() => go(st.i - 1)}>이전</Button>}
          {step.advance === "next" ? (
            <Button variant="primary" onClick={() => go(st.i + 1)}>
              다음
            </Button>
          ) : (
            <Button variant="ghost" onClick={() => go(st.i + 1)}>
              건너뛰기
            </Button>
          )}
        </div>
      </Bubble>
    </>,
    document.body,
  );
}

function Bubble({
  style,
  no,
  total,
  title,
  onStop,
  children,
}: {
  style: React.CSSProperties;
  no: number;
  total: number;
  title: string;
  onStop: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="fixed z-[71] w-[400px] max-w-[calc(100vw-32px)] rounded-xl bg-white p-5 text-[17px] leading-relaxed text-ink shadow-[0_16px_48px_rgba(0,0,0,.35)]" style={style}>
      <div className="mb-2 flex items-center gap-2">
        <GraduationCap size={20} className="text-primary" />
        <span className="text-[15px] font-semibold text-primary">
          따라하기 {no}/{total}
        </span>
        <button onClick={onStop} className="ml-auto flex items-center gap-1 rounded px-2 py-1 text-[15px] text-sub hover:bg-canvas" aria-label="따라하기 중지">
          <X size={16} /> 중지
        </button>
      </div>
      <div className="mb-1 text-[19px] font-bold">{title}</div>
      {children}
    </div>
  );
}

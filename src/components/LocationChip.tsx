"use client";
import { useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { ChevronDown, Crosshair, MapPin } from "lucide-react";
import { Button, Modal } from "./ui";
import { clearLocation, locateByGps, setLocation } from "@/app/actions/location";
import { REGION_TREE } from "@/lib/regions";

type Loc = { sido: string; sigungu: string; src: "gps" | "manual" } | null;
type State = "checking" | "ok" | "fail";

/**
 * 기상특보 바의 위치 버튼 (C-01) — 「📍 부산광역시 · 기본 지역 ▾」. 누르면 현재 위치 설정 창.
 * 기준: 기본 지역(위치 없음, 기관 시도) · 현재 위치(브라우저 위치로 찾음) · 선택 지역(직접 고름).
 * 접속 시 브라우저 위치로 시군구를 잡는다.
 */
export function LocationChip({ location, fallbackSido }: { location: Loc; fallbackSido: string }) {
  const router = useRouter();
  const [state, setState] = useState<State>(location ? "ok" : "checking");
  const [open, setOpen] = useState(false);
  const [sido, setSido] = useState(location?.sido ?? fallbackSido);
  const [sgg, setSgg] = useState(location?.sigungu ?? "");
  const [error, setError] = useState<string | null>(null);
  const [pending, start] = useTransition();

  const locate = () => {
    if (!navigator.onLine || !navigator.geolocation) {
      setState("fail");
      return;
    }
    setState("checking");
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const r = await locateByGps(pos.coords.latitude, pos.coords.longitude);
          if (r) {
            setState("ok");
            router.refresh();
          } else setState("fail");
        } catch {
          setState("fail");
        }
      },
      () => setState(location ? "ok" : "fail"),
      { timeout: 8000, maximumAge: 10 * 60 * 1000 },
    );
  };

  // 자동 확인: 직접 설정한 위치가 없을 때, 브라우저 세션당 한 번
  useEffect(() => {
    if (location?.src === "manual") return;
    let done = false;
    try {
      done = sessionStorage.getItem("r4_located") === "1";
      sessionStorage.setItem("r4_located", "1");
    } catch {}
    if (done && location) return;
    const t = setTimeout(locate, 0);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const node = REGION_TREE.find((s) => s.n === sido);
  const place = location ? `${location.sido} ${location.sigungu}`.trim() : fallbackSido;
  const basis = state === "checking" && !location ? "위치 확인 중" : !location ? "기본 지역" : location.src === "gps" ? "현재 위치" : "선택 지역";

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        aria-label="현재 위치 설정"
        className="flex h-9 shrink-0 items-center gap-1.5 rounded-full border border-primary-line bg-white px-3.5 text-[16px] hover:border-primary"
      >
        <MapPin size={17} className="text-primary" />
        <b>{place}</b>
        <span className="text-[15px] text-sub">· {basis}</span>
        <ChevronDown size={16} className="text-sub" />
      </button>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="현재 위치 설정"
        width={520}
        footer={
          <>
            {error && <span className="mr-auto self-center text-danger">{error}</span>}
            <Button
              variant="ghost"
              disabled={pending}
              onClick={() =>
                start(async () => {
                  await clearLocation();
                  setOpen(false);
                  locate();
                })
              }
            >
              <Crosshair size={17} /> 자동으로 찾기
            </Button>
            <Button
              variant="primary"
              disabled={pending || !sido}
              onClick={() =>
                start(async () => {
                  try {
                    await setLocation(sido, sgg);
                    setState("ok");
                    setOpen(false);
                    router.refresh();
                  } catch (e) {
                    setError(e instanceof Error ? e.message : "저장하지 못했습니다.");
                  }
                })
              }
            >
              설정
            </Button>
          </>
        }
      >
        <div className="space-y-3">
          <select
            className="input"
            value={sido}
            onChange={(e) => {
              setSido(e.target.value);
              setSgg("");
            }}
          >
            {REGION_TREE.map((s) => (
              <option key={s.c} value={s.n}>
                {s.n}
              </option>
            ))}
          </select>
          <select className="input" value={sgg} onChange={(e) => setSgg(e.target.value)}>
            <option value="">시군구 전체</option>
            {node?.s.map((s) => (
              <option key={s.c} value={s.n}>
                {s.n}
              </option>
            ))}
          </select>
        </div>
      </Modal>
    </>
  );
}

"use client";
import { useRouter } from "next/navigation";
import { GraduationCap } from "lucide-react";
import { startTour } from "./Tour";

/** 홈의 「따라하기」 카드 — 부산 풍수해 시나리오로 처음부터 */
export function TourStart() {
  const router = useRouter();
  return (
    <button
      onClick={() => startTour(router.push)}
      className="card flex h-[200px] flex-col items-center justify-center gap-3 border-2 border-transparent text-[18px] font-semibold transition hover:border-primary"
    >
      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[#052b57] text-white">
        <GraduationCap size={30} />
      </span>
      따라하기
    </button>
  );
}

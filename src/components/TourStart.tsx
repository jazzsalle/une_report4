"use client";
import { useRouter } from "next/navigation";
import { GraduationCap } from "lucide-react";
import { startTour } from "./Tour";
import { Button } from "./ui";

/** 홈의 「따라하기」 보조 버튼 — 부산 풍수해 시나리오로 처음부터 */
export function TourStart() {
  const router = useRouter();
  return (
    <Button size="lg" onClick={() => startTour(router.push)}>
      <GraduationCap size={22} /> 따라하기
    </Button>
  );
}

"use client";
import { useTransition } from "react";
import { FileText } from "lucide-react";
import { Button } from "@/components/ui";
import { createReport } from "@/app/actions/situation";

/** 상황일지 자동 작성 — 탭의 주 버튼 (R-08) */
export function CreateReportButton({ id }: { id: string }) {
  const [pending, start] = useTransition();
  return (
    <Button variant="primary" disabled={pending} onClick={() => start(() => createReport(id))}>
      <FileText size={18} /> {pending ? "작성 중" : "상황일지 자동 작성"}
    </Button>
  );
}

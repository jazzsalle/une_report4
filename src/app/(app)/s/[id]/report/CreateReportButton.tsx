"use client";
import { useTransition } from "react";
import { FileText } from "lucide-react";
import { Button } from "@/components/ui";
import { createReport } from "@/app/actions/situation";

export function CreateReportButton({ id, primary }: { id: string; primary: boolean }) {
  const [pending, start] = useTransition();
  return (
    <Button variant={primary ? "primary" : "secondary"} disabled={pending} onClick={() => start(() => createReport(id))}>
      <FileText size={18} /> {pending ? "작성 중" : "상황일지 자동 작성"}
    </Button>
  );
}

"use client";
import { useEffect, useRef, useState } from "react";
import { ArrowLeft, Download, Printer, RefreshCw, Save } from "lucide-react";
import type { RhwpEditor } from "@rhwp/editor";
import { Button, Modal } from "@/components/ui";
import type { ReportContent } from "@/lib/types";
import { getHwpx, saveHwpx } from "@/app/actions/report";
import { base64ToBytes, bytesToBase64, downloadBytes, makeHwpx } from "@/lib/export/client";
import { fmtTime } from "@/lib/format";

/** rhwp 기반 한글 웹편집기 — 자동 구성된 HWPX 를 열어 간단히 고치고 저장한다 */
export function HwpEditor({
  reportId,
  content,
  filename,
  editable,
  onClose,
}: {
  reportId: string;
  content: ReportContent;
  filename: string;
  editable: boolean;
  onClose: (savedAt: string | null) => void;
}) {
  const box = useRef<HTMLDivElement>(null);
  const ed = useRef<RhwpEditor | null>(null);
  const [state, setState] = useState<"loading" | "ready" | "error">("loading");
  const [error, setError] = useState("");
  const [savedAt, setSavedAt] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [saveError, setSaveError] = useState("");
  const [confirmReset, setConfirmReset] = useState(false);

  const load = async (fromDraft: boolean) => {
    const editor = ed.current;
    if (!editor) return;
    const saved = fromDraft ? null : await getHwpx(reportId);
    const bytes = saved ? base64ToBytes(saved) : await makeHwpx(content);
    await editor.loadFile(bytes, `${filename}.hwpx`, { skipUnsavedGuard: true });
  };

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const { createEditor } = await import("@rhwp/editor");
        if (!box.current) return;
        const editor = await createEditor(box.current, {
          studioUrl: process.env.NEXT_PUBLIC_RHWP_STUDIO_URL || `${window.location.origin}/rhwp-studio/`,
          height: "100%",
        });
        if (!alive) return editor.destroy();
        ed.current = editor;
        await load(false);
        setState("ready");
      } catch (e) {
        console.error(e);
        if (alive) {
          setError(e instanceof Error ? e.message : String(e));
          setState("error");
        }
      }
    })();
    return () => {
      alive = false;
      ed.current?.destroy();
      ed.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const save = async () => {
    if (!ed.current) return;
    setBusy(true);
    setSaveError("");
    try {
      const bytes = await ed.current.exportHwpx();
      const b64 = bytesToBase64(bytes);
      if (b64.length > 3_900_000) throw new Error("문서가 너무 커서 저장할 수 없습니다. 그림 크기를 줄이거나 「HWPX」로 내려받아 보관하세요.");
      const r = await saveHwpx(reportId, b64);
      setSavedAt(r.savedAt);
      ed.current.notifySaved(`${filename}.hwpx`).catch(() => {});
    } catch (e) {
      setSaveError(e instanceof Error ? e.message : "저장하지 못했습니다.");
    } finally {
      setBusy(false);
    }
  };

  const download = async () => {
    if (!ed.current) return;
    downloadBytes(await ed.current.exportHwpx(), `${filename}.hwpx`, "application/hwp+zip");
  };

  /** 편집기 렌더링 결과(SVG)를 그대로 인쇄 — PDF 저장 포함 */
  const print = async () => {
    if (!ed.current) return;
    setBusy(true);
    try {
      const n = await ed.current.pageCount();
      const pages: string[] = [];
      for (let i = 0; i < n; i++) pages.push(await ed.current.getPageSvg(i));
      const frame = document.createElement("iframe");
      frame.style.cssText = "position:fixed;right:0;bottom:0;width:0;height:0;border:0";
      document.body.appendChild(frame);
      const doc = frame.contentDocument!;
      doc.open();
      doc.write(
        `<!doctype html><html><head><title>${filename}</title><style>@page{size:A4;margin:0}body{margin:0}.p{page-break-after:always;width:210mm;height:297mm;overflow:hidden}.p svg{width:100%;height:100%}</style></head><body>${pages
          .map((s) => `<div class="p">${s}</div>`)
          .join("")}</body></html>`,
      );
      doc.close();
      setTimeout(() => {
        frame.contentWindow?.focus();
        frame.contentWindow?.print();
        setTimeout(() => frame.remove(), 1000);
      }, 400);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="flex h-[calc(100vh-172px)] flex-col">
      <div className="flex flex-wrap items-center gap-2 border-b border-line bg-white px-6 py-3">
        <Button size="sm" variant="ghost" onClick={() => onClose(savedAt)}>
          <ArrowLeft size={18} /> 초안으로
        </Button>
        <span className="text-[19px] font-bold">한글 편집</span>
        {savedAt && !saveError && <span className="text-[15px] text-mute">{fmtTime(savedAt).split(" ")[1]} 저장됨</span>}
        {saveError && <span className="font-semibold text-danger">{saveError}</span>}
        <div className="ml-auto flex gap-2">
          {editable && (
            <Button size="sm" variant="ghost" disabled={state !== "ready" || busy} onClick={() => setConfirmReset(true)}>
              <RefreshCw size={17} /> 초안 다시 불러오기
            </Button>
          )}
          <Button size="sm" variant="ghost" disabled={state !== "ready" || busy} onClick={download}>
            <Download size={17} /> HWPX
          </Button>
          <Button size="sm" variant="ghost" disabled={state !== "ready" || busy} onClick={print}>
            <Printer size={17} /> 인쇄·PDF
          </Button>
          {editable && (
            <Button size="sm" variant="primary" disabled={state !== "ready" || busy} onClick={save}>
              <Save size={17} /> 저장
            </Button>
          )}
        </div>
      </div>
      <div className="relative flex-1 bg-canvas">
        <div ref={box} className="absolute inset-0" />
        {state === "loading" && (
          <div className="absolute inset-0 flex items-center justify-center text-[18px] text-sub">편집기를 여는 중</div>
        )}
        {state === "error" && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-[18px]">
            <p>편집기를 열 수 없습니다.</p>
            <p className="text-[15px] text-mute">{error}</p>
          </div>
        )}
      </div>
      <Modal
        open={confirmReset}
        onClose={() => setConfirmReset(false)}
        title="초안 다시 불러오기"
        width={460}
        footer={
          <>
            <Button onClick={() => setConfirmReset(false)}>취소</Button>
            <Button
              variant="primary"
              onClick={async () => {
                setConfirmReset(false);
                await load(true);
              }}
            >
              불러오기
            </Button>
          </>
        }
      >
        <p className="text-[18px]">한글 편집기에서 고친 내용 대신 현재 초안으로 다시 엽니다.</p>
      </Modal>
    </div>
  );
}

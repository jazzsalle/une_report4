"use client";
import { useEffect, useRef, useState } from "react";
import { ExternalLink } from "lucide-react";
import { Modal } from "@/components/ui";
import type { PDFDocumentProxy } from "pdfjs-dist";

type Ref = NonNullable<import("@/lib/types").Mission["ref"]>;

/** 매뉴얼 PDF — 문서마다 한 번만 받는다(부산 약 10MB). pdfjs 는 처음 열 때만 불러온다 */
const docs = new Map<string, Promise<PDFDocumentProxy>>();
function loadDoc(docId: string) {
  let p = docs.get(docId);
  if (!p) {
    p = import("pdfjs-dist").then((pdfjs) => {
      pdfjs.GlobalWorkerOptions.workerSrc = new URL("pdfjs-dist/build/pdf.worker.min.mjs", import.meta.url).toString();
      return pdfjs.getDocument({ url: `/manual/${encodeURIComponent(docId)}` }).promise;
    });
    p.catch(() => docs.delete(docId));
    docs.set(docId, p);
  }
  return p;
}

/** 행동카드 첫 쪽에는 세 매뉴얼(부산·영천·인제) 모두 「코드번호」 머리가 있다 */
async function isCardHead(doc: PDFDocumentProxy, pdfIndex: number) {
  const tc = await (await doc.getPage(pdfIndex + 1)).getTextContent();
  return tc.items.map((i) => ("str" in i ? i.str : "")).join("").replace(/\s+/g, "").includes("코드번호");
}

/** 카드 쪽 — 후보 중 카드 머리가 있는 쪽부터 다음 카드 머리 전까지 (최대 8쪽) */
async function cardRange(doc: PDFDocumentProxy, cards: { pdfIndex: number }[]) {
  let start = cards[0].pdfIndex;
  for (const c of cards) {
    if (await isCardHead(doc, c.pdfIndex)) {
      start = c.pdfIndex;
      break;
    }
  }
  const pages = [start];
  while (pages.length < 8 && start + pages.length < doc.numPages && !(await isCardHead(doc, start + pages.length)))
    pages.push(start + pages.length);
  return pages;
}

function PageCanvas({ doc, pdfIndex }: { doc: PDFDocumentProxy; pdfIndex: number }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    let task: { cancel(): void } | undefined;
    (async () => {
      const page = await doc.getPage(pdfIndex + 1);
      const canvas = ref.current;
      if (!canvas) return;
      const width = canvas.parentElement?.clientWidth ?? 880;
      const base = page.getViewport({ scale: 1 });
      const viewport = page.getViewport({ scale: (width / base.width) * Math.min(window.devicePixelRatio || 1, 2) });
      canvas.width = viewport.width;
      canvas.height = viewport.height;
      const t = page.render({ canvas, viewport });
      task = t;
      await t.promise.catch(() => {});
    })();
    return () => task?.cancel();
  }, [doc, pdfIndex]);
  return <canvas ref={ref} className="block h-auto w-full border border-line-weak bg-white" />;
}

export function CardPages({ open, onClose, title, docRef }: { open: boolean; onClose: () => void; title: string; docRef: Ref }) {
  const [state, setState] = useState<{ doc: PDFDocumentProxy; pages: number[] } | "loading" | "error">("loading");
  const cards = docRef.cards ?? [];
  const key = `${docRef.docId}:${cards.map((c) => c.pdfIndex).join(",")}`;

  useEffect(() => {
    if (!open || !cards.length) return;
    let alive = true;
    loadDoc(docRef.docId)
      .then(async (doc) => ({ doc, pages: await cardRange(doc, cards) }))
      .then((s) => alive && setState(s))
      .catch(() => alive && setState("error"));
    return () => {
      alive = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, key]);

  const first = typeof state === "object" ? state.pages[0] : (cards[0]?.pdfIndex ?? docRef.pdfIndex);
  const newWindow = (
    <a
      href={`/manual/${encodeURIComponent(docRef.docId)}#page=${first + 1}`}
      target="_blank"
      rel="noopener"
      className="inline-flex items-center gap-1.5 font-medium text-primary hover:underline"
    >
      새 창에서 열기 <ExternalLink size={16} />
    </a>
  );

  return (
    <Modal open={open} onClose={onClose} title={title} width={960} footer={newWindow}>
      {state === "loading" && <p className="py-10 text-center text-sub">매뉴얼 원문을 불러오는 중입니다…</p>}
      {state === "error" && <p className="py-10 text-center text-danger">매뉴얼 원문을 불러오지 못했습니다.</p>}
      {typeof state === "object" && (
        <div className="space-y-4">
          {state.pages.map((i) => (
            <PageCanvas key={i} doc={state.doc} pdfIndex={i} />
          ))}
        </div>
      )}
    </Modal>
  );
}

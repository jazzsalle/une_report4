"use client";
import { useEffect, useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import clsx from "clsx";
import {
  ArrowDown,
  ArrowUp,
  CheckCircle2,
  ChevronDown,
  Download,
  FilePenLine,
  Pencil,
  Plus,
  Printer,
  RefreshCw,
  Save,
  Trash2,
} from "lucide-react";
import { nanoid } from "nanoid";
import { Badge, Button, Modal } from "@/components/ui";
import type { ReportContent, ReportSection } from "@/lib/types";
import { recomposeReport, saveReport, setReportStatus, trashReport, getHwpx } from "@/app/actions/report";
import { subtitleOf, safeFilename } from "@/lib/export/blocks";
import { BackButton } from "@/components/BackButton";
import { DocBlocks } from "@/components/DocView";
import { downloadBytes, exportDocx, exportHwpx, base64ToBytes } from "@/lib/export/client";
import { fmtTime } from "@/lib/format";

const HwpEditor = dynamic(() => import("./HwpEditor").then((m) => m.HwpEditor), { ssr: false });

export function ReportEditor({
  id,
  situationId,
  initial,
  status,
  hasHwpx: hasHwpxInit,
  hwpxSavedAt: hwpxSavedInit,
  editable,
}: {
  id: string;
  situationId: string | null;
  initial: ReportContent;
  status: string;
  hasHwpx: boolean;
  hwpxSavedAt: string | null;
  editable: boolean;
}) {
  const router = useRouter();
  const [c, setC] = useState<ReportContent>(initial);
  const [savedAt, setSavedAt] = useState<string | null>(null);
  const [dirty, setDirty] = useState(false);
  const [editing, setEditing] = useState<string | null>(null);
  const [hwp, setHwp] = useState(false);
  const [hwpx, setHwpx] = useState({ has: hasHwpxInit, at: hwpxSavedInit });
  const [exportOpen, setExportOpen] = useState(false);
  const [confirm, setConfirm] = useState<null | "recompose" | "trash" | "final">(null);
  const [busy, start] = useTransition();
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const final = status === "final";
  const ro = !editable || final;

  const update = (next: ReportContent) => {
    setC(next);
    setDirty(true);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(async () => {
      const r = await saveReport(id, next);
      setSavedAt(r.savedAt);
      setDirty(false);
    }, 1000);
  };
  const flush = async () => {
    if (timer.current) clearTimeout(timer.current);
    if (dirty) {
      const r = await saveReport(id, c);
      setSavedAt(r.savedAt);
      setDirty(false);
    }
  };
  useEffect(() => () => void (timer.current && clearTimeout(timer.current)), []);

  const setSection = (sid: string, patch: Partial<ReportSection>) =>
    update({ ...c, sections: c.sections.map((s) => (s.id === sid ? { ...s, ...patch } : s)) });
  const move = (i: number, d: -1 | 1) => {
    const arr = [...c.sections];
    const j = i + d;
    if (j < 0 || j >= arr.length) return;
    [arr[i], arr[j]] = [arr[j], arr[i]];
    update({ ...c, sections: arr });
  };
  const addSection = () => {
    const s = { id: nanoid(6), title: "새 목차", body: "□ " };
    update({ ...c, sections: [...c.sections, s] });
    setEditing(s.id);
  };

  const filename = safeFilename(c.title);
  const doExport = async (kind: "hwpx" | "docx" | "pdf") => {
    setExportOpen(false);
    await flush();
    if (kind === "hwpx") {
      const saved = hwpx.has ? await getHwpx(id) : null;
      if (saved) downloadBytes(base64ToBytes(saved), `${filename}.hwpx`, "application/hwp+zip");
      else await exportHwpx(c, filename);
    } else if (kind === "docx") {
      await exportDocx(c, filename);
    } else {
      window.print();
    }
  };

  if (hwp) {
    return (
      <HwpEditor
        reportId={id}
        content={c}
        filename={filename}
        editable={!ro}
        onClose={(saved) => {
          setHwp(false);
          if (saved) setHwpx({ has: true, at: saved });
        }}
      />
    );
  }

  return (
    <div>
      {/* 도구 영역 */}
      <div className="no-print border-b border-line bg-white px-6">
        <div className="mx-auto flex max-w-[1680px] flex-wrap items-center gap-2 py-3">
          {/* 떠나기 전에 저장 대기 중인 수정 내용을 저장한다 (1초 자동저장 전에 나가면 사라짐) */}
          <BackButton fallback={situationId ? `/s/${situationId}/report` : "/docs"} before={flush} />
          <span className="mr-2 text-[19px] font-bold">{c.title}</span>
          {final ? <Badge tone="green">확정</Badge> : <Badge tone="gray">작성 중</Badge>}
          <span className="ml-1 text-[15px] text-mute">
            {dirty ? "저장 중" : savedAt ? `${fmtTime(savedAt).split(" ")[1]} 저장됨` : ""}
          </span>
          <div className="ml-auto flex flex-wrap items-center gap-2">
            {!ro && (
              <Button size="sm" variant="ghost" onClick={() => flush()}>
                <Save size={17} /> 저장
              </Button>
            )}
            {!ro && situationId && (
              <Button size="sm" variant="ghost" onClick={() => setConfirm("recompose")}>
                <RefreshCw size={17} /> 다시 구성
              </Button>
            )}
            <Button size="sm" variant="ghost" data-tour="report-hwp" onClick={async () => (await flush(), setHwp(true))}>
              <FilePenLine size={17} /> 한글 편집
              {hwpx.has && <span className="ml-1 whitespace-nowrap rounded bg-primary-weak px-1.5 text-[13px] text-primary">저장본</span>}
            </Button>
            <div className="relative">
              <Button size="sm" variant="ghost" data-tour="report-export" onClick={() => setExportOpen((v) => !v)}>
                <Download size={17} /> 내보내기 <ChevronDown size={16} />
              </Button>
              {exportOpen && (
                <div
                  className="card absolute right-0 top-11 z-30 w-44 overflow-hidden border border-line-weak py-1"
                  onMouseLeave={() => setExportOpen(false)}
                >
                  {(
                    [
                      ["hwpx", "한글 (HWPX)"],
                      ["docx", "워드 (DOCX)"],
                      ["pdf", "PDF"],
                    ] as const
                  ).map(([k, l]) => (
                    <button key={k} onClick={() => doExport(k)} className="block w-full px-4 py-3 text-left hover:bg-canvas">
                      {l}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <Button size="sm" variant="ghost" onClick={() => window.print()}>
              <Printer size={17} /> 인쇄
            </Button>
            {editable && !final && (
              <Button size="sm" variant="ghost" onClick={() => setConfirm("trash")}>
                <Trash2 size={17} /> 삭제
              </Button>
            )}
          </div>
        </div>
      </div>

      <div className="mx-auto grid max-w-[1680px] gap-6 px-6 py-6 lg:grid-cols-[340px_1fr]">
        {/* 목차 */}
        <aside className="no-print card h-fit lg:sticky lg:top-4" data-tour="report-toc">
          <div className="flex items-center justify-between border-b border-line-weak px-5 py-4">
            <h2 className="text-[19px] font-bold">목차</h2>
            {!ro && (
              <Button size="sm" variant="ghost" onClick={addSection}>
                <Plus size={17} /> 추가
              </Button>
            )}
          </div>
          <ol className="py-2">
            {c.sections.map((s, i) => (
              <li
                key={s.id}
                className={clsx(
                  "group flex items-center gap-2 px-5 py-2.5",
                  editing === s.id ? "bg-primary-weak" : "hover:bg-canvas",
                )}
              >
                <a href={`#sec-${s.id}`} className="min-w-0 flex-1 truncate" onClick={() => !ro && setEditing(s.id)}>
                  {i + 1}. {s.title}
                </a>
                {!ro && (
                  <span className="invisible flex gap-0.5 group-hover:visible">
                    <IconBtn onClick={() => move(i, -1)} label="위로">
                      <ArrowUp size={16} />
                    </IconBtn>
                    <IconBtn onClick={() => move(i, 1)} label="아래로">
                      <ArrowDown size={16} />
                    </IconBtn>
                    <IconBtn
                      onClick={() => update({ ...c, sections: c.sections.filter((x) => x.id !== s.id) })}
                      label="삭제"
                    >
                      <Trash2 size={16} />
                    </IconBtn>
                  </span>
                )}
              </li>
            ))}
          </ol>
          {hwpx.has && hwpx.at && (
            <div className="border-t border-line-weak px-5 py-3 text-[15px] text-sub">
              한글 편집 저장본 {fmtTime(hwpx.at)}
            </div>
          )}
        </aside>

        {/* 문서 */}
        <div>
          <article className="print-area card mx-auto max-w-[900px] px-[72px] py-[64px] font-[serif]">
            <DocHeader c={c} ro={ro} onChange={update} />
            {c.sections.map((s, i) => (
              <section key={s.id} id={`sec-${s.id}`} className="mt-8 scroll-mt-6">
                {editing === s.id && !ro ? (
                  <SectionEdit
                    no={i + 1}
                    s={s}
                    onChange={(p) => setSection(s.id, p)}
                    onDone={() => setEditing(null)}
                  />
                ) : (
                  <div
                    className={clsx("group relative rounded-md", !ro && "cursor-text hover:bg-primary-weak/40 hover:outline hover:outline-1 hover:outline-primary-line")}
                    onClick={() => !ro && setEditing(s.id)}
                  >
                    {!ro && (
                      <span className="no-print absolute -right-2 -top-2 hidden rounded bg-white p-1 text-primary shadow group-hover:block">
                        <Pencil size={16} />
                      </span>
                    )}
                    <SectionView no={i + 1} s={s} />
                  </div>
                )}
              </section>
            ))}
          </article>
          {editable && (
            <div className="no-print mx-auto mt-6 flex max-w-[900px] justify-end">
              {final ? (
                <Button onClick={() => start(async () => (await setReportStatus(id, "draft"), router.refresh()))}>
                  확정 해제
                </Button>
              ) : (
                <Button size="lg" variant="primary" onClick={() => setConfirm("final")}>
                  <CheckCircle2 size={20} /> 상황일지 확정
                </Button>
              )}
            </div>
          )}
        </div>
      </div>

      <Modal
        open={confirm !== null}
        onClose={() => setConfirm(null)}
        title={confirm === "recompose" ? "다시 구성" : confirm === "trash" ? "상황일지 삭제" : "상황일지 확정"}
        width={480}
        footer={
          <>
            <Button onClick={() => setConfirm(null)}>취소</Button>
            <Button
              variant={confirm === "trash" ? "danger" : "primary"}
              disabled={busy}
              onClick={() =>
                start(async () => {
                  if (confirm === "recompose") {
                    if (timer.current) clearTimeout(timer.current);
                    const next = await recomposeReport(id);
                    setC(next);
                    setDirty(false);
                    setHwpx({ has: false, at: null });
                  } else if (confirm === "trash") {
                    await trashReport(id);
                    router.push(situationId ? `/s/${situationId}/report` : "/docs");
                  } else if (confirm === "final") {
                    await flush();
                    await setReportStatus(id, "final");
                    router.refresh();
                  }
                  setConfirm(null);
                })
              }
            >
              {confirm === "trash" ? "휴지통으로" : "확인"}
            </Button>
          </>
        }
      >
        <p className="text-[18px] leading-relaxed">
          {confirm === "recompose"
            ? "최신 SOP 실행이력과 상황 기록으로 본문을 다시 만듭니다. 직접 고친 내용은 사라집니다."
            : confirm === "trash"
              ? "휴지통에서 7일간 보관 후 삭제됩니다."
              : "확정하면 수정할 수 없습니다."}
        </p>
      </Modal>
    </div>
  );
}

function IconBtn({ onClick, label, children }: { onClick: () => void; label: string; children: React.ReactNode }) {
  return (
    <button onClick={onClick} aria-label={label} className="rounded p-1 text-sub hover:bg-white hover:text-ink">
      {children}
    </button>
  );
}

function DocHeader({ c, ro, onChange }: { c: ReportContent; ro: boolean; onChange: (c: ReportContent) => void }) {
  return (
    <header className="text-center">
      {ro ? (
        <h1 className="text-[28px] font-bold" style={{ fontFamily: "'HY견고딕', 'Pretendard GOV', sans-serif" }}>
          {c.title}
        </h1>
      ) : (
        <input
          className="w-full rounded border border-transparent text-center text-[28px] font-bold outline-none hover:border-line focus:border-primary"
          style={{ fontFamily: "'HY견고딕', 'Pretendard GOV', sans-serif" }}
          value={c.title}
          onChange={(e) => onChange({ ...c, title: e.target.value })}
        />
      )}
      <div className="mt-3 flex items-center justify-center gap-2 text-[19px]">
        {ro ? (
          <span>{subtitleOf(c)}</span>
        ) : (
          <>
            <span>{subtitleOf({ ...c, dept: "", reporter: "" }).replace(/ \/ $/, "")} /</span>
            <input
              className="w-40 rounded border border-transparent text-center outline-none hover:border-line focus:border-primary"
              value={c.dept}
              placeholder="부서"
              onChange={(e) => onChange({ ...c, dept: e.target.value })}
            />
            <input
              className="w-28 rounded border border-transparent text-center outline-none hover:border-line focus:border-primary"
              value={c.reporter}
              placeholder="보고자"
              onChange={(e) => onChange({ ...c, reporter: e.target.value })}
            />
          </>
        )}
      </div>
    </header>
  );
}

function SectionView({ no, s }: { no: number; s: ReportSection }) {
  return <DocBlocks s={s} no={no} />;
}

function SectionEdit({
  no,
  s,
  onChange,
  onDone,
}: {
  no: number;
  s: ReportSection;
  onChange: (p: Partial<ReportSection>) => void;
  onDone: () => void;
}) {
  const insert = (sym: string) => onChange({ body: s.body.replace(/\s*$/, "") + `\n${sym} ` });
  return (
    <div className="no-print rounded-lg border-2 border-primary bg-white p-4 font-sans">
      <div className="mb-3 flex items-center gap-2">
        <span className="text-[19px] font-bold">{no}.</span>
        <input className="input h-11 font-bold" value={s.title} onChange={(e) => onChange({ title: e.target.value })} />
      </div>
      <div className="mb-2 flex gap-1.5">
        {["□", "○", "-", "·"].map((sym) => (
          <button
            key={sym}
            onClick={() => insert(sym)}
            className="h-9 w-10 rounded border border-line text-[17px] hover:border-primary"
            aria-label={`${sym} 추가`}
          >
            {sym}
          </button>
        ))}
      </div>
      <textarea
        autoFocus
        rows={Math.min(18, Math.max(5, s.body.split("\n").length + 1))}
        className="input font-[serif] leading-[1.8]"
        value={s.body}
        onChange={(e) => onChange({ body: e.target.value })}
      />
      {s.table && (
        <TableEdit table={s.table} onChange={(t) => onChange({ table: t })} />
      )}
      <div className="mt-3 flex justify-between">
        {!s.table ? (
          <Button size="sm" variant="ghost" onClick={() => onChange({ table: { head: ["구분", "내용"], rows: [["", ""]] } })}>
            <Plus size={16} /> 표 추가
          </Button>
        ) : (
          <Button size="sm" variant="ghost" onClick={() => onChange({ table: undefined })}>
            <Trash2 size={16} /> 표 삭제
          </Button>
        )}
        <Button size="sm" variant="primary" onClick={onDone}>
          완료
        </Button>
      </div>
    </div>
  );
}

function TableEdit({
  table,
  onChange,
}: {
  table: NonNullable<ReportSection["table"]>;
  onChange: (t: NonNullable<ReportSection["table"]>) => void;
}) {
  const cell = "w-full border-0 bg-transparent px-2 py-1.5 outline-none focus:bg-primary-weak";
  return (
    <div className="mt-3 overflow-x-auto">
      <table className="w-full border-collapse text-[15px]">
        <thead>
          <tr>
            {table.head.map((h, j) => (
              <th key={j} className="border border-line bg-[#dfe6f7] p-0">
                <input
                  className={clsx(cell, "text-center font-bold")}
                  value={h}
                  onChange={(e) => onChange({ ...table, head: table.head.map((x, k) => (k === j ? e.target.value : x)) })}
                />
              </th>
            ))}
            <th className="w-10" />
          </tr>
        </thead>
        <tbody>
          {table.rows.map((r, i) => (
            <tr key={i}>
              {table.head.map((_, j) => (
                <td key={j} className="border border-line p-0">
                  <input
                    className={cell}
                    value={r[j] ?? ""}
                    onChange={(e) =>
                      onChange({
                        ...table,
                        rows: table.rows.map((row, k) =>
                          k === i ? table.head.map((__, m) => (m === j ? e.target.value : (row[m] ?? ""))) : row,
                        ),
                      })
                    }
                  />
                </td>
              ))}
              <td className="text-center">
                <button
                  className="p-1 text-mute hover:text-danger"
                  aria-label="행 삭제"
                  onClick={() => onChange({ ...table, rows: table.rows.filter((_, k) => k !== i) })}
                >
                  <Trash2 size={15} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Button
        size="sm"
        variant="ghost"
        className="mt-1"
        onClick={() => onChange({ ...table, rows: [...table.rows, table.head.map(() => "")] })}
      >
        <Plus size={16} /> 행 추가
      </Button>
    </div>
  );
}

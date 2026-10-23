import {
  AlignmentType,
  BorderStyle,
  Document,
  ImageRun,
  Packer,
  Paragraph,
  Table,
  TableCell,
  TableRow,
  TextRun,
  WidthType,
} from "docx";
import type { ReportContent } from "@/lib/types";
import { contentToBlocks, dataUrlBytes, subtitleOf, type Inline } from "./blocks";

const BODY_FONT = "휴먼명조";
const HEAD_FONT = "HY견고딕";
const TABLE_FONT = "휴먼고딕";

const line = { style: BorderStyle.SINGLE, size: 4, color: "000000" };
const borders = { top: line, bottom: line, left: line, right: line, insideHorizontal: line, insideVertical: line };

const INDENT = { 1: { left: 660, hanging: 400 }, 2: { left: 920, hanging: 400 }, 3: { left: 1080, hanging: 260 }, 4: { left: 1280, hanging: 260 } } as const;

function runs(inl: Inline[], prefix: string, size: number) {
  const r = [new TextRun({ text: prefix, font: BODY_FONT, size })];
  inl.forEach((i) => r.push(new TextRun({ text: i.text, bold: i.bold, font: BODY_FONT, size })));
  return r;
}

function cellPara(text: string, head: boolean) {
  return new Paragraph({
    alignment: head ? AlignmentType.CENTER : AlignmentType.LEFT,
    children: [new TextRun({ text, bold: head, font: TABLE_FONT, size: 22 })],
  });
}

export async function buildDocx(c: ReportContent): Promise<Blob> {
  const children: (Paragraph | Table)[] = [
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 160 },
      children: [new TextRun({ text: c.title, font: HEAD_FONT, size: 40 })],
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 360 },
      children: [new TextRun({ text: subtitleOf(c), font: BODY_FONT, size: 30 })],
    }),
  ];

  for (const b of contentToBlocks(c)) {
    switch (b.type) {
      case "chapter":
        children.push(
          new Paragraph({
            spacing: { before: 120, after: 120 },
            children: [new TextRun({ text: b.text, bold: true, font: BODY_FONT, size: 30 })],
          }),
        );
        break;
      case "item":
        children.push(
          new Paragraph({
            indent: INDENT[b.level],
            spacing: { after: 80, line: 360 },
            children: runs(b.inlines, b.prefix + " ", 26),
          }),
        );
        break;
      case "caption":
        children.push(
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [new TextRun({ text: b.text, bold: true, font: TABLE_FONT, size: 22 })],
          }),
        );
        break;
      case "images": {
        // 그림 표: 1행 그림 · 2행 캡션 (그림 없으면 빈 칸)
        const imgCell = (it: (typeof b.items)[number]) => {
          const d = it.src ? dataUrlBytes(it.src) : null;
          if (!d) return new TableCell({ children: [new Paragraph({ spacing: { before: 1600, after: 1600 }, children: [] })] });
          // 칸 수에 맞춰 그림 폭을 나눈다 (본문 폭 약 600px)
          const w = Math.floor(600 / b.items.length) - 24;
          const h = Math.round(w * (it.width && it.height ? it.height / it.width : 0.75));
          return new TableCell({
            children: [
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [new ImageRun({ type: d.ext, data: d.bytes, transformation: { width: w, height: Math.min(h, 400) } })],
              }),
            ],
          });
        };
        children.push(
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            borders,
            rows: [
              new TableRow({ children: b.items.map(imgCell) }),
              new TableRow({ children: b.items.map((it) => new TableCell({ children: [cellPara(it.caption, true)] })) }),
            ],
          }),
        );
        children.push(new Paragraph({ children: [] }));
        break;
      }
      case "table": {
        const cols = Math.max(b.head.length, ...b.rows.map((r) => r.length), 1);
        const row = (cells: string[], head: boolean) =>
          new TableRow({
            tableHeader: head,
            children: Array.from(
              { length: cols },
              (_, i) =>
                new TableCell({
                  shading: head ? { fill: "DFE6F7" } : undefined,
                  children: [cellPara(cells[i] ?? "", head)],
                }),
            ),
          });
        children.push(
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            borders,
            rows: [row(b.head, true), ...b.rows.map((r) => row(r, false))],
          }),
        );
        children.push(new Paragraph({ children: [] }));
        break;
      }
      case "blank":
        children.push(new Paragraph({ children: [] }));
        break;
    }
  }

  const doc = new Document({
    creator: c.reporter,
    title: c.title,
    styles: { default: { document: { run: { font: BODY_FONT, size: 26 } } } },
    sections: [
      {
        properties: {
          page: { margin: { top: 567, bottom: 567, left: 1134, right: 1134 } },
        },
        children,
      },
    ],
  });
  return Packer.toBlob(doc);
}

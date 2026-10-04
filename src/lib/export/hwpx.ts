// HWPX 생성 — AI 행정문서 템플릿(public/templates/report-template.hwpx)의 용지·글꼴·문단/글자 모양을
// 그대로 쓰고 본문(section0.xml)만 다시 만든다. (report3 검증 로직 이식)
//
//  제목     paraPr 20 + charPr 9  (HY견고딕 20pt)
//  부제     paraPr 20 + charPr 8  (휴먼명조 15pt)
//  장 제목  paraPr 21 + charPr 10 (휴먼명조 15pt 굵게)
//  □ ○ - ·  paraPr 22·23·24·25(신규, 내어쓰기) + charPr 7 / 굵게 charPr 14(신규)
//  표 제목  paraPr 20 + charPr 12 / 표 머리 borderFill 4·charPr 12 / 본문 borderFill 3·charPr 13
//
// ※ 한컴오피스는 charPr/paraPr 를 목록 순서로 해석하므로 새 모양은 목록 끝에만 추가한다.
// ※ mimetype 은 첫 항목·무압축.
import JSZip from "jszip";
import type { ReportContent } from "@/lib/types";
import { contentToBlocks, subtitleOf, type Block, type Inline } from "./blocks";

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const CP_TITLE = 9;
const CP_SUBTITLE = 8;
const CP_CHAPTER = 10;
const CP_BODY = 7;
const CP_CAPTION = 12;
const CP_TABLE_HEAD = 12;
const CP_TABLE_BODY = 13;
const CP_BODY_BOLD = 14;

const PP_CENTER = 20;
const PP_LEFT = 21;
// [paraPr id, 왼쪽 여백, 내어쓰기] — 한글 내어쓰기: 첫 줄은 왼쪽 여백에서 시작, 둘째 줄부터 |내어쓰기|만큼 들어가 본문 글자에 맞춘다
const HANGING: [number, number, number][] = [
  [22, 650, -1950], // □  (반 글자 들여 시작)
  [23, 1950, -1950], // ○
  [24, 3100, -1300], // -
  [25, 4100, -1300], // ·
];
const PP_LEVEL = { 1: 22, 2: 23, 3: 24, 4: 25 } as const;

const P_ATTR = 'id="0" styleIDRef="0" pageBreak="0" columnBreak="0" merged="0"';

function run(cp: number, text: string) {
  return text ? `<hp:run charPrIDRef="${cp}"><hp:t>${esc(text)}</hp:t></hp:run>` : `<hp:run charPrIDRef="${cp}"/>`;
}
function para(pp: number, runs: string) {
  return `<hp:p ${P_ATTR} paraPrIDRef="${pp}">${runs}</hp:p>`;
}
function inlineRuns(inl: Inline[], normal: number, bold: number, prefix = "") {
  const parts: string[] = [];
  if (prefix) parts.push(run(normal, prefix));
  inl.forEach((i) => i.text && parts.push(run(i.bold ? bold : normal, i.text)));
  return parts.length ? parts.join("") : run(normal, "");
}

let tblSeq = 1000;
function table(head: string[], rows: string[][]) {
  const cols = Math.max(head.length, ...rows.map((r) => r.length), 1);
  const totalW = 47624;
  const colW = Math.floor(totalW / cols);
  const rowH = 1948;
  const all = [head, ...rows];
  const cell = (text: string | undefined, c: number, r: number, isHead: boolean) => {
    const bf = isHead ? 4 : 3;
    const cp = isHead ? CP_TABLE_HEAD : CP_TABLE_BODY;
    const content = text ? run(cp, text) : `<hp:run charPrIDRef="${cp}"/>`;
    return `<hp:tc name="" header="${isHead ? 1 : 0}" hasMargin="0" protect="0" editable="0" dirty="0" borderFillIDRef="${bf}"><hp:subList id="" textDirection="HORIZONTAL" lineWrap="BREAK" vertAlign="CENTER" linkListIDRef="0" linkListNextIDRef="0" textWidth="0" textHeight="0" hasTextRef="0" hasNumRef="0">${para(isHead ? PP_CENTER : PP_LEFT, content)}</hp:subList><hp:cellAddr colAddr="${c}" rowAddr="${r}"/><hp:cellSpan colSpan="1" rowSpan="1"/><hp:cellSz width="${colW}" height="${rowH}"/><hp:cellMargin left="510" right="510" top="141" bottom="141"/></hp:tc>`;
  };
  const trs = all
    .map((r, ri) => `<hp:tr>${Array.from({ length: cols }, (_, ci) => cell(r[ci], ci, ri, ri === 0)).join("")}</hp:tr>`)
    .join("");
  const tbl = `<hp:tbl id="${++tblSeq}" zOrder="0" numberingType="TABLE" textWrap="TOP_AND_BOTTOM" textFlow="BOTH_SIDES" lock="0" dropcapstyle="None" pageBreak="CELL" repeatHeader="1" rowCnt="${all.length}" colCnt="${cols}" cellSpacing="0" borderFillIDRef="3" noAdjust="0"><hp:sz width="${colW * cols}" widthRelTo="ABSOLUTE" height="${rowH * all.length}" heightRelTo="ABSOLUTE" protect="0"/><hp:pos treatAsChar="1" affectLSpacing="0" flowWithText="1" allowOverlap="0" holdAnchorAndSO="0" vertRelTo="PARA" horzRelTo="PARA" vertAlign="TOP" horzAlign="LEFT" vertOffset="0" horzOffset="0"/><hp:outMargin left="283" right="283" top="283" bottom="283"/><hp:inMargin left="510" right="510" top="141" bottom="141"/>${trs}</hp:tbl>`;
  return para(PP_CENTER, `<hp:run charPrIDRef="${CP_SUBTITLE}">${tbl}<hp:t/></hp:run>`);
}

const BLANK = para(PP_LEFT, run(CP_BODY, ""));

function blocksToParas(blocks: Block[]): string[] {
  return blocks.map((b) => {
    switch (b.type) {
      case "chapter":
        return para(PP_LEFT, run(CP_CHAPTER, b.text));
      case "item":
        return para(PP_LEVEL[b.level], inlineRuns(b.inlines, CP_BODY, CP_BODY_BOLD, b.prefix + " "));
      case "caption":
        return para(PP_CENTER, run(CP_CAPTION, b.text));
      case "table":
        return table(b.head, b.rows);
      case "blank":
        return BLANK;
    }
  });
}

function patchHeader(header: string): string {
  let h = header;
  if (!/<hh:charPr id="14"/.test(h)) {
    const m = /<hh:charPr id="7"[\s\S]*?<\/hh:charPr>/.exec(h);
    if (m) {
      const bold = m[0].replace('id="7"', `id="${CP_BODY_BOLD}"`).replace("<hh:underline", "<hh:bold/><hh:underline");
      h = h
        .replace(/<hh:charProperties itemCnt="(\d+)">/, (_, n) => `<hh:charProperties itemCnt="${Number(n) + 1}">`)
        .replace("</hh:charProperties>", `${bold}</hh:charProperties>`);
    }
  }
  if (!/<hh:paraPr id="22"/.test(h)) {
    const m = /<hh:paraPr id="21"[\s\S]*?<\/hh:paraPr>/.exec(h);
    if (m) {
      const add = HANGING.map(([id, left, intent]) =>
        m[0]
          .replace(/<hh:paraPr id="21"/, `<hh:paraPr id="${id}"`)
          .replace(/<hc:intent value="0"/g, `<hc:intent value="${intent}"`)
          .replace(/<hc:left value="0"/g, `<hc:left value="${left}"`),
      ).join("");
      h = h
        .replace(/<hh:paraProperties itemCnt="(\d+)">/, (_, n) => `<hh:paraProperties itemCnt="${Number(n) + HANGING.length}">`)
        .replace("</hh:paraProperties>", `${add}</hh:paraProperties>`);
    }
  }
  return h;
}

/** 템플릿 바이트 + 상황일지 → HWPX 바이트 (브라우저·서버 공용) */
export async function buildHwpx(template: ArrayBuffer | Uint8Array, c: ReportContent): Promise<Uint8Array> {
  const tpl = await JSZip.loadAsync(template);
  const section = await tpl.file("Contents/section0.xml")!.async("string");
  const header = await tpl.file("Contents/header.xml")!.async("string");

  const rootOpen = section.slice(0, section.indexOf("<hp:p "));
  const secPrRun =
    /<hp:run charPrIDRef="\d+"><hp:secPr[\s\S]*?<\/hp:secPr>[\s\S]*?<\/hp:run>/.exec(section)?.[0] ?? "";

  const paras: string[] = [];
  paras.push(
    `<hp:p id="3121190098" paraPrIDRef="${PP_CENTER}" styleIDRef="0" pageBreak="0" columnBreak="0" merged="0">${secPrRun}${run(CP_TITLE, c.title)}</hp:p>`,
  );
  paras.push(para(PP_CENTER, run(CP_SUBTITLE, subtitleOf(c))));
  paras.push(BLANK);
  paras.push(...blocksToParas(contentToBlocks(c)));
  paras.push(BLANK);

  const newSection = `${rootOpen}${paras.join("")}</hs:sec>`;
  const prv = [c.title, subtitleOf(c), ...c.sections.map((s) => s.title)].join("\n").slice(0, 1000);

  const out = new JSZip();
  out.file("mimetype", await tpl.file("mimetype")!.async("uint8array"), { compression: "STORE" });
  for (const [name, entry] of Object.entries(tpl.files)) {
    if (entry.dir || name === "mimetype") continue;
    if (name === "Contents/section0.xml") out.file(name, newSection, { compression: "DEFLATE" });
    else if (name === "Contents/header.xml") out.file(name, patchHeader(header), { compression: "DEFLATE" });
    else if (name === "Preview/PrvText.txt") out.file(name, prv, { compression: "DEFLATE" });
    else if (name === "Contents/content.hpf") {
      const hpf = (await entry.async("string")).replace(
        /<opf:title>.*?<\/opf:title>/,
        `<opf:title>${esc(c.title)}</opf:title>`,
      );
      out.file(name, hpf, { compression: "DEFLATE" });
    } else out.file(name, await entry.async("uint8array"), { compression: "DEFLATE" });
  }
  return out.generateAsync({ type: "uint8array", mimeType: "application/hwp+zip" });
}

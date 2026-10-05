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
import { contentToBlocks, dataUrlBytes, subtitleOf, type Block, type Inline } from "./blocks";

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

/** 셀 글자가 몇 줄로 접히는지 추정 (11pt: 한글 1100, 영문·숫자·기호 약 560 HWPUNIT) */
function lineCount(text: string, innerW: number) {
  const width = (s: string) => {
    let w = 0;
    for (const ch of s) w += /[ᄀ-ᇿ㄰-㆏가-힣一-鿿]/.test(ch) ? 1100 : 560;
    return w;
  };
  // 어절 단위로 접는다 (편집기가 어절을 쪼개지 않으므로)
  let lines = 0;
  for (const seg of text.split("\n")) {
    let n = 1;
    let cur = 0;
    for (const word of seg.split(" ")) {
      const w = width(word);
      if (cur > 0 && cur + 560 + w > innerW) {
        n++;
        cur = 0;
      }
      if (w > innerW) {
        n += Math.ceil(w / innerW) - 1;
        cur = w % innerW;
      } else cur += (cur > 0 ? 560 : 0) + w;
    }
    lines += n;
  }
  return lines;
}

function table(head: string[], rows: string[][]) {
  const cols = Math.max(head.length, ...rows.map((r) => r.length), 1);
  const totalW = 47624;
  const colW = Math.floor(totalW / cols);
  const all = [head, ...rows];
  // 행 높이를 글자 줄 수에 맞춘다 — 한컴은 열 때 다시 계산하지만 웹 편집기(rhwp)는 저장된 높이를 그대로 쓴다
  const heights = all.map((r) => Math.max(1948, ...r.map((t) => lineCount(t ?? "", colW - 1020) * 1760 + 282)));
  const cell = (text: string | undefined, c: number, r: number, isHead: boolean) => {
    const rowH = heights[r];
    const bf = isHead ? 4 : 3;
    const cp = isHead ? CP_TABLE_HEAD : CP_TABLE_BODY;
    const content = text ? run(cp, text) : `<hp:run charPrIDRef="${cp}"/>`;
    return `<hp:tc name="" header="${isHead ? 1 : 0}" hasMargin="0" protect="0" editable="0" dirty="0" borderFillIDRef="${bf}"><hp:subList id="" textDirection="HORIZONTAL" lineWrap="BREAK" vertAlign="CENTER" linkListIDRef="0" linkListNextIDRef="0" textWidth="0" textHeight="0" hasTextRef="0" hasNumRef="0">${para(isHead ? PP_CENTER : PP_LEFT, content)}</hp:subList><hp:cellAddr colAddr="${c}" rowAddr="${r}"/><hp:cellSpan colSpan="1" rowSpan="1"/><hp:cellSz width="${colW}" height="${rowH}"/><hp:cellMargin left="510" right="510" top="141" bottom="141"/></hp:tc>`;
  };
  const trs = all
    .map((r, ri) => `<hp:tr>${Array.from({ length: cols }, (_, ci) => cell(r[ci], ci, ri, ri === 0)).join("")}</hp:tr>`)
    .join("");
  const tbl = `<hp:tbl id="${++tblSeq}" zOrder="0" numberingType="TABLE" textWrap="TOP_AND_BOTTOM" textFlow="BOTH_SIDES" lock="0" dropcapstyle="None" pageBreak="CELL" repeatHeader="1" rowCnt="${all.length}" colCnt="${cols}" cellSpacing="0" borderFillIDRef="3" noAdjust="0"><hp:sz width="${colW * cols}" widthRelTo="ABSOLUTE" height="${heights.reduce((a, b) => a + b, 0)}" heightRelTo="ABSOLUTE" protect="0"/><hp:pos treatAsChar="1" affectLSpacing="0" flowWithText="1" allowOverlap="0" holdAnchorAndSO="0" vertRelTo="PARA" horzRelTo="PARA" vertAlign="TOP" horzAlign="LEFT" vertOffset="0" horzOffset="0"/><hp:outMargin left="283" right="283" top="283" bottom="283"/><hp:inMargin left="510" right="510" top="141" bottom="141"/>${trs}</hp:tbl>`;
  return para(PP_CENTER, `<hp:run charPrIDRef="${CP_SUBTITLE}">${tbl}<hp:t/></hp:run>`);
}

const BLANK = para(PP_LEFT, run(CP_BODY, ""));

/** 문서에 들어갈 그림 (BinData) */
type Bin = { id: string; href: string; bytes: Uint8Array; mime: string };

let picSeq = 2000;
/** 그림 개체 (글자처럼 취급) — OWPML hp:pic */
function pic(binId: string, w: number, h: number) {
  const id = ++picSeq;
  return `<hp:pic id="${id}" zOrder="${id}" numberingType="PICTURE" textWrap="TOP_AND_BOTTOM" textFlow="BOTH_SIDES" lock="0" dropcapstyle="None" href="" groupLevel="0" instid="${id}" reverse="0"><hp:offset x="0" y="0"/><hp:orgSz width="${w}" height="${h}"/><hp:curSz width="${w}" height="${h}"/><hp:flip horizontal="0" vertical="0"/><hp:rotationInfo angle="0" centerX="${Math.round(w / 2)}" centerY="${Math.round(h / 2)}" rotateimage="1"/><hp:renderingInfo><hc:transMatrix e1="1" e2="0" e3="0" e4="0" e5="1" e6="0"/><hc:scaMatrix e1="1" e2="0" e3="0" e4="0" e5="1" e6="0"/><hc:rotMatrix e1="1" e2="0" e3="0" e4="0" e5="1" e6="0"/></hp:renderingInfo><hc:img binaryItemIDRef="${binId}" bright="0" contrast="0" effect="REAL_PIC" alpha="0"/><hp:imgRect><hc:pt0 x="0" y="0"/><hc:pt1 x="${w}" y="0"/><hc:pt2 x="${w}" y="${h}"/><hc:pt3 x="0" y="${h}"/></hp:imgRect><hp:imgClip left="0" right="${w}" top="0" bottom="${h}"/><hp:inMargin left="0" right="0" top="0" bottom="0"/><hp:imgDim dimwidth="${w}" dimheight="${h}"/><hp:effects/><hp:sz width="${w}" widthRelTo="ABSOLUTE" height="${h}" heightRelTo="ABSOLUTE" protect="0"/><hp:pos treatAsChar="1" affectLSpacing="0" flowWithText="1" allowOverlap="0" holdAnchorAndSO="0" vertRelTo="PARA" horzRelTo="PARA" vertAlign="TOP" horzAlign="LEFT" vertOffset="0" horzOffset="0"/><hp:outMargin left="0" right="0" top="0" bottom="0"/></hp:pic>`;
}

/** 그림 표: 1행 그림 · 2행 캡션 (기상특보 보고의 기상특보 현황·레이더 영상·위성영상) — 그림이 없으면 빈 칸으로 둔다 */
function imageTable(items: { src: string; caption: string; width: number; height: number }[], bins: Bin[]) {
  const cols = items.length;
  const colW = Math.floor(47624 / cols);
  const maxW = colW - 1020;
  const imgH = 15000;
  const tc = (inner: string, c: number, r: number, h: number, bf: number) =>
    `<hp:tc name="" header="0" hasMargin="0" protect="0" editable="0" dirty="0" borderFillIDRef="${bf}"><hp:subList id="" textDirection="HORIZONTAL" lineWrap="BREAK" vertAlign="CENTER" linkListIDRef="0" linkListNextIDRef="0" textWidth="0" textHeight="0" hasTextRef="0" hasNumRef="0">${inner}</hp:subList><hp:cellAddr colAddr="${c}" rowAddr="${r}"/><hp:cellSpan colSpan="1" rowSpan="1"/><hp:cellSz width="${colW}" height="${h}"/><hp:cellMargin left="510" right="510" top="141" bottom="141"/></hp:tc>`;
  let rowH = imgH;
  const imgCells = items.map((it, c) => {
    const data = it.src ? dataUrlBytes(it.src) : null;
    if (!data) return tc(para(PP_CENTER, `<hp:run charPrIDRef="${CP_TABLE_BODY}"/>`), c, 0, imgH, 3);
    const n = bins.length + 1;
    const id = `image${n}`;
    bins.push({ id, href: `BinData/${id}.${data.ext}`, bytes: data.bytes, mime: data.ext === "png" ? "image/png" : "image/jpg" });
    const ratio = it.width && it.height ? it.height / it.width : 0.75;
    let w = maxW;
    let h = Math.round(w * ratio);
    if (h > 20000) {
      h = 20000;
      w = Math.round(h / ratio);
    }
    rowH = Math.max(rowH, h + 400);
    return tc(para(PP_CENTER, `<hp:run charPrIDRef="${CP_TABLE_BODY}">${pic(id, w, h)}<hp:t/></hp:run>`), c, 0, h + 400, 3);
  });
  const capCells = items.map((it, c) => tc(para(PP_CENTER, run(CP_TABLE_HEAD, it.caption)), c, 1, 1948, 3));
  const tbl = `<hp:tbl id="${++tblSeq}" zOrder="0" numberingType="TABLE" textWrap="TOP_AND_BOTTOM" textFlow="BOTH_SIDES" lock="0" dropcapstyle="None" pageBreak="CELL" repeatHeader="0" rowCnt="2" colCnt="${cols}" cellSpacing="0" borderFillIDRef="3" noAdjust="0"><hp:sz width="${colW * cols}" widthRelTo="ABSOLUTE" height="${rowH + 1948}" heightRelTo="ABSOLUTE" protect="0"/><hp:pos treatAsChar="1" affectLSpacing="0" flowWithText="1" allowOverlap="0" holdAnchorAndSO="0" vertRelTo="PARA" horzRelTo="PARA" vertAlign="TOP" horzAlign="LEFT" vertOffset="0" horzOffset="0"/><hp:outMargin left="283" right="283" top="283" bottom="283"/><hp:inMargin left="510" right="510" top="141" bottom="141"/><hp:tr>${imgCells.join("")}</hp:tr><hp:tr>${capCells.join("")}</hp:tr></hp:tbl>`;
  return para(PP_CENTER, `<hp:run charPrIDRef="${CP_SUBTITLE}">${tbl}<hp:t/></hp:run>`);
}

function blocksToParas(blocks: Block[], bins: Bin[]): string[] {
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
      case "images":
        return imageTable(b.items, bins);
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
  const bins: Bin[] = [];
  paras.push(...blocksToParas(contentToBlocks(c), bins));
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
      const items = bins
        .map((b) => `<opf:item id="${b.id}" href="${b.href}" media-type="${b.mime}" isEmbeded="1"/>`)
        .join("");
      const hpf = (await entry.async("string"))
        .replace(/<opf:title>.*?<\/opf:title>/, `<opf:title>${esc(c.title)}</opf:title>`)
        .replace("</opf:manifest>", `${items}</opf:manifest>`);
      out.file(name, hpf, { compression: "DEFLATE" });
    } else out.file(name, await entry.async("uint8array"), { compression: "DEFLATE" });
  }
  for (const b of bins) out.file(b.href, b.bytes, { compression: "STORE" });
  return out.generateAsync({ type: "uint8array", mimeType: "application/hwp+zip" });
}

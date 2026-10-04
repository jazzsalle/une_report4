/** 연락망 엑셀 양식 · 내려받기 · 올리기 (브라우저에서 실행) */
import type { ContactsBundle } from "@/lib/data";

export interface ContactRow {
  /** 엑셀 행 번호 (오류 안내용) */
  row: number;
  upper: string;
  unit: string;
  name: string;
  title: string;
  duty: string;
  phone: string;
  email: string;
  groups: string[];
}

const COLUMNS = [
  { key: "upper", header: "상위 조직", width: 24 },
  { key: "unit", header: "조직(부서)", width: 24 },
  { key: "name", header: "이름", width: 12 },
  { key: "title", header: "직위", width: 12 },
  { key: "duty", header: "담당업무", width: 24 },
  { key: "phone", header: "휴대전화", width: 16 },
  { key: "email", header: "이메일", width: 26 },
  { key: "groups", header: "전파그룹", width: 28 },
] as const;

const GUIDE = [
  "연락망 일괄 등록 안내",
  "",
  "1. 「연락망」 시트의 2행부터 한 사람씩 입력합니다. 1행(제목)은 지우지 마세요.",
  "2. 조직(부서)·이름은 꼭 입력합니다.",
  "3. 상위 조직은 조직(부서)가 속한 큰 조직입니다. 비우면 조직(부서)가 맨 위 조직이 됩니다.",
  "4. 없는 조직·전파그룹은 새로 만듭니다.",
  "5. 같은 조직에 같은 이름이 있으면 내용을 고칩니다(직위·번호 등). 없으면 새로 추가합니다.",
  "6. 전파그룹이 여러 개면 쉼표(,)로 구분합니다. 예: 상황관리반, 구·군 재난부서",
  "7. 엑셀에 없는 기존 담당자는 지우지 않습니다.",
];

async function excel() {
  const mod = await import("exceljs");
  return (mod.default ?? mod) as typeof import("exceljs");
}

function save(buf: ArrayBuffer, name: string) {
  const url = URL.createObjectURL(new Blob([buf], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" }));
  const a = document.createElement("a");
  a.href = url;
  a.download = name;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

/** 양식(예시 1행) 또는 현재 연락망을 엑셀로 내려받기 */
export async function downloadContactsXlsx(bundle: ContactsBundle | null, fileName: string) {
  const ExcelJS = await excel();
  const wb = new ExcelJS.Workbook();
  const ws = wb.addWorksheet("연락망", { views: [{ state: "frozen", ySplit: 1 }] });
  ws.columns = COLUMNS.map((c) => ({ key: c.key, header: c.header, width: c.width }));
  const head = ws.getRow(1);
  head.font = { bold: true };
  head.height = 22;
  head.eachCell((cell) => {
    cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FFDCE7FB" } };
    cell.alignment = { vertical: "middle", horizontal: "center" };
  });

  if (bundle) {
    const unit = new Map(bundle.units.map((u) => [u.id, u]));
    for (const c of bundle.contacts) {
      const u = unit.get(c.unitId);
      const parent = u?.parentId ? unit.get(u.parentId) : undefined;
      ws.addRow({
        upper: parent?.name ?? "",
        unit: u?.name ?? "",
        name: c.name,
        title: c.title,
        duty: c.duty,
        phone: c.phone,
        email: c.email,
        groups: bundle.groups.filter((g) => g.memberIds.includes(c.id)).map((g) => g.name).join(", "),
      });
    }
  } else {
    ws.addRow({
      upper: "○○시 재난안전대책본부",
      unit: "재난상황관리반",
      name: "홍길동",
      title: "주무관",
      duty: "상황관리",
      phone: "010-0000-0000",
      email: "",
      groups: "상황관리반",
    });
  }
  // 번호가 숫자로 바뀌지 않게 글자 칸으로
  ws.getColumn("phone").numFmt = "@";

  const guide = wb.addWorksheet("작성 안내");
  guide.getColumn(1).width = 100;
  GUIDE.forEach((t, i) => {
    const cell = guide.getCell(i + 1, 1);
    cell.value = t;
    if (i === 0) cell.font = { bold: true, size: 14 };
  });

  save(await wb.xlsx.writeBuffer(), fileName);
}

function text(v: unknown): string {
  if (v == null) return "";
  if (typeof v === "object") {
    const o = v as { text?: unknown; richText?: { text: string }[]; result?: unknown; hyperlink?: string };
    if (o.richText) return o.richText.map((r) => r.text).join("").trim();
    if (o.text != null) return String(o.text).trim();
    if (o.result != null) return String(o.result).trim();
  }
  return String(v).trim();
}

/** 휴대전화 번호를 010-0000-0000 꼴로 */
export function normalizePhone(v: string) {
  let d = v.replace(/\D/g, "");
  if (d.length === 10 && d.startsWith("10")) d = "0" + d; // 엑셀이 앞자리 0을 지운 경우
  if (d.length === 11) return `${d.slice(0, 3)}-${d.slice(3, 7)}-${d.slice(7)}`;
  if (d.length === 10) return d.startsWith("02") ? `${d.slice(0, 2)}-${d.slice(2, 6)}-${d.slice(6)}` : `${d.slice(0, 3)}-${d.slice(3, 6)}-${d.slice(6)}`;
  if (d.length === 9 && d.startsWith("02")) return `${d.slice(0, 2)}-${d.slice(2, 5)}-${d.slice(5)}`;
  return v.trim();
}

/** 올린 엑셀 읽기 — 제목 행으로 열을 찾는다 (열 순서가 바뀌어도 됨) */
export async function parseContactsXlsx(file: File): Promise<{ rows: ContactRow[]; errors: string[] }> {
  const ExcelJS = await excel();
  const wb = new ExcelJS.Workbook();
  await wb.xlsx.load(await file.arrayBuffer());
  const ws = wb.getWorksheet("연락망") ?? wb.worksheets[0];
  if (!ws) return { rows: [], errors: ["시트를 찾을 수 없습니다."] };

  const col: Partial<Record<(typeof COLUMNS)[number]["key"], number>> = {};
  ws.getRow(1).eachCell((cell, i) => {
    const h = text(cell.value).replace(/\s/g, "");
    const c = COLUMNS.find((x) => x.header.replace(/\s/g, "") === h || (x.key === "unit" && (h === "조직" || h === "부서")));
    if (c) col[c.key] = i;
  });
  if (!col.unit || !col.name) return { rows: [], errors: ["1행에 「조직(부서)」「이름」 제목이 있어야 합니다. 양식을 내려받아 쓰세요."] };

  const rows: ContactRow[] = [];
  const errors: string[] = [];
  ws.eachRow((r, n) => {
    if (n === 1) return;
    const get = (k: keyof typeof col) => (col[k] ? text(r.getCell(col[k]!).value) : "");
    const v = {
      upper: get("upper"),
      unit: get("unit"),
      name: get("name"),
      title: get("title"),
      duty: get("duty"),
      phone: normalizePhone(get("phone")),
      email: get("email"),
      groups: get("groups")
        .split(/[,，、\n]/)
        .map((g) => g.trim())
        .filter(Boolean),
    };
    if (!v.unit && !v.name && !v.phone) return; // 빈 줄
    if (!v.unit) return void errors.push(`${n}행: 조직(부서)가 비어 있습니다.`);
    if (!v.name) return void errors.push(`${n}행: 이름이 비어 있습니다.`);
    rows.push({ row: n, ...v });
  });
  if (!rows.length && !errors.length) errors.push("입력된 담당자가 없습니다.");
  return { rows, errors };
}

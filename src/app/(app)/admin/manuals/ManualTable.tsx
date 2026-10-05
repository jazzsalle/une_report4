"use client";
import { useState } from "react";
import { Badge, Card } from "@/components/ui";

export interface ManualRow {
  file: string;
  ext: string;
  group: string;
  pages: number;
  codes: number;
  cards: number;
  step: string;
  contactPages: number;
  agencies: number;
  mobiles: boolean;
  sop: number;
  contact: string;
}

const SOP_LABEL: Record<number, [string, "green" | "blue" | "gray" | "orange" | "red"]> = {
  1: ["그대로 적용", "green"],
  2: ["보완 적용", "green"],
  3: ["구조만 맞음", "blue"],
  4: ["지자체 행만", "blue"],
  5: ["근거 칸", "gray"],
  6: ["부적합", "orange"],
};
const CONTACT_TONE: Record<string, "green" | "blue" | "gray"> = { 높음: "green", 보통: "blue", 낮음: "gray" };

/** 문서별 결과 표 — 유형으로 거르기 */
export function ManualTable({ rows }: { rows: ManualRow[] }) {
  const groups = Array.from(new Set(rows.map((r) => r.group)));
  const [g, setG] = useState("");
  const list = rows.filter((r) => !g || r.group === g);
  return (
    <Card className="p-6">
      <div className="mb-4 flex flex-wrap items-center gap-3">
        <select className="input w-72" value={g} onChange={(e) => setG(e.target.value)}>
          <option value="">전체 유형</option>
          {groups.map((x) => (
            <option key={x}>{x}</option>
          ))}
        </select>
        <span className="ml-auto text-sub">{list.length}종</span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[1100px] text-left text-[16px]">
          <thead className="bg-canvas text-[15px] font-semibold text-sub">
            <tr>
              <th className="px-3 py-3">매뉴얼</th>
              <th className="px-3 py-3">유형</th>
              <th className="px-3 py-3 text-right">쪽</th>
              <th className="px-3 py-3 text-right">조치 코드</th>
              <th className="px-3 py-3 text-right">행동카드</th>
              <th className="px-3 py-3">단계</th>
              <th className="px-3 py-3">SOP</th>
              <th className="px-3 py-3 text-right">연락망 쪽</th>
              <th className="px-3 py-3 text-right">유관기관</th>
              <th className="px-3 py-3">연락망</th>
            </tr>
          </thead>
          <tbody>
            {list.map((r) => (
              <tr key={r.file} className="border-b border-line-weak">
                <td className="px-3 py-2.5 font-medium">{r.file}</td>
                <td className="whitespace-nowrap px-3 py-2.5 text-sub">{r.group}</td>
                <td className="px-3 py-2.5 text-right">{r.pages}</td>
                <td className="px-3 py-2.5 text-right">{r.codes || "-"}</td>
                <td className="px-3 py-2.5 text-right">{r.cards || "-"}</td>
                <td className="whitespace-nowrap px-3 py-2.5">{r.step}</td>
                <td className="px-3 py-2.5">
                  <Badge tone={SOP_LABEL[r.sop][1]}>{SOP_LABEL[r.sop][0]}</Badge>
                </td>
                <td className="px-3 py-2.5 text-right">{r.contactPages || "-"}</td>
                <td className="px-3 py-2.5 text-right">{r.agencies ? `${r.agencies}종` : "-"}</td>
                <td className="px-3 py-2.5">
                  <Badge tone={CONTACT_TONE[r.contact]}>{r.contact}</Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-4 text-[16px] text-sub">
        조치 코드·행동카드·연락망 쪽은 글자 추출로 센 값입니다(같은 코드 반복 포함). 연락망 쪽 = 전화번호가 8개 이상인 쪽, 유관기관 = 연락망 쪽에 나온 기관 종류 수.
      </p>
    </Card>
  );
}

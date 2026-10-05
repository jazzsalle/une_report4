/** 매뉴얼 연락망(API-04) 1줄 → 연락망 일괄 등록 행 (화면·서버 공용, 순수 함수) */
import type { ContactCategory, ContactEntry } from "@/lib/t3q/types";
import type { ImportRow } from "@/app/actions/contacts";

/** 분류별로 연락망에 놓일 맨 위 묶음 (내부 부서는 우리 조직도의 같은 이름 부서에 붙는다) */
export const CATEGORY_LABEL: Record<ContactCategory, string> = {
  AGENCY: "유관기관",
  LOCAL_GOV: "시·군·구 재난부서",
  HIGHER: "상급 보고처",
  INTERNAL: "우리 기관 부서",
};

export function entryToRow(e: ContactEntry): ImportRow {
  const internal = e.category === "INTERNAL";
  return {
    upper: internal ? "" : CATEGORY_LABEL[e.category],
    upperKind: internal ? undefined : "agency",
    unit: internal ? e.dept || e.org : e.org,
    // 사람 이름이 없으면 부서 대표번호로 한 줄 (연락망은 담당자 단위라 이름 칸이 필요)
    name: e.name || (internal ? "대표번호" : e.dept || "대표번호"),
    title: e.title ?? "",
    duty: e.name && !internal ? e.dept ?? "" : e.note ?? "",
    // 상황전파 문자는 휴대전화 우선
    phone: e.mobile || e.phones[0] || "",
    email: e.email ?? "",
    groups: e.category === "AGENCY" ? ["유관기관"] : [],
  };
}

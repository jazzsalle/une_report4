/**
 * 공통 기본 SOP — 재난 유형별 매뉴얼 시드가 없을 때 쓰는 최소 대응 절차.
 * 재난 및 안전관리 기본법의 일반 대응 흐름(상황관리 → 대책본부 → 현장조치 → 복구)으로 구성했으며,
 * T3Q 연계 시 매뉴얼 기반 응답으로 대체된다. 문구의 「○○」은 재난유형명으로 바뀐다.
 */
import type { SeedAction } from "@/lib/seed";

export const COMMON_SOURCE = "공통 기본 SOP (유형별 매뉴얼 연계 전)";

type Base = Omit<SeedAction, "hazard" | "page" | "code">;

const BASE: Base[] = [
  {
    stage: "관심", phase: "대응", title: "○○ 상황 모니터링 및 정보 수집",
    content: "○○ 관련 위험 정보와 발생 징후를 수시로 확인하고 공유한다.",
    details: ["관계기관 발표·예보·통보 사항 확인", "관내 취약 대상·시설 현황 확인", "담당자 비상연락체계 점검"],
    lead: "재난 주관부서", support: ["재난안전상황실"], collab: ["관계기관"],
    propagateTo: ["재난 관련 부서"], propagateMsg: "○○ 관련 위험 정보가 발표되었습니다. 상황을 주시하고 비상연락체계를 유지해 주시기 바랍니다.",
    resources: [], damageMeasures: [],
  },
  {
    stage: "관심", phase: "대응", title: "예방 홍보 및 사전 점검",
    content: "주민·이용자 대상 예방 홍보를 하고 취약 시설·대상을 사전 점검한다.",
    details: ["행동요령 홍보(문자·누리집·SNS)", "취약 시설·대상 사전 점검", "점검 결과 보고"],
    lead: "재난 주관부서", support: ["홍보 담당부서"], collab: ["시·군·구"],
    propagateTo: ["시·군·구 담당부서"], propagateMsg: "",
    resources: [], damageMeasures: [],
  },
  {
    stage: "주의", phase: "대응", title: "○○ 상황 접수 및 보고·전파",
    content: "상황을 접수하여 발생 일시·장소·규모를 파악하고 보고·전파한다.",
    details: ["발생 일시·장소·규모·피해 여부 파악", "기관장 보고", "행정안전부 NDMS 보고", "유관기관 상황 전파"],
    lead: "재난 주관부서", support: ["재난안전상황실"], collab: ["소방", "경찰", "관계기관"],
    propagateTo: ["기관장", "유관기관", "시·군·구"], propagateMsg: "[○○ 발생] 일시·장소·규모를 알려드립니다. 소관 업무에 따라 대응 준비 바랍니다.",
    resources: ["NDMS", "상황전파 SMS"], damageMeasures: [],
  },
  {
    stage: "주의", phase: "대응", title: "상황판단회의 개최",
    content: "상황을 종합해 위기경보 수준과 대응 방향을 결정한다.",
    details: ["관계부서 소집", "상황 평가 및 위기경보 수준 판단", "부서별 조치사항 지시"],
    lead: "재난 주관부서", support: ["관계부서"], collab: [],
    propagateTo: ["관계부서"], propagateMsg: "",
    resources: [], damageMeasures: [],
  },
  {
    stage: "경계", phase: "대응", title: "재난안전대책본부 가동",
    content: "재난안전대책본부를 가동하고 실무반별 임무를 부여한다.",
    details: ["비상근무 명령 및 인원 소집", "실무반 편성·임무 부여", "상황판·상황일지 운영"],
    lead: "자연·사회재난 담당과", support: ["총무과", "재난 주관부서"], collab: ["관계기관 연락관"],
    propagateTo: ["실무반 담당부서"], propagateMsg: "재난안전대책본부를 가동합니다. 실무반 담당자는 즉시 응소 바랍니다.",
    resources: ["비상근무 인원", "상황실"], damageMeasures: [],
  },
  {
    stage: "경계", phase: "대응", title: "현장 상황관리 및 통제",
    content: "현장에 인력을 배치해 상황을 관리하고 위험 구역을 통제한다.",
    details: ["현장 대응 인력 배치", "위험 구역 출입 통제", "현장 상황 수시 보고"],
    lead: "재난 주관부서", support: ["시·군·구"], collab: ["소방", "경찰"],
    propagateTo: ["현장 대응 부서"], propagateMsg: "",
    resources: ["현장 인력", "통제 장비"], damageMeasures: [],
  },
  {
    stage: "경계", phase: "대응", title: "주민·대상자 보호 조치",
    content: "피해 우려 주민·이용자·취약계층을 보호하기 위한 조치를 한다.",
    details: ["대상자 현황 파악", "대피·격리·이동 등 보호 조치 안내", "취약계층 우선 지원"],
    lead: "재난 주관부서", support: ["복지 담당부서"], collab: ["시·군·구", "관계기관"],
    propagateTo: ["주민·대상자"], propagateMsg: "[안내] ○○ 관련 안전 조치를 안내드립니다. 행동요령에 따라 주시기 바랍니다.",
    resources: [], damageMeasures: [],
  },
  {
    stage: "심각", phase: "대응", title: "유관기관 협조 및 자원 동원",
    content: "피해 확대 시 유관기관과 상급기관에 협조를 요청하고 인력·장비를 동원한다.",
    details: ["상급기관·인근 기관 지원 요청", "인력·장비·물자 동원", "투입 자원 현황 관리"],
    lead: "재난안전대책본부", support: ["재난 주관부서"], collab: ["행정안전부", "관계기관"],
    propagateTo: ["행정안전부", "유관기관"], propagateMsg: "",
    resources: ["동원 인력", "장비", "물자"], damageMeasures: [],
  },
  {
    stage: "심각", phase: "복구", title: "피해 조사 및 NDMS 입력",
    content: "인명·재산 피해를 조사하여 집계하고 NDMS에 입력·보고한다.",
    details: ["인명피해 현황 파악", "시설·재산 피해 조사", "NDMS 피해 입력 및 보고"],
    lead: "재난 주관부서", support: ["시·군·구"], collab: [],
    propagateTo: ["행정안전부"], propagateMsg: "",
    resources: ["피해조사반"], damageMeasures: ["피해 현황 NDMS 입력", "중앙합동조사 대비 자료 준비"],
  },
  {
    stage: "심각", phase: "복구", title: "응급복구 및 피해자 지원",
    content: "필수 기능을 응급 복구하고 피해자 지원을 실시한다.",
    details: ["응급복구 대상 선정 및 착수", "피해자 구호·지원", "2차 피해 예방 조치"],
    lead: "재난 주관부서", support: ["시설 소관부서", "복지 담당부서"], collab: ["관계기관"],
    propagateTo: ["관계부서"], propagateMsg: "",
    resources: ["복구 장비", "구호물자"], damageMeasures: ["응급복구 결과 보고"],
  },
  {
    stage: "심각", phase: "복구", title: "상황 종료 및 결과 보고",
    content: "상황 종료를 판단하고 대응 결과를 정리해 보고한다.",
    details: ["상황 종료 판단 및 전파", "대응 결과 정리", "개선사항 도출"],
    lead: "재난 주관부서", support: ["재난안전상황실"], collab: [],
    propagateTo: ["기관장", "관계기관"], propagateMsg: "",
    resources: [], damageMeasures: [],
  },
];

export function commonActions(hazard: string): SeedAction[] {
  const name = hazard.replace("다중밀집건축물붕괴대형사고", "다중밀집건축물 붕괴 대형사고");
  const fill = (s: string) => s.replaceAll("○○", name);
  return BASE.map((b, i) => ({
    ...b,
    code: `CMN-${String(i + 1).padStart(3, "0")}`,
    title: fill(b.title),
    content: fill(b.content),
    propagateMsg: fill(b.propagateMsg),
    hazard: [hazard],
    page: 0,
  }));
}

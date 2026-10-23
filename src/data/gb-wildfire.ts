/**
 * 경상북도 산불 대응 샘플 시드.
 * 산림청 산불 위기경보(관심·주의·경계·심각) 체계와 지자체 산불방지대책본부·재난안전대책본부 일반 절차로 구성한 예시이며,
 * 경상북도 산불 현장조치 행동매뉴얼 확보 시 동일 형식으로 교체한다.
 */
import type { SeedAction } from "@/lib/seed";

export const GB_WILDFIRE_SOURCE = "경상북도 산불 대응 샘플 (매뉴얼 확보 후 교체)";

export const GB_WILDFIRE: SeedAction[] = [
  {
    code: "GB-WF-001", stage: "관심", phase: "대응", title: "산불위험 기상정보 모니터링",
    content: "건조특보·강풍 예보와 산불위험지수를 수시로 확인하고 시·군에 공유한다.",
    details: ["기상청 건조·강풍 특보 및 예비특보 확인", "국가산불위험예보시스템 산불위험지수 확인", "시·군 산불담당 부서에 위험지역 공유"],
    lead: "산림자원과", support: ["자연재난과"], collab: ["대구지방기상청", "산림청"],
    propagateTo: ["22개 시·군 산림부서"], propagateMsg: "[경북도] 건조특보 발효 중. 산불위험지수 높음 지역 예찰 강화 바랍니다.",
    resources: ["산불위험예보시스템"], damageMeasures: [],
  },
  {
    code: "GB-WF-002", stage: "관심", phase: "대응", title: "산불감시 인력 배치 점검",
    content: "산불감시원·전문예방진화대 배치와 감시탑·CCTV 가동 상태를 점검한다.",
    details: ["시·군별 산불감시원·전문예방진화대 배치 현황 확인", "감시탑·무인감시카메라 가동 점검", "입산통제구역·등산로 폐쇄 현황 확인"],
    lead: "산림자원과", support: [], collab: ["22개 시·군"],
    propagateTo: ["22개 시·군 산림부서"], propagateMsg: "", resources: ["산불감시원", "전문예방진화대", "무인감시카메라"], damageMeasures: [],
  },
  {
    code: "GB-WF-003", stage: "주의", phase: "대응", title: "산불방지대책본부 상황근무 강화",
    content: "산불 위기경보 주의 발령에 따라 도·시군 산불방지대책본부 상황근무를 강화한다.",
    details: ["도 산불방지대책본부 상황근무 인원 증원", "시·군 산불상황실 운영 상황 확인", "산불 발생 시 보고 체계 재확인"],
    lead: "산림자원과", support: ["자연재난과"], collab: ["산림청"],
    propagateTo: ["22개 시·군", "소방본부"], propagateMsg: "[경북도] 산불 위기경보 '주의' 발령. 상황근무 강화 및 소각행위 단속 바랍니다.",
    resources: ["상황근무 인원"], damageMeasures: [],
  },
  {
    code: "GB-WF-004", stage: "주의", phase: "대응", title: "불법 소각행위 단속 및 홍보",
    content: "영농부산물·쓰레기 소각 단속과 산불예방 홍보를 실시한다.",
    details: ["마을방송·재난문자 산불예방 홍보", "논·밭두렁 소각 단속반 운영", "산림인접지 화기 취급 계도"],
    lead: "산림자원과", support: ["자연재난과"], collab: ["읍·면·동", "경북경찰청"],
    propagateTo: ["읍·면·동 주민"], propagateMsg: "건조한 날씨가 지속되고 있습니다. 논·밭두렁 및 쓰레기 소각을 금지하여 주시기 바랍니다.",
    resources: ["단속반", "마을방송"], damageMeasures: [],
  },
  {
    code: "GB-WF-005", stage: "경계", phase: "대응", title: "산불 발생 상황 접수 및 전파",
    content: "산불 발생 신고를 접수하여 규모·위치·진화 상황을 파악하고 보고·전파한다.",
    details: ["발생 위치·시각·피해면적·진화자원 투입 현황 파악", "도지사·부지사 보고", "산림청·행정안전부 NDMS 보고", "유관기관 상황 전파"],
    lead: "산림자원과", support: ["자연재난과", "재난안전상황실"], collab: ["산림청", "소방본부", "경북경찰청"],
    propagateTo: ["도지사·부지사", "관계 시·군", "유관기관"], propagateMsg: "[경북도] ○○군 ○○면 산불 발생(○시 ○분). 진화헬기·인력 투입 중. 상황 공유 바랍니다.",
    resources: ["NDMS", "상황전파 SMS"], damageMeasures: [],
  },
  {
    code: "GB-WF-006", stage: "경계", phase: "대응", title: "재난안전대책본부 가동",
    content: "대형산불 우려 시 도 재난안전대책본부를 가동하고 실무반을 소집한다.",
    details: ["재난안전대책본부 가동 및 비상근무 명령", "실무반 소집 및 임무 부여", "상황판단회의 개최"],
    lead: "자연재난과", support: ["산림자원과", "총무과"], collab: ["산림청", "소방본부"],
    propagateTo: ["실무반 담당부서", "22개 시·군 재난부서"], propagateMsg: "[경북도] 재난안전대책본부 가동. 실무반 담당자는 즉시 상황실로 응소 바랍니다.",
    resources: ["비상근무 인원", "상황실"], damageMeasures: [],
  },
  {
    code: "GB-WF-007", stage: "경계", phase: "대응", title: "진화자원 동원 지원",
    content: "진화헬기·진화차·진화인력 동원을 요청하고 투입 현황을 관리한다.",
    details: ["산림청·소방 진화헬기 지원 요청", "인근 시·군 진화인력 응원 요청", "군 부대 진화인력 지원 요청", "자원 투입 현황 집계"],
    lead: "산림자원과", support: ["자연재난과"], collab: ["산림청", "소방본부", "제50사단"],
    propagateTo: ["산림청", "소방본부", "제50사단"], propagateMsg: "",
    resources: ["진화헬기", "산불진화차", "진화인력"], damageMeasures: [],
  },
  {
    code: "GB-WF-008", stage: "심각", phase: "대응", title: "주민 대피 및 통제",
    content: "산불 확산 경로상 주민을 대피시키고 도로를 통제한다.",
    details: ["확산 우려 마을 대피 명령 및 재난문자 발송", "대피소 개방 및 이재민 수용", "요양시설 등 취약시설 우선 대피", "주요 도로 통제 및 우회 안내"],
    lead: "자연재난과", support: ["복지정책과"], collab: ["관계 시·군", "경북경찰청", "소방본부"],
    propagateTo: ["관계 시·군", "주민"], propagateMsg: "[경북도] 산불 확산으로 ○○리 주민은 ○○초등학교로 즉시 대피하시기 바랍니다.",
    resources: ["대피소", "수송차량"], damageMeasures: [],
  },
  {
    code: "GB-WF-009", stage: "심각", phase: "대응", title: "주요시설 보호",
    content: "문화재·송전시설·공공시설 등 주요시설 방어선을 구축한다.",
    details: ["문화재·사찰 방화선 구축 및 살수", "송전선로·변전소 관계기관 협조", "공공시설 주변 방어진화"],
    lead: "자연재난과", support: ["문화유산과"], collab: ["한국전력공사", "소방본부"],
    propagateTo: ["한국전력공사", "문화유산 관리기관"], propagateMsg: "", resources: ["소방차", "살수장비"], damageMeasures: [],
  },
  {
    code: "GB-WF-010", stage: "심각", phase: "복구", title: "피해 상황 조사",
    content: "산림·주택·시설 피해와 인명피해를 조사하여 집계한다.",
    details: ["산림 피해면적 조사", "주택·농림시설 피해 조사", "인명피해 및 이재민 현황 집계", "NDMS 피해 입력"],
    lead: "자연재난과", support: ["산림자원과"], collab: ["관계 시·군", "산림청"],
    propagateTo: ["행정안전부", "산림청"], propagateMsg: "",
    resources: ["피해조사반"], damageMeasures: ["피해 현황 NDMS 입력", "중앙합동조사 대비 자료 준비"],
  },
  {
    code: "GB-WF-011", stage: "심각", phase: "복구", title: "이재민 구호",
    content: "이재민 임시주거와 구호물자를 지원한다.",
    details: ["임시주거시설 운영", "구호물자·급식 지원", "심리지원 연계"],
    lead: "복지정책과", support: ["자연재난과"], collab: ["대한적십자사 경북지사", "전국재해구호협회"],
    propagateTo: ["관계 시·군 복지부서"], propagateMsg: "", resources: ["구호물자", "임시주거시설"], damageMeasures: ["재난지원금 지급 준비"],
  },
  {
    code: "GB-WF-012", stage: "심각", phase: "복구", title: "잔불 정리 및 재발화 감시",
    content: "주불 진화 후 잔불을 정리하고 재발화 감시 인력을 배치한다.",
    details: ["잔불 정리 인력 투입", "뒷불 감시조 편성 및 배치", "재발화 시 즉시 보고"],
    lead: "산림자원과", support: [], collab: ["관계 시·군", "산림청"],
    propagateTo: ["관계 시·군"], propagateMsg: "", resources: ["뒷불감시조"], damageMeasures: [],
  },
  {
    code: "GB-WF-013", stage: "심각", phase: "복구", title: "응급복구 및 2차 피해 예방",
    content: "산불 피해지 토사유출·산사태 등 2차 피해를 막기 위한 응급복구를 실시한다.",
    details: ["피해지 사방시설 응급 설치", "도로·전기·통신 응급복구", "우기 전 산사태 취약지 점검"],
    lead: "자연재난과", support: ["산림자원과", "건설도시과"], collab: ["한국전력공사", "관계 시·군"],
    propagateTo: ["관계 시·군"], propagateMsg: "", resources: ["복구장비"], damageMeasures: ["2차 피해 우려지역 출입 통제"],
  },
].map((a) => ({ ...a, hazard: ["산불"], page: 0 }));

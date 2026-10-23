/**
 * 매뉴얼 분석 — 유형별 설명. 캡처는 public/analysis/*.png (번호 박스 색 = 아래 color, 전화번호·성명은 가림)
 * 캡처 다시 만들기: 실제 매뉴얼 PDF에서 PyMuPDF 로 쪽을 그려 박스·가림 처리 (인계노트 「매뉴얼 분석」 참고)
 */
type Tone = "green" | "blue" | "gray" | "orange" | "red";

const RED = "#de2133";
const BLUE = "#266ef5";
const GREEN = "#00995a";
const ORANGE = "#d97300";
const PURPLE = "#8c33bf";

export interface ManualType {
  key: string;
  rank: string;
  name: string;
  docs: string;
  sop: string;
  sopTone: Tone;
  contact: string;
  contactTone: Tone;
  shots: { src: string; caption: string }[];
  boxes: { color: string; label: string; text: string }[];
  result: string;
}

export const TYPES: ManualType[] = [
  {
    key: "busan",
    rank: "1",
    name: "지자체 현장조치 행동매뉴얼 — 부산형",
    docs: "부산 풍수해, 인제 풍수해, 부산 북구 풍수해. 「재난대응 프로세스」 표(뼈대) + 행동카드(상세).",
    sop: "그대로 적용",
    sopTone: "green",
    contact: "높음",
    contactTone: "green",
    shots: [{ src: "/analysis/t1-busan-process.png", caption: "부산 풍수해 현장조치 행동매뉴얼 p.34 · 재난대응 프로세스" }],
    boxes: [
      { color: RED, label: "단계 머리 「1단계 징후 감지」", text: "대응단계(responseStep). 이름이 아니라 열 순서로 맞춥니다." },
      { color: BLUE, label: "왼쪽 부서 칸 「초기대응부서 · 재난상황실 · 자연재난과」", text: "담당부서 행 고르기(R19). 기본 「자연재난과」면 이 묶음만." },
      { color: GREEN, label: "[3] / [3-1] 번호", text: "[3] = 임무, [3-1] = 조치 1건(R1·R2). 화면의 SOP 항목 1개." },
      { color: ORANGE, label: "「- (호우예비특보) …」 줄", text: "세부행동(R3). 앞의 괄호는 조건이 아니라 글 그대로(R18)." },
      { color: PURPLE, label: "「＊태풍 한반도 북상 우려시」", text: "조치 전체에 붙은 조건 → condition(R8) → 화면의 「필요시 임무」." },
    ],
    result: "지금 규칙(R1~R19)이 그대로 맞습니다. SOP 뼈대는 이 유형에서 가져옵니다.",
  },
  {
    key: "yeongcheon",
    rank: "2",
    name: "지자체 현장조치 — 행안부 표준 협업기능형",
    docs: "영천 풍수해. 협업기능 ①~⑬ 번호로 흐름표와 행동카드를 잇습니다(흐름표 142건 = 카드 142장).",
    sop: "그대로 적용",
    sopTone: "green",
    contact: "높음",
    contactTone: "green",
    shots: [{ src: "/analysis/t2-yeongcheon-card.png", caption: "영천 풍수해 현장조치 행동매뉴얼 p.34 · 행동카드" }],
    boxes: [
      { color: RED, label: "코드번호 「①-1-2」", text: "숫자로 1-1-2(R10). ① = 협업기능(functionCode), ①-1 = 임무, ①-1-2 = 조치." },
      { color: BLUE, label: "조치내용", text: "조치명(actionName)." },
      { color: GREEN, label: "주관부서", text: "organizations LEAD. 담당부서 고르기(R19)는 이 칸으로." },
      { color: ORANGE, label: "협업기관 「영천소방서, 영천경찰서, 대구지방기상청」", text: "COOPERATE. 본문의 「기관(☎ …)」과 함께 유관기관 연락처로도(C8)." },
    ],
    result: "그대로 맞습니다. 경북 다른 시·군도 같은 양식이면 같은 결과가 나옵니다.",
  },
  {
    key: "ulju",
    rank: "3",
    name: "지자체 현장조치 — 울주형",
    docs: "울주군 10종(산불·지진·폭염·가뭄·유해화학·해양오염·건축물붕괴·산사태·초미세먼지·선박), 대전 다중밀집, 의성 지진(울주 지진을 거의 그대로).",
    sop: "보완 적용",
    sopTone: "green",
    contact: "높음",
    contactTone: "green",
    shots: [{ src: "/analysis/t3-uiseong-card.png", caption: "의성 지진 현장조치 행동매뉴얼 p.32 · 행동요령 카드 (번호 가림)" }],
    boxes: [
      { color: RED, label: "코드번호 4-1, 카드 머리 「초기 대응」", text: "조치 코드. 단계는 카드 머리 표기를 먼저 봅니다(R22)." },
      { color: BLUE, label: "조치목록 「상황접수 및 파악」", text: "번호 없는 임무 이름. 프로세스 표의 [상황접수 …] 같은 대괄호 소제목도 임무로(R21)." },
      { color: GREEN, label: "주관부서", text: "organizations LEAD." },
      { color: ORANGE, label: "「안전건설과(상황실)」 + 본문의 ☎·FAX", text: "카드 안에 부서 연락처가 섞여 있습니다 → 연락망(C8). 코드 오타·반복은 R21로 정리." },
    ],
    result: "작은 보완(R20~R23)으로 맞습니다. 프로세스 표 글자가 부서 행 단위로 이어져 나와 단계 판정은 카드 머리가 더 정확합니다.",
  },
  {
    key: "edu",
    rank: "4",
    name: "교육청·교육부 행동카드형",
    docs: "전북·전남교육청 교육시설 행동매뉴얼, 교육부 교육시설 대응매뉴얼, 학교시설 주요상황 대응 매뉴얼.",
    sop: "구조만 맞음",
    sopTone: "blue",
    contact: "높음",
    contactTone: "green",
    shots: [{ src: "/analysis/t4-jeonbuk-process.png", caption: "전북교육청 교육시설 행동매뉴얼 p.35 · 재난대응 프로세스" }],
    boxes: [
      { color: RED, label: "코드번호 「①-1-1」", text: "R10 그대로." },
      { color: BLUE, label: "단계 열 「징후감지 · 초기대응 · 비상대응 · 수습복구」와 ●○", text: "● = 그 단계에서 시작, ○ = 이어서 계속(R22). ○는 새 조치가 아닙니다." },
      { color: GREEN, label: "[필요시] 꼬리표", text: "조건 → condition(R23)." },
      { color: ORANGE, label: "구분 「상황총괄반」", text: "반 단위 부서 칸(R19)." },
    ],
    result: "구조는 잘 맞지만 학교·교육청 자체 조치라 지자체 SOP로는 조치가 적습니다. 목차·사례에 같은 코드가 4~8번 반복돼 첫 등장만 씁니다(R21).",
  },
  {
    key: "public",
    rank: "5",
    name: "공공기관 행동매뉴얼",
    docs: "인천항만공사(해양선박·풍수해), 부산지방항공청, 한국산림복지진흥원, SR, 한수원.",
    sop: "구조만 맞음",
    sopTone: "blue",
    contact: "보통",
    contactTone: "blue",
    shots: [{ src: "/analysis/t5-ipa-actions.png", caption: "인천항만공사 해양선박사고 행동매뉴얼 p.47 · 위기경보 수준별 조치목록" }],
    boxes: [
      { color: RED, label: "(가) 조치사항", text: "임무." },
      { color: BLUE, label: "(가-1) 세부내용", text: "조치(R24). 「가-1.」로 다시 나오면 같은 코드로 합칩니다." },
      { color: GREEN, label: "비고 칸 「지자체」", text: "비고·관계기관 칸에 지자체가 있는 줄만 지자체 조치로(R24)." },
    ],
    result: "그 기관 내부 조치라 지자체 SOP는 대부분 비어 나옵니다 → 빈 결과 + 「지자체 조치 없음」 경고(R25).",
  },
  {
    key: "practice",
    rank: "6",
    name: "위기대응 실무매뉴얼 (중앙부처)",
    docs: "지진 환경부, 산림청 산불, 다중밀집시설(행안부·소방청), 경기장·공연장, 해양오염, 산사태, 국가유산청, 기후부, 지하철 등 31종.",
    sop: "지자체 행만",
    sopTone: "blue",
    contact: "보통",
    contactTone: "blue",
    shots: [{ src: "/analysis/t6-quake-roles.png", caption: "지진 위기대응 실무매뉴얼(환경부) p.11 · 위기관리 기구의 임무와 역할" }],
    boxes: [
      { color: ORANGE, label: "중앙재난안전대책본부 등 중앙 행", text: "중앙기관이 하는 일이라 지자체 SOP에서는 뺍니다." },
      { color: BLUE, label: "「지역재난안전대책본부(지방자치단체의 장)」 행", text: "지자체 별칭 행만 그 경보단계의 조치로(R24). 단계 = 위기경보(alertLevel)." },
    ],
    result: "조치 코드·행동카드가 거의 없어 뼈대로는 못 씁니다. 지자체 행만 뽑아 근거·위기경보형 단계 고르기에 씁니다.",
  },
  {
    key: "standard",
    rank: "7",
    name: "위기관리 표준매뉴얼",
    docs: "풍수해·지진·산불·다중밀집·감염병·가축질병·공연장·해양선박 표준매뉴얼 14종(2016~2021).",
    sop: "근거 칸",
    sopTone: "gray",
    contact: "높음",
    contactTone: "green",
    shots: [{ src: "/analysis/t7-flood-standard.png", caption: "풍수해 위기관리 표준매뉴얼(행안부 2020) p.52 · 기관별 임무 및 역할" }],
    boxes: [
      { color: ORANGE, label: "경찰청 등 부처 행", text: "부처 임무 — 뺍니다." },
      { color: BLUE, label: "지방자치단체 행", text: "2~3줄뿐입니다(R24). 단계별 점검 목록 정도." },
    ],
    result: "SOP 뼈대가 아니라 근거 칸으로만 씁니다. 연락망(기관/부서/연락처 표)은 개인정보 없이 잘 정리돼 있습니다.",
  },
  {
    key: "unfit",
    rank: "8",
    name: "맞지 않는 문서",
    docs: "감염병·가축질병 실무(기관과 할 일이 짝지어지지 않음), 인접국가 방사능(그림 쪽), 학교 감염병, 고농도 미세먼지 표준(실제로는 브리핑 녹취록).",
    sop: "부적합",
    sopTone: "orange",
    contact: "낮음",
    contactTone: "gray",
    shots: [{ src: "/analysis/t8-infect-sop.png", caption: "감염병 재난 위기대응 실무매뉴얼(2020) p.106 · 부처간 표준업무절차" }],
    boxes: [{ color: RED, label: "부처 칸", text: "부처 단위라 지자체 행이 없습니다. 지자체는 부처가 하는 일의 대상으로만 나옵니다." }],
    result: "규칙을 늘려 억지로 맞추지 않습니다. 만들지 않고 「지자체 조치 없음」 경고만 남깁니다(R25 예외 원칙).",
  },
  {
    key: "contacts-local",
    rank: "연",
    name: "연락망 — 지자체 매뉴얼의 비상연락망",
    docs: "지자체 현장조치 행동매뉴얼 18종 모두 비상연락망이 있고, 유관기관이 문서마다 10~12종입니다.",
    sop: "API-04",
    sopTone: "blue",
    contact: "높음",
    contactTone: "green",
    shots: [{ src: "/analysis/c1-uiseong-contacts.png", caption: "의성 지진 현장조치 행동매뉴얼 p.18 · 비상연락망 (성명·번호 가림)" }],
    boxes: [
      { color: RED, label: "주관기관(부서)", text: "기관·부서(C2)." },
      { color: BLUE, label: "직위 · 성명", text: "내부 연락망이라 문서에 있으면 그대로 받습니다." },
      { color: GREEN, label: "연락처 「(사)」", text: "사무실 번호 → phones(C3)." },
      { color: ORANGE, label: "「(CP)」", text: "휴대전화 → mobile. 상황전파 문자는 휴대전화 우선." },
    ],
    result: "기관 단위 표와 담당자 표를 C1~C10으로 뽑아 「유관기관」「우리 기관 부서」 등으로 나눠 줍니다. 화면은 미리 보고 고른 줄만 넣습니다.",
  },
  {
    key: "contacts-central",
    rank: "연",
    name: "연락망 — 중앙부처 매뉴얼의 유관기관 연락망",
    docs: "실무·표준매뉴얼의 「유관기관 연락망」. 대부분 중앙부처 상황실·당직실입니다.",
    sop: "API-04",
    sopTone: "blue",
    contact: "보통",
    contactTone: "blue",
    shots: [{ src: "/analysis/c2-moe-central.png", caption: "풍수해 위기대응 실무매뉴얼(기후부) p.83 · 유관기관 연락망 (번호 가림)" }],
    boxes: [
      { color: RED, label: "기관", text: "중앙부처 → 분류 HIGHER(상급 보고처, C7)." },
      { color: BLUE, label: "부서 「야) 당직실」", text: "야간·당직 → night(C3)." },
      { color: GREEN, label: "전화", text: "phones." },
      { color: ORANGE, label: "팩스", text: "fax." },
    ],
    result: "지자체가 실제로 전파하는 지역 소방서·경찰서는 거의 없어 「상급 보고처」로만 씁니다. 지방청·시·도 표가 있으면 그쪽이 쓸모가 큽니다.",
  },
];

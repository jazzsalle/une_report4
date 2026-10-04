# T3Q 연계 API 요청서

> **최종 규격(정본)은 Swagger 문서입니다:** https://unereport4.vercel.app/api-docs (① T3Q 연계 API 요청서)
> 원본 파일 `public/api-docs/t3q.yaml` · 코드 계약 `src/lib/t3q/types.ts` — 이 문서는 배경 설명용입니다.
>
> v1.0 반영 사항: `SituationContext.period`(대응 기간) 추가, API-01 요청에 `weatherInfoText`(기상청 기상정보 본문) 추가, `WeatherAlert.level`에 `PRELIMINARY`(예비특보) 추가.

| 항목 | 내용 |
|---|---|
| 문서명 | 대화형 AI 재난관리 — T3Q 연계 API 요청서 |
| 대상 API | ① 기상특보 기반 AI 기상요약 ② 상황 기반 SOP(조치) 콘텐츠 생성 ③ 사용자 인증(링크 로그인) |
| 요청 측 | 대화형 AI 재난관리 신규 앱(Next.js) 개발팀 |
| 버전 | v0.1 (초안) · 2026-10-04 |
| 근거 | 요구사항정의서(CADM_PM_1110_01 V0.2) — AI 기상요약 조회, T3Q 조치추천 API 연계, 기본 SOP 자동 구성, 연계 상태 확인, 모의/실제 응답 전환 |
| 호환 기준 | UNE SOP 자동생성 모듈의 컴포넌트(`__compn__`) 계약 — 유형 코드·필드명 유지 |

---

## 1. 개요

### 1.1 목적
신규 앱은 상황(지자체·재난유형·위기경보 수준 등)을 Context로 T3Q에 다음 두 가지를 요청한다.

1. **API-01 기상요약**: 시스템이 기상청 공식 API로 조회한 기상특보를 T3Q에 전달하면, T3Q가 담당자가 읽기 쉬운 **자연어 기상요약**을 반환한다.
2. **API-02 SOP 콘텐츠**: 지역·상황·재난유형(및 선택 문서)을 전달하면, T3Q가 매뉴얼 기반의 **임무 → 조치(절차) → 세부행동**, 대응·피해 조치 구분, 담당·지원·협업기관, 전파대상, 필요자원을 **조치 목록 + 상세를 1회 응답**으로 반환한다. 신규 앱은 이를 기존 UNE SOP 컴포넌트(`__compn__`)로 변환하여 플로우를 구성한다.

### 1.2 범위 원칙 (요구사항 반영)
| 구분 | T3Q 제공 | T3Q 미제공(신규 앱 담당) |
|---|---|---|
| 기상 | 공식 특보의 요약·해설 | 기상 예측, 위험도 판정 |
| SOP | 조치코드·조치명·대응단계·기관·세부행동·전파대상·필요자원·출처 | 필수/선택 여부, 선행/후행 관계, **분기조건**, 조치 포함 여부 판단, 캔버스 좌표 |
| 실행 | - | 상황전파 실제 수신자 확정, 발송 |

- 조치 선택 이후 SOP 구성은 **T3Q 재호출 없이** 신규 앱이 수행한다(1회 수신).
- 출처 문서·페이지·조치코드는 보관용이며 SOP 노드 정보에는 넣지 않는다.

---

## 2. 공통 사항

### 2.1 접속·인증
| 항목 | 요청 내용 |
|---|---|
| 프로토콜 | HTTPS(운영), HTTP(사내 개발) |
| Base URL | `{T3Q_BASE_URL}/t3q/v1` (환경변수로 주입, 코드 고정 금지) |
| 인증 | `Authorization: Bearer <token>` — 서비스 계정 발급 요청. 만료 시 `401` |
| 문자셋 | UTF-8, `Content-Type: application/json` |
| 추적 | 요청 헤더 `X-Request-Id`(UUID) → 응답에 동일 값 반환, T3Q 측 로그 키로 사용 |
| 시간 | ISO 8601, KST 오프셋 포함(`2026-07-16T14:00:00+09:00`) |
| 모델 | 모델명은 응답 메타(`meta.model`)로만 알려주고, 요청 측에 모델명 고정을 요구하지 않기를 요청(UNI RAG 모델 교체 장애 사례 반영) |

### 2.2 응답 방식
| 방식 | 헤더 | 용도 |
|---|---|---|
| 동기 JSON (필수) | `Accept: application/json` | 기본. 전체 결과 1회 반환 |
| SSE 스트리밍 (선택) | `Accept: text/event-stream` | 진행 표시. 이벤트 키는 기존 UNI RAG와 동일 규칙(§2.3) |

### 2.3 SSE 이벤트 규칙 (기존 UNI RAG `/chat/json`과 동일)
- 각 줄 `data: {json}`, `data: ` 뒤 공백 1개, 종료 시 `data: [DONE]`.
- 키: `__status__`(`searching`·`reranking`·`generating`·**`end`**), `__error__`(문자열), API별 결과 키(아래).
- **요청**: 스트림 종료 직전 반드시 `{"__status__":"end"}` 송신(기존 모듈은 이 이벤트가 없으면 UI가 '생성 중'에 머묾).

### 2.4 공통 Context 타입 (TypeScript)
```ts
/** 업무유형 */
export type WorkType = 'REAL' | 'DRILL';            // 실제재난 | 안전한국훈련

/** 위기경보 수준 */
export type AlertLevel = 'INTEREST' | 'CAUTION' | 'ALERT' | 'SERIOUS'; // 관심|주의|경계|심각

/** 재난유형 (10종)
 *  HEAT_WAVE 폭염 · TYPHOON_HEAVY_RAIN 태풍/호우 · EARTHQUAKE 지진 · YELLOW_DUST 황사 (자연재난)
 *  WILDFIRE 산불 · INFECTIOUS_DISEASE 감염병 · LIVESTOCK_DISEASE 가축질병 · CROWDED_BUILDING_COLLAPSE 다중밀집건축물붕괴대형사고
 *  GOV_MAJOR_FACILITY 정부주요시설 · SCHOOL_FACILITY 학교시설 (사회재난) */
export interface DisasterType {
  code: string;            // 10종 — 아래 표
  name: string;            // 예: '태풍/호우'
  group?: string;          // '자연재난' | '사회재난'
}

/** 행정구역 (법정동 코드 10자리 기준) */
export interface Region {
  code: string;            // 예: '2600000000' (부산광역시)
  name: string;            // 예: '부산광역시'
  level: 'SIDO' | 'SIGUNGU' | 'EUPMYEONDONG';
}

/** 상황 Context — API-01/02 공통 */
export interface SituationContext {
  situationId: string;               // 신규 앱 상황 ID
  workType: WorkType;
  responsibleRegion: Region;         // 대응 지자체
  affectedRegions?: Region[];        // 발생·영향지역(복수)
  disasterType: DisasterType;
  alertLevel: AlertLevel;
  baseTime: string;                  // 기준시각
  title?: string;                    // 업무 제목
  currentSituation?: string;         // 현재상황(참고용 자유 텍스트)
  drillScenario?: {                  // workType='DRILL'일 때
    planName: string; schedule?: string; purpose?: string;
    scenario: string; participants?: string[];
  };
}

/** 공통 응답 메타 */
export interface T3QMeta {
  requestId: string;
  traceId: string;                   // T3Q 내부 추적 ID
  generatedAt: string;
  model?: string;                    // 참고 표시용
  mock?: boolean;                    // 모의 응답 여부
  elapsedMs?: number;
}

/** 공통 오류 */
export interface T3QError {
  error: { code: string; message: string; detail?: unknown };
  meta: Pick<T3QMeta, 'requestId' | 'traceId'>;
}
```

---

## 3. API-01 기상특보 → 자연어 기상요약

### 3.1 엔드포인트
`POST /t3q/v1/weather/summary`

### 3.2 요청
```ts
/** 기상특보 1건 (시스템이 기상청 공식 API로 조회한 원문 그대로 전달) */
export interface WeatherAlert {
  alertId: string;                     // 시스템 내부 ID
  source: 'KMA';                       // 출처: 기상청
  kind: string;                        // 특보 종류: '호우' | '태풍' | '대설' | '강풍' | '풍랑' | '건조' …
  level: 'WATCH' | 'WARNING';          // 주의보 | 경보
  command: 'ISSUE' | 'CHANGE' | 'EXTEND' | 'RELEASE' | 'PRELIMINARY'; // 발표|변경|연장|해제|예비특보
  areas: { code: string; name: string }[]; // 특보구역
  announcedAt: string;                 // 발표시각
  effectiveAt: string;                 // 발효시각
  releasedAt?: string;                 // 해제시각
  retrievedAt: string;                 // 시스템 조회시각
  text?: string;                       // 특보 원문/특보 내용(전문)
}

export interface WeatherSummaryRequest {
  context: SituationContext;
  alerts: WeatherAlert[];              // 0건 허용(특보 없음 요약)
  options?: {
    maxChars?: number;                 // 본문 최대 글자수 (기본 400)
    style?: 'BRIEF' | 'REPORT';        // 상황판 짧은 요약 | 보고서 문체(~함/~임)
    sections?: Array<'HEADLINE' | 'BODY' | 'KEY_POINTS' | 'TIMELINE' | 'CAUTIONS'>;
  };
}
```

### 3.3 응답
```ts
export interface WeatherSummaryResponse {
  meta: T3QMeta;
  summary: {
    headline: string;                  // 한 줄 요약
    body: string;                      // 자연어 요약 본문
    keyPoints: string[];               // 핵심 사항(보고서 □/○ 항목으로 바로 사용)
    timeline?: { time: string; text: string }[]; // 발표·발효·해제 흐름
    affectedRegions: Region[];         // 요약에 언급된 지역
    cautions?: string[];               // 공식 특보 문구 범위 내의 유의사항
  };
  basis: {                             // 근거: 어떤 특보로 요약했는지
    alertIds: string[];
    sourceLabel: string;               // 예: '기상청 기상특보(2026-07-16 14:00 발표)'
  };
  disclaimer: string;                  // 'AI 요약이며 공식 특보가 우선합니다' 등 고정 문구
}
```
- **요청 사항**: 공식 특보에 없는 수치·예측(강수량 전망, 위험도 등급 등)을 생성하지 않을 것. 신규 앱은 공식 특보와 AI 요약을 출처·조회시각으로 구분 저장한다.
- SSE 사용 시: `__status__` → `{"__summary_delta__":"…"}`(본문 토큰, 선택) → `{"__summary__":WeatherSummaryResponse}` → `{"__status__":"end"}` → `[DONE]`.

### 3.4 예시
요청:
```json
{
  "context": {
    "situationId": "SIT-20260716-0001",
    "workType": "REAL",
    "responsibleRegion": { "code": "2600000000", "name": "부산광역시", "level": "SIDO" },
    "affectedRegions": [
      { "code": "2635000000", "name": "해운대구", "level": "SIGUNGU" },
      { "code": "2644000000", "name": "강서구", "level": "SIGUNGU" }
    ],
    "disasterType": { "code": "TYPHOON_HEAVY_RAIN", "name": "태풍/호우", "group": "자연재난" },
    "alertLevel": "ALERT",
    "baseTime": "2026-07-16T14:30:00+09:00",
    "title": "7.16. 부산 집중호우 대응"
  },
  "alerts": [
    {
      "alertId": "WA-001",
      "source": "KMA",
      "kind": "호우",
      "level": "WARNING",
      "command": "ISSUE",
      "areas": [{ "code": "L1100200", "name": "부산" }],
      "announcedAt": "2026-07-16T14:00:00+09:00",
      "effectiveAt": "2026-07-16T14:00:00+09:00",
      "retrievedAt": "2026-07-16T14:05:12+09:00",
      "text": "부산 호우경보 발표. 3시간 강우량 90mm 이상 예상 시 발표 기준."
    }
  ],
  "options": { "maxChars": 300, "style": "REPORT", "sections": ["HEADLINE", "BODY", "KEY_POINTS", "TIMELINE"] }
}
```
응답:
```json
{
  "meta": {
    "requestId": "7c1e0f3a-5b7d-4a8e-9a51-0d3c2f1a9b10",
    "traceId": "t3q-wx-20260716-000123",
    "generatedAt": "2026-07-16T14:05:20+09:00",
    "model": "t3q-weather-v1",
    "mock": false,
    "elapsedMs": 2310
  },
  "summary": {
    "headline": "부산 전역 호우경보 발효(7.16. 14:00)",
    "body": "기상청은 7월 16일 14시 부산 지역에 호우경보를 발표·발효함. 해운대구·강서구 등 저지대 침수 취약지역의 선제적 통제와 주민 대피 준비가 필요함.",
    "keyPoints": [
      "7.16.(목) 14:00 부산 호우경보 발표·발효",
      "저지대·지하차도·하천변 침수 취약지역 집중 관리 필요"
    ],
    "timeline": [{ "time": "2026-07-16T14:00:00+09:00", "text": "호우경보 발표·발효(부산)" }],
    "affectedRegions": [{ "code": "2600000000", "name": "부산광역시", "level": "SIDO" }],
    "cautions": ["공식 특보 해제 전까지 경보 상태 유지"]
  },
  "basis": { "alertIds": ["WA-001"], "sourceLabel": "기상청 기상특보(2026-07-16 14:00 발표)" },
  "disclaimer": "본 요약은 AI가 공식 기상특보를 정리한 것으로, 공식 특보 원문이 우선합니다."
}
```

---

## 4. API-02 지역·상황·재난유형 → SOP 콘텐츠

### 4.1 엔드포인트
| 메서드·경로 | 설명 |
|---|---|
| `POST /t3q/v1/sop/actions` | 조치 목록 + 상세 1회 반환(필수) |
| `POST /t3q/v1/sop/actions` + `Accept: text/event-stream` | 조치 단위 스트리밍(선택). 결과 키 `__action__` 및(옵션) `__compn__` |

### 4.2 요청
```ts
export type ResponsePhase =
  | 'PREVENTION' | 'PREPAREDNESS' | 'RESPONSE' | 'RECOVERY'; // 예방|대비|대응|복구
// 지자체 매뉴얼의 비상단계(준비·1단계·2단계·3단계)는 phaseLabel로 함께 반환 요청

export interface SopActionsRequest {
  context: SituationContext;
  weatherSummaryTraceId?: string;      // API-01 결과를 Context로 재사용할 때
  documents?: {                        // 사용자가 선택한 매뉴얼(문서 조회 API 결과)
    docId: string;
    pages?: number[];
  }[];
  filter?: {
    phases?: ResponsePhase[];          // 특정 대응단계만
    categories?: Array<'RESPONSE' | 'DAMAGE'>; // 대응조치 | 피해(복구)조치
    maxActions?: number;               // 기본 30
  };
  output?: {
    includeCompns?: boolean;           // true면 기존 __compn__ 계약 형식도 함께 반환(§5). 기본 false
    layout?: { originX: number; originY: number; gapY: number; width: number; height: number };
  };
}
```

### 4.3 응답
```ts
export interface OrgRef {
  name: string;                        // 기관·부서명 (예: '시민안전실 자연재난과')
  role: 'LEAD' | 'SUPPORT' | 'COOPERATE'; // 담당(주관) | 지원 | 협업
  orgCode?: string;                    // 매핑 가능 시 행정표준기관코드
}

export interface DetailTask {          // 세부행동 = 하위 임무
  seq: number;
  title: string;                       // 예: '하천변 산책로 출입 통제'
  content: string;                     // 수행 내용
  note?: string;                       // 비고(시점·기준 등)
}

export interface PropagationTarget {   // 전파대상(참고정보 — 실제 수신자는 사용자가 확정)
  target: string;                      // 예: '구·군 재난안전과', '읍면동 주민'
  targetType: 'ORG' | 'ROLE' | 'PUBLIC';
  channelHint?: 'SMS' | 'EMAIL' | 'BROADCAST' | 'PHONE';
  messageTemplate?: string;            // 전파 문안 초안
}

export interface ResourceNeed {        // 필요자원
  category: string;                    // 예: '장비' | '인력' | '물자' | '시설'
  name: string;                        // 예: '양수기'
  quantity?: number;
  unit?: string;
}

export interface SourceRef {           // 출처(노드에는 넣지 않음, 보관·근거 표시용)
  docId: string;
  docTitle: string;
  page?: number;
  excerpt?: string;                    // 200자 이내
}

export interface SopAction {
  actionCode: string;                  // 조치코드 (T3Q 내 고유)
  actionName: string;                  // 조치명 → 노드 제목
  phase: ResponsePhase;
  phaseLabel?: string;                 // 매뉴얼 원문 단계명 (예: '비상 2단계')
  category: 'RESPONSE' | 'DAMAGE';     // 대응조치 | 피해(복구)조치
  missionCode: string;                 // 소속 임무
  orderHint: number;                   // 매뉴얼상 기재 순서(선후행 관계 아님)
  summary?: string;                    // 조치 요약 1~2문장
  organizations: OrgRef[];             // 담당·지원·협업기관
  detailTasks: DetailTask[];           // 세부행동
  propagation: PropagationTarget[];    // 전파대상
  resources: ResourceNeed[];           // 필요자원
  sources: SourceRef[];                // 출처 문서·페이지
}

export interface SopMission {          // 임무(조치 묶음)
  missionCode: string;
  missionName: string;                 // 예: '상황관리', '인명보호', '시설피해 응급복구'
  leadOrg?: string;
  actionCodes: string[];
}

export interface SopActionsResponse {
  meta: T3QMeta;
  disasterType: DisasterType;
  missions: SopMission[];
  actions: SopAction[];                // 조치 목록+상세(평면 배열, missions에서 참조)
  organizationSummary?: {              // 기관별 역할 요약(조직 편성 참고)
    name: string; roles: OrgRef['role'][]; actionCodes: string[];
  }[];
  compns?: LLMCompnData[];             // output.includeCompns=true일 때(§5 계약)
}
```

### 4.4 예시
요청:
```json
{
  "context": {
    "situationId": "SIT-20260716-0001",
    "workType": "REAL",
    "responsibleRegion": { "code": "2600000000", "name": "부산광역시", "level": "SIDO" },
    "affectedRegions": [{ "code": "2635000000", "name": "해운대구", "level": "SIGUNGU" }],
    "disasterType": { "code": "TYPHOON_HEAVY_RAIN", "name": "태풍/호우", "group": "자연재난" },
    "alertLevel": "ALERT",
    "baseTime": "2026-07-16T14:30:00+09:00",
    "currentSituation": "해운대구 저지대 도로 일부 침수 신고 접수"
  },
  "documents": [{ "docId": "DOC-BUSAN-FLOOD-2026", "pages": [12, 13, 14] }],
  "filter": { "phases": ["RESPONSE"], "maxActions": 10 },
  "output": { "includeCompns": true, "layout": { "originX": 0, "originY": 0, "gapY": 160, "width": 240, "height": 80 } }
}
```
응답(발췌):
```json
{
  "meta": {
    "requestId": "a9f2c1d4-0e6b-4d71-8c3a-6b2f9e7d1c55",
    "traceId": "t3q-sop-20260716-000456",
    "generatedAt": "2026-07-16T14:31:08+09:00",
    "model": "t3q-sop-v1",
    "mock": false
  },
  "disasterType": { "code": "TYPHOON_HEAVY_RAIN", "name": "태풍/호우", "group": "자연재난" },
  "missions": [
    { "missionCode": "M01", "missionName": "상황관리", "leadOrg": "시민안전실 자연재난과", "actionCodes": ["HR-R-001"] },
    { "missionCode": "M02", "missionName": "인명보호", "leadOrg": "해운대구 안전총괄과", "actionCodes": ["HR-R-002"] }
  ],
  "actions": [
    {
      "actionCode": "HR-R-001",
      "actionName": "재난안전대책본부 비상 2단계 가동 및 상황 전파",
      "phase": "RESPONSE",
      "phaseLabel": "비상 2단계",
      "category": "RESPONSE",
      "missionCode": "M01",
      "orderHint": 1,
      "summary": "호우경보 발효에 따라 비상 2단계 근무체계로 전환하고 유관기관에 상황을 전파한다.",
      "organizations": [
        { "name": "시민안전실 자연재난과", "role": "LEAD" },
        { "name": "16개 구·군 재난안전과", "role": "SUPPORT" },
        { "name": "부산지방기상청", "role": "COOPERATE" }
      ],
      "detailTasks": [
        { "seq": 1, "title": "비상근무 인원 소집", "content": "비상 2단계 근무명령에 따라 협업부서 인원을 소집한다." },
        { "seq": 2, "title": "기상상황 모니터링", "content": "강우량·하천수위를 1시간 단위로 확인하여 상황판에 게시한다.", "note": "특보 해제 시까지" }
      ],
      "propagation": [
        { "target": "16개 구·군 재난안전과", "targetType": "ORG", "channelHint": "SMS",
          "messageTemplate": "[부산시] 호우경보 발효(7.16. 14:00). 비상 2단계 근무 돌입, 취약지역 예찰 강화 바랍니다." }
      ],
      "resources": [{ "category": "인력", "name": "비상근무 인원", "quantity": 20, "unit": "명" }],
      "sources": [{ "docId": "DOC-BUSAN-FLOOD-2026", "docTitle": "부산시 풍수해 재난 현장조치 행동매뉴얼", "page": 12 }]
    },
    {
      "actionCode": "HR-R-002",
      "actionName": "침수 우려 지하차도·하천변 출입 통제",
      "phase": "RESPONSE",
      "phaseLabel": "비상 2단계",
      "category": "RESPONSE",
      "missionCode": "M02",
      "orderHint": 2,
      "organizations": [
        { "name": "해운대구 안전총괄과", "role": "LEAD" },
        { "name": "해운대경찰서", "role": "COOPERATE" }
      ],
      "detailTasks": [
        { "seq": 1, "title": "지하차도 차량 통제", "content": "수위 기준 초과 시 진입 차단기를 작동하고 우회 안내한다." },
        { "seq": 2, "title": "하천변 산책로 통제", "content": "출입구 통제선 설치 및 현장 안내요원을 배치한다." }
      ],
      "propagation": [
        { "target": "읍면동 주민", "targetType": "PUBLIC", "channelHint": "BROADCAST",
          "messageTemplate": "호우경보로 하천변 산책로 및 지하차도 출입을 통제합니다." }
      ],
      "resources": [
        { "category": "장비", "name": "통제선·차단기", "quantity": 10, "unit": "개소" },
        { "category": "인력", "name": "현장 안내요원", "quantity": 8, "unit": "명" }
      ],
      "sources": [{ "docId": "DOC-BUSAN-FLOOD-2026", "docTitle": "부산시 풍수해 재난 현장조치 행동매뉴얼", "page": 13 }]
    }
  ],
  "organizationSummary": [
    { "name": "시민안전실 자연재난과", "roles": ["LEAD"], "actionCodes": ["HR-R-001"] },
    { "name": "해운대구 안전총괄과", "roles": ["LEAD"], "actionCodes": ["HR-R-002"] }
  ],
  "compns": [ "… §5.3 예시 참조 …" ]
}
```

---

## 4-1. API-03 사용자 인증 (T3Q 플랫폼 링크 로그인)

T3Q 플랫폼에서 링크로 들어온 사용자를 **별도 로그인 없이** 상황일지 도구에 들여보내기 위한 API입니다.

### 흐름
1. 사용자가 T3Q 플랫폼에서 「재난상황일지」 링크 클릭
2. T3Q가 1회용 토큰을 만들어 브라우저를 `https://unereport4.vercel.app/sso/t3q?token={토큰}&next={이동할 화면, 선택}` 으로 보냄
3. 우리 서버가 `POST /t3q/v1/auth/verify` 로 토큰 확인 → 사용자 정보 수신
4. 우리 계정과 연결(처음이면 자동 생성) → 업무 화면으로 이동

### 요청 / 응답
```ts
// POST /t3q/v1/auth/verify  (서버 간 통신, Authorization: Bearer <서비스 토큰>)
interface AuthVerifyRequest { token: string }

interface AuthVerifyResponse {
  meta: T3QMeta;
  user: {
    userId: string;        // 변하지 않는 고유값
    loginId?: string;
    name: string;
    orgCode?: string;      // 행정표준기관코드 — 부산광역시 6260000, 경상북도 6470000
    orgName: string;
    deptName?: string;     // 예: 시민안전실 자연재난과
    position?: string;
    email?: string;
    roles?: Array<'USER' | 'MANAGER' | 'ADMIN'>;  // USER·MANAGER만 반영
  };
  expiresAt?: string;      // T3Q 세션 만료 시각
}
// 실패: 401 { error: { code: 'INVALID_TOKEN', message } }
```

### T3Q에 요청하는 조건
| 항목 | 요청 |
|---|---|
| 토큰 | 1회용, 유효시간 5분 이내, 확인 후 즉시 폐기 |
| 기관 | 행정표준기관코드(`orgCode`)로 전달 |
| 사용자 ID | 같은 사람은 항상 같은 `userId` |
| 권한 | `USER`(일반) / `MANAGER`(기관관리)만 반영. 전체관리는 우리 쪽에서만 부여 |

> 우리 쪽 구현은 완료되어 있습니다 (`src/app/sso/t3q/route.ts`). `T3Q_MODE=live` 와 T3Q 주소·서비스 토큰만 설정하면 동작합니다. 기존 아이디/비밀번호 로그인은 운영자용으로 유지합니다.

## 5. 기존 `__compn__` 계약 호환 규격

### 5.1 기존 계약 (UNE SOP 자동생성 모듈, 변경 불가 필드)
```ts
export interface LLMEndCompnData {     // 화살표(엣지)
  CompnSn: number;                     // 도착 컴포넌트 SN
  ArrwCn: string | null;               // 화살표 라벨(분기값)
  BeginArrwDrc: string;                // 시작 핸들
  EndArrwDrc: string;                  // 도착 핸들
}
export interface LLMAttrbSaveParams {  // 하위 임무
  AttrbSn: number;
  AttrbSj?: string;                    // 제목
  AttrbCn?: string;                    // 내용
  AttrbRm?: string;                    // 비고
  DffTyCode: string;                   // '000000'=일반 임무, 그 외=상황전파 임무
  ReceiveOrgnztSns?: number[];
  ReceiveUserSns?: number[];
}
export interface LLMCompnData {        // 컴포넌트(노드)
  CompnSn: number;
  EndCompns: LLMEndCompnData[] | null;
  CompnGroupSn: number | null;
  CompnTyCode: string;                 // 6자리 유형 코드
  CompnSj: string;                     // 제목
  CompnCrdnt: { X: number; Y: number };
  Width: number;
  Hg: number;
  AtmcProgrsYn: 'Y' | 'N';
  CharstSort: string;
  FontSize: number;
  Color: string;
  CompnAttrbSaveParamsList: LLMAttrbSaveParams[];
  /** [신규·선택] 기존 모듈은 무시하는 확장 필드 — 담당기관·필요자원 보존용 */
  Ext?: CompnExt;
}
export interface CompnExt {
  ActionCode?: string;                 // 내부 보관용(노드 화면 미표시)
  Phase?: string;
  Category?: 'RESPONSE' | 'DAMAGE';
  Orgs?: { Name: string; Role: 'LEAD' | 'SUPPORT' | 'COOPERATE' }[];
  Resources?: { Category: string; Name: string; Quantity?: number; Unit?: string }[];
  Channel?: 'SMS' | 'EMAIL';           // 노드 상황전파 기본 채널(미지정 시 SMS)
}
```

### 5.2 유형 코드 (CompnTyCode) — 확인 요청
| 노드 | 프론트 키 | 코드 | 상태 |
|---|---|---|---|
| 시작 | `start` | `TBD` | UNE 공통코드(104 그룹) 확인 필요 |
| 프로세스 | `process` | `TBD` | 확인 필요 |
| 상황전파 | `manual` | `TBD` | 확인 필요 |
| 상황판단 | `decision` | `104005` | 기존 코드에서 확인(분기 라벨 엣지) |
| 종료 | `end` | `TBD` | 확인 필요 |
| 자원 | `resource` | `TBD`(신규) | 신규 앱 정의 필요 |

> 신규 앱은 코드 값을 설정 상수(`COMPN_TYPE_CODE`)로 분리하여 확인 후 채운다. T3Q가 `compns`를 직접 생성하는 경우에도 이 표의 값을 사용해야 한다.

### 5.3 SopAction → compn 변환 규칙 (신규 앱 수행, T3Q 생성 시 동일 규칙 요청)
| SopAction | compn 필드 | 규칙 |
|---|---|---|
| (시작) | `CompnSn=1`, `CompnTyCode=start` | 플로우 맨 앞에 1개 |
| 선택 순서 i | `CompnSn = i + 2` | 사용자가 정한 순서 |
| `actionName` | `CompnSj` | |
| - | `CompnTyCode` | `process` (자동 구성은 프로세스 노드만, 판단·분기 자동 생성 안 함) |
| 순서 | `CompnCrdnt` | `X=originX`, `Y=originY + gapY*(i+1)` |
| - | `Width/Hg` | layout.width / layout.height (기본 240×80) |
| 다음 노드 | `EndCompns` | `[{CompnSn: 다음 SN, ArrwCn: null, BeginArrwDrc: <하단 핸들>, EndArrwDrc: <상단 핸들>}]` — 핸들 id 확인 필요 |
| `detailTasks[]` | `CompnAttrbSaveParamsList` | `DffTyCode='000000'`, `AttrbSj=title`, `AttrbCn=content`, `AttrbRm=note` |
| `propagation[]` | `CompnAttrbSaveParamsList` | `DffTyCode=<상황전파 유형코드, TBD>`, `AttrbSj='상황전파: '+target`, `AttrbCn=messageTemplate`, `AttrbRm=channelHint`; `ReceiveOrgnztSns/UserSns`는 비움(사용자 확정) |
| `organizations[]`, `resources[]` | `Ext.Orgs`, `Ext.Resources` | 기존 모듈 비파괴 확장 |
| `sources`, `actionCode` | (노드에 넣지 않음) | 별도 보관(`Ext.ActionCode`는 내부 추적용) |
| - | `AtmcProgrsYn='N'`, `CompnGroupSn=null`, `CharstSort=''`, `FontSize=0`, `Color=''` | 기본값 |
| (종료) | 마지막 `CompnTyCode=end` | 마지막 조치 → 종료 연결 |

변환 결과 예(`compns[1]`, 조치 HR-R-001):
```json
{
  "CompnSn": 2,
  "EndCompns": [{ "CompnSn": 3, "ArrwCn": null, "BeginArrwDrc": "bottom", "EndArrwDrc": "top" }],
  "CompnGroupSn": null,
  "CompnTyCode": "<PROCESS>",
  "CompnSj": "재난안전대책본부 비상 2단계 가동 및 상황 전파",
  "CompnCrdnt": { "X": 0, "Y": 160 },
  "Width": 240,
  "Hg": 80,
  "AtmcProgrsYn": "N",
  "CharstSort": "",
  "FontSize": 0,
  "Color": "",
  "CompnAttrbSaveParamsList": [
    { "AttrbSn": 1, "AttrbSj": "비상근무 인원 소집", "AttrbCn": "비상 2단계 근무명령에 따라 협업부서 인원을 소집한다.", "AttrbRm": "", "DffTyCode": "000000" },
    { "AttrbSn": 2, "AttrbSj": "기상상황 모니터링", "AttrbCn": "강우량·하천수위를 1시간 단위로 확인하여 상황판에 게시한다.", "AttrbRm": "특보 해제 시까지", "DffTyCode": "000000" },
    { "AttrbSn": 3, "AttrbSj": "상황전파: 16개 구·군 재난안전과", "AttrbCn": "[부산시] 호우경보 발효(7.16. 14:00). 비상 2단계 근무 돌입, 취약지역 예찰 강화 바랍니다.", "AttrbRm": "SMS", "DffTyCode": "<SPREAD>", "ReceiveOrgnztSns": [], "ReceiveUserSns": [] }
  ],
  "Ext": {
    "ActionCode": "HR-R-001",
    "Phase": "RESPONSE",
    "Category": "RESPONSE",
    "Orgs": [
      { "Name": "시민안전실 자연재난과", "Role": "LEAD" },
      { "Name": "16개 구·군 재난안전과", "Role": "SUPPORT" },
      { "Name": "부산지방기상청", "Role": "COOPERATE" }
    ],
    "Resources": [{ "Category": "인력", "Name": "비상근무 인원", "Quantity": 20, "Unit": "명" }],
    "Channel": "SMS"
  }
}
```
(`"bottom"`/`"top"` 핸들 id와 `<PROCESS>`/`<SPREAD>` 코드는 §5.2 확인 후 확정.)

### 5.4 SSE 스트리밍 시 이벤트 순서 (선택)
```
data: {"__status__":"searching"}
data: {"__status__":"generating"}
data: {"__action__": SopAction}          ← 조치 1건씩
data: {"__compn__": LLMCompnData}         ← includeCompns=true일 때, 기존 모듈과 동일 키
...
data: {"__done__": {"count": 2}}
data: {"__status__":"end"}
data: [DONE]
```
기존 UNE 프론트 변환 함수(`toLLMCompn → toNode/toEdges`)를 그대로 재사용할 수 있도록 `__compn__`의 키·대소문자(PascalCase)·타입을 §5.1과 동일하게 유지한다.

---

## 6. 연계 상태 확인 (요구사항: 연계 상태 확인 API)
`GET /t3q/v1/health` → `{ "status": "UP" | "DEGRADED" | "DOWN", "services": { "weather": "UP", "sop": "UP" }, "checkedAt": "..." }`
신규 앱 설정 화면(T3Q 연계)에서 주기 조회, 장애 시 모의 응답/수동 입력 경로로 전환한다.

## 7. 오류 코드
| HTTP | code | 의미 | 신규 앱 처리 |
|---|---|---|---|
| 401 | `INVALID_TOKEN` | (API-03) 링크 토큰 만료·재사용 | 로그인 화면에 재접속 안내 |
| 400 | `INVALID_REQUEST` | 필수값 누락·형식 오류 | 입력 확인 안내 |
| 401 | `UNAUTHORIZED` | 토큰 없음·만료 | 토큰 재발급 후 1회 재시도 |
| 404 | `NO_DOCUMENT` | 재난유형·지역에 맞는 매뉴얼 없음 | 매뉴얼 조치 수동 선택 |
| 422 | `NO_ALERT_CONTEXT` | 요약할 특보·Context 부족 | 공식 특보만 표시 |
| 429 | `RATE_LIMITED` | 호출 한도 초과 | `Retry-After` 준수 |
| 500 | `INTERNAL_ERROR` | T3Q 내부 오류 | 모의/대체 경로 전환 + 사용자 알림 |
| 503 | `MODEL_UNAVAILABLE` | 상류 모델 부재 | 대체 경로 전환 |
| 504 | `TIMEOUT` | 처리 시간 초과 | 대체 경로 전환 |

오류 본문은 §2.4 `T3QError` 형식, SSE 중 오류는 `{"__error__":"<code>: <message>"}` 후 `{"__status__":"end"}`, `[DONE]`.

## 8. 비기능 요청
| 항목 | 요청 값 |
|---|---|
| 응답시간(동기) | API-01 ≤ 10초, API-02 ≤ 30초 (첫 SSE 이벤트 ≤ 5초) |
| 출력 제한 | 출처 `excerpt` 200자 이내. 외부 노출 화면에는 출처 문서 본문 미표시 |
| 재현성 | 동일 요청·동일 문서 버전 → 동일 `actionCode` 집합(코드 안정성) |
| 버전 관리 | 경로 버전(`/v1`), 필드 추가는 하위호환, 삭제·의미 변경은 사전 통보 |
| 모의 응답 | T3Q 측 `?mock=true` 또는 신규 앱 자체 모의(`T3Q_MODE=mock`) — 응답 스키마 동일 |

## 9. T3Q 측 확인 요청 사항
1. 재난유형·대응단계 코드 체계(예방/대비/대응/복구 vs 지자체 비상단계) 및 `actionCode` 부여 규칙
2. 지역 코드 기준(법정동 10자리 / 행정동) 및 특보구역 코드 수용 여부
3. 매뉴얼 문서 ID(`docId`) 체계 — 문서 조회 API와의 연결
4. SSE 지원 여부 및 `__status__:"end"` 송신 가능 여부
5. 인증 방식(서비스 계정 Bearer 토큰) 및 토큰 유효기간
6. `compns` 직접 생성(includeCompns) 지원 여부 — 미지원 시 신규 앱이 §5.3 규칙으로 변환
7. (API-03) 링크 토큰 발급 방식·유효시간, 사용자 정보 항목, 기관코드 제공 가능 여부

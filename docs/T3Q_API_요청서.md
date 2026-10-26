# T3Q 연계 API 요청서

> **2026-10-26 수정본**: 추가 요청 REQ-6~8 반영(운영 적용). 구조·필드는 그대로, 서버 동작·설명만 갱신 — 정본 `(261026)MOIS_API-SOP_v2_openapi.json`.
> - **REQ-6 주관(LEAD) 자동 채움**: 주관이 없던 조치는 서버가 부서 칸의 부서명으로 `organizations`를 채운다(요청 `department`와 일치하면 LEAD, 나머지 SUPPORT, 일치 부서 없으면 칸의 부서 모두 LEAD; 역할 라벨 제외, 칸에 부서명 없으면 행 라벨 조직 사용). 적재 매뉴얼 전체에서 주관이 비는 조치 없음 → 앱(`convert.ts`)의 주관 보완은 예외 안전망으로만 남김.
> - **REQ-7 `manual.departments` 정리**: 역할 머리글(「주관부서」 등)·잘린 값 제외, 실제 부서명만.
> - **REQ-8 `phaseLabel` 단일화**: 원문 단계명 하나(표준 단계명을 덧붙이지 않음).
>
> **2026-10-21 수정본**: 우리 보완 요청 REQ-1~5 반영 — 매뉴얼 12종 적재, 중앙은 표준 → 실무 순, 풍수해 표준의 대설 편 분리, 지자체 칸 소제목 임무 분할, 매뉴얼 이름 정상화, 응답 `manual.manualKind`(표준·실무·현장조치·기타) 추가. 회신·명세: `etc/T3Q_API/6. …(수정본)_1021/`.
>
> **2026-10-19 API-02 납품 (T3Q API-SOP v2)** — 이후 API-02의 정본은 T3Q 납품 OpenAPI(`etc/T3Q_API/3. …/(261019)MOIS_API-SOP_v2_openapi.json`, 우리 쪽 사본 `public/api-docs/t3q.yaml`)이다. 아래 4장(API-02)은 요청 당시 배경 설명으로 남긴다. API-03은 아직 미제공 — 요청안 그대로. API-04 연락망은 철회.
>
> | 항목 | 요청안 (이 문서 4장) | 납품본 (v2, 현재 연계 기준) |
> |---|---|---|
> | 주소 | `{T3Q_BASE_URL}/t3q/v1/sop/actions` | `https://plf.mois-disaster.t3q.ai/model-api/4920a/reports/sop/actions` (`GET /health`, `GET /documents/{id}/download`) |
> | 인증 | Bearer 토큰 | 없음(예약). `X-Request-ID` 선택 |
> | 요청 | `context`(재난유형·지역은 객체) + `filter` | `context`만. `disasterType`은 라벨 10종 문자열, `responsibleRegion`은 이름(또는 기관명), `affectedRegions`는 이름 배열. 위기경보·대응단계는 한글·코드 모두 |
> | 응답 최상위 | `meta`, `disasterType`, `manual`(안에 `departmentMatched`) … | `manual`, `departmentMatched`, `warnings`, `missions`, `actions` (`meta` 없음) |
> | 조치 | `category: RESPONSE\|DAMAGE`, 빈 값은 생략 | `category: NORMAL\|DAMAGE`, `condition`·`summary`는 `""`, `notes`는 `[]`, 전파 `targetType`·`channelHint`는 null 가능, 자원 `{name, quantity\|null, unit}`, 근거 `{docId, docTitle, page, pdfIndex}` |
> | 단계명 | `1단계 징후감지` 형식 | 매뉴얼 원문 그대로 — 중앙 실무매뉴얼은 `심각 단계`, `경계`, `주의` 등 |
> | 오류 | `{error:{code,message,detail}, meta}` | `{error:{code,message,retryable,retryAfter,requestId}}` — 422 입력 오류, 404 맞는 매뉴얼 없음 |
> | 인증서 | — | **사설 인증기관(`*.t3q.ai`) 발급 — 일반 클라이언트(Node·브라우저)에서 검증 실패(2026-10-20 확인).** 우리 쪽은 지문 고정으로 임시 연결, 원문 PDF는 우리 서버가 중계. T3Q에 공인 인증서(또는 루트 인증서 파일) 요청 필요 |

> **최종 규격(정본)은 Swagger 문서입니다:** https://unereport4.vercel.app/api-docs (① T3Q 연계 API 요청서)
> 원본 파일 `public/api-docs/t3q.yaml` · 코드 계약 `src/lib/t3q/types.ts` — 이 문서는 배경 설명용입니다.
>
> v2.0 반영 사항: **약 80개 매뉴얼(표준·실무·현장조치 행동) 검증** 결과로 일반 규칙 R20~R24와 **R25 예외 원칙**(정할 수 없으면 만들지 않고 `warnings`로 알림) 추가. **API-04 매뉴얼 연락망** 신설(연락망 규칙 C1~C10, 성명·휴대전화 포함). `OrgRef.phones` 추가.
> v1.9 반영 사항: **담당부서** `SituationContext.department` 추가 — 재난대응 프로세스 표의 부서 칸 중 **요청 부서의 행만** 추출(규칙 R19, 기본 「자연재난과」 → 초기대응부서). 응답 `manual.departments`·`departmentMatched` 추가.
> v1.8 반영 사항: **매뉴얼 고르기 규칙**(재난유형 → 발생 시군구 → 시도 → 중앙) 명시, `alertLevel`을 선택 항목으로(위기경보로 단계를 나눈 매뉴얼에서만 사용), 응답 `manual`(고른 매뉴얼) 추가, 규칙 R18(제목 일부의 조건은 `condition` 아님) 추가 — 앱은 `condition` 조치를 「필요시 임무」로 따로 배치.
> v1.7 반영 사항: 추출 규칙 R10~R17 추가(다른 매뉴얼 4종 검증), `SopMission.functionCode/functionName`, `SopAction.linkedActionCodes` 추가.
> v1.6 반영 사항: **API-01 기상요약 폐지** (기상청 기상정보 원문 사용). SOP 응답에 `condition`·`notes`·`SopMission.responseStep`·`PropagationTarget.method` 추가, [매뉴얼 ↔ JSON 대응 설명서](https://unereport4.vercel.app/api-docs/mapping.html) 추가.
> v1.3 반영 사항: `SituationContext.responseStep`(대응단계: 징후감지·초기대응·비상대응·수습복구) 추가 — API-02는 이 단계의 조치만 반환, `SopAction.responseStep` 추가.
> v1.0 반영 사항: `SituationContext.period`(대응 기간) 추가, API-01 요청에 `weatherInfoText`(기상청 기상정보 본문) 추가, `WeatherAlert.level`에 `PRELIMINARY`(예비특보) 추가.

| 항목 | 내용 |
|---|---|
| 문서명 | 대화형 AI 재난관리 — T3Q 연계 API 요청서 |
| 대상 API | ② 상황 기반 SOP(조치) 콘텐츠 생성 ③ 사용자 인증(링크 로그인) — ① 기상요약은 v1.6에서 폐지 |
| 요청 측 | 대화형 AI 재난관리 신규 앱(Next.js) 개발팀 |
| 버전 | v0.1 (초안) · 2026-10-04 |
| 근거 | 요구사항정의서(CADM_PM_1110_01 V0.2) — AI 기상요약 조회, T3Q 조치추천 API 연계, 기본 SOP 자동 구성, 연계 상태 확인, 모의/실제 응답 전환 |
| 호환 기준 | UNE SOP 자동생성 모듈의 컴포넌트(`__compn__`) 계약 — 유형 코드·필드명 유지 |

---

## 1. 개요

### 1.1 목적
신규 앱은 상황(지자체·재난유형·위기경보 수준 등)을 Context로 T3Q에 다음을 요청한다. (기상특보는 기상청 공식 API 원문을 그대로 쓰며 T3Q에 요약을 요청하지 않는다.)

1. **API-02 SOP 콘텐츠**: 지역·상황·재난유형(및 선택 문서)을 전달하면, T3Q가 매뉴얼 기반의 **임무 → 조치(절차) → 세부행동**, 대응·피해 조치 구분, 담당·지원·협업기관, 전파대상, 필요자원을 **조치 목록 + 상세를 1회 응답**으로 반환한다. 신규 앱은 이를 기존 UNE SOP 컴포넌트(`__compn__`)로 변환하여 플로우를 구성한다.

### 1.2 범위 원칙 (요구사항 반영)
| 구분 | T3Q 제공 | T3Q 미제공(신규 앱 담당) |
|---|---|---|
| 기상 | - (기상청 원문 사용) | 특보 조회·표시, 기상특보 보고 작성 |
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

/** 위기경보 수준 (보고용 사실 정보) */
export type AlertLevel = 'INTEREST' | 'CAUTION' | 'ALERT' | 'SERIOUS'; // 관심|주의|경계|심각

/** 대응단계 — SOP 구성 기준 (매뉴얼 재난대응 프로세스 4단계)
 *  SIGN_DETECTION 1단계 징후감지(★관심·주의) · INITIAL_RESPONSE 2단계 초기대응(★주의)
 *  EMERGENCY_RESPONSE 3단계 비상대응(★경계·심각) · RECOVERY 4단계 수습·복구(★경계·심각)
 *  API-02 는 요청한 대응단계의 조치만 돌려준다. */
export type ResponseStep = 'SIGN_DETECTION' | 'INITIAL_RESPONSE' | 'EMERGENCY_RESPONSE' | 'RECOVERY';

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

/** 상황 Context — API-02 */
export interface SituationContext {
  situationId: string;               // 신규 앱 상황 ID
  workType: WorkType;
  responsibleRegion: Region;         // 대응 지자체
  affectedRegions?: Region[];        // 발생·영향지역(복수)
  disasterType: DisasterType;
  alertLevel?: AlertLevel;           // (선택 v1.8) 위기경보로 단계를 나눈 매뉴얼에서만 단계 선택에 사용
  responseStep: ResponseStep;        // 대응단계 (사용자 선택)
  department?: string;               // (v1.9) 담당부서 원문 — 이 부서의 행만 추출 (R19). 예: '자연재난과'
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

## 3. (폐지) API-01 기상요약

v1.6에서 폐지했습니다. 기상청 「기상정보」가 이미 (현황)·(전망) 문장으로 제공되어, 기상특보 보고와 상황일지에 원문을 그대로 씁니다. AI가 공식 원문을 다시 쓰면 공문서 출처가 흐려지는 문제도 있습니다. 번호는 혼선을 막기 위해 유지합니다.

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

### 4.2-1 매뉴얼 고르기 (v1.8)

상황정보는 상황일지의 기본 정보이면서, T3Q가 벡터DB에서 **맞는 매뉴얼 1종을 고르는 열쇠**입니다.

| 순서 | 쓰는 항목 | 규칙 |
|---|---|---|
| 1 | `disasterType` | 재난유형이 같은 매뉴얼만 |
| 2 | `affectedRegions` → `responsibleRegion` | 발생 시군구 매뉴얼(예: 영천시) → 없으면 시도 매뉴얼(경상북도) → 없으면 중앙부처 매뉴얼. 발생 시군구가 여럿이면 시도 매뉴얼 |
| 3 | 문서 버전 | 같은 기관 매뉴얼이 여러 판이면 최신판 |
| 4 | `responseStep` | 고른 매뉴얼에서 그 대응단계의 조치만 |
| 5 | `alertLevel` (선택) | 매뉴얼 단계가 위기경보(관심·주의·경계·심각)로 나뉜 경우에만 사용 |
| 6 | `department` (v1.9) | 요청 부서의 행만 (R19). 매뉴얼에 없는 부서면 초기대응(총괄) 행 + `departmentMatched: false` |

- **부서 칸 (v1.9)**: 부산 풍수해 매뉴얼의 재난대응 프로세스 표는 왼쪽 부서 칸으로 행이 나뉩니다 — p.34 초기대응부서(재난상황실·자연재난과), p.35~37 협업부서(복지정책과·도로안전과 등 약 20개 과), p.38 유관기관(기상청·경찰·소방·53사단·한전 등). 상황정보의 담당부서(기본 「자연재난과」)가 든 행 묶음만 돌려주세요.

- **위기경보를 선택으로 둔 근거**: 부산·영천 현장조치 행동매뉴얼은 표의 열이 대응단계(징후감지·초기대응·비상대응·수습복구)이고, 위기경보 단계 표기는 2~3회뿐입니다. 반면 기후부 풍수해·환경부 산불 실무매뉴얼은 조치가 「관심/주의/경계/심각 단계」로 나뉘어 있고(기후부 p.57·61·66·73), 대응단계와 위기경보가 1:1이 아니어서(징후감지 = 관심·주의) 이 형식에서는 위기경보가 있어야 단계를 가릴 수 있습니다.
- `currentSituation`·`title`은 참고용, `workType`은 매뉴얼 선택과 무관합니다.
- 고른 매뉴얼은 응답 `manual`로 돌려주세요. 화면에 「○○ 기준」으로 표시합니다. 맞는 매뉴얼이 없으면 `NO_DOCUMENT`.

### 4.3 응답

> **매뉴얼 ↔ JSON 대응 설명서**: [/api-docs/mapping.html](https://unereport4.vercel.app/api-docs/mapping.html)
> 매뉴얼 캡처에 번호 상자로 어느 칸이 어느 필드인지 표시하고, 추출 규칙(SOP R1~R25, 연락망 C1~C10)과 **우리 화면에 어떻게 적용되는지**를 정리했습니다.
> 부산 풍수해 매뉴얼은 예시이며, 다른 재난유형·지자체 매뉴얼에도 같은 규칙을 적용해 주세요.

**추출 규칙 요약**

| 규칙 | 매뉴얼 표기 | JSON |
|---|---|---|
| R1 | `[n] 제목` | `missions[]` 임무 (missionCode = n) |
| R2 | `[n-m] 제목` | `actions[]` 조치 1건 (actionCode = n-m, missionCode = n) |
| R3 | `- 내용` | 바로 위 조치의 `detailTasks[]` |
| R4 | `※ 내용` | 바로 위 조치의 `notes[]` |
| R5 | 기호 없이 이어지는 줄 | 앞 줄에 이어 붙임 (줄바꿈 복원) |
| R6 | `[3-3][3-4] 제목` 한 줄 | 조치 1건, actionCode = `3-3,3-4` |
| R7 | 상위 `[n]` 없이 `[n-m]`만 있음 | 임무를 만들고 이름은 행동카드 조치목록 |
| R8 | 조치 전체에 붙은 `(필요시)`, `(피해발생시)`, `＊○○시` | `condition` (제목에서 떼어 냄) → 앱은 「필요시 임무」로 따로 배치 |
| R9 | `-` 줄이 없는 조치 | 행동카드 표준행동을 `detailTasks`로 |
| R10 | 원문자 코드 `①-1-1` | 숫자로 `1-1-1` (①=협업기능 → `functionCode`, ①-1=임무, ①-1-1=조치) |
| R11 | 같은 코드가 여러 단계에 나옴 | 단계별로 따로, 요청한 단계 것만 응답 |
| R12 | 「○○단계 참고」 한 줄 | 참고 단계의 같은 코드에서 `detailTasks` 상속, `notes`에 표시 |
| R13 | 세부행동 기호가 문서마다 다름 | 조치 바로 아래 첫 깊이 = `detailTasks[].title`, 그 아래 = `content` |
| R14 | 쪽이 넘어가며 코드 없이 시작 | 앞 쪽 마지막 조치에 이어 붙임 |
| R15 | 하위 항목이 「시기/전파기관:」 같은 속성 | 부모 1건, 전파기관 → `propagation`, 협조기관 → `organizations` |
| R16 | 중앙부처·공사 등 기관 매뉴얼 | 지자체가 실행하는 조치만 (없으면 `actions: []`) |
| R17 | 실명·전화번호 | 보내지 않음 (기관·직위만) |
| R18 | 제목 **일부**에만 붙은 조건 `교통통제 및 (필요시) 교통통제소 운영` | 제목 그대로, `condition` 비움 (조치 자체는 꼭 할 일) |
| R19 | 재난대응 프로세스 표의 **부서 칸** (초기대응부서 / 협업부서 / 유관기관) | 요청 `department`가 든 행 묶음만. 협업기능형(영천)은 주관부서가 그 부서인 조치만. 띄어쓰기 무시, 상위 조직이 붙어도 같은 부서. 없으면 초기대응 행 + `departmentMatched: false` |
| R20 | (공통 전처리) 세로쓰기·줄바꿈으로 끊긴 글자, 띄어쓰기 빠진 PDF, 가운뎃점 6종(· ․ ‧ ㆍ ･ ・), 쪽 머리글·쪽번호 | 이어 붙이고 띄어쓰기 무시로 비교, 가운뎃점 통일, 머리글 지움. 같은 문서 중복은 하나만, 한 파일에 매뉴얼이 여럿이면 나눔 |
| R21 | 코드 오타·반복 (`[45--2]`, `[[7]`, 목차·개요·사례에 같은 `[n-m]` 반복), 번호 없는 `[징후접수 및 파악]` | 오타 바로잡기. 반복 코드는 「주관부서」 등 카드 머리가 뒤따르는 **첫 등장만** 조치. 번호 없는 대괄호 소제목도 임무(R7 확장) |
| R22 | 단계 표기가 프로세스 표와 카드에 다름, 비표준 단계명(「비상저감 1~3단계」), 「(계속)」·●○ 표 | 행동카드 머리의 단계 표기가 우선. 비표준 단계명은 **열 위치**로 4단계에. 「(계속)」·○는 앞 조치가 이어지는 것(새 조치 아님) |
| R23 | `[필요시]`만 있는 줄, 카드 안 ①②③ 조건 목록 | 그 아래 항목들의 `condition`. 조건 목록의 원문자는 협업기능 번호(R10)가 아님 |
| R24 | 실무·표준·기관 매뉴얼의 경보단계별 「기관별 임무·역할」 표, 3열 조치목록(조치사항/세부내용/비고) | **지자체 별칭 행만** 조치로(지자체·지방자치단체(소방관서 포함)·시도 및 시군구·지자체(지대본)·비고 「(지자체)」), 단계 = 경보단계. `(가)`=임무, `(가-1)`=조치. 오인 제외: 위기유형별 주관기관 표, 시·도교육청, 시·도 119, 부처 내부 대응 프로세스·협업기능 표, 「주요 조치내용(주관기관)」 |
| R25 | **예외 원칙** — 위 규칙으로 정할 수 없는 곳 | 만들지 않습니다. 원문을 그대로 두고 `warnings[]`에 이유·쪽(지자체 조치 없음, 단계·코드 판단 불가, 그림 쪽, 표 짝 안 맞음). **문서 하나에 맞춘 규칙은 추가하지 않고**, 여러 문서 유형에 반복될 때만 규칙을 늘립니다 |

검증한 매뉴얼: 영천 풍수해(흐름표 142건 = 행동카드 142장, 잘 맞음) · 기후부 풍수해 실무 · 환경부 산불 실무 · 인천항만공사 해양선박사고.

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
  method?: string;                     // 구분·전파방법 원문 (예: 'UMS — 휴대전화 문자메시지(SMS) 발송')
  channelHint?: 'SMS' | 'EMAIL' | 'BROADCAST' | 'PHONE';
  messageTemplate?: string;            // 매뉴얼 「표준문안」 원문. 없으면 비움(만들지 않음)
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
  missionCode: string;                 // 소속 임무 [n]
  condition?: string;                  // 수행 조건 (필요시 …) — 원문 그대로
  notes?: string[];                    // 비고 (※·* 줄, 「관심단계 참고」)
  linkedActionCodes?: string[];        // 행동카드 연계코드
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
  missionName: string;                 // 예: '기상특보 전파', '주민대피'
  responseStep?: ResponseStepCode;     // 임무가 속한 대응단계
  functionCode?: string;               // 협업기능 번호 (행안부 표준 ①~⑬ → '1'~'13')
  functionName?: string;               // 예: '재난상황관리'
  leadOrg?: string;
  actionCodes: string[];
}

export interface ManualRef {           // (v1.8) T3Q가 고른 매뉴얼
  docId: string;
  docTitle: string;                    // 예: '영천시 풍수해 현장조치 행동매뉴얼'
  scope: 'SIGUNGU' | 'SIDO' | 'CENTRAL';
  region?: Region;
  version?: string;                    // 판·기준일
  stepBasis: 'RESPONSE_STEP' | 'ALERT_LEVEL'; // 단계를 무엇으로 골랐는지
  departments?: string[];              // (v1.9) 실제로 고른 부서 칸·주관부서
  departmentMatched?: boolean;         // (v1.9) 요청 부서가 매뉴얼에 있었는지
}

export interface SopActionsResponse {
  meta: T3QMeta;
  disasterType: DisasterType;
  manual?: ManualRef;                  // (v1.8) 꼭 채워 주세요
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
          "messageTemplate": "○월 ○일 ○시 (태풍, 호우) (예비특보, 주의보, 경보)가 발효됨에 따라, 시설물, 어선·선박 관리 등 안전사고가 없도록 주의하시기 바랍니다." }
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

## 4-2. API-04 매뉴얼 연락망 (v2.0) — 철회 (2026-10-20)

> 연락망은 T3Q 연계 없이 엑셀·직접 입력으로만 만들기로 해 이 API는 요청하지 않는다. 아래는 기록으로 남긴다.

| 메서드·경로 | 설명 |
|---|---|
| `POST /t3q/v1/contacts` | 기관 지역(시도·시군구)의 매뉴얼에서 비상연락망을 뽑아 반환 |

- **왜**: 지자체 현장조치 행동매뉴얼에는 「기관명·관련 부서·전화·비고(FAX)」 비상연락망 표가 있고, 문서마다 유관기관이 10~12종입니다. 상황전파에서 가장 중요한 대상이 유관기관이라, 연락망을 처음 채울 때 매뉴얼에서 가져옵니다.
- **매뉴얼 고르기**: API-02와 같은 규칙. 재난유형이 없으면 그 지역 매뉴얼 전체에서 기관·부서 단위로 합치고, 같은 기관·부서는 기준일이 가장 최근인 것 하나만.
- **개인정보**: 내부 연락망이므로 **성명·직위·휴대전화도 문서에 있으면 그대로** 주세요. (SOP 응답 API-02의 R17 — 조치에는 기관·직위만 — 은 그대로입니다.)
- 우리 앱은 받은 목록을 바로 넣지 않고, 연락망 화면 「매뉴얼에서 가져오기」에서 분류별로 미리 보여 주고 사용자가 고른 줄만 추가·수정합니다(지우지 않음).

```ts
export type ContactCategory = 'AGENCY' | 'INTERNAL' | 'HIGHER' | 'LOCAL_GOV'; // 유관기관 | 자기 기관 부서 | 상급 보고처 | 시·도·시군구

export interface ContactsRequest {
  region: Region;                      // 기관 지역 (시도 또는 시군구)
  affectedRegions?: Region[];
  disasterType?: DisasterType;         // 없으면 그 지역의 모든 매뉴얼
  documents?: { docId: string }[];
}

export interface ContactEntry {
  category: ContactCategory;
  org: string;                         // 기관명 (예: 부산경찰청)
  dept?: string;                       // 부서 (예: 경비교통과)
  title?: string;
  name?: string;                       // 문서에 있으면 그대로
  phones: string[];                    // 사무실·대표 (지역번호 붙여서)
  mobile?: string;                     // 휴대전화 (문서에 있으면)
  fax?: string[];
  night?: string[];                    // 야간·당직
  email?: string;
  note?: string;
  asOf?: string;                       // 표 기준일 원문 (예: '2026. 2월 기준')
  source: SourceRef;                   // 문서·쪽
}

export interface ContactsResponse {
  meta: T3QMeta;
  manuals: ManualRef[];
  entries: ContactEntry[];
  warnings?: ExtractionWarning[];      // 그림 쪽, 표 짝 안 맞음 등 (R25)
}
```

**연락망 추출 규칙 C1~C10**

| 규칙 | 내용 |
|---|---|
| C1 찾기 | 「비상연락망·유관기관 연락처·연락처·작성기관」 제목 + (기관\|부서\|연락처) 열 머리 + 쪽마다 일반전화 6개 이상 |
| C2 열 머리 | 기관(명)·주관기관·관련부서·부서·직위·성명·연락처·전화·휴대(H.P·CP)·팩스·비고를 같은 뜻끼리 맞춤. 성명·직위·휴대전화도 그대로 |
| C3 번호 나누기 | (전)·(팩)·[Fax]·(사)·야)·당직·(CP)·010 → phones·fax·night·mobile |
| C4 번호 정리 | 짧은 번호(「239-3119」)에 기관 지역번호 보충, 「~5」·「, 7288」 범위는 원문, 오타(「0010-」) 거름 |
| C5 칸 짝짓기 | 흩어진 칸(부서 n개 다음 번호 n개)은 순서대로 짝짓고 행마다 번호 개수로 확인. 안 맞으면 기관명만 + warnings |
| C6 이름 정리 | 세로쓰기·줄바꿈으로 잘린 기관명 이음, 「중부/온산소방서」는 두 기관 |
| C7 분류 | AGENCY(소방·경찰·기상·군·한전·가스·통신·적십자·교육청·수자원·해경·산림청 등) / INTERNAL / HIGHER(중앙부처 상황실·당직실) / LOCAL_GOV(시·도·시군구) |
| C8 카드 안 연락처 | 행동카드 협업기관 칸·「기관(☎ …)」은 API-02 `OrgRef.phones`에도 넣음(조치별 전파 대상 추천) |
| C9 연락망 아닌 표 | 학교 주소록, 병원·응급실, 구급차 현황은 넣지 않음 |
| C10 기준일·출처 | 표마다 asOf와 source.page. 그림 쪽은 IMAGE_PAGE 경고 |

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
| 404 | `NO_DOCUMENT` | 재난유형·지역에 맞는 매뉴얼 없음 | 호출 실패 안내, 임무는 「SOP 편집 → 임무 추가」로 직접 입력 |
| 422 | `NO_ALERT_CONTEXT` | 요약할 특보·Context 부족 | 공식 특보만 표시 |
| 429 | `RATE_LIMITED` | 호출 한도 초과 | `Retry-After` 준수 |
| 500 | `INTERNAL_ERROR` | T3Q 내부 오류 | 호출 실패 안내(시드로 대체하지 않음), 다시 시도 |
| 503 | `MODEL_UNAVAILABLE` | 상류 모델 부재 | 호출 실패 안내, 다시 시도 |
| 504 | `TIMEOUT` | 처리 시간 초과 | 호출 실패 안내, 다시 시도 |

오류 본문은 §2.4 `T3QError` 형식, SSE 중 오류는 `{"__error__":"<code>: <message>"}` 후 `{"__status__":"end"}`, `[DONE]`.

## 8. 비기능 요청
| 항목 | 요청 값 |
|---|---|
| 응답시간(동기) | API-02 ≤ 30초 (첫 SSE 이벤트 ≤ 5초) |
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
8. (v1.8) 벡터DB 매뉴얼에 재난유형·기관(시도/시군구)·판(기준일) 메타데이터가 있는지 — 4.2-1 매뉴얼 고르기 규칙의 전제
9. (v1.9) 재난대응 프로세스 표의 부서 칸(행 묶음)을 조치마다 보존해 적재하는지 — R19 부서별 추출의 전제
10. (v2.0) 매뉴얼의 비상연락망 표(그림 쪽 포함)를 표 구조 그대로 적재·추출할 수 있는지, 그림 쪽 OCR 지원 여부 — API-04의 전제

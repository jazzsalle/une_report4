# 재난상황일지 생성도구 (report4)

부산광역시(풍수해)·경상북도(산불) 자연재난 담당 공무원이 **기상특보 확인 → 상황 입력 → AI SOP 생성·실행 → 상황일지 자동 작성 → 한글 편집 → HWPX/DOCX/PDF·인쇄**까지 한 흐름으로 처리하는 도구입니다.
재난관리 단계 중 **대응·복구**를 담당하며, 예방·대비는 파트너 도구인 '재난안전계획서 생성도구'가 담당합니다.

## 화면 흐름

| 단계 | 화면 | 내용 |
|---|---|---|
| 상단 | 기상특보 바 | 기상청 특보(부산 159 / 대구·경북 143) 실시간 표시, 펼치면 예비특보·기상정보 |
| ① | 상황·기상 | 상황 제목·재난유형·위기경보·대상지역·기간·현재상황 입력, AI 기상 요약 |
| ② | SOP 실행 | 임무 목록 / 임무 상세(세부항목·상황전파·조치결과·피해조치) / 상황 기록·수행 이력 |
| ③ | 상황일지 | SOP 실행이력·상황 기록으로 자동 구성 → 목차·본문 수정 → 한글 편집(rhwp) → 내보내기 |
| 공통 | 문서함·연락망·휴지통(7일 보관)·계정관리 | |

## 기술 구성

- Next.js 16 (App Router) · React 19 · Tailwind CSS 4 · KRDS 토큰(Pretendard GOV)
- DB: Postgres + Drizzle ORM — 운영은 **Neon**(Vercel Marketplace), 로컬은 내장 **PGlite**(`.data/pglite`)
- 한글 편집: `@rhwp/editor` (rhwp-studio iframe)
- 문서 생성: `src/lib/export/hwpx.ts`(AI 행정문서 템플릿 기반), `docx.ts`
- 배포: Vercel (서울 리전 `icn1`), 휴지통 정리 크론 매일 03:00

## 로컬 실행

```bash
npm install
cp .env.example .env.local     # KMA_SERVICE_KEY, SESSION_SECRET 입력
npm run db:seed                # DB 생성 + 연락망 + 테스트 계정 → accounts/계정목록_로컬_*.csv
npm run dev                    # http://localhost:3000
```

## 운영 배포 (Vercel + Neon)

1. Vercel 프로젝트 → Storage → **Neon** 추가 (DATABASE_URL 자동 등록)
2. Vercel 환경변수: `KMA_SERVICE_KEY`, `SESSION_SECRET`, `CRON_SECRET`, `T3Q_MODE=mock`
3. 운영 DB 초기화 + 계정 발급 (로컬에서 1회)
   ```bash
   vercel env pull .env.production.local
   DATABASE_URL="<Neon 주소>" npm run db:seed    # accounts/계정목록_운영_*.csv 생성
   ```
4. `git push` → 자동 배포

## 계정·권한

| 권한 | 할 수 있는 일 |
|---|---|
| 전체관리(admin) | 모든 기관 문서·연락망·계정 관리 |
| 기관관리(manager) | 자기 기관 문서 편집, 연락망·계정 관리 |
| 일반(user) | 자기 기관 문서 열람, 본인 문서 작성·편집 |

테스트 계정 6개 목록: `docs/테스트계정.md` (시험 기간 공통 비밀번호, 로그인 화면 안내는 환경변수 `DEMO_LOGIN`). 계정관리 화면에서 추가·비밀번호 초기화 가능.

## T3Q 연계 교체

- 계약(정본): **API 문서 https://unereport4.vercel.app/api-docs** — ① T3Q 요청서 ② 내부 API ③ 기상청 (원본 `public/api-docs/*.yaml`, 설명 `docs/T3Q_API_요청서.md`)
- 코드: `src/lib/t3q/types.ts`(계약 타입) · `client.ts`(실제 호출) · `mock.ts`(매뉴얼 시드 응답)
- 전환: 환경변수 `T3Q_MODE=live`, `T3Q_BASE_URL`, `T3Q_TOKEN` 설정. 실패 시 자동으로 시드 응답 사용.

## 시드 데이터

- `src/data/busan-flood.json` — 부산시 풍수해 재난 현장조치 행동매뉴얼(26.7.6.) 행동카드 114건 (분석: `docs/부산_풍수해_매뉴얼_분석.md`)
- `src/data/gb-wildfire.ts` — 경북 산불 샘플 13건 (매뉴얼 확보 시 교체)
- `src/lib/db/seed-data.ts` — 재난안전대책본부 조직·비상연락망(가상 인명·번호)

## 폴더

```
src/app/(app)/        화면 (홈, new, s/[id], reports/[rid], docs, contacts, trash, admin, me)
src/app/actions/      서버 액션 (상황·SOP·상황일지·연락망·계정)
src/lib/              db, auth, t3q, weather(기상청), sop, report(자동 구성), export(HWPX/DOCX)
docs/                 T3Q API 요청서, 매뉴얼 분석, 제안서
```

@AGENTS.md

# 프로젝트 규칙 (report4 · 재난상황일지 생성도구)

- 사용자: 부산시·경북도 자연재난과 공무원. 화면은 단순·큼직하게. 작은 글씨의 부연설명·사족·내부 ID 표시 금지.
- 디자인: KRDS 토큰(`src/app/globals.css` @theme) + `src/components/ui.tsx` 컴포넌트만 사용. 본문 17px, 버튼·입력 높이 48px.
- 흐름은 3단계 탭(상황·기상 / SOP 실행 / 상황일지)을 유지한다. 단계를 늘리지 않는다.
- T3Q 연계는 `src/lib/t3q/client.ts` 한 곳에서만 호출. 계약 변경 시 `src/lib/t3q/types.ts` · `public/api-docs/t3q.yaml`(정본) · `docs/T3Q_API_요청서.md`를 함께 고친다.
- 서버 액션(`src/app/actions/*`)을 추가·변경하면 `public/api-docs/internal.yaml` 도 고친다. API 문서 주소: `/api-docs`
- HWPX: `src/lib/export/hwpx.ts` — charPr/paraPr 는 목록 끝에만 추가(한컴은 순서로 해석), mimetype 첫 항목·무압축.
- DB 스키마 변경: `src/lib/db/schema.ts` 수정 → `npm run db:generate` → 커밋. 로컬은 PGlite, 운영은 Neon.
- 시간은 모두 Asia/Seoul 로 표시(`src/lib/format.ts`).
- 비밀정보(.env*, accounts/, seed_docs/)는 커밋하지 않는다. 저장소는 공개 저장소다.
- 결정 배경·겪은 문제·재사용 부품은 `docs/개발_인계노트.md` 에 쌓는다. 새 결정이나 함정을 만나면 여기에 한 줄 추가한다.
- SOP 임무 목록(situations.sop)은 통째로 쓰지 않는다 — `src/lib/sop/store.ts` 의 부분 수정 함수만 사용(동시 실행 시 유실 방지).
- 서버 액션 요청 한도는 4MB(`next.config.ts`). 그림·파일을 서버 액션으로 보낼 때 이 안에 들어가는지 확인한다.

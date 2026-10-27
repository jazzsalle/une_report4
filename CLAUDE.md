@AGENTS.md

# 프로젝트 규칙 (report4 · 재난상황일지 생성도구)

- 사용자: 부산시·경북도 자연재난과 공무원. 화면은 단순·큼직하게. 작은 글씨의 부연설명·사족·내부 ID 표시 금지.
- 디자인: KRDS 토큰(`src/app/globals.css` @theme) + `src/components/ui.tsx` 컴포넌트만 사용. 본문 17px, 버튼·입력 높이 48px.
- 상황 화면은 2탭(SOP / 상황일지)이다. 상황 정보는 상황명 줄 「상황 정보」 창, 기상특보 보고는 상황일지 탭 왼쪽. 탭·단계를 늘리지 않는다.
- **운영 서비스에는 LLM이 T3Q API 하나뿐이다.** 우리 쪽 처리(변환·정리·화면)는 규칙 기반·결정적으로만 만든다 — 우리 서버에서 LLM을 부르는 기능 금지. SOP 추출이 틀리면 우리 쪽에서 덮어 고치지 말고, 실제 응답으로 건수를 세어 T3Q 규칙 보완 요청(REQ)으로 올린다. (개발 중 AI 도구가 해 주는 분석은 운영에서 재현되지 않는다)
- T3Q 연계는 `src/lib/t3q/client.ts` 한 곳에서만 호출. 계약 변경 시 `src/lib/t3q/types.ts` · `public/api-docs/t3q.yaml`(정본) · `docs/T3Q_API_요청서.md`를 함께 고친다.
- 서버 액션(`src/app/actions/*`)을 추가·변경하면 `public/api-docs/internal.yaml` 도 고친다. API 문서 주소: `/api-docs`
- HWPX: `src/lib/export/hwpx.ts` — charPr/paraPr 는 목록 끝에만 추가(한컴은 순서로 해석), mimetype 첫 항목·무압축.
- DB 스키마 변경: `src/lib/db/schema.ts` 수정 → `npm run db:generate` → 커밋. 로컬은 PGlite, 운영은 Neon.
- 시간은 모두 Asia/Seoul 로 표시(`src/lib/format.ts`).
- 비밀정보(.env*, accounts/, seed_docs/)는 커밋하지 않는다. 저장소는 공개 저장소다.
- 결정 배경·겪은 문제·재사용 부품은 `docs/개발_인계노트.md` 에 쌓는다. 새 결정이나 함정을 만나면 여기에 한 줄 추가한다.
- SOP 임무 목록(situations.sop)은 통째로 쓰지 않는다 — `src/lib/sop/store.ts` 의 부분 수정 함수만 사용(동시 실행 시 유실 방지).
- 서버 액션 요청 한도는 4MB(`next.config.ts`). 그림·파일을 서버 액션으로 보낼 때 이 안에 들어가는지 확인한다.

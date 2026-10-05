import { LoginForm } from "./LoginForm";

const SSO_ERROR: Record<string, string> = {
  "no-token": "T3Q 연결 정보가 없습니다. 다시 접속해 주세요.",
  invalid: "T3Q 인증이 만료되었거나 확인되지 않습니다. T3Q에서 다시 접속해 주세요.",
  org: "소속 기관이 등록되어 있지 않습니다. 운영자에게 문의해 주세요.",
  inactive: "사용이 중지된 계정입니다. 운영자에게 문의해 주세요.",
};

/** 시험 기간 계정 고르기 — 기관별 화면(연락망 등)을 바로 볼 수 있게 기관마다 관리자 1개 */
const DEMO_ACCOUNTS = [
  { loginId: "admin", label: "운영관리자 (전체)" },
  { loginId: "busan-admin", label: "부산광역시 관리자" },
  { loginId: "gb-admin", label: "경상북도 관리자" },
];

/** 시험 기간: DEMO_LOGIN="아이디:비밀번호" 를 설정하면 계정을 목록에서 고르고 비밀번호를 안내한다. 배포 전 환경변수만 지우면 된다. */
export default async function LoginPage({ searchParams }: PageProps<"/login">) {
  const sp = await searchParams;
  const raw = process.env.DEMO_LOGIN ?? "";
  const i = raw.indexOf(":");
  const demo = i > 0 ? { loginId: raw.slice(0, i), password: raw.slice(i + 1), accounts: DEMO_ACCOUNTS } : null;
  const sso = typeof sp.sso === "string" ? (SSO_ERROR[sp.sso] ?? null) : null;
  return <LoginForm demo={demo} notice={sso} />;
}

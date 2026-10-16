/** 비밀번호 규칙 — 영문·숫자를 섞어 8자 이상 (계정 발급·비밀번호 지정·내 정보 공통). 맞으면 null */
export function passwordError(pw: string): string | null {
  if (pw.length < 8 || pw.length > 64 || !/[A-Za-z]/.test(pw) || !/\d/.test(pw)) return "새 비밀번호는 영문·숫자를 섞어 8자 이상으로 정하세요.";
  return null;
}

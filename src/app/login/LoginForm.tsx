"use client";
import { useActionState, useState } from "react";
import { login } from "@/app/actions/auth";
import { Button } from "@/components/ui";
import { BrandMark } from "@/components/BrandMark";

export function LoginForm({
  demo,
  notice,
}: {
  demo: { loginId: string; accounts: { loginId: string; label: string }[] } | null;
  notice: string | null;
}) {
  const [state, action, pending] = useActionState(login, {});
  // 시험 기간: 계정을 목록에서 고른다. 「직접 입력」이면 아이디 칸
  const [pick, setPick] = useState(
    demo ? (demo.accounts.some((a) => a.loginId === demo.loginId) ? demo.loginId : demo.accounts[0].loginId) : "",
  );
  const typing = !demo || pick === "";
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#dceeff] via-[#eef6ff] to-canvas px-4">
      <div className="mb-8 flex items-center gap-3">
        <BrandMark size={44} />
        <span className="text-[28px] font-bold">재난상황일지 생성도구</span>
      </div>
      <form action={action} className="card w-full max-w-[440px] space-y-4 p-8">
        <h1 className="text-[22px] font-bold">로그인</h1>
        {notice && <p className="rounded-md bg-warning-weak px-4 py-3 text-[15px] text-warning">{notice}</p>}
        {demo && (
          <select className="input" value={pick} onChange={(e) => setPick(e.target.value)} aria-label="계정">
            {demo.accounts.map((a) => (
              <option key={a.loginId} value={a.loginId}>
                {a.label} · {a.loginId}
              </option>
            ))}
            <option value="">직접 입력</option>
          </select>
        )}
        {typing ? (
          <input name="loginId" className="input" placeholder="아이디" autoComplete="username" autoFocus />
        ) : (
          <input type="hidden" name="loginId" value={pick} />
        )}
        <input
          name="password"
          type="password"
          className="input"
          placeholder="비밀번호"
          autoComplete="current-password"
          autoFocus={!typing}
        />
        {state?.error && <p className="text-[15px] text-danger">{state.error}</p>}
        <Button variant="primary" size="lg" className="w-full" disabled={pending}>
          {pending ? "확인 중" : "로그인"}
        </Button>
        <p className="text-center text-[14px] text-mute">T3Q 계정 연결 시 로그인 창 삭제 예정</p>
      </form>
    </main>
  );
}

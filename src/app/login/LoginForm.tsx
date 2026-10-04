"use client";
import { useActionState } from "react";
import { login } from "@/app/actions/auth";
import { Button } from "@/components/ui";
import { BrandMark } from "@/components/BrandMark";

export function LoginForm({
  demo,
  notice,
}: {
  demo: { loginId: string; password: string } | null;
  notice: string | null;
}) {
  const [state, action, pending] = useActionState(login, {});
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#dceeff] via-[#eef6ff] to-canvas px-4">
      <div className="mb-8 flex items-center gap-3">
        <BrandMark size={44} />
        <span className="text-[28px] font-bold">재난상황일지 생성도구</span>
      </div>
      <form action={action} className="card w-full max-w-[440px] space-y-4 p-8">
        <h1 className="text-[22px] font-bold">로그인</h1>
        {notice && <p className="rounded-md bg-warning-weak px-4 py-3 text-[15px] text-warning">{notice}</p>}
        <input
          name="loginId"
          className="input"
          placeholder="아이디"
          autoComplete="username"
          defaultValue={demo?.loginId ?? ""}
          autoFocus={!demo}
        />
        <input
          name="password"
          type="password"
          className="input"
          placeholder="비밀번호"
          autoComplete="current-password"
          autoFocus={!!demo}
        />
        {state?.error && <p className="text-[15px] text-danger">{state.error}</p>}
        <Button variant="primary" size="lg" className="w-full" disabled={pending}>
          {pending ? "확인 중" : "로그인"}
        </Button>
        {demo && <p className="text-center text-[14px] text-mute">시험용 비밀번호 {demo.password}</p>}
      </form>
    </main>
  );
}

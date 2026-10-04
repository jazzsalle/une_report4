"use client";
import { useActionState } from "react";
import { updateMe } from "@/app/actions/auth";
import { Button, Card, CardHead, FieldRow } from "@/components/ui";

export function MeForm({ name, dept, loginId }: { name: string; dept: string; loginId: string }) {
  const [state, action, pending] = useActionState(updateMe, {});
  return (
    <main className="mx-auto max-w-[900px] px-6 py-8">
      <form action={action}>
        <Card>
          <CardHead title="내 정보" />
          <div className="px-6 pb-6">
            <FieldRow label="아이디">
              <span className="px-1 font-medium">{loginId}</span>
            </FieldRow>
            <FieldRow label="이름" required>
              <input name="name" defaultValue={name} className="input max-w-[360px]" />
            </FieldRow>
            <FieldRow label="부서">
              <input name="dept" defaultValue={dept} className="input max-w-[360px]" />
            </FieldRow>
            <FieldRow label="현재 비밀번호">
              <input name="current" type="password" className="input max-w-[360px]" autoComplete="current-password" />
            </FieldRow>
            <FieldRow label="새 비밀번호">
              <input name="next" type="password" className="input max-w-[360px]" autoComplete="new-password" />
            </FieldRow>
            {state?.error && <p className="mt-4 text-danger">{state.error}</p>}
            {state?.ok && <p className="mt-4 text-success">저장했습니다.</p>}
          </div>
        </Card>
        <div className="mt-6 flex justify-end">
          <Button size="lg" variant="primary" disabled={pending}>
            저장
          </Button>
        </div>
      </form>
    </main>
  );
}

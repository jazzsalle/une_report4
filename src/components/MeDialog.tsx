"use client";
import { useActionState } from "react";
import { useRouter } from "next/navigation";
import { updateMe } from "@/app/actions/auth";
import { Button, FieldRow, Modal } from "./ui";

/** 내 정보 창 — 사용자 메뉴에서 연다. 저장하면 닫힌다 */
export function MeDialog({ name, dept, loginId, onClose }: { name: string; dept: string; loginId: string; onClose: () => void }) {
  const router = useRouter();
  const [state, action, pending] = useActionState(async (prev: { error?: string; ok?: boolean }, form: FormData) => {
    const r = await updateMe(prev, form);
    if (r.ok) {
      onClose();
      router.refresh();
    }
    return r;
  }, {});
  return (
    <Modal
      open
      onClose={onClose}
      title="내 정보"
      width={640}
      footer={
        <>
          {state?.error && <span className="mr-auto self-center text-danger">{state.error}</span>}
          <Button type="button" onClick={onClose}>
            취소
          </Button>
          <Button type="submit" form="me-form" variant="primary" disabled={pending}>
            저장
          </Button>
        </>
      }
    >
      <form id="me-form" action={action}>
        <FieldRow label="아이디">
          <span className="px-1 font-medium">{loginId}</span>
        </FieldRow>
        <FieldRow label="이름" required>
          <input name="name" defaultValue={name} className="input" />
        </FieldRow>
        <FieldRow label="부서">
          <input name="dept" defaultValue={dept} className="input" />
        </FieldRow>
        <FieldRow label="현재 비밀번호">
          <input name="current" type="password" className="input" autoComplete="current-password" />
        </FieldRow>
        <FieldRow label="새 비밀번호">
          <input name="next" type="password" className="input" placeholder="영문·숫자 8자 이상" autoComplete="new-password" />
        </FieldRow>
      </form>
    </Modal>
  );
}

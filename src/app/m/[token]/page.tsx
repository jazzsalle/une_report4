import type { Metadata, Viewport } from "next";
import { getDispatchByToken } from "@/lib/data";
import { FieldView } from "@/components/FieldView";

export const metadata: Metadata = { title: "재난 상황전파" };
export const viewport: Viewport = { width: "device-width", initialScale: 1 };

/** 현장 담당자 응답 화면 (로그인 없이 링크로) */
export default async function FieldPage({ params }: PageProps<"/m/[token]">) {
  const { token } = await params;
  const r = await getDispatchByToken(token);
  if (!r) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-canvas p-6 text-center text-[18px] text-sub">
        만료되었거나 잘못된 링크입니다.
      </main>
    );
  }
  const { d } = r;
  return (
    <main className="mx-auto min-h-screen max-w-[520px]">
      <FieldView
        token={token}
        data={{
          orgName: r.orgName,
          situationTitle: r.situation.title,
          missionTitle: r.mission?.title ?? "",
          message: d.message,
          name: d.name,
          sentAt: d.sentAt.toISOString(),
          readAt: d.readAt?.toISOString() ?? null,
          doneAt: d.doneAt?.toISOString() ?? null,
          note: d.note,
          noteAt: d.noteAt?.toISOString() ?? null,
          ackAt: d.ackAt?.toISOString() ?? null,
        }}
      />
    </main>
  );
}

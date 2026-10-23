import { redirect } from "next/navigation";

/** 상황을 열면 SOP 탭 (C-05). 상황 정보는 상황명 줄 「상황 정보」 창, 기상특보 보고는 상황일지 탭 (C-06) */
export default async function SituationPage({ params }: PageProps<"/s/[id]">) {
  const { id } = await params;
  redirect(`/s/${id}/sop`);
}

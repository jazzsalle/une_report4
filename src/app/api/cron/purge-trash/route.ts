import { NextResponse, type NextRequest } from "next/server";
import { purgeExpired } from "@/app/actions/report";

/** 매일 03:00(KST) 휴지통 7일 경과분 삭제 — vercel.json crons */
export async function GET(req: NextRequest) {
  const secret = process.env.CRON_SECRET;
  if (secret && req.headers.get("authorization") !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  return NextResponse.json(await purgeExpired());
}

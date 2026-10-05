import "server-only";
import { eq } from "drizzle-orm";
import { getDb, schema } from "@/lib/db";
import seedFile from "@/data/tutorial-busan.json";
import type { WeatherSnapshot } from "@/lib/types";

/**
 * 따라하기 시드 — 부산 풍수해 현장조치 매뉴얼 시나리오. 따라하기에서만 쓴다.
 * DB(tutorial_seeds)에 잠금(트리거)과 함께 상시 보관하고, 없으면 원본 파일로 다시 채운다.
 */
export type TutorialSeed = typeof seedFile;
export const TUTORIAL_ID = seedFile.id;

export async function getTutorialSeed(): Promise<TutorialSeed> {
  const db = await getDb();
  const [row] = await db.select().from(schema.tutorialSeeds).where(eq(schema.tutorialSeeds.id, TUTORIAL_ID)).limit(1);
  if (row) return row.data as unknown as TutorialSeed;
  // 넣기는 잠금 대상이 아니다 (고치기·지우기만 막음)
  await db
    .insert(schema.tutorialSeeds)
    .values({ id: TUTORIAL_ID, name: seedFile.name, data: seedFile as unknown as Record<string, unknown> })
    .onConflictDoNothing();
  return seedFile;
}

/** 따라하기 기상특보 — 시드 내용에 지금 시각을 붙인다 (실제 기상청 조회 없음) */
export function tutorialWeather(seed: TutorialSeed): WeatherSnapshot {
  const now = new Date();
  now.setMinutes(0, 0, 0);
  const at = now.toISOString();
  const w = seed.weather;
  return {
    stnId: w.stnId,
    stnName: w.stnName,
    announcedAt: at,
    retrievedAt: new Date().toISOString(),
    active: w.active.map((a) => ({ ...a, kind: a.kind as "warning" | "watch" })),
    preliminary: w.preliminary,
    infoText: w.infoLines.map((l) => `○ ${l}`).join("\n"),
    infoAt: at,
    nationwideText: w.nationwideText,
  };
}

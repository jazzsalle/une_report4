"use server";
import { requireUser } from "@/lib/auth/session";
import { seedLibrary } from "@/lib/seed";
import { seedToMission } from "@/lib/sop/convert";
import type { Mission } from "@/lib/types";

/** 매뉴얼 행동카드 → 임무 */
export async function missionFromLibrary(hazard: string, code: string): Promise<Mission | null> {
  await requireUser();
  const a = seedLibrary(hazard).actions.find((x) => x.code === code);
  return a ? seedToMission(a) : null;
}

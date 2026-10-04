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

/** 매뉴얼 행동카드 여러 개 → 임무 */
export async function missionsFromLibrary(hazard: string, codes: string[]): Promise<Mission[]> {
  await requireUser();
  const lib = seedLibrary(hazard).actions;
  return codes.map((c) => lib.find((x) => x.code === c)).filter(Boolean).map((a) => seedToMission(a!));
}

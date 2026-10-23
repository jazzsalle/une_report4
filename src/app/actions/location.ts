"use server";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { LOC_COOKIE, reverseGeocode, type UserLocation } from "@/lib/location";
import { sidoNode } from "@/lib/regions";

async function save(loc: UserLocation) {
  const jar = await cookies();
  jar.set(LOC_COOKIE, JSON.stringify(loc), { path: "/", maxAge: 60 * 60 * 24 * 365, sameSite: "lax" });
  revalidatePath("/", "layout");
}

/** 브라우저 위치(좌표) → 시군구 판별 후 저장. 사용자가 직접 설정한 위치는 덮어쓰지 않는다. */
export async function locateByGps(lat: number, lng: number): Promise<UserLocation | null> {
  const jar = await cookies();
  const cur = jar.get(LOC_COOKIE)?.value;
  if (cur && JSON.parse(cur).src === "manual") return JSON.parse(cur);
  const r = reverseGeocode(lng, lat);
  if (!r) return null;
  const loc: UserLocation = { ...r, src: "gps" };
  await save(loc);
  return loc;
}

/** 현재 위치 직접 설정 */
export async function setLocation(sido: string, sigungu: string): Promise<UserLocation> {
  const node = sidoNode(sido);
  if (!node) throw new Error("시도를 선택하세요.");
  if (sigungu && !node.s.some((s) => s.n === sigungu)) throw new Error("시군구를 다시 선택하세요.");
  const loc: UserLocation = { sido, sigungu, src: "manual" };
  await save(loc);
  return loc;
}

/** 직접 설정 해제 → 다시 자동 확인 */
export async function clearLocation() {
  const jar = await cookies();
  jar.delete(LOC_COOKIE);
  revalidatePath("/", "layout");
}

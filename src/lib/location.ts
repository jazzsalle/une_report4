import "server-only";
import { cookies } from "next/headers";
import shapes from "@/data/sigungu-shapes.json";
import { REGION_TREE } from "@/lib/regions";

export const LOC_COOKIE = "r4_loc";

export interface UserLocation {
  sido: string;
  sigungu: string;
  /** gps: 자동 확인 / manual: 사용자가 설정 */
  src: "gps" | "manual";
}

export async function readLocation(): Promise<UserLocation | null> {
  const jar = await cookies();
  const raw = jar.get(LOC_COOKIE)?.value;
  if (!raw) return null;
  try {
    const v = JSON.parse(raw) as UserLocation;
    return v.sido ? v : null;
  } catch {
    return null;
  }
}

type Shape = { c: string; n: string; s: string; r: [number, number][][] };

function inRing(x: number, y: number, ring: [number, number][]) {
  let c = false;
  for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
    const [xi, yi] = ring[i];
    const [xj, yj] = ring[j];
    if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) c = !c;
  }
  return c;
}

const norm = (s: string) => s.replace(/\s/g, "");

/** 좌표 → 시도·시군구 (경계 안에 없으면 가장 가까운 경계점 기준) */
export function reverseGeocode(lng: number, lat: number): { sido: string; sigungu: string } | null {
  const list = shapes as Shape[];
  let hit = list.find((s) => s.r.some((r) => inRing(lng, lat, r)));
  if (!hit) {
    let best = Infinity;
    for (const s of list) {
      for (const r of s.r) {
        for (const [x, y] of r) {
          const d = (x - lng) ** 2 + (y - lat) ** 2;
          if (d < best) {
            best = d;
            hit = s;
          }
        }
      }
    }
    if (best > 0.25) return null; // 약 50km 이상 벗어나면 국외로 본다
  }
  if (!hit) return null;
  // 시군구 이름은 화면 목록(regions.json) 표기로 맞춘다
  const sido = REGION_TREE.find((t) => t.n === hit!.s);
  const sgg = sido?.s.find((x) => norm(x.n) === norm(hit!.n));
  return { sido: hit.s, sigungu: sgg?.n ?? hit.n };
}

"use client";
import { useMemo } from "react";
import { CheckDropdown } from "@/components/ui";
import { REGION_TREE, splitArea } from "@/lib/regions";

/** 고른 이름이 많으면 "해운대구 외 2" */
const brief = (names: string[]) => (names.length > 2 ? `${names[0]} 외 ${names.length - 1}` : names.join(", "));

/**
 * 발생지역 선택 (N-01) — 시도 ▾ · 시군구 ▾(여러 개) · 읍면동 ▾(고른 시군구별, 「OO구 전역」 또는 동 여러 개)
 * 값: areas = ["해운대구", "수영구 광안동", "수영구 민락동"] — 시군구만 있으면 그 시군구 전역
 */
export function RegionPicker({
  sido,
  areas,
  onChange,
}: {
  sido: string;
  areas: string[];
  onChange: (sido: string, areas: string[]) => void;
}) {
  const node = REGION_TREE.find((s) => s.n === sido) ?? REGION_TREE[0];

  // 시군구 → 선택된 읍면동 목록 (빈 배열 = 시군구 전역)
  const picked = useMemo(() => {
    const m = new Map<string, string[]>();
    areas.forEach((a) => {
      const [sgg, umd] = splitArea(a);
      if (!m.has(sgg)) m.set(sgg, []);
      if (umd) m.get(sgg)!.push(umd);
    });
    return m;
  }, [areas]);

  const emit = (m: Map<string, string[]>) =>
    onChange(
      node.n,
      [...m.entries()].flatMap(([sgg, umds]) => (umds.length ? umds.map((u) => `${sgg} ${u}`) : [sgg])),
    );

  const toggleSgg = (sgg: string) => {
    const m = new Map(picked);
    if (m.has(sgg)) m.delete(sgg);
    else m.set(sgg, []);
    emit(m);
  };

  // 전역을 고르면 동 선택을 비우고, 동을 고르면 전역이 풀린다
  const setUmds = (sgg: string, umds: string[]) => {
    const m = new Map(picked);
    m.set(sgg, umds);
    emit(m);
  };

  const sggs = node.s.filter((s) => picked.has(s.n));
  const umdNames = sggs.flatMap((s) => picked.get(s.n)!);

  const summary = sggs.length
    ? sggs.map((s) => {
        const umds = picked.get(s.n)!;
        return umds.length ? `${s.n} ${umds.join(" · ")}` : `${s.n} 전역`;
      })
    : [`${node.n} 전역`];

  return (
    <div className="space-y-3">
      <div className="grid max-w-[960px] gap-3 md:grid-cols-3">
        <select className="input" aria-label="시도" value={node.n} onChange={(e) => onChange(e.target.value, [])}>
          {REGION_TREE.map((s) => (
            <option key={s.c} value={s.n}>
              {s.n}
            </option>
          ))}
        </select>
        <CheckDropdown
          placeholder="시군구 선택"
          text={brief(sggs.map((s) => s.n))}
          groups={[
            {
              options: node.s.map((s) => ({
                key: s.c,
                label: s.n,
                checked: picked.has(s.n),
                onToggle: () => toggleSgg(s.n),
              })),
            },
          ]}
        />
        <CheckDropdown
          placeholder="읍면동 선택"
          disabled={!sggs.length}
          text={sggs.length ? (umdNames.length ? brief(umdNames) : "전역") : undefined}
          groups={sggs.map((s) => {
            const umds = picked.get(s.n)!;
            return {
              title: s.n,
              options: [
                { key: `${s.c}-all`, label: `${s.n} 전역`, checked: !umds.length, onToggle: () => setUmds(s.n, []) },
                ...s.u.map((u) => ({
                  key: `${s.c}-${u}`,
                  label: u,
                  checked: umds.includes(u),
                  onToggle: () => setUmds(s.n, umds.includes(u) ? umds.filter((x) => x !== u) : [...umds, u]),
                })),
              ],
            };
          })}
        />
      </div>
      <div className="text-[17px]">
        <span className="text-sub">선택 · </span>
        {summary.join(", ")}
      </div>
    </div>
  );
}

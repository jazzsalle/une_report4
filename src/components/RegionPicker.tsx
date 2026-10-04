"use client";
import { useMemo, useState } from "react";
import clsx from "clsx";
import { ChevronDown } from "lucide-react";
import { REGION_TREE, splitArea } from "@/lib/regions";

/**
 * 발생지역 선택 — 시도 1개, 시군구 여러 개, 시군구별 읍면동(선택)
 * 값: areas = ["해운대구", "수영구 광안동", "수영구 민락동"]
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
  const [openSgg, setOpenSgg] = useState<string | null>(null);

  // 시군구 → 선택된 읍면동 목록 (빈 배열 = 시군구 전체)
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
    if (m.has(sgg)) {
      m.delete(sgg);
      if (openSgg === sgg) setOpenSgg(null);
    } else {
      m.set(sgg, []);
      setOpenSgg(sgg);
    }
    emit(m);
  };

  const toggleUmd = (sgg: string, umd: string) => {
    const m = new Map(picked);
    const cur = m.get(sgg) ?? [];
    m.set(sgg, cur.includes(umd) ? cur.filter((x) => x !== umd) : [...cur, umd]);
    emit(m);
  };

  const openNode = openSgg ? node.s.find((s) => s.n === openSgg) : undefined;

  return (
    <div className="space-y-3">
      <select
        className="input max-w-[280px]"
        value={node.n}
        onChange={(e) => {
          setOpenSgg(null);
          onChange(e.target.value, []);
        }}
      >
        {REGION_TREE.map((s) => (
          <option key={s.c} value={s.n}>
            {s.n}
          </option>
        ))}
      </select>

      <div className="flex flex-wrap gap-2">
        {node.s.map((s) => {
          const on = picked.has(s.n);
          const n = picked.get(s.n)?.length ?? 0;
          return (
            <button
              type="button"
              key={s.c}
              onClick={() => (on && openSgg !== s.n ? setOpenSgg(s.n) : toggleSgg(s.n))}
              className={clsx(
                "h-10 rounded-md border px-3.5 text-[15px] font-medium transition",
                on ? "border-primary bg-primary-weak text-primary-strong" : "border-line bg-white hover:border-primary",
                openSgg === s.n && "ring-2 ring-primary/30",
              )}
            >
              {s.n}
              {on && n > 0 && <span className="ml-1 text-[14px]">{n}</span>}
            </button>
          );
        })}
      </div>

      {openNode && (
        <div className="rounded-lg border border-primary-line bg-primary-weak/40 p-4">
          <div className="mb-3 flex items-center gap-2">
            <ChevronDown size={18} className="text-primary" />
            <b>{openNode.n}</b>
            <span className="text-sub">읍면동</span>
            <button type="button" onClick={() => toggleSgg(openNode.n)} className="ml-auto text-[15px] text-sub hover:text-danger">
              {openNode.n} 선택 해제
            </button>
            <button type="button" onClick={() => setOpenSgg(null)} className="text-[15px] text-sub hover:text-ink">
              닫기
            </button>
          </div>
          <div className="scroll-thin flex max-h-56 flex-wrap gap-1.5 overflow-y-auto">
            {openNode.u.map((u) => {
              const on = picked.get(openNode.n)?.includes(u);
              return (
                <button
                  type="button"
                  key={u}
                  onClick={() => toggleUmd(openNode.n, u)}
                  className={clsx(
                    "h-9 rounded-md border px-3 text-[15px] transition",
                    on ? "border-primary bg-primary text-white" : "border-line bg-white hover:border-primary",
                  )}
                >
                  {u}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {areas.length > 0 && (
        <div className="text-[16px]">
          <span className="text-sub">선택 · </span>
          {areas.join(", ")}
        </div>
      )}
    </div>
  );
}

"use client";
import { useVisibleRefresh } from "@/lib/use-visible-refresh";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";
import type { Sop } from "@/lib/types";
import { progress } from "@/lib/sop/kind";
import { SopMetro } from "@/app/(app)/s/[id]/sop/SopMetro";
import { propagationTargets, sopChannel, type SopMessage } from "@/lib/sop/targets";

export function BoardView({
  id,
  title,
  sop,
  groups,
  contacts,
  units,
}: {
  id: string;
  title: string;
  sop: Sop;
  groups: { id: string; name: string; memberIds: string[] }[];
  contacts: { id: string; name: string; title: string }[];
  units: { id: string; name: string }[];
}) {
  const router = useRouter();
  const [sel, setSel] = useState<string | null>(null);
  const bc = useRef<BroadcastChannel | null>(null);

  useEffect(() => {
    const ch = new BroadcastChannel(sopChannel(id));
    bc.current = ch;
    ch.postMessage({ type: "hello" } satisfies SopMessage);
    ch.onmessage = (e: MessageEvent<SopMessage>) => {
      if (e.data.type === "changed") router.refresh();
      if (e.data.type === "select") setSel(e.data.id);
      if (e.data.type === "dock") window.close();
    };
    return () => ch.close();
  }, [id, router]);
  // 다른 사용자의 변경도 반영 (창이 보일 때만)
  useVisibleRefresh(20000);

  const { done, total } = progress(sop.missions);
  return (
    <main className="flex h-screen flex-col bg-[#0e1240] text-white">
      <header className="flex items-center gap-4 px-6 py-3">
        <h1 className="truncate text-[20px] font-bold">{title}</h1>
        <span className="text-white/70">
          완료 {done} / {total}
        </span>
        {/* 닫기 — 창을 닫고 본 화면으로 (P-13) */}
        <button
          className="ml-auto inline-flex h-11 w-11 items-center justify-center rounded-md text-white/80 hover:bg-white/10 hover:text-white"
          aria-label="닫기"
          title="닫기"
          onClick={() => window.close()}
        >
          <X size={24} />
        </button>
      </header>
      <div className="min-h-0 flex-1 px-3 pb-3">
        <SopMetro
          fill
          missions={sop.missions}
          selected={sel}
          started={!!sop.startedAt}
          ended={!!sop.endedAt}
          people={{ targets: propagationTargets(sop.missions, { groups, contacts, units }) }}
          onSelect={(mid) => {
            setSel(mid);
            bc.current?.postMessage({ type: "select", id: mid } satisfies SopMessage);
          }}
        />
      </div>
    </main>
  );
}

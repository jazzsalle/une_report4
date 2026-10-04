import clsx from "clsx";
import type { ReactNode } from "react";
import type { ReportSection } from "@/lib/types";
import { contentToBlocks, type Block } from "@/lib/export/blocks";

const INDENT: Record<number, string> = { 1: "pl-[1.4em]", 2: "pl-[2.8em]", 3: "pl-[3.8em]", 4: "pl-[4.6em]" };

/** 행정문서 본문 (□ ○ - ·, 표, 그림) — 화면 미리보기용 */
export function DocBlocks({
  s,
  no,
  imageSlot,
}: {
  s: ReportSection;
  no?: number;
  /** 그림 자리를 직접 그릴 때 (기상특보 보고의 끌어다 놓기 칸) */
  imageSlot?: () => ReactNode;
}) {
  const blocks = contentToBlocks({ title: "", reporter: "", dept: "", reportedAt: "", sections: [s] }).slice(1);
  return (
    <div className="text-[17.5px] leading-[1.8]">
      {no !== undefined && (
        <h2 className="mb-2 text-[20px] font-bold">
          {no}. {s.title}
        </h2>
      )}
      {blocks.map((b, i) => (
        <BlockView key={i} b={b} imageSlot={imageSlot} />
      ))}
    </div>
  );
}

function BlockView({ b, imageSlot }: { b: Block; imageSlot?: () => ReactNode }) {
  switch (b.type) {
    case "item":
      return (
        <p className={clsx("-indent-[1.2em]", INDENT[b.level])}>
          {b.prefix}{" "}
          {b.inlines.map((x, k) => (x.bold ? <b key={k}>{x.text}</b> : <span key={k}>{x.text}</span>))}
        </p>
      );
    case "caption":
      return <p className="text-center font-bold">{b.text}</p>;
    case "images":
      if (imageSlot) return <div className="my-3">{imageSlot()}</div>;
      return (
        <div className="my-3 grid grid-cols-2 border border-ink font-sans">
          {b.items.map((it, k) => (
            <figure key={k} className={clsx("flex flex-col", k > 0 && "border-l border-ink")}>
              <div className="flex aspect-[4/3] items-center justify-center bg-white">
                {it.src ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={it.src} alt={it.caption} className="h-full w-full object-contain" />
                ) : null}
              </div>
              <figcaption className="border-t border-ink py-1.5 text-center text-[15px] font-bold leading-normal">
                {it.caption}
              </figcaption>
            </figure>
          ))}
        </div>
      );
    case "table":
      return (
        <table className="mt-3 w-full border-collapse font-sans text-[15px] leading-normal">
          <thead>
            <tr>
              {b.head.map((h, k) => (
                <th key={k} className="border border-ink bg-[#dfe6f7] px-2 py-1.5 font-bold">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {b.rows.map((r, k) => (
              <tr key={k}>
                {b.head.map((_, j) => (
                  <td key={j} className="border border-ink px-2 py-1.5 align-top">
                    {r[j]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      );
    default:
      return null;
  }
}

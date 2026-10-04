"use client";
import { useRef, useState } from "react";
import clsx from "clsx";
import { ImagePlus, X } from "lucide-react";
import type { WeatherImage } from "@/lib/types";

/** 그림을 1400px 이하 JPEG 로 줄여 data URL 로 */
async function toImage(blob: Blob): Promise<WeatherImage> {
  const url = URL.createObjectURL(blob);
  try {
    const img = await new Promise<HTMLImageElement>((res, rej) => {
      const i = new Image();
      i.onload = () => res(i);
      i.onerror = () => rej(new Error("그림을 읽을 수 없습니다."));
      i.src = url;
    });
    const scale = Math.min(1, 1400 / img.naturalWidth);
    const w = Math.round(img.naturalWidth * scale);
    const h = Math.round(img.naturalHeight * scale);
    const c = document.createElement("canvas");
    c.width = w;
    c.height = h;
    const ctx = c.getContext("2d")!;
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, w, h);
    ctx.drawImage(img, 0, 0, w, h);
    return { src: c.toDataURL("image/jpeg", 0.85), at: new Date().toISOString(), width: w, height: h };
  } finally {
    URL.revokeObjectURL(url);
  }
}

/** 특보발표현황·레이더 영상 칸 — 끌어다 놓기 / 붙여넣기 / 파일 선택 */
export function ImageDrop({
  value,
  caption,
  editable,
  onChange,
}: {
  value?: WeatherImage;
  caption: string;
  editable: boolean;
  onChange: (img: WeatherImage | null) => Promise<void>;
}) {
  const [over, setOver] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const input = useRef<HTMLInputElement>(null);

  const take = async (blob: Blob | null) => {
    if (!blob) return;
    setBusy(true);
    setError(null);
    try {
      await onChange(await toImage(blob));
    } catch (e) {
      setError(e instanceof Error ? e.message : "그림을 넣지 못했습니다.");
    } finally {
      setBusy(false);
    }
  };

  const fromUrl = async (url: string) => {
    const res = await fetch(`/api/image-proxy?url=${encodeURIComponent(url)}`);
    if (!res.ok) throw new Error((await res.json().catch(() => ({}))).error ?? "그림을 가져오지 못했습니다.");
    return res.blob();
  };

  const onDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setOver(false);
    if (!editable) return;
    const file = [...e.dataTransfer.files].find((f) => f.type.startsWith("image/"));
    if (file) return take(file);
    // 다른 사이트 그림을 끌어온 경우: 그림 주소
    const html = e.dataTransfer.getData("text/html");
    const src = html.match(/<img[^>]+src="([^"]+)"/i)?.[1] ?? e.dataTransfer.getData("text/uri-list") ?? "";
    if (!src) return;
    setBusy(true);
    setError(null);
    try {
      await take(await fromUrl(src.replace(/&amp;/g, "&")));
    } catch (err) {
      setError(err instanceof Error ? err.message : "그림을 가져오지 못했습니다.");
      setBusy(false);
    }
  };

  const onPaste = (e: React.ClipboardEvent) => {
    if (!editable) return;
    const item = [...e.clipboardData.items].find((i) => i.type.startsWith("image/"));
    if (item) {
      e.preventDefault();
      take(item.getAsFile());
    }
  };

  return (
    <figure className="flex flex-col border border-ink">
      <div
        tabIndex={editable ? 0 : -1}
        onDragOver={(e) => {
          if (!editable) return;
          e.preventDefault();
          setOver(true);
        }}
        onDragLeave={() => setOver(false)}
        onDrop={onDrop}
        onPaste={onPaste}
        onClick={() => editable && !value && input.current?.click()}
        className={clsx(
          "relative flex aspect-[4/3] items-center justify-center overflow-hidden bg-white outline-none focus:ring-2 focus:ring-primary/40",
          editable && !value && "cursor-pointer",
          over && "bg-primary-weak",
        )}
      >
        {value ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={value.src} alt={caption} className="h-full w-full object-contain" />
        ) : (
          <div className="flex flex-col items-center gap-2 px-4 text-center text-sub">
            <ImagePlus size={34} className="text-placeholder" />
            {busy ? "그림 넣는 중" : editable ? "그림을 끌어다 놓거나 붙여넣기" : "그림 없음"}
          </div>
        )}
        {value && editable && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onChange(null);
            }}
            className="absolute right-2 top-2 rounded-full bg-black/60 p-1.5 text-white hover:bg-black/80"
            aria-label="그림 지우기"
          >
            <X size={16} />
          </button>
        )}
        <input
          ref={input}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => take(e.target.files?.[0] ?? null)}
        />
      </div>
      <figcaption className="border-t border-ink px-2 py-2 text-center text-[15px] font-bold">{caption}</figcaption>
      {error && <p className="px-2 pb-2 text-center text-[14px] text-danger">{error}</p>}
    </figure>
  );
}

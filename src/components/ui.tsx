"use client";
import clsx from "clsx";
import Link from "next/link";
import { PAGE_SIZE } from "@/lib/paging";
import { MoreHorizontal, X } from "lucide-react";
import { useEffect, useRef, useState, type ButtonHTMLAttributes, type ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost" | "danger";
type Size = "md" | "lg" | "sm";

export function Button({
  variant = "secondary",
  size = "md",
  className,
  ...rest
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant; size?: Size }) {
  return (
    <button
      {...rest}
      className={clsx(
        "inline-flex shrink-0 items-center justify-center gap-1.5 whitespace-nowrap rounded-md font-medium transition disabled:cursor-not-allowed",
        size === "lg" && "h-14 px-7 text-[18px]",
        size === "md" && "h-12 px-5 text-[16px]",
        size === "sm" && "h-9 px-3 text-[15px]",
        variant === "primary" &&
          "bg-primary text-white hover:bg-primary-strong disabled:bg-line disabled:text-white",
        variant === "secondary" &&
          "border border-line bg-white text-ink hover:border-primary hover:text-primary disabled:text-mute",
        variant === "ghost" && "text-sub hover:bg-canvas hover:text-ink disabled:text-mute",
        variant === "danger" && "border border-danger/40 bg-white text-danger hover:bg-danger-weak",
        className,
      )}
    />
  );
}

/** tour: 따라하기 말풍선이 가리킬 표시 (data-tour) */
export function Card({ className, children, tour }: { className?: string; children: ReactNode; tour?: string }) {
  return (
    <div className={clsx("card", className)} data-tour={tour}>
      {children}
    </div>
  );
}

export function CardHead({ title, right }: { title: ReactNode; right?: ReactNode }) {
  return (
    <div className="flex min-h-[72px] items-center justify-between gap-4 border-b border-line-weak px-6 py-4">
      <h2 className="text-[20px] font-bold">{title}</h2>
      {right && <div className="flex items-center gap-2">{right}</div>}
    </div>
  );
}

/** 계획서 생성도구의 '라벨 | 입력' 행 */
export function FieldRow({
  label,
  required,
  children,
  top,
}: {
  label: string;
  required?: boolean;
  children: ReactNode;
  top?: boolean;
}) {
  return (
    <div
      className={clsx(
        "grid grid-cols-1 gap-2 border-b border-line-weak py-3 md:grid-cols-[180px_1fr] md:gap-4",
        top ? "md:items-start" : "md:items-center",
      )}
    >
      <div className={clsx("px-3 text-[16px] text-sub", top && "md:pt-3")}>
        {label}
        {required && <span className="ml-0.5 text-danger">*</span>}
      </div>
      <div className="min-w-0">{children}</div>
    </div>
  );
}

const TONES = {
  blue: "bg-primary-weak text-primary-strong",
  gray: "bg-canvas text-sub",
  red: "bg-danger-weak text-danger",
  orange: "bg-warning-weak text-warning",
  green: "bg-success-weak text-success",
} as const;

export function Badge({ tone = "gray", children }: { tone?: keyof typeof TONES; children: ReactNode }) {
  return (
    <span className={clsx("inline-flex h-7 shrink-0 items-center whitespace-nowrap rounded px-2.5 text-[14px] font-semibold", TONES[tone])}>
      {children}
    </span>
  );
}

export function Modal({
  open,
  onClose,
  title,
  children,
  footer,
  width = 560,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  footer?: ReactNode;
  width?: number;
}) {
  useEffect(() => {
    if (!open) return;
    const h = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [open, onClose]);
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4" onMouseDown={onClose}>
      <div
        role="dialog"
        aria-modal="true"
        className="card flex max-h-[90vh] w-full flex-col"
        style={{ maxWidth: width }}
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-line-weak px-6 py-5">
          <h3 className="text-[20px] font-bold">{title}</h3>
          <button onClick={onClose} className="rounded p-1 text-sub hover:bg-canvas" aria-label="닫기">
            <X size={22} />
          </button>
        </div>
        <div className="scroll-thin overflow-y-auto px-6 py-5">{children}</div>
        {footer && <div className="flex justify-end gap-2 border-t border-line-weak px-6 py-4">{footer}</div>}
      </div>
    </div>
  );
}

export function Tabs<T extends string>({
  value,
  onChange,
  items,
}: {
  value: T;
  onChange: (v: T) => void;
  items: { value: T; label: string }[];
}) {
  return (
    <div className="flex gap-1 border-b border-line">
      {items.map((it) => (
        <button
          key={it.value}
          onClick={() => onChange(it.value)}
          className={clsx(
            "-mb-px h-14 border-b-[3px] px-5 text-[17px] font-semibold transition",
            value === it.value ? "border-primary text-primary" : "border-transparent text-sub hover:text-ink",
          )}
        >
          {it.label}
        </button>
      ))}
    </div>
  );
}

export function Empty({ children }: { children: ReactNode }) {
  return <div className="py-16 text-center text-[17px] text-mute">{children}</div>;
}

/** 쪽 넘김. 링크로 넘길 때는 base(예: "/?page="), 화면 안에서 넘길 때는 onChange. 한 쪽이면 숨김 */
export function Pager({
  page,
  total,
  base,
  onChange,
}: {
  page: number;
  total: number;
  base?: string;
  onChange?: (p: number) => void;
}) {
  const pages = Math.ceil(total / PAGE_SIZE);
  if (pages <= 1) return null;
  const cls = (on: boolean) =>
    clsx(
      "inline-flex h-12 min-w-12 items-center justify-center rounded-md px-3 text-[17px] font-medium transition",
      on ? "bg-primary text-white" : "border border-line bg-white text-ink hover:border-primary hover:text-primary",
    );
  return (
    <nav className="mt-6 flex flex-wrap justify-center gap-2" aria-label="쪽">
      {Array.from({ length: pages }, (_, i) => i + 1).map((p) =>
        base ? (
          <Link key={p} href={`${base}${p}`} className={cls(p === page)} aria-current={p === page ? "page" : undefined}>
            {p}
          </Link>
        ) : (
          <button key={p} type="button" className={cls(p === page)} onClick={() => onChange?.(p)}>
            {p}
          </button>
        ),
      )}
    </nav>
  );
}

/** 켜고 끄는 스위치 (켜짐 = 파랑). 글자는 옆에 따로 둔다 */
export function Switch({
  checked,
  onChange,
  disabled,
  label,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  disabled?: boolean;
  label: string;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      disabled={disabled}
      onClick={() => onChange(!checked)}
      className={clsx(
        "relative inline-flex h-7 w-12 shrink-0 items-center rounded-full transition disabled:cursor-not-allowed disabled:opacity-40",
        checked ? "bg-primary" : "bg-line",
      )}
    >
      <span className={clsx("inline-block size-5 rounded-full bg-white shadow transition", checked ? "translate-x-6" : "translate-x-1")} />
    </button>
  );
}

export type MoreItem = { label: string; icon?: ReactNode; onClick: () => void; danger?: boolean };

/**
 * 줄 끝 「⋯」 더보기 메뉴. danger 항목은 구분선 아래 빨간 글씨.
 * 표가 가로 스크롤 영역 안에 있어도 잘리지 않게 화면 기준(fixed)으로 띄운다.
 */
export function MoreMenu({ items, label = "더보기" }: { items: MoreItem[]; label?: string }) {
  const btn = useRef<HTMLButtonElement>(null);
  const [pos, setPos] = useState<{ top: number; right: number } | null>(null);
  useEffect(() => {
    if (!pos) return;
    const close = () => setPos(null);
    const key = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("mousedown", close);
    window.addEventListener("scroll", close, true);
    window.addEventListener("resize", close);
    window.addEventListener("keydown", key);
    return () => {
      window.removeEventListener("mousedown", close);
      window.removeEventListener("scroll", close, true);
      window.removeEventListener("resize", close);
      window.removeEventListener("keydown", key);
    };
  }, [pos]);
  const toggle = () => {
    if (pos) return setPos(null);
    const r = btn.current!.getBoundingClientRect();
    setPos({ top: r.bottom + 4, right: window.innerWidth - r.right });
  };
  const normal = items.filter((i) => !i.danger);
  const danger = items.filter((i) => i.danger);
  const row = (i: MoreItem) => (
    <button
      key={i.label}
      role="menuitem"
      onClick={() => (setPos(null), i.onClick())}
      className={clsx(
        "flex h-12 w-full items-center gap-2 px-4 text-left text-[17px] hover:bg-canvas",
        i.danger && "text-danger",
      )}
    >
      {i.icon}
      {i.label}
    </button>
  );
  return (
    <>
      <button
        ref={btn}
        type="button"
        aria-label={label}
        aria-haspopup="menu"
        aria-expanded={!!pos}
        onMouseDown={(e) => e.stopPropagation()}
        onClick={toggle}
        className="inline-flex size-10 items-center justify-center rounded-md text-sub hover:bg-canvas hover:text-ink"
      >
        <MoreHorizontal size={22} />
      </button>
      {pos && (
        <div
          role="menu"
          onMouseDown={(e) => e.stopPropagation()}
          className="card fixed z-40 min-w-44 overflow-hidden border border-line-weak py-1"
          style={{ top: pos.top, right: pos.right }}
        >
          {normal.map(row)}
          {normal.length > 0 && danger.length > 0 && <div className="my-1 border-t border-line-weak" />}
          {danger.map(row)}
        </div>
      )}
    </>
  );
}

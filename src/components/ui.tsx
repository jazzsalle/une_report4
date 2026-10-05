"use client";
import clsx from "clsx";
import { X } from "lucide-react";
import { useEffect, type ButtonHTMLAttributes, type ReactNode } from "react";

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

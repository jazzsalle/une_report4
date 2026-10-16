"use client";
import { useState, useTransition } from "react";
import clsx from "clsx";
import { FieldRow } from "./ui";
import { HAZARDS, ALERT_LEVELS, RESPONSE_STEPS, STEP_LABEL, STEP_BY_LEVEL, type AlertLevel } from "@/lib/types";
import { sidoShort } from "@/lib/regions";
import { RegionPicker } from "./RegionPicker";
import { toLocalInput } from "@/lib/format";
import type { SituationInput } from "@/app/actions/situation";

export function defaultInput(sido: string, hazard: string): SituationInput {
  const now = toLocalInput(new Date());
  const ymd = now.slice(0, 10).replace(/-/g, ".").slice(2);
  return {
    title: `${ymd}. ${sidoShort(sido)} ${hazard} 대응`,
    kind: "real",
    hazard,
    alertLevel: "주의",
    step: "초기대응",
    sido,
    areas: [],
    dept: "자연재난과",
    periodStart: now,
    periodEnd: null,
    currentStatus: "",
  };
}

export function SituationFields({
  value,
  onChange,
}: {
  value: SituationInput;
  onChange: (v: SituationInput) => void;
}) {
  const set = <K extends keyof SituationInput>(k: K, v: SituationInput[K]) => onChange({ ...value, [k]: v });

  return (
    <div>
      <h3 className="mb-2 mt-2 text-[18px] font-bold">상황정보</h3>
      <FieldRow label="상황 제목" required>
        <input className="input max-w-[560px]" value={value.title} onChange={(e) => set("title", e.target.value)} />
      </FieldRow>
      <FieldRow label="업무유형" required>
        <div className="flex gap-2">
          {(
            [
              ["real", "실제재난"],
              ["drill", "안전한국훈련"],
            ] as const
          ).map(([k, l]) => (
            <Chip key={k} on={value.kind === k} onClick={() => set("kind", k)}>
              {l}
            </Chip>
          ))}
        </div>
      </FieldRow>
      <FieldRow label="재난유형" required>
        <div className="flex flex-wrap gap-2">
          {HAZARDS.map((h) => (
            <Chip
              key={h}
              on={value.hazard === h}
              onClick={() =>
                onChange({ ...value, hazard: h, title: value.title.includes(value.hazard) ? value.title.replace(value.hazard, h) : value.title })
              }
            >
              {h}
            </Chip>
          ))}
        </div>
      </FieldRow>
      <FieldRow label="위기경보" required>
        <div className="flex flex-wrap gap-2">
          {ALERT_LEVELS.map((l) => (
            <Chip
              key={l}
              on={value.alertLevel === l}
              onClick={() => onChange({ ...value, alertLevel: l, step: STEP_BY_LEVEL[l as AlertLevel] })}
            >
              {l}
            </Chip>
          ))}
        </div>
      </FieldRow>
      <FieldRow label="대응단계" required>
        <div className="flex flex-wrap gap-2">
          {RESPONSE_STEPS.map((st) => (
            <Chip key={st} on={value.step === st} onClick={() => set("step", st)}>
              {STEP_LABEL[st]}
            </Chip>
          ))}
        </div>
      </FieldRow>
      <FieldRow label="발생지역" top>
        <RegionPicker
          sido={value.sido}
          areas={value.areas}
          onChange={(sido, areas) => {
            const prev = sidoShort(value.sido);
            const next = sidoShort(sido);
            onChange({
              ...value,
              sido,
              areas,
              title: sido !== value.sido && value.title.includes(prev) ? value.title.replace(prev, next) : value.title,
            });
          }}
        />
      </FieldRow>
      <FieldRow label="담당부서" required>
        <input className="input max-w-[360px]" value={value.dept} onChange={(e) => set("dept", e.target.value)} />
      </FieldRow>
      <FieldRow label="대응 기간" required>
        <div className="flex flex-wrap items-center gap-3">
          <input
            type="datetime-local"
            className="input w-[270px]"
            value={value.periodStart}
            onChange={(e) => set("periodStart", e.target.value)}
          />
          <span className="text-sub">~</span>
          <input
            type="datetime-local"
            className="input w-[270px]"
            disabled={value.periodEnd === null}
            value={value.periodEnd ?? ""}
            onChange={(e) => set("periodEnd", e.target.value)}
          />
          <label className="flex items-center gap-2 text-[16px]">
            <input
              type="checkbox"
              className="h-5 w-5 accent-primary"
              checked={value.periodEnd === null}
              onChange={(e) => set("periodEnd", e.target.checked ? null : value.periodStart)}
            />
            종료 미정
          </label>
        </div>
      </FieldRow>
      <FieldRow label="현재 상황" top>
        <textarea
          rows={5}
          className="input"
          placeholder="예) ○○ 지하차도 침수 신고 접수, 하천 산책로 통제 중"
          value={value.currentStatus}
          onChange={(e) => set("currentStatus", e.target.value)}
        />
      </FieldRow>
    </div>
  );
}

export function Chip({
  on,
  onClick,
  children,
  small,
}: {
  on: boolean;
  onClick: () => void;
  children: React.ReactNode;
  small?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={clsx(
        "rounded-md border font-medium transition",
        small ? "h-10 px-3.5 text-[15px]" : "h-12 px-5 text-[16px]",
        on ? "border-primary bg-primary-weak text-primary-strong" : "border-line bg-white text-ink hover:border-primary",
      )}
    >
      {children}
    </button>
  );
}

export function useSubmit<T>(fn: (v: T) => Promise<{ error?: string } | void>) {
  const [pending, start] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const submit = (v: T) =>
    start(async () => {
      setError(null);
      try {
        const r = await fn(v);
        if (r && r.error) setError(r.error);
      } catch (e) {
        // redirect() 는 예외로 전달되므로 그대로 던진다
        if (e && typeof e === "object" && "digest" in e && String((e as { digest: string }).digest).startsWith("NEXT_REDIRECT")) throw e;
        setError(e instanceof Error ? e.message : "처리 중 오류가 발생했습니다.");
      }
    });
  return { pending, error, submit };
}

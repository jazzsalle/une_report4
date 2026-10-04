"use client";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Pencil, RefreshCw, Sparkles, Trash2 } from "lucide-react";
import { Button, Card, CardHead, Modal } from "@/components/ui";
import { SituationFields, useSubmit } from "@/components/SituationForm";
import {
  generateSop,
  refreshWeather,
  summarizeWeather,
  trashSituation,
  updateSituation,
  type SituationInput,
} from "@/app/actions/situation";
import { STEP_LABEL, type ResponseStep, type WeatherSnapshot, type WeatherSummary } from "@/lib/types";
import { fmtDateTime, fmtPeriod, fromLocalInput } from "@/lib/format";

export function OverviewView({
  id,
  orgId,
  editable,
  hasSop,
  input,
  weather,
  summary,
}: {
  id: string;
  orgId: string;
  editable: boolean;
  hasSop: boolean;
  input: SituationInput;
  weather: WeatherSnapshot | null;
  summary: WeatherSummary | null;
}) {
  const router = useRouter();
  const [edit, setEdit] = useState(false);
  const [confirmTrash, setConfirmTrash] = useState(false);
  const [draft, setDraft] = useState(input);
  const save = useSubmit(async (v: SituationInput) => {
    const r = await updateSituation(id, v);
    if (!r.error) setEdit(false);
    return r;
  });
  const [busy, start] = useTransition();
  const [busyKey, setBusyKey] = useState<string | null>(null);
  const run = (key: string, fn: () => Promise<unknown>, after?: () => void) => {
    setBusyKey(key);
    start(async () => {
      await fn();
      setBusyKey(null);
      if (after) after();
      else router.refresh();
    });
  };

  const rows: [string, string][] = [
    ["업무유형", input.kind === "drill" ? "안전한국훈련" : "실제재난"],
    ["재난유형", input.hazard],
    ["위기경보", input.alertLevel],
    ["대응단계", STEP_LABEL[input.step as ResponseStep] ?? input.step],
    ["대상지역", input.areas.length ? input.areas.join(", ") : "전역"],
    [
      "대응 기간",
      fmtPeriod(fromLocalInput(input.periodStart), input.periodEnd ? fromLocalInput(input.periodEnd) : null),
    ],
  ];

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
      <Card>
        <CardHead
          title="상황 정보"
          right={
            editable && (
              <>
                <Button variant="ghost" size="sm" onClick={() => (setDraft(input), setEdit(true))}>
                  <Pencil size={17} /> 수정
                </Button>
                <Button variant="ghost" size="sm" onClick={() => setConfirmTrash(true)}>
                  <Trash2 size={17} /> 삭제
                </Button>
              </>
            )
          }
        />
        <dl className="px-6 py-2">
          {rows.map(([k, v]) => (
            <div key={k} className="grid grid-cols-[140px_1fr] border-b border-line-weak py-4">
              <dt className="text-sub">{k}</dt>
              <dd className="font-medium">{v}</dd>
            </div>
          ))}
          <div className="py-4">
            <dt className="mb-2 text-sub">현재 상황</dt>
            <dd className="whitespace-pre-line rounded-md bg-canvas p-4 leading-relaxed">
              {input.currentStatus || "입력된 내용 없음"}
            </dd>
          </div>
        </dl>
      </Card>

      <Card>
        <CardHead
          title="기상특보"
          right={
            editable && (
              <Button variant="ghost" size="sm" disabled={busy} onClick={() => run("wx", () => refreshWeather(id))}>
                <RefreshCw size={17} className={busyKey === "wx" ? "animate-spin" : ""} /> 갱신
              </Button>
            )
          }
        />
        <div className="space-y-5 px-6 py-5">
          {weather ? (
            <>
              <div className="text-[16px] text-sub">
                기상청 {weather.stnName} · {fmtDateTime(weather.announcedAt ?? weather.retrievedAt)} 발표
              </div>
              <div className="flex flex-wrap gap-2">
                {weather.active.length ? (
                  weather.active.map((a) => (
                    <div
                      key={a.name}
                      className={`rounded-md px-4 py-3 ${a.kind === "warning" ? "bg-danger-weak text-danger" : "bg-warning-weak text-warning"}`}
                    >
                      <div className="font-bold">{a.name}</div>
                      <div className="text-[15px]">{a.areas}</div>
                    </div>
                  ))
                ) : (
                  <div className="rounded-md bg-canvas px-4 py-3 font-medium">발효 중인 특보 없음</div>
                )}
              </div>
              {weather.preliminary.length > 0 && (
                <ul className="space-y-1 text-[16px] text-sub">
                  {weather.preliminary.map((p) => (
                    <li key={p}>예비특보 · {p}</li>
                  ))}
                </ul>
              )}
            </>
          ) : (
            <div className="text-sub">조회된 특보 없음</div>
          )}

          <div className="rounded-lg border border-primary-line bg-primary-weak/50 p-5">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="flex items-center gap-1.5 font-bold text-primary-strong">
                <Sparkles size={18} /> AI 기상 요약
              </h3>
              {editable && (
                <Button size="sm" disabled={busy} onClick={() => run("sum", () => summarizeWeather(id))}>
                  {busyKey === "sum" ? "요약 중" : summary ? "다시 요약" : "요약하기"}
                </Button>
              )}
            </div>
            {summary ? (
              <div className="space-y-2">
                <p className="text-[18px] font-bold">{summary.headline}</p>
                <ul className="space-y-1.5">
                  {summary.keyPoints.map((k) => (
                    <li key={k} className="flex gap-2 leading-relaxed">
                      <span className="text-primary">○</span>
                      <span>{k}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <p className="text-sub">기상특보와 기상정보를 요약합니다.</p>
            )}
          </div>
        </div>
      </Card>

      <div className="flex justify-end gap-3 lg:col-span-2">
        {hasSop ? (
          <Button size="lg" variant="primary" onClick={() => router.push(`/s/${id}/sop`)}>
            SOP 실행으로 <ArrowRight size={20} />
          </Button>
        ) : (
          editable && (
            <Button
              size="lg"
              variant="primary"
              disabled={busy}
              onClick={() => run("sop", () => generateSop(id), () => router.push(`/s/${id}/sop`))}
            >
              <Sparkles size={20} />
              {busyKey === "sop" ? "SOP 생성 중" : "SOP 생성하기"}
            </Button>
          )
        )}
      </div>

      <Modal
        open={confirmTrash}
        onClose={() => setConfirmTrash(false)}
        title="상황 삭제"
        width={460}
        footer={
          <>
            <Button onClick={() => setConfirmTrash(false)}>취소</Button>
            <Button variant="danger" disabled={busy} onClick={() => start(() => trashSituation(id))}>
              휴지통으로
            </Button>
          </>
        }
      >
        <p className="text-[18px]">휴지통에서 7일간 보관 후 삭제됩니다.</p>
      </Modal>

      <Modal
        open={edit}
        onClose={() => setEdit(false)}
        title="상황 정보 수정"
        width={1000}
        footer={
          <>
            {save.error && <span className="mr-auto self-center text-danger">{save.error}</span>}
            <Button onClick={() => setEdit(false)}>취소</Button>
            <Button variant="primary" disabled={save.pending} onClick={() => save.submit(draft)}>
              저장
            </Button>
          </>
        }
      >
        <SituationFields value={draft} onChange={setDraft} orgId={orgId} />
      </Modal>
    </div>
  );
}

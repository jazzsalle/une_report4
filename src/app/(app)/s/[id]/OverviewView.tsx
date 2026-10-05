"use client";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Download, Pencil, RefreshCw, Sparkles, Trash2 } from "lucide-react";
import { Button, Card, CardHead, Modal } from "@/components/ui";
import { SituationFields, useSubmit } from "@/components/SituationForm";
import {
  generateSop,
  refreshWeather,
  saveWeatherImage,
  trashSituation,
  updateSituation,
  type SituationInput,
} from "@/app/actions/situation";
import { STEP_LABEL, type ResponseStep, type WeatherImages, type WeatherSnapshot } from "@/lib/types";
import { WEATHER_SLOTS, weatherCaption, weatherReportContent, weatherSection } from "@/lib/report/weather";
import { DocBlocks } from "@/components/DocView";
import { ImageDrop } from "@/components/ImageDrop";
import { exportHwpx } from "@/lib/export/client";
import { safeFilename } from "@/lib/export/blocks";
import { fmtDateTime, fmtPeriod, fromLocalInput } from "@/lib/format";

export function OverviewView({
  id,
  editable,
  hasSop,
  input,
  weather,
  images,
  me,
}: {
  id: string;
  editable: boolean;
  hasSop: boolean;
  input: SituationInput;
  weather: WeatherSnapshot | null;
  images: WeatherImages | null;
  me: { name: string; dept: string };
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

  const section = weatherSection({ weather, weatherImages: images });
  const report = weatherReportContent({ weather, weatherImages: images }, me.name, me.dept);
  const stamp = fmtDateTime(weather?.announcedAt ?? weather?.retrievedAt ?? new Date().toISOString());

  const rows: [string, string][] = [
    ["업무유형", input.kind === "drill" ? "안전한국훈련" : "실제재난"],
    ["재난유형", input.hazard],
    ["위기경보", input.alertLevel],
    ["대응단계", STEP_LABEL[input.step as ResponseStep] ?? input.step],
    ["발생지역", `${input.sido} ${input.areas.length ? input.areas.join(", ") : "전역"}`],
    [
      "대응 기간",
      fmtPeriod(fromLocalInput(input.periodStart), input.periodEnd ? fromLocalInput(input.periodEnd) : null),
    ],
  ];

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(380px,2fr)_3fr]">
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
          title="기상특보 보고"
          right={
            <>
              {editable && (
                <>
                  <Button variant="ghost" size="sm" disabled={busy} onClick={() => run("wx", () => refreshWeather(id))}>
                    <RefreshCw size={17} className={busyKey === "wx" ? "animate-spin" : ""} /> {input.sido} 특보 갱신
                  </Button>
                </>
              )}
              <Button variant="ghost" size="sm" onClick={() => exportHwpx(report, safeFilename(report.title))}>
                <Download size={17} /> 한글
              </Button>
            </>
          }
        />
        <div className="px-8 py-6 font-[serif]">
          {/* 머리 (붙임 8-1-① 형식) */}
          <div className="mb-5 flex items-stretch border-2 border-ink">
            <div className="flex-1 px-4 py-3 text-center">
              <div className="text-[22px] font-bold" style={{ fontFamily: "'HY견고딕', 'Pretendard GOV Variable', sans-serif" }}>
                {report.title}
              </div>
              <div className="mt-1 text-[16px]">- {stamp} 기준 -</div>
            </div>
            <div className="flex w-[180px] shrink-0 flex-col items-center justify-center border-l-2 border-ink px-3 text-center text-[15px] font-bold leading-snug">
              <span>{input.sido}</span>
              <span>재난안전대책본부</span>
            </div>
          </div>
          <DocBlocks
            s={section}
            imageSlot={() => (
              <div className="grid grid-cols-3 gap-0 font-sans">
                {WEATHER_SLOTS.map((slot) => (
                  <ImageDrop
                    key={slot.key}
                    value={images?.[slot.key]}
                    caption={weatherCaption(slot.label, images?.[slot.key]?.at ?? weather?.announcedAt ?? weather?.retrievedAt)}
                    hint={slot.hint}
                    editable={editable}
                    onChange={async (img) => {
                      await saveWeatherImage(id, slot.key, img);
                      router.refresh();
                    }}
                  />
                ))}
              </div>
            )}
          />
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
        <SituationFields value={draft} onChange={setDraft} />
      </Modal>
    </div>
  );
}

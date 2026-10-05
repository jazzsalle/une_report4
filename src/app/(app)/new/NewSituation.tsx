"use client";
import { useState } from "react";
import { Sparkles, Wand2 } from "lucide-react";
import { Button, Card, CardHead } from "@/components/ui";
import { SituationFields, defaultInput, useSubmit } from "@/components/SituationForm";
import { createSituation, type SituationInput } from "@/app/actions/situation";
import { sidoShort } from "@/lib/regions";
import { BackButton } from "@/components/BackButton";

/** tutorial: 따라하기로 열었을 때 한 번에 채울 시드 값 (이때 만든 상황은 시드 기상·SOP를 쓴다) */
export function NewSituation({ sido, hazard, tutorial }: { sido: string; hazard: string; tutorial?: SituationInput }) {
  const [v, setV] = useState<SituationInput>(() => defaultInput(sido, hazard));
  // 현재 위치(상단)를 바꾸면 발생지역도 그 시도 기본값으로 맞춘다. 발생지역을 바꿔도 현재 위치는 그대로.
  const [locSido, setLocSido] = useState(sido);
  if (locSido !== sido) {
    setLocSido(sido);
    const prev = sidoShort(v.sido);
    setV({
      ...v,
      sido,
      areas: [],
      title: v.title.includes(prev) ? v.title.replace(prev, sidoShort(sido)) : v.title,
    });
  }
  const opts = { tutorial: !!tutorial };
  const withSop = useSubmit((x: SituationInput) => createSituation(x, true, opts));
  const only = useSubmit((x: SituationInput) => createSituation(x, false, opts));
  const pending = withSop.pending || only.pending;
  const error = withSop.error || only.error;

  return (
    <main className="mx-auto max-w-[1280px] px-6 py-8">
      <div className="mb-3">
        <BackButton fallback="/" />
      </div>
      <Card>
        <CardHead
          title="새 상황정보 등록"
          right={
            tutorial && (
              <Button variant="primary" data-tour="tour-fill" onClick={() => setV(tutorial)}>
                <Wand2 size={18} /> 따라하기 내용 채우기
              </Button>
            )
          }
        />
        <div className="px-6 pb-8" data-tour="new-form">
          <SituationFields value={v} onChange={setV} />
        </div>
      </Card>
      <div className="mt-6 flex items-center justify-end gap-3">
        {error && <span className="mr-auto text-[16px] text-danger">{error}</span>}
        <Button size="lg" disabled={pending} onClick={() => only.submit(v)}>
          저장
        </Button>
        <Button size="lg" variant="primary" data-tour="new-sop" disabled={pending} onClick={() => withSop.submit(v)}>
          <Sparkles size={20} />
          {withSop.pending ? "SOP 생성 중" : "SOP 생성하기"}
        </Button>
      </div>
    </main>
  );
}

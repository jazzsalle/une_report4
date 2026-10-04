"use client";
import { useState } from "react";
import { Sparkles } from "lucide-react";
import { Button, Card, CardHead } from "@/components/ui";
import { SituationFields, defaultInput, useSubmit } from "@/components/SituationForm";
import { createSituation, type SituationInput } from "@/app/actions/situation";

export function NewSituation({ orgId, hazard }: { orgId: string; hazard: string }) {
  const [v, setV] = useState<SituationInput>(() => defaultInput(orgId, hazard));
  const withSop = useSubmit((x: SituationInput) => createSituation(x, true));
  const only = useSubmit((x: SituationInput) => createSituation(x, false));
  const pending = withSop.pending || only.pending;
  const error = withSop.error || only.error;

  return (
    <main className="mx-auto max-w-[1280px] px-6 py-8">
      <Card>
        <CardHead title="새 상황 시작" />
        <div className="px-6 pb-8">
          <SituationFields value={v} onChange={setV} orgId={orgId} />
        </div>
      </Card>
      <div className="mt-6 flex items-center justify-end gap-3">
        {error && <span className="mr-auto text-[16px] text-danger">{error}</span>}
        <Button size="lg" disabled={pending} onClick={() => only.submit(v)}>
          저장
        </Button>
        <Button size="lg" variant="primary" disabled={pending} onClick={() => withSop.submit(v)}>
          <Sparkles size={20} />
          {withSop.pending ? "SOP 생성 중" : "SOP 생성하기"}
        </Button>
      </div>
    </main>
  );
}

"use client";
import { useEffect, useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import clsx from "clsx";
import { Download, FileSpreadsheet, Upload } from "lucide-react";
import { Button, Modal } from "@/components/ui";
import type { ContactsBundle } from "@/lib/data";
import { importContacts, type ImportStat } from "@/app/actions/contacts";
import { downloadContactsXlsx, parseContactsXlsx, type ContactRow } from "@/lib/contacts-xlsx";

/** 연락망 엑셀: 양식 내려받기 · 현재 연락망 내려받기 · 일괄 올리기 */
export function ContactsExcel({
  orgId,
  orgName,
  bundle,
  big,
}: {
  orgId: string;
  orgName: string;
  bundle: ContactsBundle;
  /** 빈 연락망 안내용: 큰 버튼, 내려받기 없음 */
  big?: boolean;
}) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState<string>("");
  const [rows, setRows] = useState<ContactRow[]>([]);
  const [errors, setErrors] = useState<string[]>([]);
  const [done, setDone] = useState<string | null>(null);
  const [over, setOver] = useState(false);
  // 추가·수정만 / 엑셀과 똑같이 맞추기(엑셀에 없는 담당자·빈 조직 삭제)
  const [sync, setSync] = useState(false);
  const [plan, setPlan] = useState<ImportStat | null>(null);
  const [pending, start] = useTransition();
  const input = useRef<HTMLInputElement>(null);

  const reset = () => {
    setFile("");
    setRows([]);
    setErrors([]);
    setDone(null);
    setPlan(null);
  };
  const read = async (f: File | undefined) => {
    if (!f) return;
    reset();
    setFile(f.name);
    try {
      const r = await parseContactsXlsx(f);
      setRows(r.rows);
      setErrors(r.errors);
    } catch {
      setErrors(["엑셀 파일(.xlsx)을 읽을 수 없습니다."]);
    }
  };
  const payload = () =>
    rows.map((r) => ({ upper: r.upper, unit: r.unit, name: r.name, title: r.title, duty: r.duty, phone: r.phone, email: r.email, groups: r.groups }));
  // 미리 보기: 서버에서 바꾸지 않고 결과만 계산 (몇 명 추가·수정·삭제)
  useEffect(() => {
    if (!rows.length) return;
    let off = false;
    importContacts(orgId, payload(), { sync, dryRun: true })
      .then((p) => !off && setPlan(p))
      .catch((e) => !off && setErrors([e instanceof Error ? e.message : "미리 보기를 만들지 못했습니다."]));
    return () => {
      off = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rows, sync, orgId]);
  const submit = () =>
    start(async () => {
      try {
        const s = await importContacts(orgId, payload(), { sync });
        setDone(
          `추가 ${s.added}명 · 수정 ${s.updated}명` +
            (s.units ? ` · 새 조직 ${s.units}개` : "") +
            (s.groups ? ` · 새 전파그룹 ${s.groups}개` : "") +
            (s.removed ? ` · 삭제 ${s.removed}명` : "") +
            (s.removedUnits ? ` · 조직 삭제 ${s.removedUnits}개` : ""),
        );
        setRows([]);
        router.refresh();
      } catch (e) {
        setErrors([e instanceof Error ? e.message : "등록하지 못했습니다."]);
      }
    });

  // 새로 추가 / 수정 미리 보기
  const unitOf = new Map(bundle.units.map((u) => [u.id, u.name]));
  const isUpdate = (r: ContactRow) => bundle.contacts.some((c) => c.name === r.name && unitOf.get(c.unitId) === r.unit);

  return (
    <>
      <Button variant={big ? "secondary" : "ghost"} size={big ? "md" : "sm"} onClick={() => downloadContactsXlsx(null, "연락망_양식.xlsx")}>
        <FileSpreadsheet size={18} /> 엑셀 양식
      </Button>
      {!big && (
        <Button variant="ghost" size="sm" onClick={() => downloadContactsXlsx(bundle, `연락망_${orgName}.xlsx`)}>
          <Download size={18} /> 엑셀 내려받기
        </Button>
      )}
      <Button
        size={big ? "md" : "sm"}
        onClick={() => {
          reset();
          setOpen(true);
        }}
      >
        <Upload size={18} /> 엑셀 올리기
      </Button>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="연락망 엑셀 올리기"
        width={820}
        footer={
          <>
            {rows.length > 0 && plan && (
              <span className="mr-auto self-center text-[17px] font-semibold">
                추가 {plan.added} · 수정 {plan.updated}
                {sync && (
                  <span className={plan.removed || plan.removedUnits ? "text-danger" : ""}>
                    {` · 삭제 ${plan.removed}명`}
                    {plan.removedUnits > 0 && ` · 조직 ${plan.removedUnits}개`}
                  </span>
                )}
              </span>
            )}
            <Button onClick={() => setOpen(false)}>{done ? "닫기" : "취소"}</Button>
            {!done && (
              <Button variant={sync && plan && (plan.removed || plan.removedUnits) ? "danger" : "primary"} disabled={!rows.length || !plan || pending} onClick={submit}>
                {pending ? "등록 중…" : "등록"}
              </Button>
            )}
          </>
        }
      >
        {done ? (
          <div className="rounded-md bg-success-weak px-5 py-6 text-[18px] font-semibold text-success">등록했습니다. {done}</div>
        ) : (
          <>
            <button
              onClick={() => input.current?.click()}
              onDragOver={(e) => {
                e.preventDefault();
                setOver(true);
              }}
              onDragLeave={() => setOver(false)}
              onDrop={(e) => {
                e.preventDefault();
                setOver(false);
                read(e.dataTransfer.files[0]);
              }}
              className={clsx(
                "flex h-32 w-full flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed text-[17px] transition",
                over ? "border-primary bg-primary-weak" : "border-line hover:border-primary",
              )}
            >
              <Upload size={26} className="text-primary" />
              {file || "엑셀 파일을 끌어 놓거나 눌러서 고르세요"}
            </button>
            <input
              ref={input}
              type="file"
              accept=".xlsx"
              className="hidden"
              onChange={(e) => {
                read(e.target.files?.[0]);
                e.target.value = "";
              }}
            />
            <div className="mt-4 grid grid-cols-2 gap-2">
              {(
                [
                  [false, "추가·수정만", "엑셀에 없는 담당자·조직은 그대로 둡니다"],
                  [true, "엑셀과 똑같이 맞추기", "엑셀에서 지운 담당자·조직을 연락망에서도 지웁니다"],
                ] as const
              ).map(([v, label, desc]) => (
                <button
                  key={label}
                  type="button"
                  onClick={() => {
                    if (sync === v) return;
                    setSync(v);
                    setPlan(null);
                  }}
                  className={clsx(
                    "rounded-lg border-2 px-4 py-3 text-left transition",
                    sync === v ? (v ? "border-danger bg-danger-weak" : "border-primary bg-primary-weak") : "border-line hover:border-primary",
                  )}
                >
                  <div className="text-[17px] font-bold">{label}</div>
                  <div className="text-[15px] text-sub">{desc}</div>
                </button>
              ))}
            </div>
            {sync && plan && (plan.removed > 0 || plan.removedUnits > 0) && (
              <div className="mt-3 rounded-md bg-danger-weak px-4 py-3 text-danger">
                <div className="font-semibold">
                  지울 담당자 {plan.removed}명{plan.removedUnits > 0 && ` · 조직 ${plan.removedUnits}개`}
                </div>
                <div className="mt-1 text-[15px]">
                  {[...plan.removedUnitNames.map((n) => `[조직] ${n}`), ...plan.removedNames].slice(0, 12).join(", ")}
                  {plan.removedNames.length + plan.removedUnitNames.length > 12 && ` 외 ${plan.removedNames.length + plan.removedUnitNames.length - 12}건`}
                </div>
              </div>
            )}

            {errors.length > 0 && (
              <ul className="mt-4 space-y-1 rounded-md bg-danger-weak px-4 py-3 text-danger">
                {errors.slice(0, 8).map((e) => (
                  <li key={e}>{e}</li>
                ))}
                {errors.length > 8 && <li>외 {errors.length - 8}건</li>}
              </ul>
            )}

            {rows.length > 0 && (
              <div className="scroll-thin mt-4 max-h-[40vh] overflow-auto rounded-md border border-line">
                <table className="w-full text-[15px]">
                  <thead className="sticky top-0 bg-canvas">
                    <tr className="text-left">
                      {["", "상위 조직", "조직(부서)", "이름", "직위", "휴대전화", "전파그룹"].map((h) => (
                        <th key={h} className="whitespace-nowrap border-b border-line px-3 py-2 font-semibold">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((r) => (
                      <tr key={r.row} className="border-b border-line-weak">
                        <td className="whitespace-nowrap px-3 py-1.5">
                          {r.name ? (
                            <span className={clsx("whitespace-nowrap rounded px-1.5 text-[13px] font-semibold", isUpdate(r) ? "bg-warning-weak text-warning" : "bg-primary-weak text-primary")}>
                              {isUpdate(r) ? "수정" : "추가"}
                            </span>
                          ) : (
                            <span className="whitespace-nowrap rounded bg-canvas px-1.5 text-[13px] font-semibold text-sub">조직</span>
                          )}
                        </td>
                        <td className="whitespace-nowrap px-3 py-1.5">{r.upper}</td>
                        <td className="whitespace-nowrap px-3 py-1.5">{r.unit}</td>
                        <td className="whitespace-nowrap px-3 py-1.5 font-medium">{r.name}</td>
                        <td className="whitespace-nowrap px-3 py-1.5">{r.title}</td>
                        <td className="whitespace-nowrap px-3 py-1.5">{r.phone}</td>
                        <td className="whitespace-nowrap px-3 py-1.5">{r.groups.join(", ")}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}
      </Modal>
    </>
  );
}

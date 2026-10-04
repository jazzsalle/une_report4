"use client";
import { useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import clsx from "clsx";
import { Download, FileSpreadsheet, Upload } from "lucide-react";
import { Button, Modal } from "@/components/ui";
import type { ContactsBundle } from "@/lib/data";
import { importContacts } from "@/app/actions/contacts";
import { downloadContactsXlsx, parseContactsXlsx, type ContactRow } from "@/lib/contacts-xlsx";

/** 연락망 엑셀: 양식 내려받기 · 현재 연락망 내려받기 · 일괄 올리기 */
export function ContactsExcel({ orgId, orgName, bundle }: { orgId: string; orgName: string; bundle: ContactsBundle }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState<string>("");
  const [rows, setRows] = useState<ContactRow[]>([]);
  const [errors, setErrors] = useState<string[]>([]);
  const [done, setDone] = useState<string | null>(null);
  const [over, setOver] = useState(false);
  const [pending, start] = useTransition();
  const input = useRef<HTMLInputElement>(null);

  const reset = () => {
    setFile("");
    setRows([]);
    setErrors([]);
    setDone(null);
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
  const submit = () =>
    start(async () => {
      try {
        const s = await importContacts(
          orgId,
          rows.map((r) => ({ upper: r.upper, unit: r.unit, name: r.name, title: r.title, duty: r.duty, phone: r.phone, email: r.email, groups: r.groups })),
        );
        setDone(
          `추가 ${s.added}명 · 수정 ${s.updated}명` +
            (s.units ? ` · 새 조직 ${s.units}개` : "") +
            (s.groups ? ` · 새 전파그룹 ${s.groups}개` : ""),
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
  const updates = rows.filter(isUpdate).length;

  return (
    <>
      <Button variant="ghost" size="sm" onClick={() => downloadContactsXlsx(null, "연락망_양식.xlsx")}>
        <FileSpreadsheet size={18} /> 엑셀 양식
      </Button>
      <Button variant="ghost" size="sm" onClick={() => downloadContactsXlsx(bundle, `연락망_${orgName}.xlsx`)}>
        <Download size={18} /> 엑셀 내려받기
      </Button>
      <Button
        size="sm"
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
            {rows.length > 0 && (
              <span className="mr-auto self-center text-[17px] font-semibold">
                {rows.length}명 · 추가 {rows.length - updates} · 수정 {updates}
              </span>
            )}
            <Button onClick={() => setOpen(false)}>{done ? "닫기" : "취소"}</Button>
            {!done && (
              <Button variant="primary" disabled={!rows.length || pending} onClick={submit}>
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
            <p className="mt-3 text-sub">
              같은 조직의 같은 이름은 내용을 고치고, 없으면 추가합니다. 엑셀에 없는 기존 담당자는 그대로 둡니다.
            </p>

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
                          <span className={clsx("whitespace-nowrap rounded px-1.5 text-[13px] font-semibold", isUpdate(r) ? "bg-warning-weak text-warning" : "bg-primary-weak text-primary")}>
                            {isUpdate(r) ? "수정" : "추가"}
                          </span>
                        </td>
                        <td className="whitespace-nowrap px-3 py-1.5">{r.upper}</td>
                        <td className="whitespace-nowrap px-3 py-1.5">{r.unit}</td>
                        <td className="px-3 py-1.5 font-medium">{r.name}</td>
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

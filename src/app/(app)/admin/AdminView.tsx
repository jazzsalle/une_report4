"use client";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { KeyRound, Plus, Search } from "lucide-react";
import { Button, Card, FieldRow, Modal, Switch } from "@/components/ui";
import { createUser, setPassword, updateUser } from "@/app/actions/admin";
import { fmtDateTime } from "@/lib/format";

type U = {
  id: string;
  loginId: string;
  name: string;
  dept: string;
  orgId: string;
  role: string;
  active: boolean;
  lastLoginAt: string | null;
};

const ROLE: Record<string, string> = { admin: "운영관리", manager: "기관관리", user: "일반", t3q: "T3Q" };

/** 「일반으로」·「기관관리로」 — 받침(ㄹ 제외)이 있으면 「으로」 */
function ro(w: string) {
  const c = w.charCodeAt(w.length - 1) - 0xac00;
  const jong = c >= 0 && c < 11172 ? c % 28 : 0;
  return `${w}${jong && jong !== 8 ? "으로" : "로"}`;
}

/** 계정관리 — 운영관리자 전용. 계정 발급과 비밀번호는 운영관리자가 직접 정한다 */
export function AdminView({ users, orgs, meId }: { users: U[]; orgs: { id: string; name: string }[]; meId: string }) {
  const router = useRouter();
  const [q, setQ] = useState("");
  const [org, setOrg] = useState("");
  const [pending, start] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [adding, setAdding] = useState<{ loginId: string; name: string; dept: string; orgId: string; role: string; password: string } | null>(null);
  const [pw, setPw] = useState<{ id: string; loginId: string; password: string } | null>(null);
  const [done, setDone] = useState<string | null>(null);
  // 권한 변경·계정 중지 확인 창
  const [confirm, setConfirm] = useState<{ title: string; text: string; ok: string; danger?: boolean; act: () => Promise<unknown> } | null>(null);
  const orgName = new Map(orgs.map((o) => [o.id, o.name]));
  const list = users.filter(
    (u) => (!org || u.orgId === org) && (!q || u.loginId.includes(q) || u.name.includes(q) || u.dept.includes(q)),
  );

  const run = (fn: () => Promise<unknown>, after?: () => void) =>
    start(async () => {
      setError(null);
      try {
        await fn();
        after?.();
        router.refresh();
      } catch (e) {
        setError(e instanceof Error ? e.message : "오류가 발생했습니다.");
      }
    });

  const exportCsv = () => {
    const csv =
      "﻿기관,아이디,이름,부서,권한,사용,최근 로그인\n" +
      list
        .map((u) =>
          [orgName.get(u.orgId), u.loginId, u.name, u.dept, ROLE[u.role], u.active ? "사용" : "중지", u.lastLoginAt ? fmtDateTime(u.lastLoginAt) : ""].join(","),
        )
        .join("\n");
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
    a.download = "계정목록.csv";
    a.click();
  };

  return (
    <main className="mx-auto max-w-[1440px] px-6 py-8">
      <div className="mb-6 flex items-center gap-3">
        <h1 className="text-[28px] font-bold">계정관리</h1>
        <div className="ml-auto flex gap-2">
          <Button onClick={exportCsv}>목록 다운로드</Button>
          <Button
            variant="primary"
            onClick={() => {
              setError(null);
              setAdding({ loginId: "", name: "", dept: "자연재난과", orgId: "busan", role: "user", password: "" });
            }}
          >
            <Plus size={18} /> 계정 발급
          </Button>
        </div>
      </div>
      <Card className="p-6">
        <div className="mb-5 flex flex-wrap items-center gap-3">
          <div className="relative w-full max-w-[380px]">
            <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-mute" />
            <input className="input pl-11" placeholder="아이디·이름·부서" value={q} onChange={(e) => setQ(e.target.value)} />
          </div>
          <select className="input w-44" value={org} onChange={(e) => setOrg(e.target.value)}>
            <option value="">전체 기관</option>
            {orgs.map((o) => (
              <option key={o.id} value={o.id}>
                {o.name}
              </option>
            ))}
          </select>
          {error && !adding && !pw && <span className="text-danger">{error}</span>}
          {done && <span className="font-semibold text-success">{done}</span>}
          <span className="ml-auto text-sub">{list.length}명</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[980px] text-left">
            <thead className="bg-canvas text-[15px] font-semibold text-sub">
              <tr>
                <th className="px-4 py-3">기관</th>
                <th className="px-4 py-3">아이디</th>
                <th className="px-4 py-3">이름</th>
                <th className="px-4 py-3">부서</th>
                <th className="px-4 py-3">권한</th>
                <th className="px-4 py-3">최근 로그인</th>
                <th className="px-4 py-3">사용</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody>
              {list.map((u) => (
                <tr key={u.id} className="border-b border-line-weak">
                  <td className="px-4 py-3">{orgName.get(u.orgId)}</td>
                  <td className="px-4 py-3 font-medium">{u.loginId}</td>
                  <td className="px-4 py-3">{u.name}</td>
                  <td className="px-4 py-3">{u.dept}</td>
                  <td className="px-4 py-3">
                    <select
                      className="input h-10 w-32 text-[15px]"
                      value={u.role}
                      disabled={u.id === meId || pending}
                      onChange={(e) => {
                        const role = e.target.value;
                        setError(null);
                        setConfirm({
                          title: "권한 변경",
                          text: `${u.name}의 권한을 ${ROLE[u.role]} → ${ro(ROLE[role])} 바꿀까요?`,
                          ok: "변경",
                          act: () => updateUser(u.id, { role }),
                        });
                      }}
                    >
                      {Object.entries(ROLE).map(([k, v]) => (
                        <option key={k} value={k}>
                          {v}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="px-4 py-3 text-sub">{u.lastLoginAt ? fmtDateTime(u.lastLoginAt) : "-"}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Switch
                        label={`${u.name} 계정 사용`}
                        checked={u.active}
                        disabled={u.id === meId || pending}
                        onChange={(on) => {
                          setError(null);
                          // 켤 때는 바로, 끌 때만 확인
                          if (on) run(() => updateUser(u.id, { active: true }));
                          else
                            setConfirm({
                              title: "계정 중지",
                              text: `${u.name} 계정을 중지할까요? 중지하면 로그인할 수 없습니다.`,
                              ok: "중지",
                              danger: true,
                              act: () => updateUser(u.id, { active: false }),
                            });
                        }}
                      />
                      <span className={u.active ? "text-ink" : "text-danger"}>{u.active ? "사용 중" : "중지"}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Button
                      size="sm"
                      variant="ghost"
                      disabled={pending}
                      onClick={() => {
                        setError(null);
                        setDone(null);
                        setPw({ id: u.id, loginId: u.loginId, password: "" });
                      }}
                    >
                      <KeyRound size={16} /> 비밀번호 지정
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Modal
        open={!!adding}
        onClose={() => setAdding(null)}
        title="계정 발급"
        width={640}
        footer={
          <>
            <Button onClick={() => setAdding(null)}>취소</Button>
            <Button
              variant="primary"
              disabled={pending}
              onClick={() =>
                run(
                  () => createUser(adding!),
                  () => {
                    setDone(`${adding!.loginId} 계정을 발급했습니다.`);
                    setAdding(null);
                  },
                )
              }
            >
              발급
            </Button>
          </>
        }
      >
        {adding && (
          <div>
            <FieldRow label="기관">
              <select className="input" value={adding.orgId} onChange={(e) => setAdding({ ...adding, orgId: e.target.value })}>
                {orgs.map((o) => (
                  <option key={o.id} value={o.id}>
                    {o.name}
                  </option>
                ))}
              </select>
            </FieldRow>
            <FieldRow label="아이디" required>
              <input className="input" placeholder="영문·숫자 3~30자" value={adding.loginId} onChange={(e) => setAdding({ ...adding, loginId: e.target.value })} />
            </FieldRow>
            <FieldRow label="이름" required>
              <input className="input" value={adding.name} onChange={(e) => setAdding({ ...adding, name: e.target.value })} />
            </FieldRow>
            <FieldRow label="부서">
              <input className="input" value={adding.dept} onChange={(e) => setAdding({ ...adding, dept: e.target.value })} />
            </FieldRow>
            <FieldRow label="권한">
              <select className="input" value={adding.role} onChange={(e) => setAdding({ ...adding, role: e.target.value })}>
                {Object.entries(ROLE).map(([k, v]) => (
                  <option key={k} value={k}>
                    {v}
                  </option>
                ))}
              </select>
            </FieldRow>
            <FieldRow label="비밀번호" required>
              <input
                className="input"
                placeholder="영문·숫자를 섞어 8자 이상"
                autoComplete="new-password"
                value={adding.password}
                onChange={(e) => setAdding({ ...adding, password: e.target.value })}
              />
            </FieldRow>
            {error && <p className="mt-3 text-danger">{error}</p>}
          </div>
        )}
      </Modal>

      <Modal
        open={!!pw}
        onClose={() => setPw(null)}
        title="비밀번호 지정"
        width={480}
        footer={
          <>
            <Button onClick={() => setPw(null)}>취소</Button>
            <Button
              variant="primary"
              disabled={pending || !pw?.password}
              onClick={() =>
                run(
                  () => setPassword(pw!.id, pw!.password),
                  () => {
                    setDone(`${pw!.loginId} 비밀번호를 지정했습니다.`);
                    setPw(null);
                  },
                )
              }
            >
              지정
            </Button>
          </>
        }
      >
        {pw && (
          <div className="space-y-3">
            <div className="text-[18px]">
              아이디 <b>{pw.loginId}</b>
            </div>
            <input
              className="input"
              placeholder="새 비밀번호 (영문·숫자 8자 이상)"
              autoComplete="new-password"
              value={pw.password}
              onChange={(e) => setPw({ ...pw, password: e.target.value })}
            />
            {error && <p className="text-danger">{error}</p>}
          </div>
        )}
      </Modal>

      <Modal
        open={!!confirm}
        onClose={() => setConfirm(null)}
        title={confirm?.title ?? ""}
        width={480}
        footer={
          <>
            <Button onClick={() => setConfirm(null)}>취소</Button>
            <Button
              variant={confirm?.danger ? "danger" : "primary"}
              disabled={pending}
              onClick={() => {
                const c = confirm!;
                setConfirm(null);
                run(c.act);
              }}
            >
              {confirm?.ok}
            </Button>
          </>
        }
      >
        <p className="text-[17px]">{confirm?.text}</p>
      </Modal>
    </main>
  );
}

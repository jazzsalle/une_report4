"use client";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { KeyRound, Plus, Search } from "lucide-react";
import { Badge, Button, Card, Modal } from "@/components/ui";
import { createUser, resetPassword, updateUser } from "@/app/actions/admin";
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

const ROLE: Record<string, string> = { admin: "전체관리", manager: "기관관리", user: "일반" };

export function AdminView({
  users,
  orgs,
  meId,
  isAdmin,
  myOrg,
}: {
  users: U[];
  orgs: { id: string; name: string }[];
  meId: string;
  isAdmin: boolean;
  myOrg: string;
}) {
  const router = useRouter();
  const [q, setQ] = useState("");
  const [org, setOrg] = useState("");
  const [pending, start] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [adding, setAdding] = useState<{ loginId: string; name: string; dept: string; orgId: string; role: string } | null>(null);
  const [issued, setIssued] = useState<{ loginId: string; password: string } | null>(null);
  const orgName = new Map(orgs.map((o) => [o.id, o.name]));
  const list = users.filter(
    (u) => (!org || u.orgId === org) && (!q || u.loginId.includes(q) || u.name.includes(q) || u.dept.includes(q)),
  );

  const run = (fn: () => Promise<unknown>) =>
    start(async () => {
      setError(null);
      try {
        await fn();
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
          <Button onClick={exportCsv}>목록 내려받기</Button>
          <Button variant="primary" onClick={() => setAdding({ loginId: "", name: "", dept: "자연재난과", orgId: isAdmin ? "busan" : myOrg, role: "user" })}>
            <Plus size={18} /> 계정 추가
          </Button>
        </div>
      </div>
      <Card className="p-6">
        <div className="mb-5 flex flex-wrap items-center gap-3">
          <div className="relative w-full max-w-[380px]">
            <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-mute" />
            <input className="input pl-11" placeholder="아이디·이름·부서" value={q} onChange={(e) => setQ(e.target.value)} />
          </div>
          {isAdmin && (
            <select className="input w-44" value={org} onChange={(e) => setOrg(e.target.value)}>
              <option value="">전체 기관</option>
              {orgs.map((o) => (
                <option key={o.id} value={o.id}>
                  {o.name}
                </option>
              ))}
            </select>
          )}
          {error && <span className="text-danger">{error}</span>}
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
                      disabled={u.id === meId || pending || (!isAdmin && u.role === "admin")}
                      onChange={(e) => run(() => updateUser(u.id, { role: e.target.value }))}
                    >
                      {isAdmin && <option value="admin">전체관리</option>}
                      <option value="manager">기관관리</option>
                      <option value="user">일반</option>
                    </select>
                  </td>
                  <td className="px-4 py-3 text-sub">{u.lastLoginAt ? fmtDateTime(u.lastLoginAt) : "-"}</td>
                  <td className="px-4 py-3">
                    <button
                      disabled={u.id === meId || pending}
                      onClick={() => run(() => updateUser(u.id, { active: !u.active }))}
                    >
                      {u.active ? <Badge tone="green">사용</Badge> : <Badge tone="red">중지</Badge>}
                    </button>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Button
                      size="sm"
                      variant="ghost"
                      disabled={pending}
                      onClick={() =>
                        run(async () => {
                          const r = await resetPassword(u.id);
                          setIssued({ loginId: u.loginId, password: r.password });
                        })
                      }
                    >
                      <KeyRound size={16} /> 비밀번호 초기화
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
        title="계정 추가"
        width={520}
        footer={
          <>
            <Button onClick={() => setAdding(null)}>취소</Button>
            <Button
              variant="primary"
              disabled={pending}
              onClick={() =>
                run(async () => {
                  const r = await createUser(adding!);
                  setIssued({ loginId: adding!.loginId, password: r.password });
                  setAdding(null);
                })
              }
            >
              만들기
            </Button>
          </>
        }
      >
        {adding && (
          <div className="space-y-3">
            {isAdmin && (
              <select className="input" value={adding.orgId} onChange={(e) => setAdding({ ...adding, orgId: e.target.value })}>
                {orgs.map((o) => (
                  <option key={o.id} value={o.id}>
                    {o.name}
                  </option>
                ))}
              </select>
            )}
            <input className="input" placeholder="아이디" value={adding.loginId} onChange={(e) => setAdding({ ...adding, loginId: e.target.value })} />
            <input className="input" placeholder="이름" value={adding.name} onChange={(e) => setAdding({ ...adding, name: e.target.value })} />
            <input className="input" placeholder="부서" value={adding.dept} onChange={(e) => setAdding({ ...adding, dept: e.target.value })} />
            <select className="input" value={adding.role} onChange={(e) => setAdding({ ...adding, role: e.target.value })}>
              <option value="user">일반</option>
              <option value="manager">기관관리</option>
              {isAdmin && <option value="admin">전체관리</option>}
            </select>
            {error && <p className="text-danger">{error}</p>}
          </div>
        )}
      </Modal>

      <Modal
        open={!!issued}
        onClose={() => setIssued(null)}
        title="비밀번호 발급"
        width={440}
        footer={
          <Button variant="primary" onClick={() => setIssued(null)}>
            확인
          </Button>
        }
      >
        <div className="space-y-2 text-[18px]">
          <div>
            아이디 <b>{issued?.loginId}</b>
          </div>
          <div>
            비밀번호 <b className="select-all tabular-nums text-primary-strong">{issued?.password}</b>
          </div>
        </div>
      </Modal>
    </main>
  );
}

import { requireUser } from "@/lib/auth/session";
import { MeForm } from "./MeForm";

export default async function MePage() {
  const u = await requireUser();
  return <MeForm name={u.name} dept={u.dept} loginId={u.loginId} />;
}

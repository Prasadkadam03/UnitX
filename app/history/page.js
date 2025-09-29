import { redirect } from "next/navigation";
import { requireUser } from "../../lib/session";
import HistoryClient from "./HistoryClient";

export default async function HistoryPage() {
  const user = await requireUser();
  if (!user) redirect("/");

  return <HistoryClient />;
}

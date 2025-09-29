import { redirect } from "next/navigation";
import { requireUser } from "../../lib/session";
import ConverterClient from "./ConverterClient";

export default async function ConverterPage() {
  const user = await requireUser();
  if (!user) redirect("/");

  return <ConverterClient />;
}

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import NewCvForm from "./NewCvForm";

export default async function NewCvPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string>>;
}) {
  const [session, params] = await Promise.all([
    auth.api.getSession({ headers: await headers() }),
    searchParams,
  ]);

  return <NewCvForm isGuest={!session} initialTitle={params.title ?? ""} />;
}

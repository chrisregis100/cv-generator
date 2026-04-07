import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import CvEditorClient from "./CvEditorClient";

// Server component — auth required; premium only for publish / extra CVs (see PublishModal, createCv)
export default async function CvEditorPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    redirect(`/login?redirect=${encodeURIComponent(`/dashboard/cv/${id}`)}`);
  }

  const plan = (session.user as unknown as { plan?: string }).plan ?? "free";

  return <CvEditorClient isPremium={plan === "premium"} />;
}

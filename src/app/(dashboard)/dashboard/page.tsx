import { getUserCvs } from "@/lib/actions/cv";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Link from "next/link";
import CvCard from "@/components/dashboard/CvCard";
import UpgradeModal, { UpgradeModalTrigger } from "@/components/dashboard/UpgradeModal";
import { FileText, Plus } from "lucide-react";

const EmptyState = () => (
  <div className="flex flex-col items-center justify-center py-24 gap-4">
    <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-base-300">
      <FileText className="w-10 h-10 text-base-content/30" />
    </div>
    <h2 className="text-xl font-semibold">Aucun CV pour l&apos;instant</h2>
    <p className="text-base-content/50 text-sm text-center max-w-sm">
      Créez votre premier CV en quelques minutes et démarquez-vous.
    </p>
    <Link href="/dashboard/cv/new" className="btn btn-primary gap-2">
      <Plus className="w-4 h-4" />
      Créer mon premier CV
    </Link>
  </div>
);

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string>>;
}) {
  const [cvList, session] = await Promise.all([
    getUserCvs(),
    auth.api.getSession({ headers: await headers() }),
  ]);

  const plan = (session?.user as unknown as { plan?: string })?.plan ?? "free";
  const upgraded = (await searchParams).upgraded === "true";
  const canCreateMore = plan === "premium" || cvList.length === 0;

  return (
    <div>
      {upgraded && (
        <div role="alert" className="alert alert-success mb-6">
          <span>
            Félicitations ! Vous êtes maintenant Premium 🎉 Créez des CVs illimités !
          </span>
        </div>
      )}

      <div className="flex justify-between items-center mb-8 gap-4 flex-wrap">
        <div>
          <h1 className="text-3xl font-bold">Mes CVs</h1>
          <p className="text-base-content/60 mt-1 text-sm">
            Plan :{" "}
            <span className={`badge badge-sm ${plan === "premium" ? "badge-primary" : "badge-ghost"}`}>
              {plan === "premium" ? "Premium" : "Gratuit"}
            </span>
          </p>
        </div>

        {canCreateMore ? (
          <Link href="/dashboard/cv/new" className="btn btn-primary gap-2">
            <Plus className="w-4 h-4" />
            Nouveau CV
          </Link>
        ) : (
          <>
            <UpgradeModalTrigger />
            <UpgradeModal />
          </>
        )}
      </div>

      {cvList.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {cvList.map((cv) => (
            <CvCard key={cv.id} cv={cv} />
          ))}
        </div>
      )}
    </div>
  );
}

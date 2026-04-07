import { getUserCvs } from "@/lib/actions/cv";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Link from "next/link";
import CvCard from "@/components/dashboard/CvCard";
import UpgradeModal, { UpgradeModalTrigger } from "@/components/dashboard/UpgradeModal";
import { FileText, Plus, Sparkles } from "lucide-react";

// Static example CVs shown to guests on the dashboard
const EXAMPLE_CVS = [
  { id: "example-1", title: "CV Développeur Full Stack", theme: "cupcake", isPublished: true, slug: null, updatedAt: new Date() },
  { id: "example-2", title: "CV Designer UX/UI", theme: "pastel", isPublished: false, slug: null, updatedAt: new Date() },
  { id: "example-3", title: "CV Chef de Projet", theme: "corporate", isPublished: true, slug: null, updatedAt: new Date() },
];

const EmptyState = () => (
  <div className="flex flex-col items-center justify-center py-24 gap-4">
    <div
      className="inline-flex items-center justify-center w-20 h-20"
      style={{
        backgroundColor: "var(--bg-elevated)",
        border: "2px solid var(--border-thick)",
        borderRadius: "var(--radius-brutal)",
      }}
    >
      <FileText className="w-10 h-10" style={{ color: "var(--text-muted)" }} />
    </div>
    <h2 className="text-xl font-semibold" style={{ color: "var(--text-primary)" }}>
      Aucun CV pour l&apos;instant
    </h2>
    <p className="text-sm text-center max-w-sm" style={{ color: "var(--text-muted)" }}>
      Créez votre premier CV en quelques minutes et démarquez-vous.
    </p>
    <Link href="/dashboard/cv/new" className="btn-brutal flex items-center gap-2 px-6 py-3">
      <Plus className="w-4 h-4" />
      Créer mon premier CV
    </Link>
  </div>
);

const GuestBanner = () => (
  <div className="brutal-alert brutal-alert-info mb-6 flex-wrap gap-3">
    <Sparkles className="w-5 h-5 shrink-0" style={{ color: "var(--accent-lime)" }} />
    <span className="flex-1 text-sm">
      <strong>Créez un compte</strong> pour enregistrer votre CV, le modifier et le télécharger en PDF.{" "}
      Le plan <strong>Premium</strong> ajoute la publication en ligne et des CV illimités.
    </span>
    <div className="flex gap-2 flex-wrap">
      <Link href="/login" className="btn-brutal-ghost px-4 py-2 text-xs">
        Se connecter
      </Link>
      <Link href="/register" className="btn-brutal px-4 py-2 text-xs">
        Créer un compte
      </Link>
    </div>
  </div>
);

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string>>;
}) {
  const [resolvedParams, session] = await Promise.all([
    searchParams,
    auth.api.getSession({ headers: await headers() }),
  ]);

  const isGuest = !session;
  const plan = (session?.user as unknown as { plan?: string })?.plan ?? "free";
  const isPremium = plan === "premium";

  const cvList = isGuest ? [] : await getUserCvs();

  const upgraded = resolvedParams.upgraded === "true";
  const canCreateMore = isPremium || cvList.length === 0;

  return (
    <div>
      {upgraded && (
        <div role="alert" className="brutal-alert brutal-alert-success mb-6">
          <span>
            Félicitations ! Vous êtes maintenant Premium 🎉 Créez des CVs illimités et publiez-les !
          </span>
        </div>
      )}

      {isGuest && <GuestBanner />}

      <div className="flex justify-between items-center mb-8 gap-4 flex-wrap">
        <div>
          <h1
            className="text-3xl font-bold"
            style={{ color: "var(--text-primary)" }}
          >
            {isGuest ? "Exemples de CVs" : "Mes CVs"}
          </h1>
          {!isGuest && (
            <p className="mt-1 text-sm flex items-center gap-2" style={{ color: "var(--text-muted)" }}>
              Plan :{" "}
              <span
                className={`brutal-badge ${isPremium ? "brutal-badge-lime" : "brutal-badge-outline"}`}
              >
                {isPremium ? "Premium" : "Gratuit"}
              </span>
            </p>
          )}
        </div>

        {isGuest ? (
          <Link href="/dashboard/cv/new" className="btn-brutal flex items-center gap-2 px-6 py-3">
            <Plus className="w-4 h-4" />
            Créer mon CV
          </Link>
        ) : canCreateMore ? (
          <Link href="/dashboard/cv/new" className="btn-brutal flex items-center gap-2 px-6 py-3">
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

      {isGuest ? (
        <div>
          <p className="text-sm mb-6" style={{ color: "var(--text-muted)" }}>
            Voici des exemples de CVs créés avec CVGen. Créez le vôtre dès maintenant !
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {EXAMPLE_CVS.map((cv) => (
              <CvCard key={cv.id} cv={cv} isGuest />
            ))}
          </div>
        </div>
      ) : cvList.length === 0 ? (
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

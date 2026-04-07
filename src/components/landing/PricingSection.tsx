import Link from "next/link";
import { Check } from "lucide-react";

const freePlanFeatures = [
  "Parcourir modèles et exemples sans compte",
  "1 CV enregistré après inscription",
  "Édition complète et sauvegarde automatique",
  "Tous les thèmes DaisyUI",
  "Export PDF",
];

const premiumPlanFeatures = [
  "CV illimités",
  "Publication en ligne avec URL publique",
  "Analytics détaillés (vues, pays, appareils)",
  "Support prioritaire",
  "Accès à vie, sans abonnement",
];

export default function PricingSection() {
  return (
    <section
      className="py-24 sm:py-32"
      style={{ backgroundColor: "var(--bg-elevated)" }}
      aria-labelledby="pricing-heading"
    >
      <div className="max-w-6xl mx-auto px-6 sm:px-10">
        {/* Section header */}
        <div className="text-center mb-16">
          <span
            className="text-xs font-bold uppercase tracking-[0.2em] mb-3 block"
            style={{ color: "var(--accent-lime)" }}
          >
            Tarifs
          </span>
          <h2
            id="pricing-heading"
            className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4"
            style={{ color: "var(--text-primary)" }}
          >
            Tarifs simples<span style={{ color: "var(--accent-coral)" }}>.</span>
          </h2>
          <p className="text-sm sm:text-base" style={{ color: "var(--text-muted)" }}>
            Essayez le parcours sur le tableau de bord sans compte. Inscrivez-vous pour
            sauvegarder ; Premium débloque l&apos;édition continue et la publication.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start max-w-4xl mx-auto">
          {/* Free Plan */}
          <div
            className="hover-lift p-8 sm:p-10"
            style={{
              backgroundColor: "var(--bg-card)",
              border: "2px solid var(--border-thick)",
              borderRadius: "var(--radius-brutal)",
            }}
          >
            <div className="mb-8">
              <h3
                className="text-lg font-bold uppercase tracking-wider"
                style={{ color: "var(--text-primary)" }}
              >
                Plan Gratuit
              </h3>
              <div className="mt-4 flex items-end gap-2">
                <span
                  className="text-5xl sm:text-6xl font-bold"
                  style={{ color: "var(--text-primary)" }}
                >
                  0€
                </span>
                <span
                  className="text-sm mb-2 font-medium"
                  style={{ color: "var(--text-muted)" }}
                >
                  pour toujours
                </span>
              </div>
            </div>

            <ul className="space-y-4 mb-10" aria-label="Fonctionnalités du plan gratuit">
              {freePlanFeatures.map((feature) => (
                <li key={feature} className="flex items-center gap-3">
                  <span
                    className="w-5 h-5 flex-shrink-0 flex items-center justify-center"
                    style={{
                      border: "2px solid var(--accent-lime)",
                      borderRadius: "var(--radius-brutal)",
                    }}
                  >
                    <Check
                      className="w-3 h-3"
                      style={{ color: "var(--accent-lime)" }}
                      aria-hidden="true"
                    />
                  </span>
                  <span className="text-sm" style={{ color: "var(--text-muted)" }}>
                    {feature}
                  </span>
                </li>
              ))}
            </ul>

            <Link
              href="/dashboard/cv/new"
              className="btn-brutal-ghost w-full block text-center px-6 py-3.5 text-sm"
              aria-label="Créer un CV sans compte jusqu’à la sauvegarde"
            >
              Essayer sans compte
            </Link>
            <p className="mt-3 text-center text-xs" style={{ color: "var(--text-muted)" }}>
              <Link
                href="/register"
                className="font-semibold underline underline-offset-2"
                style={{ color: "var(--text-primary)" }}
              >
                Créer un compte
              </Link>{" "}
              pour enregistrer votre CV (plan gratuit, 1 CV).
            </p>
          </div>

          {/* Premium Plan */}
          <div className="relative">
            {/* Sticker badge */}
            <div className="absolute -top-5 -right-2 z-10">
              <span
                className="sticker inline-block px-4 py-2 text-xs font-bold uppercase tracking-wider"
                style={{
                  backgroundColor: "var(--accent-coral)",
                  color: "#fff",
                  borderRadius: "var(--radius-brutal)",
                  transform: "rotate(3deg)",
                }}
              >
                ⭐ Meilleure valeur
              </span>
            </div>

            <div
              className="hover-lift p-8 sm:p-10"
              style={{
                backgroundColor: "var(--accent-lime)",
                border: "3px solid var(--accent-lime)",
                borderRadius: "var(--radius-brutal)",
                boxShadow: "6px 6px 0px var(--bg-deep)",
              }}
            >
              <div className="mb-8">
                <h3
                  className="text-lg font-bold uppercase tracking-wider"
                  style={{ color: "var(--bg-deep)" }}
                >
                  Plan Premium
                </h3>
                <div className="mt-4">
                  <span
                    className="text-3xl sm:text-4xl font-bold"
                    style={{ color: "var(--bg-deep)" }}
                  >
                    Paiement unique
                  </span>
                </div>
                <p
                  className="mt-2 text-sm font-medium"
                  style={{ color: "rgba(10,10,10,0.6)" }}
                >
                  Accès à vie — sans abonnement
                </p>
              </div>

              <ul className="space-y-4 mb-10" aria-label="Fonctionnalités du plan premium">
                {premiumPlanFeatures.map((feature) => (
                  <li key={feature} className="flex items-center gap-3">
                    <span
                      className="w-5 h-5 flex-shrink-0 flex items-center justify-center"
                      style={{
                        border: "2px solid var(--bg-deep)",
                        borderRadius: "var(--radius-brutal)",
                      }}
                    >
                      <Check
                        className="w-3 h-3"
                        style={{ color: "var(--bg-deep)" }}
                        aria-hidden="true"
                      />
                    </span>
                    <span
                      className="text-sm font-medium"
                      style={{ color: "rgba(10,10,10,0.8)" }}
                    >
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <Link
                href={`/login?redirect=${encodeURIComponent("/dashboard")}`}
                className="w-full block text-center px-6 py-3.5 text-sm font-bold uppercase tracking-wider transition-all duration-300"
                style={{
                  backgroundColor: "var(--bg-deep)",
                  color: "var(--accent-lime)",
                  border: "2px solid var(--bg-deep)",
                  borderRadius: "var(--radius-brutal)",
                }}
                aria-label="Se connecter puis passer au plan Premium depuis le tableau de bord"
              >
                Se connecter · Passer Premium →
              </Link>
              <p className="mt-3 text-center text-xs font-medium" style={{ color: "rgba(10,10,10,0.55)" }}>
                Pas encore de compte ?{" "}
                <Link href="/register" className="underline underline-offset-2 font-bold">
                  S&apos;inscrire
                </Link>
              </p>

              <div className="mt-6 text-center">
                <p
                  className="text-xs uppercase tracking-wider font-bold"
                  style={{ color: "rgba(10,10,10,0.4)" }}
                >
                  Paiements acceptés
                </p>
                <p
                  className="text-sm font-semibold mt-1"
                  style={{ color: "rgba(10,10,10,0.7)" }}
                >
                  MTN Money · Moov Money · Wave
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

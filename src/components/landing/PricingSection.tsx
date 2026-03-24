import Link from "next/link";
import { Check } from "lucide-react";

const freePlanFeatures = [
  "1 CV",
  "Tous les thèmes DaisyUI",
  "Export PDF",
  "Publication en ligne avec URL publique",
];

const premiumPlanFeatures = [
  "CV illimités",
  "Tout le plan gratuit inclus",
  "Analytics détaillés (vues, pays, appareils)",
  "Support prioritaire",
];

export default function PricingSection() {
  return (
    <section className="py-24 bg-base-200" aria-labelledby="pricing-heading">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="text-center mb-16">
          <h2 id="pricing-heading" className="text-3xl sm:text-4xl font-bold mb-4">
            Tarifs simples et transparents
          </h2>
          <p className="text-base sm:text-lg text-base-content/60">
            Commencez gratuitement. Passez Premium quand vous en avez besoin.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {/* Free Plan */}
          <div className="card bg-base-100 shadow-lg border border-base-300">
            <div className="card-body p-8">
              <div>
                <h3 className="text-2xl font-bold">Plan Gratuit</h3>
                <div className="mt-3 flex items-end gap-2">
                  <span className="text-5xl font-extrabold">0€</span>
                  <span className="text-base-content/50 mb-1">pour toujours</span>
                </div>
              </div>

              <ul className="space-y-3 my-8" aria-label="Fonctionnalités du plan gratuit">
                {freePlanFeatures.map((feature) => (
                  <li key={feature} className="flex items-center gap-3">
                    <span className="w-5 h-5 flex-shrink-0 flex items-center justify-center rounded-full bg-success/10">
                      <Check className="w-3.5 h-3.5 text-success" aria-hidden="true" />
                    </span>
                    <span className="text-base-content/80 text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <Link
                href="/register"
                className="btn btn-outline btn-block"
                aria-label="Créer un compte gratuit"
              >
                Commencer gratuitement
              </Link>
            </div>
          </div>

          {/* Premium Plan */}
          <div className="card bg-primary text-primary-content shadow-2xl border-2 border-primary relative mt-6 md:mt-0">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
              <span className="badge badge-secondary badge-lg font-semibold px-5 py-3 whitespace-nowrap">
                ⭐ Meilleure valeur
              </span>
            </div>

            <div className="card-body p-8">
              <div>
                <h3 className="text-2xl font-bold">Plan Premium</h3>
                <div className="mt-3">
                  <span className="text-3xl sm:text-4xl font-extrabold">Paiement unique</span>
                </div>
                <p className="text-primary-content/60 mt-1 text-sm">
                  Accès à vie — sans abonnement
                </p>
              </div>

              <ul className="space-y-3 my-8" aria-label="Fonctionnalités du plan premium">
                {premiumPlanFeatures.map((feature) => (
                  <li key={feature} className="flex items-center gap-3">
                    <span className="w-5 h-5 flex-shrink-0 flex items-center justify-center rounded-full bg-primary-content/20">
                      <Check className="w-3.5 h-3.5 text-primary-content" aria-hidden="true" />
                    </span>
                    <span className="text-primary-content/90 text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <Link
                href="/dashboard"
                className="btn bg-base-100 text-primary hover:bg-base-200 btn-block font-semibold border-0"
                aria-label="Passer au plan Premium"
              >
                Passer Premium
              </Link>

              <div className="mt-5 text-center space-y-1">
                <p className="text-primary-content/50 text-xs uppercase tracking-wider">
                  Paiements acceptés
                </p>
                <p className="text-primary-content/80 text-sm font-medium">
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

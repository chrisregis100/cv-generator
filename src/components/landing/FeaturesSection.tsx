import { Eye, Download, Globe, Palette, BarChart, Infinity } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    icon: Eye,
    title: "Éditeur en temps réel",
    description:
      "Aperçu instantané de votre CV pendant la saisie. Voyez vos modifications s'appliquer en direct, sans rechargement.",
  },
  {
    icon: Download,
    title: "Export PDF gratuit",
    description:
      "Téléchargez votre CV en haute qualité, prêt à être envoyé à tout recruteur. Format PDF universellement accepté.",
  },
  {
    icon: Globe,
    title: "Publication en ligne",
    description:
      "Partagez votre CV avec une URL publique personnalisée, optimisée pour les moteurs de recherche.",
  },
  {
    icon: Palette,
    title: "32 thèmes inclus",
    description:
      "Personnalisez les couleurs et le style de votre CV parmi 32 thèmes professionnels. Trouvez celui qui vous ressemble.",
  },
  {
    icon: BarChart,
    title: "Analytics de vues",
    description:
      "Suivez qui consulte votre CV : nombre de vues, pays d'origine, appareils utilisés. Sachez quand votre CV est vu.",
  },
  {
    icon: Infinity,
    title: "Accès à vie",
    description:
      "Un seul paiement, pas d'abonnement. Payez une fois et profitez de toutes les fonctionnalités pour toujours.",
  },
];

export default function FeaturesSection() {
  return (
    <section className="py-24 bg-base-200" aria-labelledby="features-heading">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-16">
          <h2 id="features-heading" className="text-3xl sm:text-4xl font-bold mb-4">
            Tout ce dont vous avez besoin
          </h2>
          <p className="text-base sm:text-lg text-base-content/60 max-w-2xl mx-auto">
            Des outils puissants pour créer un CV qui vous démarque des autres
            candidats.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="card bg-base-100 shadow-md hover:shadow-xl transition-shadow duration-300 border border-base-300/50"
            >
              <div className="card-body p-6">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 flex-shrink-0">
                  <feature.icon className="w-6 h-6 text-primary" aria-hidden="true" />
                </div>
                <h3 className="card-title text-base font-semibold">{feature.title}</h3>
                <p className="text-base-content/60 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

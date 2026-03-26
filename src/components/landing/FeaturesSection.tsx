import { Eye, Download, Globe, Palette, BarChart, Infinity } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
  accent?: boolean;
}

const features: Feature[] = [
  {
    icon: Eye,
    title: "Éditeur en temps réel",
    description:
      "Aperçu instantané de votre CV pendant la saisie. Vos modifications s'appliquent en direct.",
    accent: true,
  },
  {
    icon: Download,
    title: "Export PDF gratuit",
    description:
      "Téléchargez votre CV en haute qualité, prêt à être envoyé. Format PDF universel.",
  },
  {
    icon: Globe,
    title: "Publication en ligne",
    description:
      "Partagez votre CV avec une URL publique personnalisée, optimisée SEO.",
  },
  {
    icon: Palette,
    title: "32 thèmes inclus",
    description:
      "Personnalisez couleurs et style parmi 32 thèmes professionnels.",
    accent: true,
  },
  {
    icon: BarChart,
    title: "Analytics de vues",
    description:
      "Suivez qui consulte votre CV : vues, pays d'origine, appareils utilisés.",
  },
  {
    icon: Infinity,
    title: "Accès à vie",
    description:
      "Un seul paiement, pas d'abonnement. Toutes les fonctionnalités pour toujours.",
    accent: true,
  },
];

export default function FeaturesSection() {
  return (
    <section
      className="py-24 sm:py-32"
      style={{ backgroundColor: "var(--bg-elevated)" }}
      aria-labelledby="features-heading"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        {/* Section Header — left aligned, not centered */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-16">
          <div>
            <span
              className="text-xs font-bold uppercase tracking-[0.2em] mb-3 block"
              style={{ color: "var(--accent-lime)" }}
            >
              Fonctionnalités
            </span>
            <h2
              id="features-heading"
              className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight"
              style={{ color: "var(--text-primary)" }}
            >
              Tout ce dont vous
              <br />
              avez besoin<span style={{ color: "var(--accent-coral)" }}>.</span>
            </h2>
          </div>
          <p
            className="max-w-sm text-sm leading-relaxed"
            style={{ color: "var(--text-muted)" }}
          >
            Des outils puissants pour créer un CV qui vous démarque des autres
            candidats.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((feature, index) => {
            const isAccent = feature.accent;
            return (
              <div
                key={feature.title}
                className="hover-lift relative p-6 sm:p-8 overflow-hidden"
                style={{
                  backgroundColor: isAccent
                    ? "var(--accent-lime)"
                    : "var(--bg-card)",
                  border: isAccent
                    ? "2px solid var(--accent-lime)"
                    : "2px solid var(--border-thick)",
                  borderRadius: "var(--radius-brutal)",
                  color: isAccent ? "var(--bg-deep)" : "var(--text-primary)",
                }}
              >
                {/* Number watermark */}
                <span
                  className="feature-number"
                  style={{
                    color: isAccent ? "var(--bg-deep)" : "var(--text-primary)",
                  }}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>

                {/* Icon */}
                <div
                  className="w-11 h-11 flex items-center justify-center mb-5"
                  style={{
                    border: isAccent
                      ? "2px solid var(--bg-deep)"
                      : "2px solid var(--accent-lime)",
                    borderRadius: "var(--radius-brutal)",
                    backgroundColor: isAccent
                      ? "rgba(10,10,10,0.1)"
                      : "transparent",
                  }}
                >
                  <feature.icon
                    className="w-5 h-5"
                    style={{
                      color: isAccent ? "var(--bg-deep)" : "var(--accent-lime)",
                    }}
                    aria-hidden="true"
                  />
                </div>

                {/* Content */}
                <h3 className="text-base font-bold mb-2">{feature.title}</h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{
                    color: isAccent
                      ? "rgba(10,10,10,0.7)"
                      : "var(--text-muted)",
                  }}
                >
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

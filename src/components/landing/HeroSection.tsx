import Link from "next/link";

export default function HeroSection() {
  return (
    <section
      className="relative overflow-hidden min-h-[92vh] flex items-center"
      style={{ backgroundColor: "var(--bg-deep)" }}
    >
      {/* Geometric decorative elements */}
      <div
        className="absolute top-20 right-16 w-24 h-24 hidden lg:block"
        style={{
          border: "3px solid var(--accent-lime)",
          borderRadius: "var(--radius-brutal)",
          transform: "rotate(12deg)",
          opacity: 0.3,
        }}
        aria-hidden="true"
      />
      <div
        className="absolute bottom-32 right-1/3 w-16 h-16 hidden lg:block"
        style={{
          backgroundColor: "var(--accent-coral)",
          borderRadius: "50%",
          opacity: 0.15,
        }}
        aria-hidden="true"
      />
      <div
        className="absolute top-1/2 right-12 w-1 hidden lg:block"
        style={{
          height: "120px",
          backgroundColor: "var(--accent-lime)",
          opacity: 0.2,
        }}
        aria-hidden="true"
      />

      <div className="w-full max-w-7xl mx-auto px-6 sm:px-10 py-20">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-12 lg:gap-20">
          {/* Left — Main content */}
          <div className="flex-1 max-w-3xl">
            {/* Sticker badge */}
            <div className="mb-8 animate-slide-up">
              <span
                className="sticker inline-block px-5 py-2 text-xs font-bold uppercase tracking-[0.15em]"
                style={{
                  backgroundColor: "var(--accent-lime)",
                  color: "var(--bg-deep)",
                  borderRadius: "var(--radius-brutal)",
                }}
              >
                ✦ Simple · Rapide · Pro
              </span>
            </div>

            {/* Title — massive, asymmetric */}
            <h1
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[0.95] tracking-tight animate-slide-up-delay-1"
              style={{ color: "var(--text-primary)" }}
            >
              Créez votre
              <br />
              CV pro en
              <br />
              <span className="text-stroke-accent">quelques</span>{" "}
              <span style={{ color: "var(--accent-lime)" }}>min.</span>
            </h1>

            {/* Description */}
            <p
              className="mt-8 text-base sm:text-lg max-w-lg leading-relaxed animate-slide-up-delay-2"
              style={{ color: "var(--text-muted)" }}
            >
              Concevez, personnalisez et partagez votre CV grâce à des thèmes
              modernes. Export PDF haute qualité ou publication en ligne avec URL
              unique.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mt-10 animate-slide-up-delay-3">
              <Link
                href="/register"
                className="btn-brutal px-8 py-4 text-base text-center"
                aria-label="Créer un compte gratuitement"
              >
                Commencer gratuitement →
              </Link>
              <Link
                href="/cv/john-doe"
                className="btn-brutal-ghost px-8 py-4 text-base text-center"
                aria-label="Voir un exemple de CV"
              >
                Voir un exemple
              </Link>
            </div>

            {/* No credit card notice */}
            <p
              className="mt-6 text-xs uppercase tracking-wider font-medium"
              style={{ color: "var(--text-muted)" }}
            >
              ✓ Gratuit — Aucune carte bancaire requise
            </p>
          </div>

          {/* Right — Stats column */}
          <div
            className="flex flex-row lg:flex-col gap-8 lg:gap-10 animate-slide-up-delay-3"
          >
            {[
              { value: "32", label: "Thèmes" },
              { value: "PDF", label: "Export" },
              { value: "∞", label: "Accès à vie" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="flex flex-col"
                style={{ borderLeft: "2px solid var(--accent-lime)", paddingLeft: "16px" }}
              >
                <span
                  className="text-3xl lg:text-4xl font-bold"
                  style={{ color: "var(--accent-lime)" }}
                >
                  {stat.value}
                </span>
                <span
                  className="text-xs uppercase tracking-wider mt-1 font-medium"
                  style={{ color: "var(--text-muted)" }}
                >
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

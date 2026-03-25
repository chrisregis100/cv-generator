import Link from "next/link";

export default function HeroSection() {
  return (
      <section className="hero min-h-[88vh] bg-linear-to-br from-base-100 via-base-200 to-base-300 relative overflow-hidden">
        {/* Decorative blobs */}
        <div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none"
          aria-hidden="true"
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-secondary/10 rounded-full blur-3xl pointer-events-none"
          aria-hidden="true"
        />

        <div className="hero-content text-center flex-col max-w-4xl relative z-10 px-4 py-20">
          <div className="mb-6">
            <span className="badge badge-primary badge-lg font-medium px-4 py-3">
              ✨ Simple, rapide, professionnel
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight tracking-tight">
            Créez votre CV professionnel en{" "}
            <span className="text-primary">quelques minutes</span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-base-content/60 max-w-2xl mt-6 leading-relaxed">
            Concevez, personnalisez et partagez votre CV grâce à des thèmes
            modernes. Téléchargez en PDF haute qualité ou publiez en ligne avec
            une URL unique.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mt-10">
            <Link
              href="/register"
              className="btn btn-primary btn-lg text-base px-8"
              aria-label="Créer un compte gratuitement"
            >
              Commencer gratuitement
            </Link>
            <Link
              href="/cv/john-doe"
              className="btn btn-outline btn-lg text-base px-8"
              aria-label="Voir un exemple de CV"
            >
              Voir un exemple
            </Link>
          </div>

          <p className="mt-5 text-sm text-base-content/40">
            ✓ Gratuit pour commencer — Aucune carte bancaire requise
          </p>
        </div>
      </section>
  );
}

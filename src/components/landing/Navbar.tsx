import Link from "next/link";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export default async function Navbar() {
  const session = await auth.api.getSession({ headers: await headers() });

  return (
    <nav
      className="sticky top-0 z-50 px-6 py-4 flex items-center justify-between"
      style={{
        backgroundColor: "var(--bg-deep)",
        borderBottom: "2px solid var(--border-thick)",
      }}
    >
      <Link
        href="/"
        className="text-2xl font-bold tracking-[0.2em] uppercase"
        style={{ color: "var(--text-primary)" }}
        aria-label="CVGen — Accueil"
      >
        CV<span style={{ color: "var(--accent-lime)" }}>Gen</span>
      </Link>

      <div className="flex items-center gap-2 sm:gap-3 flex-wrap justify-end">
        {session?.user ? (
          <Link
            href="/dashboard"
            className="btn-brutal px-6 py-2.5 text-sm"
            aria-label="Accéder au tableau de bord"
          >
            Dashboard
          </Link>
        ) : (
          <>
            <Link
              href="/dashboard"
              className="hidden md:inline-flex px-3 py-2 text-xs sm:text-sm font-semibold uppercase tracking-wider transition-colors duration-200"
              style={{ color: "var(--text-muted)" }}
              aria-label="Voir les exemples et modèles"
            >
              Modèles
            </Link>
            <Link
              href="/login"
              className="inline-flex px-3 py-2 text-xs sm:text-sm font-semibold uppercase tracking-wider transition-colors duration-200"
              style={{ color: "var(--text-muted)" }}
              aria-label="Se connecter"
            >
              Connexion
            </Link>
            <Link
              href="/register"
              className="hidden sm:inline-flex px-3 py-2 text-xs sm:text-sm font-semibold uppercase tracking-wider transition-colors duration-200"
              style={{ color: "var(--text-muted)" }}
              aria-label="Créer un compte"
            >
              S&apos;inscrire
            </Link>
            <Link
              href="/dashboard/cv/new"
              className="btn-brutal px-4 sm:px-6 py-2.5 text-xs sm:text-sm"
              aria-label="Créer mon CV"
            >
              Créer mon CV
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

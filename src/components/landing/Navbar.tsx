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

      <div className="flex items-center gap-3">
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
              href="/login"
              className="hidden sm:inline-flex px-4 py-2 text-sm font-semibold uppercase tracking-wider transition-colors duration-200"
              style={{ color: "var(--text-muted)" }}
              onMouseEnter={undefined}
              aria-label="Se connecter"
            >
              Connexion
            </Link>
            <Link
              href="/register"
              className="btn-brutal px-6 py-2.5 text-sm"
              aria-label="Créer un compte gratuitement"
            >
              Commencer
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

import Link from "next/link";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export default async function Navbar() {
  const session = await auth.api.getSession({ headers: await headers() });

  return (
    <nav className="navbar sticky top-0 z-50 bg-base-100/80 backdrop-blur-md border-b border-base-300">
      <div className="navbar-start">
        <Link
          href="/"
          className="text-2xl font-bold text-primary tracking-tight"
          aria-label="CVGen — Accueil"
        >
          CVGen
        </Link>
      </div>
      <div className="navbar-end gap-2">
        {session?.user ? (
          <Link
            href="/dashboard"
            className="btn btn-primary btn-sm"
            aria-label="Accéder au tableau de bord"
          >
            Dashboard
          </Link>
        ) : (
          <>
            <Link
              href="/login"
              className="btn btn-ghost btn-sm hidden sm:inline-flex"
              aria-label="Se connecter"
            >
              Connexion
            </Link>
            <Link
              href="/register"
              className="btn btn-primary btn-sm"
              aria-label="Créer un compte gratuitement"
            >
              Commencer gratuitement
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

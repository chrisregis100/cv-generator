"use client";
import Link from "next/link";
import { signOut } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { LogOut, Settings } from "lucide-react";

interface User {
  id: string;
  name: string;
  email: string;
}

interface DashboardNavProps {
  user: User | null;
}

const SignOutButton = () => {
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
    router.push("/login");
  };

  return (
    <button
      onClick={handleSignOut}
      className="inline-flex items-center gap-2 px-3 py-2 text-xs font-semibold uppercase tracking-wider transition-colors duration-200"
      style={{ color: "var(--text-muted)" }}
      aria-label="Se déconnecter"
    >
      <LogOut className="w-4 h-4" />
      <span className="hidden sm:inline">Déconnexion</span>
    </button>
  );
};

const DashboardNav = ({ user }: DashboardNavProps) => {
  return (
    <nav
      className="sticky top-0 z-50 px-6 py-4 flex items-center justify-between"
      style={{
        backgroundColor: "var(--bg-deep)",
        borderBottom: "2px solid var(--border-thick)",
      }}
    >
      <Link
        href="/dashboard"
        className="text-xl font-bold tracking-[0.2em] uppercase"
        style={{ color: "var(--text-primary)" }}
        aria-label="CVGen — Tableau de bord"
      >
        CV<span style={{ color: "var(--accent-lime)" }}>Gen</span>
      </Link>

      <div className="flex items-center gap-2 flex-wrap justify-end">
        {user ? (
          <>
            <span
              className="text-sm hidden sm:block"
              style={{ color: "var(--text-muted)" }}
            >
              {user.email}
            </span>
            <Link
              href="/dashboard/settings"
              className="inline-flex items-center gap-2 px-3 py-2 text-xs font-semibold uppercase tracking-wider transition-colors duration-200"
              style={{ color: "var(--text-muted)" }}
              aria-label="Paramètres"
            >
              <Settings className="w-4 h-4" />
              <span className="hidden sm:inline">Paramètres</span>
            </Link>
            <SignOutButton />
          </>
        ) : (
          <>
            <Link
              href="/login"
              className="inline-flex px-3 py-2 text-xs font-semibold uppercase tracking-wider transition-colors duration-200"
              style={{ color: "var(--text-muted)" }}
              aria-label="Se connecter"
            >
              Connexion
            </Link>
            <Link
              href="/register"
              className="btn-brutal px-4 py-2 text-xs"
              aria-label="Créer un compte"
            >
              S&apos;inscrire
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default DashboardNav;

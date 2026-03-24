"use client";
import Link from "next/link";
import { signOut } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";

interface User {
  id: string;
  name: string;
  email: string;
}

interface DashboardNavProps {
  user: User;
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
      className="btn btn-ghost btn-sm gap-2"
      aria-label="Se déconnecter"
    >
      <LogOut className="w-4 h-4" />
      Se déconnecter
    </button>
  );
};

const DashboardNav = ({ user }: DashboardNavProps) => {
  return (
    <nav className="navbar bg-base-100 shadow-sm px-4 lg:px-8">
      <div className="flex-1">
        <Link
          href="/dashboard"
          className="text-xl font-bold italic"
          aria-label="Retour au dashboard"
        >
          CV<span className="text-primary">Gen</span>
        </Link>
      </div>
      <div className="flex items-center gap-4">
        <span className="text-sm text-base-content/60 hidden sm:block">
          {user.email}
        </span>
        <SignOutButton />
      </div>
    </nav>
  );
};

export default DashboardNav;

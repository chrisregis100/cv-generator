import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import DashboardNav from "@/components/dashboard/DashboardNav";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await auth.api.getSession({ headers: await headers() });

  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--bg-deep)" }}>
      <DashboardNav user={session?.user ?? null} />
      <main className="container mx-auto px-4 py-8 max-w-7xl">
        {children}
      </main>
    </div>
  );
}

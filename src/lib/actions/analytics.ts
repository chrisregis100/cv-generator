"use server";

import { db } from "@/lib/db";
import { cvAnalytics, cvs } from "@/lib/db/schema";
import { eq, count, desc } from "drizzle-orm";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export interface CvAnalyticsSummary {
  totalViews: number;
  topCountries: { country: string; count: number }[];
  deviceSplit: { device: string; count: number }[];
  recentViews: { viewedAt: Date; country: string | null; device: string | null }[];
}

export async function getCvAnalytics(cvId: string): Promise<CvAnalyticsSummary> {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/login");

  const [cv] = await db.select({ id: cvs.id }).from(cvs).where(eq(cvs.id, cvId));
  if (!cv) return { totalViews: 0, topCountries: [], deviceSplit: [], recentViews: [] };

  const [totalResult] = await db
    .select({ value: count() })
    .from(cvAnalytics)
    .where(eq(cvAnalytics.cvId, cvId));

  const topCountries = await db
    .select({
      country: cvAnalytics.country,
      count: count(),
    })
    .from(cvAnalytics)
    .where(eq(cvAnalytics.cvId, cvId))
    .groupBy(cvAnalytics.country)
    .orderBy(desc(count()))
    .limit(5);

  const deviceSplit = await db
    .select({
      device: cvAnalytics.device,
      count: count(),
    })
    .from(cvAnalytics)
    .where(eq(cvAnalytics.cvId, cvId))
    .groupBy(cvAnalytics.device)
    .orderBy(desc(count()))
    .limit(5);

  const recentViews = await db
    .select({
      viewedAt: cvAnalytics.viewedAt,
      country: cvAnalytics.country,
      device: cvAnalytics.device,
    })
    .from(cvAnalytics)
    .where(eq(cvAnalytics.cvId, cvId))
    .orderBy(desc(cvAnalytics.viewedAt))
    .limit(10);

  return {
    totalViews: totalResult.value,
    topCountries: topCountries.map((r) => ({
      country: r.country || "Inconnu",
      count: r.count,
    })),
    deviceSplit: deviceSplit.map((r) => ({
      device: r.device || "Inconnu",
      count: r.count,
    })),
    recentViews,
  };
}

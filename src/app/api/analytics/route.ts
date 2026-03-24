import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { cvAnalytics, cvs } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export async function POST(request: NextRequest) {
  try {
    const { cvId, device, referer } = await request.json();

    const [cv] = await db.select({ id: cvs.id }).from(cvs).where(eq(cvs.id, cvId));
    if (!cv) return NextResponse.json({ error: "CV not found" }, { status: 404 });

    const country =
      request.headers.get("x-vercel-ip-country") ||
      request.headers.get("cf-ipcountry") ||
      null;

    await db.insert(cvAnalytics).values({
      cvId,
      country,
      device: device || "unknown",
      referer: referer || null,
    });

    return NextResponse.json({ tracked: true });
  } catch {
    return NextResponse.json({ tracked: false });
  }
}

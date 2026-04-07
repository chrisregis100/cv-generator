"use server";

import { db } from "@/lib/db";
import { cvs } from "@/lib/db/schema";
import { eq, and, count } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import type { PersonalDetails, Experience, Education, Skill, Language, Hobby } from "@/types/type";

export interface CvData {
  personalDetails: PersonalDetails;
  experiences: Experience[];
  educations: Education[];
  skills: Skill[];
  languages: Language[];
  hobbies: Hobby[];
}

/** Returns the session, redirecting to /login if unauthenticated. */
async function getAuthSession() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) redirect("/login");
  return session;
}

/** Returns session and plan without side-effects. Returns null if unauthenticated. */
async function getOptionalSession() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) return null;
  const plan = (session.user as unknown as { plan?: string }).plan ?? "free";
  return { ...session, plan };
}

/**
 * Creates a CV for the authenticated user.
 * Guest strategy: the CV schema requires a userId (DB NOT NULL), so anonymous
 * creation is not supported. Callers (NewCvForm) must redirect guests to /login
 * before invoking this action. Returns { error } instead of hard-redirecting so
 * client components can surface a friendly message.
 */
export async function createCv(title: string) {
  const session = await getOptionalSession();

  if (!session) {
    return { error: "Connexion requise pour créer un CV." };
  }

  const userId = session.user.id;
  const { plan } = session;

  if (plan === "free") {
    const [result] = await db.select({ value: count() }).from(cvs).where(eq(cvs.userId, userId));
    if (result.value >= 1) {
      return { error: "Limite du plan gratuit atteinte. Passez en Premium pour créer plus de CVs." };
    }
  }

  const [newCv] = await db.insert(cvs).values({
    userId,
    title,
    data: {
      personalDetails: { fullName: "", email: "", phone: "", address: "" },
      experiences: [],
      educations: [],
      skills: [],
      languages: [],
      hobbies: [],
    },
  }).returning();

  revalidatePath("/dashboard");
  return { cv: newCv };
}

/**
 * Updates CV content. Requires auth and ownership of the CV (any plan).
 */
export async function updateCv(id: string, data: Partial<{ title: string; data: CvData; theme: string; zoom: number }>) {
  const session = await getOptionalSession();

  if (!session) {
    return { error: "Connexion requise." };
  }

  await db.update(cvs)
    .set({ ...data, updatedAt: new Date() })
    .where(and(eq(cvs.id, id), eq(cvs.userId, session.user.id)));

  revalidatePath(`/dashboard/cv/${id}`);
  return { success: true };
}

export async function publishCv(id: string, slug: string) {
  const session = await getOptionalSession();

  if (!session) {
    return { error: "Connexion requise pour publier un CV." };
  }
  if (session.plan !== "premium") {
    return { error: "La publication nécessite un plan Premium." };
  }

  const slugified = slug.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

  await db.update(cvs)
    .set({ slug: slugified, isPublished: true, updatedAt: new Date() })
    .where(and(eq(cvs.id, id), eq(cvs.userId, session.user.id)));

  revalidatePath(`/dashboard/cv/${id}`);
  revalidatePath(`/cv/${slugified}`);
  return { slug: slugified };
}

export async function unpublishCv(id: string) {
  const session = await getAuthSession();

  await db.update(cvs)
    .set({ isPublished: false, updatedAt: new Date() })
    .where(and(eq(cvs.id, id), eq(cvs.userId, session.user.id)));

  revalidatePath(`/dashboard/cv/${id}`);
  return { success: true };
}

export async function deleteCv(id: string) {
  const session = await getAuthSession();

  await db.delete(cvs).where(and(eq(cvs.id, id), eq(cvs.userId, session.user.id)));
  revalidatePath("/dashboard");
  return { success: true };
}

export async function getUserCvs() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) return [];

  return db.select().from(cvs).where(eq(cvs.userId, session.user.id)).orderBy(cvs.updatedAt);
}

/** Fetches a CV by id. Requires auth and ownership (any plan). */
export async function getCvById(id: string) {
  const session = await getOptionalSession();

  if (!session) return null;

  const [cv] = await db.select().from(cvs).where(and(eq(cvs.id, id), eq(cvs.userId, session.user.id)));
  return cv ?? null;
}

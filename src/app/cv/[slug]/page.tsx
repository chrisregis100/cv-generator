import { db } from "@/lib/db";
import { cvs } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import CvPreview from "@/components/CvPreview";
import CvViewTracker from "./cv-view-tracker";
import type { CvData } from "@/lib/actions/cv";
import { mergeCvTheme, normalizeTemplateId } from "@/lib/cv-template";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const [cv] = await db.select().from(cvs).where(eq(cvs.slug, slug));

  if (!cv || !cv.isPublished) return { title: "CV non trouvé" };

  const data = cv.data as CvData;
  const name = data.personalDetails?.fullName || "CV";
  const job = data.personalDetails?.postSeeking || "";
  const blurb =
    data.personalDetails?.summary?.trim() ||
    data.personalDetails?.description?.trim() ||
    `CV professionnel de ${name}`;

  return {
    title: `${name}${job ? ` — ${job}` : ""} | CV en ligne`,
    description: blurb,
    openGraph: {
      title: `${name}${job ? ` — ${job}` : ""}`,
      description: blurb,
      type: "profile",
    },
  };
}

export default async function PublicCvPage({ params }: Props) {
  const { slug } = await params;
  const [cv] = await db.select().from(cvs).where(eq(cvs.slug, slug));

  if (!cv || !cv.isPublished) notFound();

  const data = cv.data as CvData;

  return (
    <main className="min-h-screen bg-base-200 flex flex-col items-center py-8 px-4">
      <div className="w-full max-w-5xl mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">{data.personalDetails?.fullName}</h1>
          {data.personalDetails?.postSeeking && (
            <p className="text-base-content/60">{data.personalDetails.postSeeking}</p>
          )}
        </div>
        <a href="/register" className="btn btn-primary btn-sm">
          Créer mon CV gratuitement
        </a>
      </div>

      <div className="shadow-2xl rounded-lg overflow-hidden overflow-x-auto">
        <CvPreview
          personalDetails={data.personalDetails}
          file={null}
          experiences={data.experiences}
          educations={data.educations}
          skills={data.skills}
          languages={data.languages}
          hobbies={data.hobbies}
          templateId={normalizeTemplateId(cv.templateId)}
          themeColors={mergeCvTheme(normalizeTemplateId(cv.templateId), cv.cvTheme)}
        />
      </div>

      <footer className="mt-8 text-center text-base-content/40 text-sm">
        <p>
          Créé avec{" "}
          <Link href="/" className="link link-primary">
            CVGen
          </Link>
        </p>
      </footer>

      <CvViewTracker cvId={cv.id} />
    </main>
  );
}

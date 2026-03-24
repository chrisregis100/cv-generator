import { ImageResponse } from "next/og";
import { db } from "@/lib/db";
import { cvs } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import type { CvData } from "@/lib/actions/cv";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OgImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [cv] = await db.select().from(cvs).where(eq(cvs.slug, slug));

  const data = cv?.data as CvData | undefined;
  const name = data?.personalDetails?.fullName || "CV Professionnel";
  const job = data?.personalDetails?.postSeeking || "";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #1d1d2e 0%, #2d2d4e 100%)",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 72,
            fontWeight: "bold",
            marginBottom: 16,
            textAlign: "center",
            padding: "0 48px",
          }}
        >
          {name}
        </div>
        {job && (
          <div
            style={{
              fontSize: 36,
              opacity: 0.7,
              textAlign: "center",
              padding: "0 48px",
            }}
          >
            {job}
          </div>
        )}
        <div style={{ fontSize: 24, opacity: 0.5, marginTop: 32 }}>
          CVGen — Créez votre CV en ligne
        </div>
      </div>
    ),
    { ...size }
  );
}

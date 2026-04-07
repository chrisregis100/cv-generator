"use client";

import { useState } from "react";
import Link from "next/link";
import CvPreview from "@/components/CvPreview";
import {
  personalDetailsPreset,
  experiencesPreset,
  educationsPreset,
  skillsPreset,
  languagesPreset,
  hobbiesPreset,
} from "@/preset";
import {
  CV_TEMPLATE_IDS,
  CV_TEMPLATE_LABELS,
  DEFAULT_CV_THEMES,
  type CvTemplateId,
  type CvThemeColors,
} from "@/lib/cv-template";

const PREVIEW_WIDTH = 950;
const PREVIEW_HEIGHT = 1200;
const SCALE = 0.38;
const CONTAINER_WIDTH = Math.round(PREVIEW_WIDTH * SCALE);
const CONTAINER_HEIGHT = Math.round(PREVIEW_HEIGHT * SCALE);

const ACCENT_PRESETS: { id: string; label: string; colors: CvThemeColors }[] = [
  { id: "marine", label: "Marine", colors: { accent: "#1e3a5f", sidebar: "#1e3a5f" } },
  { id: "ardoise", label: "Ardoise", colors: { accent: "#64748b", sidebar: "#0a0a0a" } },
  { id: "bordeaux", label: "Bordeaux", colors: { accent: "#7f1d1d", sidebar: "#1c1917" } },
];

export default function CvShowcase() {
  const [templateId, setTemplateId] = useState<CvTemplateId>("commercial_sidebar");
  const [themeColors, setThemeColors] = useState<CvThemeColors>(DEFAULT_CV_THEMES.commercial_sidebar);

  return (
    <section
      className="py-24 sm:py-32"
      style={{ backgroundColor: "var(--bg-deep)" }}
      aria-labelledby="showcase-heading"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        {/* Section header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-14">
          <div>
            <span
              className="text-xs font-bold uppercase tracking-[0.2em] mb-3 block"
              style={{ color: "var(--accent-coral)" }}
            >
              Gabarits
            </span>
            <h2
              id="showcase-heading"
              className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight"
              style={{ color: "var(--text-primary)" }}
            >
              Choisissez votre
              <br />
              style<span style={{ color: "var(--accent-lime)" }}>.</span>
            </h2>
          </div>
          <p
            className="max-w-sm text-sm leading-relaxed"
            style={{ color: "var(--text-muted)" }}
          >
            Deux mises en page professionnelles, couleurs d’accent et colonne latérale réglables avant export.
          </p>
        </div>

        <div
          className="flex flex-wrap gap-2 mb-4"
          role="group"
          aria-label="Sélection du gabarit"
        >
          {CV_TEMPLATE_IDS.map((tid) => {
            const isSelected = templateId === tid;
            return (
              <button
                key={tid}
                type="button"
                onClick={() => {
                  setTemplateId(tid);
                  setThemeColors(DEFAULT_CV_THEMES[tid]);
                }}
                className="px-5 py-2.5 text-xs font-bold uppercase tracking-wider transition-all duration-200"
                style={{
                  backgroundColor: isSelected
                    ? "var(--accent-lime)"
                    : "transparent",
                  color: isSelected ? "var(--bg-deep)" : "var(--text-muted)",
                  border: isSelected
                    ? "2px solid var(--accent-lime)"
                    : "2px solid var(--border-thick)",
                  borderRadius: "var(--radius-brutal)",
                }}
                aria-label={`Sélectionner le gabarit ${CV_TEMPLATE_LABELS[tid]}`}
                aria-pressed={isSelected}
              >
                {CV_TEMPLATE_LABELS[tid]}
              </button>
            );
          })}
        </div>

        <div
          className="flex flex-wrap gap-2 mb-10"
          role="group"
          aria-label="Palettes de couleurs"
        >
          {ACCENT_PRESETS.map((preset) => {
            const isSelected =
              themeColors.accent === preset.colors.accent &&
              themeColors.sidebar === preset.colors.sidebar;
            return (
              <button
                key={preset.id}
                type="button"
                onClick={() => setThemeColors(preset.colors)}
                className="px-5 py-2.5 text-xs font-bold uppercase tracking-wider transition-all duration-200"
                style={{
                  backgroundColor: isSelected
                    ? "var(--accent-lime)"
                    : "transparent",
                  color: isSelected ? "var(--bg-deep)" : "var(--text-muted)",
                  border: isSelected
                    ? "2px solid var(--accent-lime)"
                    : "2px solid var(--border-thick)",
                  borderRadius: "var(--radius-brutal)",
                }}
                aria-label={`Palette ${preset.label}`}
                aria-pressed={isSelected}
              >
                {preset.label}
              </button>
            );
          })}
        </div>

        {/* CV Preview */}
        <div className="flex justify-center">
          <div
            className="overflow-hidden"
            style={{
              width: `${CONTAINER_WIDTH}px`,
              height: `${CONTAINER_HEIGHT}px`,
              border: "3px solid var(--accent-lime)",
              borderRadius: "var(--radius-brutal)",
              boxShadow: "8px 8px 0px var(--accent-lime)",
            }}
            aria-label="Aperçu du CV"
          >
            <div
              style={{
                transform: `scale(${SCALE})`,
                transformOrigin: "top left",
                width: `${PREVIEW_WIDTH}px`,
                height: `${PREVIEW_HEIGHT}px`,
                pointerEvents: "none",
              }}
            >
              <CvPreview
                personalDetails={personalDetailsPreset}
                file={null}
                experiences={experiencesPreset}
                educations={educationsPreset}
                languages={languagesPreset}
                skills={skillsPreset}
                hobbies={hobbiesPreset}
                templateId={templateId}
                themeColors={themeColors}
              />
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col sm:flex-row gap-4 justify-center items-stretch sm:items-center">
          <Link
            href="/dashboard/cv/new"
            className="btn-brutal px-8 py-4 text-sm text-center"
            aria-label="Créer mon CV"
          >
            Créer mon CV avec ce style →
          </Link>
          <Link
            href="/dashboard"
            className="btn-brutal-ghost px-8 py-4 text-sm text-center"
            aria-label="Voir d’autres exemples sur le tableau de bord"
          >
            Voir les modèles sur le dashboard
          </Link>
        </div>
      </div>
    </section>
  );
}

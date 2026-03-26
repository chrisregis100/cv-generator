"use client";

import { useState } from "react";
import CvPreview from "@/components/CvPreview";
import {
  personalDetailsPreset,
  experiencesPreset,
  educationsPreset,
  skillsPreset,
  languagesPreset,
  hobbiesPreset,
} from "@/preset";

interface Theme {
  id: string;
  label: string;
}

const themes: Theme[] = [
  { id: "cupcake", label: "Cupcake" },
  { id: "night", label: "Night" },
  { id: "corporate", label: "Corporate" },
  { id: "retro", label: "Retro" },
  { id: "cyberpunk", label: "Cyberpunk" },
  { id: "forest", label: "Forest" },
];

const PREVIEW_WIDTH = 950;
const PREVIEW_HEIGHT = 1200;
const SCALE = 0.38;
const CONTAINER_WIDTH = Math.round(PREVIEW_WIDTH * SCALE);
const CONTAINER_HEIGHT = Math.round(PREVIEW_HEIGHT * SCALE);

export default function CvShowcase() {
  const [selectedTheme, setSelectedTheme] = useState<string>("night");

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
              Personnalisation
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
            32 thèmes disponibles. Changez le thème en un clic et
            prévisualisez le résultat instantanément.
          </p>
        </div>

        {/* Theme selector */}
        <div
          className="flex flex-wrap gap-2 mb-10"
          role="group"
          aria-label="Sélection du thème"
        >
          {themes.map((theme) => {
            const isSelected = selectedTheme === theme.id;
            return (
              <button
                key={theme.id}
                onClick={() => setSelectedTheme(theme.id)}
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
                aria-label={`Sélectionner le thème ${theme.label}`}
                aria-pressed={isSelected}
              >
                {theme.label}
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
                personnalDetails={personalDetailsPreset}
                file={null}
                theme={selectedTheme}
                experiences={experiencesPreset}
                educations={educationsPreset}
                lanquages={languagesPreset}
                skills={skillsPreset}
                hobbies={hobbiesPreset}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

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
const SCALE = 0.35;
const CONTAINER_WIDTH = Math.round(PREVIEW_WIDTH * SCALE);
const CONTAINER_HEIGHT = Math.round(PREVIEW_HEIGHT * SCALE);

export default function CvShowcase() {
  const [selectedTheme, setSelectedTheme] = useState<string>("night");

  const handleThemeChange = (themeId: string) => {
    setSelectedTheme(themeId);
  };

  return (
    <section className="py-24 bg-base-100" aria-labelledby="showcase-heading">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-12">
          <h2 id="showcase-heading" className="text-3xl sm:text-4xl font-bold mb-4">
            Choisissez votre style
          </h2>
          <p className="text-base sm:text-lg text-base-content/60 max-w-2xl mx-auto">
            32 thèmes disponibles. Changez le thème de votre CV en un clic et
            prévisualisez le résultat instantanément.
          </p>
        </div>

        {/* Theme selector buttons */}
        <div className="flex flex-wrap justify-center gap-2 mb-10" role="group" aria-label="Sélection du thème">
          {themes.map((theme) => (
            <button
              key={theme.id}
              onClick={() => handleThemeChange(theme.id)}
              onKeyDown={(e) => e.key === "Enter" && handleThemeChange(theme.id)}
              className={`btn btn-sm ${
                selectedTheme === theme.id ? "btn-primary" : "btn-ghost btn-outline"
              }`}
              aria-label={`Sélectionner le thème ${theme.label}`}
              aria-pressed={selectedTheme === theme.id}
              tabIndex={0}
            >
              {theme.label}
            </button>
          ))}
        </div>

        {/* CV Preview scaled display */}
        <div className="flex justify-center">
          <div
            className="overflow-hidden rounded-xl shadow-2xl border border-base-300"
            style={{ width: `${CONTAINER_WIDTH}px`, height: `${CONTAINER_HEIGHT}px` }}
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

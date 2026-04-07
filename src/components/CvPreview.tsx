"use client";

import { forwardRef, useEffect, useState } from "react";
import type {
  Education,
  Experience,
  Hobby,
  Language,
  PersonalDetails,
  Skill,
} from "@/types/type";
import type { CvTemplateId, CvThemeColors } from "@/lib/cv-template";
import { cvThemeCssVars } from "@/lib/cv-template";
import { CvTemplateRouter } from "@/components/cv-templates/cv-template-router";

export interface CvPreviewProps {
  personalDetails: PersonalDetails;
  file: File | null;
  languages: Language[];
  skills: Skill[];
  hobbies: Hobby[];
  experiences: Experience[];
  educations: Education[];
  templateId: CvTemplateId;
  themeColors: CvThemeColors;
  download?: boolean;
}

function useCvPhotoSrc(file: File | null, photoUrl?: string | null): string | null {
  const [objectUrl, setObjectUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!file) {
      setObjectUrl(null);
      return;
    }
    const url = URL.createObjectURL(file);
    setObjectUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  if (objectUrl) return objectUrl;
  if (photoUrl?.trim()) return photoUrl;
  return null;
}

const CvPreview = forwardRef<HTMLDivElement, CvPreviewProps>(function CvPreview(
  {
    personalDetails,
    file,
    languages,
    skills,
    hobbies,
    experiences,
    educations,
    templateId,
    themeColors,
    download,
  },
  ref
) {
  const photoSrc = useCvPhotoSrc(file, personalDetails.photoUrl);
  const cssVars = cvThemeCssVars(themeColors);

  return (
    <div
      ref={ref}
      style={cssVars}
      className={`inline-block origin-top-left ${download ? "mb-10" : ""}`}
    >
      <CvTemplateRouter
        templateId={templateId}
        personalDetails={personalDetails}
        photoSrc={photoSrc}
        experiences={experiences}
        educations={educations}
        languages={languages}
        skills={skills}
        hobbies={hobbies}
        download={download}
      />
    </div>
  );
});

export default CvPreview;

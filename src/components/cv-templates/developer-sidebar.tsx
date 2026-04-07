"use client";

import type { Hobby } from "@/types/type";
import {
  formatExperiencePeriod,
  splitDescriptionToBullets,
} from "./cv-text-utils";
import type { CvTemplateLayoutProps } from "./commercial-sidebar";

function hobbyDisplay(h: Hobby): string {
  if (h.category?.trim() && h.detail?.trim()) return `${h.category} : ${h.detail}`;
  return h.name;
}

function LeftHeading({ children }: { children: string }) {
  return (
    <h3 className="mb-3 text-[11px] font-bold uppercase tracking-[0.2em] text-white">
      {children}
    </h3>
  );
}

export function CvTemplateDeveloperSidebar({
  personalDetails,
  photoSrc,
  experiences,
  educations,
  languages,
  skills,
  hobbies,
}: CvTemplateLayoutProps) {
  const summary =
    personalDetails.summary?.trim() ||
    personalDetails.description?.trim() ||
    "";

  return (
    <div className="flex min-h-[297mm] w-[210mm] max-w-full bg-[var(--cv-main-bg)] text-[13px] leading-relaxed text-[var(--cv-body)] shadow-lg print:shadow-none">
      <aside
        className="flex w-[33.333%] shrink-0 flex-col bg-[var(--cv-sidebar-bg)] px-6 py-8 text-[var(--cv-on-sidebar)]"
        style={{ backgroundColor: "var(--cv-sidebar-bg)" }}
      >
        <div className="relative mb-8 aspect-[3/4] w-full overflow-hidden bg-black/30">
          {photoSrc ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={photoSrc}
              alt=""
              className="h-full w-full object-cover object-top"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-xs text-white/40">
              Photo
            </div>
          )}
        </div>

        <div className="space-y-3 text-[12px] leading-relaxed text-white/90">
          {personalDetails.address ? <p className="break-words">{personalDetails.address}</p> : null}
          {personalDetails.email ? <p className="break-all">{personalDetails.email}</p> : null}
          {personalDetails.phone ? <p>{personalDetails.phone}</p> : null}
          {personalDetails.website ? <p className="break-all">{personalDetails.website}</p> : null}
        </div>

        <section className="mt-10">
          <LeftHeading>Langues</LeftHeading>
          <ul className="space-y-2 text-[12px] text-white/90">
            {languages.map((lang) => (
              <li key={lang.id ?? lang.language}>
                {lang.language}
                {lang.proficiency ? ` — ${lang.proficiency}` : ""}
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-8">
          <LeftHeading>Compétences</LeftHeading>
          <ul className="space-y-2 text-[12px] text-white/90">
            {skills.map((s) => (
              <li key={s.id ?? s.name}>{s.name}</li>
            ))}
          </ul>
        </section>

        <section className="mt-8">
          <LeftHeading>Centres d&apos;intérêts</LeftHeading>
          <ul className="space-y-2 text-[12px] text-white/90">
            {hobbies.map((h) => (
              <li key={h.id ?? h.name}>{hobbyDisplay(h)}</li>
            ))}
          </ul>
        </section>
      </aside>

      <div className="min-w-0 flex-1 px-10 py-10">
        <header className="mb-10">
          <h1 className="text-[28px] font-bold uppercase leading-tight tracking-tight text-[var(--cv-heading)]">
            {personalDetails.fullName}
          </h1>
          <p
            className="mt-3 text-sm font-semibold uppercase tracking-[0.15em] text-[var(--cv-accent)]"
            style={{ color: "var(--cv-accent)" }}
          >
            {personalDetails.postSeeking}
          </p>
          {summary ? (
            <p className="mt-6 text-left text-[13px] leading-relaxed text-[var(--cv-body)]">{summary}</p>
          ) : null}
        </header>

        <section className="mb-10">
          <h2 className="mb-6 text-lg font-bold uppercase tracking-wide text-[var(--cv-heading)]">
            Expériences professionnelles
          </h2>
          <ul className="space-y-8">
            {experiences.map((ex) => (
              <li key={ex.id ?? `${ex.companyName}-${ex.jobTitle}`}>
                <h3 className="text-base font-bold uppercase text-[var(--cv-heading)]">{ex.jobTitle}</h3>
                <p className="mt-1 text-[12px] text-[var(--cv-muted)]" style={{ color: "var(--cv-accent)" }}>
                  {ex.companyName}
                  {ex.location ? `, ${ex.location}` : ""}
                  {ex.startDate || ex.endDate
                    ? ` | ${formatExperiencePeriod(ex.startDate, ex.endDate)}`
                    : ""}
                </p>
                <ul className="mt-3 list-disc space-y-1 pl-5 text-[12px] text-[var(--cv-body)]">
                  {splitDescriptionToBullets(ex.description).map((line, i) => (
                    <li key={i}>{line}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="mb-6 text-lg font-bold uppercase tracking-wide text-[var(--cv-heading)]">
            Formations
          </h2>
          <ul className="space-y-6">
            {educations.map((ed) => (
              <li key={ed.id ?? `${ed.school}-${ed.degree}`}>
                <h3 className="text-base font-bold uppercase text-[var(--cv-heading)]">{ed.degree}</h3>
                <p className="mt-1 text-[12px] text-[var(--cv-muted)]" style={{ color: "var(--cv-accent)" }}>
                  {ed.school}
                  {ed.location ? `, ${ed.location}` : ""}
                  {ed.startDate || ed.endDate
                    ? ` | ${formatExperiencePeriod(ed.startDate, ed.endDate)}`
                    : ""}
                </p>
                {ed.description ? (
                  <p className="mt-2 text-[12px] text-[var(--cv-body)]">{ed.description}</p>
                ) : null}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}

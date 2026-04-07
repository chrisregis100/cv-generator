"use client";

import {
  Car,
  Globe,
  Mail,
  MapPin,
  Phone,
  Trophy,
} from "lucide-react";
import type {
  Education,
  Experience,
  Hobby,
  Language,
  PersonalDetails,
  Skill,
} from "@/types/type";
import {
  formatCvDateShort,
  formatEducationYear,
  spacedHeading,
  splitDescriptionToBullets,
} from "./cv-text-utils";

export interface CvTemplateLayoutProps {
  personalDetails: PersonalDetails;
  photoSrc: string | null;
  experiences: Experience[];
  educations: Education[];
  languages: Language[];
  skills: Skill[];
  hobbies: Hobby[];
  download?: boolean;
}

function SidebarSectionTitle({ children }: { children: string }) {
  return (
    <h3 className="mb-4 text-center text-[11px] font-semibold text-white/95">
      {spacedHeading(children)}
    </h3>
  );
}

function MainSectionTitle({ children }: { children: string }) {
  return (
    <div className="mb-5">
      <h2
        className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--cv-heading)]"
        style={{ letterSpacing: "0.28em" }}
      >
        {spacedHeading(children)}
      </h2>
      <div
        className="mt-2 h-1 w-14 rounded-sm"
        style={{ backgroundColor: "var(--cv-accent)" }}
        aria-hidden
      />
    </div>
  );
}

function hobbyDisplayLine(h: Hobby): string {
  if (h.category?.trim() && h.detail?.trim()) {
    return `${h.category.toUpperCase()} : ${h.detail}`;
  }
  return h.name;
}

export function CvTemplateCommercialSidebar({
  personalDetails,
  photoSrc,
  experiences,
  educations,
  languages,
  skills,
  hobbies,
}: CvTemplateLayoutProps) {
  const profileText =
    personalDetails.profileShort?.trim() ||
    personalDetails.description?.trim() ||
    "";

  return (
    <div className="flex min-h-[297mm] w-[210mm] max-w-full bg-[var(--cv-main-bg)] text-[13px] leading-relaxed text-[var(--cv-body)] shadow-lg print:shadow-none">
      {/* Sidebar */}
      <aside
        className="flex w-[33.333%] shrink-0 flex-col bg-[var(--cv-sidebar-bg)] text-[var(--cv-on-sidebar)]"
        style={{ backgroundColor: "var(--cv-sidebar-bg)" }}
      >
        <div className="relative aspect-[4/3] w-full shrink-0 overflow-hidden bg-black/20">
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

        <div className="flex flex-1 flex-col gap-9 px-6 py-8">
          <section>
            <SidebarSectionTitle>Profil</SidebarSectionTitle>
            <p className="text-center text-[12px] leading-relaxed text-white/90">{profileText}</p>
          </section>

          <section>
            <SidebarSectionTitle>Contact</SidebarSectionTitle>
            <ul className="space-y-3.5 text-[12px] text-white/90">
              <li className="flex gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-white" aria-hidden />
                <span className="break-words">{personalDetails.address}</span>
              </li>
              <li className="flex gap-3">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-white" aria-hidden />
                <span className="break-all">{personalDetails.email}</span>
              </li>
              <li className="flex gap-3">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-white" aria-hidden />
                <span>{personalDetails.phone}</span>
              </li>
              {personalDetails.website ? (
                <li className="flex gap-3">
                  <Globe className="mt-0.5 h-4 w-4 shrink-0 text-white" aria-hidden />
                  <span className="break-all">{personalDetails.website}</span>
                </li>
              ) : null}
              {personalDetails.driverLicense ? (
                <li className="flex gap-3">
                  <Car className="mt-0.5 h-4 w-4 shrink-0 text-white" aria-hidden />
                  <span>{personalDetails.driverLicense}</span>
                </li>
              ) : null}
            </ul>
          </section>

          <section>
            <SidebarSectionTitle>Intérêts</SidebarSectionTitle>
            <ul className="space-y-4 text-[12px] text-white/90">
              {hobbies.map((h) => (
                <li key={h.id ?? h.name} className="flex gap-3">
                  <Trophy className="mt-0.5 h-4 w-4 shrink-0 text-white" aria-hidden />
                  <span>{hobbyDisplayLine(h)}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </aside>

      {/* Main */}
      <div className="flex min-w-0 flex-1 flex-col px-10 py-10">
        <header className="mb-10">
          <h1 className="text-3xl font-bold tracking-tight text-[var(--cv-heading)]">
            {personalDetails.fullName}
          </h1>
          {personalDetails.postSeeking?.trim() ? (
            <p
              className="mt-2 text-sm font-semibold uppercase tracking-[0.28em] text-[var(--cv-heading)]"
              style={{ letterSpacing: "0.28em" }}
            >
              {spacedHeading(personalDetails.postSeeking.trim())}
            </p>
          ) : null}
        </header>

        <section className="mb-10">
          <MainSectionTitle>Formation</MainSectionTitle>
          <ul className="space-y-4">
            {educations.map((ed) => (
              <li key={ed.id ?? `${ed.school}-${ed.degree}`} className="text-[13px]">
                <p className="text-[var(--cv-heading)]">
                  <span className="font-bold">{formatEducationYear(ed.startDate)}</span>
                  <span className="font-bold"> — {ed.degree}</span>
                  <span> — {ed.school}</span>
                  {ed.location ? <span className="text-[var(--cv-muted)]">, {ed.location}</span> : null}
                </p>
                {ed.description ? (
                  <p className="mt-1 text-[12px] text-[var(--cv-muted)]">{ed.description}</p>
                ) : null}
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-10">
          <MainSectionTitle>Expérience</MainSectionTitle>
          <ul className="space-y-8">
            {experiences.map((ex) => (
              <li
                key={ex.id ?? `${ex.companyName}-${ex.jobTitle}`}
                className="grid grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] gap-x-6 gap-y-2"
              >
                <div>
                  <p className="text-[12px] font-medium text-[var(--cv-muted)]">
                    {formatCvDateShort(ex.startDate)}
                    {ex.endDate ? ` — ${formatCvDateShort(ex.endDate)}` : ""}
                  </p>
                  <p className="mt-1 text-sm font-bold text-[var(--cv-heading)]">{ex.companyName}</p>
                  {ex.location ? (
                    <p className="text-[11px] text-[var(--cv-muted)]">{ex.location}</p>
                  ) : null}
                </div>
                <div>
                  <p className="text-sm font-bold uppercase tracking-wide text-[var(--cv-heading)]">
                    {ex.jobTitle}
                  </p>
                  <ul className="mt-2 list-disc space-y-1 pl-4 text-[12px] text-[var(--cv-body)]">
                    {splitDescriptionToBullets(ex.description).map((line, i) => (
                      <li key={i}>{line}</li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-auto">
          <MainSectionTitle>Compétences</MainSectionTitle>
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h3 className="mb-3 text-[11px] font-bold uppercase tracking-wider text-[var(--cv-heading)]">
                Langues
              </h3>
              <ul className="space-y-2 text-[12px]">
                {languages.map((lang) => (
                  <li key={lang.id ?? lang.language}>
                    <span className="font-semibold text-[var(--cv-heading)]">{lang.language}</span>
                    <span className="text-[var(--cv-muted)]"> — {lang.proficiency}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="mb-3 text-[11px] font-bold uppercase tracking-wider text-[var(--cv-heading)]">
                Logiciels maîtrisés
              </h3>
              <ul className="space-y-2 text-[12px] text-[var(--cv-body)]">
                {skills.map((s) => (
                  <li key={s.id ?? s.name}>{s.name}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

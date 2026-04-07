import type { CSSProperties } from "react";

export const CV_TEMPLATE_IDS = ["commercial_sidebar", "developer_sidebar"] as const;

export type CvTemplateId = (typeof CV_TEMPLATE_IDS)[number];

export interface CvThemeColors {
  accent: string;
  sidebar: string;
}

export const CV_TEMPLATE_LABELS: Record<CvTemplateId, string> = {
  commercial_sidebar: "Commercial — sidebar & accents",
  developer_sidebar: "Professionnel — résumé & expériences",
};

export const DEFAULT_CV_THEMES: Record<CvTemplateId, CvThemeColors> = {
  commercial_sidebar: { accent: "#1e3a5f", sidebar: "#1e3a5f" },
  developer_sidebar: { accent: "#64748b", sidebar: "#0a0a0a" },
};

export function isCvTemplateId(value: string): value is CvTemplateId {
  return (CV_TEMPLATE_IDS as readonly string[]).includes(value);
}

export function normalizeTemplateId(value: string | null | undefined): CvTemplateId {
  if (value && isCvTemplateId(value)) return value;
  return "commercial_sidebar";
}

export function mergeCvTheme(
  templateId: CvTemplateId,
  stored: Partial<CvThemeColors> | null | undefined
): CvThemeColors {
  const defaults = DEFAULT_CV_THEMES[templateId];
  return {
    accent: typeof stored?.accent === "string" && stored.accent ? stored.accent : defaults.accent,
    sidebar: typeof stored?.sidebar === "string" && stored.sidebar ? stored.sidebar : defaults.sidebar,
  };
}

export function cvThemeCssVars(colors: CvThemeColors): CSSProperties {
  return {
    ["--cv-accent" as string]: colors.accent,
    ["--cv-sidebar-bg" as string]: colors.sidebar,
    ["--cv-main-bg" as string]: "#ffffff",
    ["--cv-on-sidebar" as string]: "#ffffff",
    ["--cv-heading" as string]: "#0f172a",
    ["--cv-body" as string]: "#334155",
    ["--cv-muted" as string]: "#64748b",
  };
}

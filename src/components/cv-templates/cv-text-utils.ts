export function splitDescriptionToBullets(text: string): string[] {
  const trimmed = text.trim();
  if (!trimmed) return [];
  const lines = trimmed
    .split(/\n+/)
    .map((line) => line.replace(/^[-•*]\s*/, "").trim())
    .filter(Boolean);
  return lines.length > 0 ? lines : [trimmed];
}

export function formatExperiencePeriod(startDate: string, endDate: string): string {
  if (!startDate && !endDate) return "";
  const start = formatCvDateShort(startDate);
  const end = endDate ? formatCvDateShort(endDate) : "Présent";
  if (!start) return end;
  return `${start} — ${end}`;
}

export function formatCvDateShort(iso: string): string {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("fr-FR", { day: "2-digit", month: "2-digit", year: "numeric" });
}

export function formatEducationYear(iso: string): string {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return String(d.getFullYear());
}

export function spacedHeading(text: string): string {
  return text.toUpperCase().split("").join(" ");
}

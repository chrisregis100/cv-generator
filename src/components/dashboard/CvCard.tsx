"use client";
import Link from "next/link";
import { deleteCv } from "@/lib/actions/cv";
import { Pencil, Trash2, ExternalLink } from "lucide-react";

interface CvCardProps {
  cv: {
    id: string;
    title: string;
    isPublished: boolean;
    slug: string | null;
    theme: string;
    updatedAt: Date;
  };
  /** When true the card is a read-only example (guest dashboard view) */
  isGuest?: boolean;
}

const CvCard = ({ cv, isGuest = false }: CvCardProps) => {
  const handleDelete = async () => {
    const confirmed = window.confirm(`Supprimer le CV "${cv.title}" ? Cette action est irréversible.`);
    if (!confirmed) return;
    await deleteCv(cv.id);
  };

  const formattedDate = new Intl.DateTimeFormat("fr-FR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(cv.updatedAt));

  return (
    <div
      className="brutal-card hover-lift flex flex-col gap-3 p-5"
    >
      <div className="flex items-start justify-between gap-2">
        <h2
          className="font-bold text-base leading-snug line-clamp-2"
          style={{ color: "var(--text-primary)" }}
        >
          {cv.title}
        </h2>
        <span className={`brutal-badge shrink-0 ${cv.isPublished ? "brutal-badge-success" : "brutal-badge-outline"}`}>
          {cv.isPublished ? "Publié" : "Brouillon"}
        </span>
      </div>

      <p className="text-xs" style={{ color: "var(--text-muted)" }}>
        Modifié le {formattedDate}
      </p>

      <div className="flex flex-wrap gap-2 mt-auto justify-end pt-2" style={{ borderTop: "1px solid var(--border-thick)" }}>
        {cv.isPublished && cv.slug && (
          <Link
            href={`/cv/${cv.slug}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-brutal-ghost px-3 py-1.5 text-xs flex items-center gap-1"
            aria-label={`Voir le CV ${cv.title}`}
          >
            <ExternalLink className="w-3.5 h-3.5" />
            Voir
          </Link>
        )}

        {isGuest ? (
          <Link
            href="/register"
            className="btn-brutal btn-brutal-sm flex items-center gap-1"
            aria-label="Créer un compte pour éditer"
          >
            <Pencil className="w-3.5 h-3.5" />
            Créer le mien
          </Link>
        ) : (
          <>
            <Link
              href={`/dashboard/cv/${cv.id}`}
              className="btn-brutal btn-brutal-sm flex items-center gap-1"
              aria-label={`Éditer le CV ${cv.title}`}
            >
              <Pencil className="w-3.5 h-3.5" />
              Éditer
            </Link>
            <button
              onClick={handleDelete}
              className="btn-brutal-danger flex items-center gap-1"
              aria-label={`Supprimer le CV ${cv.title}`}
            >
              <Trash2 className="w-3.5 h-3.5" />
              Supprimer
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default CvCard;

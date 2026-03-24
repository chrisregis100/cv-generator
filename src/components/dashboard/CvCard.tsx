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
}

const CvCard = ({ cv }: CvCardProps) => {
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
    <div className="card bg-base-100 shadow-md hover:shadow-lg transition-shadow">
      <div className="card-body gap-3">
        <div className="flex items-start justify-between gap-2">
          <h2 className="card-title text-base line-clamp-2">{cv.title}</h2>
          <span className={`badge badge-sm shrink-0 ${cv.isPublished ? "badge-success" : "badge-ghost"}`}>
            {cv.isPublished ? "Publié" : "Brouillon"}
          </span>
        </div>

        <p className="text-xs text-base-content/50">
          Modifié le {formattedDate}
        </p>

        <div className="card-actions justify-end flex-wrap gap-2 mt-2">
          {cv.isPublished && cv.slug && (
            <Link
              href={`/cv/${cv.slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost btn-sm gap-1"
              aria-label={`Voir le CV ${cv.title}`}
            >
              <ExternalLink className="w-3.5 h-3.5" />
              Voir
            </Link>
          )}
          <Link
            href={`/dashboard/cv/${cv.id}`}
            className="btn btn-primary btn-sm gap-1"
            aria-label={`Éditer le CV ${cv.title}`}
          >
            <Pencil className="w-3.5 h-3.5" />
            Éditer
          </Link>
          <button
            onClick={handleDelete}
            className="btn btn-error btn-sm btn-outline gap-1"
            aria-label={`Supprimer le CV ${cv.title}`}
          >
            <Trash2 className="w-3.5 h-3.5" />
            Supprimer
          </button>
        </div>
      </div>
    </div>
  );
};

export default CvCard;

"use client";
import { useState } from "react";
import { publishCv, unpublishCv } from "@/lib/actions/cv";
import { Globe, Copy, Check, Link2Off } from "lucide-react";

interface PublishModalProps {
  cv: {
    id: string;
    slug: string | null;
    isPublished: boolean;
    title: string;
  };
  modalId: string;
}

const slugify = (value: string) =>
  value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const PublishModal = ({ cv, modalId }: PublishModalProps) => {
  const [slug, setSlug] = useState(cv.slug ?? slugify(cv.title));
  const [isPublished, setIsPublished] = useState(cv.isPublished);
  const [currentSlug, setCurrentSlug] = useState(cv.slug);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const isSlugValid = /^[a-z0-9-]+$/.test(slug);
  const appUrl = typeof window !== "undefined" ? window.location.origin : "";

  const handlePublish = async () => {
    if (!isSlugValid) {
      setError("Le slug ne peut contenir que des lettres minuscules, chiffres et tirets.");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const result = await publishCv(cv.id, slug);
      setIsPublished(true);
      setCurrentSlug(result.slug);
      setSlug(result.slug);
    } catch {
      setError("Erreur lors de la publication. Réessayez.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleUnpublish = async () => {
    const confirmed = window.confirm("Dépublier ce CV ? Il ne sera plus accessible publiquement.");
    if (!confirmed) return;

    setIsLoading(true);
    setError(null);

    try {
      await unpublishCv(cv.id);
      setIsPublished(false);
    } catch {
      setError("Erreur lors de la dépublication. Réessayez.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyLink = async () => {
    if (!currentSlug) return;
    await navigator.clipboard.writeText(`${appUrl}/cv/${currentSlug}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSlugChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ""));
    setError(null);
  };

  return (
    <dialog id={modalId} className="modal">
      <div className="modal-box max-w-md">
        <form method="dialog">
          <button
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            aria-label="Fermer"
          >
            ✕
          </button>
        </form>

        <div className="flex items-center gap-3 mb-6">
          <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-primary/10">
            <Globe className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h2 className="text-lg font-bold">Publier le CV</h2>
            <p className="text-sm text-base-content/50">{cv.title}</p>
          </div>
        </div>

        {isPublished && currentSlug ? (
          <div className="mb-6">
            <div className="alert alert-success mb-4">
              <Check className="w-4 h-4" />
              <span className="text-sm">Ce CV est publié et accessible publiquement.</span>
            </div>

            <label className="label">
              <span className="label-text font-medium">Lien public</span>
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                readOnly
                value={`${appUrl}/cv/${currentSlug}`}
                className="input input-bordered input-sm flex-1 text-xs"
                aria-label="Lien public du CV"
              />
              <button
                onClick={handleCopyLink}
                className="btn btn-sm btn-primary"
                aria-label="Copier le lien"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            <div className="divider text-xs">Modifier le slug</div>
          </div>
        ) : null}

        <div className="mb-4">
          <label className="label" htmlFor="cv-slug">
            <span className="label-text font-medium">Slug (URL personnalisée)</span>
          </label>
          <div className="flex items-center gap-1">
            <span className="text-xs text-base-content/40 shrink-0">/cv/</span>
            <input
              id="cv-slug"
              type="text"
              value={slug}
              onChange={handleSlugChange}
              placeholder="mon-cv-developpeur"
              className={`input input-bordered input-sm flex-1 ${!isSlugValid && slug ? "input-error" : ""}`}
              aria-label="Slug du CV"
            />
          </div>
          {!isSlugValid && slug && (
            <p className="text-error text-xs mt-1">
              Uniquement : lettres minuscules, chiffres, tirets
            </p>
          )}
          <p className="text-xs text-base-content/40 mt-1">
            Exemple : mon-cv-developpeur-web
          </p>
        </div>

        {error && (
          <div className="alert alert-error mb-4 text-sm">
            <span>{error}</span>
          </div>
        )}

        <div className="flex flex-col gap-2">
          <button
            onClick={handlePublish}
            disabled={isLoading || !isSlugValid || !slug}
            className="btn btn-primary w-full"
            aria-label="Publier le CV"
          >
            {isLoading ? (
              <span className="loading loading-spinner loading-sm" />
            ) : (
              <Globe className="w-4 h-4" />
            )}
            {isPublished ? "Mettre à jour le slug" : "Publier"}
          </button>

          {isPublished && (
            <button
              onClick={handleUnpublish}
              disabled={isLoading}
              className="btn btn-ghost btn-sm text-error gap-1"
              aria-label="Dépublier le CV"
            >
              <Link2Off className="w-4 h-4" />
              Dépublier
            </button>
          )}
        </div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button aria-label="Fermer le modal">close</button>
      </form>
    </dialog>
  );
};

export default PublishModal;

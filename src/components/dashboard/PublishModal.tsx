"use client";
import { useState } from "react";
import { publishCv, unpublishCv } from "@/lib/actions/cv";
import { Globe, Copy, Check, Link2Off, Lock } from "lucide-react";
import UpgradeModal, { UpgradeModalTrigger } from "@/components/dashboard/UpgradeModal";

interface PublishModalProps {
  cv: {
    id: string;
    slug: string | null;
    isPublished: boolean;
    title: string;
  };
  modalId: string;
  isPremium: boolean;
}

const slugify = (value: string) =>
  value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const PublishModal = ({ cv, modalId, isPremium }: PublishModalProps) => {
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

      if ("error" in result && result.error) {
        setError(result.error);
        return;
      }

      if ("slug" in result && result.slug !== undefined) {
        setIsPublished(true);
        setCurrentSlug(result.slug);
        setSlug(result.slug);
      }
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
    <>
      <dialog id={modalId} className="modal">
        <div
          className="modal-box max-w-md"
          style={{
            backgroundColor: "var(--bg-card)",
            border: "2px solid var(--border-thick)",
            borderRadius: "var(--radius-brutal)",
          }}
        >
          <form method="dialog">
            <button
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              style={{ color: "var(--text-muted)" }}
              aria-label="Fermer"
            >
              ✕
            </button>
          </form>

          <div className="flex items-center gap-3 mb-6">
            <div
              className="inline-flex items-center justify-center w-10 h-10"
              style={{
                backgroundColor: "rgba(200,255,0,0.1)",
                border: "2px solid rgba(200,255,0,0.3)",
                borderRadius: "var(--radius-brutal)",
              }}
            >
              <Globe className="w-5 h-5" style={{ color: "var(--accent-lime)" }} />
            </div>
            <div>
              <h2
                className="text-lg font-bold"
                style={{ color: "var(--text-primary)" }}
              >
                Publier le CV
              </h2>
              <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                {cv.title}
              </p>
            </div>
          </div>

          {!isPremium ? (
            <div className="flex flex-col items-center gap-4 py-4 text-center">
              <div
                className="inline-flex items-center justify-center w-14 h-14"
                style={{
                  backgroundColor: "rgba(255,107,74,0.1)",
                  border: "2px solid rgba(255,107,74,0.3)",
                  borderRadius: "var(--radius-brutal)",
                }}
              >
                <Lock className="w-7 h-7" style={{ color: "var(--accent-coral)" }} />
              </div>
              <div>
                <p className="font-semibold mb-1" style={{ color: "var(--text-primary)" }}>
                  Publication Premium uniquement
                </p>
                <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                  Passez en Premium pour publier votre CV en ligne et partager son lien.
                </p>
              </div>
              <UpgradeModalTrigger
                label={
                  <span className="flex items-center gap-2">
                    <Globe className="w-4 h-4" />
                    Passer en Premium
                  </span>
                }
                ariaLabel="Passer en Premium pour publier"
              />
            </div>
          ) : (
            <>
              {isPublished && currentSlug ? (
                <div className="mb-6">
                  <div className="brutal-alert brutal-alert-success mb-4">
                    <Check className="w-4 h-4 shrink-0" style={{ color: "var(--accent-lime)" }} />
                    <span className="text-sm">Ce CV est publié et accessible publiquement.</span>
                  </div>

                  <label
                    className="block text-xs font-bold uppercase tracking-wider mb-2"
                    style={{ color: "var(--text-muted)" }}
                  >
                    Lien public
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      readOnly
                      value={`${appUrl}/cv/${currentSlug}`}
                      className="brutal-input text-xs"
                      aria-label="Lien public du CV"
                    />
                    <button
                      onClick={handleCopyLink}
                      className="btn-brutal px-3 py-1.5 flex items-center justify-center"
                      aria-label="Copier le lien"
                    >
                      {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>

                  <div
                    className="my-4 flex items-center gap-3"
                    style={{ color: "var(--text-muted)" }}
                  >
                    <div className="flex-1 h-px" style={{ backgroundColor: "var(--border-thick)" }} />
                    <span className="text-xs uppercase tracking-wider">Modifier le slug</span>
                    <div className="flex-1 h-px" style={{ backgroundColor: "var(--border-thick)" }} />
                  </div>
                </div>
              ) : null}

              <div className="mb-4">
                <label
                  className="block text-xs font-bold uppercase tracking-wider mb-2"
                  htmlFor="cv-slug"
                  style={{ color: "var(--text-muted)" }}
                >
                  Slug (URL personnalisée)
                </label>
                <div className="flex items-center gap-1">
                  <span className="text-xs shrink-0" style={{ color: "var(--text-muted)" }}>
                    /cv/
                  </span>
                  <input
                    id="cv-slug"
                    type="text"
                    value={slug}
                    onChange={handleSlugChange}
                    placeholder="mon-cv-developpeur"
                    className={`brutal-input flex-1 ${!isSlugValid && slug ? "error" : ""}`}
                    aria-label="Slug du CV"
                  />
                </div>
                {!isSlugValid && slug && (
                  <p className="text-xs mt-1" style={{ color: "var(--accent-coral)" }}>
                    Uniquement : lettres minuscules, chiffres, tirets
                  </p>
                )}
                <p className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>
                  Exemple : mon-cv-developpeur-web
                </p>
              </div>

              {error && (
                <div className="brutal-alert brutal-alert-error mb-4">
                  <span>{error}</span>
                </div>
              )}

              <div className="flex flex-col gap-2">
                <button
                  onClick={handlePublish}
                  disabled={isLoading || !isSlugValid || !slug}
                  className="btn-brutal w-full flex items-center justify-center gap-2 py-3"
                  aria-label="Publier le CV"
                >
                  {isLoading ? (
                    <span
                      className="loading loading-spinner loading-sm"
                      style={{ color: "var(--bg-deep)" }}
                    />
                  ) : (
                    <Globe className="w-4 h-4" />
                  )}
                  {isPublished ? "Mettre à jour le slug" : "Publier"}
                </button>

                {isPublished && (
                  <button
                    onClick={handleUnpublish}
                    disabled={isLoading}
                    className="btn-brutal-danger w-full flex items-center justify-center gap-1 py-2"
                    aria-label="Dépublier le CV"
                  >
                    <Link2Off className="w-4 h-4" />
                    Dépublier
                  </button>
                )}
              </div>
            </>
          )}
        </div>
        <form method="dialog" className="modal-backdrop">
          <button aria-label="Fermer le modal">close</button>
        </form>
      </dialog>

      {!isPremium && <UpgradeModal />}
    </>
  );
};

export default PublishModal;

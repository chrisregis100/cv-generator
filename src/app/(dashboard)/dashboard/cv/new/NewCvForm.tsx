"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createCv } from "@/lib/actions/cv";
import UpgradeModal, { UpgradeModalTrigger } from "@/components/dashboard/UpgradeModal";
import { ArrowLeft, LogIn, Plus } from "lucide-react";

interface NewCvFormProps {
  isGuest: boolean;
  /** Pre-fills the title input — used to restore the value after the login redirect. */
  initialTitle?: string;
}

export default function NewCvForm({ isGuest, initialTitle = "" }: NewCvFormProps) {
  const router = useRouter();
  const [title, setTitle] = useState(initialTitle);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showUpgrade, setShowUpgrade] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const trimmedTitle = title.trim();
    if (!trimmedTitle) return;

    if (isGuest) {
      router.push(`/login?redirect=${encodeURIComponent(`/dashboard/cv/new?title=${encodeURIComponent(trimmedTitle)}`)}`);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const result = await createCv(trimmedTitle);

      if ("error" in result && result.error) {
        setError(result.error);
        setShowUpgrade(true);
        return;
      }

      if ("cv" in result && result.cv) {
        router.push(`/dashboard/cv/${result.cv.id}`);
      }
    } catch {
      setError("Une erreur est survenue. Réessayez.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <Link
        href="/dashboard"
        className="btn-brutal-ghost inline-flex items-center gap-2 px-4 py-2 text-sm mb-6"
        aria-label="Retour au dashboard"
      >
        <ArrowLeft className="w-4 h-4" />
        Dashboard
      </Link>

      <div
        className="brutal-card p-6 flex flex-col gap-6"
      >
        <div>
          <h1
            className="text-2xl font-bold"
            style={{ color: "var(--text-primary)" }}
          >
            Créer un nouveau CV
          </h1>
          <p className="text-sm mt-1" style={{ color: "var(--text-muted)" }}>
            Donnez un titre à votre CV pour l&apos;identifier facilement.
          </p>
        </div>

        {isGuest && (
          <div className="brutal-alert brutal-alert-info">
            <LogIn className="w-4 h-4 shrink-0" style={{ color: "var(--accent-lime)" }} />
            <span className="text-sm">
              Vous devrez vous connecter pour sauvegarder votre CV. Saisissez un titre et nous vous redirigerons.
            </span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label
              className="block text-xs font-bold uppercase tracking-wider mb-2"
              htmlFor="cv-title"
              style={{ color: "var(--text-muted)" }}
            >
              Titre du CV
            </label>
            <input
              id="cv-title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ex: Mon CV Développeur Full Stack"
              className="brutal-input"
              autoFocus
              aria-label="Titre du CV"
              maxLength={255}
            />
          </div>

          {error && !showUpgrade && (
            <div className="brutal-alert brutal-alert-error">
              <span className="text-sm">{error}</span>
            </div>
          )}

          {showUpgrade && (
            <div className="brutal-alert brutal-alert-warning flex-col items-start gap-2">
              <span className="text-sm">{error}</span>
              <UpgradeModalTrigger />
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading || !title.trim()}
            className="btn-brutal w-full flex items-center justify-center gap-2 py-3 mt-2"
            aria-label={isGuest ? "Continuer vers la connexion" : "Créer le CV"}
          >
            {isLoading ? (
              <span
                className="loading loading-spinner loading-sm"
                style={{ color: "var(--bg-deep)" }}
              />
            ) : isGuest ? (
              <LogIn className="w-4 h-4" />
            ) : (
              <Plus className="w-4 h-4" />
            )}
            {isLoading ? "Chargement..." : isGuest ? "Continuer" : "Créer le CV"}
          </button>
        </form>
      </div>

      {showUpgrade && <UpgradeModal />}
    </div>
  );
}

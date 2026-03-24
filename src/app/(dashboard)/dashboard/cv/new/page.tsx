"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createCv } from "@/lib/actions/cv";
import UpgradeModal, { UpgradeModalTrigger } from "@/components/dashboard/UpgradeModal";
import { ArrowLeft, Plus } from "lucide-react";

export default function NewCvPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showUpgrade, setShowUpgrade] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const trimmedTitle = title.trim();
    if (!trimmedTitle) return;

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
        className="btn btn-ghost btn-sm gap-2 mb-6"
        aria-label="Retour au dashboard"
      >
        <ArrowLeft className="w-4 h-4" />
        Dashboard
      </Link>

      <div className="card bg-base-100 shadow-md">
        <div className="card-body gap-6">
          <div>
            <h1 className="text-2xl font-bold">Créer un nouveau CV</h1>
            <p className="text-base-content/50 text-sm mt-1">
              Donnez un titre à votre CV pour l&apos;identifier facilement.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="label" htmlFor="cv-title">
                <span className="label-text font-medium">Titre du CV</span>
              </label>
              <input
                id="cv-title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Ex: Mon CV Développeur Full Stack"
                className="input input-bordered w-full"
                autoFocus
                aria-label="Titre du CV"
                maxLength={255}
              />
            </div>

            {error && !showUpgrade && (
              <div className="alert alert-error text-sm">
                <span>{error}</span>
              </div>
            )}

            {showUpgrade && (
              <div className="alert alert-warning text-sm flex-col items-start gap-2">
                <span>{error}</span>
                <UpgradeModalTrigger />
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading || !title.trim()}
              className="btn btn-primary gap-2"
              aria-label="Créer le CV"
            >
              {isLoading ? (
                <span className="loading loading-spinner loading-sm" />
              ) : (
                <Plus className="w-4 h-4" />
              )}
              {isLoading ? "Création en cours..." : "Créer le CV"}
            </button>
          </form>
        </div>
      </div>

      {showUpgrade && <UpgradeModal />}
    </div>
  );
}

"use client";
import { useState } from "react";
import type { ReactNode } from "react";
import { Zap } from "lucide-react";

const MODAL_ID = "upgrade-modal";

interface UpgradeModalTriggerProps {
  label?: ReactNode;
  className?: string;
  ariaLabel?: string;
}

export const UpgradeModalTrigger = ({
  label,
  className = "btn-brutal",
  ariaLabel = "Passer en Premium",
}: UpgradeModalTriggerProps) => {
  const handleOpen = () => {
    const modal = document.getElementById(MODAL_ID) as HTMLDialogElement | null;
    modal?.showModal();
  };

  return (
    <button
      onClick={handleOpen}
      className={className}
      aria-label={ariaLabel}
    >
      {label ?? (
        <>
          <Zap className="w-4 h-4" />
          Nouveau CV
        </>
      )}
    </button>
  );
};

const UpgradeModal = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handlePay = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/feexpay/checkout", { method: "POST" });
      const data = await res.json();

      if (!res.ok || !data.payment_url) {
        setError("Erreur lors de l'initiation du paiement. Réessayez.");
        return;
      }

      window.location.href = data.payment_url;
    } catch {
      setError("Impossible de contacter le serveur de paiement.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    const modal = document.getElementById(MODAL_ID) as HTMLDialogElement | null;
    modal?.close();
  };

  return (
    <dialog id={MODAL_ID} className="modal">
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

        <div className="text-center mb-6">
          <div
            className="inline-flex items-center justify-center w-14 h-14 mb-4"
            style={{
              backgroundColor: "rgba(200,255,0,0.1)",
              border: "2px solid rgba(200,255,0,0.3)",
              borderRadius: "var(--radius-brutal)",
            }}
          >
            <Zap className="w-7 h-7" style={{ color: "var(--accent-lime)" }} />
          </div>
          <h2
            className="text-2xl font-bold mb-2"
            style={{ color: "var(--text-primary)" }}
          >
            Passez en Premium
          </h2>
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>
            Publiez en ligne, créez des CVs illimités et suivez les analytics
          </p>
        </div>

        <div
          className="p-4 mb-6"
          style={{
            backgroundColor: "var(--bg-elevated)",
            border: "2px solid var(--border-thick)",
            borderRadius: "var(--radius-brutal)",
          }}
        >
          <div className="flex items-center justify-between mb-3">
            <span className="font-semibold" style={{ color: "var(--text-primary)" }}>
              Premium — Accès à vie
            </span>
            <span
              className="text-2xl font-bold"
              style={{ color: "var(--accent-lime)" }}
            >
              9 900 FCFA
            </span>
          </div>
          <ul className="text-sm space-y-1.5" style={{ color: "var(--text-muted)" }}>
            <li className="flex items-center gap-2">
              <span style={{ color: "var(--accent-lime)" }}>✓</span> Publication en ligne (lien public)
            </li>
            <li className="flex items-center gap-2">
              <span style={{ color: "var(--accent-lime)" }}>✓</span> CVs illimités
            </li>
            <li className="flex items-center gap-2">
              <span style={{ color: "var(--accent-lime)" }}>✓</span> Analytics de vues détaillés
            </li>
            <li className="flex items-center gap-2">
              <span style={{ color: "var(--accent-lime)" }}>✓</span> Accès à vie, sans abonnement
            </li>
          </ul>
        </div>

        {error && (
          <div className="brutal-alert brutal-alert-error mb-4">
            <span>{error}</span>
          </div>
        )}

        <button
          onClick={handlePay}
          disabled={isLoading}
          className="btn-brutal w-full mb-4 flex items-center justify-center gap-2 py-3"
          aria-label="Payer avec FeexPay"
        >
          {isLoading ? (
            <>
              <span
                className="loading loading-spinner loading-sm"
                style={{ color: "var(--bg-deep)" }}
              />
              Redirection vers le paiement...
            </>
          ) : (
            <>
              <Zap className="w-4 h-4" />
              Payer avec FeexPay
            </>
          )}
        </button>

        <div className="flex items-center justify-center gap-3 flex-wrap">
          <p className="text-xs mr-1" style={{ color: "var(--text-muted)" }}>
            Méthodes acceptées :
          </p>
          <div className="flex items-center gap-2 flex-wrap">
            {["MTN Money", "Moov Money", "Wave"].map((method) => (
              <span
                key={method}
                className="brutal-badge brutal-badge-outline"
              >
                {method}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-4 flex justify-center">
          <button
            onClick={handleClose}
            className="btn-brutal-ghost px-4 py-2 text-sm"
            aria-label="Annuler"
          >
            Annuler
          </button>
        </div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button aria-label="Fermer le modal">close</button>
      </form>
    </dialog>
  );
};

export default UpgradeModal;

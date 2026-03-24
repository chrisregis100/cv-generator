"use client";
import { useState } from "react";
import { Zap } from "lucide-react";

const MODAL_ID = "upgrade-modal";

export const UpgradeModalTrigger = () => {
  const handleOpen = () => {
    const modal = document.getElementById(MODAL_ID) as HTMLDialogElement | null;
    modal?.showModal();
  };

  return (
    <button
      onClick={handleOpen}
      className="btn btn-primary"
      aria-label="Passer en Premium"
    >
      <Zap className="w-4 h-4" />
      Nouveau CV
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
      <div className="modal-box max-w-md">
        <form method="dialog">
          <button
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            aria-label="Fermer"
          >
            ✕
          </button>
        </form>

        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 mb-4">
            <Zap className="w-7 h-7 text-primary" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Passez en Premium</h2>
          <p className="text-base-content/60 text-sm">
            Créez des CVs illimités, analytics détaillés, accès à vie
          </p>
        </div>

        <div className="bg-base-200 rounded-xl p-4 mb-6">
          <div className="flex items-center justify-between mb-3">
            <span className="font-semibold">Premium — Accès à vie</span>
            <span className="text-2xl font-bold text-primary">9 900 FCFA</span>
          </div>
          <ul className="text-sm space-y-1.5 text-base-content/70">
            <li className="flex items-center gap-2">
              <span className="text-success">✓</span> CVs illimités
            </li>
            <li className="flex items-center gap-2">
              <span className="text-success">✓</span> Analytics de vues détaillés
            </li>
            <li className="flex items-center gap-2">
              <span className="text-success">✓</span> Export PDF haute qualité
            </li>
            <li className="flex items-center gap-2">
              <span className="text-success">✓</span> Accès à vie, sans abonnement
            </li>
          </ul>
        </div>

        {error && (
          <div className="alert alert-error mb-4 text-sm">
            <span>{error}</span>
          </div>
        )}

        <button
          onClick={handlePay}
          disabled={isLoading}
          className="btn btn-primary w-full mb-4"
          aria-label="Payer avec FeexPay"
        >
          {isLoading ? (
            <>
              <span className="loading loading-spinner loading-sm" />
              Redirection vers le paiement...
            </>
          ) : (
            <>
              <Zap className="w-4 h-4" />
              Payer avec FeexPay
            </>
          )}
        </button>

        <div className="flex items-center justify-center gap-4">
          <p className="text-xs text-base-content/40 mr-1">Méthodes acceptées :</p>
          <div className="flex items-center gap-3">
            <span className="badge badge-outline badge-sm">MTN Money</span>
            <span className="badge badge-outline badge-sm">Moov Money</span>
            <span className="badge badge-outline badge-sm">Wave</span>
          </div>
        </div>

        <div className="modal-action mt-4">
          <button
            onClick={handleClose}
            className="btn btn-ghost btn-sm"
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

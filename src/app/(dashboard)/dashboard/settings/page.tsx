"use client";

import { useState, useTransition } from "react";
import { authClient } from "@/lib/auth-client";
import { updateProfile, deleteAccount } from "@/lib/actions/user";
import { UpgradeModalTrigger } from "@/components/dashboard/UpgradeModal";
import UpgradeModal from "@/components/dashboard/UpgradeModal";
import {
  User,
  Mail,
  Lock,
  CreditCard,
  AlertTriangle,
  Save,
  Trash2,
  CheckCircle,
  XCircle,
  Zap,
} from "lucide-react";

interface UserData {
  id: string;
  name: string;
  email: string;
  plan?: string;
}

// Profile Section Component
function ProfileSection({ user }: { user: UserData }) {
  const [isPending, startTransition] = useTransition();
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleSubmit = (formData: FormData) => {
    setMessage(null);
    startTransition(async () => {
      const result = await updateProfile(formData);
      if (result.success) {
        setMessage({ type: "success", text: "Profil mis à jour avec succès" });
      } else if (result.error) {
        setMessage({ type: "error", text: result.error });
      }
    });
  };

  return (
    <section className="card bg-base-100 shadow-sm border border-base-200">
      <div className="card-body">
        <div className="flex items-center gap-2 mb-4">
          <User className="w-5 h-5 text-primary" />
          <h2 className="card-title text-lg">Profil</h2>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-3 p-3 bg-base-200 rounded-lg">
            <Mail className="w-4 h-4 text-base-content/60" />
            <div>
              <p className="text-sm text-base-content/60">Email</p>
              <p className="font-medium">{user.email}</p>
            </div>
          </div>

          <form action={handleSubmit} className="space-y-4">
            <div className="form-control">
              <label className="label" htmlFor="name">
                <span className="label-text">Nom complet</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                defaultValue={user.name}
                className="input input-bordered w-full"
                placeholder="Votre nom"
                maxLength={100}
                aria-label="Nom complet"
              />
            </div>

            {message && (
              <div
                className={`alert ${message.type === "success" ? "alert-success" : "alert-error"} text-sm`}
                role="alert"
              >
                {message.type === "success" ? (
                  <CheckCircle className="w-4 h-4" />
                ) : (
                  <XCircle className="w-4 h-4" />
                )}
                <span>{message.text}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={isPending}
              className="btn btn-primary btn-sm"
              aria-label="Enregistrer les modifications"
            >
              {isPending ? (
                <>
                  <span className="loading loading-spinner loading-xs" />
                  Enregistrement...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  Enregistrer
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

// Password Section Component
function PasswordSection() {
  const [isPending, startTransition] = useTransition();
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

    if (newPassword.length < 8) {
      setMessage({ type: "error", text: "Le nouveau mot de passe doit contenir au moins 8 caractères" });
      return;
    }

    if (newPassword !== confirmPassword) {
      setMessage({ type: "error", text: "Les mots de passe ne correspondent pas" });
      return;
    }

    startTransition(async () => {
      try {
        const result = await authClient.changePassword({
          currentPassword,
          newPassword,
        });

        if (result.error) {
          setMessage({ type: "error", text: "Mot de passe actuel incorrect ou erreur lors du changement" });
        } else {
          setMessage({ type: "success", text: "Mot de passe changé avec succès" });
          setCurrentPassword("");
          setNewPassword("");
          setConfirmPassword("");
        }
      } catch {
        setMessage({ type: "error", text: "Une erreur est survenue lors du changement de mot de passe" });
      }
    });
  };

  return (
    <section className="card bg-base-100 shadow-sm border border-base-200">
      <div className="card-body">
        <div className="flex items-center gap-2 mb-4">
          <Lock className="w-5 h-5 text-primary" />
          <h2 className="card-title text-lg">Sécurité</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="form-control">
            <label className="label" htmlFor="currentPassword">
              <span className="label-text">Mot de passe actuel</span>
            </label>
            <input
              type="password"
              id="currentPassword"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="input input-bordered w-full"
              placeholder="Votre mot de passe actuel"
              required
              aria-label="Mot de passe actuel"
            />
          </div>

          <div className="form-control">
            <label className="label" htmlFor="newPassword">
              <span className="label-text">Nouveau mot de passe</span>
            </label>
            <input
              type="password"
              id="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="input input-bordered w-full"
              placeholder="Minimum 8 caractères"
              minLength={8}
              required
              aria-label="Nouveau mot de passe"
            />
          </div>

          <div className="form-control">
            <label className="label" htmlFor="confirmPassword">
              <span className="label-text">Confirmer le nouveau mot de passe</span>
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="input input-bordered w-full"
              placeholder="Répétez le nouveau mot de passe"
              required
              aria-label="Confirmer le nouveau mot de passe"
            />
          </div>

          {message && (
            <div
              className={`alert ${message.type === "success" ? "alert-success" : "alert-error"} text-sm`}
              role="alert"
            >
              {message.type === "success" ? (
                <CheckCircle className="w-4 h-4" />
              ) : (
                <XCircle className="w-4 h-4" />
              )}
              <span>{message.text}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={isPending}
            className="btn btn-primary btn-sm"
            aria-label="Changer le mot de passe"
          >
            {isPending ? (
              <>
                <span className="loading loading-spinner loading-xs" />
                Changement en cours...
              </>
            ) : (
              <>
                <Lock className="w-4 h-4" />
                Changer le mot de passe
              </>
            )}
          </button>
        </form>
      </div>
    </section>
  );
}

// Plan Section Component
function PlanSection({ plan }: { plan: string }) {
  const isPremium = plan === "premium";

  return (
    <section className="card bg-base-100 shadow-sm border border-base-200">
      <div className="card-body">
        <div className="flex items-center gap-2 mb-4">
          <CreditCard className="w-5 h-5 text-primary" />
          <h2 className="card-title text-lg">Plan & Facturation</h2>
        </div>

        <div className="flex items-center justify-between p-4 bg-base-200 rounded-lg">
          <div className="flex items-center gap-3">
            <div className={`badge ${isPremium ? "badge-primary" : "badge-ghost"} badge-lg gap-1`}>
              <Zap className="w-3 h-3" />
              {isPremium ? "Premium" : "Gratuit"}
            </div>
            <div>
              <p className="font-medium">{isPremium ? "Plan Premium" : "Plan Gratuit"}</p>
              <p className="text-sm text-base-content/60">
                {isPremium
                  ? "Accès à vie avec CVs illimités et publication en ligne"
                  : "1 CV — édition, sauvegarde et PDF inclus. Premium : CV illimités, publication et analytics."}
              </p>
            </div>
          </div>
        </div>

        {!isPremium && (
          <div className="mt-4">
            <UpgradeModalTrigger />
          </div>
        )}

        {isPremium && (
          <div className="alert alert-success mt-4 text-sm">
            <CheckCircle className="w-4 h-4" />
            <span>Accès Premium actif — Merci de votre confiance</span>
          </div>
        )}
      </div>
    </section>
  );
}

// Delete Account Section Component
function DeleteAccountSection() {
  const [isPending, startTransition] = useTransition();
  const [showConfirm, setShowConfirm] = useState(false);
  const [confirmText, setConfirmText] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleDelete = () => {
    if (confirmText !== "SUPPRIMER") {
      setError("Veuillez taper SUPPRIMER pour confirmer");
      return;
    }

    setError(null);
    startTransition(async () => {
      const result = await deleteAccount();
      if (result && "error" in result) {
        setError(result.error ?? "Une erreur est survenue");
      }
    });
  };

  return (
    <section className="card bg-error/5 shadow-sm border border-error/20">
      <div className="card-body">
        <div className="flex items-center gap-2 mb-4">
          <AlertTriangle className="w-5 h-5 text-error" />
          <h2 className="card-title text-lg text-error">Zone dangereuse</h2>
        </div>

        <p className="text-sm text-base-content/70 mb-4">
          La suppression de votre compte est irréversible. Toutes vos données, y compris
          vos CVs, seront définitivement effacées.
        </p>

        {!showConfirm ? (
          <button
            onClick={() => setShowConfirm(true)}
            className="btn btn-error btn-sm"
            aria-label="Supprimer mon compte"
          >
            <Trash2 className="w-4 h-4" />
            Supprimer mon compte
          </button>
        ) : (
          <div className="space-y-4">
            <div className="alert alert-warning text-sm">
              <AlertTriangle className="w-4 h-4" />
              <span>
                Cette action est irréversible. Tapez <strong>SUPPRIMER</strong> pour
                confirmer.
              </span>
            </div>

            <input
              type="text"
              value={confirmText}
              onChange={(e) => setConfirmText(e.target.value)}
              className="input input-bordered w-full input-error"
              placeholder="Tapez SUPPRIMER"
              aria-label="Confirmation de suppression"
            />

            {error && (
              <div className="alert alert-error text-sm" role="alert">
                <XCircle className="w-4 h-4" />
                <span>{error}</span>
              </div>
            )}

            <div className="flex gap-2">
              <button
                onClick={() => {
                  setShowConfirm(false);
                  setConfirmText("");
                  setError(null);
                }}
                className="btn btn-ghost btn-sm"
                aria-label="Annuler la suppression"
              >
                Annuler
              </button>
              <button
                onClick={handleDelete}
                disabled={isPending}
                className="btn btn-error btn-sm"
                aria-label="Confirmer la suppression du compte"
              >
                {isPending ? (
                  <>
                    <span className="loading loading-spinner loading-xs" />
                    Suppression...
                  </>
                ) : (
                  <>
                    <Trash2 className="w-4 h-4" />
                    Confirmer la suppression
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

// Main Settings Page
export default function SettingsPage() {
  const { data: session, isPending } = authClient.useSession();

  if (isPending) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <div className="flex items-center justify-center h-64">
          <span className="loading loading-spinner loading-lg" />
        </div>
      </div>
    );
  }

  if (!session?.user) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <div className="alert alert-error">
          <XCircle className="w-5 h-5" />
          <span>Vous devez être connecté pour accéder à cette page</span>
        </div>
      </div>
    );
  }

  const user: UserData = {
    id: session.user.id,
    name: session.user.name ?? "",
    email: session.user.email ?? "",
    plan: (session.user as { plan?: string }).plan ?? "free",
  };

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <div className="flex items-center gap-2 mb-6">
        <h1 className="text-3xl font-bold">Paramètres</h1>
      </div>

      <ProfileSection user={user} />
      <PasswordSection />
      <PlanSection plan={user.plan ?? "free"} />
      <DeleteAccountSection />

      <UpgradeModal />
    </div>
  );
}

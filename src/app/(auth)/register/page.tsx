"use client";

import { useState } from "react";
import Link from "next/link";
import { signUp } from "@/lib/auth-client";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }

    if (password.length < 8) {
      setError("Le mot de passe doit contenir au moins 8 caractères.");
      return;
    }

    setIsLoading(true);

    const { error: signUpError } = await signUp.email({
      name,
      email,
      password,
      callbackURL: "/dashboard",
    });

    if (signUpError) {
      setError(signUpError.message || "Erreur lors de la création du compte");
      setIsLoading(false);
    }
  };

  return (
    <div className="brutal-card p-8 flex flex-col gap-6">
      {/* Logo / App name */}
      <div className="flex flex-col items-center gap-2">
        <div
          className="flex items-center justify-center w-12 h-12 font-bold text-xl"
          style={{
            backgroundColor: "var(--accent-lime)",
            color: "var(--bg-deep)",
            borderRadius: "var(--radius-brutal)",
          }}
        >
          CV
        </div>
        <h1
          className="text-2xl font-bold tracking-widest uppercase"
          style={{ color: "var(--text-primary)" }}
        >
          CV<span style={{ color: "var(--accent-lime)" }}>Gen</span>
        </h1>
        <p className="text-sm" style={{ color: "var(--text-muted)" }}>
          Créer un compte
        </p>
      </div>

      {error && (
        <div role="alert" className="brutal-alert brutal-alert-error">
          <span className="text-sm">{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
        <div className="flex flex-col gap-1">
          <label
            htmlFor="name"
            className="text-xs font-bold uppercase tracking-wider"
            style={{ color: "var(--text-muted)" }}
          >
            Nom complet
          </label>
          <input
            id="name"
            type="text"
            autoComplete="name"
            required
            placeholder="Jean Dupont"
            className="brutal-input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={isLoading}
            aria-label="Nom complet"
            tabIndex={0}
          />
        </div>

        <div className="flex flex-col gap-1">
          <label
            htmlFor="email"
            className="text-xs font-bold uppercase tracking-wider"
            style={{ color: "var(--text-muted)" }}
          >
            Adresse email
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            required
            placeholder="vous@exemple.com"
            className="brutal-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoading}
            aria-label="Adresse email"
            tabIndex={0}
          />
        </div>

        <div className="flex flex-col gap-1">
          <label
            htmlFor="password"
            className="text-xs font-bold uppercase tracking-wider"
            style={{ color: "var(--text-muted)" }}
          >
            Mot de passe
          </label>
          <input
            id="password"
            type="password"
            autoComplete="new-password"
            required
            placeholder="••••••••"
            className="brutal-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoading}
            aria-label="Mot de passe"
            tabIndex={0}
          />
          <p className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>
            Minimum 8 caractères
          </p>
        </div>

        <div className="flex flex-col gap-1">
          <label
            htmlFor="confirmPassword"
            className="text-xs font-bold uppercase tracking-wider"
            style={{ color: "var(--text-muted)" }}
          >
            Confirmer le mot de passe
          </label>
          <input
            id="confirmPassword"
            type="password"
            autoComplete="new-password"
            required
            placeholder="••••••••"
            className="brutal-input"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            disabled={isLoading}
            aria-label="Confirmer le mot de passe"
            tabIndex={0}
          />
        </div>

        <button
          type="submit"
          className="btn-brutal w-full flex items-center justify-center gap-2 py-3 mt-2"
          disabled={isLoading}
          aria-label="Créer mon compte"
          tabIndex={0}
        >
          {isLoading ? (
            <>
              <span
                className="loading loading-spinner loading-sm"
                style={{ color: "var(--bg-deep)" }}
                aria-hidden="true"
              />
              Création en cours…
            </>
          ) : (
            "Créer mon compte"
          )}
        </button>
      </form>

      <div className="flex flex-col items-center gap-2 text-sm">
        <p style={{ color: "var(--text-muted)" }}>
          Déjà un compte ?{" "}
          <Link
            href="/login"
            className="font-semibold underline underline-offset-4 hover:opacity-90"
            style={{ color: "var(--accent-lime)" }}
            tabIndex={0}
          >
            Se connecter
          </Link>
        </p>
        <Link
          href="/"
          className="text-xs hover:opacity-80 transition-opacity"
          style={{ color: "var(--text-muted)" }}
          tabIndex={0}
        >
          ← Retour à l&apos;accueil
        </Link>
      </div>
    </div>
  );
}

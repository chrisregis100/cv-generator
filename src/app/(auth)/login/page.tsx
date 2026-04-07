"use client";

import { useState } from "react";
import Link from "next/link";
import { signIn } from "@/lib/auth-client";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const { error: signInError } = await signIn.email({
      email,
      password,
      callbackURL: "/dashboard",
    });

    if (signInError) {
      setError(signInError.message || "Erreur de connexion");
      setIsLoading(false);
    }
  };

  return (
    <div
      className="brutal-card p-8 flex flex-col gap-6"
    >
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
          Connectez-vous à votre compte
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
            autoComplete="current-password"
            required
            placeholder="••••••••"
            className="brutal-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoading}
            aria-label="Mot de passe"
            tabIndex={0}
          />
        </div>

        <button
          type="submit"
          className="btn-brutal w-full flex items-center justify-center gap-2 py-3 mt-2"
          disabled={isLoading}
          aria-label="Se connecter"
          tabIndex={0}
        >
          {isLoading ? (
            <>
              <span
                className="loading loading-spinner loading-sm"
                style={{ color: "var(--bg-deep)" }}
                aria-hidden="true"
              />
              Connexion en cours…
            </>
          ) : (
            "Se connecter"
          )}
        </button>
      </form>

      <div className="flex flex-col items-center gap-2 text-sm">
        <p style={{ color: "var(--text-muted)" }}>
          Pas encore de compte ?{" "}
          <Link
            href="/register"
            className="font-semibold underline underline-offset-4 hover:opacity-90"
            style={{ color: "var(--accent-lime)" }}
            tabIndex={0}
          >
            S&apos;inscrire
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

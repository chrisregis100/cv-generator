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
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body gap-6">
        {/* Logo / App name */}
        <div className="flex flex-col items-center gap-2">
          <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-primary text-primary-content font-bold text-xl">
            CV
          </div>
          <h1 className="text-2xl font-bold tracking-tight">CVGen</h1>
          <p className="text-base-content/60 text-sm">
            Connectez-vous à votre compte
          </p>
        </div>

        {/* Error alert */}
        {error && (
          <div role="alert" className="alert alert-error">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"
              />
            </svg>
            <span className="text-sm">{error}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
          <div className="form-control gap-1">
            <label htmlFor="email" className="label">
              <span className="label-text font-medium">Adresse email</span>
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              required
              placeholder="vous@exemple.com"
              className="input input-bordered w-full"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
              aria-label="Adresse email"
              tabIndex={0}
            />
          </div>

          <div className="form-control gap-1">
            <label htmlFor="password" className="label">
              <span className="label-text font-medium">Mot de passe</span>
            </label>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              required
              placeholder="••••••••"
              className="input input-bordered w-full"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
              aria-label="Mot de passe"
              tabIndex={0}
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary w-full mt-2"
            disabled={isLoading}
            aria-label="Se connecter"
            tabIndex={0}
          >
            {isLoading ? (
              <>
                <span className="loading loading-spinner loading-sm" aria-hidden="true" />
                Connexion en cours…
              </>
            ) : (
              "Se connecter"
            )}
          </button>
        </form>

        {/* Footer links */}
        <div className="flex flex-col items-center gap-2 text-sm">
          <p className="text-base-content/60">
            Pas encore de compte ?{" "}
            <Link
              href="/register"
              className="link link-primary font-medium"
              tabIndex={0}
            >
              S&apos;inscrire
            </Link>
          </p>
          <Link
            href="/"
            className="link link-ghost text-base-content/40 text-xs"
            tabIndex={0}
          >
            ← Retour à l&apos;accueil
          </Link>
        </div>
      </div>
    </div>
  );
}

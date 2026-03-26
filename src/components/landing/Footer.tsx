import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="px-6 sm:px-10 py-12"
      style={{
        backgroundColor: "var(--bg-deep)",
        borderTop: "3px solid var(--accent-lime)",
      }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-8">
          {/* Left — Logo + tagline */}
          <div>
            <Link
              href="/"
              className="text-xl font-bold tracking-[0.2em] uppercase"
              style={{ color: "var(--text-primary)" }}
              aria-label="CVGen — Accueil"
            >
              CV<span style={{ color: "var(--accent-lime)" }}>Gen</span>
            </Link>
            <p
              className="text-xs mt-2 uppercase tracking-wider"
              style={{ color: "var(--text-muted)" }}
            >
              Créez votre CV pro en quelques minutes
            </p>
          </div>

          {/* Center — Legal links */}
          <nav className="flex items-center gap-4 text-xs" aria-label="Liens légaux">
            <Link
              href="/cgu"
              className="uppercase tracking-wider font-medium transition-colors duration-200"
              style={{ color: "var(--text-muted)" }}
              aria-label="Conditions Générales d'Utilisation"
            >
              CGU
            </Link>
            <span style={{ color: "var(--border-thick)" }}>|</span>
            <Link
              href="/politique-confidentialite"
              className="uppercase tracking-wider font-medium transition-colors duration-200"
              style={{ color: "var(--text-muted)" }}
              aria-label="Politique de confidentialité"
            >
              Confidentialité
            </Link>
          </nav>

          {/* Right — Payment + copyright */}
          <div className="flex flex-col items-start sm:items-end gap-3">
            <div className="flex gap-2">
              {["MTN Money", "Moov Money", "Wave"].map((method) => (
                <span
                  key={method}
                  className="px-3 py-1 text-xs font-bold uppercase tracking-wider"
                  style={{
                    border: "1px solid var(--border-thick)",
                    borderRadius: "var(--radius-brutal)",
                    color: "var(--text-muted)",
                  }}
                >
                  {method}
                </span>
              ))}
            </div>
            <p className="text-xs" style={{ color: "var(--text-muted)" }}>
              © {currentYear} CVGen. Tous droits réservés.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer footer-center bg-base-200 border-t border-base-300 p-10">
      <div className="flex flex-col items-center gap-4">
        {/* Logo + Tagline */}
        <div className="flex flex-col items-center gap-2">
          <Link
            href="/"
            className="text-xl font-bold text-primary"
            aria-label="CVGen — Accueil"
          >
            CVGen
          </Link>
          <p className="text-sm text-base-content/70">
            Créez votre CV professionnel en quelques minutes
          </p>
        </div>

        {/* Legal Links */}
        <nav className="flex items-center gap-4 text-sm" aria-label="Liens légaux">
          <Link
            href="/cgu"
            className="link link-hover text-base-content/70 hover:text-primary"
            aria-label="Conditions Générales d'Utilisation"
          >
            CGU
          </Link>
          <span className="text-base-content/30">·</span>
          <Link
            href="/politique-confidentialite"
            className="link link-hover text-base-content/70 hover:text-primary"
            aria-label="Politique de confidentialité"
          >
            Politique de confidentialité
          </Link>
        </nav>

        {/* Payment Methods */}
        <div className="flex items-center gap-3 mt-2">
          <span className="text-xs text-base-content/40">Paiements :</span>
          <div className="flex gap-2">
            <span className="badge badge-outline badge-sm">MTN Money</span>
            <span className="badge badge-outline badge-sm">Moov Money</span>
            <span className="badge badge-outline badge-sm">Wave</span>
          </div>
        </div>

        {/* Copyright */}
        <p className="text-sm text-base-content/50 mt-4">
          © {currentYear} CVGen. Tous droits réservés.
        </p>
      </div>
    </footer>
  );
}

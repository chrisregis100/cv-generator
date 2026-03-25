import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Politique de confidentialité — CVGen",
  description: "Politique de confidentialité de CVGen",
};

export default function PolitiqueConfidentialitePage() {
  return (
    <main className="min-h-screen bg-base-100 py-12 px-4">
      <article className="prose prose-lg max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">Politique de confidentialité</h1>
        <p className="text-base-content/60 mb-8">
          Dernière mise à jour : mars 2026
        </p>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">1. Données collectées</h2>
          <p>
            Nous collectons uniquement les données nécessaires au fonctionnement du service :
          </p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>
              <strong>Identifiants</strong> : adresse email et mot de passe (hashé)
            </li>
            <li>
              <strong>Profil</strong> : nom et prénom (optionnel)
            </li>
            <li>
              <strong>Données de paiement</strong> : identifiant de transaction FeexPay
              (pas de données bancaires)
            </li>
            <li>
              <strong>Contenus créés</strong> : CVs, informations personnelles saisies
              dans le générateur
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">2. Utilisation des données</h2>
          <p>
            Les données collectées sont utilisées uniquement pour :
          </p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>Gérer votre compte et authentifier votre session</li>
            <li>Fournir le service de création de CV</li>
            <li>Gérer les paiements et accès Premium</li>
            <li>Vous contacter en cas de besoin lié à votre compte</li>
          </ul>
          <p className="mt-2">
            Nous ne vendons ni ne partageons vos données personnelles avec des tiers
            à des fins commerciales.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">3. Stockage et sécurité</h2>
          <p>
            Vos données sont stockées sur des serveurs sécurisés hébergés par Neon
            (Postgres cloud). Nous mettons en œuvre les mesures techniques et
            organisationnelles appropriées pour protéger vos données contre tout accès
            non autorisé, modification ou destruction.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">4. Cookies</h2>
          <p>
            CVGen utilise uniquement des cookies strictement nécessaires à
            l&apos;authentification et au fonctionnement du service (session utilisateur).
            Aucun cookie publicitaire ou de traçage tiers n&apos;est utilisé.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">5. Droits de l&apos;utilisateur</h2>
          <p>
            Conformément au RGPD et à la législation applicable, vous disposez des droits
            suivants :
          </p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>Droit d&apos;accès à vos données personnelles</li>
            <li>Droit de rectification des données inexactes</li>
            <li>Droit à l&apos;effacement de vos données (droit à l&apos;oubli)</li>
            <li>Droit à la portabilité de vos données</li>
            <li>Droit d&apos;opposition au traitement</li>
          </ul>
          <p className="mt-2">
            Pour exercer ces droits, contactez-nous via les informations fournies ci-dessous.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">6. Suppression de compte</h2>
          <p>
            Vous pouvez supprimer votre compte à tout moment depuis les paramètres de
            votre compte. Cette action est irréversible et entraîne la suppression
            définitive de toutes vos données personnelles et CVs associés.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">7. Contact</h2>
          <p>
            Pour toute question concernant cette politique de confidentialité ou pour
            exercer vos droits, contactez-nous à :
          </p>
          <p className="mt-2">
            <a href="mailto:contact@cvgen.app" className="link link-primary">
              contact@cvgen.app
            </a>
          </p>
        </section>
      </article>
    </main>
  );
}

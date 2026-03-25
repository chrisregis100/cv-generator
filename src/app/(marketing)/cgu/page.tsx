import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CGU — CVGen",
  description: "Conditions Générales d'Utilisation de CVGen",
};

export default function CguPage() {
  return (
    <main className="min-h-screen bg-base-100 py-12 px-4">
      <article className="prose prose-lg max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">Conditions Générales d&apos;Utilisation</h1>
        <p className="text-base-content/60 mb-8">
          Dernière mise à jour : mars 2026
        </p>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">1. Acceptation des CGU</h2>
          <p>
            En accédant et en utilisant CVGen, vous acceptez pleinement et sans réserve
            les présentes Conditions Générales d&apos;Utilisation. Si vous n&apos;acceptez pas
            ces conditions, veuillez ne pas utiliser notre service.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">2. Description du service</h2>
          <p>
            CVGen est un générateur de CV en ligne qui permet aux utilisateurs de créer,
            personnaliser et partager des curriculum vitae professionnels. Le service
            propose deux plans :
          </p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>
              <strong>Plan Gratuit</strong> : Création d&apos;un CV avec accès aux
              fonctionnalités de base
            </li>
            <li>
              <strong>Plan Premium</strong> : Création de CVs illimités avec
              fonctionnalités avancées
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">3. Comptes utilisateurs</h2>
          <p>
            Pour accéder à certaines fonctionnalités, vous devez créer un compte en
            fournissant une adresse email valide et un mot de passe sécurisé. Vous êtes
            responsable de la confidentialité de vos identifiants et de toutes les
            activités effectuées sous votre compte.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">4. Plans et paiements</h2>
          <p>
            Le plan Premium est disponible moyennant un paiement unique de 9 900 FCFA,
            effectué via FeexPay (MTN Money, Moov Money, Wave). Ce paiement donne droit
            à un accès à vie sans abonnement récurrent.
          </p>
          <p className="mt-2">
            Limites des plans :
          </p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>
              <strong>Gratuit</strong> : 1 CV maximum
            </li>
            <li>
              <strong>Premium</strong> : CVs illimités
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">5. Propriété intellectuelle</h2>
          <p>
            CVGen et tous ses éléments (logos, interfaces, code) sont protégés par le
            droit de la propriété intellectuelle. L&apos;utilisateur conserve tous les droits
            sur les contenus qu&apos;il crée via la plateforme (CVs, données personnelles).
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">6. Limitation de responsabilité</h2>
          <p>
            CVGen met tout en œuvre pour assurer la disponibilité et la sécurité du
            service, mais ne peut garantir un fonctionnement sans interruption. En aucun
            cas, CVGen ne pourra être tenu responsable des dommages directs ou indirects
            résultant de l&apos;utilisation ou de l&apos;impossibilité d&apos;utiliser le service.
          </p>
        </section>
      </article>
    </main>
  );
}

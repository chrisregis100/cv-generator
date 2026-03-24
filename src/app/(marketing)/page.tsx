import HeroSection from "@/components/landing/HeroSection";
import FeaturesSection from "@/components/landing/FeaturesSection";
import CvShowcase from "@/components/landing/CvShowcase";
import PricingSection from "@/components/landing/PricingSection";

export const metadata = {
  title: "CV Generator — Créez votre CV professionnel en ligne",
  description:
    "Créez, personnalisez et partagez votre CV en quelques minutes. Téléchargez en PDF ou publiez en ligne.",
};

export default function LandingPage() {
  return (
    <main>
      <HeroSection />
      <FeaturesSection />
      <CvShowcase />
      <PricingSection />
    </main>
  );
}

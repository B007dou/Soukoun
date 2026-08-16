import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { I18nProvider } from "@/lib/i18n";
import { Header } from "@/components/sokoun/Header";
import { Hero } from "@/components/sokoun/Hero";
import { Practitioners } from "@/components/sokoun/Practitioners";
import { Blog } from "@/components/sokoun/Blog";
import { About } from "@/components/sokoun/About";
import { Footer } from "@/components/sokoun/Footer";
import { EmergencyModal } from "@/components/sokoun/EmergencyModal";
import { EmergencyFab } from "@/components/sokoun/EmergencyFab";
import { AuthModal, type AuthMode } from "@/components/sokoun/AuthModal";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Sokoun · سكون — Plateforme de santé mentale en Tunisie" },
      {
        name: "description",
        content:
          "Sokoun (سكون) accompagne les jeunes adultes en Tunisie vers la sérénité : praticiens vérifiés, ressources apaisantes et soutien d'urgence confidentiel.",
      },
      { property: "og:title", content: "Sokoun · سكون — Sérénité & tranquillité" },
      {
        property: "og:description",
        content: "Trouvez votre sérénité avec des praticiens qualifiés et un soutien bienveillant.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  const [emergencyOpen, setEmergencyOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<AuthMode>("signin");

  const handleOpenSignIn = () => {
    setAuthMode("signin");
    setAuthOpen(true);
  };

  const handleOpenSignUp = () => {
    setAuthMode("signup");
    setAuthOpen(true);
  };

  return (
    <I18nProvider>
      <div className="min-h-screen bg-background">
        <Header
          onEmergency={() => setEmergencyOpen(true)}
          onSignIn={handleOpenSignIn}
          onSignUp={handleOpenSignUp}
        />
        <main>
          <Hero />
          <Practitioners />
          <Blog />
          <About />
        </main>
        <Footer />
        <EmergencyFab onClick={() => setEmergencyOpen(true)} />
        <EmergencyModal open={emergencyOpen} onClose={() => setEmergencyOpen(false)} />
        <AuthModal
          open={authOpen}
          initialMode={authMode}
          onClose={() => setAuthOpen(false)}
        />
      </div>
    </I18nProvider>
  );
}

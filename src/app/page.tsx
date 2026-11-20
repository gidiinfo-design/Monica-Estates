"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import Footer from "@/components/Footer";
import LaunchPage, { LAUNCH_DATE_TIMESTAMP } from "@/components/LaunchPage";
import BalloonsAndConfetti from "@/components/BalloonsAndConfetti";

// Dynamic imports for client components with animations
const HeroSection = dynamic(() => import("@/components/HeroSection"), {
  ssr: false,
  loading: () => <div className="h-screen bg-bg-primary" />,
});

const AboutSection = dynamic(() => import("@/components/AboutSection"), {
  ssr: false,
  loading: () => <div className="h-96 bg-bg-primary" />,
});

const WhatWeDoSection = dynamic(() => import("@/components/WhatWeDoSection"), {
  ssr: false,
  loading: () => <div className="h-96 bg-bg-primary" />,
});

const WhereWeWorkSection = dynamic(
  () => import("@/components/WhereWeWorkSection"),
  {
    ssr: false,
    loading: () => <div className="h-96 bg-bg-primary" />,
  }
);

const WhoWeServeSection = dynamic(
  () => import("@/components/WhoWeServeSection"),
  {
    ssr: false,
    loading: () => <div className="h-96 bg-bg-primary" />,
  }
);

const LandPricesSection = dynamic(
  () => import("@/components/LandPricesSection"),
  {
    ssr: false,
    loading: () => <div className="h-96 bg-bg-primary" />,
  }
);

const DholeraSection = dynamic(() => import("@/components/DholeraSection"), {
  ssr: false,
  loading: () => <div className="h-96 bg-bg-primary" />,
});

const RecentClientsSection = dynamic(
  () => import("@/components/RecentClientsSection"),
  {
    ssr: false,
    loading: () => <div className="h-96 bg-bg-primary" />,
  }
);

const ContactSection = dynamic(() => import("@/components/ContactSection"), {
  ssr: false,
  loading: () => <div className="h-96 bg-bg-primary" />,
});

export default function Home() {
  const [isLaunched, setIsLaunched] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const checkLaunch = () => {
      const now = Date.now();
      const urlParams =
        typeof window !== "undefined"
          ? new URLSearchParams(window.location.search)
          : null;
      const forceCelebrate = urlParams?.get("celebrate") === "true";

      if (now >= LAUNCH_DATE_TIMESTAMP || forceCelebrate) {
        setIsLaunched(true);
        // Show celebration during initial launch window (first 48h) or if testing with ?celebrate=true
        const isRecentLaunch =
          now < LAUNCH_DATE_TIMESTAMP + 48 * 60 * 60 * 1000;
        if (isRecentLaunch || forceCelebrate) {
          setShowCelebration(true);
        }
      }
    };

    checkLaunch();
    const interval = setInterval(checkLaunch, 500);
    return () => clearInterval(interval);
  }, []);

  // During pre-launch (before Nov 21 12:00 AM IST), show LaunchPage
  if (!mounted) {
    return <div className="min-h-screen bg-bg-primary" />;
  }

  if (!isLaunched) {
    return (
      <LaunchPage
        onLaunch={() => {
          setIsLaunched(true);
          setShowCelebration(true);
        }}
      />
    );
  }

  return (
    <>
      {showCelebration && (
        <BalloonsAndConfetti onDismiss={() => setShowCelebration(false)} />
      )}
      <Navbar />
      <FloatingWhatsApp />

      <main className="flex flex-col">
        {/* 1. Hero */}
        <HeroSection />

        {/* Divider */}
        <div className="section-divider" />

        {/* 2. About */}
        <AboutSection />

        <div className="section-divider" />

        {/* 3. What We Do */}
        <WhatWeDoSection />

        <div className="section-divider" />

        {/* 4. Where We Work */}
        <WhereWeWorkSection />

        <div className="section-divider" />

        {/* 5. Who We Serve */}
        <WhoWeServeSection />

        <div className="section-divider" />

        {/* 6. Land Prices */}
        <LandPricesSection />

        <div className="section-divider" />

        {/* 7. Dholera */}
        <DholeraSection />

        <div className="section-divider" />

        {/* 8. Recent Clients */}
        <RecentClientsSection />

        <div className="section-divider" />

        {/* 9. Contact */}
        <ContactSection />
      </main>

      {/* 10. Footer */}
      <Footer />
    </>
  );
}

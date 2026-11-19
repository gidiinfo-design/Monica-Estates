"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import Footer from "@/components/Footer";
import LaunchPage, { LAUNCH_DATE_TIMESTAMP } from "@/components/LaunchPage";

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
  const [preview, setPreview] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Check for preview parameter in URL or local storage
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      if (
        urlParams.get("preview") === "true" ||
        localStorage.getItem("monica_preview") === "true"
      ) {
        setPreview(true);
      }
    }

    const checkLaunch = () => {
      if (Date.now() >= LAUNCH_DATE_TIMESTAMP) {
        setIsLaunched(true);
      }
    };

    checkLaunch();
    const interval = setInterval(checkLaunch, 1000);
    return () => clearInterval(interval);
  }, []);

  // During pre-launch (before Nov 21 12:00 AM IST) and when not in preview mode, show LaunchPage
  if (!mounted) {
    return <div className="min-h-screen bg-bg-primary" />;
  }

  if (!isLaunched && !preview) {
    return (
      <LaunchPage
        onPreview={() => {
          setPreview(true);
          try {
            localStorage.setItem("monica_preview", "true");
          } catch {}
        }}
      />
    );
  }

  return (
    <>
      {/* Discreet preview mode banner */}
      {!isLaunched && preview && (
        <div className="fixed top-0 left-0 right-0 z-[60] bg-gold/90 text-bg-primary text-xs font-display font-semibold py-1 px-4 text-center flex items-center justify-center gap-3 backdrop-blur-md shadow-md">
          <span>Viewing in Owner Preview Mode · Official Launch on 21 November 12:00 AM</span>
          <button
            onClick={() => {
              setPreview(false);
              try {
                localStorage.removeItem("monica_preview");
              } catch {}
            }}
            className="underline cursor-pointer hover:text-black transition-colors"
          >
            Show Launch Screen
          </button>
        </div>
      )}

      <Navbar />
      <FloatingWhatsApp />

      <main className={`flex flex-col ${!isLaunched && preview ? "pt-6" : ""}`}>
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

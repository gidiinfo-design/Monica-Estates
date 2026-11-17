"use client";

import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import Footer from "@/components/Footer";

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
  return (
    <>
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

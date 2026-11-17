"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

/* ───────── Floating gold particles ───────── */
function GoldParticles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {Array.from({ length: 24 }).map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            width: `${2 + Math.random() * 4}px`,
            height: `${2 + Math.random() * 4}px`,
            background: `rgba(245, 215, 122, ${0.35 + Math.random() * 0.45})`,
            boxShadow: "0 0 10px rgba(245, 215, 122, 0.7)",
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animation: `particle-float ${5 + Math.random() * 7}s ease-in-out ${Math.random() * 4}s infinite`,
          }}
        />
      ))}
    </div>
  );
}

/* ───────── Road + Cars strip ───────── */
export function CarRoad({ className = "" }: { className?: string }) {
  return (
    <div className={`relative w-full h-10 overflow-hidden ${className}`}>
      {/* Road */}
      <div className="absolute bottom-0 w-full h-6 bg-[#1a1a1a]">
        <div className="absolute top-1/2 -translate-y-1/2 w-full h-[2px] flex gap-6">
          {Array.from({ length: 30 }).map((_, i) => (
            <div key={i} className="w-8 h-[2px] bg-gold/40 shrink-0" />
          ))}
        </div>
      </div>
      {/* Cars */}
      <svg className="car-right absolute bottom-1" width="40" height="18" viewBox="0 0 40 18" style={{ animationDelay: "0s" }}>
        <rect x="4" y="6" width="32" height="10" rx="3" fill="#C9A24B" />
        <rect x="10" y="2" width="16" height="8" rx="2" fill="#E6C879" />
        <circle cx="11" cy="16" r="2.5" fill="#333" />
        <circle cx="29" cy="16" r="2.5" fill="#333" />
      </svg>
      <svg className="car-left absolute bottom-1" width="36" height="16" viewBox="0 0 36 16" style={{ animationDelay: "3s" }}>
        <rect x="2" y="4" width="30" height="10" rx="3" fill="#F4EFE6" />
        <rect x="8" y="1" width="14" height="7" rx="2" fill="#ddd" />
        <circle cx="9" cy="14" r="2" fill="#333" />
        <circle cx="27" cy="14" r="2" fill="#333" />
      </svg>
      <svg className="car-right absolute bottom-1" width="38" height="17" viewBox="0 0 38 17" style={{ animationDelay: "7s" }}>
        <rect x="3" y="5" width="31" height="10" rx="3" fill="#C9A24B" opacity="0.7" />
        <rect x="9" y="2" width="15" height="7" rx="2" fill="#E6C879" opacity="0.7" />
        <circle cx="10" cy="15" r="2.2" fill="#333" />
        <circle cx="28" cy="15" r="2.2" fill="#333" />
      </svg>
    </div>
  );
}

/* ───────── Building SVG group ───────── */
function BuildingSkyline({ side }: { side: "left" | "right" }) {
  if (side === "left") {
    return (
      <svg viewBox="0 0 400 350" className="w-full h-full filter drop-shadow-[0_0_12px_rgba(201,162,75,0.2)]" preserveAspectRatio="xMidYMax meet">
        {/* Tall building */}
        <rect x="30" y="40" width="70" height="310" fill="none" stroke="#E6C879" strokeWidth="1.5" opacity="0.85" />
        <rect x="38" y="55" width="14" height="20" fill="none" stroke="#F5D77A" strokeWidth="0.8" opacity="0.65" />
        <rect x="58" y="55" width="14" height="20" fill="none" stroke="#F5D77A" strokeWidth="0.8" opacity="0.65" />
        <rect x="78" y="55" width="14" height="20" fill="none" stroke="#F5D77A" strokeWidth="0.8" opacity="0.65" />
        <rect x="38" y="90" width="14" height="20" fill="none" stroke="#F5D77A" strokeWidth="0.8" opacity="0.65" />
        <rect x="58" y="90" width="14" height="20" fill="none" stroke="#F5D77A" strokeWidth="0.8" opacity="0.65" />
        <rect x="78" y="90" width="14" height="20" fill="none" stroke="#F5D77A" strokeWidth="0.8" opacity="0.65" />
        <rect x="38" y="125" width="14" height="20" fill="none" stroke="#F5D77A" strokeWidth="0.8" opacity="0.65" />
        <rect x="58" y="125" width="14" height="20" fill="none" stroke="#F5D77A" strokeWidth="0.8" opacity="0.65" />
        <rect x="78" y="125" width="14" height="20" fill="none" stroke="#F5D77A" strokeWidth="0.8" opacity="0.65" />
        <rect x="38" y="160" width="14" height="20" fill="none" stroke="#F5D77A" strokeWidth="0.8" opacity="0.65" />
        <rect x="58" y="160" width="14" height="20" fill="none" stroke="#F5D77A" strokeWidth="0.8" opacity="0.65" />
        <rect x="78" y="160" width="14" height="20" fill="none" stroke="#F5D77A" strokeWidth="0.8" opacity="0.65" />
        <rect x="38" y="195" width="14" height="20" fill="none" stroke="#F5D77A" strokeWidth="0.8" opacity="0.65" />
        <rect x="58" y="195" width="14" height="20" fill="none" stroke="#F5D77A" strokeWidth="0.8" opacity="0.65" />
        <rect x="78" y="195" width="14" height="20" fill="none" stroke="#F5D77A" strokeWidth="0.8" opacity="0.65" />
        {/* Medium building */}
        <rect x="120" y="120" width="90" height="230" fill="none" stroke="#E6C879" strokeWidth="1.5" opacity="0.75" />
        <rect x="130" y="135" width="16" height="22" fill="none" stroke="#F5D77A" strokeWidth="0.8" opacity="0.55" />
        <rect x="152" y="135" width="16" height="22" fill="none" stroke="#F5D77A" strokeWidth="0.8" opacity="0.55" />
        <rect x="174" y="135" width="16" height="22" fill="none" stroke="#F5D77A" strokeWidth="0.8" opacity="0.55" />
        <rect x="130" y="172" width="16" height="22" fill="none" stroke="#F5D77A" strokeWidth="0.8" opacity="0.55" />
        <rect x="152" y="172" width="16" height="22" fill="none" stroke="#F5D77A" strokeWidth="0.8" opacity="0.55" />
        <rect x="174" y="172" width="16" height="22" fill="none" stroke="#F5D77A" strokeWidth="0.8" opacity="0.55" />
        <rect x="130" y="209" width="16" height="22" fill="none" stroke="#F5D77A" strokeWidth="0.8" opacity="0.55" />
        <rect x="152" y="209" width="16" height="22" fill="none" stroke="#F5D77A" strokeWidth="0.8" opacity="0.55" />
        <rect x="174" y="209" width="16" height="22" fill="none" stroke="#F5D77A" strokeWidth="0.8" opacity="0.55" />
        {/* Shorter building */}
        <rect x="230" y="180" width="80" height="170" fill="none" stroke="#E6C879" strokeWidth="1.5" opacity="0.65" />
        <rect x="240" y="195" width="12" height="18" fill="none" stroke="#F5D77A" strokeWidth="0.8" opacity="0.45" />
        <rect x="258" y="195" width="12" height="18" fill="none" stroke="#F5D77A" strokeWidth="0.8" opacity="0.45" />
        <rect x="276" y="195" width="12" height="18" fill="none" stroke="#F5D77A" strokeWidth="0.8" opacity="0.45" />
        {/* Factory shape */}
        <polygon points="330,350 330,220 350,190 370,220 370,350" fill="none" stroke="#E6C879" strokeWidth="1.2" opacity="0.55" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 400 350" className="w-full h-full filter drop-shadow-[0_0_12px_rgba(201,162,75,0.2)]" preserveAspectRatio="xMidYMax meet">
      {/* Tall tower */}
      <rect x="300" y="30" width="65" height="320" fill="none" stroke="#E6C879" strokeWidth="1.5" opacity="0.85" />
      <rect x="308" y="48" width="12" height="18" fill="none" stroke="#F5D77A" strokeWidth="0.8" opacity="0.65" />
      <rect x="325" y="48" width="12" height="18" fill="none" stroke="#F5D77A" strokeWidth="0.8" opacity="0.65" />
      <rect x="342" y="48" width="12" height="18" fill="none" stroke="#F5D77A" strokeWidth="0.8" opacity="0.65" />
      <rect x="308" y="80" width="12" height="18" fill="none" stroke="#F5D77A" strokeWidth="0.8" opacity="0.65" />
      <rect x="325" y="80" width="12" height="18" fill="none" stroke="#F5D77A" strokeWidth="0.8" opacity="0.65" />
      <rect x="342" y="80" width="12" height="18" fill="none" stroke="#F5D77A" strokeWidth="0.8" opacity="0.65" />
      <rect x="308" y="112" width="12" height="18" fill="none" stroke="#F5D77A" strokeWidth="0.8" opacity="0.65" />
      <rect x="325" y="112" width="12" height="18" fill="none" stroke="#F5D77A" strokeWidth="0.8" opacity="0.65" />
      <rect x="342" y="112" width="12" height="18" fill="none" stroke="#F5D77A" strokeWidth="0.8" opacity="0.65" />
      <rect x="308" y="144" width="12" height="18" fill="none" stroke="#F5D77A" strokeWidth="0.8" opacity="0.65" />
      <rect x="325" y="144" width="12" height="18" fill="none" stroke="#F5D77A" strokeWidth="0.8" opacity="0.65" />
      <rect x="342" y="144" width="12" height="18" fill="none" stroke="#F5D77A" strokeWidth="0.8" opacity="0.65" />
      {/* Wide building */}
      <rect x="180" y="140" width="100" height="210" fill="none" stroke="#E6C879" strokeWidth="1.5" opacity="0.75" />
      <rect x="192" y="156" width="14" height="20" fill="none" stroke="#F5D77A" strokeWidth="0.8" opacity="0.55" />
      <rect x="214" y="156" width="14" height="20" fill="none" stroke="#F5D77A" strokeWidth="0.8" opacity="0.55" />
      <rect x="236" y="156" width="14" height="20" fill="none" stroke="#F5D77A" strokeWidth="0.8" opacity="0.55" />
      <rect x="192" y="192" width="14" height="20" fill="none" stroke="#F5D77A" strokeWidth="0.8" opacity="0.55" />
      <rect x="214" y="192" width="14" height="20" fill="none" stroke="#F5D77A" strokeWidth="0.8" opacity="0.55" />
      <rect x="236" y="192" width="14" height="20" fill="none" stroke="#F5D77A" strokeWidth="0.8" opacity="0.55" />
      {/* Small building */}
      <rect x="90" y="200" width="70" height="150" fill="none" stroke="#E6C879" strokeWidth="1.2" opacity="0.65" />
      <rect x="100" y="215" width="10" height="16" fill="none" stroke="#F5D77A" strokeWidth="0.8" opacity="0.45" />
      <rect x="118" y="215" width="10" height="16" fill="none" stroke="#F5D77A" strokeWidth="0.8" opacity="0.45" />
      <rect x="136" y="215" width="10" height="16" fill="none" stroke="#F5D77A" strokeWidth="0.8" opacity="0.45" />
      {/* Warehouse shape */}
      <polygon points="10,350 10,250 50,220 90,250 90,350" fill="none" stroke="#E6C879" strokeWidth="1.2" opacity="0.55" />
    </svg>
  );
}

/* ───────── HERO SECTION ───────── */
export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Buildings slide apart
  const leftX = useTransform(scrollYProgress, [0, 0.6], ["0%", "-110%"]);
  const rightX = useTransform(scrollYProgress, [0, 0.6], ["0%", "110%"]);
  const buildingOpacity = useTransform(scrollYProgress, [0.3, 0.6], [1, 0]);
  const buildingScale = useTransform(scrollYProgress, [0.3, 0.6], [1, 0.8]);
  
  // Text reveal - starts bright, fades as user scrolls past
  const textOpacity = useTransform(scrollYProgress, [0, 0.45, 0.75], [1, 1, 0.1]);

  // Scroll indicator fade
  const scrollIndicatorOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  const staticStyle = prefersReducedMotion
    ? { x: "0%", opacity: 0.3, scale: 1 }
    : {};

  return (
    <section
      ref={containerRef}
      id="home"
      className="relative h-[200vh]"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center bg-bg-primary">
        {/* Gold ambient spotlight & glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[650px] bg-gradient-to-b from-gold/25 via-gold/10 to-transparent rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[400px] bg-gold-bright/20 rounded-full blur-[100px] pointer-events-none" />

        {/* Particles */}
        <GoldParticles />

        {/* Center text — behind the buildings */}
        <motion.div
          className="absolute inset-0 flex flex-col items-center justify-center z-10 px-4"
          style={prefersReducedMotion ? {} : { opacity: textOpacity }}
        >
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="font-display text-sm md:text-lg tracking-[0.35em] uppercase text-gold-bright font-semibold mb-4 drop-shadow-[0_0_15px_rgba(245,215,122,0.7)]"
          >
            44 Years of Clients First
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 1 }}
            className="font-script text-6xl sm:text-7xl md:text-8xl lg:text-9xl text-glow-gold gradient-text-gold text-center leading-tight select-none filter drop-shadow-[0_4px_35px_rgba(245,215,122,0.45)]"
          >
            Monica Estates
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="font-display text-base md:text-xl text-off-white font-medium mt-6 text-center max-w-xl tracking-wide drop-shadow-[0_2px_12px_rgba(0,0,0,0.95)]"
          >
            Your Industrial Real Estate Advisor — Noida · Greater Noida · Yamuna Expressway · Dholera
          </motion.p>
        </motion.div>

        {/* Buildings — in front of text */}
        <motion.div
          className="absolute left-0 bottom-0 w-1/2 h-[70%] z-20 pointer-events-none"
          style={
            prefersReducedMotion
              ? staticStyle
              : { x: leftX, opacity: buildingOpacity, scale: buildingScale }
          }
        >
          <BuildingSkyline side="left" />
        </motion.div>

        <motion.div
          className="absolute right-0 bottom-0 w-1/2 h-[70%] z-20 pointer-events-none"
          style={
            prefersReducedMotion
              ? staticStyle
              : { x: rightX, opacity: buildingOpacity, scale: buildingScale }
          }
        >
          <BuildingSkyline side="right" />
        </motion.div>

        {/* Road at bottom */}
        <div className="absolute bottom-0 left-0 right-0 z-30">
          <CarRoad />
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-16 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2 cursor-pointer"
          style={prefersReducedMotion ? {} : { opacity: scrollIndicatorOpacity }}
          onClick={() =>
            document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })
          }
        >
          <span className="text-xs tracking-[0.3em] uppercase text-gold-bright font-display font-medium drop-shadow-[0_0_6px_rgba(245,215,122,0.6)]">Scroll</span>
          <motion.div
            animate={prefersReducedMotion ? {} : { y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <ChevronDown size={22} className="text-gold-bright drop-shadow-[0_0_10px_rgba(245,215,122,0.7)]" />
          </motion.div>
        </motion.div>

        {/* Bottom gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-bg-primary to-transparent z-25 pointer-events-none" />
      </div>
    </section>
  );
}


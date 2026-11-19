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
      <svg viewBox="0 0 400 350" className="w-full h-full filter drop-shadow-[0_0_15px_rgba(201,162,75,0.25)]" preserveAspectRatio="xMidYMax meet">
        <defs>
          <linearGradient id="bldg-grad-left" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#141414" />
            <stop offset="100%" stopColor="#0B0B0B" />
          </linearGradient>
        </defs>

        {/* 1. Tall outer tower (far left) */}
        <rect x="25" y="30" width="65" height="320" fill="url(#bldg-grad-left)" stroke="#E6C879" strokeWidth="1.5" opacity="0.85" />
        <line x1="57" y1="30" x2="57" y2="8" stroke="#E6C879" strokeWidth="1.2" opacity="0.8" />
        <circle cx="57" cy="6" r="2" fill="#F5D77A" />
        {[50, 85, 120, 155, 190, 225].map((y) => (
          <g key={y}>
            <rect x="33" y={y} width="12" height="18" fill="rgba(245, 215, 122, 0.3)" stroke="#F5D77A" strokeWidth="0.8" opacity="0.65" />
            <rect x="51" y={y} width="12" height="18" fill="rgba(245, 215, 122, 0.3)" stroke="#F5D77A" strokeWidth="0.8" opacity="0.65" />
            <rect x="69" y={y} width="12" height="18" fill="rgba(245, 215, 122, 0.3)" stroke="#F5D77A" strokeWidth="0.8" opacity="0.65" />
          </g>
        ))}

        {/* 2. Medium commercial building */}
        <rect x="105" y="115" width="85" height="235" fill="url(#bldg-grad-left)" stroke="#E6C879" strokeWidth="1.5" opacity="0.8" />
        {[130, 165, 200, 235].map((y) => (
          <g key={y}>
            <rect x="115" y={y} width="16" height="20" fill="rgba(245, 215, 122, 0.25)" stroke="#F5D77A" strokeWidth="0.8" opacity="0.6" />
            <rect x="139" y={y} width="16" height="20" fill="rgba(245, 215, 122, 0.25)" stroke="#F5D77A" strokeWidth="0.8" opacity="0.6" />
            <rect x="163" y={y} width="16" height="20" fill="rgba(245, 215, 122, 0.25)" stroke="#F5D77A" strokeWidth="0.8" opacity="0.6" />
          </g>
        ))}

        {/* 3. Mid stepped building */}
        <rect x="205" y="160" width="75" height="190" fill="url(#bldg-grad-left)" stroke="#E6C879" strokeWidth="1.5" opacity="0.75" />
        {[175, 210, 245].map((y) => (
          <g key={y}>
            <rect x="215" y={y} width="13" height="18" fill="rgba(245, 215, 122, 0.25)" stroke="#F5D77A" strokeWidth="0.8" opacity="0.55" />
            <rect x="236" y={y} width="13" height="18" fill="rgba(245, 215, 122, 0.25)" stroke="#F5D77A" strokeWidth="0.8" opacity="0.55" />
            <rect x="257" y={y} width="13" height="18" fill="rgba(245, 215, 122, 0.25)" stroke="#F5D77A" strokeWidth="0.8" opacity="0.55" />
          </g>
        ))}

        {/* 4. Warehouse / factory with angled roof */}
        <polygon points="285,350 285,220 305,190 325,220 325,350" fill="url(#bldg-grad-left)" stroke="#E6C879" strokeWidth="1.3" opacity="0.7" />

        {/* 5. INNER OVERLAP TOWER — covers a bit of the left edge of 'Monica Estates' */}
        <rect x="330" y="75" width="65" height="275" fill="url(#bldg-grad-left)" stroke="#E6C879" strokeWidth="1.6" opacity="0.95" />
        {/* Stepped top cap & spire */}
        <rect x="342" y="55" width="41" height="20" fill="url(#bldg-grad-left)" stroke="#E6C879" strokeWidth="1.4" opacity="0.9" />
        <line x1="362" y1="55" x2="362" y2="30" stroke="#F5D77A" strokeWidth="1.5" opacity="0.9" />
        <circle cx="362" cy="28" r="2.5" fill="#F5D77A" />
        {/* Glowing windows on the overlap tower */}
        {[95, 130, 165, 200, 235].map((y) => (
          <g key={y}>
            <rect x="338" y={y} width="12" height="18" fill="rgba(245, 215, 122, 0.35)" stroke="#F5D77A" strokeWidth="0.8" opacity="0.7" />
            <rect x="356" y={y} width="12" height="18" fill="rgba(245, 215, 122, 0.35)" stroke="#F5D77A" strokeWidth="0.8" opacity="0.7" />
            <rect x="374" y={y} width="12" height="18" fill="rgba(245, 215, 122, 0.35)" stroke="#F5D77A" strokeWidth="0.8" opacity="0.7" />
          </g>
        ))}
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 400 350" className="w-full h-full filter drop-shadow-[0_0_15px_rgba(201,162,75,0.25)]" preserveAspectRatio="xMidYMax meet">
      <defs>
        <linearGradient id="bldg-grad-right" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#141414" />
          <stop offset="100%" stopColor="#0B0B0B" />
        </linearGradient>
      </defs>

      {/* 1. INNER OVERLAP TOWER — covers a bit of the right edge of 'Monica Estates' */}
      <rect x="5" y="75" width="65" height="275" fill="url(#bldg-grad-right)" stroke="#E6C879" strokeWidth="1.6" opacity="0.95" />
      {/* Stepped top cap & spire */}
      <rect x="17" y="55" width="41" height="20" fill="url(#bldg-grad-right)" stroke="#E6C879" strokeWidth="1.4" opacity="0.9" />
      <line x1="37" y1="55" x2="37" y2="30" stroke="#F5D77A" strokeWidth="1.5" opacity="0.9" />
      <circle cx="37" cy="28" r="2.5" fill="#F5D77A" />
      {/* Glowing windows on the overlap tower */}
      {[95, 130, 165, 200, 235].map((y) => (
        <g key={y}>
          <rect x="13" y={y} width="12" height="18" fill="rgba(245, 215, 122, 0.35)" stroke="#F5D77A" strokeWidth="0.8" opacity="0.7" />
          <rect x="31" y={y} width="12" height="18" fill="rgba(245, 215, 122, 0.35)" stroke="#F5D77A" strokeWidth="0.8" opacity="0.7" />
          <rect x="49" y={y} width="12" height="18" fill="rgba(245, 215, 122, 0.35)" stroke="#F5D77A" strokeWidth="0.8" opacity="0.7" />
        </g>
      ))}

      {/* 2. Warehouse / factory with angled roof */}
      <polygon points="75,350 75,220 95,190 115,220 115,350" fill="url(#bldg-grad-right)" stroke="#E6C879" strokeWidth="1.3" opacity="0.7" />

      {/* 3. Mid stepped building */}
      <rect x="120" y="160" width="75" height="190" fill="url(#bldg-grad-right)" stroke="#E6C879" strokeWidth="1.5" opacity="0.75" />
      {[175, 210, 245].map((y) => (
        <g key={y}>
          <rect x="130" y={y} width="13" height="18" fill="rgba(245, 215, 122, 0.25)" stroke="#F5D77A" strokeWidth="0.8" opacity="0.55" />
          <rect x="151" y={y} width="13" height="18" fill="rgba(245, 215, 122, 0.25)" stroke="#F5D77A" strokeWidth="0.8" opacity="0.55" />
          <rect x="172" y={y} width="13" height="18" fill="rgba(245, 215, 122, 0.25)" stroke="#F5D77A" strokeWidth="0.8" opacity="0.55" />
        </g>
      ))}

      {/* 4. Medium commercial building */}
      <rect x="210" y="115" width="85" height="235" fill="url(#bldg-grad-right)" stroke="#E6C879" strokeWidth="1.5" opacity="0.8" />
      {[130, 165, 200, 235].map((y) => (
        <g key={y}>
          <rect x="220" y={y} width="16" height="20" fill="rgba(245, 215, 122, 0.25)" stroke="#F5D77A" strokeWidth="0.8" opacity="0.6" />
          <rect x="244" y={y} width="16" height="20" fill="rgba(245, 215, 122, 0.25)" stroke="#F5D77A" strokeWidth="0.8" opacity="0.6" />
          <rect x="268" y={y} width="16" height="20" fill="rgba(245, 215, 122, 0.25)" stroke="#F5D77A" strokeWidth="0.8" opacity="0.6" />
        </g>
      ))}

      {/* 5. Tall outer tower (far right) */}
      <rect x="310" y="30" width="65" height="320" fill="url(#bldg-grad-right)" stroke="#E6C879" strokeWidth="1.5" opacity="0.85" />
      <line x1="342" y1="30" x2="342" y2="8" stroke="#E6C879" strokeWidth="1.2" opacity="0.8" />
      <circle cx="342" cy="6" r="2" fill="#F5D77A" />
      {[50, 85, 120, 155, 190, 225].map((y) => (
        <g key={y}>
          <rect x="318" y={y} width="12" height="18" fill="rgba(245, 215, 122, 0.3)" stroke="#F5D77A" strokeWidth="0.8" opacity="0.65" />
          <rect x="336" y={y} width="12" height="18" fill="rgba(245, 215, 122, 0.3)" stroke="#F5D77A" strokeWidth="0.8" opacity="0.65" />
          <rect x="354" y={y} width="12" height="18" fill="rgba(245, 215, 122, 0.3)" stroke="#F5D77A" strokeWidth="0.8" opacity="0.65" />
        </g>
      ))}
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

        {/* Buildings — in front of text, overlapping the outer edges of 'Monica Estates' */}
        <motion.div
          className="absolute left-0 bottom-0 w-[53%] md:w-[51%] h-[72%] md:h-[76%] z-20 pointer-events-none"
          style={
            prefersReducedMotion
              ? staticStyle
              : { x: leftX, opacity: buildingOpacity, scale: buildingScale }
          }
        >
          <BuildingSkyline side="left" />
        </motion.div>

        <motion.div
          className="absolute right-0 bottom-0 w-[53%] md:w-[51%] h-[72%] md:h-[76%] z-20 pointer-events-none"
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


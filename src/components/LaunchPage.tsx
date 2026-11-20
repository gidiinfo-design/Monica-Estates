"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Phone, Clock } from "lucide-react";
import WhatsAppIcon from "@/components/UI/WhatsAppIcon";
import BalloonsAndConfetti from "@/components/BalloonsAndConfetti";

// Target launch: 21 November 2026 12:00 AM IST (Midnight)
export const LAUNCH_DATE_TIMESTAMP = new Date("2026-11-21T00:00:00+05:30").getTime();

interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isLaunched: boolean;
}

function getTimeRemaining(): TimeRemaining {
  const total = LAUNCH_DATE_TIMESTAMP - Date.now();
  if (total <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isLaunched: true };
  }

  const seconds = Math.floor((total / 1000) % 60);
  const minutes = Math.floor((total / 1000 / 60) % 60);
  const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
  const days = Math.floor(total / (1000 * 60 * 60 * 24));

  return { days, hours, minutes, seconds, isLaunched: false };
}

export default function LaunchPage({
  onLaunch,
}: {
  onLaunch?: () => void;
} = {}) {
  const [timeLeft, setTimeLeft] = useState<TimeRemaining>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isLaunched: false,
  });
  const [mounted, setMounted] = useState(false);
  const [celebrating, setCelebrating] = useState(false);

  useEffect(() => {
    setMounted(true);
    const initial = getTimeRemaining();
    setTimeLeft(initial);
    if (initial.isLaunched) {
      setCelebrating(true);
      onLaunch?.();
    }

    const timer = setInterval(() => {
      const remaining = getTimeRemaining();
      setTimeLeft(remaining);
      if (remaining.isLaunched) {
        setCelebrating(true);
        clearInterval(timer);
        onLaunch?.();
      }
    }, 500);

    return () => clearInterval(timer);
  }, [onLaunch]);

  return (
    <div className="relative min-h-screen w-full bg-bg-primary text-off-white overflow-hidden flex flex-col justify-between p-6 md:p-12">
      {celebrating && <BalloonsAndConfetti />}
      {/* Background ambient gold lights */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-b from-gold/20 via-gold/5 to-transparent rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[400px] bg-gold-bright/15 rounded-full blur-[120px] pointer-events-none" />

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {mounted &&
          Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full"
              style={{
                width: `${2 + (i % 3) * 2}px`,
                height: `${2 + (i % 3) * 2}px`,
                background: `rgba(245, 215, 122, ${0.3 + (i % 5) * 0.1})`,
                boxShadow: "0 0 10px rgba(245, 215, 122, 0.7)",
                left: `${(i * 19) % 100}%`,
                top: `${(i * 23) % 100}%`,
                animation: `particle-float ${6 + (i % 4) * 2}s ease-in-out ${(i % 3)}s infinite`,
              }}
            />
          ))}
      </div>

      {/* Top bar */}
      <header className="relative z-10 flex justify-center items-center max-w-6xl mx-auto w-full text-center">
        <p className="font-display text-xs md:text-sm tracking-[0.3em] uppercase text-gold font-semibold drop-shadow-[0_0_10px_rgba(245,215,122,0.5)]">
          44 Years of Clients First · Est. 1982
        </p>
      </header>

      {/* Center content */}
      <main className="relative z-10 max-w-4xl mx-auto w-full text-center my-auto py-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          className="space-y-6"
        >
          {/* Main Title */}
          <h1 className="font-script text-6xl sm:text-7xl md:text-8xl lg:text-9xl text-glow-gold gradient-text-gold leading-tight filter drop-shadow-[0_4px_35px_rgba(245,215,122,0.5)] select-none">
            Monica Estates
          </h1>

          {/* Launching headline */}
          <div className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-gold/10 border border-gold/30 backdrop-blur-md shadow-[0_0_20px_rgba(201,162,75,0.2)]">
            <Clock size={16} className="text-gold-bright animate-pulse" />
            <span className="font-display text-sm md:text-base font-semibold tracking-wider uppercase text-gold-bright">
              {timeLeft.isLaunched
                ? "Official Launch · We Are Live!"
                : "Website to launch on 21 November · 12:00 AM"}
            </span>
          </div>

          <p className="font-display text-lg md:text-2xl text-off-white font-medium max-w-2xl mx-auto tracking-wide drop-shadow-[0_2px_12px_rgba(0,0,0,0.95)]">
            Your Industrial Real Estate Advisor — Noida · Greater Noida · Yamuna Expressway · Dholera
          </p>

          {/* Countdown timer */}
          <div className="pt-8 pb-4">
            <div className="grid grid-cols-4 gap-3 sm:gap-6 max-w-xl mx-auto">
              {[
                { label: "Days", value: timeLeft.days },
                { label: "Hours", value: timeLeft.hours },
                { label: "Minutes", value: timeLeft.minutes },
                { label: "Seconds", value: timeLeft.seconds },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="glass-panel rounded-2xl p-4 sm:p-6 border border-gold/30 shadow-[0_4px_25px_rgba(0,0,0,0.5)] backdrop-blur-xl flex flex-col items-center"
                >
                  <span className="font-display text-3xl sm:text-5xl md:text-6xl font-bold gradient-text-gold">
                    {mounted ? String(item.value).padStart(2, "0") : "00"}
                  </span>
                  <span className="text-[10px] sm:text-xs tracking-[0.2em] uppercase text-gold-light/70 font-display mt-1">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Contact during pre-launch */}
          <div className="pt-6 space-y-4">
            <p className="text-muted text-sm font-display tracking-wider uppercase">
              In the meantime, connect with Tushar Dewan directly
            </p>
            <div className="flex flex-wrap gap-4 justify-center items-center">
              <a
                href="tel:+919891075222"
                className="btn-gold text-sm sm:text-base px-7 py-3 flex items-center gap-2.5 shadow-glow-gold"
              >
                <Phone size={18} />
                Call +91 98910 75222
              </a>
              <a
                href="https://wa.me/919891075222?text=Hi%20Tushar%2C%20I%20am%20interested%20in%20your%20properties."
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold-outline text-sm sm:text-base px-7 py-3 flex items-center gap-2.5"
              >
                <WhatsAppIcon size={20} />
                Chat on WhatsApp
              </a>
            </div>
          </div>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 text-center max-w-6xl mx-auto w-full pt-8 border-t border-gold/15 text-muted text-xs font-display">
        <p>© 2026 Monica Estates. All rights reserved.</p>
      </footer>
    </div>
  );
}


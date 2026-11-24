"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import WhatsAppIcon from "@/components/UI/WhatsAppIcon";

export default function DholeraSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      id="dholera"
      className="relative py-24 md:py-40 overflow-hidden"
    >
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="/images/dholera.webp"
          alt="Dholera Smart City building"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-bg-primary/85" />
      </div>

      {/* Decorative gold lines */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 md:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <span className="text-xs uppercase tracking-[0.5em] text-gold font-display block mb-6">
            ★ Our Suggestion ★
          </span>

          <h2 className="font-script text-5xl sm:text-6xl md:text-7xl gradient-text-gold text-glow-gold mb-6">
            Dholera
          </h2>

          <p className="font-display text-xl md:text-3xl text-gold-light font-semibold mb-4">
            Greenfield Smart City
          </p>

          <p className="font-display text-2xl md:text-4xl text-off-white mb-10">
            Starting at{" "}
            <span className="text-gold font-bold">₹8,000 per sq m</span>
          </p>
        </motion.div>

        <motion.ul
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="text-left max-w-lg mx-auto space-y-4 mb-12"
        >
          {[
            "Near the upcoming international airport",
            "Huge scope of appreciation",
            "Huge potential for rental income",
            "Available at a very affordable price",
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-3 text-off-white/90">
              <span className="text-gold text-lg mt-0.5">✦</span>
              <span className="font-sans text-base md:text-lg">{item}</span>
            </li>
          ))}
        </motion.ul>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.7 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="https://wa.me/919891075222?text=Hi%20Tushar%2C%20I%20am%20interested%20in%20Dholera%20properties."
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold text-lg px-10 py-4 shadow-glow-gold"
          >
            <WhatsAppIcon size={22} />
            Enquire on WhatsApp
          </a>
          <a
            href="https://dholeralothal.in"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-lg px-10 py-4 rounded border border-gold/60 text-gold hover:bg-gold/10 transition-colors duration-200 font-display tracking-wide"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
            </svg>
            More Info, Maps &amp; Pricing
          </a>
        </motion.div>
      </div>
    </section>
  );
}


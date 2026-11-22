"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  GraduationCap,
  Car,
  Shirt,
  Zap,
  FlaskConical,
  Package,
  Factory,
  Building2,
  Cpu,
  Cog,
} from "lucide-react";

const clientCategories = [
  { category: "School", icon: GraduationCap },
  { category: "Automobile Dealership", icon: Car },
  { category: "Garment Export", icon: Shirt },
  { category: "Switches & Lighting", icon: Zap },
  { category: "Electrical Manufacturing", icon: Cpu },
  { category: "Chemical Manufacturing", icon: FlaskConical },
  { category: "Packaging & Corrugated Boxes", icon: Package },
  { category: "Garment Manufacturing", icon: Factory },
  { category: "Steel Conduits Manufacturing", icon: Building2 },
  { category: "Plastic Moulding", icon: Cog },
];

export default function RecentClientsSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} id="clients" className="relative py-24 md:py-32 px-4 md:px-8 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="text-xs uppercase tracking-[0.4em] text-gold font-display block mb-4">
            Trusted By
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-semibold text-gold-light">
            Recent Clients
          </h2>
        </motion.div>

        {/* Marquee */}
        <div className="relative overflow-hidden py-4">
          {/* Fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-bg-primary to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-bg-primary to-transparent z-10 pointer-events-none" />

          <div className="flex animate-marquee">
            {/* Double the items for seamless loop */}
            {[...clientCategories, ...clientCategories].map((client, i) => {
              const Icon = client.icon;
              return (
                <div
                  key={`${client.category}-${i}`}
                  className="shrink-0 mx-3 md:mx-4"
                >
                  <div className="glass-panel rounded-xl px-5 py-4 w-60 md:w-64 hover-lift flex items-center gap-3.5 border border-gold/20">
                    <div className="w-10 h-10 rounded-lg bg-gold/10 border border-gold/25 flex items-center justify-center shrink-0">
                      <Icon size={18} className="text-gold" />
                    </div>
                    <h4 className="font-display text-sm md:text-base font-semibold text-gold-light leading-snug">
                      {client.category}
                    </h4>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Also show as static grid on mobile for accessibility */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-12 md:hidden">
          {clientCategories.map((client) => {
            const Icon = client.icon;
            return (
              <div
                key={client.category}
                className="glass-panel rounded-xl px-5 py-4 flex items-center gap-3.5 border border-gold/20"
              >
                <div className="w-9 h-9 rounded-lg bg-gold/10 border border-gold/25 flex items-center justify-center shrink-0">
                  <Icon size={16} className="text-gold" />
                </div>
                <h4 className="font-display text-sm font-semibold text-gold-light">
                  {client.category}
                </h4>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Building2, Rocket, Factory, Warehouse } from "lucide-react";

const segments = [
  {
    icon: Rocket,
    title: "Startups",
    size: "1,000 – 5,000 sq ft",
    type: "Rental space, furnished or unfurnished",
  },
  {
    icon: Factory,
    title: "Expanding IT & Manufacturing Industries",
    size: "250 – 2,000 sq m",
    type: "Land or built-up properties",
  },
  {
    icon: Building2,
    title: "Large IT & Manufacturing Companies",
    size: "10,000 – 5,00,000 sq ft",
    type: "Rental space",
  },
  {
    icon: Warehouse,
    title: "Large Industries, Institutes, IT & Warehousing",
    size: "2,000 sq m and above",
    type: "Land or built-up properties",
  },
];

export default function WhoWeServeSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} id="who-we-serve" className="relative py-24 md:py-32 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="text-xs uppercase tracking-[0.4em] text-gold font-display block mb-4">
            Our Clients
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-semibold text-gold-light">
            Who We Serve
          </h2>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {segments.map((seg, i) => {
            const Icon = seg.icon;
            return (
              <motion.div
                key={seg.title}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
                className="glass-panel rounded-2xl p-6 md:p-8 hover-lift group"
              >
                <div className="flex items-start gap-5">
                  <div className="w-12 h-12 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center shrink-0 group-hover:bg-gold/20 transition-colors">
                    <Icon size={22} className="text-gold" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg md:text-xl font-semibold text-gold-light mb-2">
                      {seg.title}
                    </h3>
                    <p className="text-gold font-display text-2xl font-bold mb-1">
                      {seg.size}
                    </p>
                    <p className="text-muted text-sm">{seg.type}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}


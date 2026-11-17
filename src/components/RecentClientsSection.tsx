"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const clients = [
  { name: "Vigsons Automobile", desc: "Mahindra and Mahindra car agent" },
  { name: "Phoenix Design", desc: "Garment export company" },
  { name: "Gaurav Electrics", desc: "Switches and lights manufacturing" },
  { name: "Kapoor Industries", desc: "Electrical manufacturing" },
  { name: "Bhatia Acids Pvt Ltd", desc: "Chemical manufacturing" },
  { name: "Prism Offset", desc: "Corrugated boxes manufacturing" },
  { name: "Sapphire International School", desc: "School, Noida" },
  { name: "Bodycare International", desc: "Garment manufacturing" },
  { name: "AKG Steel", desc: "Conduits manufacturing" },
  { name: "Shri Sidhi Vinayak Industries", desc: "Plastic moulders" },
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
            {[...clients, ...clients].map((client, i) => (
              <div
                key={`${client.name}-${i}`}
                className="shrink-0 mx-3 md:mx-4"
              >
                <div className="glass-panel rounded-xl px-6 py-5 w-64 md:w-72 hover-lift">
                  <h4 className="font-display text-base md:text-lg font-semibold text-gold-light mb-1 truncate">
                    {client.name}
                  </h4>
                  <p className="text-muted text-xs md:text-sm truncate">{client.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Also show as static grid on mobile for accessibility */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-12 md:hidden">
          {clients.map((client) => (
            <div key={client.name} className="glass-panel rounded-xl px-5 py-4">
              <h4 className="font-display text-sm font-semibold text-gold-light mb-1">
                {client.name}
              </h4>
              <p className="text-muted text-xs">{client.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


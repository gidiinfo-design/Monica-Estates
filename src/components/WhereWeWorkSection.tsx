"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";

const locations = [
  {
    name: "Noida",
    image: "/images/noida-welcome.jpg",
    alt: "Noida city welcome arch with Buddha statue",
  },
  {
    name: "Greater Noida",
    image: "/images/greater-noida.jpg",
    alt: "Greater Noida landmark sculptures",
  },
  {
    name: "Yamuna Expressway",
    image: "/images/yamuna-expressway.jpg",
    alt: "Noida International Airport development on Yamuna Expressway",
  },
  {
    name: "Dholera",
    label: "Greenfield Smart City",
    image: "/images/dholera.jpg",
    alt: "Dholera Smart City commercial building",
  },
];

export default function WhereWeWorkSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} id="where-we-work" className="relative py-24 md:py-32 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="text-xs uppercase tracking-[0.4em] text-gold font-display block mb-4">
            Our Territory
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-semibold text-gold-light mb-4">
            Where We Work
          </h2>
        </motion.div>

        {/* Location cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
          {locations.map((loc, i) => (
            <motion.div
              key={loc.name}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + i * 0.15, duration: 0.6 }}
              className="group relative overflow-hidden rounded-2xl border-glow-gold hover-lift aspect-[4/3] cursor-pointer"
            >
              {/* Parallax-ish image */}
              <div className="absolute inset-0">
                <Image
                  src={loc.image}
                  alt={loc.alt}
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-110"
                  sizes="(max-width: 640px) 100vw, 50vw"
                />
              </div>

              {/* Dark overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-bg-primary via-bg-primary/50 to-bg-primary/20 group-hover:from-bg-primary/90 transition-all duration-500" />

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 z-10">
                <h3 className="font-script text-3xl md:text-4xl gradient-text-gold text-glow-gold mb-1">
                  {loc.name}
                </h3>
                {loc.label && (
                  <p className="text-gold-light/80 font-display text-sm italic">
                    {loc.label}
                  </p>
                )}
              </div>

              {/* Top gold accent line */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-gold/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}


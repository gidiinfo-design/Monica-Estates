"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";

const categories = [
  {
    title: "Industrial Properties",
    subtitle: "Factories & Warehouses",
    images: ["/images/factory-warehouse.webp", "/images/factory-warehouse-2.webp"],
    alt: ["Factory warehouse exterior", "Industrial warehouse building"],
  },
  {
    title: "Institutional Properties",
    subtitle: "Office & Institutional Buildings, Schools",
    images: ["/images/institutional-building.webp", "/images/institutional-office.webp"],
    alt: ["Institutional commercial building", "Office building exterior"],
  },
  {
    title: "IT & Office Space",
    subtitle: "Rental space for startups & IT companies, furnished or unfurnished",
    images: ["/images/it-office.webp", "/images/institutional-building.webp"],
    alt: ["IT office building", "Modern office space"],
  },
  {
    title: "Bulk Land & Buildings",
    subtitle: "From bare land to built-up",
    images: ["/images/yamuna-expressway.webp", "/images/noida-welcome.webp"],
    alt: ["Yamuna Expressway development area", "Noida city entrance"],
  },
];

const timelineSteps = [
  "Selection of appropriate locations",
  "Outright sale & purchase / lease / joint ventures / collaboration",
  "Negotiations",
  "Transfer of ownership",
  "Liaisoning",
];

export default function WhatWeDoSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} id="what-we-do" className="relative py-24 md:py-32 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="text-xs uppercase tracking-[0.4em] text-gold font-display block mb-4">
            Our Expertise
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-semibold text-gold-light mb-4">
            What We Do
          </h2>
          <p className="text-muted max-w-2xl mx-auto text-base md:text-lg font-display">
            A strong hold in industrial and institutional properties, from bare land
            to built-up buildings. We handle <span className="text-gold">Sale</span>,{" "}
            <span className="text-gold">Purchase</span> and{" "}
            <span className="text-gold">Renting</span>.
          </p>
        </motion.div>

        {/* Property category cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-20">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + i * 0.15, duration: 0.6 }}
              className="group relative overflow-hidden rounded-2xl border-glow-gold hover-lift bg-bg-card"
            >
              {/* Image pair */}
              <div className="relative h-56 md:h-72 overflow-hidden">
                <Image
                  src={cat.images[0]}
                  alt={cat.alt[0]}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                {/* Gold overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-bg-primary via-bg-primary/40 to-transparent" />
                <div className="absolute inset-0 bg-gold/0 group-hover:bg-gold/10 transition-colors duration-500" />
              </div>

              {/* Text */}
              <div className="relative p-6">
                <h3 className="font-display text-xl md:text-2xl font-semibold text-gold-light mb-2">
                  {cat.title}
                </h3>
                <p className="text-muted text-sm">{cat.subtitle}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* 5-step gold timeline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.7 }}
          className="max-w-4xl mx-auto"
        >
          <h3 className="font-display text-xl md:text-2xl text-center text-gold-light mb-10">
            Our Process
          </h3>

          <div className="relative">
            {/* Vertical gold line (mobile) / horizontal (desktop) */}
            <div className="hidden md:block absolute top-5 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
            <div className="md:hidden absolute top-0 bottom-0 left-5 w-[2px] bg-gradient-to-b from-gold/40 via-gold/20 to-transparent" />

            <div className="flex flex-col md:flex-row md:justify-between gap-8 md:gap-4">
              {timelineSteps.map((step, i) => (
                <motion.div
                  key={step}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.8 + i * 0.1, duration: 0.5 }}
                  className="flex md:flex-col items-start md:items-center gap-4 md:gap-3 md:flex-1"
                >
                  {/* Circle */}
                  <div className="w-10 h-10 rounded-full border-2 border-gold bg-bg-primary flex items-center justify-center shrink-0 shadow-glow-gold">
                    <span className="text-gold font-display font-bold text-sm">
                      {i + 1}
                    </span>
                  </div>
                  <p className="text-off-white/80 text-sm md:text-center font-sans leading-snug">
                    {step}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}


"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";

function CountUpNumber({ target, duration = 2 }: { target: number; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const startTime = performance.now();
    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / (duration * 1000), 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(eased * target);
      setCount(current);
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    requestAnimationFrame(animate);
  }, [inView, target, duration]);

  return <span ref={ref}>{count}</span>;
}

export default function AboutSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      id="about"
      className="relative py-24 md:py-32 px-4 md:px-8 overflow-hidden"
    >
      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-gold/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Giant 44 */}
        <div className="flex flex-col md:flex-row items-center md:items-end gap-8 md:gap-16 mb-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative"
          >
            <span className="text-[8rem] sm:text-[10rem] md:text-[14rem] font-script gradient-text-gold text-glow-gold leading-none select-none">
              <CountUpNumber target={44} duration={2.5} />
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="pb-4 md:pb-10"
          >
            <h2 className="font-display text-3xl md:text-5xl font-semibold text-gold-light mb-2">
              Years in Business
            </h2>
            <p className="text-muted font-display text-lg italic">Under one policy: Clients First</p>
          </motion.div>
        </div>

        {/* Thin gold divider */}
        <div className="section-divider mb-12" />

        {/* About copy */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.7 }}
          className="max-w-3xl mx-auto"
        >
          <p className="text-off-white/90 text-base md:text-lg leading-relaxed font-sans text-center">
            We are well-established real estate agents in Noida, providing clients
            suitable properties in Noida and Greater Noida for industrial,
            institutional, IT and office space. Our reputation among real estate
            agents and property dealers has been built over{" "}
            <span className="text-gold font-semibold">44 years</span>, under one
            policy:{" "}
            <span className="text-gold-light font-display italic text-xl">
              Clients First.
            </span>
          </p>
        </motion.div>
      </div>
    </section>
  );
}


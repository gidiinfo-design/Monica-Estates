"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { Phone } from "lucide-react";
import WhatsAppIcon from "@/components/UI/WhatsAppIcon";

export default function ContactSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} id="contact" className="relative py-24 md:py-32 px-4 md:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <span className="text-xs uppercase tracking-[0.4em] text-gold font-display block mb-4">
            Get in Touch
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-semibold text-gold-light mb-6">
            Contact Us
          </h2>
          <p className="text-off-white/80 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Know anyone looking for industrial property? Introduce them to Monica
            Estates.{" "}
            <span className="text-gold font-semibold">Tushar Dewan</span> is ready
            for all your questions.
          </p>
        </motion.div>

        {/* Contact button card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="max-w-md mx-auto mb-12"
        >
          <div className="glass-panel rounded-2xl p-6 text-center hover-lift">
            <p className="text-muted text-xs uppercase tracking-widest mb-3 font-display">
              Call or WhatsApp
            </p>
            <p className="text-gold-light font-display text-xl font-semibold mb-4">
              +91 98910 75222
            </p>
            <div className="flex gap-4 justify-center">
              <a
                href="tel:+919891075222"
                className="btn-gold text-sm px-6 py-2.5"
              >
                <Phone size={16} />
                Call
              </a>
              <a
                href="https://wa.me/919891075222"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold-outline text-sm px-6 py-2.5"
              >
                <WhatsAppIcon size={16} />
                WhatsApp
              </a>
            </div>
          </div>
        </motion.div>

        {/* Dholera WhatsApp channel QR */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="text-center"
        >
          <div className="glass-panel rounded-2xl p-8 inline-block mx-auto">
            <p className="font-display text-gold-light text-lg font-semibold mb-4">
              Dholera WhatsApp Channel
            </p>
            <div className="relative w-48 h-48 mx-auto mb-4 bg-white rounded-xl overflow-hidden">
              <Image
                src="/images/dholera-whatsapp-qr.webp"
                alt="Scan to follow our Dholera WhatsApp channel"
                fill
                className="object-contain p-2"
                sizes="192px"
              />
            </div>
            <p className="text-muted text-sm">
              Scan to follow our Dholera WhatsApp channel
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}


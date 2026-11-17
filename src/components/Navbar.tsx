"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone } from "lucide-react";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#what-we-do" },
  { label: "Locations", href: "#where-we-work" },
  { label: "Dholera", href: "#dholera" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNav = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-bg-primary/90 backdrop-blur-xl border-b border-gold/10 shadow-[0_4px_30px_rgba(0,0,0,0.5)]"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8 h-16 md:h-20 flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => handleNav("#home")}
            className="font-script text-2xl md:text-3xl gradient-text-gold select-none cursor-pointer"
          >
            Monica Estates
          </button>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNav(link.href)}
                className="text-sm font-display text-off-white/70 hover:text-gold transition-colors tracking-wide cursor-pointer"
              >
                {link.label}
              </button>
            ))}
            <a
              href="tel:+919810013052"
              className="btn-gold text-sm px-5 py-2"
            >
              <Phone size={14} />
              Call Now
            </a>
          </div>

          {/* Mobile hamburger */}
          <div className="flex items-center gap-3 md:hidden">
            <a
              href="tel:+919810013052"
              className="btn-gold text-xs px-4 py-2"
            >
              <Phone size={12} />
              Call
            </a>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="text-gold p-2 cursor-pointer"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-bg-primary/98 backdrop-blur-xl pt-20 px-6"
          >
            <div className="flex flex-col gap-6">
              {navLinks.map((link, i) => (
                <motion.button
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => handleNav(link.href)}
                  className="text-left font-display text-2xl text-gold-light hover:text-gold transition-colors cursor-pointer"
                >
                  {link.label}
                </motion.button>
              ))}

              <div className="pt-4 border-t border-gold/20 flex flex-col gap-3">
                <a
                  href="tel:+919810013052"
                  className="btn-gold text-center justify-center"
                >
                  <Phone size={16} />
                  +91 98100 13052
                </a>
                <a
                  href="https://wa.me/919810013052"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-gold-outline text-center justify-center"
                >
                  WhatsApp
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}


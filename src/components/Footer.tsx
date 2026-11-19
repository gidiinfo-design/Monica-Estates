"use client";

import { CarRoad } from "./HeroSection";

export default function Footer() {
  return (
    <footer className="relative bg-bg-secondary border-t border-gold/10">
      {/* Car road strip above footer */}
      <CarRoad className="border-b border-gold/5" />

      <div className="max-w-7xl mx-auto py-16 px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Col 1: Brand */}
          <div className="space-y-4">
            <span className="font-script text-3xl gradient-text-gold block">
              Monica Estates
            </span>
            <p className="font-display text-gold-light text-lg font-semibold">
              Tushar Dewan
            </p>
            <p className="font-display text-muted text-sm italic">
              Your Industrial Real Estate Advisor
            </p>
            <p className="text-muted text-xs leading-relaxed">
              44 years of Clients First. Industrial, institutional, IT and office
              properties in Noida, Greater Noida, Yamuna Expressway and Dholera.
            </p>
          </div>

          {/* Col 2: Quick links */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase text-gold/80 font-display tracking-widest font-semibold">
              Quick Links
            </h4>
            <ul className="space-y-2 text-sm text-muted">
              <li>
                <a href="#about" className="hover:text-gold transition-colors">About Us</a>
              </li>
              <li>
                <a href="#what-we-do" className="hover:text-gold transition-colors">What We Do</a>
              </li>
              <li>
                <a href="#where-we-work" className="hover:text-gold transition-colors">Where We Work</a>
              </li>
              <li>
                <a href="#dholera" className="hover:text-gold transition-colors">Dholera Smart City</a>
              </li>
              <li>
                <a href="#contact" className="hover:text-gold transition-colors">Contact</a>
              </li>
            </ul>
          </div>

          {/* Col 3: Contact */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase text-gold/80 font-display tracking-widest font-semibold">
              Contact
            </h4>
            <div className="space-y-2 text-sm text-muted">
              <a href="tel:+919891075222" className="block hover:text-gold transition-colors">
                +91 98910 75222
              </a>
              <a
                href="https://wa.me/919891075222"
                target="_blank"
                rel="noopener noreferrer"
                className="block hover:text-gold transition-colors"
              >
                WhatsApp →
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-gold/10 flex flex-col md:flex-row items-center justify-between text-xs text-muted gap-4">
          <span>© 2026 Monica Estates. All rights reserved.</span>
          <span className="font-display italic text-gold/40">
            Clients First — Since 1982
          </span>
        </div>
      </div>
    </footer>
  );
}


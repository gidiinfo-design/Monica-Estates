"use client";

import WhatsAppIcon from "@/components/UI/WhatsAppIcon";

export default function FloatingWhatsApp() {
  return (
    <a
      href="https://wa.me/919891075222?text=Hi%20Tushar%2C%20I%20am%20interested%20in%20your%20properties."
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-[#25D366] flex items-center justify-center shadow-[0_4px_20px_rgba(37,211,102,0.4)] hover:shadow-[0_4px_30px_rgba(37,211,102,0.6)] hover:scale-110 transition-all duration-300"
      aria-label="Chat on WhatsApp"
    >
      <WhatsAppIcon size={28} className="text-white" />
    </a>
  );
}


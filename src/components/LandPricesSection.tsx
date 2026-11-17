"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import dynamic from "next/dynamic";

// Dynamically import Recharts to avoid SSR issues
const RechartsChart = dynamic(() => import("./LandPricesChart"), { ssr: false });

const priceData = [
  { year: "2009", Noida: 35000, Gurugram: 50000, "Yamuna Expressway": 3300, Dholera: 50 },
  { year: "2014", Noida: 100000, Gurugram: 125000, "Yamuna Expressway": 6100, Dholera: 350 },
  { year: "2019", Noida: 150000, Gurugram: 150000, "Yamuna Expressway": 7000, Dholera: 700 },
  { year: "2025", Noida: 250000, Gurugram: 300000, "Yamuna Expressway": 60000, Dholera: 3000 },
  { year: "2026", Noida: 250000, Gurugram: 300000, "Yamuna Expressway": 60000, Dholera: 11000 },
];

export { priceData };

export default function LandPricesSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [showTable, setShowTable] = useState(false);

  return (
    <section ref={ref} id="land-prices" className="relative py-24 md:py-32 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <span className="text-xs uppercase tracking-[0.4em] text-gold font-display block mb-4">
            Market Data
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-semibold text-gold-light mb-4">
            Land Prices Since 2009
          </h2>
          <p className="text-muted max-w-xl mx-auto text-sm md:text-base">
            Cost of land (₹ per sq m) across our key markets. Note the extraordinary growth
            in Dholera — from ₹50 to ₹11,000 per sq m.
          </p>
        </motion.div>

        {/* Chart */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="glass-panel rounded-2xl p-4 md:p-8 mb-8"
        >
          <div className="w-full h-[350px] md:h-[450px]">
            <RechartsChart data={priceData} />
          </div>
        </motion.div>

        {/* Toggle table */}
        <div className="text-center mb-6">
          <button
            onClick={() => setShowTable(!showTable)}
            className="btn-gold-outline text-sm"
          >
            {showTable ? "Hide Table" : "View Data Table"}
          </button>
        </div>

        {/* Table */}
        {showTable && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-x-auto"
          >
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-gold/20">
                  <th className="text-left py-3 px-4 font-display text-gold-light">Year</th>
                  <th className="text-right py-3 px-4 font-display text-gold-light">Noida</th>
                  <th className="text-right py-3 px-4 font-display text-gold-light">Gurugram</th>
                  <th className="text-right py-3 px-4 font-display text-gold-light">Yamuna Exp.</th>
                  <th className="text-right py-3 px-4 font-display text-gold-light font-bold">Dholera</th>
                </tr>
              </thead>
              <tbody>
                {priceData.map((row) => (
                  <tr key={row.year} className="border-b border-gold/10 hover:bg-gold/5 transition-colors">
                    <td className="py-3 px-4 text-off-white font-semibold">{row.year}</td>
                    <td className="py-3 px-4 text-right text-muted">₹{row.Noida.toLocaleString("en-IN")}</td>
                    <td className="py-3 px-4 text-right text-muted">₹{row.Gurugram.toLocaleString("en-IN")}</td>
                    <td className="py-3 px-4 text-right text-muted">₹{row["Yamuna Expressway"].toLocaleString("en-IN")}</td>
                    <td className="py-3 px-4 text-right text-gold font-bold">₹{row.Dholera.toLocaleString("en-IN")}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        )}
      </div>
    </section>
  );
}


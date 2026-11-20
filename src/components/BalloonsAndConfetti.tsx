"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, X } from "lucide-react";

interface BalloonData {
  id: number;
  x: number; // percentage across screen 5%..95%
  size: number; // 70px to 110px
  delay: number; // in seconds
  duration: number; // in seconds
  swayDuration: number;
  swayDistance: number;
  type: "gold" | "champagne" | "pearl" | "bronze" | "rosegold";
  scale: number;
}

const BALLOON_GRADIENTS = {
  gold: {
    highlight: "#FFF9DB",
    mid1: "#F5D77A",
    mid2: "#C9A24B",
    deep: "#7C5819",
    string: "rgba(245, 215, 122, 0.45)",
  },
  champagne: {
    highlight: "#FFFFFF",
    mid1: "#FCECC0",
    mid2: "#E1BB62",
    deep: "#8A641A",
    string: "rgba(252, 236, 192, 0.45)",
  },
  pearl: {
    highlight: "#FFFFFF",
    mid1: "#FBF9F5",
    mid2: "#DDD6C7",
    deep: "#8E8675",
    string: "rgba(221, 214, 199, 0.45)",
  },
  bronze: {
    highlight: "#FDE8BE",
    mid1: "#CFA04E",
    mid2: "#916922",
    deep: "#4D3409",
    string: "rgba(207, 160, 78, 0.45)",
  },
  rosegold: {
    highlight: "#FFF0EB",
    mid1: "#F4C4AF",
    mid2: "#C88B73",
    deep: "#6D3E2C",
    string: "rgba(244, 196, 175, 0.45)",
  },
};

const CONFETTI_COLORS = [
  "#F5D77A", // Gold light
  "#C9A24B", // Gold main
  "#ECC46B", // Warm gold
  "#FFF9DB", // Champagne glint
  "#FFFFFF", // Pearl white
  "#96732B", // Deep bronze
  "#F4EFE6", // Off white
  "#E6C879", // Gold soft
];

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  shape: "rect" | "circle" | "star";
  rotation: number;
  vRot: number;
  tilt: number;
  vTilt: number;
  opacity: number;
  decay: number;
}

export default function BalloonsAndConfetti({
  onDismiss,
}: {
  onDismiss?: () => void;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [balloons, setBalloons] = useState<BalloonData[]>([]);
  const [poppedBalloons, setPoppedBalloons] = useState<Set<number>>(new Set());
  const [showToast, setShowToast] = useState(true);

  // 1. Generate balloons
  useEffect(() => {
    const types: ("gold" | "champagne" | "pearl" | "bronze" | "rosegold")[] = [
      "gold",
      "champagne",
      "pearl",
      "bronze",
      "rosegold",
    ];

    const generated: BalloonData[] = [];
    // 20 balloons staggered across ~30 seconds
    const count = 22;
    for (let i = 0; i < count; i++) {
      generated.push({
        id: i,
        x: 6 + Math.random() * 88, // 6% to 94% horizontal
        size: 75 + Math.random() * 45, // 75px to 120px
        delay: i === 0 ? 0.1 : 0.2 + (i * 1.1) + Math.random() * 0.8,
        duration: 9 + Math.random() * 5, // 9s to 14s rise time
        swayDuration: 3 + Math.random() * 2,
        swayDistance: 15 + Math.random() * 20,
        type: types[i % types.length],
        scale: 0.85 + Math.random() * 0.35,
      });
    }
    setBalloons(generated);

    // Auto-dismiss toast after 10 seconds
    const toastTimer = setTimeout(() => {
      setShowToast(false);
    }, 10000);

    return () => clearTimeout(toastTimer);
  }, []);

  // 2. Confetti Physics Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    const particles: Particle[] = [];

    // Helper to spawn cannon blast
    const createBurst = (
      originX: number,
      originY: number,
      angleRange: [number, number],
      count: number,
      speedBase: number
    ) => {
      for (let i = 0; i < count; i++) {
        const angle =
          (angleRange[0] + Math.random() * (angleRange[1] - angleRange[0])) *
          (Math.PI / 180);
        const speed = speedBase * (0.6 + Math.random() * 0.8);
        const shapes: ("rect" | "circle" | "star")[] = ["rect", "rect", "circle", "star"];
        particles.push({
          x: originX,
          y: originY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          size: 6 + Math.random() * 8,
          color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
          shape: shapes[Math.floor(Math.random() * shapes.length)],
          rotation: Math.random() * 360,
          vRot: (Math.random() - 0.5) * 12,
          tilt: Math.random() * 360,
          vTilt: (Math.random() - 0.5) * 10,
          opacity: 1,
          decay: 0.0015 + Math.random() * 0.002,
        });
      }
    };

    // Initial dual cannon blasts
    // Left cannon shooting up & right
    createBurst(width * 0.05, height * 0.95, [-75, -25], 85, 22);
    // Right cannon shooting up & left
    createBurst(width * 0.95, height * 0.95, [-155, -105], 85, 22);
    // Center cannon shooting upwards
    createBurst(width * 0.5, height * 0.98, [-115, -65], 60, 24);

    // Staggered second burst at 1.8s
    const secondBurst = setTimeout(() => {
      createBurst(width * 0.2, height * 0.9, [-80, -40], 50, 20);
      createBurst(width * 0.8, height * 0.9, [-140, -100], 50, 20);
    }, 1800);

    // Third celebration burst at 4s
    const thirdBurst = setTimeout(() => {
      createBurst(width * 0.5, height * 0.6, [-180, 0], 70, 14);
    }, 4000);

    let animationFrameId: number;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Add gentle trickle from top for 12 seconds
      if (Math.random() < 0.35 && particles.length < 320) {
        particles.push({
          x: Math.random() * width,
          y: -15,
          vx: (Math.random() - 0.5) * 2,
          vy: 2 + Math.random() * 3,
          size: 5 + Math.random() * 6,
          color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
          shape: Math.random() > 0.4 ? "rect" : "circle",
          rotation: Math.random() * 360,
          vRot: (Math.random() - 0.5) * 8,
          tilt: Math.random() * 360,
          vTilt: (Math.random() - 0.5) * 6,
          opacity: 1,
          decay: 0.002,
        });
      }

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        // Physics: gravity + air drag
        p.vy += 0.24;
        p.vx *= 0.985;
        p.vy *= 0.985;

        p.rotation += p.vRot;
        p.tilt += p.vTilt;
        p.opacity -= p.decay;

        if (p.y > height + 50 || p.opacity <= 0) {
          particles.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.globalAlpha = Math.max(0, p.opacity);
        ctx.fillStyle = p.color;

        const cosTilt = Math.cos((p.tilt * Math.PI) / 180);

        if (p.shape === "circle") {
          ctx.beginPath();
          ctx.ellipse(0, 0, p.size / 2, (p.size / 2) * Math.abs(cosTilt), 0, 0, Math.PI * 2);
          ctx.fill();
        } else if (p.shape === "star") {
          // 4-point sparkle star
          ctx.beginPath();
          const r = p.size;
          ctx.moveTo(0, -r);
          ctx.quadraticCurveTo(0, 0, r, 0);
          ctx.quadraticCurveTo(0, 0, 0, r);
          ctx.quadraticCurveTo(0, 0, -r, 0);
          ctx.quadraticCurveTo(0, 0, 0, -r);
          ctx.fill();
        } else {
          // 3D fluttering rectangular foil ribbon
          const w = p.size;
          const h = p.size * 1.5 * cosTilt;
          ctx.fillRect(-w / 2, -h / 2, w, h);
        }

        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
      clearTimeout(secondBurst);
      clearTimeout(thirdBurst);
    };
  }, []);

  const handlePop = (id: number) => {
    setPoppedBalloons((prev) => new Set(prev).add(id));
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-[100] overflow-hidden">
      {/* 1. Confetti Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-10" />

      {/* 2. Floating Balloons */}
      <div className="absolute inset-0 z-20 pointer-events-none">
        {balloons.map((b) => {
          if (poppedBalloons.has(b.id)) return null;
          const colors = BALLOON_GRADIENTS[b.type];
          const gradId = `balloon-grad-${b.id}`;

          return (
            <motion.div
              key={b.id}
              initial={{
                y: "110vh",
                x: 0,
                rotate: 0,
                opacity: 0,
              }}
              animate={{
                y: "-30vh",
                opacity: [0, 1, 1, 0.9, 0],
                x: [0, b.swayDistance, -b.swayDistance, 0],
                rotate: [-4, 6, -6, 4],
              }}
              transition={{
                y: {
                  duration: b.duration,
                  delay: b.delay,
                  ease: "easeOut",
                },
                opacity: {
                  duration: b.duration,
                  delay: b.delay,
                  times: [0, 0.08, 0.8, 0.95, 1],
                },
                x: {
                  duration: b.swayDuration,
                  repeat: Infinity,
                  repeatType: "mirror",
                  ease: "easeInOut",
                  delay: b.delay,
                },
                rotate: {
                  duration: b.swayDuration * 1.2,
                  repeat: Infinity,
                  repeatType: "mirror",
                  ease: "easeInOut",
                  delay: b.delay,
                },
              }}
              style={{
                position: "absolute",
                left: `${b.x}%`,
                width: `${b.size}px`,
                cursor: "pointer",
                pointerEvents: "auto",
              }}
              onClick={() => handlePop(b.id)}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.9 }}
              title="Click to pop!"
            >
              <svg
                viewBox="0 0 100 240"
                width={b.size}
                height={b.size * 2.4}
                className="filter drop-shadow-[0_12px_24px_rgba(0,0,0,0.5)] select-none"
              >
                <defs>
                  {/* Realistic 3D Sphere Radial Gradient */}
                  <radialGradient
                    id={gradId}
                    cx="34%"
                    cy="28%"
                    r="68%"
                    fx="28%"
                    fy="22%"
                  >
                    <stop offset="0%" stopColor={colors.highlight} />
                    <stop offset="35%" stopColor={colors.mid1} />
                    <stop offset="70%" stopColor={colors.mid2} />
                    <stop offset="100%" stopColor={colors.deep} />
                  </radialGradient>
                </defs>

                {/* Hanging Wavy String */}
                <path
                  d="M 50 144 Q 42 165 55 190 T 44 215 T 52 238"
                  fill="none"
                  stroke={colors.string}
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />

                {/* Balloon Tie Knot */}
                <polygon
                  points="45,140 55,140 50,146"
                  fill={colors.mid2}
                />

                {/* Balloon Teardrop Body */}
                <path
                  d="M 50 12 C 22 12, 6 42, 6 68 C 6 102, 36 128, 47 139 L 53 139 C 64 128, 94 102, 94 68 C 94 42, 78 12, 50 12 Z"
                  fill={`url(#${gradId})`}
                />

                {/* Glossy High-Shine Specular Highlight */}
                <ellipse
                  cx="32"
                  cy="36"
                  rx="10"
                  ry="18"
                  transform="rotate(-28 32 36)"
                  fill="white"
                  opacity="0.45"
                />
                <circle cx="24" cy="22" r="3.5" fill="white" opacity="0.6" />
              </svg>
            </motion.div>
          );
        })}
      </div>

      {/* 3. Celebratory Top Banner / Toast */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: -50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -30, scale: 0.95 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="absolute top-5 left-1/2 -translate-x-1/2 z-30 pointer-events-auto max-w-lg w-[92%] sm:w-auto"
          >
            <div className="flex items-center gap-3 px-5 py-3 rounded-full bg-[#121212]/90 border border-gold/50 backdrop-blur-xl shadow-[0_8px_32px_rgba(201,162,75,0.35)] text-off-white">
              <span className="p-1.5 rounded-full bg-gold/20 text-gold-bright animate-bounce">
                <Sparkles size={18} />
              </span>
              <div className="flex flex-col text-left">
                <span className="font-display text-xs sm:text-sm font-bold uppercase tracking-wider gradient-text-gold">
                  Official Launch · Monica Estates
                </span>
                <span className="text-[11px] text-muted">
                  Welcome! The website is officially live.
                </span>
              </div>
              <button
                onClick={() => {
                  setShowToast(false);
                  if (onDismiss) onDismiss();
                }}
                className="ml-2 text-muted hover:text-off-white p-1 rounded-full transition-colors cursor-pointer"
                title="Dismiss"
              >
                <X size={16} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

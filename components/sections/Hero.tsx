"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  AnimatePresence,
} from "framer-motion";
import { useEffect, useRef, useState, useCallback } from "react";

// ─── Config ───────────────────────────────────────────────────────────────────
const PHOTO_PATH = "/hesham-basha.png";

// ─── Split text character by character ───────────────────────────────────────
function SplitChars({
  text,
  delay = 0,
  className,
}: {
  text: string;
  delay?: number;
  className?: string;
}) {
  return (
    <span aria-label={text} className={className}>
      {text.split("").map((char, i) => (
        <span
          key={i}
          style={{
            display: "inline-block",
            overflow: "hidden",
            lineHeight: "0.95em",
            verticalAlign: "top",
          }}
        >
          <motion.span
            style={{ display: "inline-block" }}
            initial={{ y: "105%" }}
            animate={{ y: "0%" }}
            transition={{
              delay: delay + i * 0.038,
              duration: 0.8,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

// ─── Line reveal wrapper ──────────────────────────────────────────────────────
function LineReveal({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <div style={{ overflow: "hidden" }}>
      <motion.div
        initial={{ y: "100%", opacity: 0 }}
        animate={{ y: "0%", opacity: 1 }}
        transition={{ delay, duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </div>
  );
}

// ─── Magnetic button ──────────────────────────────────────────────────────────
function MagneticButton({
  href,
  children,
  variant = "primary",
}: {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "outline";
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 350, damping: 25 });
  const springY = useSpring(y, { stiffness: 350, damping: 25 });

  const handleMouse = useCallback(
    (e: React.MouseEvent) => {
      const rect = ref.current?.getBoundingClientRect();
      if (!rect) return;
      x.set((e.clientX - rect.left - rect.width / 2) * 0.3);
      y.set((e.clientY - rect.top - rect.height / 2) * 0.3);
    },
    [x, y],
  );
  const handleLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  const base =
    "group relative inline-flex items-center justify-center gap-3 px-9 py-4 text-[11px] uppercase tracking-[0.28em] font-bold transition-colors duration-300 select-none cursor-pointer overflow-hidden";
  const styles = {
    primary: `${base} bg-primary text-white hover:bg-white hover:text-black`,
    outline: `${base} border border-white/25 text-white/70 hover:border-primary hover:text-primary`,
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      className={styles[variant]}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
      whileTap={{ scale: 0.97 }}
    >
      {children}
    </motion.a>
  );
}

// ─── Marquee ──────────────────────────────────────────────────────────────────
const TICKER_ITEMS = [
  "Brand Identity",
  "Visual Design",
  "Motion Graphics",
  "UI/UX Design",
  "Typography",
  "Art Direction",
  "Logo Design",
  "Campaign Design",
];

function MarqueeTicker() {
  const items = [...TICKER_ITEMS, ...TICKER_ITEMS, ...TICKER_ITEMS];
  return (
    <div className="overflow-hidden whitespace-nowrap">
      <motion.div
        className="inline-flex"
        animate={{ x: ["0%", "-33.333%"] }}
        transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
      >
        {items.map((item, i) => (
          <span key={i} className="inline-flex items-center gap-5 px-6">
            <span className="text-[10px] uppercase tracking-[0.32em] text-white/35 font-medium">
              {item}
            </span>
            <span className="text-primary text-[8px]">✦</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}

// ─── Contact icons data ───────────────────────────────────────────────────────
interface ContactIconDef {
  id: string;
  label: string;
  href: string;
  target: string;
  angle: number;
  color: string;
  icon: React.ReactNode;
}

const CONTACT_ICONS: ContactIconDef[] = [
  {
    id: "whatsapp",
    label: "WhatsApp",
    href: "https://wa.me/201092796730",
    target: "_blank",
    angle: -135,
    color: "#25D366",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="17" height="17">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    ),
  },
  {
    id: "phone",
    label: "اتصل بي",
    href: "tel:+201092796730",
    target: "_self",
    angle: -45,
    color: "#ff4800",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        width="17"
        height="17"
      >
        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8a19.79 19.79 0 01-3.07-8.67A2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z" />
      </svg>
    ),
  },
  {
    id: "email",
    label: "Email",
    href: "mailto:contact@heshambasha.com",
    target: "_self",
    angle: 135,
    color: "#ff4800",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        width="17"
        height="17"
      >
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
  },
  {
    id: "behance",
    label: "Behance",
    href: "https://www.behance.net/heshambasha14",
    target: "_blank",
    angle: 45,
    color: "#ff4800",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="17" height="17">
        <path d="M22 7h-7V5h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-3.074 0-5.564-1.729-5.564-5.675 0-3.91 2.325-5.92 5.466-5.92 3.082 0 4.964 1.782 5.375 4.426.078.506.109 1.188.095 2.14H15.97c.13 3.211 3.483 3.312 4.588 2.029H23.7zM15.97 13h4.406c-.093-1.615-1.116-2.313-2.16-2.313-1.109 0-2.032.702-2.246 2.313zm-5.983 2.288c-.133.42-.37.801-.717 1.127-.593.558-1.408.83-2.43.83H3v-10h4.195c2.235 0 3.628 1.042 3.628 2.867 0 .871-.313 1.606-.939 2.006.939.445 1.406 1.197 1.406 2.17H9.987zm-4.87-5.8H5.66v2.135h1.437c.787 0 1.22-.382 1.22-1.075 0-.681-.434-1.06-1.22-1.06zm.18 4.026H5.66v2.323h1.667c.83 0 1.32-.39 1.32-1.145 0-.786-.49-1.178-1.32-1.178z" />
      </svg>
    ),
  },
];

// ─── 3D Floating Photo with Orbital Icons ────────────────────────────────────
function PhotoOrbit() {
  const [isHovered, setIsHovered] = useState(false);
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);
  const leaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const rotateXRaw = useMotionValue(0);
  const rotateYRaw = useMotionValue(0);
  const springRX = useSpring(rotateXRaw, { stiffness: 180, damping: 22 });
  const springRY = useSpring(rotateYRaw, { stiffness: 180, damping: 22 });

  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      const dx = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
      const dy = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);
      rotateYRaw.set(dx * 16);
      rotateXRaw.set(-dy * 16);
    },
    [rotateXRaw, rotateYRaw],
  );

  const handleMouseLeave = useCallback(() => {
    rotateYRaw.set(0);
    rotateXRaw.set(0);
    leaveTimer.current = setTimeout(() => setIsHovered(false), 220);
  }, [rotateXRaw, rotateYRaw]);

  const handleMouseEnter = useCallback(() => {
    if (leaveTimer.current) clearTimeout(leaveTimer.current);
    setIsHovered(true);
  }, []);

  const ORBIT_R = 148;
  const SIZE = 300;
  const ICON_SIZE = 46;

  return (
    <div
      ref={containerRef}
      style={{
        width: SIZE,
        height: SIZE,
        position: "relative",
        perspective: "900px",
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* 3D photo card */}
      <motion.div
        style={{
          width: "100%",
          height: "100%",
          rotateX: springRX,
          rotateY: springRY,
          transformStyle: "preserve-3d",
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.75 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.1, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          style={{
            width: "100%",
            height: "100%",
            borderRadius: "50%",
            overflow: "hidden",
            position: "relative",
            boxShadow: [
              "0 0 0 2px rgba(255,72,0,0.55)",
              "0 24px 70px rgba(0,0,0,0.55)",
              "0 0 50px rgba(255,72,0,0.18)",
            ].join(", "),
          }}
        >
          <img
            src={PHOTO_PATH}
            alt="Hesham Basha"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center top",
              display: "block",
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "radial-gradient(ellipse at 35% 20%, rgba(255,72,0,0.07) 0%, transparent 55%), linear-gradient(to bottom, transparent 55%, rgba(0,0,0,0.4) 100%)",
              pointerEvents: "none",
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "radial-gradient(ellipse at 30% 22%, rgba(255,255,255,0.13) 0%, transparent 50%)",
              pointerEvents: "none",
            }}
          />
        </motion.div>

        <motion.div
          style={{
            position: "absolute",
            inset: "12%",
            borderRadius: "50%",
            background:
              "radial-gradient(ellipse, rgba(255,72,0,0.3) 0%, transparent 70%)",
            filter: "blur(18px)",
            translateZ: "-50px",
            transformStyle: "preserve-3d",
          }}
          animate={{
            scale: isHovered ? 1.35 : 1,
            opacity: isHovered ? 0.9 : 0.45,
          }}
          transition={{ duration: 0.5 }}
        />
      </motion.div>

      {/* Aura rings */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
        {[0, 1, 2].map((ring) => (
          <AnimatePresence key={ring}>
            {isHovered && (
              <motion.div
                initial={{ opacity: 0, scale: 0.82 }}
                animate={{
                  opacity: [0.1, 0.32 - ring * 0.07, 0.1],
                  scale: [0.95, 1.12 + ring * 0.06, 0.95],
                }}
                exit={{
                  opacity: 0,
                  scale: 0.85,
                  transition: { duration: 0.28 },
                }}
                transition={{
                  duration: 2.1,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: ring * 0.3,
                }}
                style={{
                  position: "absolute",
                  inset: `-${10 + ring * 14}px`,
                  borderRadius: "50%",
                  border: `${ring === 0 ? 1.5 : 1}px solid #ff4800`,
                  boxShadow:
                    ring === 0 ? "0 0 14px rgba(255,72,0,0.28)" : "none",
                }}
              />
            )}
          </AnimatePresence>
        ))}
      </div>

      {/* Orbital contact icons */}
      <AnimatePresence>
        {isHovered &&
          CONTACT_ICONS.map((icon, i) => {
            const rad = (icon.angle * Math.PI) / 180;
            const cx = SIZE / 2 + Math.cos(rad) * ORBIT_R;
            const cy = SIZE / 2 + Math.sin(rad) * ORBIT_R;

            return (
              <motion.div
                key={icon.id}
                initial={{
                  opacity: 0,
                  scale: 0.3,
                  x: SIZE / 2 - ICON_SIZE / 2,
                  y: SIZE / 2 - ICON_SIZE / 2,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  x: cx - ICON_SIZE / 2,
                  y: cy - ICON_SIZE / 2,
                }}
                exit={{
                  opacity: 0,
                  scale: 0.3,
                  x: SIZE / 2 - ICON_SIZE / 2,
                  y: SIZE / 2 - ICON_SIZE / 2,
                  transition: {
                    delay: (CONTACT_ICONS.length - 1 - i) * 0.04,
                    duration: 0.22,
                  },
                }}
                transition={{
                  delay: 0.05 + i * 0.07,
                  duration: 0.4,
                  ease: [0.22, 1, 0.36, 1],
                }}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: ICON_SIZE,
                  height: ICON_SIZE,
                  zIndex: 20,
                }}
                onMouseEnter={() => {
                  if (leaveTimer.current) clearTimeout(leaveTimer.current);
                  setIsHovered(true);
                  setActiveTooltip(icon.id);
                }}
                onMouseLeave={() => {
                  setActiveTooltip(null);
                  leaveTimer.current = setTimeout(
                    () => setIsHovered(false),
                    220,
                  );
                }}
              >
                <a
                  href={icon.href}
                  target={icon.target}
                  rel="noopener noreferrer"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "100%",
                    height: "100%",
                    borderRadius: "50%",
                    background:
                      icon.id === "whatsapp"
                        ? "rgba(37,211,102,0.14)"
                        : "rgba(255,72,0,0.12)",
                    border: `1.5px solid ${icon.color}`,
                    color: icon.color,
                    textDecoration: "none",
                    backdropFilter: "blur(8px)",
                    boxShadow:
                      icon.id === "whatsapp"
                        ? "0 4px 16px rgba(37,211,102,0.18)"
                        : "0 4px 16px rgba(255,72,0,0.14)",
                    transition:
                      "transform 0.18s ease, background 0.18s ease, box-shadow 0.18s ease",
                  }}
                  onMouseOver={(e) => {
                    const el = e.currentTarget as HTMLAnchorElement;
                    el.style.transform = "scale(1.22)";
                    el.style.background =
                      icon.id === "whatsapp"
                        ? "rgba(37,211,102,0.3)"
                        : "rgba(255,72,0,0.28)";
                    el.style.boxShadow =
                      icon.id === "whatsapp"
                        ? "0 6px 24px rgba(37,211,102,0.38)"
                        : "0 6px 24px rgba(255,72,0,0.32)";
                  }}
                  onMouseOut={(e) => {
                    const el = e.currentTarget as HTMLAnchorElement;
                    el.style.transform = "scale(1)";
                    el.style.background =
                      icon.id === "whatsapp"
                        ? "rgba(37,211,102,0.14)"
                        : "rgba(255,72,0,0.12)";
                    el.style.boxShadow =
                      icon.id === "whatsapp"
                        ? "0 4px 16px rgba(37,211,102,0.18)"
                        : "0 4px 16px rgba(255,72,0,0.14)";
                  }}
                >
                  {icon.icon}
                </a>

                <AnimatePresence>
                  {activeTooltip === icon.id && (
                    <motion.div
                      initial={{ opacity: 0, y: 5, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 5, scale: 0.9 }}
                      transition={{ duration: 0.14 }}
                      style={{
                        position: "absolute",
                        bottom: "calc(100% + 7px)",
                        left: "50%",
                        transform: "translateX(-50%)",
                        background: "rgba(6,6,6,0.94)",
                        backdropFilter: "blur(10px)",
                        border: "1px solid rgba(255,72,0,0.22)",
                        borderRadius: 5,
                        padding: "4px 10px",
                        whiteSpace: "nowrap",
                        fontSize: 10,
                        letterSpacing: "0.07em",
                        color: "rgba(255,255,255,0.88)",
                        pointerEvents: "none",
                        zIndex: 99,
                      }}
                    >
                      {icon.label}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
      </AnimatePresence>
    </div>
  );
}

// ─── Hero Brand Visual — Redesigned ──────────────────────────────────────────
function HeroBrandVisual() {
  const W = 480,
    H = 600;

  const slabPoints = `30,55 430,30 450,510 50,535`;
  const slabInner = `46,72 414,48 434,493 66,518`;

  const pCX = 240,
    pCY = 292;
  const pFOSize = 320;
  const pFOX = pCX - pFOSize / 2;
  const pFOY = pCY - pFOSize / 2;

  return (
    <div className="relative w-full h-full">
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox={`0 0 ${W} ${H}`}
        aria-hidden="true"
      >
        <defs>
          <pattern
            id="hb-dots"
            width="28"
            height="28"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="1.5" cy="1.5" r="1.5" fill="rgba(255,72,0,0.18)" />
          </pattern>
        </defs>
        <rect width={W} height={H} fill="url(#hb-dots)" />
      </svg>

      <svg
        className="relative w-full h-full"
        viewBox={`0 0 ${W} ${H}`}
        aria-hidden="true"
        style={{ overflow: "visible" }}
      >
        <defs>
          <filter id="hb-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <clipPath id="slab-clip">
            <polygon points={slabInner} />
          </clipPath>
        </defs>

        <motion.polygon
          points={slabPoints}
          fill="#ff4800"
          initial={{ clipPath: "inset(100% 0 0 0)", opacity: 0 }}
          animate={{ clipPath: "inset(0% 0 0 0)", opacity: 1 }}
          transition={{ delay: 0.4, duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
        />

        <motion.polygon
          points={slabInner}
          fill="#060606"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.45 }}
        />

        <motion.line
          x1="30"
          y1="55"
          x2="430"
          y2="30"
          stroke="#ff4800"
          strokeWidth="1.5"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.55 }}
          transition={{ delay: 0.38, duration: 0.6 }}
        />
        <motion.line
          x1="50"
          y1="535"
          x2="450"
          y2="510"
          stroke="#ff4800"
          strokeWidth="1.5"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.55 }}
          transition={{ delay: 0.42, duration: 0.6 }}
        />

        <motion.foreignObject
          x={pFOX}
          y={pFOY}
          width={pFOSize}
          height={pFOSize}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.92, duration: 0.55 }}
          style={{ overflow: "visible" }}
        >
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              overflow: "visible",
            }}
          >
            <PhotoOrbit />
          </div>
        </motion.foreignObject>

        <motion.rect
          x="0"
          y="72"
          width={W}
          height="2"
          fill="white"
          opacity={0.08}
          clipPath="url(#slab-clip)"
          initial={{ y: 72 }}
          animate={{ y: [72, 493, 72] }}
          transition={{
            delay: 2.0,
            duration: 4.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <motion.circle
          cx="448"
          cy="78"
          r="42"
          fill="none"
          stroke="#ff4800"
          strokeWidth="1.5"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.7 }}
          transition={{ delay: 0.78, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          style={{ transformOrigin: "448px 78px" }}
        />
        <motion.circle
          cx="448"
          cy="78"
          r="26"
          fill="#ff4800"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.12 }}
          transition={{ delay: 0.88, duration: 0.65 }}
          style={{ transformOrigin: "448px 78px" }}
        />
        <motion.circle
          cx="448"
          cy="78"
          r="5"
          fill="#ff4800"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1.02, duration: 0.35 }}
          style={{ transformOrigin: "448px 78px" }}
        />

        <motion.circle
          cx="22"
          cy="548"
          r="18"
          fill="none"
          stroke="#ff4800"
          strokeWidth="1"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.4 }}
          transition={{ delay: 1.1, duration: 0.5 }}
          style={{ transformOrigin: "22px 548px" }}
        />
        <motion.circle
          cx="22"
          cy="548"
          r="4"
          fill="#ff4800"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.7 }}
          transition={{ delay: 1.2, duration: 0.35 }}
          style={{ transformOrigin: "22px 548px" }}
        />

        <motion.text
          x="38"
          y="50"
          fontFamily="monospace"
          fontSize="11"
          fill="#ff4800"
          letterSpacing="3"
          opacity={0}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.55 }}
          transition={{ delay: 1.2, duration: 0.5 }}
        >
          01
        </motion.text>

        <motion.text
          fontFamily="monospace"
          fontSize="7.5"
          fill="rgba(255,255,255,0.22)"
          letterSpacing="5"
          transform={`rotate(-90 14 ${pCY}) translate(-60 0)`}
          textAnchor="middle"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.45, duration: 0.6 }}
        >
          VISUAL DESIGNER
        </motion.text>

        <motion.text
          fontFamily="monospace"
          fontSize="7.5"
          fill="rgba(255,255,255,0.18)"
          letterSpacing="5"
          transform={`rotate(90 ${W - 14} ${pCY}) translate(-40 0)`}
          textAnchor="middle"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.55, duration: 0.6 }}
        >
          CAIRO · EG
        </motion.text>

        {[
          { cx: 30, cy: 55 },
          { cx: 430, cy: 30 },
          { cx: 450, cy: 510 },
          { cx: 50, cy: 535 },
        ].map((pt, i) => (
          <motion.g
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 + i * 0.07, duration: 0.4 }}
          >
            <line
              x1={pt.cx - 10}
              y1={pt.cy}
              x2={pt.cx + 10}
              y2={pt.cy}
              stroke="#ff4800"
              strokeWidth="1.5"
            />
            <line
              x1={pt.cx}
              y1={pt.cy - 10}
              x2={pt.cx}
              y2={pt.cy + 10}
              stroke="#ff4800"
              strokeWidth="1.5"
            />
          </motion.g>
        ))}

        <motion.line
          x1="0"
          y1="557"
          x2={W}
          y2="557"
          stroke="#ff4800"
          strokeWidth="0.8"
          opacity={0.3}
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ delay: 1.1, duration: 0.9 }}
        />

        <motion.text
          x={W / 2}
          y="574"
          textAnchor="middle"
          fontFamily="monospace"
          fontSize="9"
          fill="#ffffff"
          letterSpacing="7"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.22 }}
          transition={{ delay: 1.55, duration: 0.6 }}
        >
          CREATIVE STUDIO · CAIRO
        </motion.text>

        <motion.text
          x={W - 20}
          y="22"
          textAnchor="end"
          fontFamily="monospace"
          fontSize="9"
          fill="#ff4800"
          letterSpacing="2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ delay: 1.6, duration: 0.5 }}
        >
          PORTFOLIO 2025
        </motion.text>

        <motion.line
          x1="430"
          y1="30"
          x2="460"
          y2="200"
          stroke="#ff4800"
          strokeWidth="0.8"
          strokeDasharray="4 5"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.28 }}
          transition={{ delay: 1.22, duration: 0.9 }}
        />
        <motion.line
          x1="50"
          y1="535"
          x2="18"
          y2="400"
          stroke="#ff4800"
          strokeWidth="0.8"
          strokeDasharray="4 5"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.28 }}
          transition={{ delay: 1.28, duration: 0.9 }}
        />

        <motion.rect
          x="418"
          y="524"
          width="14"
          height="14"
          fill="#ff4800"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1.18, duration: 0.3 }}
          style={{ transformOrigin: "425px 531px" }}
        />
        <motion.rect
          x="436"
          y="524"
          width="14"
          height="14"
          fill="none"
          stroke="#ff4800"
          strokeWidth="1.5"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1.25, duration: 0.3 }}
          style={{ transformOrigin: "443px 531px" }}
        />
      </svg>

      <motion.div
        className="absolute top-3 right-3 w-2.5 h-2.5 rounded-full bg-primary"
        animate={{ scale: [1, 1.8, 1], opacity: [1, 0.4, 1] }}
        transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}



// ─── Split text character by character ───────────────────────────────────────
function SplitCharsGlowing({
  text,
  delay = 0,
  className,
  glowing = false, // new prop
}: {
  text: string;
  delay?: number;
  className?: string;
  glowing?: boolean;
}) {
  return (
    <span aria-label={text} className={className}>
      {text.split("").map((char, i) => (
        <span
          key={i}
          style={{
            display: "inline-block",
            overflow: "hidden",
            lineHeight: "0.95em",
            verticalAlign: "top",
          }}
        >
          <motion.span
            style={{
              display: "inline-block",
              textShadow: glowing
                ? "0 0 12px rgba(255, 72, 0, 0.45), 0 0 30px rgba(255, 72, 0, 0.15)"
                : "none",
            }}
            initial={{ y: "105%" }}
            animate={{ y: "0%" }}
            transition={{
              delay: delay + i * 0.038,
              duration: 0.8,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

// ─── Cursor glow ──────────────────────────────────────────────────────────────
function CursorGlow() {
  const cursorX = useMotionValue(-200);
  const cursorY = useMotionValue(-200);
  const springX = useSpring(cursorX, { stiffness: 80, damping: 20 });
  const springY = useSpring(cursorY, { stiffness: 80, damping: 20 });

  useEffect(() => {
    const move = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [cursorX, cursorY]);

  return (
    <motion.div className="pointer-events-none fixed inset-0 z-0">
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full"
        style={{
          x: springX,
          y: springY,
          translateX: "-50%",
          translateY: "-50%",
          background:
            "radial-gradient(circle, rgba(255,72,0,0.07) 0%, transparent 65%)",
          pointerEvents: "none",
        }}
      />
    </motion.div>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
export function Hero() {
  const stats = [
    { value: "50+", label: "Projects" },
    { value: "2+", label: "Years" },
    { value: "20+", label: "Clients" },
  ];

  return (
    <section className="relative min-h-screen flex flex-col bg-brand-black text-white overflow-hidden border-b border-white/10">
      <CursorGlow />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-10 opacity-[0.04]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "180px 180px",
        }}
      />

      <div className="relative z-20 flex flex-col lg:flex-row flex-1 max-w-[1400px] mx-auto w-full px-6 lg:px-16 xl:px-20 pt-28 lg:pt-36 pb-12 gap-10 lg:gap-6">
        <div className="flex flex-col justify-center lg:w-[54%]">
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              delay: 0.1,
              duration: 0.65,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="flex items-center gap-4 mb-10 lg:mb-14"
          >
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{
                delay: 0.12,
                duration: 0.5,
                ease: [0.22, 1, 0.36, 1],
              }}
              style={{ transformOrigin: "left" }}
              className="w-10 h-px bg-primary"
            />
            <span className="font-accent text-[10px] uppercase tracking-[0.32em] text-primary">
              Creative Studio · Cairo
            </span>
          </motion.div>

          <h1 className="mb-8 lg:mb-12 font-bold leading-[0.9] tracking-[-0.025em]">
            <div className="text-[clamp(3.5rem,9vw,8rem)] mb-1">
              <SplitCharsGlowing text="Hesham" delay={0.2} glowing />
            </div>
            <div className="text-[clamp(3.5rem,9vw,8rem)] text-primary">
              <SplitChars text="Basha" delay={0.36} />
            </div>
          </h1>
          <div className="mb-10 lg:mb-14">
            <LineReveal delay={0.9}>
              <p className="text-base lg:text-lg text-white/55 max-w-[420px] leading-[1.75]">
                Crafting bold visual systems and meaningful brand identities
                that leave a lasting impression on brands worldwide.
              </p>
            </LineReveal>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 1.05,
              duration: 0.7,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="flex flex-wrap gap-4 mb-14 lg:mb-20"
          >
            <MagneticButton href="/projects" variant="primary">
              View My Work
              <motion.span
                animate={{ x: [0, 4, 0] }}
                transition={{
                  duration: 1.8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="inline-block"
              >
                →
              </motion.span>
            </MagneticButton>
            <MagneticButton href="/about" variant="outline">
              About Me
            </MagneticButton>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.25, duration: 0.6 }}
            className="flex gap-10 pt-8 border-t border-white/[0.08]"
          >
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.35 + i * 0.1, duration: 0.55 }}
              >
                <p className="text-3xl lg:text-4xl font-bold text-primary tracking-tight">
                  {s.value}
                </p>
                <p className="text-[10px] uppercase tracking-[0.28em] text-white/35 mt-1.5">
                  {s.label}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <div className="lg:w-[46%] flex items-center justify-center lg:justify-end">
          <motion.div
            initial={{ opacity: 0, clipPath: "inset(100% 0% 0% 0%)" }}
            animate={{ opacity: 1, clipPath: "inset(0% 0% 0% 0%)" }}
            transition={{
              delay: 0.42,
              duration: 1.15,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="relative w-full max-w-[460px] aspect-[4/5]"
          >
            <HeroBrandVisual />
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.6 }}
        className="relative z-20 hidden lg:flex flex-col items-center gap-2 pb-8"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-[9px] uppercase tracking-[0.35em] text-white/30">
            Scroll
          </span>
          <div className="w-px h-8 bg-gradient-to-b from-primary/50 to-transparent" />
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.55, duration: 0.5 }}
        className="relative z-20 border-t border-white/[0.07] py-3.5"
      >
        <MarqueeTicker />
      </motion.div>
    </section>
  );
}

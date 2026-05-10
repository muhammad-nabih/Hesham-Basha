"use client";

import Image from "next/image";
import { motion, useAnimationControls } from "framer-motion";
import { useEffect, useRef } from "react";

/* ─── partner data ─────────────────────────────────────────────────── */
const partners = Array.from({ length: 10 }, (_, i) => ({
  id: i + 1,
  src: `/success_partners/${i + 1}.png`,
  alt: `Success Partner ${i + 1}`,
  spotlight: i + 1 === 1 
//   || i + 1 === 2, // ← the two highlighted ones
}));

/* ─── Eye SVG icon ─────────────────────────────────────────────────── */
function EyeIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <ellipse cx="12" cy="12" rx="10" ry="6" />
      <circle cx="12" cy="12" r="3" />
      <circle cx="12" cy="12" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

/* ─── Animated corner accent ───────────────────────────────────────── */
function CornerAccent({ position }: { position: "tl" | "tr" | "bl" | "br" }) {
  const base = "absolute w-3 h-3 pointer-events-none";
  const pos = {
    tl: "top-0 left-0 border-t border-l",
    tr: "top-0 right-0 border-t border-r",
    bl: "bottom-0 left-0 border-b border-l",
    br: "bottom-0 right-0 border-b border-r",
  }[position];

  return (
    <span
      className={`${base} ${pos}`}
      style={{ borderColor: "var(--color-primary, #c9a84c)" }}
    />
  );
}

/* ─── SpotlightCard: used for partners 5 & 6 ─────────────────────── */
function SpotlightCard({
  partner,
  index,
}: {
  partner: (typeof partners)[0];
  index: number;
}) {
  const controls = useAnimationControls();

  /* slow-pulse the ring forever */
  useEffect(() => {
    controls.start({
      scale: [1, 1.08, 1],
      opacity: [0.6, 1, 0.6],
      transition: { duration: 3, repeat: Infinity, ease: "easeInOut" },
    });
  }, [controls]);

  return (
    <motion.div
      className="relative flex items-center justify-center"
      initial={{ opacity: 0, scale: 0.88, y: 24 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.6,
        delay: index * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
      aria-label={`${partner.alt} — featured partner`}
    >
      {/* outer pulsing ring */}
      <motion.span
        animate={controls}
        className="absolute inset-0 rounded-sm pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(201,168,76,0.12) 0%, transparent 70%)",
          border: "1px solid rgba(201,168,76,0.45)",
          boxShadow:
            "0 0 28px 4px rgba(201,168,76,0.18), inset 0 0 20px rgba(201,168,76,0.06)",
          willChange: "transform, opacity",
        }}
      />

      {/* corner brackets */}
      <CornerAccent position="tl" />
      <CornerAccent position="tr" />
      <CornerAccent position="bl" />
      <CornerAccent position="br" />

      {/* logo */}
      <div className="relative flex items-center justify-center w-full h-[140px] px-6 py-10">
        <Image
          src={partner.src}
          alt={partner.alt}
          width={320}
          height={160}
          className="object-contain max-h-[110px] w-full opacity-95 transition-transform duration-500 group-hover:scale-105"
          style={{ filter: "brightness(1.08)" }}
        />
      </div>

      {/* eye badge – top-right */}
      <motion.span
        initial={{ opacity: 0, scale: 0.5 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{
          delay: 0.55 + index * 0.08,
          duration: 0.4,
          ease: "backOut",
        }}
        className="absolute -top-3 -right-3 flex items-center justify-center w-6 h-6 rounded-full z-10"
        style={{
          background: "var(--color-primary, #c9a84c)",
          boxShadow: "0 0 12px rgba(201,168,76,0.5)",
        }}
        aria-hidden="true"
      >
        <EyeIcon className="w-3 h-3 text-black" />
      </motion.span>

      {/* "featured" micro-label */}
      <span
        className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-[9px] uppercase tracking-[0.28em] whitespace-nowrap"
        style={{ color: "rgba(201,168,76,0.65)" }}
        aria-hidden="true"
      >
        featured
      </span>
    </motion.div>
  );
}

/* ─── RegularCard ───────────────────────────────────────────────────── */
function RegularCard({
  partner,
  index,
}: {
  partner: (typeof partners)[0];
  index: number;
}) {
  return (
    <motion.div
      className="group relative flex items-center justify-center border border-white/[0.07] rounded-sm overflow-hidden"
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.55,
        delay: index * 0.06,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{
        borderColor: "rgba(201,168,76,0.3)",
        transition: { duration: 0.2 },
      }}
      style={{ willChange: "transform, opacity" }}
      aria-label={partner.alt}
    >
      {/* hover shimmer */}
      <span
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(201,168,76,0.05) 0%, transparent 65%)",
        }}
      />

      <div className="relative px-6 py-10 flex items-center justify-center w-full h-[140px]">
        <Image
          src={partner.src}
          alt={partner.alt}
          width={320}
          height={160}
          className="object-cover max-h-[100px] w-full opacity-55 group-hover:opacity-85 transition-all duration-500 group-hover:scale-105"
          style={{ filter: "grayscale(1) brightness(1.4)" }}
        />
      </div>
    </motion.div>
  );
}

/* ─── Main section ─────────────────────────────────────────────────── */
export default function SuccessPartners() {
  /* split into two rows for layout control:
     row 1: partners 1-5  →  [1,2,3,4, SPOTLIGHT-5]
     row 2: partners 6-10 →  [SPOTLIGHT-6, 7,8,9,10]               */

  const row1 = partners.slice(0, 5); // ids 1-5
  const row2 = partners.slice(5, 10); // ids 6-10

  return (
    <section
      id="success-partners"
      aria-label="Success Partners"
      className="relative py-28 lg:py-36 overflow-hidden"
      style={{ background: "var(--color-brand-black, #0a0a0a)" }}
    >
      {/* ── background grain + radial glow ── */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundSize: "300px",
        }}
      />
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full opacity-[0.07]"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(201,168,76,1) 0%, transparent 65%)",
          filter: "blur(60px)",
        }}
      />

      <div className="relative max-w-6xl mx-auto px-6 lg:px-8">
        {/* ── heading block ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16 lg:mb-20 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6"
        >
          <div>
            <p
              className="font-accent text-[10px] uppercase tracking-[0.35em] mb-3"
              style={{ color: "var(--color-primary, #c9a84c)" }}
            >
              Collaboration
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight tracking-tight">
              Success Partners
            </h2>
          </div>
          <p className="text-sm text-white/40 sm:text-right max-w-[240px] leading-relaxed">
            Selected collaborators &amp; clients I&apos;ve had the privilege to
            work with.
          </p>
        </motion.div>

        {/* ── divider line ── */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12 h-px origin-left"
          style={{ background: "rgba(255,255,255,0.07)" }}
        />

        {/* ── row 1: 5 logos ── */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mb-8">
          {row1.map((partner, i) =>
            partner.spotlight ? (
              <div key={partner.id} className="relative pt-2 pb-6">
                <SpotlightCard partner={partner} index={i} />
              </div>
            ) : (
              <RegularCard key={partner.id} partner={partner} index={i} />
            ),
          )}
        </div>

        {/* ── row 2: 5 logos ── */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {row2.map((partner, i) =>
            partner.spotlight ? (
              <div key={partner.id} className="relative pt-2 pb-6">
                <SpotlightCard partner={partner} index={i + 5} />
              </div>
            ) : (
              <RegularCard key={partner.id} partner={partner} index={i + 5} />
            ),
          )}
        </div>

        {/* ── bottom meta row ── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 flex items-center gap-4"
        >
          <div
            className="h-px flex-1"
            style={{ background: "rgba(255,255,255,0.06)" }}
          />
          <div className="flex items-center gap-2">
            <EyeIcon className="w-3.5 h-3.5 text-primary" />
            <span
              className="text-[10px] uppercase tracking-[0.3em]"
              style={{ color: "rgba(255,255,255,0.25)" }}
            >
              10 brands · worldwide
            </span>
          </div>
          <div
            className="h-px flex-1"
            style={{ background: "rgba(255,255,255,0.06)" }}
          />
        </motion.div>
      </div>
    </section>
  );
}

"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { urlFor } from "@/lib/sanity";
import { ImmersiveGallery } from "@/components/sections/ImmersiveGallery";

// ─── Types ────────────────────────────────────────────────────────────────────
interface ProjectDetailClientProps {
  project: any;
  heroImageSrc: string;
  nextProject: any;
  prevProject: any;
  currentIndex: number;
  totalProjects: number;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────
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
            initial={{ y: "110%" }}
            animate={{ y: "0%" }}
            transition={{
              delay: delay + i * 0.028,
              duration: 0.72,
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

const Grain = () => (
  <div
    aria-hidden="true"
    className="pointer-events-none absolute inset-0 opacity-[0.035]"
    style={{
      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
      backgroundRepeat: "repeat",
      backgroundSize: "180px",
    }}
  />
);

// ─── Hero section with parallax ───────────────────────────────────────────────
function ProjectHero({
  project,
  heroImageSrc,
  currentIndex,
  totalProjects,
}: any) {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 1], [0.45, 0.75]);

  return (
    <section
      ref={heroRef}
      className="relative w-full h-[55vh] md:h-[75vh] lg:h-[90vh] overflow-hidden bg-brand-black"
    >
      {/* Parallax image */}
      <motion.div
        style={{ y: imageY }}
        className="absolute inset-0 scale-[1.12]"
      >
        <Image
          src={heroImageSrc}
          alt={project.title}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
      </motion.div>

      {/* Overlay */}
      <motion.div
        style={{ opacity: overlayOpacity }}
        className="absolute inset-0 bg-brand-black"
      />

      {/* Top orange rule */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        style={{ transformOrigin: "left" }}
        className="absolute top-0 left-0 right-0 h-px bg-primary z-10"
      />

      {/* Counter top-right */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="absolute top-8 right-8 z-10 text-[10px] font-mono text-white/30 tracking-widest"
      >
        {String(currentIndex + 1).padStart(2, "0")} /{" "}
        {String(totalProjects).padStart(2, "0")}
      </motion.div>

      {/* Bottom content */}
      <div className="absolute bottom-0 left-0 right-0 z-10 max-w-[1400px] mx-auto px-6 lg:px-16 xl:px-20 pb-12 lg:pb-20">
        {/* Type badge */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="inline-flex items-center gap-2 bg-primary px-4 py-2 mb-6"
        >
          <span className="text-[9px] uppercase tracking-[0.3em] font-bold text-white">
            {project.projectType}
          </span>
        </motion.div>

        {/* Title */}
        <h1 className="font-black leading-[0.9] tracking-[-0.025em] text-white">
          {project.title.split(" ").map((word: string, i: number) => (
            <div key={i} className="text-[clamp(2.5rem,7vw,6.5rem)]">
              <SplitChars text={word} delay={0.4 + i * 0.14} />
            </div>
          ))}
        </h1>
      </div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.5 }}
        className="absolute bottom-8 right-8 z-10 hidden lg:flex flex-col items-center gap-2"
      >
        <span className="text-[9px] uppercase tracking-[0.35em] text-white/30">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-8 bg-gradient-to-b from-primary/50 to-transparent"
        />
      </motion.div>
    </section>
  );
}

// ─── Meta + overview ──────────────────────────────────────────────────────────
function ProjectInfo({ project }: { project: any }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const meta = [
    { label: "Year", value: project.year },
    { label: "Type", value: project.projectType },
    {
      label: "Tools",
      value: project.tools?.length ? `${project.tools.length} tools` : "—",
    },
  ];

  return (
    <section
      ref={ref}
      className="bg-brand-black text-white border-b border-white/[0.07]"
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-16 xl:px-20 py-20 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-20">
          {/* Meta sidebar */}
          <div className="lg:col-span-4 flex flex-col gap-8">
            {meta.map((m, i) => (
              <motion.div
                key={m.label}
                initial={{ opacity: 0, y: 14 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  delay: i * 0.1,
                  duration: 0.6,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <p className="text-[9px] uppercase tracking-[0.32em] text-white/30 mb-2 font-mono">
                  {m.label}
                </p>
                <p className="text-xl font-bold text-white capitalize">
                  {m.value}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Short description */}
          <div className="lg:col-span-8">
            <div style={{ overflow: "hidden" }} className="mb-3">
              <motion.div
                initial={{ y: "100%" }}
                animate={inView ? { y: "0%" } : {}}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="flex items-center gap-3"
              >
                <div className="w-5 h-px bg-primary" />
                <span className="text-[10px] uppercase tracking-[0.3em] text-primary font-semibold">
                  Overview
                </span>
              </motion.div>
            </div>
            <div style={{ overflow: "hidden" }}>
              <motion.p
                initial={{ y: "100%", opacity: 0 }}
                animate={inView ? { y: "0%", opacity: 1 } : {}}
                transition={{
                  delay: 0.12,
                  duration: 0.8,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="text-xl lg:text-2xl text-white/60 leading-[1.6] font-medium"
              >
                {project.shortDescription}
              </motion.p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Full description ─────────────────────────────────────────────────────────
function ProjectOverview({ project }: { project: any }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section ref={ref} className="bg-surface border-b border-border">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-16 xl:px-20 py-20 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-20">
          <div className="lg:col-span-4">
            <div style={{ overflow: "hidden" }} className="mb-4">
              <motion.div
                initial={{ y: "100%" }}
                animate={inView ? { y: "0%" } : {}}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="flex items-center gap-3"
              >
                <div className="w-5 h-px bg-primary" />
                <span className="text-[10px] uppercase tracking-[0.3em] text-primary font-semibold">
                  Project
                </span>
              </motion.div>
            </div>
            <div style={{ overflow: "hidden" }}>
              <motion.h2
                initial={{ y: "100%", opacity: 0 }}
                animate={inView ? { y: "0%", opacity: 1 } : {}}
                transition={{
                  delay: 0.08,
                  duration: 0.75,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="text-3xl lg:text-4xl font-black tracking-[-0.02em]"
              >
                Full Overview
              </motion.h2>
            </div>
          </div>

          <motion.div
            className="lg:col-span-8"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{
              delay: 0.18,
              duration: 0.75,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <p className="text-base lg:text-lg text-muted-foreground leading-[1.85] whitespace-pre-wrap">
              {project.fullDescription}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── Gallery — delegates to ImmersiveGallery ──────────────────────────────────
function ProjectGallery({ project }: { project: any }) {
  if (!project.galleryImages || project.galleryImages.length === 0) return null;
  return <ImmersiveGallery items={project.galleryImages} />;
}

// ─── Prev / Next navigation ───────────────────────────────────────────────────
function ProjectNav({
  prevProject,
  nextProject,
}: {
  prevProject: any;
  nextProject: any;
}) {
  return (
    <section className="bg-brand-black text-white">
      <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-white/[0.07]">
        {/* Prev */}
        {prevProject && (
          <Link href={`/projects/${prevProject.slug}`}>
            <motion.div
              whileHover="hover"
              className="group relative overflow-hidden px-8 lg:px-16 py-14 lg:py-20 flex flex-col gap-5 cursor-pointer"
            >
              {/* Hover fill */}
              <motion.div
                variants={{ hover: { scaleX: 1 } }}
                initial={{ scaleX: 0 }}
                style={{ transformOrigin: "right" }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0 bg-white/[0.04]"
              />

              <div className="relative flex items-center gap-3">
                <motion.span
                  variants={{ hover: { x: -4 } }}
                  transition={{ duration: 0.3 }}
                  className="text-primary text-lg"
                >
                  ←
                </motion.span>
                <span className="text-[10px] uppercase tracking-[0.3em] text-white/30 font-semibold">
                  Previous
                </span>
              </div>

              <div className="relative">
                <p className="text-[10px] uppercase tracking-[0.3em] text-primary font-semibold mb-2">
                  {prevProject.projectType}
                </p>
                <h3 className="text-2xl lg:text-3xl font-black tracking-tight text-white group-hover:text-primary transition-colors duration-300">
                  {prevProject.title}
                </h3>
              </div>
            </motion.div>
          </Link>
        )}

        {/* Next */}
        {nextProject && (
          <Link href={`/projects/${nextProject.slug}`}>
            <motion.div
              whileHover="hover"
              className="group relative overflow-hidden px-8 lg:px-16 py-14 lg:py-20 flex flex-col items-end gap-5 cursor-pointer text-right"
            >
              <motion.div
                variants={{ hover: { scaleX: 1 } }}
                initial={{ scaleX: 0 }}
                style={{ transformOrigin: "left" }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0 bg-white/[0.04]"
              />

              <div className="relative flex items-center gap-3">
                <span className="text-[10px] uppercase tracking-[0.3em] text-white/30 font-semibold">
                  Next
                </span>
                <motion.span
                  variants={{ hover: { x: 4 } }}
                  transition={{ duration: 0.3 }}
                  className="text-primary text-lg"
                >
                  →
                </motion.span>
              </div>

              <div className="relative">
                <p className="text-[10px] uppercase tracking-[0.3em] text-primary font-semibold mb-2">
                  {nextProject.projectType}
                </p>
                <h3 className="text-2xl lg:text-3xl font-black tracking-tight text-white group-hover:text-primary transition-colors duration-300">
                  {nextProject.title}
                </h3>
              </div>
            </motion.div>
          </Link>
        )}
      </div>

      {/* Back to all */}
      <div className="border-t border-white/[0.07] px-8 lg:px-16 py-8 flex justify-center">
        <Link
          href="/projects"
          className="text-[10px] uppercase tracking-[0.32em] text-white/30 hover:text-primary transition-colors duration-200 font-semibold"
        >
          ← All Projects
        </Link>
      </div>
    </section>
  );
}

// ─── Main client component ────────────────────────────────────────────────────
export function ProjectDetailClient({
  project,
  heroImageSrc,
  nextProject,
  prevProject,
  currentIndex,
  totalProjects,
}: ProjectDetailClientProps) {
  return (
    <>
      <ProjectHero
        project={project}
        heroImageSrc={heroImageSrc}
        currentIndex={currentIndex}
        totalProjects={totalProjects}
      />
      <ProjectInfo project={project} />
      <ProjectOverview project={project} />
      <ProjectGallery project={project} />
      <ProjectNav prevProject={prevProject} nextProject={nextProject} />
    </>
  );
}

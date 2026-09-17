"use client";

import { useRef, useState } from "react";
import type React from "react";
import { ArrowRightIcon } from "./ui/icons";
import { SocialLinks } from "./ui/social-links";
import { GhostFibers } from "./ui/ghost-fibers";
import { PERSONAL_INFO } from "../data/portfolio-data";
import { useRouter } from "next/navigation";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

// Helper component to split text into spans per character
const AnimatedText = ({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) => {
  return (
    <span
      className={className}
      style={{ display: "inline-block", perspective: "1000px" }}
    >
      {text.split("").map((char, index) => (
        <span
          key={index}
          className="hero-char inline-block opacity-0"
          style={{ whiteSpace: "pre" }}
        >
          {char}
        </span>
      ))}
    </span>
  );
};

export const CoverHero = () => {
  const containerRef = useRef<HTMLElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const router = useRouter();
  const [isTransitioning, setIsTransitioning] = useState(false);

  useGSAP(
    () => {
      // Entrance Timeline
      const tl = gsap.timeline();

      // 1. Animate characters in 3D
      tl.fromTo(
        ".hero-char",
        { y: 120, opacity: 0, rotationX: -90, transformOrigin: "0% 50% -50" },
        {
          y: 0,
          opacity: 1,
          rotationX: 0,
          stagger: 0.015,
          duration: 1.2,
          ease: "expo.out",
        },
      );

      // 2. Fade in subtitle
      tl.fromTo(
        ".hero-subtitle",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
        "-=0.8",
      );

      // 3. Pop the CTA button
      tl.fromTo(
        buttonRef.current,
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1, ease: "back.out(1.5)" },
        "-=0.6",
      );
    },
    { scope: containerRef },
  );

  // "WOW" Exit Effect
  const handleOpenPortfolio = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);

    const tl = gsap.timeline({
      onComplete: () => {
        router.push("/about");
      },
    });

    // 1. Fade out background and surrounding UI
    tl.to(".fade-out-target", {
      opacity: 0,
      duration: 0.4,
      ease: "power2.inOut",
    });

    // 2. Letters explode outwards in 3D
    tl.to(
      ".hero-char",
      {
        z: 800,
        y: () => gsap.utils.random(-500, -100),
        x: () => gsap.utils.random(-300, 300),
        rotationX: () => gsap.utils.random(-180, 180),
        rotationY: () => gsap.utils.random(-180, 180),
        opacity: 0,
        duration: 0.8,
        stagger: {
          amount: 0.25,
          from: "edges", // explode from edges towards the center
        },
        ease: "power3.in",
      },
      "<0.1",
    );

    // 3. The CTA Button becomes a massive screen-wipe!
    if (buttonRef.current) {
      tl.to(
        ".btn-content",
        {
          opacity: 0,
          duration: 0.2,
        },
        "<0.1",
      );

      tl.to(
        buttonRef.current,
        {
          scale: 80,
          backgroundColor: "#ffffff", // Flash white
          duration: 0.9,
          ease: "expo.inOut",
        },
        "<0.1",
      );
    }
  };

  return (
    <section
      ref={containerRef}
      aria-label="Cover Section"
      className="relative min-h-screen w-full bg-[#0a0a0c] text-white flex flex-col justify-between p-6 sm:p-10 md:p-14 lg:p-20 overflow-hidden select-none"
    >
      {/* GhostFibers WebGL Background */}
      <div className="fade-out-target absolute inset-0 z-0 pointer-events-none opacity-70 overflow-hidden">
        <GhostFibers
          lineColor="#140E35"
          glowColor="#3437A0"
          speed={0.2}
          scale={2}
          rotation={0}
          rotationSpeed={0.25}
          layers={4}
          waveAmplitude={0.015}
          waveFrequency={3}
          waveSpeed={0.15}
          layerSpeed={0.08}
          twist={0.1}
          twistFrequency={5}
          twistSpeed={1.2}
          lineFrequency={5}
          lineSpacing={2}
          lineSharpness={16}
          glowFalloff={10}
          glowIntensity={1.6}
          brightness={2}
          blueBoost={1.25}
          vignette={0.8}
          grain={0.05}
          dpr={1}
          className="w-full h-full"
        />
      </div>

      {/* Subtle ambient background glow */}
      <div
        className="fade-out-target pointer-events-none absolute -top-40 right-0 w-[500px] h-[500px] bg-violet-600/10 rounded-full blur-[140px]"
        aria-hidden="true"
      />
      <div
        className="fade-out-target pointer-events-none absolute -bottom-40 left-0 w-[600px] h-[600px] bg-indigo-900/10 rounded-full blur-[160px]"
        aria-hidden="true"
      />

      {/* Top Bar with Social Links */}
      <header className="fade-out-target relative z-10 w-full flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs uppercase tracking-widest text-neutral-400 font-mono">
            Available for opportunities
          </span>
        </div>
        <SocialLinks />
      </header>

      {/* Main Middle Content */}
      <div className="relative z-10 my-auto py-12 md:py-16 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Big Typography */}
        <div className="lg:col-span-8 flex flex-col perspective-1000">
          <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-[120px] xl:text-[145px] font-medium tracking-tight text-white leading-[0.92] uppercase drop-shadow-2xl">
            <AnimatedText text="Turning" />
            <br />
            <AnimatedText text="Ideas Into" />
            <br />
            <AnimatedText text="Interfaces" />
          </h1>

          <p className="hero-subtitle mt-8 md:mt-12 text-neutral-300 text-sm sm:text-base md:text-lg max-w-lg leading-relaxed font-normal drop-shadow-md opacity-0">
            {PERSONAL_INFO.heroSubtitle}
          </p>
        </div>

        {/* Right CTA Button Area */}
        <div className="lg:col-span-4 flex lg:justify-end items-center mt-6 lg:mt-0">
          <button
            ref={buttonRef}
            onClick={handleOpenPortfolio}
            disabled={isTransitioning}
            aria-label="Open portfolio to explore projects, experience, and skills"
            className="group relative inline-flex items-center justify-center gap-3 rounded-full bg-white px-8 py-4 text-base md:text-lg font-medium text-neutral-900 shadow-2xl transition-all duration-300 hover:bg-neutral-100 hover:shadow-white/20 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-neutral-900 cursor-pointer disabled:cursor-not-allowed opacity-0"
          >
            <div className="btn-content flex items-center justify-center gap-3">
              <span>OPEN PORTFOLIO</span>
              <span className="flex items-center justify-center transition-transform duration-300 group-hover:translate-x-1.5">
                <ArrowRightIcon size={18} />
              </span>
            </div>
          </button>
        </div>
      </div>

      {/* Bottom Decorative Info */}
      <footer className="fade-out-target relative z-10 w-full flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs text-neutral-400 font-mono gap-2 border-t border-white/10 pt-4">
        <span>
          {PERSONAL_INFO.name} — {PERSONAL_INFO.role} (
          {PERSONAL_INFO.experienceYears} Years Exp.)
        </span>
      </footer>
    </section>
  );
};

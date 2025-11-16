"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import LogoTypo from "../../assets/images/Logo_Typo.svg"
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export default function Section5() {
  const sectionRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLImageElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Glow animation
    gsap.to(glowRef.current, {
      scale: 1.3,
      opacity: 0.3,
      duration: 3.5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top center",
        end: "bottom center",
        scrub: 1
      }
    });

    tl.from([logoRef.current, textRef.current], {
      opacity: 0,
      y: 80,
      scale: 0.85,
      duration: 1,
      stagger: 0.3
    });
  });

  return (
    <section 
      ref={sectionRef}
      id="section5" 
      className="h-screen relative flex flex-col gap-4 items-center justify-center overflow-hidden"
      style={{
        background: "var(--gradient-section)",
      }}
    >
      {/* Animated glow */}
      <div
        ref={glowRef}
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          background: "radial-gradient(circle at 50% 50%, #ffffff 0%, transparent 50%)",
          filter: "blur(120px)",
        }}
      />

      {/* Section Label */}
      <div className="absolute top-4 right-4 text-sm text-blue-100/60 font-mono z-20">
        05 / BRAND
      </div>
      
      <div className="relative z-10 flex flex-col gap-6 items-center">
        <Image 
          ref={logoRef}
          src={LogoTypo}
          alt="BOTI Logo"
          className="max-w-sm drop-shadow-2xl"
          style={{
            filter: "drop-shadow(0 0 40px rgba(20,227,201,0.6))",
          }}
        />
        <h6 
          ref={textRef}
          className="text-2xl md:text-3xl font-bold text-text-primary px-8 py-4 rounded-2xl"
          style={{
            textShadow: "0 0 20px rgba(20,227,201,0.5), 0 4px 15px rgba(0,0,0,0.3)",
            background: "rgba(255,255,255,0.05)",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          It&apos;s pronounced BODHI
        </h6>
      </div>
    </section>
  );
}


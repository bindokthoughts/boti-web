"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export default function Section3() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const orb1Ref = useRef<HTMLDivElement>(null);
  const orb2Ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Enhanced text animation
    gsap.from(textRef.current, {
      opacity: 0,
      y: 80,
      scale: 0.9,
      duration: 1.5,
      ease: "power3.out",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 70%",
        toggleActions: "play none none reverse",
      },
    });

    // Floating orbs with brand colors
    gsap.to(orb1Ref.current, {
      x: 80,
      y: -80,
      scale: 1.1,
      duration: 5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    gsap.to(orb2Ref.current, {
      x: -60,
      y: 60,
      scale: 0.9,
      duration: 6,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      id="section3"
      className="min-h-screen relative flex items-center justify-center text-text-primary overflow-hidden"
      style={{
        background: "var(--gradient-section-alt)",
      }}
    >
      {/* Floating orbs with brand colors */}
      <div
        ref={orb1Ref}
        className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full opacity-25 blur-3xl"
        style={{
          background: "radial-gradient(circle, #14E3C9 0%, transparent 70%)",
        }}
      />
      <div
        ref={orb2Ref}
        className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full opacity-20 blur-3xl"
        style={{
          background: "radial-gradient(circle, #7CF7E4 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 text-center px-6 max-w-5xl">
        <h1
          ref={textRef}
          className="text-5xl md:text-6xl lg:text-7xl font-black leading-tight"
          style={{
            textShadow: `
              0 0 40px rgba(168,85,247,0.5),
              0 0 20px rgba(96,165,250,0.4),
              0 5px 25px rgba(0,0,0,0.4)
            `,
            background: "linear-gradient(135deg, #ffffff 0%, #e0e7ff 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          a browser that&apos;s bigger on the inside
        </h1>
      </div>

      <div className="absolute top-8 right-8 text-sm font-mono text-blue-200/60">
        03 / EARTH & MOON
      </div>
    </section>
  );
}

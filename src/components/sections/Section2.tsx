"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export default function Section2() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const glassRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Enhanced text reveal
    gsap.fromTo(
      textRef.current,
      {
        opacity: 0,
        y: 150,
        scale: 0.8,
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top center",
          end: "center center",
          scrub: 1,
        },
      }
    );

    // Glass card animation
    gsap.fromTo(
      glassRef.current,
      {
        opacity: 0,
        scale: 0.9,
        y: 50,
      },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 1.5,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
          toggleActions: "play none none reverse",
        },
      }
    );

    // Particle float animation
    gsap.to(particlesRef.current, {
      y: -80,
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      id="section2"
      className="min-h-screen relative flex items-center justify-center text-text-primary overflow-hidden"
      style={{
        background: "var(--gradient-section)",
      }}
    >
      {/* Animated background particles */}
      <div
        ref={particlesRef}
        className="absolute inset-0 opacity-15"
        style={{
          backgroundImage: `radial-gradient(circle, #a855f7 2px, transparent 2px)`,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Glassmorphism card */}
      <div
        ref={glassRef}
        className="relative z-10 p-10 md:p-16 rounded-3xl max-w-5xl mx-4"
        style={{
          background: "rgba(255, 255, 255, 0.08)",
          backdropFilter: "blur(24px)",
          border: "2px solid rgba(255, 255, 255, 0.15)",
          boxShadow: `
            0 8px 32px 0 rgba(139, 92, 246, 0.3),
            inset 0 0 60px rgba(255, 255, 255, 0.05)
          `,
        }}
      >
        <h1
          ref={textRef}
          className="text-5xl md:text-7xl lg:text-8xl font-black text-center leading-tight"
          style={{
            textShadow: `
              0 0 40px rgba(168,85,247,0.6),
              0 0 20px rgba(96,165,250,0.4),
              0 5px 20px rgba(0,0,0,0.3)
            `,
            background: "linear-gradient(135deg, #ffffff 0%, #e0e7ff 50%, #f3e8ff 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          Now the browser follows
        </h1>
        <p className="text-xl md:text-2xl text-center mt-8 text-blue-100 font-light">
          Breaking free from two-dimensional constraints
        </p>
      </div>

      {/* Section indicator */}
      <div className="absolute top-8 right-8 text-sm font-mono text-blue-200/60">
        02 / ICEBERG
      </div>
    </section>
  );
}
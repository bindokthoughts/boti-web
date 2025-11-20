"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export default function Section6() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const textRefs = useRef<(HTMLDivElement | null)[]>([]);
  const glowRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Glow pulse
    gsap.to(glowRef.current, {
      scale: 1.4,
      opacity: 0.25,
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top center",
        end: "bottom center",
        scrub: 1.5,
        pin: false
      }
    });

    // Animate title with bounce effect
    if (titleRef.current) {
      tl.from(titleRef.current, {
        opacity: 0,
        scale: 0.5,
        y: 60,
        duration: 2,
        ease: "elastic.out(1, 0.5)"
      });
    }

    // Animate text blocks with stagger
    textRefs.current.forEach((text, index) => {
      if (text) {
        tl.from(text, {
          opacity: 0,
          y: 80,
          scale: 0.95,
          duration: 1.5,
          ease: "power3.out"
        }, `-=${1.2 - (index * 0.2)}`);
      }
    });
  });

  const addToTextRefs = (el: HTMLDivElement | null, index: number) => {
    if (el) textRefs.current[index] = el;
  };

  return (
    <section 
      ref={sectionRef}
      id="section6" 
      className="h-screen relative flex flex-col items-center justify-center px-8 overflow-hidden"
      style={{
        background: "var(--gradient-section-alt)",
      }}
    >
      {/* Animated glow */}
      <div
        ref={glowRef}
        className="absolute inset-0 opacity-15 pointer-events-none"
        style={{
          background: "radial-gradient(circle at 50% 50%, #ffffff 0%, transparent 50%)",
          filter: "blur(150px)",
        }}
      />

      {/* Section Label */}
      <div className="absolute top-4 right-4 text-sm text-blue-100/60 font-mono z-20">
        06 / MISSION
      </div>
      
      <div className="flex flex-col items-center gap-12 max-w-4xl text-center relative z-10">
        <h2 
          ref={titleRef}
          className="text-text-primary text-5xl md:text-6xl font-black leading-tight"
          style={{
            // textShadow: "0 0 40px rgba(20,227,201,0.6), 0 5px 25px rgba(0,0,0,0.4)",
            background: "linear-gradient(135deg, #ffffff 0%, #7CF7E4 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          Why BOTI ?
        </h2>
        
        <div 
          ref={(el) => addToTextRefs(el, 0)}
          className="text-white text-2xl md:text-3xl font-medium leading-relaxed"
          style={{
            textShadow: "0 2px 15px rgba(0,0,0,0.3)",
          }}
        >
          Because, Your site isn&apos;t just a storefront, it&apos;s your pride, your passion, your path to success
        </div>
        
        <div 
          ref={(el) => addToTextRefs(el, 1)}
          className="text-text-primary text-3xl md:text-4xl font-bold leading-relaxed"
          style={{
            textShadow: "0 0 30px rgba(20,227,201,0.7), 0 4px 20px rgba(0,0,0,0.4)",
          }}
        >
          It&apos;s your dream.
        </div>
        
        <div 
          ref={(el) => addToTextRefs(el, 2)}
          className="text-white text-2xl md:text-3xl font-medium leading-relaxed"
          style={{
            textShadow: "0 2px 15px rgba(0,0,0,0.3)",
          }}
        >
          Let&apos;s make it shine the way it deserves.
        </div>
      </div>
    </section>
  );
}


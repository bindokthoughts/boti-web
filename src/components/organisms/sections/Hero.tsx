"use client";

import { useRef } from "react";
import TextReveal from "@/components/atoms/TextReveal";

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);

  return (
    <section
      ref={heroRef}
      id="hero"
      className="min-h-screen relative flex flex-col items-center justify-center text-text-primary overflow-hidden bg-transparent"
    >
      {/* Subtle background light */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.03) 0%, transparent 60%)"
      }} />

      {/* Main typography block */}
      <div className="relative z-20 w-full h-full flex flex-col items-center justify-center px-6">
        <TextReveal
          as="h1"
          text="THE WEB STAYED FLAT."
          className="text-[10vw] md:text-[6vw] font-black text-white leading-[0.85] tracking-tighter text-center"
          duration={1.5}
          wordStagger={0.1}
          scrollTriggerStart="top bottom"
        />
        
        <TextReveal
          as="p"
          text="THIS ISN'T A NEW INTERFACE"
          className="max-w-xl mt-8 text-center font-medium text-gray-500 uppercase tracking-widest text-sm"
          delay={0.8}
          scrollTriggerStart="top bottom"
        />
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-4 z-20 mix-blend-difference">
        <span className="text-[10px] uppercase tracking-[0.3em] font-medium text-gray-500">
          INITIATE SCROLL
        </span>
        <div className="w-[1px] h-16 bg-gradient-to-b from-gray-300 to-transparent relative overflow-hidden">
          <div className="w-full h-1/3 bg-white absolute top-0 -translate-y-full animate-[scroll-down_2s_ease-in-out_infinite]" />
        </div>
      </div>
    </section>
  );
}

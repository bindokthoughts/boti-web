"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Section8() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRefs = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    if (typeof window !== "undefined") {
      const ctx = gsap.context(() => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top center",
            end: "bottom center",
            scrub: 2,
            pin: false
          }
        });

        // Animate text blocks with 3D perspective
        textRefs.current.forEach((text, index) => {
          if (text) {
            tl.fromTo(text,
              {
                opacity: 0,
                z: -200,
                rotationX: 45,
                y: 100
              },
              {
                opacity: 1,
                z: 0,
                rotationX: 0,
                y: 0,
                duration: 2,
                ease: "power2.out",
                transformPerspective: 1000
              },
              index * 0.3
            );
          }
        });
      }, sectionRef);

      return () => ctx.revert();
    }
  }, []);

  const addToTextRefs = (el: HTMLDivElement | null, index: number) => {
    if (el) textRefs.current[index] = el;
  };

  return (
    <section 
      ref={sectionRef}
      id="section8" 
      className="h-screen relative flex flex-col items-center justify-center px-8"
      style={{
        background: "linear-gradient(135deg, #0B1F4A 0%, #3B4D91 50%, #14E3C9 100%)"
      }}
    >
      <div className="absolute inset-0 z-0 animate-pulse-slow" style={{
        background: "radial-gradient(circle at 30% 50%, rgba(20, 227, 201, 0.3) 0%, transparent 50%), radial-gradient(circle at 70% 50%, rgba(124, 247, 228, 0.3) 0%, transparent 50%)"
      }}></div>
      
      <div className="flex flex-col items-center gap-8 max-w-4xl text-center relative z-10">
        <div 
          ref={(el) => addToTextRefs(el, 0)}
          className="text-3xl font-medium leading-relaxed"
          style={{
            background: "linear-gradient(90deg, #7CF7E4 0%, #ffffff 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text"
          }}
        >
          The world moved into AR, voice, and virtual spaces but
        </div>
        
        <div 
          ref={(el) => addToTextRefs(el, 1)}
          className="text-4xl font-bold leading-relaxed"
          style={{
            color: "#14E3C9",
            textShadow: "0 0 20px rgba(20, 227, 201, 0.5)"
          }}
        >
          the web stayed flat.
        </div>
        
        <div 
          ref={(el) => addToTextRefs(el, 2)}
          className="text-5xl font-black leading-relaxed"
          style={{
            background: "linear-gradient(135deg, #14E3C9 0%, #7CF7E4 50%, #14E3C9 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            textShadow: "0 0 40px rgba(20, 227, 201, 0.8)"
          }}
        >
          BOTI makes it a place.
        </div>
      </div>
    </section>
  );
}


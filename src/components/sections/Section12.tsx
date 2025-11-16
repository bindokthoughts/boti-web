"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Section12() {
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
      id="section12" 
      className="h-screen relative flex flex-col items-center justify-center px-8"
      style={{
        background: "linear-gradient(135deg, #000000 0%, #3B4D91 50%, #7CF7E4 100%)"
      }}
    >
      <div className="absolute inset-0 z-0 animate-pulse-slow" style={{
        background: "radial-gradient(circle at 25% 50%, rgba(14, 227, 201, 0.3) 0%, transparent 50%), radial-gradient(circle at 75% 50%, rgba(59, 77, 145, 0.3) 0%, transparent 50%)"
      }}></div>
      
      <div className="flex flex-col items-center gap-8 max-w-4xl text-center relative z-10">
        <div 
          ref={(el) => addToTextRefs(el, 0)}
          className="text-3xl font-medium leading-relaxed"
          style={{
            color: "#7CF7E4",
            textShadow: "0 0 20px rgba(124, 247, 228, 0.5)"
          }}
        >
          The world moved into AR, voice, and virtual spaces but
        </div>
        
        <div 
          ref={(el) => addToTextRefs(el, 1)}
          className="text-4xl font-bold leading-relaxed"
          style={{
            background: "linear-gradient(90deg, #14E3C9 0%, #ffffff 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text"
          }}
        >
          the web stayed flat.
        </div>
        
        <div 
          ref={(el) => addToTextRefs(el, 2)}
          className="text-5xl font-black leading-relaxed"
          style={{
            background: "linear-gradient(135deg, #14E3C9 0%, #7CF7E4 50%, #3B4D91 100%)",
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


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
      className="h-screen relative flex flex-col items-center justify-center bg-gradient-to-b from-black to-gray-900 px-8"
    >
      <div className="flex flex-col items-center gap-8 max-w-4xl text-center">
        <div 
          ref={(el) => addToTextRefs(el, 0)}
          className="text-white text-3xl font-medium leading-relaxed"
        >
          The world moved into AR, voice, and virtual spaces but
        </div>
        
        <div 
          ref={(el) => addToTextRefs(el, 1)}
          className="text-white text-4xl font-bold leading-relaxed"
        >
          the web stayed flat.
        </div>
        
        <div 
          ref={(el) => addToTextRefs(el, 2)}
          className="text-5xl font-black leading-relaxed bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent"
        >
          BOTI makes it a place.
        </div>
      </div>
    </section>
  );
}
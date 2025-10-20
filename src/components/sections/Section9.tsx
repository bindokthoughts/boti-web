"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Section9() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRefs = useRef<(HTMLDivElement | null)[]>([]);
  const descriptionRefs = useRef<(HTMLDivElement | null)[]>([]);

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

        // Animate title sections with morphing effect
        titleRefs.current.forEach((title, index) => {
          if (title) {
            tl.fromTo(title,
              {
                opacity: 0,
                scale: 0.5,
                rotationY: 180,
                transformOrigin: "center center"
              },
              {
                opacity: 1,
                scale: 1,
                rotationY: 0,
                duration: 1.5,
                ease: "power2.inOut"
              },
              index * 0.3
            );
          }
        });

        // Animate description items with wave effect
        descriptionRefs.current.forEach((desc, index) => {
          if (desc) {
            tl.fromTo(desc,
              {
                opacity: 0,
                y: 30,
                skewY: 5
              },
              {
                opacity: 1,
                y: 0,
                skewY: 0,
                duration: 1,
                ease: "power3.out"
              },
              `-=${1 - (index * 0.1)}`
            );
          }
        });
      }, sectionRef);

      return () => ctx.revert();
    }
  }, []);

  const addToTitleRefs = (el: HTMLDivElement | null, index: number) => {
    if (el) titleRefs.current[index] = el;
  };

  const addToDescRefs = (el: HTMLDivElement | null, index: number) => {
    if (el) descriptionRefs.current[index] = el;
  };

  return (
    <section 
      ref={sectionRef}
      id="section9" 
      className="h-screen relative flex flex-col items-center justify-center bg-gradient-to-b from-black to-gray-900 px-8"
    >
      <div className="bg-black/40 inline-flex flex-col justify-center items-center gap-8 p-8 rounded-lg">
        <div 
          ref={(el) => addToTitleRefs(el, 0)}
          className="text-center text-white text-xl font-medium leading-[50px]"
        >
          You don&apos;t scroll through BOTI.
        </div>
        
        <div 
          ref={(el) => addToTitleRefs(el, 1)}
          className="text-center text-white text-4xl font-black leading-[50px]"
        >
          You step inside.
        </div>
        
        <div className="flex flex-col gap-4 text-center">
          <div 
            ref={(el) => addToDescRefs(el, 0)}
            className="text-white text-xl font-medium leading-[50px]"
          >
            Every click becomes a step.
          </div>
          
          <div 
            ref={(el) => addToDescRefs(el, 1)}
            className="text-white text-xl font-medium leading-[50px]"
          >
            Every brand becomes a place.
          </div>
          
          <div 
            ref={(el) => addToDescRefs(el, 2)}
            className="text-white text-xl font-medium leading-[50px]"
          >
            Every visit becomes a memory
          </div>
        </div>
      </div>
    </section>
  );
}
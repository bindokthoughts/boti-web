"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Section9() {
  const sectionRef = useRef<HTMLElement>(null);
  const textBlocksRef = useRef<(HTMLDivElement | null)[]>([]);
  const highlightTextRef = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    if (typeof window !== "undefined") {
      const ctx = gsap.context(() => {
        // Create main timeline
        const mainTl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top center",
            end: "bottom center",
            scrub: 2,
            pin: false
          }
        });

        // Animate each text block with staggered entrance
        textBlocksRef.current.forEach((block, index) => {
          if (block) {
            mainTl.fromTo(block,
              {
                opacity: 0,
                y: 100,
                scale: 0.8
              },
              {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 1,
                ease: "power2.out"
              },
              index * 0.2
            );
          }
        });

        // Special animation for highlight text
        if (highlightTextRef.current) {
          mainTl.fromTo(highlightTextRef.current,
            {
              opacity: 0,
              scale: 0.5,
              rotationX: 90
            },
            {
              opacity: 1,
              scale: 1,
              rotationX: 0,
              duration: 2,
              ease: "back.out(1.7)"
            },
            "-=1"
          );
        }
      }, sectionRef);

      return () => ctx.revert();
    }
  }, []);

  const addToRefs = (el: HTMLDivElement | null, index: number) => {
    if (el) textBlocksRef.current[index] = el;
  };

  return (
    <section 
      ref={sectionRef}
      id="section9" 
      className="h-screen relative flex flex-col items-center justify-center px-8"
      style={{
        background: "linear-gradient(135deg, #3FE7F9 0%, #3B4D91 40%, #0B1F4A 100%)"
      }}
    >
      <div className="absolute inset-0 z-0 animate-pulse-slow bg-gradient-radial-turquoise-3" />
      
      <div className="flex flex-col items-center gap-8 max-w-4xl relative z-10">
        <div 
          ref={(el) => addToRefs(el, 0)}
          className="text-center"
        >
          <span className="text-4xl font-bold leading-[50px] text-gradient-light-to-white">
            Anyone can build. No code. Built for AI.<br /><br />
            Powered by presence. <br />
            Monetized from day one.<br /><br />
          </span>
          <span className="text-2xl font-normal leading-[50px] text-glow-turquoise-light">
            From flat to fluid. <br />
            From links to locations.<br />
            BOTI doesn&apos;t load
          </span>
        </div>
        
        <div 
          ref={(el) => addToRefs(el, 1)}
          className="text-center"
        >
          <span className="text-2xl font-semibold leading-[50px] text-glow-highlight">
            The Web Stops Scrolling.<br />
          </span>
          <span 
            ref={highlightTextRef}
            className="text-5xl font-black leading-[50px] text-gradient-turquoise-animated text-glow-turquoise-strong"
          >
            BOTI Starts Unfolding
          </span>
        </div>
      </div>
    </section>
  );
}


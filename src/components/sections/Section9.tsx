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
        background: "linear-gradient(135deg, #14E3C9 0%, #3B4D91 40%, #0B1F4A 100%)"
      }}
    >
      <div className="absolute inset-0 z-0 animate-pulse-slow" style={{
        background: "radial-gradient(circle at 20% 30%, rgba(124, 247, 228, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(20, 227, 201, 0.3) 0%, transparent 50%)"
      }}></div>
      
      <div className="flex flex-col items-center gap-8 max-w-4xl relative z-10">
        <div 
          ref={(el) => addToRefs(el, 0)}
          className="text-center"
        >
          <span className="text-4xl font-bold leading-[50px]" style={{
            background: "linear-gradient(135deg, #7CF7E4 0%, #ffffff 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text"
          }}>
            Anyone can build. No code. Built for AI.<br /><br />
            Powered by presence. <br />
            Monetized from day one.<br /><br />
          </span>
          <span className="text-2xl font-normal leading-[50px]" style={{
            color: "#14E3C9",
            textShadow: "0 0 15px rgba(20, 227, 201, 0.4)"
          }}>
            From flat to fluid. <br />
            From links to locations.<br />
            BOTI doesn&apos;t load
          </span>
        </div>
        
        <div 
          ref={(el) => addToRefs(el, 1)}
          className="text-center"
        >
          <span className="text-2xl font-semibold leading-[50px]" style={{
            color: "#7CF7E4",
            textShadow: "0 0 20px rgba(124, 247, 228, 0.5)"
          }}>
            The Web Stops Scrolling.<br />
          </span>
          <span 
            ref={highlightTextRef}
            className="text-5xl font-black leading-[50px]"
            style={{
              background: "linear-gradient(135deg, #14E3C9 0%, #7CF7E4 50%, #14E3C9 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              textShadow: "0 0 40px rgba(20, 227, 201, 0.8)"
            }}
          >
            BOTI Starts Unfolding
          </span>
        </div>
      </div>
    </section>
  );
}


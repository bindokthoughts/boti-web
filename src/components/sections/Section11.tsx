"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Section11() {
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
      id="section11" 
      className="h-screen relative flex flex-col items-center justify-center px-8"
      style={{
        background: "linear-gradient(135deg, #3B4D91 0%, #14E3C9 100%)"
      }}
    >
      <div className="absolute inset-0 z-0 animate-pulse-slow" style={{
        background: "radial-gradient(circle at 40% 40%, rgba(20, 227, 201, 0.3) 0%, transparent 50%), radial-gradient(circle at 60% 60%, rgba(124, 247, 228, 0.3) 0%, transparent 50%)"
      }}></div>
      
      <div className="bg-surface/40 inline-flex flex-col justify-center items-center gap-8 p-8 rounded-lg backdrop-blur-sm border border-border relative z-10">
        <div 
          ref={(el) => addToTitleRefs(el, 0)}
          className="text-center text-xl font-medium leading-[50px]"
          style={{
            color: "#7CF7E4",
            textShadow: "0 0 15px rgba(124, 247, 228, 0.4)"
          }}
        >
          You don&apos;t scroll through BOTI.
        </div>
        
        <div 
          ref={(el) => addToTitleRefs(el, 1)}
          className="text-center text-4xl font-black leading-[50px]"
          style={{
            background: "linear-gradient(135deg, #14E3C9 0%, #7CF7E4 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text"
          }}
        >
          You step inside.
        </div>
        
        <div className="flex flex-col gap-4 text-center">
          <div 
            ref={(el) => addToDescRefs(el, 0)}
            className="text-xl font-medium leading-[50px]"
            style={{
              color: "#14E3C9",
              textShadow: "0 0 15px rgba(20, 227, 201, 0.4)"
            }}
          >
            Every click becomes a step.
          </div>
          
          <div 
            ref={(el) => addToDescRefs(el, 1)}
            className="text-xl font-medium leading-[50px]"
            style={{
              color: "#7CF7E4",
              textShadow: "0 0 15px rgba(124, 247, 228, 0.4)"
            }}
          >
            Every brand becomes a place.
          </div>
          
          <div 
            ref={(el) => addToDescRefs(el, 2)}
            className="text-xl font-medium leading-[50px]"
            style={{
              color: "#14E3C9",
              textShadow: "0 0 15px rgba(20, 227, 201, 0.4)"
            }}
          >
            Every visit becomes a memory
          </div>
        </div>
      </div>
    </section>
  );
}


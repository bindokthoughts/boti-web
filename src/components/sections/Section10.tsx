"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Section10() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const textRefs = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    if (typeof window !== "undefined") {
      const ctx = gsap.context(() => {
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
          tl.fromTo(titleRef.current,
            {
              opacity: 0,
              scale: 0.3,
              rotation: -15
            },
            {
              opacity: 1,
              scale: 1,
              rotation: 0,
              duration: 2,
              ease: "elastic.out(1, 0.5)"
            }
          );
        }

        // Animate text blocks with stagger
        textRefs.current.forEach((text, index) => {
          if (text) {
            tl.fromTo(text,
              {
                opacity: 0,
                y: 80,
                x: index % 2 === 0 ? -50 : 50
              },
              {
                opacity: 1,
                y: 0,
                x: 0,
                duration: 1.5,
                ease: "power3.out"
              },
              `-=${1.2 - (index * 0.2)}`
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
      id="section10" 
      className="h-screen relative flex flex-col items-center justify-center bg-gradient-to-b from-black to-gray-900 px-8"
    >
      <div className="flex flex-col items-center gap-12 max-w-4xl text-center">
        <h2 
          ref={titleRef}
          className="text-white text-5xl font-black leading-tight"
        >
          Why BOTI ?
        </h2>
        
        <div 
          ref={(el) => addToTextRefs(el, 0)}
          className="text-white text-2xl font-medium leading-relaxed"
        >
          Because, Your site isn&apos;t just a storefront, it&apos;s your pride, your passion, your path to success
        </div>
        
        <div 
          ref={(el) => addToTextRefs(el, 1)}
          className="text-white text-3xl font-bold leading-relaxed italic"
        >
          It&apos;s your dream.
        </div>
        
        <div 
          ref={(el) => addToTextRefs(el, 2)}
          className="text-white text-2xl font-medium leading-relaxed"
        >
          Let&apos;s make it shine the way it deserves.
        </div>
      </div>
    </section>
  );
}
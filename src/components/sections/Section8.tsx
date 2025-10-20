"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Section8() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLParagraphElement>(null);
  const subtitleRefs = useRef<(HTMLParagraphElement | null)[]>([]);

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

        // Animate main title with typewriter effect
        if (titleRef.current) {
          tl.fromTo(titleRef.current,
            {
              opacity: 0,
              y: 50,
              clipPath: "polygon(0 0, 0 0, 0 100%, 0% 100%)"
            },
            {
              opacity: 1,
              y: 0,
              clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)",
              duration: 2,
              ease: "power2.out"
            }
          );
        }

        // Animate subtitle lines with stagger
        subtitleRefs.current.forEach((subtitle, index) => {
          if (subtitle) {
            tl.fromTo(subtitle,
              {
                opacity: 0,
                x: index % 2 === 0 ? -100 : 100,
                rotation: index % 2 === 0 ? -10 : 10
              },
              {
                opacity: 1,
                x: 0,
                rotation: 0,
                duration: 1.5,
                ease: "power3.out"
              },
              "-=1"
            );
          }
        });
      }, sectionRef);

      return () => ctx.revert();
    }
  }, []);

  const addToSubtitleRefs = (el: HTMLParagraphElement | null, index: number) => {
    if (el) subtitleRefs.current[index] = el;
  };

  return (
    <section 
      ref={sectionRef}
      id="section8" 
      className="h-screen relative flex flex-col items-center justify-center bg-gradient-to-b from-black to-gray-900 px-8"
    >
      <div className="flex flex-col items-center gap-12 max-w-4xl text-center">
        <p 
          ref={titleRef}
          className="text-white text-3xl font-bold leading-relaxed"
        >
          BOTI is the first browser built for the spatial internet.
        </p>
        
        <div className="flex flex-col gap-6">
          <p 
            ref={(el) => addToSubtitleRefs(el, 0)}
            className="text-white text-2xl font-medium leading-relaxed"
          >
            It doesn&apos;t open tabs.
          </p>
          
          <p 
            ref={(el) => addToSubtitleRefs(el, 1)}
            className="text-white text-2xl font-medium leading-relaxed"
          >
            It opens places.
          </p>
        </div>
      </div>
    </section>
  );
}
"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Section11() {
  const sectionRef = useRef<HTMLElement>(null);
  const statsRefs = useRef<(HTMLDivElement | null)[]>([]);
  const textRefs = useRef<(HTMLDivElement | null)[]>([]);
  const numbersRef = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    if (typeof window !== "undefined") {
      const ctx = gsap.context(() => {
        // Stats animation timeline
        const statsTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            end: "center center",
            scrub: 1,
            pin: false
          }
        });

        // Animate stat numbers with counting effect
        numbersRef.current.forEach((number, index) => {
          if (number) {
            const finalValue = number.textContent?.replace('%', '') || '0';
            gsap.set(number, { textContent: '0%' });
            
            statsTimeline.to(number, {
              textContent: finalValue + '%',
              duration: 1.5,
              ease: "power2.out",
              snap: { textContent: 1 },
              stagger: 0.2
            }, index * 0.1);
          }
        });

        // Animate stat containers
        statsRefs.current.forEach((stat, index) => {
          if (stat) {
            statsTimeline.fromTo(stat,
              {
                opacity: 0,
                y: 50,
                scale: 0.8,
                rotation: -5
              },
              {
                opacity: 1,
                y: 0,
                scale: 1,
                rotation: 0,
                duration: 1,
                ease: "back.out(1.7)"
              },
              index * 0.15
            );
          }
        });

        // Text section animation
        const textTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "center center",
            end: "bottom 30%",
            scrub: 2,
            pin: false
          }
        });

        textRefs.current.forEach((text, index) => {
          if (text) {
            textTimeline.fromTo(text,
              {
                opacity: 0,
                y: 100,
                clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)"
              },
              {
                opacity: 1,
                y: 0,
                clipPath: "polygon(0 0%, 100% 0%, 100% 100%, 0% 100%)",
                duration: 1.5,
                ease: "power3.out"
              },
              index * 0.2
            );
          }
        });
      }, sectionRef);

      return () => ctx.revert();
    }
  }, []);

  const addToStatsRefs = (el: HTMLDivElement | null, index: number) => {
    if (el) statsRefs.current[index] = el;
  };

  const addToTextRefs = (el: HTMLDivElement | null, index: number) => {
    if (el) textRefs.current[index] = el;
  };

  const addToNumbersRef = (el: HTMLDivElement | null, index: number) => {
    if (el) numbersRef.current[index] = el;
  };

  return (
    <section 
      ref={sectionRef}
      id="section11" 
      className="min-h-screen relative flex flex-col items-center justify-center bg-gradient-to-b from-black to-gray-900 px-4 py-16"
    >
      <div className="flex flex-col items-center gap-16 w-full max-w-6xl">
        {/* Stats Row */}
        <div className="flex flex-wrap justify-center items-stretch gap-8 w-full">
          <div 
            ref={(el) => addToStatsRefs(el, 0)}
            className="flex-1 min-w-[220px] flex flex-col items-center gap-4 p-6 bg-gray-800/30 rounded-lg backdrop-blur-sm"
          >
            <div 
              ref={(el) => addToNumbersRef(el, 0)}
              className="text-center text-white text-5xl font-black leading-tight"
            >
              95%
            </div>
            <div className="text-center text-white text-base font-medium leading-snug">
              have less than 10 people
            </div>
          </div>

          <div 
            ref={(el) => addToStatsRefs(el, 1)}
            className="flex-1 min-w-[220px] flex flex-col items-center gap-4 p-6 bg-gray-800/30 rounded-lg backdrop-blur-sm"
          >
            <div 
              ref={(el) => addToNumbersRef(el, 1)}
              className="text-center text-white text-5xl font-black leading-tight"
            >
              80%
            </div>
            <div className="text-center text-white text-base font-medium leading-snug">
              are solo (2025 SBA)
            </div>
          </div>

          <div 
            ref={(el) => addToStatsRefs(el, 2)}
            className="flex-1 min-w-[220px] flex flex-col items-center gap-4 p-6 bg-gray-800/30 rounded-lg backdrop-blur-sm"
          >
            <div 
              ref={(el) => addToNumbersRef(el, 2)}
              className="text-center text-white text-5xl font-black leading-tight"
            >
              70%
            </div>
            <div className="text-center text-white text-base font-medium leading-snug">
              say web presence is Mission-Critical
            </div>
          </div>

          <div 
            ref={(el) => addToStatsRefs(el, 3)}
            className="flex-1 min-w-[220px] flex flex-col items-center gap-4 p-6 bg-gray-800/30 rounded-lg backdrop-blur-sm"
          >
            <div 
              ref={(el) => addToNumbersRef(el, 3)}
              className="text-center text-white text-5xl font-black leading-tight"
            >
              50%
            </div>
            <div className="text-center text-white text-base font-medium leading-snug">
              with no physical storefront
            </div>
          </div>
        </div>

        {/* Text Section */}
        <div className="flex flex-col items-center gap-8 text-center max-w-4xl">
          <div 
            ref={(el) => addToTextRefs(el, 0)}
            className="text-white text-3xl font-bold leading-relaxed"
          >
            You don&apos;t just want your site to work, you need it to wow.
          </div>

          <div 
            ref={(el) => addToTextRefs(el, 1)}
            className="text-white text-2xl font-medium leading-relaxed"
          >
            For decades, world-building was trapped in game engines.
          </div>

          <div 
            ref={(el) => addToTextRefs(el, 2)}
            className="text-white text-2xl font-medium leading-relaxed"
          >
            Now, that power is yours
          </div>

          <div 
            ref={(el) => addToTextRefs(el, 3)}
            className="text-white text-xl font-normal leading-relaxed"
          >
            With BOTI, your success isn&apos;t limited by skill or budget
            <br />
            only by imagination.
          </div>

          <div 
            ref={(el) => addToTextRefs(el, 4)}
            className="text-white text-2xl font-bold leading-relaxed"
          >
            BOTI turns <strong>Good Enough</strong> into limitless imagination.
          </div>
        </div>
      </div>
    </section>
  );
}
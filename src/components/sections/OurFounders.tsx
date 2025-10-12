"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function OurFounders() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRefs = useRef<(HTMLHeadingElement | null)[]>([]);

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

        // Animate founder titles with cascading effect
        titleRefs.current.forEach((title, index) => {
          if (title) {
            tl.fromTo(title,
              {
                opacity: 0,
                scale: 0.7,
                rotation: (index % 2 === 0 ? -1 : 1) * 15,
                y: 100
              },
              {
                opacity: 1,
                scale: 1,
                rotation: 0,
                y: 0,
                duration: 1.5,
                ease: "power2.out"
              },
              index * 0.2
            );
          }
        });

        // Add floating animation for continuous motion
        titleRefs.current.forEach((title, index) => {
          if (title) {
            gsap.to(title, {
              y: "+=10",
              duration: 2 + (index * 0.5),
              repeat: -1,
              yoyo: true,
              ease: "power2.inOut",
              delay: index * 0.3
            });
          }
        });
      }, sectionRef);

      return () => ctx.revert();
    }
  }, []);

  const addToTitleRefs = (el: HTMLHeadingElement | null, index: number) => {
    if (el) titleRefs.current[index] = el;
  };

  return (
    <section 
      ref={sectionRef}
      id="our-founders" 
      className="h-screen relative flex flex-col items-center justify-center bg-gradient-to-b from-gray-900 to-black px-8"
    >
      <div className="flex flex-col items-center gap-16">
        <h1 
          ref={(el) => addToTitleRefs(el, 0)}
          className="text-white text-6xl font-black text-center"
        >
          Founders Section
        </h1>
        
        <h2 
          ref={(el) => addToTitleRefs(el, 1)}
          className="text-gray-300 text-4xl font-bold text-center"
        >
          Meet Our Visionaries
        </h2>
        
        <h3 
          ref={(el) => addToTitleRefs(el, 2)}
          className="text-gray-400 text-2xl font-medium text-center max-w-2xl leading-relaxed"
        >
          The innovators behind BOTI's revolutionary spatial web experience
        </h3>
      </div>
    </section>
  );
}
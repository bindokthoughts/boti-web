"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Section2() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);

  useLayoutEffect(() => {
    if (typeof window !== "undefined") {
      const ctx = gsap.context(() => {
        gsap.fromTo(textRef.current,
          {
            opacity: 0,
            x: -100,
            rotation: -5
          },
          {
            opacity: 1,
            x: 0,
            rotation: 0,
            duration: 2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top center",
              end: "bottom center",
              scrub: 1,
              pin: false
            }
          }
        );
      }, sectionRef);

      return () => ctx.revert();
    }
  }, []);

  return (
    <section 
      ref={sectionRef}
      id="section2" 
      className="h-screen relative flex items-center justify-center bg-gradient-to-b from-black to-gray-900 text-gray-200"
    >
      <h1 
        ref={textRef}
        id="text2" 
        className="text-6xl font-bold"
      >
        Our lives moved on.
      </h1>
    </section>
  );
}
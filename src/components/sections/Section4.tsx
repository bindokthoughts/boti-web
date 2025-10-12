"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Section4() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);

  useLayoutEffect(() => {
    if (typeof window !== "undefined") {
      const ctx = gsap.context(() => {
        gsap.fromTo(textRef.current,
          {
            opacity: 0,
            rotationY: 90,
            transformOrigin: "center center"
          },
          {
            opacity: 1,
            rotationY: 0,
            duration: 2.5,
            ease: "power2.inOut",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 70%",
              end: "bottom 30%",
              toggleActions: "play pause resume reverse"
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
      id="section4" 
      className="h-screen relative flex items-center justify-center bg-gradient-to-b from-black to-gray-900 text-gray-200"
    >
      <h1 
        ref={textRef}
        className="text-6xl font-bold"
      >
        a browser that's bigger on the inside
      </h1>
    </section>
  );
}
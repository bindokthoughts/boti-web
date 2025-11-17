"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export default function Section1() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);

  useGSAP(() => {
    gsap.from(textRef.current, {
      opacity: 0,
      scale: 0,
      // rotation: -5,
      duration: 2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top center",
        end: "bottom center",
        scrub: 1,
        // pin: false
      }
    });
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      id="section1"
      className="min-h-screen relative flex items-center justify-center text-gray-200"
    >
      {/* Section Label */}
      <div className="absolute top-4 right-4 text-sm text-gray-400 font-mono z-20">
        Section 1
      </div>

      <h1
        ref={textRef}
        id="text2"
        className="text-6xl font-bold"
      >
        Our lives moved on.
      </h1>
      <p className="text-lg md:text-xl lg:text-2xl font-light text-text-primary max-w-2xl">
        Until now. Experience the next dimension of web.
      </p>
    </section>
  );
}
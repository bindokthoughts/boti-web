"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export default function Section2() {
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
      id="section2" 
      className="min-h-screen relative flex items-center justify-center  text-gray-200"
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
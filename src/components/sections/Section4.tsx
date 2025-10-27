"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export default function Section4() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);

  useGSAP(() => {
    gsap.from(textRef.current, {
      opacity: 0,
      // rotationY: 90,
      transformOrigin: "center center",
      duration: 2.5,
      ease: "power2.inOut",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 70%",
        end: "bottom 30%",
        toggleActions: "play pause resume reverse"
      }
    });
  });

  return (
    <section 
      ref={sectionRef}
      id="section4" 
      className="min-h-screen  relative flex items-center justify-center text-gray-200"
    >
      <h1 
        ref={textRef}
        className="text-6xl font-bold"
      >
        a browser that&apos;s bigger on the inside
      </h1>
    </section>
  );
}
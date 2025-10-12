"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);

  useLayoutEffect(() => {
    if (typeof window !== "undefined") {
      const ctx = gsap.context(() => {
        // Animate the hero text on scroll
        gsap.fromTo(textRef.current, 
          { 
            opacity: 0, 
            y: 100,
            scale: 0.8
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.5,
            ease: "power2.out",
            scrollTrigger: {
              trigger: heroRef.current,
              start: "top 80%",
              end: "bottom 20%",
              toggleActions: "play none none reverse"
            }
          }
        );
      }, heroRef);

      return () => ctx.revert();
    }
  }, []);

  return (
    <section 
      ref={heroRef}
      id="hero" 
      className="h-screen relative flex items-center justify-end text-white bg-gradient-to-b from-blue-400 to-blue-900"
    >
      <h1 
        ref={textRef}
        id="text1" 
        className="text-6xl font-bold w-1/2 p-40"
      >
        The Web Stayed Flat.
      </h1>
    </section>
  );
}
"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface TextRevealProps {
  text: string;
  as?: "h1" | "h2" | "p" | "span";
  className?: string;
  delay?: number;
  wordStagger?: number;
  duration?: number;
  scrollTriggerStart?: string;
}

export default function TextReveal({
  text,
  as: Component = "span",
  className = "",
  delay = 0,
  wordStagger = 0.05,
  duration = 1.2,
  scrollTriggerStart = "top 95%"
}: TextRevealProps) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const containerRef = useRef<any>(null);

  useGSAP(() => {
    if (!containerRef.current) return;

    const words = gsap.utils.toArray('.reveal-word', containerRef.current);
    if (!words.length) return;
    
    gsap.fromTo(
      words,
      {
        y: '120%',
        rotateX: -45,
        autoAlpha: 0,
        transformOrigin: '0% 50% -50'
      },
      {
        y: '0%',
        rotateX: 0,
        autoAlpha: 1,
        duration: duration,
        stagger: wordStagger,
        delay: delay,
        ease: "expo.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: scrollTriggerStart,
          toggleActions: "play none none reverse",
        }
      }
    );
  }, { dependencies: [delay, duration, wordStagger, scrollTriggerStart], scope: containerRef });

  const wordsArray = text.split(" ");

  return (
    <Component ref={containerRef} className={`${className} flex flex-wrap`} style={{ perspective: "1000px" }}>
      {wordsArray.map((word, idx) => (
        <span key={idx} className="overflow-hidden inline-block mr-[0.25em] pb-[0.2em] mb-[-0.2em]">
          <span className="reveal-word inline-block will-change-transform">{word}</span>
        </span>
      ))}
    </Component>
  );
}

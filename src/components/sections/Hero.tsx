"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import SVGCloud from "../../assets/images/Clouds.svg";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const mainTextRef = useRef<HTMLHeadingElement>(null);
  const subTextRef = useRef<HTMLParagraphElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const cloudRef = useRef<HTMLImageElement>(null);
  const descTextRef = useRef<HTMLParagraphElement>(null);

  useGSAP(() => {
    const hero = heroRef.current;
    const mainText = mainTextRef.current;
    const subText = subTextRef.current;
    const glow = glowRef.current;
    const cloud = cloudRef.current;
    const descText = descTextRef.current;

    if (!hero || !mainText || !cloud) return;

    // Glow pulse animation
    if (glow) {
      gsap.to(glow, {
        scale: 1.3,
        opacity: 0.7,
        duration: 2.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }

    // Original text change animation - PRESERVED
    const originalText = mainText.textContent;

    const textTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: hero,
        start: "top top",
        end: "+=150%",
        scrub: 1,
        pin: true,
        pinSpacing: true,
        onUpdate: (self) => {
          // When scrolling back (progress decreasing), restore original text
          if (self.direction === -1 && self.progress < 0.5) {
            if (mainText.textContent !== originalText) {
              mainText.textContent = originalText;
            }
          }
          // When scrolling forward past halfway, change to new text
          else if (self.direction === 1 && self.progress > 0.5) {
            if (mainText.textContent !== "Our lives moved on.") {
              mainText.textContent = "Our lives moved on.";
            }
          }
        },
      },
    });

    textTimeline
      .to(mainText, {
        // y: -80,
        opacity: 0,
        scale: 1,
        rotationX: 90,
        duration: 1,
        ease: "power2.inOut",
      })
      .to(mainText, {
        // y: 0,
        opacity: 1,
        scale: 1,
        rotationX: 0,
        duration: 1,
        ease: "power2.out",
      })
      .fromTo(
        descText,
        {
          opacity: 0,
          y: 50,
          scale: 0.8,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: "power2.out",
        },
        "-=0.5"
      );

    // Cloud animations
    const values = {
      isMobile: window.innerWidth < 768,
      get defaultY() { return this.isMobile ? "45vh" : "35vh"; },
      get defaultScale() { return this.isMobile ? 1 : 1.25; },
    };

    gsap.set(cloud, {
      y: values.defaultY,
      transformOrigin: "center bottom",
      scale: values.defaultScale,
    });

    gsap.to(cloud, {
      y: "-100vh",
      scale: 2,
      opacity: 0.4,
      scrollTrigger: {
        trigger: hero,
        start: "top top",
        end: "+=150%",
        scrub: 1,
      },
    });
  });

  return (
    <section
      ref={heroRef}
      id="hero"
      className="min-h-screen relative flex flex-col items-center justify-center text-text-primary overflow-hidden"
      style={{
        background: "var(--gradient-hero)",
      }}
    >
      {/* Animated brand-colored glow */}
      <div
        ref={glowRef}
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          background: "radial-gradient(circle at 50% 50%, #3FE7F9 0%, transparent 70%)",
          filter: "blur(120px)",
        }}
      />

      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.07] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, #3FE7F9 1px, transparent 1px),
            linear-gradient(to bottom, #3B4D91 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-20 w-full h-full flex flex-col md:flex-row items-center justify-end px-6 md:px-12 lg:px-20 gap-6" style={{ perspective: '1000px' }}>
        <div className="flex flex-col items-center md:items-end md:w-1/2">
          <h1
            ref={mainTextRef}
            className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-black leading-tight text-center md:text-left"
            style={{
              background: "linear-gradient(135deg, #ffffff 0%, #e0e7ff 50%, #f3e8ff 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              transformStyle: 'preserve-3d',
            }}
          >
            The Web Stayed Flat.
          </h1>
          <p 
            ref={descTextRef}
            className="text-lg md:text-xl lg:text-2xl font-light text-text-primary max-w-2xl mt-4 text-center md:text-right opacity-0"
          >
            Until now. Experience the next dimension of web.
          </p>
        </div>
      </div>

      <Image
        ref={cloudRef}
        src={SVGCloud}
        width={1000}
        height={600}
        alt="Animated clouds"
        className="fixed bottom-0 left-0 pointer-events-none select-none z-5 w-full md:w-full h-auto max-w-none"
        style={{ willChange: "transform" }}
        quality={100}
        loading="eager"
      />

      {/* Scroll indicator with brand colors */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce z-20">
        <div className="w-6 h-10 border-2 border-primary-accent rounded-full flex items-start justify-center p-2 bg-primary-accent/10 backdrop-blur-sm">
          <div className="w-1 h-3 bg-primary-accent rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
}

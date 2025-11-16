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

  useGSAP(() => {
    const hero = heroRef.current;
    const mainText = mainTextRef.current;
    const subText = subTextRef.current;
    const glow = glowRef.current;
    const cloud = cloudRef.current;

    if (!hero || !mainText || !cloud) return;

    // Enhanced initial text reveal
    gsap.fromTo(
      mainText,
      {
        opacity: 0,
        y: 100,
        scale: 0.8,
        rotationX: -20,
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        rotationX: 0,
        duration: 1.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: hero,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      }
    );

    // Subtitle animation
    if (subText) {
      gsap.fromTo(
        subText,
        {
          opacity: 0,
          y: 50,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          delay: 0.4,
          ease: "power2.out",
          scrollTrigger: {
            trigger: hero,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }

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
    const textTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: hero,
        start: "top top",
        end: "center top",
        scrub: 1,
        pin: true,
        pinSpacing: false,
      },
    });

    textTimeline
      .to(mainText, {
        y: -50,
        opacity: 0,
        scale: 0.9,
        rotationY: 15,
        duration: 0.5,
        ease: "power2.inOut",
      })
      .set(mainText, {
        textContent: "Our lives moved on.",
        y: 50,
        rotationY: -15,
      })
      .to(mainText, {
        y: 0,
        opacity: 1,
        scale: 1,
        rotationY: 0,
        duration: 0.5,
        ease: "power2.out",
      });

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
        end: "bottom top",
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
          background: "radial-gradient(circle at 50% 50%, #14E3C9 0%, transparent 70%)",
          filter: "blur(120px)",
        }}
      />

      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.07] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, #14E3C9 1px, transparent 1px),
            linear-gradient(to bottom, #3B4D91 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 px-6 md:px-12 lg:px-20 w-full md:w-2/3 text-center md:text-left perspective-[1000px]">
        <h1
          ref={mainTextRef}
          className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tight leading-[1.1] mb-6"
          style={{
            textShadow: `
              0 0 30px rgba(20,227,201,0.6),
              0 0 60px rgba(20,227,201,0.4),
              0 5px 25px rgba(0,0,0,0.5)
            `,
            background: "linear-gradient(135deg, #ffffff 0%, #e0e7ff 50%, #f3e8ff 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          The Web Stayed Flat.
        </h1>

        <p
          ref={subTextRef}
          className="text-lg md:text-xl lg:text-2xl font-light tracking-wide text-text-primary max-w-2xl"
          style={{
            textShadow: "0 2px 20px rgba(20,227,201,0.4)",
          }}
        >
          Until now. Experience the next dimension of web development.
        </p>
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

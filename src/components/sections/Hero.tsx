"use client";

import { useRef, useCallback } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import SVGCloud from "../../assets/images/Clouds.svg";
import CubeScene from "../three/scene/CubeScene";

// Register GSAP plugin once globally
gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const cloudRef = useRef<HTMLImageElement>(null);

  useGSAP(() => {
    const hero = heroRef.current;
    const text = textRef.current;
    const cloud = cloudRef.current;

    if (!hero || !text || !cloud) return;

    // Initial text animation (always runs)
    gsap.fromTo(
      text,
      {
        opacity: 0,
        y: 100,
        scale: 0.8,
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1.5,
        ease: "power2.out",
        scrollTrigger: {
          trigger: hero,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      }
    );

    // Responsive values
    const getResponsiveValues = () => ({
      isMobile: window.innerWidth < 768,
      get defaultY() { return this.isMobile ? "45vh" : "35vh"; },
      get defaultScale() { return this.isMobile ? 1 : 1.25; },
      get midY() { return this.isMobile ? "-15vh" : "-25vh"; },
      get midScale() { return this.isMobile ? 0.7 : 1; },
      get finalY() { return this.isMobile ? "-80vh" : "-100vh"; },
      get finalScale() { return this.isMobile ? 1.5 : 2; },
    });

    const values = getResponsiveValues();

    // Initial cloud position
    gsap.set(cloud, {
      y: values.defaultY,
      x: values.isMobile ? 0 : 50,
      transformOrigin: "center bottom",
      scale: values.defaultScale,
    });

    // Setup scroll animations after a short delay to ensure DOM is ready
    setTimeout(() => {
      const section2 = document.getElementById("section2");
      const section3 = document.getElementById("section3");

      // Master timeline
      const cloudMaster = gsap.timeline({
        scrollTrigger: {
          trigger: hero,
          start: "top top",
          end: section3 ? "+=300%" : section2 ? "+=200%" : "+=100%",
          scrub: 1,
        },
      });

      // Base animation
      cloudMaster.to(cloud, {
        y: values.midY,
        scale: values.midScale,
        ease: "power1.inOut",
        duration: 1,
      });

      // Extended animation if sections exist
      if (section2 || section3) {
        cloudMaster.to(cloud, {
          y: values.finalY,
          scale: values.finalScale,
          ease: "power1.inOut",
          duration: 1,
        });
      }

      // Optional section-specific animations
      if (section2) {
        gsap.timeline({
          scrollTrigger: {
            trigger: section2,
            start: "top center",
            end: "bottom center",
            scrub: 1,
          },
        }).to(cloud, {
          ease: "none",
        });
      }

      if (section3) {
        gsap.timeline({
          scrollTrigger: {
            trigger: section3,
            start: "top center",
            end: "center center",
            scrub: 1,
          },
        }).to(cloud, {
          scale: 1,
          ease: "power2.inOut",
        });
      }
    }, 100);
  });

  return (
    <section
      ref={heroRef}
      id="hero"
      className="min-h-screen relative flex flex-col md:flex-row items-center justify-center md:justify-end text-white bg-gradient-to-b from-blue-400 to-blue-900 overflow-hidden"
    >
      <div className="relative z-10 px-6 md:px-0 w-full md:w-1/2 text-center md:text-left">
        <h1
          ref={textRef}
          id="text1"
          className="display font-medium italic p-4 md:p-40 max-w-[90vw] md:max-w-none text-balance"
        >
          The Web Stayed Flat.
        </h1>
      </div>

      <Image
        ref={cloudRef}
        src={SVGCloud}
        width={1000}
        height={600}
        alt="Animated clouds background"
        className="fixed bottom-0 left-0 pointer-events-none select-none z-10 w-[200%] md:w-[125%] h-auto"
        style={{
          transform: "translateY(25%)",
          willChange: "transform",
        }}
        quality={100}
        loading="eager"
      />

      {/* 3D Canvas - Absolute positioned to overlay properly on mobile */}
      <div className="absolute inset-0 z-0">
        <CubeScene />
      </div>
    </section>
  );
}

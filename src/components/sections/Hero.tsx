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

  const calculateCloudMovement = useCallback(() => {
    if (typeof window === "undefined") return 0;

    const heroElement = heroRef.current;
    const section2Element = document.getElementById("section2");
    const section3Element = document.getElementById("section3");

    if (!heroElement || !section2Element || !section3Element) return 0;

    const heroHeight = heroElement.offsetHeight;
    const section2Height = section2Element.offsetHeight;
    const section3Height = section3Element.offsetHeight;

    // Move cloud across hero → section2 → partial section3
    return -(heroHeight + section2Height + section3Height * 0.1);
  }, []);

  useGSAP(
    (context) => {
      const hero = heroRef.current;
      const text = textRef.current;
      const cloud = cloudRef.current;

      if (!hero || !text || !cloud) return;

      // === Hero Text Entrance Animation ===
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
            // markers: true,
          },
        }
      );

      // === Cloud Scroll Animation ===
      
      // Set initial cloud position with responsive values
      const isMobile = window.innerWidth < 768;
      
      gsap.set(cloud, {
        y: isMobile ? "45vh" : "35vh",
        x: isMobile ? 0 : 50,
        transformOrigin: "center bottom",
        scale: isMobile ? 1 : 1.25,
      });

      // Master timeline for cloud movement
      const cloudMaster = gsap.timeline({
        scrollTrigger: {
          trigger: hero,
          start: "top top",
          end: "+=300%", // Spans across 3 sections
          scrub: 1,
          pin: false,
          // markers: true,
        },
      });

      // Animation through hero to section2 with responsive values
      cloudMaster.to(cloud, {
        y: isMobile ? "-15vh" : "-25vh", // Adjusted for mobile
        scale: isMobile ? 0.7 : 1,
        ease: "power1.inOut",
        duration: 1,
      })
      // Animation from section2 to section3
      .to(cloud, {
        y: isMobile ? "-80vh" : "-100vh", // Adjusted for mobile
        scale: isMobile ? 1.5 : 2,
        ease: "power1.inOut",
        duration: 1,
      });

      // Additional timeline for section2 specific animations
      gsap.timeline({
        scrollTrigger: {
          trigger: "#section2",
          start: "top center",
          end: "bottom center",
          scrub: 1,
          // markers: true,
        },
      }).to(cloud, {
        // rotation: 15,
        ease: "none",
      });

      // Additional timeline for section3 specific animations
      gsap.timeline({
        scrollTrigger: {
          trigger: "#section3",
          start: "top center",
          end: "center center",
          scrub: 1,
          // markers: true,
        },
      }).to(cloud, {
        // rotation: 0,
        scale: 1,
        ease: "power2.inOut",
      });


    },
    { scope: heroRef, dependencies: [calculateCloudMovement] }
  );

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
          className="text-4xl md:text-6xl font-bold p-4 md:p-40 max-w-[90vw] md:max-w-none"
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
        priority
        className="fixed bottom-0 left-0 pointer-events-none select-none z-10 w-[200%] md:w-[125%] h-auto"
        style={{
          transform: "translateY(25%)",
          willChange: "transform",
        }}
        quality={100}
      />

      {/* 3D Canvas - Absolute positioned to overlay properly on mobile */}
      <div className="absolute inset-0 z-0">
        <CubeScene />
      </div>
    </section>
  );
}

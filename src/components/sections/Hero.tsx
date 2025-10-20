"use client";

import { useRef, useCallback } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import SVGCloud from "../../assets/images/Clouds.svg";

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
            markers: true,
          },
        }
      );

      // === Cloud Scroll Animation ===

      // Set initial cloud position
      gsap.set(cloud, {
        y: 0,
        x: 50,
        transformOrigin: "center bottom",
        scale: 1.75,
      });

      const cloudTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: hero,
          start: "top top",
          end: "bottom bottom",
          scrub: 1.2,
          pin: true,
          
        },
      });

      cloudTimeline.to(cloud, {
        y: 50,
        ease: "none",
        duration: 2,
      });

      const cloudTimeline2 = gsap.timeline({
        scrollTrigger: {
          trigger: "#section2",
          start: "top top",
          end: "bottom bottom",
          scrub: 1.2,
          pin: true,
          
        },
      });

      cloudTimeline2.to(cloud, {
        y: 50,
        ease: "none",
        duration: 2,
      });


    },
    { scope: heroRef, dependencies: [calculateCloudMovement] }
  );

  return (
    <section
      ref={heroRef}
      id="hero"
      className="h-screen relative flex items-center justify-end text-white bg-gradient-to-b from-blue-400 to-blue-900 overflow-hidden"
    >
      <h1
        ref={textRef}
        id="text1"
        className="text-6xl font-bold w-1/2 p-40 z-10 relative"
      >
        The Web Stayed Flat.
      </h1>

      <Image
        ref={cloudRef}
        src={SVGCloud}
        width={1000}
        height={600}
        alt="Animated clouds background"
        priority
        className="absolute bottom-[-25vh] left-0 pointer-events-none select-none z-10"
        // style={{
        //   width: "125%",
        //   height: "auto",
        //   transform: "translateY(-25.5%)",
        // }}
        quality={100}
        // placeholder="blur"
        // blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWxsPSIjY2NjIi8+Cjwvc3ZnPg=="
      />
    </section>
  );
}

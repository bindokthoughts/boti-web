"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Mesh } from "three";
import AnimatedBox from "../objects/AnimatedBox";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * AnimatedCubeScene - Hero section with animated cube
 * All scroll-based animations orchestrated here
 */
export default function AnimatedCubeScene() {
  const meshRef = useRef<Mesh>(null);

  useGSAP(() => {
    if (!meshRef.current) return;

    // Set initial state - flat square (scale Y to 0.01 to appear flat)
    gsap.set(meshRef.current.scale, {
      x: 2,
      y: 2,
      z: 1.5,
    });

    gsap.set(meshRef.current.rotation, {
      x: 0,
      y: 0,
      z: 0,
    });

    // Timeline 1: Hero Section Scroll Animation - expand from flat to 3D
    const tl1 = gsap.timeline({
      scrollTrigger: {
        trigger: "#hero",
        start: "top top",
        end: "bottom top",
        scrub: 1,
      },
    });

    tl1
      .to(meshRef.current.scale, { 
        x: 1, 
        y: 1, 
        z: 1, 
        ease: "power2.inOut" 
      })
      .to(meshRef.current.position, { x: -2, ease: "power2.inOut" }, "<")
      .to(
        meshRef.current.rotation,
        { y: 2, ease: "power2.inOut" },
        "<"
      );

    // Section 2 Timeline
    const tl2 = gsap.timeline({
      scrollTrigger: {
        trigger: "#section2",
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
      },
    });

    tl2
      .to(meshRef.current.rotation, {
        x: Math.PI * 0.5,
        y: Math.PI * 0.25,
        ease: "power2.inOut",
      })
      .to(
        meshRef.current.scale,
        {
          x: 1.5,
          y: 1.5,
          z: 1.5,
          ease: "power2.inOut",
        },
        "<"
      );

    // Section 3 Timeline
    const tl3 = gsap.timeline({
      scrollTrigger: {
        trigger: "#section3",
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
      },
    });

    tl3
      .to(meshRef.current.rotation, {
        x: Math.PI,
        y: Math.PI * 0.5,
        ease: "power2.inOut",
      })
      .to(
        meshRef.current.position,
        {
          x: 2,
          y: 1,
          ease: "power2.inOut",
        },
        "<"
      );

    // Section 4 Timeline
    const tl4 = gsap.timeline({
      scrollTrigger: {
        trigger: "#section4",
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
      },
    });

    tl4
      .to(meshRef.current.rotation, {
        x: Math.PI * 1.5,
        y: Math.PI * 0.75,
        ease: "power2.inOut",
      })
      .to(
        meshRef.current.scale,
        {
          x: 1.25,
          y: 1.25,
          z: 1.25,
          ease: "power2.inOut",
        },
        "<"
      );

    // Section 5 Timeline
    const tl5 = gsap.timeline({
      scrollTrigger: {
        trigger: "#section5",
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
      },
    });

    tl5
      .to(meshRef.current.position, {
        x: 0.5,
        y: 0.75,
        z: 0,
        ease: "power2.inOut",
      })
      .to(
        meshRef.current.rotation,
        {
          x: 0.5,
          y: 0.25,
          z: 0,
          ease: "power2.inOut",
        },
        "<"
      );

    // Section 6 Timeline - Fade out
    const tl6 = gsap.timeline({
      scrollTrigger: {
        trigger: "#section6",
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
      },
    });

    tl6
      .to(meshRef.current.position, { x: 0, y: 0, z: 0, ease: "power2.inOut" })
      .to(
        meshRef.current.scale,
        { x: 0, y: 0, z: 0, ease: "power2.inOut" },
        "<"
      );
  }, []);

  return <AnimatedBox ref={meshRef} />;
}

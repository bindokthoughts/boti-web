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

    // Set initial state - flat square (orthographic view)
    gsap.set(meshRef.current.scale, {
      x: 2.5,
      y: 2.5,
      z: 0.05, // Slightly thicker for better visibility
    });

    gsap.set(meshRef.current.position, {
      x: -2, // Position on left side
      y: 0,
      z: 0,
    });

    gsap.set(meshRef.current.rotation, {
      x: 0,
      y: 0,
      z: 0,
    });

    // Timeline 1: Hero to Section2 - expand from flat square to 3D cube
    gsap.timeline({
      scrollTrigger: {
        trigger: "#hero",
        start: "top top",
        end: "bottom top",
        scrub: 2,
      },
    })
      .to(meshRef.current.scale, { 
        x: 2, 
        y: 2, 
        z: 2, 
        ease: "power2.inOut",
        duration: 1,
      })
      .to(meshRef.current.rotation, { 
        x: Math.PI * 0.15,
        y: Math.PI * 0.15, 
        ease: "power2.inOut",
        duration: 1,
      }, "<")
      .to(meshRef.current.position, { 
        x: -1.5, 
        y: 0,
        ease: "power2.inOut",
        duration: 1,
      }, "<");

    // Section 2 Timeline - gentle rotation
    gsap.timeline({
      scrollTrigger: {
        trigger: "#section2",
        start: "top bottom",
        end: "bottom top",
        scrub: 2,
      },
    })
      .to(meshRef.current.rotation, {
        x: Math.PI * 0.35,
        y: Math.PI * 0.35,
        ease: "power1.inOut",
      })
      .to(
        meshRef.current.position,
        {
          x: 0,
          y: 0,
          ease: "power1.inOut",
        },
        "<"
      )
      .to(
        meshRef.current.scale,
        {
          x: 1.8,
          y: 1.8,
          z: 1.8,
          ease: "power1.inOut",
        },
        "<"
      );

    // Section 3 Timeline - more rotation
    gsap.timeline({
      scrollTrigger: {
        trigger: "#section3",
        start: "top bottom",
        end: "bottom top",
        scrub: 2,
      },
    })
      .to(meshRef.current.rotation, {
        x: Math.PI * 0.6,
        y: Math.PI * 0.6,
        ease: "power1.inOut",
      })
      .to(
        meshRef.current.position,
        {
          x: 1.5,
          y: 0.5,
          ease: "power1.inOut",
        },
        "<"
      )
      .to(
        meshRef.current.scale,
        {
          x: 1.6,
          y: 1.6,
          z: 1.6,
          ease: "power1.inOut",
        },
        "<"
      );

    // Section 4 Timeline - rotate to hexagon-like view in the middle
    gsap.timeline({
      scrollTrigger: {
        trigger: "#section4",
        start: "top bottom",
        end: "center center",
        scrub: 2,
      },
    })
      .to(meshRef.current.rotation, {
        x: Math.PI * 0.25, // 45 degrees on X
        y: Math.PI * 0.125, // 22.5 degrees on Y for hexagonal appearance
        z: 0,
        ease: "power2.inOut",
      })
      .to(
        meshRef.current.position,
        {
          x: 0,
          y: 0,
          z: 0,
          ease: "power2.inOut",
        },
        "<"
      )
      .to(
        meshRef.current.scale,
        {
          x: 2,
          y: 2,
          z: 2,
          ease: "power2.inOut",
        },
        "<"
      );

    // Section 4 to 5 - fade out
    gsap.timeline({
      scrollTrigger: {
        trigger: "#section4",
        start: "center center",
        end: "bottom top",
        scrub: 2,
      },
    })
      .to(meshRef.current.scale, {
        x: 0.5,
        y: 0.5,
        z: 0.5,
        ease: "power2.in",
      })
      .to(
        meshRef.current.rotation,
        {
          y: Math.PI * 2,
          ease: "power2.in",
        },
        "<"
      );

    // Section 5 & 6 - keep hidden
    gsap.timeline({
      scrollTrigger: {
        trigger: "#section5",
        start: "top bottom",
        end: "bottom top",
        scrub: 2,
      },
    }).to(meshRef.current.scale, {
      x: 0,
      y: 0,
      z: 0,
      ease: "none",
    });
  }, []);

  return <AnimatedBox ref={meshRef} />;
}

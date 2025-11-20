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
      z: 2.5,
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
        x: Math.PI * 0.1,
        y: Math.PI * 0.1,
        ease: "power1.inOut",
      })
      .to(
        meshRef.current.position,
        {
          x: -0.5,
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
        x: Math.PI * 0.14,
        y: Math.PI * 0.18,
        ease: "power1.inOut",
      })
      .to(
        meshRef.current.position,
        {
          x: 0.5,
          y: 0.3,
          ease: "power1.inOut",
        },
        "<"
      )
      .to(
        meshRef.current.scale,
        {
          x: 2,
          y: 2,
          z: 2,
          ease: "power1.inOut",
        },
        "<"
      );

    // Section 4 Timeline - move to center, rotate to hexagon view, scale up then to 0
    const section4Timeline = gsap.timeline({
      scrollTrigger: {
        trigger: "#section4",
        start: "top bottom",
        end: "center center",
        scrub: 2,
      },
    });

    section4Timeline
      .to(
        meshRef.current.position,
        {
          x: 0,
          y: 0,
          z: 0,
          ease: "power2.inOut",
        },
        0
      )
      .to(
        meshRef.current.rotation,
        {
          x: Math.PI * 0.19634954084936207, // ~35.26 degrees (atan(1/sqrt(2))) - perfect hexagon view
          y: Math.PI * 0.125, // 45 degrees / 4
          z: 0,
          ease: "power2.inOut",
        },
        0
      )
      .to(
        meshRef.current.scale,
        {
          x: 2.5,
          y: 2.5,
          z: 2.5,
          ease: "power2.inOut",
        },
        0
      )
      .to(
        meshRef.current.scale,
        {
          x: 0,
          y: 0,
          z: 0,
          ease: "power2.in",
        },
        0.6
      );
  }, []);

  return <AnimatedBox ref={meshRef} />;
}

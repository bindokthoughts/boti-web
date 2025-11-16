"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Group } from "three";
import { EarthObject } from "../objects/EarthObject";
import { MoonObject } from "../objects/MoonObject";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * AnimatedEarthMoonScene - Section3+ with orbiting moon (PRESERVED ORIGINAL)
 * Features: Earth rotation, Moon orbit, group scale, group rotation
 * Enhanced with brand-colored lighting
 */
export default function AnimatedEarthMoonScene() {
  const groupRef = useRef<Group>(null);
  const earthRef = useRef<Group>(null);
  const moonRef = useRef<Group>(null);

  useGSAP(() => {
    if (!groupRef.current) return;

    // Earth rotation - continuous spin
    if (earthRef.current) {
      gsap.to(earthRef.current.rotation, {
        y: Math.PI * 2,
        duration: 20,
        // repeat: -1,
        ease: "none",
      });
    }

    // Moon orbit around Earth
    if (moonRef.current) {
      gsap.to(moonRef.current.rotation, {
        y: Math.PI * 2,
        duration: 15,
        // repeat: -1,
        ease: "none",
      });
    }

    // Group scale animation - zoom in effect
    gsap.fromTo(
      groupRef.current.scale,
      { x: 0.3, y: 0.3, z: 0.3 },
      {
        x: 1,
        y: 1,
        z: 1,
        scrollTrigger: {
          trigger: "#section7",
          start: "top bottom",
          end: "center center",
          scrub: 1,
        },
      }
    );

    // Group rotation on scroll
    gsap.to(groupRef.current.rotation, {
      y: Math.PI * 0.25,
      scrollTrigger: {
        trigger: "#section7",
        start: "top center",
        end: "bottom center",
        scrub: 2,
      },
    });
  }, []);

  return (
    <group ref={groupRef} position={[0, -150, 0]}>
      {/* Brand-colored lighting */}
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 5, 5]} intensity={1} color="#3FE7F9" />
      <pointLight position={[-10, -5, -5]} intensity={0.8} color="#3B4D91" />
      
      <group ref={earthRef} position={[0, 0, 0]}>
        <EarthObject />
      </group>
      <group ref={moonRef} position={[7, -15, 0]}>
        <MoonObject />
      </group>
    </group>
  );
}

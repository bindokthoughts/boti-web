"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Group } from "three";
import { LunarLandObject } from "../objects/LunarLandObject";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * AnimatedLunarScene - Section10 with lunar landscape (PRESERVED ORIGINAL)
 * Features: scale fade-in, rotation tilt, position adjustment
 * Enhanced with brand-colored lighting
 */
export default function AnimatedLunarScene() {
  const groupRef = useRef<Group>(null);

  useGSAP(() => {
    if (!groupRef.current) return;

    // Fade in animation - scale from 0 to 1
    gsap.fromTo(
      groupRef.current.scale,
      { x: 0, y: 0, z: 0 },
      {
        x: 1,
        y: 1,
        z: 1,
        scrollTrigger: {
          trigger: "#section10",
          start: "top bottom",
          end: "top center",
          scrub: 1,
        },
      }
    );

    // Slight rotation on scroll - tilt effect
    gsap.to(groupRef.current.rotation, {
      x: -1.8,
      scrollTrigger: {
        trigger: "#section10",
        start: "top center",
        end: "bottom center",
        scrub: 2,
      },
    });

    // Position adjustment - subtle upward float
    gsap.to(groupRef.current.position, {
      y: -345,
      scrollTrigger: {
        trigger: "#section10",
        start: "top center",
        end: "center center",
        scrub: 1,
      },
    });
  }, []);

  return (
    <group ref={groupRef} position={[0, -350, 0]}>
      {/* Brand-colored lunar lighting */}
      <ambientLight intensity={0.15} />
      <pointLight position={[5, 10, 5]} intensity={0.8} color="#3FE7F9" />
      <pointLight position={[-5, 5, -5]} intensity={0.6} color="#7CF7E4" />
      <spotLight
        position={[0, 15, 10]}
        angle={0.3}
        penumbra={1}
        intensity={1}
        color="#3B4D91"
      />
      <LunarLandObject
        scale={[0.0003, 0.0003, 0.0003]}
        position={[0, -2, -1]}
        rotation={[-115, 0, 0]}
      />
    </group>
  );
}

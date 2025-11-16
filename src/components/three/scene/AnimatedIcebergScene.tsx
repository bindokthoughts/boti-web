"use client";

import { useRef } from "react";
import { Group } from "three";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { IcebergObject } from "../objects/IcebergObject";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * AnimatedIcebergScene - Section2 with animated iceberg (PRESERVED ORIGINAL)
 * Enhanced with brand-colored lighting
 */
export default function AnimatedIcebergScene() {
  const groupRef = useRef<Group>(null);

  useGSAP(() => {
    if (!groupRef.current) return;

    // Floating animation
    gsap.to(groupRef.current.position, {
      y: -95,
      duration: 3,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
      scrollTrigger: {
        trigger: "#section2",
        start: "top bottom",
        end: "bottom top",
        toggleActions: "play pause resume pause",
      },
    });

    // Rotation animation
    gsap.to(groupRef.current.rotation, {
      y: Math.PI * 0.5,
      scrollTrigger: {
        trigger: "#section2",
        start: "top center",
        end: "bottom center",
        scrub: 2,
      },
    });

    // Scale animation
    gsap.fromTo(
      groupRef.current.scale,
      { x: 0.8, y: 0.8, z: 0.8 },
      {
        x: 1.2,
        y: 1.2,
        z: 1.2,
        scrollTrigger: {
          trigger: "#section2",
          start: "top center",
          end: "center center",
          scrub: 1,
        },
      }
    );
  }, []);

  return (
    <group ref={groupRef} position={[0, -100, 0]}>
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={1.2} color="#60a5fa" />
      <pointLight position={[-10, -10, 5]} intensity={0.8} color="#a855f7" />
      <IcebergObject />
    </group>
  );
}


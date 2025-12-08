"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Group } from "three";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { EarthObject } from "../objects/EarthObject";
import { MoonObject } from "../objects/MoonObject";
import PortalEffect from "../effects/PortalEffect";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * AnimatedEarthMoonScene - Section6 with Earth and Moon
 */
export default function AnimatedEarthMoonScene() {
  const groupRef = useRef<Group>(null);
  const earthRef = useRef<Group>(null);

  // Continuous Earth rotation on its axis
  useFrame((state, delta) => {
    if (earthRef.current) {
      earthRef.current.rotation.y += delta * 0.5; // Smooth rotation speed
    }
  });

  useGSAP(() => {
    if (!groupRef.current) return;

    // Set initial state - hidden behind and scaled down
    gsap.set(groupRef.current.scale, { x: 0, y: 0, z: 0 });
    gsap.set(groupRef.current.position, { x: 0, y: -2, z: 150 });
    gsap.set(groupRef.current.rotation, { x: 0, y: 0, z: 0 });

    // Section6: Entrance animation - zoom in from distance
    gsap.timeline({
      scrollTrigger: {
        trigger: "#section6",
        start: "top center",
        end: "bottom center",
        scrub: 1.5,
        markers: true, // Debug markers - remove when done
        onEnter: () => console.log("Section6 entered"),
        onLeave: () => console.log("Section6 left"),
      },
    })
    .to(groupRef.current.position, {
      z: 0,
      duration: 0.4,
      ease: "power2.inOut",
    }, 0)
    .to(groupRef.current.scale, {
      x: 1.5,
      y: 1.5,
      z: 1.5,
      duration: 0.6,
      ease: "back.out(1.2)",
    }, 0.2);

    // Section7: Closer view - move and scale up
    gsap.timeline({
      scrollTrigger: {
        trigger: "#section7",
        start: "top center",
        end: "bottom center",
        scrub: 1.5,
        markers: true, // Debug markers - remove when done
        onEnter: () => console.log("Section7 entered"),
        onLeave: () => console.log("Section7 left"),
      },
    })
    
    .to(groupRef.current.scale, {
      x: 4,
      y: 4,
      z: 4,
      duration: 0.5,
      ease: "power2.inOut",
    })
    .to(groupRef.current.rotation, {
      y: Math.PI * 0.25,
      duration: 0.5,
      ease: "power1.inOut",
    }, 0.2);
  }, []);

  return (
    <>
      <group ref={groupRef} position={[0, 0, 0]}>
        {/* Lighting removed - controlled within EarthObject for day/night effect */}
        
        <group ref={earthRef} position={[0, 0, 0]}>
          <EarthObject />
        </group>
        <group position={[7, -15, 0]}>
          <MoonObject />
        </group>
        <PortalEffect/>
      </group>
    </>
  );
}

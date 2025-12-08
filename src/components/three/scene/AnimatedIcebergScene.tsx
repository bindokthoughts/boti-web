"use client";

import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Group, Mesh, Material } from "three";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { IcebergObject } from "../objects/IcebergObject";
import { OceanWaves } from "../objects/OceanWaves";
import { DeepSeaView } from "../objects/DeepSeaView";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * AnimatedIcebergScene - Section2 with iceberg
 */
export default function AnimatedIcebergScene() {
  const groupRef = useRef<Group>(null);
  const icebergRef = useRef<Group>(null);
  const timeRef = useRef(0);

  // Floating animation synchronized with waves
  useFrame((state, delta) => {
    if (!icebergRef.current) return;
    
    timeRef.current += delta * 0.8; // Match wave speed
    
    // Gentle bobbing motion matching wave patterns
    const bob1 = Math.sin(timeRef.current * 1.2) * 0.08;
    const bob2 = Math.sin(timeRef.current * 0.9) * 0.05;
    const bob3 = Math.cos(timeRef.current * 1.5) * 0.03;
    
    // Subtle rocking motion
    const rock1 = Math.sin(timeRef.current * 0.6) * 0.02;
    const rock2 = Math.cos(timeRef.current * 0.8) * 0.015;
    
    // Apply floating motion
    icebergRef.current.position.y = bob1 + bob2 + bob3;
    icebergRef.current.rotation.x = rock1;
    icebergRef.current.rotation.z = rock2;
  });

  useGSAP(() => {
    if (!groupRef.current) return;

    // Set initial state - hidden
    gsap.set(groupRef.current.scale, { x: 0, y: 0, z: 0 });
    gsap.set(groupRef.current.position, { x: 0, y: 0, z: 0 });

    // Scroll-based animation for Section2
    gsap.timeline({
      scrollTrigger: {
        trigger: "#section2",
        start: "top center",
        end: "bottom center",
        scrub: 1,
        markers: true, // Debug markers - remove when done
        onEnter: () => console.log("Section2 entered"),
        onLeave: () => console.log("Section2 left"),
      },
    })
      .to(groupRef.current.scale, {
        x: 1.5,
        y: 1.5,
        z: 1.5,
        duration: 0.5,
        ease: "power2.out",
      })
      .to(groupRef.current.rotation, {
        y: Math.PI * 2,
        duration: 1,
        ease: "linear",
      }, "<")


    gsap.timeline({
      scrollTrigger: {
        trigger: "#section3",
        start: "top center",
        end: "bottom center",
        scrub: 1,
        markers: true, // Debug markers - remove when done
        onEnter: () => console.log("Section3 entered"),
        onLeave: () => console.log("Section3 left"),
      },
    })
      .to(groupRef.current.scale, {
        x: 2,
        y: 2,
        z: 2,
        duration: 0.5,
        ease: "power2.out",
      })
      .to(groupRef.current.position, {
        y: 20,
        duration: 1,
        ease: "linear",
      }, "<")

  }, []);

  return (
    <>
      <group ref={groupRef} position={[0, -5, 0]}>
        {/* Ambient light for overall illumination */}
        <ambientLight intensity={0.6} />
        
        {/* Key light - main iceberg illumination */}
        <directionalLight 
          position={[5, 10, 5]} 
          intensity={2} 
          color="#ffffff"
          castShadow
        />
        
        {/* Fill lights for ice crystalline effect */}
        <pointLight position={[10, 5, 10]} intensity={1.5} color="#60a5fa" />
        <pointLight position={[-10, 5, 10]} intensity={1.5} color="#a855f7" />
        <pointLight position={[0, -5, 8]} intensity={1} color="#3FE7F9" />
        
        {/* Rim light from behind */}
        <spotLight 
          position={[0, 2, -5]} 
          intensity={2.5} 
          color="#ffffff"
          angle={0.6}
          penumbra={0.5}
        />
        
        {/* Iceberg with floating animation */}
        <group ref={icebergRef}>
          <IcebergObject />
        </group>
        
        <OceanWaves 
          radius={15} 
          segments={512} 
          waveHeight={0.15} 
          waveSpeed={0.8} 
        />
        
        {/* Deep sea view below the surface */}
        <DeepSeaView 
          radius={15}
          depth={10}
        />
      </group>
    </>
  );
}


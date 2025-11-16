"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import * as THREE from "three";
import { IcebergObject } from "../objects/IcebergObject";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * FracturedIceberg - Iceberg that fractures and reassembles
 */
export default function FracturedIceberg() {
  const groupRef = useRef<THREE.Group>(null);
  const fragmentRefs = useRef<THREE.Group[]>([]);
  
  // Create fragmented iceberg pieces
  const fragments = useMemo(() => {
    return Array.from({ length: 8 }, (_, i) => ({
      id: i,
      offset: new THREE.Vector3(
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 8
      ),
      rotation: new THREE.Euler(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      ),
    }));
  }, []);
  
  useFrame((state) => {
    if (!groupRef.current) return;
    
    const time = state.clock.getElapsedTime();
    groupRef.current.rotation.y = time * 0.1;
  });
  
  useGSAP(() => {
    if (!groupRef.current) return;
    
    // Initial state - assembled
    gsap.set(groupRef.current.position, { y: -100, z: 0 });
    
    // Fracture effect
    fragmentRefs.current.forEach((frag, i) => {
      if (!frag) return;
      
      const fragment = fragments[i];
      
      // Break apart
      gsap.to(frag.position, {
        x: fragment.offset.x,
        y: fragment.offset.y,
        z: fragment.offset.z,
        scrollTrigger: {
          trigger: "#section2",
          start: "top center",
          end: "center center",
          scrub: 1,
        },
      });
      
      gsap.to(frag.rotation, {
        x: fragment.rotation.x,
        y: fragment.rotation.y,
        z: fragment.rotation.z,
        scrollTrigger: {
          trigger: "#section2",
          start: "top center",
          end: "center center",
          scrub: 1,
        },
      });
      
      // Reassemble
      gsap.to(frag.position, {
        x: 0,
        y: 0,
        z: 0,
        scrollTrigger: {
          trigger: "#section2",
          start: "center center",
          end: "bottom center",
          scrub: 1,
        },
      });
      
      gsap.to(frag.rotation, {
        x: 0,
        y: 0,
        z: 0,
        scrollTrigger: {
          trigger: "#section2",
          start: "center center",
          end: "bottom center",
          scrub: 1,
        },
      });
    });
    
    // Whole group animation
    gsap.to(groupRef.current.scale, {
      x: 1.5,
      y: 1.5,
      z: 1.5,
      scrollTrigger: {
        trigger: "#section2",
        start: "top bottom",
        end: "bottom top",
        scrub: 2,
      },
    });
  }, [fragments]);
  
  return (
    <group ref={groupRef} position={[0, -100, 0]}>
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#88ccff" />
      <pointLight position={[-10, -10, 5]} intensity={0.5} color="#ff88cc" />
      
      {fragments.map((_, i) => (
        <group
          key={i}
          ref={(el) => { if (el) fragmentRefs.current[i] = el; }}
          position={[0, 0, 0]}
        >
          <IcebergObject />
        </group>
      ))}
    </group>
  );
}

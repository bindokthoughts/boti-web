"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Group, Mesh } from "three";
import * as THREE from "three";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * MorphingGeometry - Advanced morphing shapes
 * Transitions between different geometric forms
 */
export default function MorphingGeometry() {
  const groupRef = useRef<Group>(null);
  const mesh1Ref = useRef<Mesh>(null);
  const mesh2Ref = useRef<Mesh>(null);
  const mesh3Ref = useRef<Mesh>(null);
  
  // Iridescent material
  const iridescent = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    metalness: 0.9,
    roughness: 0.1,
    envMapIntensity: 1,
    clearcoat: 1,
    clearcoatRoughness: 0.1,
    transmission: 0.5,
    ior: 2.3,
    thickness: 2,
  });
  
  useFrame((state) => {
    if (!groupRef.current) return;
    
    const time = state.clock.getElapsedTime();
    
    // Orbital rotation
    if (mesh1Ref.current) {
      mesh1Ref.current.rotation.x = time * 0.3;
      mesh1Ref.current.rotation.y = time * 0.5;
    }
    
    if (mesh2Ref.current) {
      mesh2Ref.current.rotation.x = time * 0.2;
      mesh2Ref.current.rotation.z = time * 0.4;
    }
    
    if (mesh3Ref.current) {
      mesh3Ref.current.rotation.y = time * 0.35;
      mesh3Ref.current.rotation.z = time * 0.25;
    }
  });
  
  useGSAP(() => {
    if (!groupRef.current) return;
    
    // Initial state
    gsap.set(groupRef.current.position, { y: 0, z: 0 });
    gsap.set(groupRef.current.rotation, { x: 0, y: 0 });
    
    // Morph on scroll - Hero to Section2
    gsap.to(groupRef.current.position, {
      x: 3,
      y: -2,
      scrollTrigger: {
        trigger: "#hero",
        start: "top top",
        end: "bottom top",
        scrub: 1,
      },
    });
    
    // Break apart
    if (mesh1Ref.current) {
      gsap.to(mesh1Ref.current.position, {
        x: -4,
        y: 1,
        scrollTrigger: {
          trigger: "#section2",
          start: "top center",
          end: "bottom center",
          scrub: 1,
        },
      });
    }
    
    if (mesh2Ref.current) {
      gsap.to(mesh2Ref.current.position, {
        x: 0,
        y: 3,
        scrollTrigger: {
          trigger: "#section2",
          start: "top center",
          end: "bottom center",
          scrub: 1,
        },
      });
    }
    
    if (mesh3Ref.current) {
      gsap.to(mesh3Ref.current.position, {
        x: 4,
        y: -1,
        scrollTrigger: {
          trigger: "#section2",
          start: "top center",
          end: "bottom center",
          scrub: 1,
        },
      });
    }
    
    // Reassemble and morph
    gsap.to(groupRef.current.position, {
      y: -150,
      scrollTrigger: {
        trigger: "#section3",
        start: "top center",
        end: "bottom center",
        scrub: 1,
      },
    });
    
    gsap.to(groupRef.current.scale, {
      x: 2,
      y: 2,
      z: 2,
      scrollTrigger: {
        trigger: "#section4",
        start: "top center",
        end: "bottom center",
        scrub: 1,
      },
    });
    
    // Final transformation
    gsap.to(groupRef.current.rotation, {
      x: Math.PI * 2,
      y: Math.PI * 3,
      scrollTrigger: {
        trigger: "#section5",
        start: "top center",
        end: "bottom center",
        scrub: 2,
      },
    });
    
    // Fade out
    gsap.to(groupRef.current.scale, {
      x: 0,
      y: 0,
      z: 0,
      scrollTrigger: {
        trigger: "#section6",
        start: "top center",
        end: "center center",
        scrub: 1,
      },
    });
  }, []);
  
  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      <mesh ref={mesh1Ref} position={[0, 0, 0]} material={iridescent}>
        <octahedronGeometry args={[1.2, 0]} />
      </mesh>
      
      <mesh ref={mesh2Ref} position={[0, 0, 0]} material={iridescent}>
        <icosahedronGeometry args={[0.8, 1]} />
      </mesh>
      
      <mesh ref={mesh3Ref} position={[0, 0, 0]} material={iridescent}>
        <torusKnotGeometry args={[0.6, 0.2, 100, 16]} />
      </mesh>
    </group>
  );
}

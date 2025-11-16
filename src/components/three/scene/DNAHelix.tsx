"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import * as THREE from "three";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * DNAHelix - Animated DNA double helix with glowing particles
 */
export default function DNAHelix() {
  const groupRef = useRef<THREE.Group>(null);
  const particlesRef = useRef<THREE.Points>(null);
  
  // Generate DNA helix geometry
  const { helixGeometry, connectionLines } = useMemo(() => {
    const points1: THREE.Vector3[] = [];
    const points2: THREE.Vector3[] = [];
    const connections: THREE.BufferGeometry[] = [];
    const numPoints = 100;
    const radius = 2;
    const height = 20;
    
    for (let i = 0; i < numPoints; i++) {
      const t = (i / numPoints) * Math.PI * 4;
      const y = (i / numPoints) * height - height / 2;
      
      // First strand
      points1.push(new THREE.Vector3(
        Math.cos(t) * radius,
        y,
        Math.sin(t) * radius
      ));
      
      // Second strand (180° offset)
      points2.push(new THREE.Vector3(
        Math.cos(t + Math.PI) * radius,
        y,
        Math.sin(t + Math.PI) * radius
      ));
      
      // Connection lines every 5th point
      if (i % 5 === 0) {
        const lineGeom = new THREE.BufferGeometry().setFromPoints([
          points1[i],
          points2[i],
        ]);
        connections.push(lineGeom);
      }
    }
    
    const curve1 = new THREE.CatmullRomCurve3(points1);
    const curve2 = new THREE.CatmullRomCurve3(points2);
    
    const tubeGeometry1 = new THREE.TubeGeometry(curve1, 100, 0.1, 8, false);
    const tubeGeometry2 = new THREE.TubeGeometry(curve2, 100, 0.1, 8, false);
    
    return {
      helixGeometry: { tube1: tubeGeometry1, tube2: tubeGeometry2 },
      connectionLines: connections,
    };
  }, []);
  
  // Glowing material
  const glowMaterial1 = new THREE.MeshStandardMaterial({
    color: 0x00ff88,
    emissive: 0x00ff88,
    emissiveIntensity: 2,
    metalness: 0.8,
    roughness: 0.2,
  });
  
  const glowMaterial2 = new THREE.MeshStandardMaterial({
    color: 0xff0088,
    emissive: 0xff0088,
    emissiveIntensity: 2,
    metalness: 0.8,
    roughness: 0.2,
  });
  
  const lineMaterial = new THREE.LineBasicMaterial({
    color: 0x88ccff,
    transparent: true,
    opacity: 0.6,
  });
  
  useFrame((state) => {
    if (!groupRef.current) return;
    
    const time = state.clock.getElapsedTime();
    groupRef.current.rotation.y = time * 0.2;
  });
  
  useGSAP(() => {
    if (!groupRef.current) return;
    
    // DNA appears in Section 3
    gsap.fromTo(
      groupRef.current.scale,
      { x: 0, y: 0, z: 0 },
      {
        x: 1,
        y: 1,
        z: 1,
        scrollTrigger: {
          trigger: "#section3",
          start: "top center",
          end: "center center",
          scrub: 1,
        },
      }
    );
    
    gsap.set(groupRef.current.position, { y: -150 });
    
    // Unwind effect
    gsap.to(groupRef.current.rotation, {
      y: Math.PI * 4,
      scrollTrigger: {
        trigger: "#section4",
        start: "top center",
        end: "bottom center",
        scrub: 2,
      },
    });
    
    // Scale transformation
    gsap.to(groupRef.current.scale, {
      x: 0.5,
      y: 2,
      z: 0.5,
      scrollTrigger: {
        trigger: "#section5",
        start: "top center",
        end: "bottom center",
        scrub: 1,
      },
    });
    
    // Dissolve
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
    <group ref={groupRef} position={[0, -150, 0]}>
      <pointLight position={[0, 5, 5]} intensity={2} color="#00ff88" />
      <pointLight position={[0, -5, -5]} intensity={2} color="#ff0088" />
      
      {/* First strand */}
      <mesh geometry={helixGeometry.tube1} material={glowMaterial1} />
      
      {/* Second strand */}
      <mesh geometry={helixGeometry.tube2} material={glowMaterial2} />
      
      {/* Connection lines */}
      {connectionLines.map((lineGeom, i) => (
        <primitive key={i} object={new THREE.Line(lineGeom, lineMaterial)} />
      ))}
    </group>
  );
}

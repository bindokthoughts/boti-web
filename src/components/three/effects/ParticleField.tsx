"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import * as THREE from "three";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * ParticleField - Advanced particle system with morphing capabilities
 * Creates dynamic 3D particle clouds that respond to scroll
 */
export default function ParticleField() {
  const particlesRef = useRef<THREE.Points>(null);
  const particleCount = 3000;
  
  // Create particle geometry
  const particleGeometry = new THREE.BufferGeometry();
  const positions = new Float32Array(particleCount * 3);
  const colors = new Float32Array(particleCount * 3);
  const sizes = new Float32Array(particleCount);
  
    for (let i = 0; i < particleCount; i++) {
      // Spherical distribution
      const radius = Math.random() * 20 + 10;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos((Math.random() * 2) - 1);
      
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);
      
      // PRIMARY_ACCENT #14E3C9 (0.078, 0.890, 0.788) to HIGHLIGHT #7CF7E4 (0.486, 0.969, 0.894)
      const colorMix = Math.random();
      colors[i * 3] = 0.078 + colorMix * 0.408; // Red channel
      colors[i * 3 + 1] = 0.890 + colorMix * 0.079; // Green channel
      colors[i * 3 + 2] = 0.788 + colorMix * 0.106; // Blue channel
      
      sizes[i] = Math.random() * 2 + 0.5;
    }  particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  particleGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  particleGeometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
  
  const particleMaterial = new THREE.PointsMaterial({
    size: 0.15,
    vertexColors: true,
    transparent: true,
    opacity: 0.8,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    sizeAttenuation: true,
  });
  
  // Animate particles
  useFrame((state) => {
    if (!particlesRef.current) return;
    
    const time = state.clock.getElapsedTime();
    particlesRef.current.rotation.y = time * 0.05;
    particlesRef.current.rotation.x = Math.sin(time * 0.02) * 0.1;
    
    // Pulsing effect
    const positions = particlesRef.current.geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      const x = positions[i3];
      const y = positions[i3 + 1];
      const z = positions[i3 + 2];
      
      const distance = Math.sqrt(x * x + y * y + z * z);
      const pulse = Math.sin(time * 2 + distance * 0.1) * 0.5;
      
      positions[i3 + 1] = y + pulse * 0.01;
    }
    particlesRef.current.geometry.attributes.position.needsUpdate = true;
  });
  
  useGSAP(() => {
    if (!particlesRef.current) return;
    
    // Morph particles on scroll
    gsap.to(particlesRef.current.rotation, {
      z: Math.PI * 2,
      scrollTrigger: {
        trigger: "#hero",
        start: "top top",
        end: "bottom top",
        scrub: 2,
      },
    });
    
    gsap.to(particlesRef.current.scale, {
      x: 0.3,
      y: 0.3,
      z: 0.3,
      scrollTrigger: {
        trigger: "#section2",
        start: "top center",
        end: "bottom center",
        scrub: 1,
      },
    });
    
    gsap.to(particlesRef.current.position, {
      y: -150,
      scrollTrigger: {
        trigger: "#section3",
        start: "top center",
        end: "bottom center",
        scrub: 1,
      },
    });
  }, []);
  
  return (
    <points ref={particlesRef} geometry={particleGeometry} material={particleMaterial} />
  );
}

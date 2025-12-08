"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface DeepSeaViewProps {
  radius?: number;
  depth?: number;
}

export function DeepSeaView({ 
  radius = 15,
  depth = 10
}: DeepSeaViewProps) {
  const groupRef = useRef<THREE.Group>(null);
  const timeRef = useRef(0);
  const cylinderRef = useRef<THREE.Mesh>(null);
  const floorRef = useRef<THREE.Mesh>(null);
  const particlesGroupRef = useRef<THREE.Group>(null);

  // GSAP animation for opacity fade on scroll
  useGSAP(() => {
    if (!groupRef.current) return;

    gsap.timeline({
      scrollTrigger: {
        trigger: "#section5",
        start: "top center",
        end: "center center",
        scrub: 1,
      },
    })
    .to(groupRef.current, {
      opacity: 0,
      onUpdate: function() {
        const opacity = this.progress() === 0 ? 1 : 1 - this.progress();
        
        // Update cylinder material opacity
        if (cylinderRef.current?.material) {
          (cylinderRef.current.material as THREE.Material & { opacity: number }).opacity = opacity * 0.6;
        }
        
        // Update floor material opacity
        if (floorRef.current?.material) {
          (floorRef.current.material as THREE.Material & { opacity: number }).opacity = opacity;
        }
        
        // Update particles opacity
        if (particlesGroupRef.current) {
          particlesGroupRef.current.children.forEach(child => {
            if (child instanceof THREE.Mesh && child.material) {
              (child.material as THREE.Material & { opacity: number }).opacity = opacity * 0.6;
            }
          });
        }
      }
    });
  }, []);

  // Create underwater volumetric effect with particles
  const particles = useMemo(() => {
    const count = 1000;
    const positions = new Float32Array(count * 3);
    const scales = new Float32Array(count);
    
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const dist = Math.random() * radius;
      const x = Math.cos(angle) * dist;
      const z = Math.sin(angle) * dist;
      const y = -Math.random() * depth - 2.5;
      
      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
      
      scales[i] = Math.random() * 0.5 + 0.1;
    }
    
    return { positions, scales, count };
  }, [radius, depth]);

  // Animate particles (floating debris, plankton)
  useFrame((state, delta) => {
    if (!particlesGroupRef.current) return;
    timeRef.current += delta;
    
    particlesGroupRef.current.children.forEach((child, i) => {
      if (child instanceof THREE.Mesh) {
        child.position.y += Math.sin(timeRef.current + i) * 0.01;
        child.rotation.y += 0.005;
      }
    });
  });

  // Create underwater cylinder walls
  const cylinderGeometry = useMemo(() => {
    return new THREE.CylinderGeometry(radius, radius * 0.4, depth, 32, 10, true);
  }, [radius, depth]);

  const cylinderMaterial = useMemo(() => {
    // Create gradient texture for depth
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 128;
    const ctx = canvas.getContext('2d')!;
    
    const gradient = ctx.createLinearGradient(0, 0, 0, 256);
    gradient.addColorStop(0, 'rgba(20, 60, 100, 0.3)'); // Top - lighter
    gradient.addColorStop(0.5, 'rgba(10, 30, 60, 0.5)'); // Middle
    gradient.addColorStop(1, 'rgba(5, 15, 30, 0.8)'); // Bottom - darker
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 256, 256);
    
    const texture = new THREE.CanvasTexture(canvas);
    
    return new THREE.MeshPhysicalMaterial({
      map: texture,
      transparent: true,
      opacity: 0.6,
      side: THREE.BackSide,
      color: new THREE.Color("#0a2540"),
      transmission: 0.3,
      thickness: 3,
      roughness: 0.4,
      metalness: 0.05,
      envMapIntensity: 0.5,
    });
  }, []);

  // Ocean floor
  const floorGeometry = useMemo(() => {
    return new THREE.CircleGeometry(radius * 0.8, 32);
  }, [radius]);

  const floorMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color("#0d1f38"),
      roughness: 0.9,
      metalness: 0.1,
      emissive: new THREE.Color("#061426"),
      emissiveIntensity: 0.2,
    });
  }, []);

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Underwater cylinder walls */}
      <mesh 
        ref={cylinderRef}
        geometry={cylinderGeometry} 
        material={cylinderMaterial}
        position={[0, -depth / 1.25, 0]}
        receiveShadow
      />
      
      {/* Ocean floor */}
      <mesh 
        ref={floorRef}
        geometry={floorGeometry} 
        material={floorMaterial}
        position={[0, -depth, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        receiveShadow
      />
      
      {/* Floating particles (debris, plankton) */}
      <group ref={particlesGroupRef}>
        {Array.from({ length: particles.count }).map((_, i) => (
          <mesh
            key={i}
            position={[
              particles.positions[i * 3],
              particles.positions[i * 3 + 1],
              particles.positions[i * 3 + 2]
            ]}
          >
            <sphereGeometry args={[particles.scales[i] * 0.05, 8, 8]} />
            <meshStandardMaterial
              color="#4fc3f7"
              emissive="#1e88e5"
              emissiveIntensity={0.3}
              transparent
              opacity={0.6}
            />
          </mesh>
        ))}
      </group>
      
      {/* Volumetric light rays */}
      <pointLight 
        position={[0, 5, 0]} 
        intensity={0.5} 
        color="#4fc3f7" 
        distance={depth * 2}
        decay={2}
      />
      
      {/* Ambient underwater lighting */}
      <pointLight 
        position={[0, -depth / 2, 0]} 
        intensity={0.3} 
        color="#0d47a1" 
        distance={depth}
      />
    </group>
  );
}

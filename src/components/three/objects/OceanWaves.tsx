"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface OceanWavesProps {
  radius?: number;
  segments?: number;
  waveHeight?: number;
  waveSpeed?: number;
}

export function OceanWaves({ 
  radius = 15, 
  segments = 512, 
  waveHeight = 0.10,
  waveSpeed = 0.8
}: OceanWavesProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const timeRef = useRef(0);

  // Create ocean geometry with more detail
  const geometry = useMemo(() => {
    const geo = new THREE.PlaneGeometry(radius * 2, radius * 2, segments, segments);
    geo.rotateX(-Math.PI / 2); // Make it horizontal
    return geo;
  }, [radius, segments]);

  // Realistic ocean material with Fresnel effect
  const material = useMemo(() => {
    // Create a gradient texture for depth variation
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext('2d')!;
    
    // Create radial gradient from center (lighter) to edges (darker)
    const gradient = ctx.createRadialGradient(128, 128, 0, 128, 128, 128);
    gradient.addColorStop(0, '#34C6F4'); // Lighter blue at center
    gradient.addColorStop(0.3, '#28A4EE'); // Medium blue
    gradient.addColorStop(0.6, '#276AC1'); // Deep blue
    gradient.addColorStop(1, '#001563'); // Very dark at edges
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 256, 256);
    
    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    
    const mat = new THREE.MeshPhysicalMaterial({
      map: texture,
      transparent: true,
      opacity: 0.9,
      roughness: 0.3,
      metalness: 0.1,
      side: THREE.DoubleSide,
      transmission: 0.5,
      thickness: 2.5,
      ior: 1.33, // Water refractive index
      reflectivity: 0.6,
      clearcoat: 1,
      clearcoatRoughness: 0.1,
      envMapIntensity: 2,
      emissive: new THREE.Color("#0a2540"),
      emissiveIntensity: 0.15,
    });
    return mat;
  }, []);

  // More realistic wave animation with multiple frequencies
  useFrame((state, delta) => {
    if (!meshRef.current) return;

    timeRef.current += delta * waveSpeed;
    const positions = meshRef.current.geometry.attributes.position;
    
    for (let i = 0; i < positions.count; i++) {
      const x = positions.getX(i);
      const z = positions.getZ(i);
      
      // Distance from center for radial effects
      const distance = Math.sqrt(x * x + z * z);
      const normalizedDist = distance / radius;
      
      // Multiple wave layers with different frequencies and directions
      const wave1 = Math.sin(x * 0.4 + timeRef.current * 1.2) * waveHeight;
      const wave2 = Math.sin(z * 0.3 + timeRef.current * 0.9) * waveHeight * 0.7;
      const wave3 = Math.sin((x + z) * 0.25 + timeRef.current * 1.5) * waveHeight * 0.5;
      const wave4 = Math.cos((x - z) * 0.35 + timeRef.current * 0.6) * waveHeight * 0.4;
      
      // Gerstner wave approximation for more realistic rolling motion
      const gerstner = Math.sin(distance * 0.3 - timeRef.current * 1.8) * waveHeight * 0.6;
      
      // Ripple effect around iceberg center
      const ripple = Math.sin(distance * 0.8 - timeRef.current * 2) * waveHeight * 0.3 * Math.exp(-normalizedDist * 0.5);
      
      // Combine all waves
      const finalHeight = wave1 + wave2 + wave3 + wave4 + gerstner + ripple;
      
      positions.setY(i, finalHeight);
    }
    
    positions.needsUpdate = true;
    meshRef.current.geometry.computeVertexNormals(); // Update lighting for realistic shading
  });

  return (
    <mesh 
      ref={meshRef} 
      geometry={geometry} 
      material={material}
      position={[0, -1.85, 0]} // Position below iceberg
      receiveShadow
      castShadow
    />
  );
}

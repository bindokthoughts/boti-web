"use client";

import { Canvas } from "@react-three/fiber";
import { Environment, Preload, Stars, Sparkles } from "@react-three/drei";
import { Suspense, useEffect, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import * as THREE from "three";

// Original camera rigs and scenes - PRESERVED
import MasterCameraRig from "../camera-rig/MasterCameraRig";
import AnimatedCubeScene from "./AnimatedCubeScene";
import AnimatedIcebergScene from "./AnimatedIcebergScene";
import AnimatedEarthMoonScene from "./AnimatedEarthMoonScene";
import AnimatedLunarScene from "./AnimatedLunarScene";

// Enhanced visual effects - ADDITIONAL
import ParticleField from "../effects/ParticleField";
import HolographicGrid from "../effects/HolographicGrid";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * MasterScene - Enhanced immersive 3D experience
 * PRESERVES all original content and 3D models
 * ADDS spectacular visual effects using brand colors (blue-400 to purple-500)
 */
export default function MasterScene() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      <Canvas
        orthographic
        camera={{ 
          position: [0, 0, 10],
          zoom: isMobile ? 80 : 100,
          near: 0.1,
          far: 1000
        }}
        dpr={isMobile ? 1 : [1, 2]}
        performance={{ min: 0.5 }}
        style={{
          touchAction: 'pan-y',
          width: '100%',
          height: '100%'
        }}
        gl={{
          antialias: true,
          powerPreference: "high-performance",
          alpha: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.2,
        }}
      >
        <Suspense fallback={null}>
          {/* Enhanced lighting with brand colors */}
          <ambientLight intensity={0.3} />
          <directionalLight 
            position={[10, 10, 5]}
            intensity={1.2}
            color="#3FE7F9"
            castShadow
          />
          <pointLight position={[-10, 5, -5]} intensity={0.8} color="#7CF7E4" />
          <pointLight position={[10, -5, 5]} intensity={0.6} color="#3B4D91" />
          <spotLight
            position={[0, 20, 10]}
            angle={0.4}
            penumbra={1}
            intensity={1.5}
            color="#3B4D91"
            castShadow
          />

          {/* === ENHANCED ATMOSPHERIC EFFECTS === */}
          {/* Animated stars in brand colors */}
          <Stars
            radius={100}
            depth={50}
            count={isMobile ? 3000 : 5000}
            factor={4}
            saturation={0.5}
            fade
            speed={0.5}
          />

          {/* Sparkles for magical effect */}
          <Sparkles
            count={isMobile ? 50 : 100}
            scale={20}
            size={2}
            speed={0.4}
            opacity={0.6}
            color="#3FE7F9"
          />

          {/* === ORIGINAL CAMERA SYSTEM === */}
          <MasterCameraRig />

          {/* === ADDITIONAL EFFECTS === */}
          {/* Particle field background */}
          <ParticleField />
          
          {/* Holographic grid */}
          <HolographicGrid />

          {/* === ALL ORIGINAL SCENES PRESERVED === */}
          
          {/* Scene 1: Hero - Animated Cube (Y: 0) */}
          <AnimatedCubeScene />

          {/* Scene 2: Section2 - Iceberg (Y: -100) */}
          <AnimatedIcebergScene />

          {/* Scene 3: Section3+ - Earth & Moon (Y: -150) */}
          <AnimatedEarthMoonScene />

          {/* Scene 4: Section7 - Lunar Landscape (Y: -350) */}
          <AnimatedLunarScene />

          {/* Environment with brand-aligned preset */}
          <Environment preset="sunset" />
          
          <Preload all />
        </Suspense>
      </Canvas>
    </div>
  );
}

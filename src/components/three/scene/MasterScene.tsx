"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Preload, Stars, Sparkles, PerspectiveCamera, PerformanceMonitor } from "@react-three/drei";
import { Suspense, useEffect, useState, useRef } from "react";
import { EffectComposer, Bloom, Noise, Vignette } from "@react-three/postprocessing";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import * as THREE from "three";

// Original scenes - PRESERVED
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
 * CameraRig - Dynamically adjusts camera based on raw scroll velocity
 */
function CameraRig() {
  const cameraRef = useRef<THREE.PerspectiveCamera>(null);
  const targetZ = useRef(15);
  
  useFrame((state, delta) => {
    if (!cameraRef.current) return;
    
    // Smoothly interpolate current Z towards the dynamic target Z
    cameraRef.current.position.z = THREE.MathUtils.damp(
      cameraRef.current.position.z,
      targetZ.current,
      4, // ease factor
      delta
    );
  });

  useEffect(() => {
    // GSAP ScrollTrigger to track velocity globally
    ScrollTrigger.create({
      trigger: "body",
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        // Pull camera back when scrolling fast
        const velocity = Math.abs(self.getVelocity());
        const speedFactor = Math.min(velocity / 500, 10);
        targetZ.current = 15 + speedFactor; // Base 15 + up to 10 extra pushback
      }
    });
  }, []);

  return <PerspectiveCamera ref={cameraRef} makeDefault position={[0, 0, 15]} fov={35} near={0.1} far={1000} />;
}

/**
 * MasterScene - Awwwards Tier immersive 3D experience
 */
export default function MasterScene() {
  const [isMobile, setIsMobile] = useState(false);
  const [dpr, setDpr] = useState<number>(1.5);
  const [lowPerf, setLowPerf] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 bg-[#030303]">
      <Canvas
        dpr={dpr}
        performance={{ min: 0.5 }}
        style={{ touchAction: 'pan-y', width: '100%', height: '100%' }}
        gl={{
          antialias: false, // Disabled inside R3F when using PostProcessing
          powerPreference: "high-performance",
          alpha: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.2,
        }}
      >
        <PerformanceMonitor 
          onDecline={() => { setDpr(1); setLowPerf(true); }} 
          onIncline={() => { setDpr(2); setLowPerf(false); }} 
        />
        
        <CameraRig />

        <Suspense fallback={null}>
          {/* Enhanced cinematic lighting with brand colors */}
          <ambientLight intensity={0.2} />
          <directionalLight position={[10, 10, 5]} intensity={1.5} color="#3FE7F9" castShadow />
          <pointLight position={[-10, 5, -5]} intensity={1.0} color="#7CF7E4" />
          <spotLight position={[0, 20, 10]} angle={0.5} penumbra={1} intensity={2.0} color="#3B4D91" castShadow />

          {/* === ATMOSPHERIC EFFECTS === */}
          <Stars radius={100} depth={50} count={isMobile || lowPerf ? 1500 : 4000} factor={4} saturation={0.8} fade speed={0.5} />
          <Sparkles count={isMobile || lowPerf ? 40 : 80} scale={20} size={1.5} speed={0.6} opacity={0.5} color="#3FE7F9" />
          
          <ParticleField />
          <HolographicGrid />

          {/* === PRESERVED 3D MESHES === */}
          <AnimatedCubeScene />          {/* Hero */}
          <AnimatedIcebergScene />       {/* Section 2 */}
          <AnimatedEarthMoonScene />     {/* Sections 3+ */}
          <AnimatedLunarScene />         {/* Sections 7+ */}

          <Environment preset="night" /> 
        </Suspense>

        {/* === POST PROCESSING PIPELINE === */}
        <EffectComposer multisampling={lowPerf ? 0 : 4}>
          <Bloom luminanceThreshold={0.5} luminanceSmoothing={0.9} intensity={1.2} />
          <Noise opacity={0.035} />
          <Vignette eskil={false} offset={0.1} darkness={1.1} />
        </EffectComposer>

        <Preload all />
      </Canvas>
    </div>
  );
}

"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, useProgress } from "@react-three/drei";
import { Suspense, useEffect, useState } from "react";
import AnimatedBox from "../objects/AnimatedBox";
import CameraRig from "./CameraRig";
import Loader from "../../loader/Loader";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ContactShadows } from "@react-three/drei";
import LogoMonogram from "../objects/LogoMonogram";


gsap.registerPlugin(ScrollTrigger);

export default function CubeScene() {
  const { progress } = useProgress();
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  // Handle responsive layout
  useEffect(() => {
    // Initial check
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();

    // Update on resize
    const handleResize = () => {
      checkMobile();
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (progress === 100 || progress === 0) {
      const timer = setTimeout(() => setLoading(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [progress]);

  

  return (
    <div className="fixed inset-0">
      {loading ? (
        <>
        {/* <Loader /> // custom glitch loader */}
        </>
        
      ) : (
        <Canvas
          camera={{ 
            position: [0, 0, isMobile ? 7 : 5],
            fov: isMobile ? 60 : 50,
            near: 0.1,
            far: 1000
          }}
          dpr={isMobile ? 1 : [1, 2]}
          performance={{ min: 0.5 }}
          style={{
            touchAction: 'none',
            width: '100%',
            height: '100%'
          }}
          gl={{
            antialias: true,
            powerPreference: "high-performance",
          }}
        >
          <Suspense fallback={null}>
            <ambientLight intensity={0.5} />
            <directionalLight 
              position={isMobile ? [3, 3, 3] : [5, 5, 5]}
              intensity={isMobile ? 1.2 : 1}
            />
            <AnimatedBox />
            <CameraRig />
            <Environment preset="sunset" />
          </Suspense>
        </Canvas>)}
    </div>
  );
}

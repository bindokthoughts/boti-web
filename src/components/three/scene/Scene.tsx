"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, useProgress } from "@react-three/drei";
import { Suspense, useEffect, useState } from "react";
import AnimatedBox from "../objects/AnimatedBox";
import CameraRig from "./CameraRig";
import Loader from "../../loader/Loader";


export default function Scene() {
  const { progress } = useProgress(); // progress = 0 → 100
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (progress === 100 || progress === 0) {
      // Delay so last text "That's why we need BOTI…" can show
      const timer = setTimeout(() => setLoading(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [progress]);

  return (
    <div className="fixed inset-0">
      {loading ? (
        <Loader /> // 👈 your custom glitch loader
      ) : (
        <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>

          <Suspense fallback={null}>
            <ambientLight intensity={0.5} />
            <directionalLight position={[5, 5, 5]} intensity={1} />
            <AnimatedBox/>
            <CameraRig/>

            {/* Optional HDRI lighting */}
            <Environment preset="sunset" />
          </Suspense>
          <OrbitControls enableZoom={false} />
        </Canvas>)}
    </div>
  );
}

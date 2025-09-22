"use client";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import { Suspense } from "react";
import AnimatedBox from "./AnimatedBox";
import CameraRig from "./CameraRig";

export default function Scene() {
  return (
    <div className="h-[100vh] w-[100vw] text-white">
    <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
      
      <Suspense fallback={null}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} />

        <AnimatedBox />
        <CameraRig />

        {/* Optional HDRI lighting */}
        <Environment preset="sunset" />
      </Suspense>
      <OrbitControls enableZoom={false} />
    </Canvas>
    </div>
  );
}

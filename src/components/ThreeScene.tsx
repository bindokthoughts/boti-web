// src/components/ThreeScene.tsx
"use client";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import AnimatedBox from "./AnimatedBox";
import ScrollBox from "./ScrollBox";

export default function ThreeScene() {
  return (
    <div className="w-full h-screen">
      <Canvas camera={{ position: [0, 0, 5] }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} />
        {/* <AnimatedBox /> */}
        <ScrollBox/>
        <OrbitControls />
      </Canvas>
    </div>
  );
}

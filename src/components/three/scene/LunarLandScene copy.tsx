"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, useProgress } from "@react-three/drei";
import { Suspense, useEffect, useState } from "react";
import Loader from "../../loader/Loader";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { LunarLandObject } from "../objects/LunarLandObject";
import LunarLandCameraRig from "../camera-rig/LunarLandCameraRig";





gsap.registerPlugin(ScrollTrigger);

export default function LunarLandScene() {
   

  return (
    <div className="fixed inset-0">
      <Canvas camera={{ position: [0, 0.5, 3], fov: 10 }}>
          <Suspense fallback={null}>
            <ambientLight intensity={0.3} />
            {/* <directionalLight position={[3, 3, 1]} intensity={0.8} /> */}
            {/* <spotLight position={[-3, 1, 0]} intensity={0.5} angle={0.3} penumbra={1} /> */}
            <LunarLandObject
              scale={[0.003, 0.003, 0.003]}
              position={[0, -1.5, 0]}
              rotation={[-Math.PI / 4, 0, 0]}
            />
            <LunarLandCameraRig/>
            <Environment preset="night"  />
          </Suspense>
          <OrbitControls enableZoom={true} />
        </Canvas>
    </div>
  );
}

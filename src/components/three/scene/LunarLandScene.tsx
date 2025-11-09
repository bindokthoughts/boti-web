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
      <Canvas camera={{ position: [0, 0.5, 100], fov: 60 }}>
          <Suspense fallback={null}>
            <ambientLight intensity={0.1} />
            {/* <directionalLight position={[3, 3, 1]} intensity={0.8} /> */}
            {/* <spotLight position={[-3, 1, 0]} intensity={0.5} angle={0.3} penumbra={1} /> */}
            <LunarLandObject
              scale={[0.0003, 0.0003, 0.0003]}
              position={[0, -2, -1]}
              rotation={[-115, 0, 0]}
            />
            <LunarLandCameraRig/>
            <Environment preset="forest"  />
          </Suspense>
          <OrbitControls enableZoom={true} />
        </Canvas>
    </div>
  );
}

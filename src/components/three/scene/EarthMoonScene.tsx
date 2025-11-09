"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, useProgress } from "@react-three/drei";
import { Suspense, useEffect, useState } from "react";
import { EarthObject } from "../objects/EarthObject";
import { MoonObject } from "../objects/MoonObject";
import EarthMoonCameraRig from "../camera-rig/EarthMoonCameraRig";
import Loader from "../../loader/Loader";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";





gsap.registerPlugin(ScrollTrigger);

export default function EarthMoonScene() {
   

  return (
    <div className="fixed inset-0">
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
          <Suspense fallback={null}>
            {/* <ambientLight intensity={0.2} /> */}
            {/* <directionalLight position={[20, 25, 25]} intensity={0.5} /> */}
            <EarthObject 
              // scale={[2, 2, 2] as [number, number, number]} 
              // position={[0, 0, 0] as [number, number, number]} 
              // rotation={[0, Math.PI / 4, 0] as [number, number, number]} 
            />
            <MoonObject/>
            <EarthMoonCameraRig/>

            {/* Optional HDRI lighting */}
            <Environment preset="sunset" />
          </Suspense>
          <OrbitControls enableZoom={false} />
        </Canvas>
    </div>
  );
}

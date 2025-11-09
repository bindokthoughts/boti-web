"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, useProgress } from "@react-three/drei";
import { Suspense, useEffect, useState } from "react";
import { IcebergObject } from "../objects/IcebergObject";
import IcebergCameraRig from "../camera-rig/IcebergCameraRig";
import Loader from "../../loader/Loader";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";



gsap.registerPlugin(ScrollTrigger);

export default function IcebergScene() {
   

  return (
    <div className="fixed inset-0">
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
          <Suspense fallback={null}>
            {/* <ambientLight intensity={0.2} /> */}
            {/* <directionalLight position={[20, 25, 25]} intensity={0.5} /> */}
            <IcebergObject 
              // scale={[0.5, 0.5, 0.5] as [number, number, number]} 
              // position={[0, -1, 0] as [number, number, number]} 
              // rotation={[0, Math.PI / 4, 0] as [number, number, number]} 
            />
            <IcebergCameraRig/>

            {/* Optional HDRI lighting */}
            <Environment preset="park" />
          </Suspense>
          <OrbitControls enableZoom={false} />
        </Canvas>
    </div>
  );
}

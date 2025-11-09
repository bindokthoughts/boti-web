"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import { Suspense, useRef, useCallback, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { LunarLandObject } from "../objects/LunarLandObject";
import LunarLandCameraRig from "../camera-rig/LunarLandCameraRig";
import { LevaTransformable } from "@/components/TransformTool/TransformTool";
import { Vec3 } from "@/components/TransformTool/TransformTool";
import { Leva } from 'leva';






gsap.registerPlugin(ScrollTrigger);

export default function LunarLandScene() {
  const orbit = useRef(null);
  const [transform] = useState({
    position: [0, 0, 0] as Vec3,
    rotationDeg: [-115, 0, 0] as Vec3,
    scale: [0.00003, 0.00003, 0.00003] as Vec3
  });

  const handleTransformChange = useCallback(({ 
    position, 
    rotationDeg 
  }: { 
    position: Vec3; 
    rotationDeg: Vec3 
  }) => {
    console.log('Transform Updated:', { position, rotationDeg });
  }, []);

  return (
    <>
      <div className="fixed inset-0">
        <Canvas camera={{ position: [0, 0.5, 3], fov: 50 }}>
          <Suspense fallback={null}>
            <ambientLight intensity={0.3} />
            <directionalLight position={[3, 3, 1]} intensity={0.5} />
            <spotLight position={[-3, 1, 0]} intensity={0.2} angle={0.3} penumbra={1} />
            
            <LevaTransformable 
              orbitControlsRef={orbit}
              initial={{
                position: transform.position,
                rotationDeg: transform.rotationDeg
              }}
              onChange={handleTransformChange}
              snap={{ translate: 0.1, rotateDeg: 5, scale: 0.0001 }}
              withGizmo
            >
              <LunarLandObject
                scale={transform.scale}
                position={transform.position}
                rotation={transform.rotationDeg.map((deg: number) => (deg * Math.PI) / 180) as Vec3}
              />
            </LevaTransformable>

            <LunarLandCameraRig />
            <Environment preset="forest"/>
            <OrbitControls ref={orbit} makeDefault enableZoom={true} />
          </Suspense>
        </Canvas>
      </div>
      {/* <Leva 
        collapsed={false} 
        oneLineLabels 
        // hideCopyButton 
        titleBar={{ title: "Transform" }}
        hidden={true}
      /> */}
    </>
  );
}

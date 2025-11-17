"use client";

import { forwardRef } from "react";
import { Mesh } from "three";
import { OrbitControls } from "@react-three/drei";

/**
 * AnimatedBox - Simple cube mesh component
 * Pure geometry component without animations (animations handled in scene)
 */
const AnimatedBox = forwardRef<Mesh>((props, ref) => {
  return (
    <mesh ref={ref} position={[0, 0, 0]} rotation={[0, 0, 0]} {...props} frustumCulled={false}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial 
        color="white" 
        metalness={0.1}
        roughness={0.4}
        transparent={false}
        depthWrite={true}
        depthTest={true}
      />
      {/* <OrbitControls enableZoom={false} /> */}
    </mesh>
  );
});

AnimatedBox.displayName = "AnimatedBox";

export default AnimatedBox;

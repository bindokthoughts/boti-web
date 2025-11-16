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
    <mesh ref={ref} position={[0, 0, 0]} rotation={[0, 0, 0]} {...props}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="white" transparent={true} opacity={1} />
      {/* <OrbitControls enableZoom={false} /> */}
    </mesh>
  );
});

AnimatedBox.displayName = "AnimatedBox";

export default AnimatedBox;

"use client";
import { useRef, useEffect } from "react";
import { Mesh } from "three";
import gsap from "gsap";

export default function AnimatedBox() {
  const ref = useRef<Mesh>(null);

  useEffect(() => {
    if (!ref.current) return;

    gsap.fromTo(
      ref.current.scale,
      { x: 0, y: 0, z: 0 },
      { x: 1, y: 1, z: 1, duration: 1.2, ease: "bounce.out" }
    );
  }, []);

  return (
    <mesh ref={ref} position={[0, 0, 0]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="hotpink" />
    </mesh>
  );
}

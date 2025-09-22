"use client";
import { useEffect, useRef } from "react";
import { Mesh } from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ScrollBox() {
  const boxRef = useRef<Mesh>(null);

  useEffect(() => {
    if (!boxRef.current) return;

    gsap.to(boxRef.current.rotation, {
      x: Math.PI * 2,
      scrollTrigger: {
        trigger: document.body, // or a specific section
        start: "top top",
        end: "bottom bottom",
        scrub: true,
      },
    });
  }, []);

  return (
    <mesh ref={boxRef}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="skyblue" />
    </mesh>
  );
}

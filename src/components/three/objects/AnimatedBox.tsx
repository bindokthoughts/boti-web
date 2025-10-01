"use client";
import * as THREE from "three";
import { useRef, useEffect } from "react";
import { Mesh } from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);


export default function AnimatedBox() {
  const ref = useRef<Mesh>(null);

  // useEffect(() => {
  //   if (!ref.current) return;

  //   gsap.fromTo(
  //     ref.current.scale,
  //     { x: 0, y: 0, z: 0 },
  //     { x: 1, y: 1, z: 1, duration: 1.2, ease: "bounce.out" }
  //   );
  // }, []);

  useEffect(() => {
  if (!ref.current) return;

  // Initial bounce-in animation for scale
  gsap.fromTo(
    ref.current.scale,
    { x: 0, y: 0, z: 0 },
    { x: 1, y: 1, z: 1, duration: 1.2, ease: "bounce.out" }
  );

  // Timeline 1: Hero Section Scroll Animation
  const tl1 = gsap.timeline({
    scrollTrigger: {
      trigger: "#home",
      start: "top bottom",
      end: "top top",
      scrub: true,
    },
  });

  tl1.to(ref.current.rotation, { x: 0.0, ease: "power2.inOut" })
     .to(ref.current.rotation, { y: 0.0, ease: "power2.inOut" }, ">")
     .to(ref.current.rotation, { x: 0.0, ease: "power2.inOut" }, "<")
     .to(ref.current.position, { x: 0.0, ease: "power2.inOut" }, "<")
     .to(ref.current.scale, { x: 1, y: 1, z: 1, ease: "power2.inOut" }, "<");

  // Timeline 2: Section 2 Scroll Animation
  const tl2 = gsap.timeline({
    scrollTrigger: {
      trigger: "#section_2",
      start: "top bottom",
      end: "top top",
      scrub: true,
    },
  });

  tl2.to(ref.current.rotation, { y: 0, ease: "power2.inOut" })
     .to(ref.current.position, { x: 0, ease: "power2.inOut" }, "<");

  // Cleanup: Kill timelines and all ScrollTriggers
  return () => {
    tl1.kill();
    tl2.kill();
    ScrollTrigger.getAll().forEach(st => st.kill());
  };
}, []);


  return (
    <mesh ref={ref} position={[0, 0, 0]} rotation={[0, 0, 0]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="white" />
    </mesh>
  );
}

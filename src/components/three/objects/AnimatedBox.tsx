"use client";
import * as THREE from "three";
import { useRef } from "react";
import { Mesh } from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { OrbitControls } from "@react-three/drei";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);


export default function AnimatedBox() {
  const ref = useRef<Mesh>(null);

  useGSAP(() => {
    if (!ref.current) return;

    // Initial bounce-in animation for scale
    gsap.from(ref.current.scale, {
      x: 0,
      y: 0,
      z: 0,
      duration: 1.2,
      ease: "power1.in",
      immediateRender: true,
      overwrite: true
    });

    // Timeline 1: Hero Section Scroll Animation
    const tl1 = gsap.timeline({
      scrollTrigger: {
        trigger: "#hero",
        start: "top bottom",
        end: "top top",
        scrub: true,
      },
    });

    tl1.to(ref.current.rotation, { x: 0, ease: "power2.inOut" })
      // .to(ref.current.rotation, { y: 0.0, ease: "power2.inOut" }, ">")
      // .to(ref.current.rotation, { x: 0.0, ease: "power2.inOut" }, "<")
      .to(ref.current.position, { x: -2, ease: "power2.inOut" }, "<")
      .to(ref.current.rotation, { y: 2, duration: 1.2, ease: "power2.inOut" }, "<")
      .to(ref.current.rotation, { z: 0, duration: 3, ease: "power2.inOut" }, "<")
    // .to(ref.current.position, { x: -2, ease: "power2.inOut" }, "<")
    // .to(ref.current.scale, { x: 1, y: 1, z: 1, ease: "power2.inOut" }, "<");

    // Section 2 Timeline
    const tl2 = gsap.timeline({
      scrollTrigger: {
        trigger: "#section2",
        start: "top center",
        end: "bottom center",
        toggleActions: "play reverse play reverse", // play on enter, reverse on leave
        // markers: true,
      },
    });

    tl2.to(ref.current.rotation, {
      x: Math.PI * 0.5,
      y: Math.PI * 0.25,
      duration: 1,
      ease: "power2.inOut"
    })
      .to(ref.current.scale, {
        x: 1.5,
        y: 1.5,
        z: 1.5,
        duration: 1,
        ease: "power2.inOut"
      }, "<");

    // Section 3 Timeline
    const tl3 = gsap.timeline({
      scrollTrigger: {
        trigger: "#section3",
        start: "top center",
        end: "bottom center",
        toggleActions: "play reverse play reverse", // play on enter, reverse on leave
        // markers: true,
      },
    });

    tl3.to(ref.current.rotation, {
      x: Math.PI,
      y: Math.PI * 0.5,
      duration: 1,
      ease: "power2.inOut"
    })
      .to(ref.current.position, {
        x: 2,
        y: 1,
        duration: 1,
        ease: "power2.inOut"
      }, "<");

    // Section 4 Timeline
    const tl4 = gsap.timeline({
      scrollTrigger: {
        trigger: "#section4",
        start: "top center",
        end: "bottom center",
        toggleActions: "play reverse play reverse", // play on enter, reverse on leave
        // markers: true,
      },
    });

    tl4.to(ref.current.rotation, {
      x: Math.PI * 1.5,
      y: Math.PI * 0.75,
      duration: 1,
      ease: "power2.inOut"
    })
      .to(ref.current.scale, {
        x: 1.25,
        y: 1.25,
        z: 1.25,
        duration: 1,
        ease: "power2.inOut"
      }, "<");

    // Section 5 Timeline
    const tl5 = gsap.timeline({
      scrollTrigger: {
        trigger: "#section5",
        start: "top center",
        end: "bottom center",
        toggleActions: "play reverse play reverse", // play on enter, reverse on leave
        // markers: true,
      },
    });

    tl5.to(ref.current.material, {
      // opacity: 0,
      ease: "power2.inOut"
    })
      .to(ref.current.position, {
        x: 0.5,
        y: 0.75,
        z: 0,
        ease: "power2.inOut"
      }, "<")
      .to(ref.current.rotation, {
        x: 0.5,
        y: 0.25,
        z: 0,
        ease: "power2.inOut"
      }, "<");;

    const tl6 = gsap.timeline({
      scrollTrigger: {
        trigger: "#section6",
        start: "center center",
        end: "top top",
        // scrub: true,
      },
    });

    tl6.to(ref.current.position, { x: 0, ease: "power2.inOut" }, ">")
      .to(ref.current.position, { y: 0, ease: "power2.inOut" }, ">")
      .to(ref.current.position, { z: 0, ease: "power2.inOut" }, "<")

      .to(ref.current.scale, { x: 0, ease: "power2.inOut" }, "<")
      .to(ref.current.scale, { y: 0, ease: "power2.inOut" }, "<")
      .to(ref.current.scale, { z: 0, ease: "power2.inOut" }, "<");



    // Cleanup will still be handled by useGSAP
  }); // Remove scope since we're mixing DOM and Three.js animations


  return (
    <mesh ref={ref} position={[0, 0, 0]} rotation={[0, 0, 0]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="white" transparent={true} opacity={1} />
      <OrbitControls enableZoom={false} />
    </mesh>
  );
}

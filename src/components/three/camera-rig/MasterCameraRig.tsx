"use client";

import { useRef } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import * as THREE from "three";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * MasterCameraRig - Cinematic camera controller with smooth transitions
 * Orchestrates all camera movements across the entire experience
 */
export default function MasterCameraRig() {
  const { camera } = useThree();
  const cameraRef = useRef(camera);
  const targetRef = useRef(new THREE.Vector3(0, 0, 0));
  
  // Smooth camera follow
  useFrame(() => {
    const cam = cameraRef.current;
    cam.lookAt(targetRef.current);
    
    // Subtle camera shake for cinematic feel
    const time = Date.now() * 0.001;
    cam.position.x += Math.sin(time * 0.5) * 0.002;
    cam.position.y += Math.cos(time * 0.3) * 0.002;
  });

  useGSAP(() => {
    const cam = cameraRef.current;
    const target = targetRef.current;

    // Hero - Close intimate shot
    gsap.timeline({
      scrollTrigger: {
        trigger: "#hero",
        start: "top top",
        end: "bottom top",
        scrub: 1,
      },
    })
    .to(cam.position, { x: 0, y: 0, z: 8, duration: 1 })
    .to(target, { x: 0, y: 0, z: 0, duration: 1 }, "<");

    // Section2 - Continue focusing on cube
    gsap.timeline({
      scrollTrigger: {
        trigger: "#section2",
        start: "top center",
        end: "bottom center",
        scrub: 1,
      },
    })
    .to(cam.position, { x: -1, y: 0, z: 9, ease: "power2.inOut" })
    .to(target, { x: 0, y: 0, z: 0, ease: "power2.inOut" }, "<");

    // Section3 - Keep focused on cube
    gsap.timeline({
      scrollTrigger: {
        trigger: "#section3",
        start: "top center",
        end: "bottom center",
        scrub: 1,
      },
    })
    .to(cam.position, { 
      x: 2, 
      y: 0, 
      z: 10,
      ease: "power1.inOut" 
    })
    .to(target, { x: 0, y: 0, z: 0 }, "<");

    // Section4 - Keep focused on cube until it scales to 0
    gsap.timeline({
      scrollTrigger: {
        trigger: "#section4",
        start: "top center",
        end: "center center",
        scrub: 1,
      },
    })
    .to(cam.position, { x: 0, y: 0, z: 8 })
    .to(target, { x: 0, y: 0, z: 0 }, "<");

    // Section5-6 - Transition to Earth/Moon scene
    gsap.timeline({
      scrollTrigger: {
        trigger: "#section5",
        start: "top center",
        end: "bottom center",
        scrub: 1,
      },
    })
    .to(cam.position, { x: -8, y: -140, z: 12 })
    .to(target, { x: 0, y: -150, z: 0 }, "<");

    // Section7+ - Dramatic entrance
    gsap.timeline({
      scrollTrigger: {
        trigger: "#section7",
        start: "top center",
        end: "bottom center",
        scrub: 1,
      },
    })
    .to(cam.position, { 
      x: 0, 
      y: -340, 
      z: 20,
      ease: "power3.inOut" 
    })
    .to(target, { x: 0, y: -350, z: 0 }, "<");

    // Final sections - Stabilize
    gsap.timeline({
      scrollTrigger: {
        trigger: "#section10",
        start: "top center",
        end: "bottom center",
        scrub: 1,
      },
    })
    .to(cam.position, { x: 0, y: -350, z: 8 })
    .to(target, { x: 0, y: -350, z: 0 }, "<");

  }, []);

  return null;
}

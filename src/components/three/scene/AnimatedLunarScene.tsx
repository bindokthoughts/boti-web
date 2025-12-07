"use client";

import { useRef } from "react";
import { useThree } from "@react-three/fiber";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Group, PerspectiveCamera } from "three";
import { LunarLandObject } from "../objects/LunarLandObject";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * AnimatedLunarScene - Section10 with lunar landscape
 * Uses its own dedicated camera
 */
export default function AnimatedLunarScene() {
  const groupRef = useRef<Group>(null);
  const cameraRef = useRef<PerspectiveCamera>(null);
  const { gl, scene } = useThree();

  useGSAP(() => {
    if (!groupRef.current || !cameraRef.current) return;

    const camera = cameraRef.current;
    camera.position.set(0, -340, 20);
    camera.lookAt(0, -350, 0);

    // Fade in animation - scale from 0 to 1
    gsap.fromTo(
      groupRef.current.scale,
      { x: 0, y: 0, z: 0 },
      {
        x: 1,
        y: 1,
        z: 1,
        scrollTrigger: {
          trigger: "#section10",
          start: "top bottom",
          end: "top center",
          scrub: 1,
        },
      }
    );

    // Slight rotation on scroll - tilt effect
    gsap.to(groupRef.current.rotation, {
      x: -1.8,
      scrollTrigger: {
        trigger: "#section10",
        start: "top center",
        end: "bottom center",
        scrub: 2,
      },
    });

    // Position adjustment - subtle upward float
    gsap.to(groupRef.current.position, {
      y: -345,
      scrollTrigger: {
        trigger: "#section10",
        start: "top center",
        end: "center center",
        scrub: 1,
      },
    });

    // Camera animations for Section7 and Section10
    // Section7 - Dramatic entrance
    gsap.timeline({
      scrollTrigger: {
        trigger: "#section7",
        start: "top center",
        end: "bottom center",
        scrub: 1,
      },
    })
    .to(camera.position, { 
      x: 0, 
      y: -340, 
      z: 20,
      ease: "power3.inOut" 
    });

    // Section10 - Stabilize
    gsap.timeline({
      scrollTrigger: {
        trigger: "#section10",
        start: "top center",
        end: "bottom center",
        scrub: 1,
      },
    })
    .to(camera.position, { x: 0, y: -350, z: 8 });

    // Camera lookAt for Section7 and Section10
    gsap.to({}, {
      scrollTrigger: {
        trigger: "#section7",
        start: "top center",
        end: "bottom center",
        scrub: 1,
        onUpdate: () => {
          camera.lookAt(0, -350, 0);
        },
      },
    });

    gsap.to({}, {
      scrollTrigger: {
        trigger: "#section10",
        start: "top center",
        end: "bottom center",
        scrub: 1,
        onUpdate: () => {
          camera.lookAt(0, -350, 0);
        },
      },
    });

    // Activate this camera for Section7-13
    ScrollTrigger.create({
      trigger: "#section7",
      start: "top top",
      endTrigger: "#section12",
      end: "bottom top",
      onUpdate: () => {
        gl.render(scene, camera);
      },
    });
  }, [gl, scene]);

  return (
    <>
      <perspectiveCamera ref={cameraRef} fov={50} />
      <group ref={groupRef} position={[0, -350, 0]}>
        {/* Brand-colored lunar lighting */}
        <ambientLight intensity={0.15} />
        <pointLight position={[5, 10, 5]} intensity={0.8} color="#3FE7F9" />
        <pointLight position={[-5, 5, -5]} intensity={0.6} color="#7CF7E4" />
        <spotLight
          position={[0, 15, 10]}
          angle={0.3}
          penumbra={1}
          intensity={1}
          color="#3B4D91"
        />
        <LunarLandObject
          scale={[0.0003, 0.0003, 0.0003]}
          position={[0, -2, -1]}
          rotation={[-115, 0, 0]}
        />
      </group>
    </>
  );
}

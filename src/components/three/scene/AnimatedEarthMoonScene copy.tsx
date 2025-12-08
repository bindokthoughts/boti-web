"use client";

import { useRef } from "react";
import { useThree } from "@react-three/fiber";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Group, PerspectiveCamera } from "three";
import { EarthObject } from "../objects/EarthObject";
import { MoonObject } from "../objects/MoonObject";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * AnimatedEarthMoonScene - Section3+ with orbiting moon
 * Uses its own dedicated camera
 */
export default function AnimatedEarthMoonScene() {
  const groupRef = useRef<Group>(null);
  const earthRef = useRef<Group>(null);
  const moonRef = useRef<Group>(null);
  const cameraRef = useRef<PerspectiveCamera>(null);
  const { gl, scene } = useThree();

  useGSAP(() => {
    if (!groupRef.current || !cameraRef.current) return;

    const camera = cameraRef.current;
    camera.position.set(-8, -140, 12);
    camera.lookAt(0, -150, 0);

    // Earth rotation - continuous spin
    if (earthRef.current) {
      gsap.to(earthRef.current.rotation, {
        y: Math.PI * 2,
        duration: 20,
        // repeat: -1,
        ease: "none",
      });
    }

    // Moon orbit around Earth
    if (moonRef.current) {
      gsap.to(moonRef.current.rotation, {
        y: Math.PI * 2,
        duration: 15,
        // repeat: -1,
        ease: "none",
      });
    }

    // Group scale animation - zoom in effect
    gsap.fromTo(
      groupRef.current.scale,
      { x: 0.3, y: 0.3, z: 0.3 },
      {
        x: 1,
        y: 1,
        z: 1,
        scrollTrigger: {
          trigger: "#section7",
          start: "top bottom",
          end: "center center",
          scrub: 1,
        },
      }
    );

    // Group rotation on scroll
    gsap.to(groupRef.current.rotation, {
      y: -(Math.PI * 0.25),
      scrollTrigger: {
        trigger: "#section7",
        start: "top center",
        end: "bottom center",
        scrub: 2,
      },
    });

    // Camera animations for Section5-6
    gsap.timeline({
      scrollTrigger: {
        trigger: "#section5",
        start: "top center",
        end: "bottom center",
        scrub: 1,
      },
    })
    .to(camera.position, { x: -8, y: -140, z: 12 });

    // Camera lookAt for Section5-6
    gsap.to({}, {
      scrollTrigger: {
        trigger: "#section5",
        start: "top center",
        end: "bottom center",
        scrub: 1,
        onUpdate: () => {
          camera.lookAt(0, -150, 0);
        },
      },
    });

    // Activate this camera for Section5-6
    ScrollTrigger.create({
      trigger: "#section5",
      start: "top top",
      endTrigger: "#section6",
      end: "bottom top",
      onUpdate: () => {
        gl.render(scene, camera);
      },
    });
  }, [gl, scene]);

  return (
    <>
      <perspectiveCamera ref={cameraRef} fov={50} />
      <group ref={groupRef} position={[0, -150, 0]}>
        {/* Brand-colored lighting */}
        <ambientLight intensity={0.2} />
        <pointLight position={[10, 5, 5]} intensity={1} color="#3FE7F9" />
        <pointLight position={[-10, -5, -5]} intensity={0.8} color="#3B4D91" />
        
        <group ref={earthRef} position={[0, 0, 0]}>
          <EarthObject />
        </group>
        <group ref={moonRef} position={[7, -15, 0]}>
          <MoonObject />
        </group>
      </group>
    </>
  );
}

"use client";

import { useRef } from "react";
import { useThree } from "@react-three/fiber";
import { Group, PerspectiveCamera } from "three";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { IcebergObject } from "../objects/IcebergObject";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * AnimatedIcebergScene - Section2 with animated iceberg
 * Uses its own dedicated camera
 */
export default function AnimatedIcebergScene() {
  const groupRef = useRef<Group>(null);
  const cameraRef = useRef<PerspectiveCamera>(null);
  const { gl, scene } = useThree();

  useGSAP(() => {
    if (!groupRef.current || !cameraRef.current) return;

    const camera = cameraRef.current;
    camera.position.set(0, -100, 14);
    camera.lookAt(0, -100, 0);

    // Initial state - iceberg hidden below viewport, dramatic angle
    gsap.set(groupRef.current.position, { x: 0, y: 0, z: 0 });
    gsap.set(groupRef.current.rotation, { x: 0.1, y: -0.3, z: 0.05 });
    gsap.set(groupRef.current.scale, { x: 0, y: 0, z: 0 });

    // Main scroll-linked timeline for section2
    const mainTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: "#section2",
        start: "top bottom",
        end: "bottom top",
        scrub: 1.5,
      },
    });

    // Dramatic entrance: Rise and reveal
    mainTimeline
      .to(groupRef.current.position, {
        y: -150,
        duration: 0.3,
        ease: "power2.out",
      }, 0)
      .to(groupRef.current.scale, {
        x: 1.2,
        y: 1.2,
        z: 1.2,
        duration: 0.4,
        ease: "power1.out",
      }, 0)
      // Elegant rotation reveal
      .to(groupRef.current.rotation, {
        y: 0.8,
        x: 0,
        duration: 0.5,
        ease: "power2.inOut",
      }, 0.1)
      // Slow drift and tilt in middle section
      .to(groupRef.current.position, {
        x: -2,
        z: 2,
        duration: 0.3,
        ease: "sine.inOut",
      }, 0.4)
      .to(groupRef.current.rotation, {
        z: -0.1,
        y: 1.2,
        duration: 0.3,
        ease: "sine.inOut",
      }, 0.4)
      // Final settling position
      .to(groupRef.current.position, {
        x: 0,
        y: -102,
        z: 0,
        duration: 0.3,
        ease: "power2.in",
      }, 0.7)
      .to(groupRef.current.rotation, {
        y: 1.57,
        z: 0,
        duration: 0.3,
        ease: "power2.inOut",
      }, 0.7);

    // Section3 timeline - scale up and move to top (half visible)
    gsap.timeline({
      scrollTrigger: {
        trigger: "#section3",
        start: "top bottom",
        end: "bottom top",
        scrub: 1.5,
        onEnter: () => floatAnimation.pause(), // Stop floating during position change
        onLeave: () => floatAnimation.pause(),
        onEnterBack: () => floatAnimation.pause(),
      },
    })
    .to(groupRef.current.scale, {
      x: 2.5,
      y: 2.5,
      z: 2.5,
      ease: "power2.inOut",
    })
    .to(groupRef.current.position, {
      x: 0,
      y: -70, // Top position - only lower half visible
      z: 0,
      ease: "power2.inOut",
    }, "<");

    // Continuous floating animation (idle motion) - only for Section2
    const floatAnimation = gsap.timeline({ repeat: -1, paused: true });
    floatAnimation
      .to(groupRef.current.position, {
        y: "+=1.5",
        duration: 4,
        ease: "sine.inOut",
      })
      .to(groupRef.current.position, {
        y: "-=1.5",
        duration: 4,
        ease: "sine.inOut",
      })
      .to(groupRef.current.rotation, {
        x: "+=0.05",
        duration: 5,
        ease: "sine.inOut",
      }, 0)
      .to(groupRef.current.rotation, {
        x: "-=0.05",
        duration: 5,
        ease: "sine.inOut",
      }, 5);

    // Control floating based on visibility - Only Section2
    ScrollTrigger.create({
      trigger: "#section2",
      start: "top bottom",
      end: "bottom top",
      onEnter: () => floatAnimation.play(),
      onLeave: () => floatAnimation.pause(),
      onEnterBack: () => floatAnimation.play(),
      onLeaveBack: () => floatAnimation.pause(),
    });

    // Camera choreography - only during Section2 active view
    gsap.timeline({
      scrollTrigger: {
        trigger: "#section2",
        start: "top center",
        end: "bottom center",
        scrub: 2,
      },
    })
    .to(camera.position, {
      x: 0,
      y: -100,
      z: 12,
      duration: 0.5,
      ease: "sine.inOut",
    }, 0)
    .to(camera.position, {
      x: 0,
      y: -100,
      z: 14,
      duration: 0.5,
      ease: "power2.inOut",
    }, 0.5);

    // Dynamic camera lookAt for Section2
    ScrollTrigger.create({
      trigger: "#section2",
      start: "top center",
      end: "bottom center",
      scrub: 2,
      onUpdate: (self) => {
        const progress = self.progress;
        const focusX = Math.sin(progress * Math.PI) * -0.5;
        const focusY = -50+ Math.sin(progress * Math.PI * 2) * 2;
        const focusZ = Math.cos(progress * Math.PI) * 1;
        camera.lookAt(focusX, focusY, focusZ);
      },
    });

    // Transition camera to next section
    gsap.timeline({
      scrollTrigger: {
        trigger: "#section2",
        start: "bottom center",
        endTrigger: "#section5",
        end: "top center",
        scrub: 1,
      },
    })
    .to(camera.position, {
      x: 0,
      y: -100,
      z: 12,
      ease: "power2.inOut",
    })
    .to({}, {
      onUpdate: () => camera.lookAt(0, -100, 0),
    }, 0);

    // Activate this camera for Section2 and Section3
    ScrollTrigger.create({
      trigger: "#section2",
      start: "top top",
      endTrigger: "#section3",
      end: "bottom top",
      onUpdate: () => {
        gl.render(scene, camera);
      },
    });
  }, [gl, scene]);

  return (
    <>
      <perspectiveCamera ref={cameraRef} fov={50} />
      <group ref={groupRef} position={[0, -100, 0]}>
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={1.2} color="#60a5fa" />
        <pointLight position={[-10, -10, 5]} intensity={0.8} color="#a855f7" />
        <IcebergObject />
      </group>
    </>
  );
}


"use client";

import { useRef } from "react";
import { useThree } from "@react-three/fiber";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Mesh, OrthographicCamera } from "three";
import AnimatedBox from "../objects/AnimatedBox";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * AnimatedCubeScene - Hero section with animated cube
 * Uses its own dedicated camera
 */
export default function AnimatedCubeScene() {
  const meshRef = useRef<Mesh>(null);
  const cameraRef = useRef<OrthographicCamera>(null);
  const { gl, scene, size } = useThree();

  useGSAP(() => {
    if (!meshRef.current || !cameraRef.current) return;

    const camera = cameraRef.current;
    
    // Setup orthographic camera
    const aspect = size.width / size.height;
    camera.left = -aspect * 5;
    camera.right = aspect * 5;
    camera.top = 5;
    camera.bottom = -5;
    camera.near = 0.1;
    camera.far = 1000;
    camera.zoom = 100;
    camera.position.set(0, 0, 10);
    camera.updateProjectionMatrix();

    // Set initial state - flat square (orthographic view)
    gsap.set(meshRef.current.scale, {
      x: 2.5,
      y: 2.5,
      z: 2.5,
    });

    gsap.set(meshRef.current.position, {
      x: -2, // Position on left side
      y: 0,
      z: 0,
    });

    gsap.set(meshRef.current.rotation, {
      x: 0,
      y: 0,
      z: 0,
    });

    // Timeline 1: Hero to Section2 - expand from flat square to 3D cube
    gsap.timeline({
      scrollTrigger: {
        trigger: "#hero",
        start: "top top",
        end: "bottom top",
        scrub: 2,
      },
    })
      .to(meshRef.current.scale, { 
        x: 2, 
        y: 2, 
        z: 2, 
        ease: "power2.inOut",
        duration: 1,
      })
      .to(meshRef.current.rotation, { 
        x: 0.471239, // ~27 degrees
        y: 0.471239, // ~27 degrees
        ease: "power2.inOut",
        duration: 1,
      }, "<")
      .to(meshRef.current.position, { 
        x: -1.5, 
        y: 0,
        ease: "power2.inOut",
        duration: 1,
      }, "<");

    // Section 2 Timeline - gentle rotation
    gsap.timeline({
      scrollTrigger: {
        trigger: "#section2",
        start: "top bottom",
        end: "bottom top",
        scrub: 2,
      },
    })
      .to(meshRef.current.rotation, {
        x: 0.314159, // ~18 degrees
        y: 0.314159, // ~18 degrees
        ease: "power1.inOut",
      })
      .to(
        meshRef.current.position,
        {
          x: -0.5,
          y: 0,
          ease: "power1.inOut",
        },
        "<"
      )
      .to(
        meshRef.current.scale,
        {
          x: 1.8,
          y: 1.8,
          z: 1.8,
          ease: "power1.inOut",
        },
        "<"
      );

    // Section 3 Timeline - more rotation and fade out
    gsap.timeline({
      scrollTrigger: {
        trigger: "#section3",
        start: "top bottom",
        end: "bottom top",
        scrub: 2,
      },
    })
      .to(meshRef.current.rotation, {
        x: 0.439823, // ~25.2 degrees
        y: 0.565487, // ~32.4 degrees
        ease: "power1.inOut",
      })
      .to(
        meshRef.current.position,
        {
          x: 0.5,
          y: 0.3,
          ease: "power1.inOut",
        },
        "<"
      )
      .to(
        meshRef.current.scale,
        {
          x: 2,
          y: 2,
          z: 2,
          ease: "power1.inOut",
        },
        "<"
      )
      .to(
        meshRef.current.scale,
        {
          x: 0,
          y: 0,
          z: 0,
          ease: "power2.in",
        },
        "+=0.3"
      );

    // Camera animations for Hero and Section3
    // Hero - Close intimate shot
    gsap.timeline({
      scrollTrigger: {
        trigger: "#hero",
        start: "top top",
        end: "bottom top",
        scrub: 1,
      },
    })
    .to(camera.position, { x: 0, y: 0, z: 8, duration: 1 });

    // Section3 - Keep focused on cube
    gsap.timeline({
      scrollTrigger: {
        trigger: "#section3",
        start: "top center",
        end: "bottom center",
        scrub: 1,
      },
    })
    .to(camera.position, { 
      x: 2, 
      y: 0, 
      z: 2,
      ease: "power1.inOut" 
    });

    // Camera lookAt for Hero and Section3
    gsap.to({}, {
      scrollTrigger: {
        trigger: "#hero",
        start: "top top",
        end: "bottom top",
        scrub: 1,
        onUpdate: () => {
          camera.lookAt(0, 0, 0);
        },
      },
    });

    gsap.to({}, {
      scrollTrigger: {
        trigger: "#section3",
        start: "top center",
        end: "bottom center",
        scrub: 1,
        onUpdate: () => {
          camera.lookAt(0, 0, 0);
        },
      },
    });

    // Activate this camera for Hero and Section3
    ScrollTrigger.create({
      trigger: "#hero",
      start: "top top",
      endTrigger: "#section3",
      end: "bottom top",
      onUpdate: () => {
        gl.render(scene, camera);
      },
    });
  }, [gl, scene, size]);

  return (
    <>
      <orthographicCamera ref={cameraRef} />
      <AnimatedBox ref={meshRef} />
    </>
  );
}

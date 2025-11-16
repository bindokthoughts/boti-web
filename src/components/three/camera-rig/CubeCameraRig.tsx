"use client";

import { useRef, useEffect, useState } from "react";
import { useThree } from "@react-three/fiber";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { OrthographicCamera } from "three";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * CubeCameraRig - Dedicated camera controller for the animated cube scene (Hero)
 * Uses OrthographicCamera for flat perspective
 */
export default function CubeCameraRig() {
  const { gl, scene, size } = useThree();
  const orthoCameraRef = useRef<OrthographicCamera | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Create orthographic camera and detect mobile/desktop
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);

    // Create orthographic camera with proper aspect ratio
    const aspect = size.width / size.height;
    const frustumSize = 3;
    const orthoCamera = new OrthographicCamera(
      (frustumSize * aspect) / -2,
      (frustumSize * aspect) / 2,
      frustumSize / 2,
      frustumSize / -2,
      0.1,
      1000
    );
    orthoCamera.position.set(0, 0, isMobile ? 7 : 5);
    orthoCameraRef.current = orthoCamera;
    scene.add(orthoCamera);

    return () => {
      window.removeEventListener("resize", checkMobile);
      if (orthoCameraRef.current) {
        scene.remove(orthoCameraRef.current);
      }
    };
  }, [scene, size, isMobile]);

  useGSAP(() => {
    if (!orthoCameraRef.current) return;

    const orthoCamera = orthoCameraRef.current;

    // Switch to orthographic camera during Hero section
    gsap.to(
      {},
      {
        scrollTrigger: {
          trigger: "#hero",
          start: "top top",
          end: "bottom top",
          onEnter: () => gl.render(scene, orthoCamera),
          onLeave: () => {}, // Allow other rigs to take over
          onEnterBack: () => gl.render(scene, orthoCamera),
        },
      }
    );

    // Camera position animation during Hero
    gsap.to(orthoCamera.position, {
      x: 0,
      y: 0,
      z: isMobile ? 7 : 5,
      scrollTrigger: {
        trigger: "#hero",
        start: "top top",
        end: "bottom top",
        scrub: 1,
      },
    });

    // Camera lookAt - focused on cube
    gsap.to(
      {},
      {
        scrollTrigger: {
          trigger: "#hero",
          start: "top top",
          end: "bottom top",
          scrub: 1,
          onUpdate: () => {
            orthoCamera.lookAt(0, 0, 0);
          },
        },
      }
    );
  }, [isMobile, gl, scene]);

  return null;
}

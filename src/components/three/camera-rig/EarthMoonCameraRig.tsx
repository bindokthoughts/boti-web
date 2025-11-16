"use client";

import { useRef, useState, useEffect } from "react";
import { useThree } from "@react-three/fiber";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * EarthMoonCameraRig - Dedicated camera controller for the Earth & Moon scene
 * Provides orbital camera movement and smooth transitions
 */
export default function EarthMoonCameraRig() {
  const { camera, gl, scene } = useThree();
  const cameraRef = useRef(camera);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile/desktop
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useGSAP(() => {
    const cam = cameraRef.current;

    // Camera position animation for sections 3-6 (Earth & Moon visible)
    gsap.to(cam.position, {
      scrollTrigger: {
        trigger: "#section3",
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
        onEnter: () => {
          // Animate to Earth viewing position
          gsap.to(cam.position, {
            x: 0,
            y: -150,
            z: isMobile ? 7 : 5,
            duration: 1,
            ease: "power2.inOut",
          });
        },
        onLeave: () => {
          // Transition to next scene
          gsap.to(cam.position, {
            x: 0,
            y: -350,
            z: isMobile ? 7 : 5,
            duration: 1,
            ease: "power2.inOut",
          });
        },
        onEnterBack: () => {
          // Animate back to Earth position
          gsap.to(cam.position, {
            x: 0,
            y: -150,
            z: isMobile ? 7 : 5,
            duration: 1,
            ease: "power2.inOut",
          });
        },
      },
    });

    // Camera lookAt animation - focused on Earth & Moon
    gsap.to(
      {},
      {
        scrollTrigger: {
          trigger: "#section3",
          start: "top center",
          end: "bottom center",
          scrub: 1,
          onUpdate: () => {
            cam.lookAt(0, -150, 0);
          },
        },
      }
    );

    // Optional: Add subtle horizontal orbit
    gsap.to(cam.position, {
      x: 1.5,
      scrollTrigger: {
        trigger: "#section3",
        start: "top center",
        end: "bottom center",
        scrub: 2,
      },
    });

    // Hold camera position for sections 4-6
    gsap.to(cam.position, {
      y: -150,
      scrollTrigger: {
        trigger: "#section4",
        start: "top center",
        end: "bottom center",
        scrub: 1,
      },
    });

    gsap.to(cam.position, {
      y: -150,
      scrollTrigger: {
        trigger: "#section5",
        start: "top center",
        end: "bottom center",
        scrub: 1,
      },
    });

    gsap.to(cam.position, {
      y: -150,
      scrollTrigger: {
        trigger: "#section6",
        start: "top center",
        end: "bottom center",
        scrub: 1,
      },
    });
  }, [isMobile, gl, scene]);

  return null;
}

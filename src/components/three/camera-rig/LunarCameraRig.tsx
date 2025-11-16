"use client";

import { useRef, useState, useEffect } from "react";
import { useThree } from "@react-three/fiber";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * LunarCameraRig - Dedicated camera controller for the lunar landscape scene
 * Provides dramatic entrance and subtle tracking movements
 */
export default function LunarCameraRig() {
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

    // Camera position animation for section 7+
    gsap.to(cam.position, {
      scrollTrigger: {
        trigger: "#section7",
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
        onEnter: () => {
          // Animate to lunar viewing position
          gsap.to(cam.position, {
            x: 0,
            y: -350,
            z: isMobile ? 7 : 5,
            duration: 1.5,
            ease: "power2.inOut",
          });
        },
        onEnterBack: () => {
          // Animate back to lunar position
          gsap.to(cam.position, {
            x: 0,
            y: -350,
            z: isMobile ? 7 : 5,
            duration: 1.5,
            ease: "power2.inOut",
          });
        },
      },
    });

    // Camera lookAt animation - focused on lunar landscape
    gsap.to(
      {},
      {
        scrollTrigger: {
          trigger: "#section7",
          start: "top center",
          end: "bottom center",
          scrub: 1,
          onUpdate: () => {
            cam.lookAt(0, -350, 0);
          },
        },
      }
    );

    // Subtle camera drift for cinematic feel
    gsap.to(cam.position, {
      x: -1,
      scrollTrigger: {
        trigger: "#section7",
        start: "top center",
        end: "bottom center",
        scrub: 3,
      },
    });

    // Hold camera position for sections 8-12
    gsap.to(cam.position, {
      y: -350,
      scrollTrigger: {
        trigger: "#section8",
        start: "top center",
        end: "bottom center",
        scrub: 1,
      },
    });

    gsap.to(cam.position, {
      y: -350,
      scrollTrigger: {
        trigger: "#section9",
        start: "top center",
        end: "bottom center",
        scrub: 1,
      },
    });

    gsap.to(cam.position, {
      y: -350,
      scrollTrigger: {
        trigger: "#section10",
        start: "top center",
        end: "bottom center",
        scrub: 1,
      },
    });

    gsap.to(cam.position, {
      y: -350,
      scrollTrigger: {
        trigger: "#section11",
        start: "top center",
        end: "bottom center",
        scrub: 1,
      },
    });

    gsap.to(cam.position, {
      y: -350,
      scrollTrigger: {
        trigger: "#section12",
        start: "top center",
        end: "bottom center",
        scrub: 1,
      },
    });
  }, [isMobile, gl, scene]);

  return null;
}

"use client";

import { useRef, useEffect, useState } from "react";
import { useThree } from "@react-three/fiber";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * IcebergCameraRig - Dedicated camera controller for the iceberg scene on section2
 * Independent from main ScrollCameraRig for isolated animation control
 */
export default function IcebergCameraRig() {
  const { camera } = useThree();
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

    // Camera position animation for section2
    gsap.to(cam.position, {
      scrollTrigger: {
        trigger: "#section2",
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
        onEnter: () => {
          // Animate to iceberg viewing position
          gsap.to(cam.position, {
            x: 0,
            y: -100,
            z: isMobile ? 15 : 10,
            duration: 1,
            ease: "power2.inOut",
          });
        },
        onLeave: () => {
          // Animate back to default position
          gsap.to(cam.position, {
            x: 0,
            y: -150,
            z: isMobile ? 7 : 5,
            duration: 1,
            ease: "power2.inOut",
          });
        },
        onEnterBack: () => {
          // Animate back to iceberg position
          gsap.to(cam.position, {
            x: 0,
            y: -100,
            z: isMobile ? 15 : 10,
            duration: 1,
            ease: "power2.inOut",
          });
        },
      },
    });

    // Camera lookAt animation for section2
    gsap.to(
      {},
      {
        scrollTrigger: {
          trigger: "#section2",
          start: "top center",
          end: "bottom center",
          scrub: 1,
          onUpdate: () => {
            cam.lookAt(0, -100, 0);
          },
        },
      }
    );

    // Optional: Add camera rotation/orbit animation
    gsap.to(cam.position, {
      x: 2,
      scrollTrigger: {
        trigger: "#section2",
        start: "top center",
        end: "bottom center",
        scrub: 2,
      },
    });

  }, [isMobile]);

  return null;
}

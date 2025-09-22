"use client";
import { useRef, useEffect } from "react";
import { useThree } from "@react-three/fiber";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function CameraRig() {
  const { camera } = useThree();
  const tl = useRef<gsap.core.Timeline>(null);

  useEffect(() => {
    tl.current = gsap.timeline({
      scrollTrigger: {
        trigger: document.body,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
      },
    });

    // Example camera animations
    tl.current.to(camera.position, { x: 2, y: 1, z: 6, duration: 1 }, 0);
    tl.current.to(camera.rotation, { y: Math.PI / 6, duration: 1 }, 0);

    return () => {
      tl.current?.kill();
    };
  }, [camera]);

  return null;
}

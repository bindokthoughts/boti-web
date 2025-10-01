"use client";
import { useRef, useEffect } from "react";
import { useThree } from "@react-three/fiber";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ContactShadows } from "@react-three/drei";

gsap.registerPlugin(ScrollTrigger);

export default function CameraRig() {
  // const { camera } = useThree();
  // const tl = useRef<gsap.core.Timeline>(null);

  // useEffect(() => {
  //   tl.current = gsap.timeline({
  //     scrollTrigger: {
  //       trigger: document.body,
  //       start: "top top",
  //       end: "bottom bottom",
  //       scrub: true,
  //     },
  //   });

  //   // Example camera animations
  //   tl.current.to(camera.position, { x: 2, y: 1, z: 6, duration: 1 }, 2);
  //   tl.current.to(camera.rotation, { y: Math.PI / 6, duration: 1 }, 0);

  //   return () => {
  //     tl.current?.kill();
  //   };
  // }, [camera]);


  useEffect(() => {
  const text_1 = document.getElementById("text_1");
  const text_2 = document.getElementById("text_2");
  const text_3 = document.getElementById("text_3");

  if (!text_1 || !text_2 || !text_3) return;

  // Timeline 1: Hide text_1 on scroll past hero
  gsap
    .timeline({
      scrollTrigger: {
        trigger: "#hero",
        start: "top top",
        end: "10% bottom",
        scrub: true,
      },
    })
    .to(text_1, { opacity: 0, ease: "power2.inOut" });

  // Timeline 2: Show text_2 on reaching section_2
  gsap
    .timeline({
      scrollTrigger: {
        trigger: "#section_2",
        start: "top 50%",
        end: "top top",
        scrub: true,
      },
    })
    .to(text_2, { opacity: 1, ease: "power2.inOut" });

  // Timeline 3: Show text_3 on reaching section_3 (sync with text_2)
  gsap
    .timeline({
      scrollTrigger: {
        trigger: "#section_3",
        start: "top 50%",
        end: "top top",
        scrub: true,
      },
    })
    .to(text_3, { opacity: 1, ease: "power2.inOut" }, "<");

  // Cleanup on unmount (important!)
  return () => {
    ScrollTrigger.getAll().forEach((st) => st.kill());
  };
}, []);

  return null;
}

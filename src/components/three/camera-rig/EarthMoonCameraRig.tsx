"use client";
import { useRef } from "react";
import { useThree } from "@react-three/fiber";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ContactShadows } from "@react-three/drei";
import { useGSAP } from "@gsap/react";


gsap.registerPlugin(ScrollTrigger);

export default function EarthMoonCameraRig() {
  useGSAP(() => {
    const text_1 = document.getElementById("text_1");
    const text_2 = document.getElementById("text_2");
    const text_3 = document.getElementById("text_3");

    if (!text_1 || !text_2 || !text_3) return;

    // Timeline 1: Hide text_1 on scroll past hero
    gsap
      .timeline({
        scrollTrigger: {
          trigger: "#section3",
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
          trigger: "#section4",
          start: "top 50%",
          end: "top top",
          scrub: true,
        },
      })
      .to(text_2, { opacity: 1, ease: "power2.inOut" });

    // Timeline 3: Show text_3 on reaching section_3 (sync with text_2)
    

    // Cleanup is handled automatically by useGSAP
  }, []);

  return null;
}

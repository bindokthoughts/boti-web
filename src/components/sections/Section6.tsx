"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import LogoTypo from "../../assets/images/Logo_Typo.svg"
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export default function Section6() {
  const sectionRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLImageElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top center",
        end: "bottom center",
        scrub: 1
      }
    });

    tl.from([logoRef.current, textRef.current], {
      opacity: 0,
      y: 50,
      scale: 0.8,
      duration: 1,
      stagger: 0.3
    });
  });

  return (
    <section 
      ref={sectionRef}
      id="section6" 
      className="h-screen relative flex flex-col gap-4 items-center justify-center bg-gradient-to-b from-black to-gray-900"
    >
      <Image 
        ref={logoRef}
        src={LogoTypo}
        alt="BOTI Logo"
        className="max-w-sm"
      />
      <h6 
        ref={textRef}
        className="text-xl font-bold text-white"
      >
        It&apos;s pronounced BODHI
      </h6>
    </section>
  );
}
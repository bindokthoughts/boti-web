"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import SpatialTypography from "@/components/atoms/SpatialTypography";
import SectionDelineator from "@/components/molecules/SectionDelineator";
import TextReveal from "@/components/atoms/TextReveal";

gsap.registerPlugin(ScrollTrigger);

export default function Section3() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current || !sectionRef.current) return;
    gsap.fromTo(
      containerRef.current,
      { autoAlpha: 0, scale: 0.9 },
      {
        autoAlpha: 1,
        scale: 1,
        duration: 2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          toggleActions: "play none none reverse",
        },
      }
    );
  }, []);

  return (
    <section
      ref={sectionRef}
      id="section3"
      className="min-h-screen relative flex items-center justify-start text-white overflow-hidden bg-transparent pointer-events-none"
    >
      <div 
        ref={containerRef}
        className="px-8 md:px-24 w-full md:w-1/2 flex flex-col pointer-events-auto"
      >
        <SpatialTypography as="span" variant="accent" className="mb-4">
          Spatial Mechanics
        </SpatialTypography>
        
        <TextReveal 
          text="DOWN IS IN. SCROLL IS DEPTH." 
          as="h1" 
          className="text-fluid-h1 font-black mb-8 leading-[0.9]"
          wordStagger={0.1}
          duration={2}
          scrollTriggerStart="top bottom"
        />
        
        <div className="w-24 h-[1px] bg-white/20 mb-8" />

        <SpatialTypography as="p" variant="body" className="max-w-md text-white/50">
          We rebuilt navigation. Conventional pages stack; BOTI tunnels backwards, propelling you straight into the content core.
        </SpatialTypography>
      </div>

      <SectionDelineator number="03" label="DEPTH" />
    </section>
  );
}

"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import SpatialTypography from "@/components/atoms/SpatialTypography";
import SectionDelineator from "@/components/molecules/SectionDelineator";
import TextReveal from "@/components/atoms/TextReveal";

gsap.registerPlugin(ScrollTrigger);

export default function Section8() {
  const sectionRef = useRef<HTMLElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!sectionRef.current || !textContainerRef.current) return;
    gsap.fromTo(
      textContainerRef.current,
      { autoAlpha: 0, rotateX: 45, scale: 0.9 },
      {
        autoAlpha: 1,
        rotateX: 0,
        scale: 1,
        duration: 2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          end: "bottom center",
          scrub: 1,
        }
      }
    );
  }, []);

  return (
    <section ref={sectionRef} id="section8" className="min-h-screen relative flex items-center justify-center bg-transparent pointer-events-none">
      <SectionDelineator number="07" label="PRESENCE" />

      <div ref={textContainerRef} className="text-center px-6" style={{ perspective: "1000px" }}>
        <SpatialTypography variant="accent" className="mb-4 text-center block">
          A Paradigm Shift
        </SpatialTypography>
        <TextReveal text="IMAGINE A" as="h1" className="text-fluid-h1 text-gray-600 block text-center" />
        <TextReveal text="SHOPPABLE" as="h1" className="text-fluid-h1 text-white block text-center font-black" delay={0.2} />
        <TextReveal text="UNIVERSE" as="h1" className="text-fluid-h1 text-gray-400 block text-center italic font-light" delay={0.4} />
      </div>
    </section>
  );
}

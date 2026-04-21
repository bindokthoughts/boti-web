"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import GlassPanel from "@/components/atoms/GlassPanel";
import SpatialTypography from "@/components/atoms/SpatialTypography";
import SectionDelineator from "@/components/molecules/SectionDelineator";
import TextReveal from "@/components/atoms/TextReveal";

gsap.registerPlugin(ScrollTrigger);

export default function Section2() {
  const sectionRef = useRef<HTMLElement>(null);
  const glassRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!glassRef.current || !sectionRef.current) return;
    gsap.fromTo(
      glassRef.current,
      {
        autoAlpha: 0,
        x: 100,
      },
      {
        autoAlpha: 1,
        x: 0,
        duration: 2,
        ease: "expo.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
          toggleActions: "play none none reverse",
        },
      }
    );
  }, []);

  return (
    <section
      ref={sectionRef}
      id="section2"
      className="min-h-screen relative flex items-center justify-end text-text-primary overflow-hidden bg-transparent pointer-events-none"
    >
      <div className="w-full md:w-1/2 flex flex-col justify-center px-8 md:px-24 pointer-events-auto">
        <TextReveal 
          text="NOW THE BROWSER FOLLOWS." 
          as="h2" 
          className="text-fluid-h1 font-black text-white tracking-tighter uppercase mb-8" 
          duration={1.5}
          scrollTriggerStart="top bottom"
        />
        
        <GlassPanel
          ref={glassRef}
          intensity="light"
          className="p-8 md:p-12 w-full max-w-xl"
        >
          <SpatialTypography
            as="p"
            variant="body"
          >
            Breaking free from two-dimensional constraints. The spatial timeline isn’t constrained by a flat monitor—it expands continuously downwards and inwards.
          </SpatialTypography>
        </GlassPanel>
      </div>

      <SectionDelineator number="02" label="CONTINUITY" />
    </section>
  );
}
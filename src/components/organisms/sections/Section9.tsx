"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import SpatialTypography from "@/components/atoms/SpatialTypography";
import SectionDelineator from "@/components/molecules/SectionDelineator";
import TextReveal from "@/components/atoms/TextReveal";

gsap.registerPlugin(ScrollTrigger);

export default function Section9() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!sectionRef.current || !contentRef.current) return;
    gsap.fromTo(
      contentRef.current,
      { autoAlpha: 0, scale: 1.1, filter: "blur(20px)" },
      {
        autoAlpha: 1,
        scale: 1,
        filter: "blur(0px)",
        duration: 2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
          end: "center center",
          scrub: 1,
        }
      }
    );
  }, []);

  return (
    <section ref={sectionRef} id="section9" className="min-h-screen relative flex items-center justify-center pointer-events-none px-6">
      <SectionDelineator number="08" label="COMMERCE" />

      <div ref={contentRef} className="max-w-4xl text-center pointer-events-auto">
        <SpatialTypography variant="accent" className="mb-4">E-Commerce Evolution</SpatialTypography>
        <TextReveal text="IT'S NOT JUST BROWSING." as="h2" className="text-fluid-h2 font-black text-white" />
        <TextReveal text="IT'S VISITING." as="h2" className="text-fluid-h2 font-light text-white italic mt-2" delay={0.5} />
      </div>
    </section>
  );
}

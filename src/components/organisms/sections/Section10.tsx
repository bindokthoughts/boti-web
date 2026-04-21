"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import SpatialTypography from "@/components/atoms/SpatialTypography";
import SectionDelineator from "@/components/molecules/SectionDelineator";

gsap.registerPlugin(ScrollTrigger);

export default function Section10() {
  const sectionRef = useRef<HTMLElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!sectionRef.current || !textContainerRef.current) return;
    gsap.fromTo(
      textContainerRef.current,
      { autoAlpha: 0, y: 100 },
      {
        autoAlpha: 1,
        y: 0,
        duration: 1.5,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          toggleActions: "play none none reverse",
        }
      }
    );
  }, []);

  return (
    <section ref={sectionRef} id="section10" className="h-screen relative flex flex-col items-center justify-center px-8 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 z-0">
        <video autoPlay muted loop playsInline className="w-full h-full object-cover opacity-20 grayscale">
          <source src="/videos/shoes.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      </div>

      <SectionDelineator number="09" label="UNFOLDING" />

      <div ref={textContainerRef} className="relative z-10 text-center pointer-events-auto">
        <SpatialTypography as="h2" variant="h1" className="block text-white font-black">
          THE WEB
        </SpatialTypography>
        <SpatialTypography as="h2" variant="h1" className="block text-gray-500 font-light">
          STOPS SCROLLING.
        </SpatialTypography>
        <SpatialTypography as="h2" variant="h2" className="block text-white mt-8 tracking-widest uppercase">
          BOTI Starts Unfolding.
        </SpatialTypography>
      </div>
    </section>
  );
}

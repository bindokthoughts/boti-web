"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import SpatialTypography from "@/components/atoms/SpatialTypography";
import SectionDelineator from "@/components/molecules/SectionDelineator";

gsap.registerPlugin(ScrollTrigger);

export default function Section11() {
  const sectionRef = useRef<HTMLElement>(null);
  const videosRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!sectionRef.current || !videosRef.current) return;
    gsap.fromTo(
      videosRef.current,
      { autoAlpha: 0, scale: 1.1 },
      {
        autoAlpha: 1,
        scale: 1,
        duration: 1.5,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 50%",
        }
      }
    );
  }, []);

  return (
    <section ref={sectionRef} id="section11" className="min-h-screen relative flex flex-col items-center justify-center px-8 py-20 pointer-events-none">
      <SectionDelineator number="10" label="MOTION" />

      <div className="flex flex-col lg:flex-row items-center justify-between gap-16 max-w-7xl mx-auto w-full pointer-events-auto">
        <div className="flex flex-col gap-8 w-full lg:w-1/2">
          <SpatialTypography variant="accent">Websites become walk-able</SpatialTypography>
          <SpatialTypography as="h2" variant="h1" className="leading-[0.9]">
            BOTI IN<br/>
            <span className="text-gray-500 font-light">MOTION</span>
          </SpatialTypography>
          <SpatialTypography variant="body" className="max-w-md">
            The web doesn&apos;t load. It arrives. Discover a frictionless transition from digital flatness to volumetric reality. 
          </SpatialTypography>
        </div>

        <div ref={videosRef} className="w-full lg:w-1/2 grid grid-cols-2 gap-4">
          <video autoPlay loop muted playsInline className="w-full h-64 object-cover opacity-60 hover:opacity-100 transition-opacity grayscale hover:grayscale-0 rounded-sm">
            <source src="/videos/the_people_browsing.mp4" type="video/mp4" />
          </video>
          <video autoPlay loop muted playsInline className="w-full h-64 object-cover opacity-60 hover:opacity-100 transition-opacity grayscale hover:grayscale-0 rounded-sm mt-12">
            <source src="/videos/inside_store.mp4" type="video/mp4" />
          </video>
        </div>
      </div>
    </section>
  );
}

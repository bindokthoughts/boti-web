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

export default function Section7() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const statCard1Ref = useRef<HTMLDivElement>(null);
  const statCard2Ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!sectionRef.current || !leftColRef.current || !statCard1Ref.current || !statCard2Ref.current) return;
    // Reveal text
    gsap.fromTo(
      leftColRef.current,
      { autoAlpha: 0, x: -50 },
      {
        autoAlpha: 1,
        x: 0,
        duration: 1.5,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
        }
      }
    );

    // Staggered stat cards
    gsap.fromTo(
      [statCard1Ref.current, statCard2Ref.current],
      { autoAlpha: 0, y: 100, scale: 0.95 },
      {
        autoAlpha: 1,
        y: 0,
        scale: 1,
        duration: 1.5,
        stagger: 0.2,
        ease: "expo.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 50%",
        }
      }
    );
  }, []);

  return (
    <section ref={sectionRef} id="section7" className="min-h-screen relative flex flex-col items-center justify-center pointer-events-none px-6">
      <SectionDelineator number="06" label="IMPACT" />

      <div className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-2 gap-12 pointer-events-auto">
        {/* Left Col Intro */}
        <div ref={leftColRef} className="flex flex-col justify-center">
          <SpatialTypography variant="accent" className="mb-6">The Attention Economy</SpatialTypography>
          <TextReveal text="FLAT WEB IS FAILING." as="h2" className="text-fluid-h2 font-black text-white" />
          <TextReveal text="SPATIAL WEB IS CAPTIVATING." as="h2" className="text-fluid-h2 font-black text-gray-600 mt-2" delay={0.5} />
          
          <SpatialTypography variant="body" className="mt-8 max-w-md">
            When everything is flat, nothing stands out. Engagement drops, attention spans shrink, and the scroll continues endlessly. Spatial breaks the cycle.
          </SpatialTypography>
        </div>

        {/* Right Col Stats */}
        <div className="flex flex-col gap-6 justify-center">
          <GlassPanel ref={statCard1Ref} intensity="medium" className="p-10 border-l border-white/20">
            <SpatialTypography as="h3" variant="h1" className="text-7xl">95%</SpatialTypography>
            <SpatialTypography as="p" variant="body" className="mt-2 text-white/70 uppercase tracking-widest text-sm font-medium">Memory Retention In Spatial VR</SpatialTypography>
          </GlassPanel>

          <GlassPanel ref={statCard2Ref} intensity="light" className="p-10 border-l border-white/10 ml-0 md:ml-12">
            <SpatialTypography as="h3" variant="h1" className="text-7xl text-gray-500">2x</SpatialTypography>
            <SpatialTypography as="p" variant="body" className="mt-2 text-white/50 uppercase tracking-widest text-sm font-medium">Click-Through Rate VS Flat UI</SpatialTypography>
          </GlassPanel>
        </div>
      </div>
    </section>
  );
}

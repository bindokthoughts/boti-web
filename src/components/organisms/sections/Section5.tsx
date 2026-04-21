"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import SpatialTypography from "@/components/atoms/SpatialTypography";
import SectionDelineator from "@/components/molecules/SectionDelineator";

gsap.registerPlugin(ScrollTrigger);

export default function Section5() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftLineRef = useRef<HTMLDivElement>(null);
  const title1Ref = useRef<HTMLHeadingElement>(null);
  const title2Ref = useRef<HTMLHeadingElement>(null);
  const title3Ref = useRef<HTMLHeadingElement>(null);

  useGSAP(() => {
    if (!sectionRef.current || !leftLineRef.current || !title1Ref.current || !title2Ref.current || !title3Ref.current) return;
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 60%",
        end: "center center",
        scrub: 1.5,
      }
    });

    tl.fromTo(leftLineRef.current, { height: '0%' }, { height: '100%', ease: "none" })
      .fromTo([title1Ref.current, title2Ref.current, title3Ref.current], 
        { x: -50, autoAlpha: 0, filter: "blur(10px)" }, 
        { x: 0, autoAlpha: 1, filter: "blur(0px)", stagger: 0.2, ease: "power2.out" }, 
        "-=0.5"
      );
  }, []);

  return (
    <section
      ref={sectionRef}
      id="section5"
      className="min-h-screen relative flex items-center justify-center bg-transparent pointer-events-none"
    >
      <div className="relative z-10 w-full max-w-7xl mx-auto px-8 md:px-24 flex items-center gap-12 pointer-events-auto">
        <div className="relative h-[400px] w-[2px] bg-white/5">
          <div ref={leftLineRef} className="absolute top-0 left-0 w-full bg-gradient-to-b from-white to-transparent" />
        </div>
        
        <div className="flex flex-col gap-12">
          <SpatialTypography
            ref={title1Ref}
            as="h2"
            variant="h2"
            className="text-white/20 uppercase"
          >
            NOT A NEW HEADSET.
          </SpatialTypography>
          
          <SpatialTypography
            ref={title2Ref}
            as="h2"
            variant="h2"
            className="text-white/40 uppercase"
          >
            NOT A NEW PLATFORM.
          </SpatialTypography>
          
          <SpatialTypography
            ref={title3Ref}
            as="h2"
            variant="h1"
            className="text-white font-black"
          >
            A NEW STANDARD.
          </SpatialTypography>
        </div>
      </div>

      <SectionDelineator number="04" label="STANDARD" />
    </section>
  );
}

"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import SectionDelineator from "@/components/molecules/SectionDelineator";
import TextReveal from "@/components/atoms/TextReveal";

gsap.registerPlugin(ScrollTrigger);

export default function Section6() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRefs = useRef<(HTMLDivElement | null)[]>([]);
  const videoContainerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!sectionRef.current || !videoContainerRef.current) return;
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top center",
        end: "bottom center",
        scrub: 1.5,
        pin: false
      }
    });

    textRefs.current.forEach((text, index) => {
      if (text) {
        tl.from(text, {
          autoAlpha: 0,
          y: 40,
          duration: 1,
          ease: "power2.out"
        }, `-=${0.8 - (index * 0.1)}`);
      }
    });
  });

  const addToTextRefs = (el: HTMLDivElement | null, index: number) => {
    if (el) textRefs.current[index] = el;
  };

  return (
    <section
      ref={sectionRef}
      id="section6"
      className="md:min-h-screen relative flex flex-col items-center justify-center px-8 py-20 pointer-events-none"
    >
      <SectionDelineator number="05" label="MISSION" />

      <div className="flex flex-col md:flex-row w-full max-w-7xl mx-auto gap-16 items-center relative z-10 pointer-events-auto">
        <div className="flex flex-col gap-6 w-full md:w-1/2">
          <TextReveal 
            text="WHY BOTI?" 
            as="h2" 
            className="text-fluid-h2 font-black mb-4"
          />

          <div
            ref={(el) => addToTextRefs(el, 0)}
            className="text-xl font-light text-gray-400"
          >
            BOTI is the first browser built for the spatial internet.
          </div>

          <div
            ref={(el) => addToTextRefs(el, 1)}
            className="text-2xl font-medium text-white tracking-wide"
          >
            It doesn&apos;t open tabs. It opens places.
          </div>

          <div
            ref={(el) => addToTextRefs(el, 2)}
            className="text-xl font-light text-gray-400 mt-4"
          >
            BOTI doesn&apos;t load the internet.
          </div>
          <div
            ref={(el) => addToTextRefs(el, 3)}
            className="text-fluid-h2 font-black text-white"
          >
            It unfolds it.
          </div>
        </div>

        <div className="w-full md:w-1/2 flex justify-center mt-10 md:mt-0">
          <div 
            ref={videoContainerRef}
            className="w-[300px] h-[350px] md:w-[450px] md:h-[500px] relative transition-transform duration-700 hover:scale-[1.02]"
          >
            <div
              className="absolute inset-0 overflow-hidden bg-black/50 border border-white/5"
              style={{
                clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
              }}
            >
              <video
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover opacity-60 grayscale hover:grayscale-0 transition-all duration-1000"
              >
                <source src="/videos/shelf_pan.mp4" type="video/mp4" />
              </video>
            </div>
            {/* Minimal Hexagon Border */}
            <div
              className="absolute inset-0 z-20 pointer-events-none"
              style={{
                clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                boxShadow: 'inset 0 0 1px rgba(255,255,255,0.2)',
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ContactUs() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);

  useLayoutEffect(() => {
    if (typeof window !== "undefined") {
      const ctx = gsap.context(() => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top center",
            end: "bottom center",
            scrub: 1,
            pin: false
          }
        });

        // Animate title with glitch effect
        if (titleRef.current) {
          tl.fromTo(titleRef.current,
            {
              opacity: 0,
              y: 50,
              skewX: 10
            },
            {
              opacity: 1,
              y: 0,
              skewX: 0,
              duration: 1.5,
              ease: "power2.out"
            }
          );

          // Add glitch animation
          gsap.to(titleRef.current, {
            x: "+=3",
            duration: 0.1,
            repeat: 3,
            yoyo: true,
            delay: 1,
            ease: "power2.inOut"
          });
        }

        // Animate description with typewriter effect
        if (descriptionRef.current) {
          tl.fromTo(descriptionRef.current,
            {
              opacity: 0,
              clipPath: "polygon(0 0, 0 0, 0 100%, 0% 100%)"
            },
            {
              opacity: 1,
              clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)",
              duration: 2,
              ease: "power2.inOut"
            },
            "-=1"
          );
        }
      }, sectionRef);

      return () => ctx.revert();
    }
  }, []);

  return (
    <section 
      ref={sectionRef}
      id="contact-us" 
      className="h-screen relative flex flex-col items-center justify-center bg-gradient-to-b from-gray-900 to-black px-8"
    >
      <div className="flex flex-col items-center gap-12 max-w-4xl text-center">
        <h1 
          ref={titleRef}
          className="text-white text-6xl font-black"
        >
          Contact Us Form
        </h1>
        
        <p 
          ref={descriptionRef}
          className="text-gray-300 text-2xl font-medium leading-relaxed"
        >
          Scroll-driven 3D animations powered by Three.js, R3F, and GSAP.
        </p>
        
        {/* Placeholder for actual contact form */}
        <div className="w-full max-w-md bg-gray-800/30 rounded-lg p-8 backdrop-blur-sm">
          <div className="text-gray-400 text-center">
            Contact form components will be implemented here
          </div>
        </div>
      </div>
    </section>
  );
}
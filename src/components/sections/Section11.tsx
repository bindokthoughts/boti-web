"use client";

import { useLayoutEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Section11() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRefs = useRef<(HTMLDivElement | null)[]>([]);
  const descriptionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const videoContainerRef2 = useRef<HTMLDivElement>(null);
  const videoContainerRef3 = useRef<HTMLDivElement>(null);

  // Hexagonal video animation on load
  useGSAP(() => {
    const containers = [videoContainerRef, videoContainerRef2, videoContainerRef3];
    
    containers.forEach((container, index) => {
      if (container.current) {
        gsap.fromTo(
          container.current,
          {
            scale: 0,
            rotation: 180,
            opacity: 0,
          },
          {
            scale: 1,
            rotation: 0,
            opacity: 1,
            duration: 1.5,
            delay: index * 0.2,
            ease: "elastic.out(1, 0.5)",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%",
              toggleActions: "play none none none"
            }
          }
        );
      }
    });
  }, { scope: sectionRef });

  useLayoutEffect(() => {
    if (typeof window !== "undefined") {
      const ctx = gsap.context(() => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top center",
            end: "bottom center",
            scrub: 2,
            pin: false
          }
        });

        // Animate title sections with morphing effect
        titleRefs.current.forEach((title, index) => {
          if (title) {
            tl.fromTo(title,
              {
                opacity: 0,
                scale: 0.5,
                rotationX: 180,
                transformOrigin: "center center"
              },
              {
                opacity: 1,
                scale: 1,
                rotationX: 0,
                duration: 1.5,
                ease: "power2.inOut"
              },
              index * 0.3
            );
          }
        });

        // Animate description items with wave effect
        descriptionRefs.current.forEach((desc, index) => {
          if (desc) {
            tl.fromTo(desc,
              {
                opacity: 0,
                y: 30,
                skewY: 5
              },
              {
                opacity: 1,
                y: 0,
                skewY: 0,
                duration: 1,
                ease: "power3.out"
              },
              `-=${1 - (index * 0.1)}`
            );
          }
        });
      }, sectionRef);

      return () => ctx.revert();
    }
  }, []);

  const addToTitleRefs = (el: HTMLDivElement | null, index: number) => {
    if (el) titleRefs.current[index] = el;
  };

  const addToDescRefs = (el: HTMLDivElement | null, index: number) => {
    if (el) descriptionRefs.current[index] = el;
  };

  return (
    <section 
      ref={sectionRef}
      id="section11" 
      className="h-screen relative flex flex-col items-center justify-center px-8"
      style={{
        background: "linear-gradient(135deg, #3B4D91 0%, #3FE7F9 100%)"
      }}
    >
      <div className="absolute inset-0 z-0 animate-pulse-slow bg-gradient-radial-turquoise-5" />
      
      <div className="flex flex-col lg:flex-row items-center justify-center gap-12 max-w-7xl mx-auto relative z-10 px-4">
        {/* Text Content - Left Side */}
        <div className="bg-surface/40 inline-flex flex-col justify-center items-center gap-8 p-8 rounded-lg backdrop-blur-sm border border-border lg:order-1 order-2">
          <div 
            ref={(el) => addToTitleRefs(el, 0)}
            className="text-center text-xl font-medium leading-[50px] text-glow-highlight-light"
          >
            You don&apos;t scroll through BOTI.
          </div>
          
          <div 
            ref={(el) => addToTitleRefs(el, 1)}
            className="text-center text-4xl font-black leading-[50px] text-gradient-turquoise-1"
          >
            You step inside.
          </div>
          
          <div className="flex flex-col gap-4 text-center">
            <div 
              ref={(el) => addToDescRefs(el, 0)}
              className="text-xl font-medium leading-[50px] text-glow-turquoise-light"
            >
              Every click becomes a step.
            </div>
            
            <div 
              ref={(el) => addToDescRefs(el, 1)}
              className="text-xl font-medium leading-[50px] text-glow-highlight-light"
            >
              Every brand becomes a place.
            </div>
            
            <div 
              ref={(el) => addToDescRefs(el, 2)}
              className="text-xl font-medium leading-[50px] text-glow-turquoise-light"
            >
              Every visit becomes a memory
            </div>
          </div>
        </div>

        {/* Honeycomb Video Pattern - Right Side */}
        <div className="relative lg:order-2 order-1" style={{ width: '500px', height: '500px' }}>
          {/* Top Hexagon */}
          <div 
            ref={videoContainerRef}
            className="absolute"
            style={{
              width: '200px',
              height: '200px',
              left: '150px',
              top: '0px',
            }}
          >
            <div
              className="absolute inset-0 overflow-hidden"
              style={{
                clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
              }}
            >
              <video
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
              >
                <source src="/videos/the_people_browsing.mp4" type="video/mp4" />
              </video>
            </div>
            <div
              className="absolute inset-0 bg-gradient-to-r from-primary-accent via-highlight to-primary-accent opacity-50 blur-md"
              style={{
                clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                transform: 'scale(1.05)',
              }}
            />
          </div>

          {/* Bottom Left Hexagon */}
          <div 
            ref={videoContainerRef2}
            className="absolute"
            style={{
              width: '200px',
              height: '200px',
              left: '50px',
              top: '150px',
            }}
          >
            <div
              className="absolute inset-0 overflow-hidden"
              style={{
                clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
              }}
            >
              <video
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
              >
                <source src="/videos/the_people_browsing.mp4" type="video/mp4" />
              </video>
            </div>
            <div
              className="absolute inset-0 bg-gradient-to-r from-primary-accent via-highlight to-primary-accent opacity-50 blur-md"
              style={{
                clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                transform: 'scale(1.05)',
              }}
            />
          </div>

          {/* Bottom Right Hexagon */}
          <div 
            ref={videoContainerRef3}
            className="absolute"
            style={{
              width: '200px',
              height: '200px',
              left: '250px',
              top: '150px',
            }}
          >
            <div
              className="absolute inset-0 overflow-hidden"
              style={{
                clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
              }}
            >
              <video
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
              >
                <source src="/videos/the_people_browsing.mp4" type="video/mp4" />
              </video>
            </div>
            <div
              className="absolute inset-0 bg-gradient-to-r from-primary-accent via-highlight to-primary-accent opacity-50 blur-md"
              style={{
                clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                transform: 'scale(1.05)',
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}


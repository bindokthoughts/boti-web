"use client";

import { useRef } from "react";
import Image from "next/image";
import monogram from "../../assets/images/Logo_Monogram.svg";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, ContactShadows } from "@react-three/drei";
import { Suspense } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import LogoMonogram from "../three/objects/LogoMonogram";

gsap.registerPlugin(ScrollTrigger);

export default function Section5() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Create timeline for this section
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top center",
        end: "bottom center",
        scrub: 1,
        onUpdate: (self) => {
          // Rotate canvas based on scroll progress
          if (canvasRef.current) {
            gsap.set(canvasRef.current, {
              rotationY: self.progress * 360,
            });
          }
        },
      },
    });

    // Animate title: use from (start state) to allow timeline to define the end
    tl.from(titleRef.current, {
      opacity: 0,
      y: 100,
      duration: 1,
    });

    // Animate canvas container: use from so it animates into place
    tl.from(
      canvasRef.current,
      {
        scale: 0.5,
        opacity: 0,
        duration: 1.5,
      },
      "-=0.5"
    );
  }, { scope: sectionRef });

  return (
    <section 
      ref={sectionRef}
      id="section5" 
      className="min-h-screen relative flex items-center justify-center text-gray-200"
    >
      <div className="flex flex-col items-center gap-8">
        <h1 
          ref={titleRef}
          className="text-6xl font-bold"
        >
          Section 5
        </h1>
        {/* <Image src={monogram} alt="BOTI Monogram" className="w-16 h-16" /> */}
        <div ref={canvasRef} className="w-80 h-80">
          <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
            <Suspense fallback={null}>
              <LogoMonogram 
                scale={[1, 1, 1]} 
                position={[0, 0, 0]} 
                rotation={[0, 0, Math.PI / 4]} 
              />
              <ContactShadows 
                position={[0, -1, 0]} 
                opacity={0.5} 
                scale={10} 
                blur={2} 
                far={3} 
              />
              <Environment preset="city" />
              <OrbitControls enableZoom={false} />
            </Suspense>
          </Canvas>
        </div>
      </div>
    </section>
  );
}
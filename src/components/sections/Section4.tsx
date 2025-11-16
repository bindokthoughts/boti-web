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

export default function Section4() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Enhanced glow pulse
    gsap.to(glowRef.current, {
      scale: 1.2,
      opacity: 0.4,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    // Create timeline for this section
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top center",
        end: "bottom center",
        scrub: 1,
      },
    });

    // Animate title
    tl.from(titleRef.current, {
      opacity: 0,
      y: 100,
      scale: 0.9,
      duration: 1,
    });

    // Animate canvas container
    tl.from(
      canvasRef.current,
      {
        scale: 0.5,
        opacity: 0,
        rotationY: -180,
        duration: 1.5,
      },
      "-=0.5"
    );
  }, { scope: sectionRef });

  return (
    <section 
      ref={sectionRef}
      id="section4" 
      className="min-h-screen relative flex items-center justify-center text-text-primary overflow-hidden"
      style={{
        background: "var(--gradient-section-alt)",
      }}
    >
      {/* Animated glow */}
      <div
        ref={glowRef}
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          background: "radial-gradient(circle at 50% 50%, #14E3C9 0%, transparent 60%)",
          filter: "blur(100px)",
        }}
      />

      {/* Section Label */}
      <div className="absolute top-4 right-4 text-sm text-blue-200/60 font-mono z-20">
        04 / MONOGRAM
      </div>
      
      <div className="flex flex-col items-center gap-8 relative z-10">
        <h1 
          ref={titleRef}
          className="text-5xl md:text-6xl font-black"
          style={{
            textShadow: "0 0 30px rgba(20,227,201,0.6), 0 5px 20px rgba(0,0,0,0.4)",
            background: "linear-gradient(135deg, #ffffff 0%, #7CF7E4 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          Our Symbol
        </h1>
        <div ref={canvasRef} className="w-80 h-80 rounded-2xl overflow-hidden backdrop-blur-sm bg-white/5 border border-white/10 shadow-2xl">
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
              <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={2} />
            </Suspense>
          </Canvas>
        </div>
      </div>
    </section>
  );
}


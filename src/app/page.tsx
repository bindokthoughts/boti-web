"use client";

import MasterScene from "@/components/three/scene/MasterScene";
import SectionDots from "@/components/navbar/SectionDots";

import ContactUs from "@/components/sections/ContactUs";
import Hero from "@/components/sections/Hero";
import OurFounders from "@/components/sections/OurFounders";
import Section2 from "@/components/sections/Section2";
import Section3 from "@/components/sections/Section3";
import Section4 from "@/components/sections/Section4";
import Section5 from "@/components/sections/Section5";
import Section6 from "@/components/sections/Section6";
import Section7 from "@/components/sections/Section7";
import Section8 from "@/components/sections/Section8";
import Section9 from "@/components/sections/Section9";
import Section10 from "@/components/sections/Section10";
import Section11 from "@/components/sections/Section11";
import Section12 from "@/components/sections/Section12";

export default function Home() {
  return (
    <main className="relative -mt-16 overflow-x-hidden max-w-full">
      {/* Section Navigation Dots */}
      <SectionDots />

      {/* Scroll Sections Overlay - pointer-events-auto to allow interaction */}
      <div className="relative z-10 pointer-events-auto max-w-full">
        <Hero />
        <Section2 />
        <Section3 />
        <Section4 />
        <Section5 />
        <Section6 />
        <Section7 />
        <Section8 />
        <Section9 />
        <Section10 />
        <Section11 />
        <OurFounders />
        <Section12 />
        <ContactUs />
        {/* Master 3D Canvas - Single WebGL context for all scenes */}
      <MasterScene />
      </div>
    </main>
  );
}


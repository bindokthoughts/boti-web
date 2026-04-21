"use client";

import MasterScene from "@/components/three/scene/MasterScene";
import SectionDots from "@/components/navbar/SectionDots";

import ContactUs from "@/components/organisms/sections/ContactUs";
import Hero from "@/components/organisms/sections/Hero";
import OurFounders from "@/components/organisms/sections/OurFounders";
import Section2 from "@/components/organisms/sections/Section2";
import Section3 from "@/components/organisms/sections/Section3";
import Section5 from "@/components/organisms/sections/Section5";
import Section6 from "@/components/organisms/sections/Section6";
import Section7 from "@/components/organisms/sections/Section7";
import Section8 from "@/components/organisms/sections/Section8";
import Section9 from "@/components/organisms/sections/Section9";
import Section10 from "@/components/organisms/sections/Section10";
import Section11 from "@/components/organisms/sections/Section11";
import Section12 from "@/components/organisms/sections/Section12";

export default function Home() {
  return (
    <main className="relative -mt-16 overflow-x-hidden max-w-full">
      {/* Section Navigation Dots */}
      <SectionDots />

      {/* Master 3D Canvas - Single WebGL context for all scenes */}
      <MasterScene />

      {/* Scroll Sections Overlay - pointer-events-none to let scroll hit body, but inner items can be auto */}
      <div className="relative z-10 pointer-events-none max-w-full">
        <Hero />
        <Section2 />
        <Section3 />
        <Section5 />
        <Section6 />
        <Section7 />
        <Section8 />
        <Section9 />
        <Section10 />
        <Section11 />
        <OurFounders />
        <ContactUs />
      </div>
    </main>
  );
}


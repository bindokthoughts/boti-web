"use client";

import Scene from "@/components/three/scene/Scene";

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
import Section13 from "@/components/sections/Section13";

export default function Home() {
  return (
    <main className="relative -mt-16 bg-gradient-to-b from-black to-gray-900">
      {/* Scroll Sections Overlay */}
        <Hero />
        <Section2 />
        <Section3 />
        <Section4 />
        <Section5 />
        <Section6 />
        <Section10 />
        <Section11 />
        <Section12 />
        <Section7 />
        <Section8 />
        <Section9 />
        <OurFounders />
        <Section13 />
        <ContactUs />
     

      {/* 3D Canvas */}
      {/* <Scene /> */}
    </main>
  );
}




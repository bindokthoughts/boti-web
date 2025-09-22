import ThreeScene from "@/components/ThreeScene";
import Image from "next/image";
import ContactUs from "@/components/sections/ContactUs";
import Hero from "@/components/sections/Hero";
import Scene from "@/components/Scene";
import OurFounders from "@/components/sections/OurFounders";
import Section2 from "@/components/sections/Section2";
import Section3 from "@/components/sections/Section3";
import Section4 from "@/components/sections/Section4";
import Section5 from "@/components/sections/Section5";
import Section6 from "@/components/sections/Section6";
import Section7 from "@/components/sections/Section7";

export default function Home() {
  return (
  <main className="relative">
      {/* 3D Canvas */}
      <Scene />

      {/* Scroll Sections Overlay */}
      <div className="relative z-10 text-white">
        <Hero/>
        <Section2/>
        <Section3/>
        <Section4/>
        <Section5/>
        <Section6/>
        <Section7/>
        <ContactUs/>
        <OurFounders/>
        
      </div>
    </main>
  );
}




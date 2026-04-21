"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import ProfileCard from "./ProfileCard";
import SpatialTypography from "@/components/atoms/SpatialTypography";
import SectionDelineator from "@/components/molecules/SectionDelineator";

import DavidImg from "@/assets/images/founders/David_Creighton.jpg";
import ForrestImg from "@/assets/images/founders/Forrester_Kane.jpg";
import AdrianImg from "@/assets/images/founders/Adrian_Lannon.png"

import ASquare from "@/assets/images/partner_logos/A_Square.webp";
import Equilibria from "@/assets/images/Equilibria.png";
import Headward from "@/assets/images/logo-headword.png";

gsap.registerPlugin(ScrollTrigger);

export default function OurFounders() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const founders = [
    {
      name: "David",
      title: "Chief Product Officer",
      description: "Shaping the future of spatial web experiences through intuitive design and user-centric innovation.",
      imageUrl: DavidImg,
      companyImageUrl: Equilibria,
      linkedinUrl: "https://www.linkedin.com/in/david-creighton-5716b9143/",
      fullBio: `Serial Entrepreneur Background in operations, innovation strategy, and venture development.\nNotable Achievements:\n• Leads BOTI's vision, IP & partnership strategy.\n• Supported by an aligned Advisory Board.`
    },
    {
      name: "Adrian Lannon",
      title: "CTO & Co-Founder",
      description: "Shaping the future of spatial web experiences through intuitive design and user-centric innovation.",
      imageUrl: AdrianImg,
      companyImageUrl: ASquare,
      linkedinUrl: "https://www.linkedin.com/in/adrian-lannon-b1b825175/",
      fullBio: `Founder of A Square 10+ years building in Unity, simulation, & real-time systems.\nNotable Achievements:\n• Leads a dedicated full-stack team for BOTI.`
    },
    {
      name: "Forrester Kane",
      title: "Chief Creative Officer",
      description: "Bridging technology and creativity to build immersive digital experiences that inspire and connect.",
      imageUrl: ForrestImg,
      companyImageUrl: Headward,
      linkedinUrl: "https://www.linkedin.com/in/forresterkane/",
      fullBio: `Founder of Headword! Brand & go-to-market leader for frontier tech and creator platforms.\nCareer Highlights:\n• Leads a talented team for BOTI's brand & narrative evolution.`
    }
  ];

  useGSAP(() => {
    if (!sectionRef.current) return;
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 60%",
      }
    });

    cardRefs.current.forEach((card, index) => {
      if (card) {
        tl.fromTo(card,
          { autoAlpha: 0, y: 100 },
          { autoAlpha: 1, y: 0, duration: 1.5, ease: "expo.out" },
          index * 0.15
        );
      }
    });
  }, { scope: sectionRef });

  const addToCardRefs = (el: HTMLDivElement | null, index: number) => {
    if (el) cardRefs.current[index] = el;
  };

  return (
    <section 
      ref={sectionRef}
      id="our-founders" 
      className="min-h-screen py-24 relative flex flex-col items-center justify-center px-6 pointer-events-none"
    >
      <SectionDelineator number="11" label="TEAM" />

      <div className="flex flex-col items-center max-w-7xl mx-auto w-full relative z-10 pointer-events-auto">
        <div className="text-center mb-20 w-full">
          <SpatialTypography variant="accent" className="mb-4 text-center block">
            Visionaries
          </SpatialTypography>
          <SpatialTypography as="h2" variant="h1" className="text-white">
            THE ARCHITECTS.
          </SpatialTypography>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl">
          {founders.map((founder, index) => (
            <div key={founder.name} ref={(el) => addToCardRefs(el, index)}>
              <ProfileCard {...founder} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
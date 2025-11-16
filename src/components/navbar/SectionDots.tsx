"use client"

import { useState, useEffect } from "react";

interface Section {
  id: string;
  label: string;
}

const sections: Section[] = [
  { id: "hero", label: "Home" },
  { id: "section2", label: "Section 2" },
  { id: "section3", label: "Section 3" },
  { id: "section4", label: "Section 4" },
  { id: "section5", label: "Section 5" },
  { id: "section6", label: "Section 6" },
  { id: "section7", label: "Section 7" },
  { id: "section8", label: "Section 8" },
  { id: "section9", label: "Section 9" },
  { id: "section10", label: "Section 10" },
  { id: "section11", label: "Section 11" },
  { id: "section12", label: "Section 12" },
  { id: "our-founders", label: "Our Founders" },
  { id: "contact-us", label: "Contact" },
];

export default function SectionDots() {
  const [activeSection, setActiveSection] = useState<string>("hero");

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i].id);
        if (section) {
          const sectionTop = section.offsetTop;
          if (scrollPosition >= sectionTop) {
            setActiveSection(sections[i].id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="fixed right-4 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-2">
      {sections.map((section) => (
        <button
          key={section.id}
          onClick={() => scrollToSection(section.id)}
          className="group relative flex items-center justify-center"
          aria-label={`Navigate to ${section.label}`}
        >
          {/* Dot */}
          <div
            className={`w-2 h-2 transition-all duration-300 ${
              activeSection === section.id
                ? "bg-white scale-125 shadow-lg shadow-white/50"
                : "bg-white/40 hover:bg-white/60 hover:scale-110"
            }`}
            style={{
              clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)'
            }}
          />
          
          {/* Label tooltip */}
          <span
            className={`absolute right-6 px-3 py-1 rounded-lg text-sm font-medium whitespace-nowrap transition-all duration-300 pointer-events-none ${
              activeSection === section.id
                ? "opacity-0 translate-x-2"
                : "opacity-0 translate-x-2 bg-white/90 text-primary group-hover:opacity-100 group-hover:translate-x-0"
            }`}
            style={{
              backdropFilter: 'blur(10px)'
            }}
          >
            {section.label}
          </span>
        </button>
      ))}
    </div>
  );
}

"use client";

import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import ProfileCard from "./ProfileCard";

import JohanImg from "../../assets/images/founders/johan.jpg";
import DavidImg from "../../assets/images/founders/david.jpg";
import ForrestImg from "../../assets/images/founders/forrest.jpg";

gsap.registerPlugin(ScrollTrigger);

export default function OurFounders() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top center",
        end: "bottom center",
        scrub: 1.5,
        pin: false
      }
    });

    // Animate cards with cascading effect
    cardRefs.current.forEach((card, index) => {
      if (card) {
        tl.fromTo(card,
          {
            opacity: 0,
            scale: 0.7,
            y: 100
          },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 1.5,
            ease: "power2.out"
          },
          index * 0.2
        );
      }
    });
  }, { scope: sectionRef });

  const addToCardRefs = (el: HTMLDivElement | null, index: number) => {
    if (el) cardRefs.current[index] = el;
  };

  const founders = [
    {
      name: "Johan",
      title: "Chief Technology Officer",
      description: "Leading the technical vision and innovation at BOTI, focusing on spatial computing and AI integration.",
      imageUrl: JohanImg,
      linkedinUrl: "https://linkedin.com/in/sarah-johnson",
      fullBio: `Sarah Johnson is a pioneering force in spatial computing and artificial intelligence. With over 15 years of experience in technology leadership, she has been instrumental in developing groundbreaking solutions that bridge the physical and digital worlds.

Prior to founding BOTI, Sarah held senior positions at leading tech companies where she led teams developing cutting-edge AR/VR solutions. She holds multiple patents in spatial computing and has been recognized as one of the top innovators in immersive technologies.

Sarah's vision for BOTI stems from her belief that technology should enhance human connection and creativity, not replace it. Under her technical leadership, BOTI is pushing the boundaries of what's possible in the spatial web.

Education:
• Ph.D. in Computer Science, MIT
• M.S. in Artificial Intelligence, Stanford University
• B.S. in Computer Engineering, UC Berkeley`
    },
    {
      name: "David",
      title: "Chief Product Officer",
      description: "Shaping the future of spatial web experiences through intuitive design and user-centric innovation.",
      imageUrl: DavidImg,
      linkedinUrl: "https://linkedin.com/in/michael-chen",
      fullBio: `Michael Chen is a visionary product leader with a passion for creating intuitive and impactful user experiences. His unique approach combines deep technical knowledge with a profound understanding of human behavior and design principles.

Before co-founding BOTI, Michael was the Head of Product at a leading tech company where he revolutionized their approach to user experience design. His work has been featured in various technology publications and has earned multiple industry awards.

At BOTI, Michael leads the product strategy and design direction, ensuring that our spatial web solutions are not just technologically advanced, but also accessible and delightful to use.

Notable Achievements:
• Winner of the Design Innovation Award 2024
• Featured in "Top 40 Under 40" in Tech
• Regular speaker at major technology conferences`
    },
    {
      name: "Forest",
      title: "Chief Creative Officer",
      description: "Bridging technology and creativity to build immersive digital experiences that inspire and connect.",
      imageUrl: ForrestImg,
      linkedinUrl: "https://linkedin.com/in/Forrest-rodriguez",
      fullBio: `Forrest is a creative technologist and digital artist who has been pushing the boundaries of interactive experiences for over a decade. Her work seamlessly blends art, technology, and human emotion to create meaningful connections in the digital space.

Forrest's background spans both the creative and technical worlds, having worked as a Creative Director for major entertainment companies and led R&D teams in emerging technologies. Her unique perspective helps BOTI create experiences that are not just functional, but deeply engaging and emotionally resonant.

Under her creative leadership, BOTI is redefining what's possible in the spatial web, creating experiences that capture imagination and inspire connection.

Career Highlights:
• Creative Director for award-winning interactive installations
• Published author on the future of digital experiences
• Mentor for emerging artists in technology
• Guest lecturer at prestigious art and technology institutions`
    },{
      name: "Chalinda",
      title: "Chief Product Officer",
      description: "Shaping the future of spatial web experiences through intuitive design and user-centric innovation.",
      imageUrl: DavidImg,
      linkedinUrl: "https://linkedin.com/in/michael-chen",
      fullBio: `Michael Chen is a visionary product leader with a passion for creating intuitive and impactful user experiences. His unique approach combines deep technical knowledge with a profound understanding of human behavior and design principles.

Before co-founding BOTI, Michael was the Head of Product at a leading tech company where he revolutionized their approach to user experience design. His work has been featured in various technology publications and has earned multiple industry awards.

At BOTI, Michael leads the product strategy and design direction, ensuring that our spatial web solutions are not just technologically advanced, but also accessible and delightful to use.

Notable Achievements:
• Winner of the Design Innovation Award 2024
• Featured in "Top 40 Under 40" in Tech
• Regular speaker at major technology conferences`
    }
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);
  const slideWidth = 380; // Width of ProfileCard
  const slidesToShow = founders.length > 3 ? 3 : founders.length;
  const totalSlides = founders.length;
  const maxSlide = totalSlides - slidesToShow;

  const nextSlide = () => {
    setCurrentSlide(prev => Math.min(prev + 1, maxSlide));
  };

  const prevSlide = () => {
    setCurrentSlide(prev => Math.max(prev - 1, 0));
  };

  useEffect(() => {
    if (sliderRef.current) {
      gsap.to(sliderRef.current, {
        x: -currentSlide * slideWidth - (currentSlide * 32), // 32px for gap
        duration: 0.6,
        ease: "power2.out"
      });
    }
  }, [currentSlide]);

  return (
    <section 
      ref={sectionRef}
      id="our-founders" 
      className="min-h-screen py-20 relative flex flex-col items-center justify-center px-8"
      style={{
        background: "linear-gradient(135deg, #0B1F4A 0%, #3B4D91 50%, #14E3C9 100%)"
      }}
    >
      <div className="absolute inset-0 z-0 animate-pulse-slow" style={{
        background: "radial-gradient(circle at 30% 40%, rgba(20, 227, 201, 0.3) 0%, transparent 50%), radial-gradient(circle at 70% 60%, rgba(124, 247, 228, 0.3) 0%, transparent 50%)"
      }}></div>
      <div className="flex flex-col items-center gap-16 max-w-7xl mx-auto w-full relative z-10">
        <div className="text-center space-y-6 mb-16">
          <h1 className="text-6xl font-black" style={{
            background: "linear-gradient(135deg, #14E3C9 0%, #7CF7E4 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text"
          }}>Our Founders</h1>
          <p className="text-xl max-w-2xl mx-auto" style={{
            color: "#7CF7E4",
            textShadow: "0 0 15px rgba(124, 247, 228, 0.3)"
          }}>
            Meet the innovative minds behind BOTI&apos;s revolutionary spatial web experience
          </p>
        </div>

        {founders.length > 3 ? (
          <div className="relative w-full max-w-[1204px]">
            {/* Navigation Buttons */}
            <button
              onClick={prevSlide}
              disabled={currentSlide === 0}
              className={`absolute left-[-60px] top-1/2 transform -translate-y-1/2 z-10 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-all ${
                currentSlide === 0 ? 'opacity-50 cursor-not-allowed' : 'opacity-100 cursor-pointer'
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={nextSlide}
              disabled={currentSlide === maxSlide}
              className={`absolute right-[-60px] top-1/2 transform -translate-y-1/2 z-10 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-all ${
                currentSlide === maxSlide ? 'opacity-50 cursor-not-allowed' : 'opacity-100 cursor-pointer'
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Carousel Container */}
            <div className="overflow-hidden">
              <div
                ref={sliderRef}
                className="flex gap-8 transition-transform duration-500"
              >
                {founders.map((founder, index) => (
                  <div key={founder.name} ref={(el) => addToCardRefs(el as HTMLDivElement, index)}>
                    <ProfileCard {...founder} />
                  </div>
                ))}
              </div>
            </div>

            {/* Dots Navigation */}
            <div className="flex justify-center gap-2 mt-8">
              {Array.from({ length: maxSlide + 1 }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    currentSlide === index ? 'bg-white w-6' : 'bg-white/30'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {founders.map((founder, index) => (
              <div key={founder.name} ref={(el) => addToCardRefs(el as HTMLDivElement, index)}>
                <ProfileCard {...founder} />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
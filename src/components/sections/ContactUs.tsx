"use client";

import { useRef, useState, FormEvent } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

interface FormData {
  name: string;
  email: string;
  purpose: string;
  message: string;
}

export default function ContactUs() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    purpose: '',
    message: ''
  });
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top center",
        end: "bottom center",
        scrub: 1,
        pin: false
      }
    });

    // Animate title with glitch effect
    if (titleRef.current) {
      // Convert fromTo to from since we're animating to the natural state
      tl.from(titleRef.current, {
        opacity: 0,
        y: 50,
        skewX:0 ,
        duration: 1.5,
        ease: "power2.out"
      });

      // Add glitch animation
      gsap.to(titleRef.current, {
        x: "+=3",
        duration: 0.1,
        repeat: 3,
        yoyo: true,
        delay: 1,
        ease: "power2.inOut"
      });
    }

    // Animate description with typewriter effect
    if (descriptionRef.current) {
      tl.from(descriptionRef.current, {
        opacity: 0,
        clipPath: "polygon(0 0, 0 0, 0 100%, 0% 100%)",
        duration: 2,
        ease: "power2.inOut"
      }, "-=1");
    }
  });

  return (
    <section 
      ref={sectionRef}
      id="contact-us" 
      className="relative p-8 flex flex-col items-center justify-center px-8"
      style={{
        background: "linear-gradient(135deg, #0B1F4A 0%, #14E3C9 100%)"
      }}
    >
      <div className="absolute inset-0 z-0 animate-pulse-slow" style={{
        background: "radial-gradient(circle at 50% 30%, rgba(124, 247, 228, 0.4) 0%, transparent 60%), radial-gradient(circle at 50% 70%, rgba(20, 227, 201, 0.3) 0%, transparent 60%)"
      }}></div>
      <div className="flex flex-col items-center gap-12 max-w-4xl text-center relative z-10">
        <h1 
          ref={titleRef}
          className="text-6xl font-black"
          style={{
            background: "linear-gradient(135deg, #14E3C9 0%, #7CF7E4 50%, #14E3C9 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text"
          }}
        >
          Contact Us Form
        </h1>
        
        {/* <p 
          ref={descriptionRef}
          className="text-text-secondary text-2xl font-medium leading-relaxed"
        >
          Scroll-driven 3D animations powered by Three.js, R3F, and GSAP.
        </p> */}
        
        {/* Contact form */}
        <form 
          onSubmit={(e: FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            // Handle form submission here
            console.log('Form submitted:', formData);
            // Reset form after submission
            setFormData({
              name: '',
              email: '',
              purpose: '',
              message: ''
            });
          }} 
          className="w-full max-w-md bg-surface/30 rounded-lg p-8 backdrop-blur-sm space-y-2"
        >
          {/* Name field */}
          <div className=" ">
            {/* <label htmlFor="name" className="block text-gray-300 text-sm font-medium">
              Name
            </label> */}
            <input
              type="text"
              id="name"
              name="name"
              required
              className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg 
                         text-white placeholder-gray-400 focus:outline-none focus:ring-2 
                         focus:ring-blue-500 focus:border-transparent transition-colors"
              placeholder="Enter your name"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            />
          </div>

          {/* Email field */}
          <div className=" ">
            {/* <label htmlFor="email" className="block text-gray-300 text-sm font-medium">
              Email
            </label> */}
            <input
              type="email"
              id="email"
              name="email"
              required
              className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg 
                         text-white placeholder-gray-400 focus:outline-none focus:ring-2 
                         focus:ring-blue-500 focus:border-transparent transition-colors"
              placeholder="Enter your email"
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
            />
          </div>

          {/* Purpose dropdown */}
          <div className=" ">
            {/* <label htmlFor="purpose" className="block text-gray-300 text-sm font-medium">
              Purpose
            </label> */}
            <select
              id="purpose"
              name="purpose"
              required
              className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg
                         text-white focus:outline-none focus:ring-2 focus:ring-blue-500 
                         focus:border-transparent transition-colors"
              value={formData.purpose}
              onChange={(e) => setFormData(prev => ({ ...prev, purpose: e.target.value }))}
            >
              <option value="" className="bg-surface">Select a purpose</option>
              <option value="general" className="bg-surface">General Inquiry</option>
              <option value="business" className="bg-surface">Business Opportunity</option>
              <option value="support" className="bg-surface">Technical Support</option>
              <option value="feedback" className="bg-surface">Feedback</option>
            </select>
          </div>

          {/* Message textarea */}
          <div className=" ">
            {/* <label htmlFor="message" className="block text-gray-300 text-sm font-medium">
              Message
            </label> */}
            <textarea
              id="message"
              name="message"
              required
              rows={4}
              className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg 
                         text-white placeholder-gray-400 focus:outline-none focus:ring-2 
                         focus:ring-blue-500 focus:border-transparent transition-colors 
                         resize-none"
              placeholder="Enter your message"
              value={formData.message}
              onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
            />
          </div>

          {/* Submit button */}
          <button
            type="submit"
            className="w-full py-3 px-6 bg-blue-600 hover:bg-blue-700 text-white font-medium 
                     rounded-lg transition-colors duration-200 transform hover:scale-[1.02]"
          >
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
}
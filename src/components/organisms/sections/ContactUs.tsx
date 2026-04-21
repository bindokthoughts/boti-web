"use client";

import { useRef, useState, FormEvent } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import SpatialTypography from "@/components/atoms/SpatialTypography";
import GlassPanel from "@/components/atoms/GlassPanel";
import SectionDelineator from "@/components/molecules/SectionDelineator";

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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!sectionRef.current || !containerRef.current) return;
    gsap.fromTo(
      containerRef.current,
      { autoAlpha: 0, y: 50 },
      {
        autoAlpha: 1,
        y: 0,
        duration: 1.5,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        }
      }
    );
  }, []);

  return (
    <section 
      ref={sectionRef}
      id="contact-us" 
      className="relative min-h-screen py-24 flex flex-col items-center justify-center px-6 pointer-events-none"
    >
      <SectionDelineator number="12" label="CONTACT" />

      <div ref={containerRef} className="flex flex-col md:flex-row items-center gap-16 max-w-6xl w-full pointer-events-auto z-10">
        
        <div className="w-full md:w-1/2 flex flex-col">
          <SpatialTypography variant="accent" className="mb-4">Ready for the Spatial Web?</SpatialTypography>
          <SpatialTypography as="h1" variant="h1" className="text-white drop-shadow-2xl mb-8">
            TRANSMIT
          </SpatialTypography>
          <SpatialTypography variant="body" className="max-w-md">
            Whether you want to build on BOTI, partner with us, or just experience the future, we&apos;re ready when you are.
          </SpatialTypography>
        </div>
        
        <div className="w-full md:w-1/2">
          <GlassPanel intensity="heavy" className="w-full p-8 md:p-12">
            <form 
              onSubmit={async (e: FormEvent<HTMLFormElement>) => {
                e.preventDefault();
                setIsSubmitting(true);
                setSubmitStatus('idle');

                try {
                  const response = await fetch('/api/contact', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData),
                  });
                  if (response.ok) {
                    setSubmitStatus('success');
                    setFormData({ name: '', email: '', purpose: '', message: '' });
                  } else {
                    setSubmitStatus('error');
                  }
                } catch {
                  setSubmitStatus('error');
                } finally {
                  setIsSubmitting(false);
                }
              }} 
              className="w-full space-y-6"
            >
              <input
                type="text"
                required
                className="w-full px-0 py-4 bg-transparent border-b border-white/20 text-white placeholder-white/30 focus:outline-none focus:border-white transition-all text-sm tracking-widest uppercase"
                placeholder="YOUR NAME"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              />
              
              <input
                type="email"
                required
                className="w-full px-0 py-4 bg-transparent border-b border-white/20 text-white placeholder-white/30 focus:outline-none focus:border-white transition-all text-sm tracking-widest uppercase"
                placeholder="YOUR EMAIL"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              />

              <select
                required
                className="w-full px-0 py-4 bg-transparent border-b border-white/20 text-white placeholder-white/30 focus:outline-none focus:border-white transition-all appearance-none cursor-pointer text-sm tracking-widest uppercase"
                value={formData.purpose}
                onChange={(e) => setFormData(prev => ({ ...prev, purpose: e.target.value }))}
              >
                <option value="" className="text-black">SELECT PURPOSE</option>
                <option value="general" className="text-black">GENERAL INQUIRY</option>
                <option value="business" className="text-black">BUSINESS OPPORTUNITY</option>
              </select>

              <textarea
                required
                rows={4}
                className="w-full px-0 py-4 bg-transparent border-b border-white/20 text-white placeholder-white/30 focus:outline-none focus:border-white transition-all resize-none text-sm tracking-widest uppercase"
                placeholder="MESSAGE"
                value={formData.message}
                onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
              />

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-5 block mt-8 bg-white text-black text-xs font-bold tracking-[0.2em] uppercase hover:bg-gray-200 transition-colors duration-300 disabled:opacity-50"
              >
                {isSubmitting ? 'TRANSMITTING...' : 'SEND MESSAGE'}
              </button>

              {submitStatus !== 'idle' && (
                <div className={`text-xs tracking-widest uppercase mt-4 text-center ${submitStatus === 'success' ? 'text-green-400' : 'text-red-400'}`}>
                  {submitStatus === 'success' ? 'TRANSMISSION SUCCESSFUL.' : 'TRANSMISSION FAILED.'}
                </div>
              )}
            </form>
          </GlassPanel>
        </div>
      </div>
    </section>
  );
}
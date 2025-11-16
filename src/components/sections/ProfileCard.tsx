"use client";

import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { StaticImageData } from 'next/image';
import gsap from 'gsap';

interface ProfileCardProps {
  name: string;
  title: string;
  description: string;
  imageUrl: StaticImageData;
  linkedinUrl: string;
  fullBio: string;
}

export default function ProfileCard({
  name,
  title,
  description,
  imageUrl,
  linkedinUrl,
  fullBio
}: ProfileCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const modalContentRef = useRef<HTMLDivElement>(null);
  const modalImageRef = useRef<HTMLDivElement>(null);
  const modalTextRef = useRef<HTMLDivElement>(null);

  const handleClose = () => {
    // Animate out
    gsap.to(modalContentRef.current, {
      y: 100,
      opacity: 0,
      duration: 0.5,
      ease: "power2.inOut"
    });
    gsap.to(modalRef.current, {
      opacity: 0,
      duration: 0.5,
      ease: "power2.inOut",
      onComplete: () => setIsModalOpen(false)
    });
  };

  useEffect(() => {
    if (isModalOpen && modalRef.current && modalContentRef.current) {
      // Initial state
      gsap.set(modalRef.current, { opacity: 0 });
      gsap.set(modalContentRef.current, { y: 100, opacity: 0 });
      gsap.set(modalImageRef.current, { scale: 0.8, opacity: 0 });
      gsap.set(modalTextRef.current, { y: 20, opacity: 0 });

      // Animate in
      const tl = gsap.timeline();
      tl.to(modalRef.current, {
        opacity: 1,
        duration: 0.3,
        ease: "power2.inOut"
      })
      .to(modalContentRef.current, {
        y: 0,
        opacity: 1,
        duration: 0.5,
        ease: "power2.out"
      })
      .to(modalImageRef.current, {
        scale: 1,
        opacity: 1,
        duration: 0.5,
        ease: "back.out(1.7)"
      }, "-=0.3")
      .to(modalTextRef.current, {
        y: 0,
        opacity: 1,
        duration: 0.5,
        ease: "power2.out"
      }, "-=0.3");
    }
  }, [isModalOpen]);

  return (
    <>
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-surface to-background p-1 w-[380px] border border-border">
        <div className="relative rounded-[22px] bg-gradient-to-br from-surface to-background-secondary p-6">
          {/* Profile Image */}
          <div className="relative h-[380px] w-full overflow-hidden rounded-2xl mb-4">
            <Image
              src={imageUrl}
              alt={name}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 380px"
            />
          </div>

          {/* Content */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-bold text-white">{name}</h3>
              <div className="rounded-full bg-white/10 p-1">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-white">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                </svg>
              </div>
            </div>

            <p className="text-lg text-gray-400">{title}</p>
            <p className="text-sm text-gray-500">{description}</p>

            <div className="flex items-center justify-between pt-4 gap-4">
              <a 
                href={linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 rounded-full bg-primary-accent px-6 py-2 font-semibold text-primary hover:bg-highlight transition-colors text-center"
              >
                LinkedIn
              </a>
              <button 
                onClick={() => setIsModalOpen(true)}
                className="flex-1 rounded-full bg-background-secondary px-6 py-2 font-semibold text-text-primary hover:bg-surface transition-colors border border-border"
              >
                Know More
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && typeof document !== 'undefined' && createPortal(
        <div ref={modalRef} className="fixed inset-0 bg-background/95 z-[9999] min-h-screen backdrop-blur-sm">
          <div ref={modalContentRef} className="h-full w-full bg-gradient-to-b from-background to-background-secondary p-4 md:p-8 overflow-y-auto">
            <div className="max-w-4xl mx-auto">
              <div className="flex justify-end mb-4">
                <button
                  onClick={handleClose}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="flex flex-col md:flex-row items-center gap-8 mb-12">
                <div ref={modalImageRef} className="relative w-48 h-48 rounded-2xl overflow-hidden">
                  <Image
                    src={imageUrl}
                    alt={name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 192px, 192px"
                  />
                </div>
                <div ref={modalTextRef} className="text-center md:text-left">
                  <h2 className="text-4xl font-bold text-white mb-4">{name}</h2>
                  <p className="text-xl text-gray-400">{title}</p>
                  <a 
                    href={linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-4 px-6 py-2 bg-primary-accent text-primary rounded-full hover:bg-highlight transition-colors"
                  >
                    Connect on LinkedIn
                  </a>
                </div>
              </div>
              
              <div className="prose prose-invert prose-lg max-w-none">
                <p className="text-gray-300 whitespace-pre-wrap leading-relaxed">{fullBio}</p>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
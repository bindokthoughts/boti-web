"use client"

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import logo from "../../assets/images/Logo_Typo.svg";
import monogram from "../../assets/images/Logo_Monogram.svg";

export default function Navbar() {
    const [isMobile, setIsMobile] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    const menuItemsRef = useRef<(HTMLElement | null)[]>([]);

    useEffect(() => {
        const checkIsMobile = () => {
            // Tailwind md breakpoint is 768px
            setIsMobile(window.innerWidth < 768);
        };
        // Set initial state
        checkIsMobile();

        // Listen for window resize
        window.addEventListener("resize", checkIsMobile);

        // Cleanup
        return () => window.removeEventListener("resize", checkIsMobile);
    }, []);

    useEffect(() => {
        // Check for saved theme preference or default to light mode
        const savedTheme = localStorage.getItem('theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
            setIsDarkMode(true);
            document.documentElement.classList.add('dark');
        } else {
            setIsDarkMode(false);
            document.documentElement.classList.remove('dark');
        }
    }, []);

    const toggleTheme = () => {
        if (isDarkMode) {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
            setIsDarkMode(false);
        } else {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
            setIsDarkMode(true);
        }
    };

    const scrollToSection = (sectionId: string) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            setIsOpen(false);
        }
    };

    // GSAP animation for menu using useGSAP hook
    useGSAP(() => {
        if (isOpen && menuRef.current) {
            // Animate menu container
            gsap.fromTo(
                menuRef.current,
                { 
                    opacity: 0,
                    clipPath: 'circle(0% at 100% 0%)'
                },
                { 
                    opacity: 1,
                    clipPath: 'circle(150% at 100% 0%)',
                    duration: 0.8,
                    ease: 'power4.out'
                }
            );

            // Stagger animate menu items
            gsap.fromTo(
                menuItemsRef.current.filter(Boolean),
                {
                    opacity: 0,
                    y: 50,
                    rotateX: -90
                },
                {
                    opacity: 1,
                    y: 0,
                    rotateX: 0,
                    duration: 0.6,
                    stagger: 0.1,
                    delay: 0.3,
                    ease: 'back.out(1.7)'
                }
            );
        } else if (!isOpen && menuRef.current) {
            // Animate out
            gsap.to(menuRef.current, {
                opacity: 0,
                clipPath: 'circle(0% at 100% 0%)',
                duration: 0.5,
                ease: 'power4.in'
            });
        }
    }, { dependencies: [isOpen], scope: menuRef });


    return (
        <nav className="sticky top-0 z-50 backdrop-blur-md bg-background/80 dark:bg-background/80">
            <div className="container mx-auto px-6 py-3">
                <div className="flex justify-between items-center">
                    {/* Logo on desktop, Monogram on mobile */}
                    <Link href="/" className="flex items-center gap-2">
                        {isMobile ? (
                            <Image src={monogram} alt="BOTI Monogram" width={40} height={40} />
                        ) : (
                            <Image src={logo} alt="BOTI" height={40} />
                        )}
                    </Link>

                    {/* Right side: Theme toggle and Hamburger menu together */}
                    <div className="flex items-center gap-3">
                        {/* Theme Toggle Button */}
                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-lg bg-surface hover:bg-primary-accent/10 transition-colors border border-border"
                            aria-label="Toggle theme"
                        >
                            {isDarkMode ? (
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                                </svg>
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                                </svg>
                            )}
                        </button>

                        {/* Hamburger menu */}
                        <button
                            className="focus:outline-none"
                            onClick={() => setIsOpen(!isOpen)}
                            aria-label="Toggle menu"
                        >
                            <div className="w-6 space-y-1.5">
                                <span className={`block h-0.5 w-6 bg-text-primary transition-all ${isOpen ? "rotate-45 translate-y-2" : ""}`} style={{ backgroundColor: 'var(--color-text-primary)' }}></span>
                                <span className={`block h-0.5 w-6 bg-text-primary transition-all ${isOpen ? "opacity-0" : ""}`} style={{ backgroundColor: 'var(--color-text-primary)' }}></span>
                                <span className={`block h-0.5 w-6 bg-text-primary transition-all ${isOpen ? "-rotate-45 translate-y-[-0.5rem]" : ""}`} style={{ backgroundColor: 'var(--color-text-primary)' }}></span>
                            </div>
                        </button>
                    </div>
                </div>

                {/* Full Screen Navigation Menu */}
                {isOpen && (
                    <div 
                        ref={menuRef}
                        className="fixed top-0 left-0 z-50 flex items-center justify-center"
                        style={{
                            width: '100vw',
                            height: '100vh',
                            background: 'linear-gradient(135deg, rgba(11, 31, 74, 0.98) 0%, rgba(59, 77, 145, 0.95) 50%, rgba(63, 231, 249, 0.9) 100%)',
                            backdropFilter: 'blur(20px)'
                        }}
                    >
                        {/* Close button */}
                        <button
                            onClick={() => setIsOpen(false)}
                            className="absolute top-8 right-8 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300 backdrop-blur-sm border border-white/20"
                            aria-label="Close menu"
                        >
                            <svg 
                                xmlns="http://www.w3.org/2000/svg" 
                                className="h-8 w-8 text-white" 
                                fill="none" 
                                viewBox="0 0 24 24" 
                                stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        {/* Menu content */}
                        <div className="flex flex-col items-center justify-center space-y-8 px-8">
                            {/* Navigation Links */}
                            <div className="flex flex-col items-center space-y-6">
                                <button 
                                    ref={(el) => { menuItemsRef.current[0] = el }}
                                    onClick={() => scrollToSection('hero')}
                                    className="text-6xl md:text-7xl font-bold text-white hover:text-primary-accent transition-all duration-300 transform hover:scale-110"
                                    style={{ 
                                        textShadow: '0 0 30px rgba(63, 231, 249, 0.5)',
                                        perspective: '1000px'
                                    }}
                                >
                                    Home
                                </button>
                                <button 
                                    ref={(el) => { menuItemsRef.current[1] = el }}
                                    onClick={() => scrollToSection('our-founders')}
                                    className="text-6xl md:text-7xl font-bold text-white hover:text-primary-accent transition-all duration-300 transform hover:scale-110"
                                    style={{ 
                                        textShadow: '0 0 30px rgba(63, 231, 249, 0.5)',
                                        perspective: '1000px'
                                    }}
                                >
                                    About
                                </button>
                                <button 
                                    ref={(el) => { menuItemsRef.current[2] = el }}
                                    onClick={() => scrollToSection('contact-us')}
                                    className="text-6xl md:text-7xl font-bold text-white hover:text-primary-accent transition-all duration-300 transform hover:scale-110"
                                    style={{ 
                                        textShadow: '0 0 30px rgba(63, 231, 249, 0.5)',
                                        perspective: '1000px'
                                    }}
                                >
                                    Contact
                                </button>
                            </div>

                            {/* Decorative elements */}
                            <div 
                                ref={(el) => { menuItemsRef.current[3] = el }}
                                className="flex gap-6 mt-8"
                            >
                                <div className="w-20 h-1 bg-gradient-to-r from-transparent via-white to-transparent"></div>
                            </div>

                            {/* Social links or additional info */}
                            <div 
                                ref={(el) => { menuItemsRef.current[4] = el }}
                                className="text-white/80 text-sm mt-4"
                            >
                                <p className="text-center">Explore the future with BOTI</p>
                            </div>
                        </div>

                        {/* Animated background particles */}
                        <div className="absolute inset-0 overflow-hidden pointer-events-none">
                            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary-accent/20 rounded-full blur-3xl animate-pulse-slow"></div>
                            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-highlight/20 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
}

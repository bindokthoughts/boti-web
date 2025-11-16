"use client"

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "../../assets/images/Logo_Typo.svg";
import monogram from "../../assets/images/Logo_Monogram.svg";

export default function Navbar() {
    const [isMobile, setIsMobile] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false);

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


    return (
        <nav className="sticky top-0 z-50 backdrop-blur-md bg-background/80 dark:bg-background/80 border-b border-border">
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

                    {/* Hamburger menu (mobile only) */}
                    <button
                        className="md:hidden focus:outline-none"
                        onClick={() => setIsOpen(!isOpen)}
                        aria-label="Toggle menu"
                    >
                        <div className="w-6 space-y-1.5">
                            <span className={`block h-0.5 w-6 bg-text-primary transition-all ${isOpen ? "rotate-45 translate-y-2" : ""}`}></span>
                            <span className={`block h-0.5 w-6 bg-text-primary transition-all ${isOpen ? "opacity-0" : ""}`}></span>
                            <span className={`block h-0.5 w-6 bg-text-primary transition-all ${isOpen ? "-rotate-45 translate-y-[-0.5rem]" : ""}`}></span>
                        </div>
                    </button>

                    {/* Navigation links (desktop) */}
                    <div className="hidden md:flex space-x-4 items-center">
                        <Link href="/" className="text-text-secondary hover:text-primary-accent transition-colors">Home</Link>
                        <Link href="/about" className="text-text-secondary hover:text-primary-accent transition-colors">About</Link>
                        <Link href="/contact" className="text-text-secondary hover:text-primary-accent transition-colors">Contact</Link>
                        
                        {/* Theme Toggle Button */}
                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-lg bg-surface hover:bg-primary-accent/10 transition-colors border border-border"
                            aria-label="Toggle theme"
                        >
                            {isDarkMode ? (
                                // Sun icon for light mode
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                                </svg>
                            ) : (
                                // Moon icon for dark mode
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>

                {/* Mobile Navigation (dropdown) */}
                {isOpen && (
                    <div className="md:hidden bg-background-secondary rounded-lg mt-2 py-2 space-y-2 flex flex-col border border-border">
                        <Link href="/" className="text-text-secondary hover:text-primary-accent px-4 py-1 transition-colors">
                            Home
                        </Link>
                        <Link href="/about" className="text-text-secondary hover:text-primary-accent px-4 py-1 transition-colors">
                            About
                        </Link>
                        <Link href="/contact" className="text-text-secondary hover:text-primary-accent px-4 py-1 transition-colors">
                            Contact
                        </Link>
                        
                        {/* Theme Toggle for Mobile */}
                        <div className="px-4 py-2 border-t border-border">
                            <button
                                onClick={toggleTheme}
                                className="w-full flex items-center justify-between p-2 rounded-lg bg-surface hover:bg-primary-accent/10 transition-colors"
                                aria-label="Toggle theme"
                            >
                                <span className="text-text-secondary text-sm">
                                    {isDarkMode ? 'Light Mode' : 'Dark Mode'}
                                </span>
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
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
}

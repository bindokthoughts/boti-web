"use client"

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "../../assets/images/Logo_Typo.svg";
import monogram from "../../assets/images/Logo_Monogram.svg";

export default function Navbar() {
    const [isMobile, setIsMobile] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

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


    return (
        <nav className="sticky top-0 z-50 backdrop-blur-md">
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
                            <span className={`block h-0.5 w-6 bg-gray-900 transition-all ${isOpen ? "rotate-45 translate-y-2" : ""}`}></span>
                            <span className={`block h-0.5 w-6 bg-gray-900 transition-all ${isOpen ? "opacity-0" : ""}`}></span>
                            <span className={`block h-0.5 w-6 bg-gray-900 transition-all ${isOpen ? "-rotate-45 translate-y-[-0.5rem]" : ""}`}></span>
                        </div>
                    </button>

                    {/* Navigation links (desktop) */}
                    <div className="hidden md:flex space-x-4">
                        <Link href="/" className="text-gray-600 hover:text-gray-900">Home</Link>
                        <Link href="/about" className="text-gray-600 hover:text-gray-900">About</Link>
                        <Link href="/contact" className="text-gray-600 hover:text-gray-900">Contact</Link>
                    </div>
                </div>

                {/* Mobile Navigation (dropdown) */}
                {isOpen && (
                    <div className="md:hidden bg-white/95 rounded-lg mt-2 py-2 space-y-2 flex flex-col">
                        <Link href="/" className="text-gray-600 hover:text-gray-900 px-4 py-1">
                            Home
                        </Link>
                        <Link href="/about" className="text-gray-600 hover:text-gray-900 px-4 py-1">
                            About
                        </Link>
                        <Link href="/contact" className="text-gray-600 hover:text-gray-900 px-4 py-1">
                            Contact
                        </Link>
                    </div>
                )}
            </div>
        </nav>
    );
}

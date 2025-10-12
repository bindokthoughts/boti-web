'use client';

import "./globals.css";
import Navbar from "@/components/navbar/Navbar";
import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  useEffect(() => {
    // Refresh ScrollTrigger after component mounts
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
      console.log("ScrollTrigger refreshed globally");
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <html lang="en">
      <body className="min-h-screen" suppressHydrationWarning>
        <Navbar/>
        {children}
      </body>
    </html>
  );
}

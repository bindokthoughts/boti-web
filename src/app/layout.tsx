'use client';

import "./globals.css";
import Navbar from "@/components/navbar/Navbar";
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // useGSAP(() => {
  //   // Refresh ScrollTrigger after component mounts
  //   const timer = setTimeout(() => {
  //     ScrollTrigger.refresh();
  //     console.log("ScrollTrigger refreshed globally");
  //   }, 500);
    
  //   return () => clearTimeout(timer);
  // }, []);

  return (
    <html lang="en">
      <body className="min-h-screen font-sans" suppressHydrationWarning>
        <Navbar/>
        {children}
      </body>
    </html>
  );
}

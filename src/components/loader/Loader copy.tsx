"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import "./Loader.css";
import Simulated_Logo from "../../assets/images/Simulated_Logo.png"

// Messages to cycle through
const messages = [
    "BOOTING BOTI BROWSER...",
    "INITIALIZING PRESENCE ENGINE...",
    "That's why we need BOTI…",
];

export default function Loader() {
    const [displayText, setDisplayText] = useState("");
    const [messageIndex, setMessageIndex] = useState(0);
    const [line1Done, setLine1Done] = useState(false);

    const line1 = "HUMAN-FIRST APPLICATIONS  FOR SIMULATED WORLDS";

    // Typing for line1
    useEffect(() => {
        let i = 0;
        if (!line1Done) {
            const interval = setInterval(() => {
                setDisplayText(line1.slice(0, i + 1));
                i++;
                if (i === line1.length) {
                    clearInterval(interval);
                    setTimeout(() => setLine1Done(true), 1000);
                }
            }, 50);
            return () => clearInterval(interval);
        }
    }, [line1Done]);

    // Typing for rotating messages
    useEffect(() => {
        if (line1Done) {
            let i = 0;
            let interval: NodeJS.Timeout;
            const showMessage = () => {
                const current = messages[messageIndex];
                interval = setInterval(() => {
                    setDisplayText(current.slice(0, i + 1));
                    i++;
                    if (i === current.length) {
                        clearInterval(interval);
                        setTimeout(() => {
                            i = 0;
                            setMessageIndex((prev) => (prev + 1) % messages.length);
                            showMessage();
                        }, 2000); // wait before replacing
                    }
                }, 50);
            };
            showMessage();
            return () => clearInterval(interval);
        }
    }, [line1Done, messageIndex]);

    return (
        <div className="loader_div flex flex-col items-center justify-center h-screen bg-[#1A1A1A] text-white font-['Press_Start_2P'] overflow-hidden">
            {/* Floating + vibrating logo */}
            <motion.div
                animate={{
                    //   y: [0, -3, 0], // float
                    x: [0, -1, 1, -1, 1, 0, -1, 0, 1, -1, 0 - 2], // jitter
                }}
                transition={{
                    repeat: Infinity,
                    duration: 1.5,
                    ease: "easeInOut",
                }}
                className="mb-8"
            >
                <Image
                    src={Simulated_Logo} // replace with your logo
                    alt="Logo"
                    // width='auto'
                    height={200}
                    priority
                />
            </motion.div>

            {/* Glitch Text with Typing Effect */}
            <motion.div
                key={displayText} // re-trigger animation each update
                initial={{ opacity: 0.8 }}
                animate={{
                    opacity: [1, 0.7, 1],
                    x: [0, -1, 1, -2, 2, 0],
                }}
                transition={{
                    repeat: Infinity,
                    duration: 0.15,
                }}
                className="relative text-center text-sm md:text-base glitch-text"
            >
                {displayText}
                {/* Red/Blue glitch shadows */}
                <span className="absolute top-0 left-0 w-full h-full text-red-500 opacity-60 blur-sm translate-x-1 glitch-layer">
                    {displayText}
                </span>
                <span className="absolute top-0 left-0 w-full h-full text-cyan-500 opacity-60 blur-sm -translate-x-1 glitch-layer">
                    {displayText}
                </span>
            </motion.div>
        </div>
    );
}

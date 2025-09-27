"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import "./Loader.css";
import Simulated_Logo from "../../assets/Simulated_Logo.png";

// Messages to cycle through
const messages = [
    "BOOTING BOTI BROWSER...",
    "INITIALIZING PRESENCE ENGINE...",
    "It is taking a while to load...",
    "That's why we need BOTI…",
];

interface LoaderProps {
    onComplete?: () => void;
}

export default function Loader({ onComplete }: LoaderProps) {
    const [displayText, setDisplayText] = useState("");
    const [messageIndex, setMessageIndex] = useState(0);
    const [line1Done, setLine1Done] = useState(false);
    const [loadingComplete, setLoadingComplete] = useState(false);
    const [showTVEffect, setShowTVEffect] = useState(false);
    const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
    
    const shutdownAudioRef = useRef<HTMLAudioElement | null>(null);
    const staticNoiseRef = useRef<HTMLAudioElement | null>(null);

    const line1 = "HUMAN-FIRST APPLICATIONS FOR SIMULATED WORLDS";

    // Enhanced TV shutdown sound sequence
    const playShutdownSequence = () => {
        if (!audioContext) return;
        
        // Stop static noise
        if (staticNoiseRef.current) {
            staticNoiseRef.current.pause();
        }
        
        // Create TV shutdown sound sequence
        const createTone = (frequency: number, startTime: number, duration: number, volume: number) => {
            try {
                const oscillator = audioContext.createOscillator();
                const gainNode = audioContext.createGain();
                const filterNode = audioContext.createBiquadFilter();
                
                oscillator.connect(filterNode);
                filterNode.connect(gainNode);
                gainNode.connect(audioContext.destination);
                
                oscillator.frequency.value = frequency;
                oscillator.type = 'sawtooth';
                
                filterNode.type = 'lowpass';
                filterNode.frequency.value = frequency * 1.5;
                
                const now = audioContext.currentTime;
                gainNode.gain.setValueAtTime(0, now + startTime);
                gainNode.gain.linearRampToValueAtTime(volume, now + startTime + 0.01);
                gainNode.gain.exponentialRampToValueAtTime(0.01, now + startTime + duration);
                
                oscillator.start(now + startTime);
                oscillator.stop(now + startTime + duration);
            } catch (error) {
                console.log("Audio tone creation failed:", error);
            }
        };

        // High-pitched whine descending to low rumble
        createTone(8000, 0, 0.5, 0.3);
        createTone(4000, 0.2, 0.4, 0.25);
        createTone(2000, 0.4, 0.3, 0.2);
        createTone(1000, 0.6, 0.3, 0.15);
        createTone(500, 0.8, 0.4, 0.1);
        createTone(200, 1.0, 0.5, 0.08);
        
        // Final electrical pop
        setTimeout(() => {
            try {
                const oscillator = audioContext.createOscillator();
                const gainNode = audioContext.createGain();
                
                oscillator.connect(gainNode);
                gainNode.connect(audioContext.destination);
                
                oscillator.frequency.value = 60;
                oscillator.type = 'square';
                
                const now = audioContext.currentTime;
                gainNode.gain.setValueAtTime(0.4, now);
                gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.15);
                
                oscillator.start(now);
                oscillator.stop(now + 0.15);
            } catch (error) {
                console.log("Final pop creation failed:", error);
            }
        }, 1500);
    };

    const triggerShutdown = () => {
        // Try to play shutdown audio file first
        if (shutdownAudioRef.current) {
            shutdownAudioRef.current.currentTime = 0;
            shutdownAudioRef.current.play().catch(() => {
                console.log("Shutdown audio failed, using Web Audio API");
                playShutdownSequence();
            });
        } else {
            playShutdownSequence();
        }
        
        setShowTVEffect(true);
        
        setTimeout(() => {
            if (onComplete) {
                onComplete();
            }
        }, 3000);
    };

    // Initialize audio
    useEffect(() => {
        // Initialize audio files
        shutdownAudioRef.current = new Audio('/sounds/tv-shutdown.mp3');
        staticNoiseRef.current = new Audio('/sounds/static-noise.mp3');
        
        if (shutdownAudioRef.current) {
            shutdownAudioRef.current.volume = 0.7;
            shutdownAudioRef.current.preload = 'auto';
        }
        
        if (staticNoiseRef.current) {
            staticNoiseRef.current.volume = 0.3;
            staticNoiseRef.current.preload = 'auto';
            staticNoiseRef.current.loop = true;
        }

        // Initialize AudioContext
        const initAudio = () => {
            if (!audioContext) {
                try {
                    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
                    setAudioContext(ctx);
                    if (ctx.state === 'suspended') {
                        ctx.resume();
                    }
                } catch (error) {
                    console.log("AudioContext initialization failed:", error);
                }
            }
        };

        document.addEventListener('click', initAudio, { once: true });
        document.addEventListener('keydown', initAudio, { once: true });

        return () => {
            if (shutdownAudioRef.current) shutdownAudioRef.current.pause();
            if (staticNoiseRef.current) staticNoiseRef.current.pause();
            if (audioContext) audioContext.close();
        };
    }, [audioContext]);

    // Play static noise when component mounts
    useEffect(() => {
        const playStaticNoise = () => {
            if (staticNoiseRef.current) {
                staticNoiseRef.current.play().catch(() => {
                    console.log("Static noise autoplay blocked");
                });
            }
        };

        const timer = setTimeout(playStaticNoise, 500);
        return () => clearTimeout(timer);
    }, []);

    // Typing animation for line1
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
    }, [line1Done, line1]);

    // Typing animation for rotating messages
    useEffect(() => {
        if (line1Done) {
            let i = 0;
            let interval: NodeJS.Timeout;
            let cycleCount = 0;
            
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
                            cycleCount++;
                            
                            // Complete after 2 full cycles (6 messages total)
                            if (cycleCount >= 6) {
                                setLoadingComplete(true);
                                // Start shutdown sequence
                                setTimeout(() => {
                                    triggerShutdown();
                                }, 1500);
                            } else {
                                showMessage();
                            }
                        }, 2000); // wait before next message
                    }
                }, 50);
            };
            showMessage();
            return () => clearInterval(interval);
        }
    }, [line1Done, messageIndex]);

    return (
        <div className="loader-wrapper">
            <AnimatePresence mode="wait">
                {!loadingComplete ? (
                    <motion.div
                        key="loader"
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        className="loader-container"
                    >
                        {/* Static noise overlay */}
                        <div className="static-noise-overlay"></div>
                        
                        {/* Audio initialization hint */}
                        <div className="audio-hint">
                            Click anywhere to enable audio
                        </div>
                        
                        {/* Content container */}
                        <div className="loader-content">
                            {/* Floating + vibrating logo */}
                            <motion.div
                                animate={{
                                    x: [0, -1, 1, -1, 1, 0, -1, 0, 1, -1, 0],
                                    y: [0, -2, 0, 2, 0],
                                }}
                                transition={{
                                    repeat: Infinity,
                                    duration: 1.5,
                                    ease: "easeInOut",
                                }}
                                className="logo-container"
                            >
                                <Image
                                    src={Simulated_Logo}
                                    alt="Logo"
                                    height={200}
                                    priority
                                />
                            </motion.div>

                            {/* Typing text display with glitch effect */}
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
                                className="message-container"
                            >
                                <div className="message-text">
                                    {displayText}
                                    {/* Typing cursor */}
                                    <span className="typing-cursor">|</span>
                                </div>
                                
                                {/* Glitch layers */}
                                <span className="glitch-layer glitch-red">
                                    {displayText}
                                </span>
                                <span className="glitch-layer glitch-cyan">
                                    {displayText}
                                </span>
                            </motion.div>
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        key="tv-shutdown"
                        initial={{ opacity: 1, scale: 1 }}
                        animate={{ 
                            opacity: showTVEffect ? 1 : 0,
                            scale: showTVEffect ? 1 : 1.1
                        }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className={`tv-shutdown-container ${showTVEffect ? 'shutting-down' : ''}`}
                    >
                        <div className="tv-shutdown-effect">
                            <div className="shutdown-line"></div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

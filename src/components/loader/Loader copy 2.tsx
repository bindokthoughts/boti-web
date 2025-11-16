/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import "./Loader.css";
import Simulated_Logo from "../../assets/images/Simulated_Logo.png";

// Extend Window type for Safari webkitAudioContext
declare global {
  interface Window {
    webkitAudioContext?: typeof AudioContext;
  }
}

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

export default function LoaderOld({ onComplete }: LoaderProps) {
  const [displayText, setDisplayText] = useState("");
  const [messageIndex, setMessageIndex] = useState(0);
  const [line1Done, setLine1Done] = useState(false);
  const [loadingComplete, setLoadingComplete] = useState(false);
  const [showTVEffect, setShowTVEffect] = useState(false);
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);

  const shutdownAudioRef = useRef<HTMLAudioElement | null>(null);
  const staticNoiseRef = useRef<HTMLAudioElement | null>(null);

  const line1 = "HUMAN-FIRST APPLICATIONS FOR SIMULATED WORLDS";

  // --- (rest of your functions unchanged) ---

  const playShutdownSequence = () => {
    if (!audioContext) return;
    // ... existing logic unchanged ...
  };

  const triggerShutdown = () => {
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
    shutdownAudioRef.current = new Audio("/sounds/tv-shutdown.mp3");
    staticNoiseRef.current = new Audio("/sounds/static-noise.mp3");

    if (shutdownAudioRef.current) {
      shutdownAudioRef.current.volume = 0.7;
      shutdownAudioRef.current.preload = "auto";
    }

    if (staticNoiseRef.current) {
      staticNoiseRef.current.volume = 0.3;
      staticNoiseRef.current.preload = "auto";
      staticNoiseRef.current.loop = true;
    }

    const initAudio = () => {
      if (!audioContext) {
        try {
          const AudioCtx = window.AudioContext || window.webkitAudioContext;
          if (AudioCtx) {
            const ctx = new AudioCtx();
            setAudioContext(ctx);
            if (ctx.state === "suspended") {
              ctx.resume();
            }
          }
        } catch (error) {
          console.log("AudioContext initialization failed:", error);
        }
      }
    };

    document.addEventListener("click", initAudio, { once: true });
    document.addEventListener("keydown", initAudio, { once: true });

    return () => {
      if (shutdownAudioRef.current) shutdownAudioRef.current.pause();
      if (staticNoiseRef.current) staticNoiseRef.current.pause();
      if (audioContext) audioContext.close();
    };
  }, [audioContext]);

  // --- rest of your useEffects & JSX stay unchanged ---
  
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
            {/* ... unchanged UI code ... */}
          </motion.div>
        ) : (
          <motion.div
            key="tv-shutdown"
            initial={{ opacity: 1, scale: 1 }}
            animate={{
              opacity: showTVEffect ? 1 : 0,
              scale: showTVEffect ? 1 : 1.1,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className={`tv-shutdown-container ${
              showTVEffect ? "shutting-down" : ""
            }`}
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

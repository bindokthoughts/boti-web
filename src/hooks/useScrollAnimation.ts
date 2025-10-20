import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

interface UseScrollAnimationOptions {
  triggerStart?: string;
  triggerEnd?: string;
  animationDuration?: number;
  initialOpacity?: number;
  initialY?: number;
  initialScale?: number;
  finalOpacity?: number;
  finalY?: number;
  finalScale?: number;
  ease?: string;
}

export const useScrollAnimation = <T extends HTMLElement = HTMLElement>(options: UseScrollAnimationOptions = {}) => {
  const {
    triggerStart = "top center",
    triggerEnd = "bottom center",
    animationDuration = 1,
    initialOpacity = 0,
    initialY = 50,
    initialScale = 0.9,
    finalOpacity = 1,
    finalY = 0,
    finalScale = 1,
    ease = "power2.out"
  } = options;

  const elementRef = useRef<T>(null);

  useEffect(() => {
    const element = elementRef.current;
    
    if (element) {
      // Add data attribute for CSS fallback
      element.setAttribute('data-scroll-animation', 'true');
      
      // Create timeline for the animation
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: element,
          start: triggerStart,
          end: triggerEnd,
          toggleActions: "play none none reverse"
        }
      });

      // Set initial state
      tl.fromTo(element, 
        {
          opacity: initialOpacity,
          y: initialY,
          scale: initialScale
        },
        {
          opacity: finalOpacity,
          y: finalY,
          scale: finalScale,
          duration: animationDuration,
          ease: ease
        }
      );
    }

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.trigger === element) {
          // trigger.kill();
        }
      });
    };
  }, [triggerStart, triggerEnd, animationDuration, initialOpacity, initialY, initialScale, finalOpacity, finalY, finalScale, ease]);

  return elementRef;
};
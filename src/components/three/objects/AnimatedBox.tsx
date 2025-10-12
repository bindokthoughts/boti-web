"use client";
import * as THREE from "three";
import { useRef, useEffect } from "react";
import { Mesh } from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);


export default function AnimatedBox() {
  const ref = useRef<Mesh>(null);

  useEffect(() => {
    if (!ref.current) return;

    // Initial bounce-in animation for scale
    gsap.fromTo(
      ref.current.scale,
      { x: 0, y: 0, z: 0 },
      { x: 2, y: 2, z: 2, duration: 1.2, ease: "power1.in" }
    );

    // Timeline 1: Hero Section Scroll Animation
    const tl1 = gsap.timeline({
      scrollTrigger: {
        trigger: "#hero",
        start: "top bottom",
        end: "top top",
        scrub: true,
      },
    });

    tl1.to(ref.current.rotation, { x: 0, ease: "power2.inOut" })
      // .to(ref.current.rotation, { y: 0.0, ease: "power2.inOut" }, ">")
      // .to(ref.current.rotation, { x: 0.0, ease: "power2.inOut" }, "<")
      .to(ref.current.position, { x: -2, ease: "power2.inOut" }, "<")
      .to(ref.current.rotation, { y: 2, duration: 1.2, ease: "power2.inOut" }, "<")
      .to(ref.current.rotation, { z: 0, duration: 3, ease: "power2.inOut" }, "<")
    // .to(ref.current.position, { x: -2, ease: "power2.inOut" }, "<")
    // .to(ref.current.scale, { x: 1, y: 1, z: 1, ease: "power2.inOut" }, "<");

    // Timeline 2: Section 2 Scroll Animation
    const tl2 = gsap.timeline({
      scrollTrigger: {
        trigger: "#section2",
        start: "top bottom",
        end: "top center",
        scrub: true,
      },
    });

    tl2.to(ref.current.rotation, { x: 1, ease: "power2.inOut" }, "<")
      .to(ref.current.rotation, { y: 10, ease: "power2.inOut" }, ">")
      .to(ref.current.rotation, { z: -4, ease: "power2.inOut" })

      .to(ref.current.scale, { x: 1.5, ease: "power2.inOut" }, "<")
      .to(ref.current.scale, { y: 1.5, ease: "power2.inOut" }, ">")
      .to(ref.current.scale, { z: 1.5, ease: "power2.inOut" });
    // .to(ref.current.rotation, { z: 4, ease: "power2.inOut" })
    // .to(ref.current.position, { x: 2, ease: "power2.inOut" });


    const tl3 = gsap.timeline({
      scrollTrigger: {
        trigger: "#section3",
        start: "top bottom",
        end: "top top",
        scrub: true,
      },
    });

    tl3.to(ref.current.position, { x: 1, ease: "power2.inOut" })
      .to(ref.current.rotation, { y: 3, ease: "power2.inOut" })
      .to(ref.current.rotation, { z: 3, ease: "power2.inOut" })

      .to(ref.current.scale, { x: 1.25, ease: "power2.inOut" }, "<")
      .to(ref.current.scale, { y: 1.25, ease: "power2.inOut" }, ">")
      .to(ref.current.scale, { z: 1.25, ease: "power2.inOut" });

    const tl4 = gsap.timeline({
      scrollTrigger: {
        trigger: "#section4",
        start: "top bottom",
        end: "top top",
        scrub: true,
      },
    });

    tl4.to(ref.current.position, { x: 1, ease: "power2.inOut" })
      .to(ref.current.rotation, { y: 1, ease: "power2.inOut" })
      .to(ref.current.rotation, { z: 3, ease: "power2.inOut" });

    const tl5 = gsap.timeline({
      scrollTrigger: {
        trigger: "#section5",
        start: "top bottom",
        end: "top top",
        scrub: true,
      },
    });

    tl5.to(ref.current.rotation, { x: 0.5, ease: "power2.inOut" })
      .to(ref.current.rotation, { y: 0.75, ease: "power2.inOut" })
      .to(ref.current.rotation, { z: 0, ease: "power2.inOut" })

      .to(ref.current.position, { x: 0, ease: "power2.inOut" })
      .to(ref.current.position, { y: 0, ease: "power2.inOut" })
      .to(ref.current.position, { z: -2, ease: "power2.inOut" });

      const tl6 = gsap.timeline({
      scrollTrigger: {
        trigger: "#section6",
        start: "center center",
        end: "top top",
        scrub: true,
      },
    });

    tl6.to(ref.current.position, { x: 0, ease: "power2.inOut" }, ">")
      .to(ref.current.position, { y: 0, ease: "power2.inOut" },  ">")
      .to(ref.current.position, { z: -100, ease: "power2.inOut" }, "<")
      
      .to(ref.current.scale, { x: 0, ease: "power2.inOut" }, "<")
      .to(ref.current.scale, { y: 0, ease: "power2.inOut" }, "<")
      .to(ref.current.scale, { z: 0, ease: "power2.inOut" }, "<");
      


    // Cleanup: Kill timelines and all ScrollTriggers
    return () => {
      tl1.kill();
      tl2.kill();
      tl3.kill();
      tl4.kill();
      tl5.kill();
      tl6.kill();
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);


  return (
    <mesh ref={ref} position={[0, 0, 0]} rotation={[0, 0, 0]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="white" />
    </mesh>
  );
}

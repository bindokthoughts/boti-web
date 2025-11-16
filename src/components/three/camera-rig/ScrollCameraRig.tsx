"use client";

import { useRef, useEffect, useState } from "react";
import { useThree } from "@react-three/fiber";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { OrthographicCamera, PerspectiveCamera } from "three";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * ScrollCameraRig - Controls camera movement through all scenes based on scroll position
 * Uses GSAP ScrollTrigger with section-based triggers for precise camera animations
 * Switches between OrthographicCamera (for cube) and PerspectiveCamera (for other scenes)
 * Responsive camera positions for mobile and desktop
 */
export default function ScrollCameraRig() {
  const { camera, gl, scene, size } = useThree();
  const perspectiveCameraRef = useRef<PerspectiveCamera>(camera as PerspectiveCamera);
  const orthoCameraRef = useRef<OrthographicCamera | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Create orthographic camera and detect mobile/desktop
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);

    // Create orthographic camera with proper aspect ratio
    const aspect = size.width / size.height;
    const frustumSize = 3;
    const orthoCamera = new OrthographicCamera(
      (frustumSize * aspect) / -2,
      (frustumSize * aspect) / 2,
      frustumSize / 2,
      frustumSize / -2,
      0.1,
      1000
    );
    orthoCamera.position.copy(perspectiveCameraRef.current.position);
    orthoCameraRef.current = orthoCamera;
    scene.add(orthoCamera);

    return () => {
      window.removeEventListener("resize", checkMobile);
      if (orthoCameraRef.current) {
        scene.remove(orthoCameraRef.current);
      }
    };
  }, [scene, size]);

  useGSAP(() => {
    if (!orthoCameraRef.current) return;

    const perspCamera = perspectiveCameraRef.current;
    const orthoCamera = orthoCameraRef.current;

    // Camera switching based on scroll position
    gsap.to(
      {},
      {
        scrollTrigger: {
          trigger: "#hero",
          start: "top top",
          end: "bottom top",
          onEnter: () => gl.render(scene, orthoCamera),
          onLeave: () => gl.render(scene, perspCamera),
          onEnterBack: () => gl.render(scene, orthoCamera),
          onLeaveBack: () => gl.render(scene, orthoCamera),
        },
      }
    );

    // Responsive camera positions
    const positions = {
      hero: { y: 0, z: isMobile ? 7 : 5 },
      section2: { y: -100, z: isMobile ? 15 : 10 },
      section3: { y: -150, z: isMobile ? 7 : 5 },
      section7: { y: -350, z: isMobile ? 7 : 5 },
    };

    // Create master timeline with section-based triggers
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#hero",
        endTrigger: "#contact-us", // Last section
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
        markers: false, // Set to true for debugging
      },
    });

    // Hero Section - Initial position (both cameras)
    tl.addLabel("hero")
      .to([perspCamera.position, orthoCamera.position], {
        y: positions.hero.y,
        z: positions.hero.z,
        x: 0,
        duration: 1,
        ease: "power1.inOut",
      });

    // Section2 - Iceberg scene (both cameras)
    // tl.addLabel("section2")
    //   .to([perspCamera.position, orthoCamera.position], {
    //     y: positions.section2.y,
    //     z: positions.section2.z,
    //     x: 0,
    //     duration: 2,
    //     ease: "power2.inOut",
    //   });

    // Section3 - Earth & Moon scene (both cameras)
    tl.addLabel("section3")
      .to([perspCamera.position, orthoCamera.position], {
        y: positions.section3.y,
        z: positions.section3.z,
        x: 0,
        duration: 2,
        ease: "power2.inOut",
      });

    // Sections 4-6 - Hold at Earth position (both cameras)
    tl.addLabel("section4")
      .to([perspCamera.position, orthoCamera.position], {
        y: positions.section3.y,
        z: positions.section3.z,
        x: 0,
        duration: 3,
        ease: "none",
      });

    // Section7 - Lunar landscape (both cameras)
    tl.addLabel("section7")
      .to([perspCamera.position, orthoCamera.position], {
        y: positions.section7.y,
        z: positions.section7.z,
        x: 0,
        duration: 2,
        ease: "power2.inOut",
      });

    // Sections 8-12 - Hold at Lunar position (both cameras)
    tl.addLabel("section8")
      .to([perspCamera.position, orthoCamera.position], {
        y: positions.section7.y,
        z: positions.section7.z,
        x: 0,
        duration: 5,
        ease: "none",
      });

    // Individual section-based camera look-at animations (both cameras)
    // Hero
    gsap.to(
      {},
      {
        scrollTrigger: {
          trigger: "#hero",
          start: "top top",
          end: "bottom top",
          scrub: 1,
          onUpdate: () => {
            perspCamera.lookAt(0, 0, 0);
            orthoCamera.lookAt(0, 0, 0);
          },
        },
      }
    );

    // Section2 - Iceberg
    gsap.to(
      {},
      {
        scrollTrigger: {
          trigger: "#section2",
          start: "top center",
          end: "bottom center",
          scrub: 1,
          onUpdate: () => {
            perspCamera.lookAt(0, -100, 0);
            orthoCamera.lookAt(0, -100, 0);
          },
        },
      }
    );

    // Section3 - Earth & Moon
    gsap.to(
      {},
      {
        scrollTrigger: {
          trigger: "#section3",
          start: "top center",
          end: "bottom center",
          scrub: 1,
          onUpdate: () => {
            perspCamera.lookAt(0, -150, 0);
            orthoCamera.lookAt(0, -150, 0);
          },
        },
      }
    );

    // Section7
    gsap.to(
      {},
      {
        scrollTrigger: {
          trigger: "#section7",
          start: "top center",
          end: "bottom center",
          scrub: 1,
          onUpdate: () => {
            perspCamera.lookAt(0, -350, 0);
            orthoCamera.lookAt(0, -350, 0);
          },
        },
      }
    );
  }, [isMobile, gl, scene]);

  return null;
}

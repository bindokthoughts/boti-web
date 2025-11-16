"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import * as THREE from "three";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * HolographicGrid - Cyberpunk-style grid with holographic effects
 * Creates a dynamic wireframe grid that warps with scroll
 */
export default function HolographicGrid() {
  const gridRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  
  // Custom shader for holographic effect
  const vertexShader = `
    varying vec2 vUv;
    varying vec3 vPosition;
    uniform float time;
    uniform float wave;
    
    void main() {
      vUv = uv;
      vPosition = position;
      
      vec3 pos = position;
      float waveEffect = sin(pos.x * 2.0 + time) * cos(pos.y * 2.0 + time) * wave;
      pos.z += waveEffect * 0.5;
      
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `;
  
  const fragmentShader = `
    varying vec2 vUv;
    varying vec3 vPosition;
    uniform float time;
    uniform float opacity;
    
    void main() {
      // Grid lines
      vec2 grid = abs(fract(vUv * 20.0 - 0.5) - 0.5) / fwidth(vUv * 20.0);
      float line = min(grid.x, grid.y);
      
      // PRIMARY_ACCENT #14E3C9 to HIGHLIGHT #7CF7E4
      vec3 color1 = vec3(0.078, 0.890, 0.788); // PRIMARY_ACCENT
      vec3 color2 = vec3(0.486, 0.969, 0.894); // HIGHLIGHT
      vec3 color = mix(color1, color2, vUv.y + sin(time * 0.5) * 0.3);
      
      // Glow effect
      float glow = 1.0 - smoothstep(0.0, 0.05, line);
      
      // Scanline effect
      float scanline = sin(vUv.y * 100.0 + time * 2.0) * 0.1 + 0.9;
      
      gl_FragColor = vec4(color * glow * scanline, glow * opacity);
    }
  `;
  
  const shaderMaterial = new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms: {
      time: { value: 0 },
      wave: { value: 0 },
      opacity: { value: 0.6 },
    },
    transparent: true,
    side: THREE.DoubleSide,
    wireframe: false,
  });
  
  useFrame((state) => {
    if (!gridRef.current || !materialRef.current) return;
    
    materialRef.current.uniforms.time.value = state.clock.getElapsedTime();
  });
  
  useGSAP(() => {
    if (!gridRef.current || !materialRef.current) return;
    
    // Wave effect on scroll
    gsap.to(materialRef.current.uniforms.wave, {
      value: 3,
      scrollTrigger: {
        trigger: "#section2",
        start: "top center",
        end: "bottom center",
        scrub: 1,
      },
    });
    
    // Fade out
    gsap.to(materialRef.current.uniforms.opacity, {
      value: 0,
      scrollTrigger: {
        trigger: "#section3",
        start: "top center",
        end: "center center",
        scrub: 1,
      },
    });
    
    // Position animation
    gsap.to(gridRef.current.position, {
      y: -120,
      z: -10,
      scrollTrigger: {
        trigger: "#section2",
        start: "top bottom",
        end: "bottom top",
        scrub: 2,
      },
    });
  }, []);
  
  return (
    <mesh ref={gridRef} position={[0, -10, -5]} rotation={[-Math.PI / 3, 0, 0]}>
      <planeGeometry args={[40, 40, 40, 40]} />
      <primitive object={shaderMaterial} ref={materialRef} attach="material" />
    </mesh>
  );
}

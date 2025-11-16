"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import * as THREE from "three";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * PortalEffect - Creates a dimensional portal effect
 * Advanced shader-based portal with swirling particles
 */
export default function PortalEffect() {
  const portalRef = useRef<THREE.Mesh>(null);
  const ringRefs = useRef<THREE.Mesh[]>([]);
  
  // Portal shader
  const vertexShader = `
    varying vec2 vUv;
    varying vec3 vPosition;
    
    void main() {
      vUv = uv;
      vPosition = position;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `;
  
  const fragmentShader = `
    varying vec2 vUv;
    uniform float time;
    
    // Noise function
    float random(vec2 st) {
      return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
    }
    
    void main() {
      vec2 center = vUv - 0.5;
      float dist = length(center);
      float angle = atan(center.y, center.x);
      
      // Spiral pattern
      float spiral = sin(angle * 5.0 + time * 2.0 - dist * 10.0) * 0.5 + 0.5;
      
      // Vortex effect
      vec2 vortexUv = vec2(
        vUv.x + sin(angle + time) * dist * 0.3,
        vUv.y + cos(angle + time) * dist * 0.3
      );
      
      // Color gradient
      vec3 color1 = vec3(0.1, 0.3, 0.9); // Deep blue
      vec3 color2 = vec3(0.9, 0.2, 0.7); // Pink
      vec3 color3 = vec3(0.2, 0.9, 0.9); // Cyan
      
      vec3 color = mix(color1, color2, spiral);
      color = mix(color, color3, sin(time + dist * 5.0) * 0.5 + 0.5);
      
      // Edge glow
      float edge = 1.0 - smoothstep(0.3, 0.5, dist);
      
      // Center darkness
      float centerDark = smoothstep(0.0, 0.2, dist);
      
      gl_FragColor = vec4(color * edge * centerDark, edge);
    }
  `;
  
  const portalMaterial = new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms: {
      time: { value: 0 },
    },
    transparent: true,
    side: THREE.DoubleSide,
    blending: THREE.AdditiveBlending,
  });
  
  useFrame((state) => {
    if (!portalRef.current) return;
    
    const time = state.clock.getElapsedTime();
    portalMaterial.uniforms.time.value = time;
    
    // Rotate rings
    ringRefs.current.forEach((ring, i) => {
      if (ring) {
        ring.rotation.z = time * (i % 2 === 0 ? 1 : -1) * 0.5;
        ring.scale.setScalar(1 + Math.sin(time * 2 + i) * 0.1);
      }
    });
  });
  
  useGSAP(() => {
    if (!portalRef.current) return;
    
    // Portal appears at Section7
    gsap.fromTo(
      portalRef.current.scale,
      { x: 0, y: 0, z: 0 },
      {
        x: 1,
        y: 1,
        z: 1,
        scrollTrigger: {
          trigger: "#section7",
          start: "top center",
          end: "center center",
          scrub: 1,
        },
      }
    );
    
    // Portal expands
    gsap.to(portalRef.current.scale, {
      x: 3,
      y: 3,
      z: 1,
      scrollTrigger: {
        trigger: "#section8",
        start: "top center",
        end: "bottom center",
        scrub: 1,
      },
    });
    
    // Portal rotates
    gsap.to(portalRef.current.rotation, {
      y: Math.PI * 2,
      scrollTrigger: {
        trigger: "#section9",
        start: "top center",
        end: "bottom center",
        scrub: 2,
      },
    });
  }, []);
  
  return (
    <group position={[0, -350, 0]}>
      {/* Main portal */}
      <mesh ref={portalRef} position={[0, 0, 0]}>
        <circleGeometry args={[3, 64]} />
        <primitive object={portalMaterial} attach="material" />
      </mesh>
      
      {/* Orbiting rings */}
      {[0, 1, 2, 3].map((i) => (
        <mesh
          key={i}
          ref={(el) => { if (el) ringRefs.current[i] = el; }}
          position={[0, 0, i * 0.1 - 0.2]}
        >
          <torusGeometry args={[2 + i * 0.5, 0.05, 16, 100]} />
          <meshStandardMaterial
            color={new THREE.Color().setHSL(i * 0.2, 1, 0.5)}
            emissive={new THREE.Color().setHSL(i * 0.2, 1, 0.3)}
            emissiveIntensity={2}
            transparent
            opacity={0.7}
          />
        </mesh>
      ))}
    </group>
  );
}

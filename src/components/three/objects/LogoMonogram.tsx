
"use client";

import React, { useMemo } from 'react';
import { Canvas, ThreeElements, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

interface LogoMonogramProps extends Omit<ThreeElements['mesh'], 'scale'> {
  scale?: number | [number, number, number];
  position?: [number, number, number];
  radius?: number;
  holeRadius?: number;
  color?: string;
  standalone?: boolean;
  responsive?: boolean;
}

const createHexagonVertices = (radius: number, offsetAngle: number = 0): [number, number][] => {
  const vertices: [number, number][] = [];
  for (let i = 0; i < 6; i++) {
    const angle = (i * Math.PI) / 3 + offsetAngle;
    vertices.push([radius * Math.cos(angle), radius * Math.sin(angle)]);
  }
  return vertices;
};

const ResponsiveLogoMesh: React.FC<LogoMonogramProps> = ({ 
  scale = 1, 
  position = [0, 0, 0],
  radius = 1,
  holeRadius = 0.5,
  color = '#ffffff',
  responsive = true,
  ...props 
}) => {
  // Use Three.js viewport for responsive scaling
  const { viewport } = useThree();

  // Calculate responsive scale based on viewport
  const responsiveScale = useMemo(() => {
    if (!responsive) return scale;

    // Base scale calculation - adjust these values to fine-tune responsiveness
    const baseViewportWidth = 10; // Reference viewport width
    const scaleFactor = viewport.width / baseViewportWidth;

    // Apply limits to prevent too small or too large scaling
    const minScale = 0.3;
    const maxScale = 3;
    const clampedScale = Math.max(minScale, Math.min(maxScale, scaleFactor));

    // Apply to existing scale
    if (Array.isArray(scale)) {
      return [scale[0] * clampedScale, scale[1] * clampedScale, scale[2] * clampedScale] as [number, number, number];
    }
    return scale * clampedScale;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [viewport.width, scale, responsive]);

  // Define the 12 ring colors from innermost to outermost
  const ringColors = [
    '#3FE7F9', // outermost
    '#39D6F6',
    '#34C6F4',
    '#2EB5F1',
    '#28A4EE',
    '#2393EB',
    '#1D83E9',
    '#1872E6',
    '#1261E3',
    '#0C50E0',
    '#0740DE',
    '#012FDB' // innermost
  ];

  const geometries = useMemo(() => {
    const geoms: THREE.ShapeGeometry[] = [];

    // Create outer hexagon shell
    const outerShape = new THREE.Shape();
    const outerVertices = createHexagonVertices(radius, Math.PI / 4);
    outerShape.moveTo(outerVertices[0][0], outerVertices[0][1]);
    outerVertices.slice(1).forEach(([x, y]) => outerShape.lineTo(x, y));
    outerShape.closePath();

    // Create the largest inner hole
    const holePath = new THREE.Path();
    const innerVertices = createHexagonVertices(holeRadius, Math.PI / 4);
    holePath.moveTo(innerVertices[0][0], innerVertices[0][1]);
    innerVertices.slice(1).forEach(([x, y]) => holePath.lineTo(x, y));
    holePath.closePath();
    outerShape.holes.push(holePath);

    geoms.push(new THREE.ShapeGeometry(outerShape));

    // Create 12 hexagonal rings inside the hole
    const ringStep = holeRadius / 12;

    for (let i = 0; i < 12; i++) {
      const outerRingRadius = holeRadius - (i * ringStep);
      const innerRingRadius = holeRadius - ((i + 1) * ringStep);

      // Create ring shape (hexagon with hexagonal hole)
      const ringShape = new THREE.Shape();
      const ringOuterVertices = createHexagonVertices(outerRingRadius, Math.PI / 4);
      ringShape.moveTo(ringOuterVertices[0][0], ringOuterVertices[0][1]);
      ringOuterVertices.slice(1).forEach(([x, y]) => ringShape.lineTo(x, y));
      ringShape.closePath();

      // Add inner hole (except for the innermost ring)
      if (innerRingRadius > 0.01) {
        const ringHolePath = new THREE.Path();
        const ringInnerVertices = createHexagonVertices(innerRingRadius, Math.PI / 4);
        ringHolePath.moveTo(ringInnerVertices[0][0], ringInnerVertices[0][1]);
        ringInnerVertices.slice(1).forEach(([x, y]) => ringHolePath.lineTo(x, y));
        ringHolePath.closePath();
        ringShape.holes.push(ringHolePath);
      }

      geoms.push(new THREE.ShapeGeometry(ringShape));
    }

    return geoms;
  }, [radius, holeRadius]);

  const materials = useMemo(() => 
    [
      // Outer hexagon material
      new THREE.MeshBasicMaterial({
        color: color,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 1,
      }),
      // Ring materials with specified colors
      ...ringColors.map(ringColor => 
        new THREE.MeshBasicMaterial({
          color: ringColor,
          side: THREE.DoubleSide,
          transparent: true,
          opacity: 1,
        })
      )
      // eslint-disable-next-line react-hooks/exhaustive-deps
    ], [color]
  );

  return (
    <group>
      {/* Outer hexagon */}
      <mesh 
        geometry={geometries[0]} 
        material={materials[0]} 
        scale={responsiveScale} 
        position={position} 
        {...props} 
      />
      {/* 12 hexagonal rings */}
      {geometries.slice(1).map((geometry, index) => (
        <mesh
          key={index}
          geometry={geometry}
          material={materials[index + 1]}
          scale={responsiveScale}
          position={position}
          {...props}
        />
      ))}
    </group>
  );
};

const LogoMonogram: React.FC<LogoMonogramProps> = ({ 
  standalone = false,
  ...props 
}) => {

  if (standalone) {
    return (
      <div style={{ width: '100%', height: '100%' }}>
        <Canvas 
          camera={{ position: [0, 0, 8], fov: 75 }}
          style={{ width: '100%', height: '100%' }}
        >
          <ambientLight intensity={1} />
          <ResponsiveLogoMesh {...props} />
          <OrbitControls />
        </Canvas>
      </div>
    );
  }

  return <ResponsiveLogoMesh {...props} />;
};

export default LogoMonogram;

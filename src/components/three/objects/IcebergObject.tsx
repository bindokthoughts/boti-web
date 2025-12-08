/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React from 'react'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'

interface IcebergProps {
  scale?: [number, number, number];
  position?: [number, number, number];
  rotation?: [number, number, number];
}

export function IcebergObject({ scale, position, rotation }: IcebergProps) {
  const { nodes, materials } = useGLTF('/models/frosted_iceberg_final.glb') as unknown as {
    nodes: {
      iceberg: THREE.Mesh;
    };
    materials: {
      'Frosted Ice': THREE.Material;
    };
  };

  // Enhance material to look like ice
  const iceMaterial = materials['Frosted Ice'].clone();
  if (iceMaterial instanceof THREE.MeshStandardMaterial || iceMaterial instanceof THREE.MeshPhysicalMaterial) {
    iceMaterial.transparent = true;
    iceMaterial.opacity = 0.85;
    iceMaterial.roughness = 0.2;
    iceMaterial.metalness = 0.1;
    iceMaterial.envMapIntensity = 1.5;
    if ('transmission' in iceMaterial) {
      iceMaterial.transmission = 0.3;
    }
    if ('ior' in iceMaterial) {
      iceMaterial.ior = 1.31; // Ice refractive index
    }
  }

  return (
     <mesh
        castShadow
        receiveShadow
        geometry={nodes.iceberg.geometry}
        material={iceMaterial}
        position={position || [0, -2, 0]}
        scale={scale || [1, 1, 1]}
        rotation={rotation || [0, 0, 0]} 
      />
  )
}

useGLTF.preload('/models/frosted_iceberg_final.glb')
'use client'

import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Wireframe } from '@react-three/drei'
import * as THREE from 'three'

function RotatingObject() {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.15
      meshRef.current.rotation.y += delta * 0.25
    }
  })

  return (
    <mesh ref={meshRef}>
      <icosahedronGeometry args={[1.8, 1]} />
      <Wireframe
        simplify={false}
        fill="transparent"
        fillOpacity={0}
        stroke="#1C1C1C"
        strokeOpacity={0.4}
        thickness={0.004}
        squeeze={false}
      />
    </mesh>
  )
}

export default function HeroPlaceholder() {
  return (
    <div className="absolute inset-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.5} />
        <RotatingObject />
      </Canvas>
    </div>
  )
}

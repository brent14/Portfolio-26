'use client'

import { useEffect, useRef, useCallback } from 'react'
import { Canvas, useThree, useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'

const SPOT_VARS = [
  '--color-spot-1',
  '--color-spot-2',
  '--color-spot-3',
  '--color-spot-4',
  '--color-spot-5',
]

function getCSSColor(varName: string): THREE.Color {
  const raw = getComputedStyle(document.documentElement)
    .getPropertyValue(varName)
    .trim()
  return new THREE.Color(raw)
}

// ─── Shared vertex shader ────────────────────────────────────────────────────
const VERT = /* glsl */`
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

// ─── Fragment shaders — one per mesh (traversal order matches GLB node order)
// [0] Background  [1] Orange  [2] Yellow_Top  [3] Yellow_Mid  [4] Yellow_Bot
const FRAGS = [

  // Background — solid color field, full opacity
  /* glsl */`
    uniform vec3 uColor;
    void main() {
      gl_FragColor = vec4(uColor, 1.0);
    }
  `,

  // Orange — uniform translucency, see-through to background
  /* glsl */`
    uniform vec3 uColor;
    void main() {
      gl_FragColor = vec4(uColor, 0.6);
    }
  `,

  // Yellow_Top — radial vignette: opaque center, fades to transparent at edges
  /* glsl */`
    uniform vec3 uColor;
    varying vec2 vUv;
    void main() {
      float dist = length(vUv - vec2(0.5)) * 2.0;
      float alpha = 1.0 - smoothstep(0.1, 0.9, dist);
      alpha = clamp(alpha, 0.25, 0.85);
      gl_FragColor = vec4(uColor, alpha);
    }
  `,

  // Yellow_Mid — vertical gradient: opaque bottom, transparent top
  /* glsl */`
    uniform vec3 uColor;
    varying vec2 vUv;
    void main() {
      float alpha = mix(0.75, 0.2, vUv.y);
      gl_FragColor = vec4(uColor, alpha);
    }
  `,

  // Yellow_Bot — horizontal gradient: opaque left, transparent right
  /* glsl */`
    uniform vec3 uColor;
    varying vec2 vUv;
    void main() {
      float alpha = mix(0.8, 0.15, vUv.x);
      gl_FragColor = vec4(uColor, alpha);
    }
  `,
]

// ─── Model ───────────────────────────────────────────────────────────────────
function AlbersModel() {
  const { scene } = useGLTF('/models/albers.glb')
  const { camera } = useThree()
  const groupRef = useRef<THREE.Group>(null)
  const meshesRef = useRef<THREE.Mesh[]>([])
  const mousePos = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mousePos.current.x = (e.clientX / window.innerWidth) * 2 - 1
      mousePos.current.y = -(e.clientY / window.innerHeight) * 2 + 1
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  const applyColors = useCallback(() => {
    meshesRef.current.forEach((mesh, i) => {
      const mat = mesh.material as THREE.ShaderMaterial
      if (mat.uniforms?.uColor) {
        mat.uniforms.uColor.value.copy(getCSSColor(SPOT_VARS[i % SPOT_VARS.length]))
      }
    })
  }, [])

  useEffect(() => {
    const meshes: THREE.Mesh[] = []

    scene.traverse((child) => {
      const mesh = child as THREE.Mesh
      if (!mesh.isMesh) return

      const idx = meshes.length
      const frag = FRAGS[idx] ?? FRAGS[FRAGS.length - 1]

      mesh.material = new THREE.ShaderMaterial({
        uniforms: {
          uColor: { value: getCSSColor(SPOT_VARS[idx % SPOT_VARS.length]) },
        },
        vertexShader: VERT,
        fragmentShader: frag,
        transparent: idx > 0,
        depthWrite: idx === 0,
        side: THREE.DoubleSide,
      })

      meshes.push(mesh)
    })

    meshesRef.current = meshes

    // Push each inner rectangle toward the camera
    const zOffsets: Record<string, number> = {
      Orange:     1.5,
      Yellow_Top: 2.5,
      Yellow_Mid: 3.5,
      Yellow_Bot: 4.5,
    }
    for (const [name, z] of Object.entries(zOffsets)) {
      const obj = scene.getObjectByName(name)
      if (obj) obj.position.z += z
    }

    // Scale up the yellow rectangles
    const yellowScale = 1.5
    for (const name of ['Yellow_Top', 'Yellow_Mid', 'Yellow_Bot']) {
      const obj = scene.getObjectByName(name)
      if (obj) obj.scale.setScalar(yellowScale)
    }

    // Fit camera to show all rectangles
    const box = new THREE.Box3().setFromObject(scene)
    const center = box.getCenter(new THREE.Vector3())
    const size = box.getSize(new THREE.Vector3())
    const maxDim = Math.max(size.x, size.y, size.z)
    const fov = (camera as THREE.PerspectiveCamera).fov * (Math.PI / 180)
    const distance = (maxDim / 2) / Math.tan(fov / 2)

    camera.position.set(center.x, center.y, center.z + distance * 1.4)
    camera.lookAt(center)
    camera.updateProjectionMatrix()

    // Re-apply colors when palette toggles
    const observer = new MutationObserver(applyColors)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    })

    return () => observer.disconnect()
  }, [scene, applyColors, camera])

  useFrame(() => {
    if (!groupRef.current) return
    const { x, y } = mousePos.current
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      x * Math.PI * 0.18,
      0.05
    )
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      -y * Math.PI * 0.1,
      0.05
    )
  })

  return (
    <group ref={groupRef}>
      {/* Static base rotation — portrait → landscape to match wide viewport */}
      <group rotation={[0, 0, Math.PI / 2]} scale={2}>
        <primitive object={scene} />
      </group>
    </group>
  )
}

useGLTF.preload('/models/albers.glb')

// ─── Scene ───────────────────────────────────────────────────────────────────
export default function AlbersScene() {
  return (
    <div className="absolute inset-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
      >
        <AlbersModel />
      </Canvas>
    </div>
  )
}

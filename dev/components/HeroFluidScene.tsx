'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import {
  vertexShader,
  fluidFragmentShader,
  displayFragmentShader,
} from '@/components/heroFluidShaders'

type FluidUniforms = {
  uPrevTrails: THREE.IUniform<THREE.Texture | null>
  uMouse: THREE.IUniform<THREE.Vector2>
  uPrevMouse: THREE.IUniform<THREE.Vector2>
  uResolution: THREE.IUniform<THREE.Vector2>
  uDecay: THREE.IUniform<number>
  uIsMoving: THREE.IUniform<boolean>
  uWarpScale: THREE.IUniform<number>
  uWarpStrength: THREE.IUniform<number>
  uTime: THREE.IUniform<number>
  uBrushSize: THREE.IUniform<number>
  uBrushIntensity: THREE.IUniform<number>
}

type DisplayUniforms = {
  uFluid: THREE.IUniform<THREE.Texture | null>
  uFluidB: THREE.IUniform<THREE.Texture | null>
  uTopTexture: THREE.IUniform<THREE.Texture>
  uMiddleTexture: THREE.IUniform<THREE.Texture>
  uVideoTexture: THREE.IUniform<THREE.Texture>
  uResolution: THREE.IUniform<THREE.Vector2>
  uDpr: THREE.IUniform<number>
  uTopTextureSize: THREE.IUniform<THREE.Vector2>
  uMiddleTextureSize: THREE.IUniform<THREE.Vector2>
  uVideoTextureSize: THREE.IUniform<THREE.Vector2>
  uTime: THREE.IUniform<number>
  uNoiseScale: THREE.IUniform<number>
  uNoiseAmount: THREE.IUniform<number>
}

const SIM_SIZE = 500

export default function HeroFluidScene() {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const containerEl = containerRef.current
    const canvasEl = canvasRef.current
    if (!containerEl || !canvasEl) return
    const container: HTMLDivElement = containerEl
    const canvas: HTMLCanvasElement = canvasEl

    // ─── Renderer ──────────────────────────────────────────────
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      precision: 'highp',
    })
    const initialWidth = container.clientWidth
    const initialHeight = container.clientHeight
    renderer.setSize(initialWidth, initialHeight, false)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

    // ─── Scenes + camera ───────────────────────────────────────
    const scene = new THREE.Scene()
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1)

    // ─── State ─────────────────────────────────────────────────
    const mouse = new THREE.Vector2(0.5, 0.5)
    const prevMouse = new THREE.Vector2(0.5, 0.5)
    let isMoving = false
    let lastMoveTime = 0

    // ─── Ping-pong render targets ──────────────────────────────
    const rtOptions: THREE.RenderTargetOptions = {
      minFilter: THREE.LinearFilter,
      magFilter: THREE.LinearFilter,
      format: THREE.RGBAFormat,
      type: THREE.FloatType,
    }
    const pingPongTargets: [THREE.WebGLRenderTarget, THREE.WebGLRenderTarget] = [
      new THREE.WebGLRenderTarget(SIM_SIZE, SIM_SIZE, rtOptions),
      new THREE.WebGLRenderTarget(SIM_SIZE, SIM_SIZE, rtOptions),
    ]
    const pingPongTargetsB: [THREE.WebGLRenderTarget, THREE.WebGLRenderTarget] = [
      new THREE.WebGLRenderTarget(SIM_SIZE, SIM_SIZE, rtOptions),
      new THREE.WebGLRenderTarget(SIM_SIZE, SIM_SIZE, rtOptions),
    ]
    let currentTarget = 0
    let currentTargetB = 0

    // ─── Texture size trackers ─────────────────────────────────
    const topTextureSize = new THREE.Vector2(1, 1)
    const middleTextureSize = new THREE.Vector2(1, 1)
    const videoTextureSize = new THREE.Vector2(1, 1)

    // ─── Matrix rain (bottom layer, `uVideoTexture` slot) ─────
    const matrix = createMatrixTexture(middleTextureSize)

    // ─── Video textures ────────────────────────────────────────
    const top = createVideoTexture('/brent_1.mp4', topTextureSize)
    const middle = createVideoTexture('/brent_2.mp4', videoTextureSize)

    // ─── Fluid A — wide brush, slower decay ────────────────────
    const trailsMaterial = new THREE.ShaderMaterial({
      uniforms: {
        uPrevTrails: { value: null },
        uMouse: { value: mouse },
        uPrevMouse: { value: prevMouse },
        uResolution: { value: new THREE.Vector2(SIM_SIZE, SIM_SIZE) },
        uDecay: { value: 0.985 },
        uIsMoving: { value: false },
        uWarpScale: { value: 2.0 },
        uWarpStrength: { value: 0.035 },
        uTime: { value: 0.0 },
        uBrushSize: { value: 0.14 },
        uBrushIntensity: { value: 0.25 },
      } satisfies FluidUniforms,
      vertexShader,
      fragmentShader: fluidFragmentShader,
    })
    const trailsUniforms = trailsMaterial.uniforms as FluidUniforms

    // ─── Fluid B — tight brush, faster decay ───────────────────
    const trailsMaterialB = new THREE.ShaderMaterial({
      uniforms: {
        uPrevTrails: { value: null },
        uMouse: { value: mouse },
        uPrevMouse: { value: prevMouse },
        uResolution: { value: new THREE.Vector2(SIM_SIZE, SIM_SIZE) },
        uDecay: { value: 0.96 },
        uIsMoving: { value: false },
        uWarpScale: { value: 4.0 },
        uWarpStrength: { value: 0.015 },
        uTime: { value: 0.0 },
        uBrushSize: { value: 0.07 },
        uBrushIntensity: { value: 0.35 },
      } satisfies FluidUniforms,
      vertexShader,
      fragmentShader: fluidFragmentShader,
    })
    const trailsUniformsB = trailsMaterialB.uniforms as FluidUniforms

    // ─── Display material ──────────────────────────────────────
    // Note: deliberately mismatched slot names, per reference —
    // `uMiddleTexture` ← brent_2.mp4 (visual middle)
    // `uVideoTexture`  ← matrix rain (bottom)
    const displayMaterial = new THREE.ShaderMaterial({
      uniforms: {
        uFluid: { value: null },
        uFluidB: { value: null },
        uTopTexture: { value: top.texture },
        uMiddleTexture: { value: middle.texture },
        uVideoTexture: { value: matrix.texture },
        uResolution: { value: new THREE.Vector2(initialWidth, initialHeight) },
        uDpr: { value: window.devicePixelRatio },
        uTopTextureSize: { value: topTextureSize },
        uMiddleTextureSize: { value: videoTextureSize },
        uVideoTextureSize: { value: middleTextureSize },
        uTime: { value: 0.0 },
        uNoiseScale: { value: 2.0 },
        uNoiseAmount: { value: 0.18 },
      } satisfies DisplayUniforms,
      vertexShader,
      fragmentShader: displayFragmentShader,
    })
    const displayUniforms = displayMaterial.uniforms as DisplayUniforms

    // ─── Geometry + meshes ─────────────────────────────────────
    const planeGeometry = new THREE.PlaneGeometry(2, 2)
    const displayMesh = new THREE.Mesh(planeGeometry, displayMaterial)
    scene.add(displayMesh)

    const simMesh = new THREE.Mesh(planeGeometry, trailsMaterial)
    const simScene = new THREE.Scene()
    simScene.add(simMesh)

    const simMeshB = new THREE.Mesh(planeGeometry, trailsMaterialB)
    const simSceneB = new THREE.Scene()
    simSceneB.add(simMeshB)

    // ─── Clear ping-pong targets once ──────────────────────────
    ;[
      pingPongTargets[0],
      pingPongTargets[1],
      pingPongTargetsB[0],
      pingPongTargetsB[1],
    ].forEach((t) => {
      renderer.setRenderTarget(t)
      renderer.clear()
    })
    renderer.setRenderTarget(null)

    // ─── Event handlers ────────────────────────────────────────
    function updatePointer(clientX: number, clientY: number) {
      const rect = canvas.getBoundingClientRect()
      if (
        clientX < rect.left ||
        clientX > rect.right ||
        clientY < rect.top ||
        clientY > rect.bottom
      ) {
        isMoving = false
        return
      }
      prevMouse.copy(mouse)
      mouse.x = (clientX - rect.left) / rect.width
      mouse.y = 1 - (clientY - rect.top) / rect.height
      isMoving = true
      lastMoveTime = performance.now()
    }

    const onMouseMove = (event: MouseEvent) => {
      updatePointer(event.clientX, event.clientY)
    }

    const onTouchMove = (event: TouchEvent) => {
      if (event.touches.length === 0) return
      const touch = event.touches[0]
      const rect = canvas.getBoundingClientRect()
      if (
        touch.clientX >= rect.left &&
        touch.clientX <= rect.right &&
        touch.clientY >= rect.top &&
        touch.clientY <= rect.bottom
      ) {
        event.preventDefault()
      }
      updatePointer(touch.clientX, touch.clientY)
    }

    const handleResize = () => {
      const width = container.clientWidth
      const height = container.clientHeight
      renderer.setSize(width, height, false)
      displayUniforms.uResolution.value.set(width, height)
      displayUniforms.uDpr.value = window.devicePixelRatio
    }

    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('touchmove', onTouchMove, { passive: false })

    const resizeObserver = new ResizeObserver(handleResize)
    resizeObserver.observe(container)

    // ─── Animation loop ────────────────────────────────────────
    let rafId = 0
    const animate = () => {
      rafId = requestAnimationFrame(animate)

      if (isMoving && performance.now() - lastMoveTime > 50) {
        isMoving = false
      }

      matrix.draw()

      const time = performance.now() / 1000.0
      displayUniforms.uTime.value = time
      trailsUniforms.uTime.value = time
      trailsUniformsB.uTime.value = time

      // Sim A
      const prevTargetA = pingPongTargets[currentTarget]
      currentTarget = (currentTarget + 1) % 2
      const currentTargetA = pingPongTargets[currentTarget]

      trailsUniforms.uPrevTrails.value = prevTargetA.texture
      trailsUniforms.uMouse.value.copy(mouse)
      trailsUniforms.uPrevMouse.value.copy(prevMouse)
      trailsUniforms.uIsMoving.value = isMoving

      renderer.setRenderTarget(currentTargetA)
      renderer.render(simScene, camera)

      // Sim B
      const prevTargetB = pingPongTargetsB[currentTargetB]
      currentTargetB = (currentTargetB + 1) % 2
      const currentTargetBRT = pingPongTargetsB[currentTargetB]

      trailsUniformsB.uPrevTrails.value = prevTargetB.texture
      trailsUniformsB.uMouse.value.copy(mouse)
      trailsUniformsB.uPrevMouse.value.copy(prevMouse)
      trailsUniformsB.uIsMoving.value = isMoving

      renderer.setRenderTarget(currentTargetBRT)
      renderer.render(simSceneB, camera)

      // Display
      displayUniforms.uFluid.value = currentTargetA.texture
      displayUniforms.uFluidB.value = currentTargetBRT.texture

      renderer.setRenderTarget(null)
      renderer.render(scene, camera)
    }
    animate()

    // ─── Cleanup ───────────────────────────────────────────────
    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('touchmove', onTouchMove)
      resizeObserver.disconnect()

      top.dispose()
      middle.dispose()
      matrix.dispose()

      pingPongTargets.forEach((t) => t.dispose())
      pingPongTargetsB.forEach((t) => t.dispose())

      planeGeometry.dispose()
      trailsMaterial.dispose()
      trailsMaterialB.dispose()
      displayMaterial.dispose()

      renderer.dispose()
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 overflow-hidden"
    >
      <canvas
        ref={canvasRef}
        className="block w-full h-full"
      />
    </div>
  )
}

// ─── Matrix rain CanvasTexture ───────────────────────────────────
function createMatrixTexture(textureSizeVector: THREE.Vector2) {
  const w = 1920
  const h = 1080
  textureSizeVector.set(w, h)

  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%&?'
  const palette = ['#f5e842', '#b8d44a', '#7a8042', '#3e6d2c', '#84c2d8']

  type Cell = {
    active: boolean
    char: string
    color: string
    phase: number
    ttl: number
  }
  type LayerDef = {
    fontSize: number
    colWidth: number
    rowHeight: number
    interval: number
    alpha: number
    amplitude: number
    speed: number
  }
  type Layer = LayerDef & {
    cols: number
    rows: number
    grid: Cell[][]
    ctx: CanvasRenderingContext2D
    canvas: HTMLCanvasElement
  }

  const layerDefs: LayerDef[] = [
    { fontSize: 14, colWidth: 26, rowHeight: 28, interval: 4, alpha: 0.22, amplitude: 6, speed: 0.6 },
    { fontSize: 24, colWidth: 44, rowHeight: 48, interval: 3, alpha: 0.55, amplitude: 12, speed: 0.96 },
    { fontSize: 36, colWidth: 64, rowHeight: 70, interval: 2, alpha: 0.88, amplitude: 20, speed: 1.44 },
  ]

  const layers: Layer[] = layerDefs.map((def) => {
    const cols = Math.floor(w / def.colWidth)
    const rows = Math.floor(h / def.rowHeight)

    const grid: Cell[][] = Array.from({ length: cols }, () =>
      Array.from({ length: rows }, () => ({
        active: Math.random() < 0.6,
        char: chars[Math.floor(Math.random() * chars.length)],
        color: palette[Math.floor(Math.random() * palette.length)],
        phase: Math.random() * Math.PI * 2,
        ttl: Math.floor(40 + Math.random() * 100),
      }))
    )

    const offscreen = document.createElement('canvas')
    offscreen.width = w
    offscreen.height = h
    const ctx = offscreen.getContext('2d')!

    return { ...def, cols, rows, grid, ctx, canvas: offscreen }
  })

  const canvas = document.createElement('canvas')
  canvas.width = w
  canvas.height = h
  const ctx = canvas.getContext('2d')!

  const texture = new THREE.CanvasTexture(canvas)
  texture.minFilter = THREE.LinearFilter
  texture.magFilter = THREE.LinearFilter

  let frame = 0

  function draw() {
    frame++
    const t = performance.now() / 1000

    layers.forEach((layer) => {
      if (frame % layer.interval !== 0) return

      const { ctx: lctx, fontSize, colWidth, rowHeight, grid, rows, cols, amplitude, speed } = layer

      lctx.clearRect(0, 0, w, h)
      lctx.font = `${fontSize}px 'Tiny5', monospace`
      lctx.textBaseline = 'top'

      for (let col = 0; col < cols; col++) {
        for (let row = 0; row < rows; row++) {
          const cell = grid[col][row]
          if (!cell.active) continue

          cell.ttl--
          if (cell.ttl <= 0) {
            cell.char = chars[Math.floor(Math.random() * chars.length)]
            cell.color = palette[Math.floor(Math.random() * palette.length)]
            cell.ttl = Math.floor(40 + Math.random() * 100)
          }

          const x = col * colWidth
          const baseY = row * rowHeight
          const yOffset = amplitude * Math.sin(t * speed + cell.phase)

          lctx.fillStyle = cell.color
          lctx.fillText(cell.char, x, baseY + yOffset)
        }
      }
    })

    ctx.fillStyle = '#f1f4da'
    ctx.fillRect(0, 0, w, h)

    layers.forEach((layer) => {
      ctx.globalAlpha = layer.alpha
      ctx.drawImage(layer.canvas, 0, 0)
    })

    ctx.globalAlpha = 1.0
    texture.needsUpdate = true
  }

  function dispose() {
    texture.dispose()
  }

  return { texture, draw, dispose }
}

// ─── Video texture + element lifecycle ───────────────────────────
function createVideoTexture(url: string, textureSizeVector: THREE.Vector2) {
  const video = document.createElement('video')
  video.src = url
  video.loop = true
  video.muted = true
  video.playsInline = true
  video.crossOrigin = 'anonymous'

  const onMeta = () => {
    textureSizeVector.set(video.videoWidth, video.videoHeight)
  }
  video.addEventListener('loadedmetadata', onMeta)

  video.play().catch(() => {
    /* autoplay blocked — stays on first frame */
  })

  const texture = new THREE.VideoTexture(video)
  texture.minFilter = THREE.LinearFilter
  texture.magFilter = THREE.LinearFilter

  function dispose() {
    video.removeEventListener('loadedmetadata', onMeta)
    video.pause()
    video.removeAttribute('src')
    video.load()
    texture.dispose()
  }

  return { texture, video, dispose }
}

'use client'

import { useEffect, useRef, useState } from 'react'
import { useHoverBlend } from './HoverBlendProvider'

const SPOT_VARS = ['--color-spot-1', '--color-spot-2', '--color-spot-3', '--color-spot-4', '--color-spot-5']

function readSpotColors(): string[] {
  if (typeof window === 'undefined') return []
  const styles = getComputedStyle(document.documentElement)
  return SPOT_VARS.map(v => styles.getPropertyValue(v).trim()).filter(Boolean)
}

export default function HoverBlend() {
  const { config } = useHoverBlend()
  const {
    blockSize,
    circleSize,
    detectionRadius,
    clusterSize,
    blockLifetime,
    emptyRatio,
    scaleRadius,
    minScale,
    blendMode,
  } = config

  const containerRef = useRef<HTMLDivElement>(null)
  const [paletteKey, setPaletteKey] = useState(0)
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    const sync = () => setIsDark(document.documentElement.classList.contains('palette-dark'))
    sync()
    const observer = new MutationObserver(() => {
      sync()
      setPaletteKey(k => k + 1)
    })
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
    return () => observer.disconnect()
  }, [])

  const effectiveBlendMode = isDark ? 'screen' : blendMode

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const colors = readSpotColors()
    if (colors.length === 0) return

    // Bail on touch-only devices — effect is mouse-driven only
    if (!window.matchMedia('(pointer: fine)').matches) return

    container.innerHTML = ''

    interface Block {
      element: HTMLDivElement
      x: number
      y: number
      highlightEndTime: number
      animSpeed: number
      animOffset: number
    }

    const blocks: Block[] = []
    let mouseX = 0
    let mouseY = 0

    function randomColor() {
      return colors[Math.floor(Math.random() * colors.length)]
    }

    function buildGrid(root: HTMLDivElement, ox: number, oy: number) {
      const cols = Math.ceil((window.innerWidth - ox) / blockSize) + 1
      const rows = Math.ceil((window.innerHeight - oy) / blockSize) + 1

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          if (Math.random() < emptyRatio) continue

          const cx = col * blockSize + ox
          const cy = row * blockSize + oy

          const el = document.createElement('div')
          el.style.cssText = `
            position: absolute;
            width: ${circleSize}px;
            height: ${circleSize}px;
            border-radius: 50%;
            opacity: 0;
            left: ${cx - circleSize / 2}px;
            top: ${cy - circleSize / 2}px;
            background-color: ${randomColor()};
          `

          root.appendChild(el)
          blocks.push({
            element: el,
            x: cx,
            y: cy,
            highlightEndTime: 0,
            animSpeed: 0.3 + Math.random() * 0.5,
            animOffset: Math.random() * Math.PI * 2,
          })
        }
      }
    }

    const half = blockSize / 2
    buildGrid(container, half, half)
    buildGrid(container, half + half, half + half)

    function onMouseMove(e: MouseEvent) {
      mouseX = e.clientX
      mouseY = e.clientY

      let closestBlock: Block | null = null
      let closestDist = Infinity

      for (const block of blocks) {
        const dx = mouseX - block.x
        const dy = mouseY - block.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < closestDist) {
          closestDist = dist
          closestBlock = block
        }
      }

      if (!closestBlock || closestDist > detectionRadius) return

      const now = Date.now()
      closestBlock.element.style.opacity = '1'
      closestBlock.highlightEndTime = now + blockLifetime

      const clusterCount = Math.floor(Math.random() * clusterSize) + 1
      let current = closestBlock
      const active: Block[] = [closestBlock]

      for (let i = 0; i < clusterCount; i++) {
        const neighbors = blocks.filter(n => {
          if (active.includes(n)) return false
          const dx = Math.abs(n.x - current.x)
          const dy = Math.abs(n.y - current.y)
          return dx <= blockSize * 1.5 && dy <= blockSize * 1.5
        })

        if (neighbors.length === 0) break

        const next = neighbors[Math.floor(Math.random() * neighbors.length)]
        next.element.style.opacity = '1'
        next.highlightEndTime = now + blockLifetime + i * 10

        active.push(next)
        current = next
      }
    }

    document.addEventListener('mousemove', onMouseMove)

    let rafId: number

    function tick() {
      const now = Date.now()
      const t = now / 1000

      for (const block of blocks) {
        if (block.highlightEndTime > 0) {
          if (now > block.highlightEndTime) {
            block.element.style.opacity = '0'
            block.element.style.transform = ''
            block.element.style.filter = ''
            block.highlightEndTime = 0
          } else {
            const dx = block.x - mouseX
            const dy = block.y - mouseY
            const dist = Math.sqrt(dx * dx + dy * dy)
            const scalT = Math.min(dist / scaleRadius, 1)
            const scale = 1 - scalT * (1 - minScale)
            block.element.style.transform = `scale(${scale.toFixed(3)})`

            const wave = Math.sin(t * block.animSpeed + block.animOffset)
            const hue = wave * 2.5
            const sat = 100 + wave * 2.5
            block.element.style.filter = `hue-rotate(${hue.toFixed(2)}deg) saturate(${sat.toFixed(1)}%)`
          }
        }
      }

      rafId = requestAnimationFrame(tick)
    }

    rafId = requestAnimationFrame(tick)

    return () => {
      document.removeEventListener('mousemove', onMouseMove)
      cancelAnimationFrame(rafId)
    }
  }, [paletteKey, blockSize, circleSize, detectionRadius, clusterSize, blockLifetime, emptyRatio, scaleRadius, minScale])

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 0,
        mixBlendMode: effectiveBlendMode,
        overflow: 'hidden',
      }}
    />
  )
}

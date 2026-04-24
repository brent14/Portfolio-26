'use client'

import { useEffect, useRef } from 'react'

export default function HeroText() {
  const containerRef = useRef<HTMLDivElement>(null)
  const target = useRef({ x: 0, y: 0 })
  const current = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      target.current.x = (e.clientX / window.innerWidth) * 2 - 1
      target.current.y = -(e.clientY / window.innerHeight) * 2 + 1
    }
    window.addEventListener('mousemove', onMove)

    let rafId: number
    function tick() {
      // Same lerp factor as AlbersScene so text and scene move together
      current.current.x += (target.current.x - current.current.x) * 0.05
      current.current.y += (target.current.y - current.current.y) * 0.05

      if (containerRef.current) {
        const rotY = current.current.x * 8   // max ±8° left/right
        const rotX = -current.current.y * 4  // max ±4° up/down
        containerRef.current.style.transform =
          `perspective(1200px) rotateY(${rotY}deg) rotateX(${rotX}deg)`
      }

      rafId = requestAnimationFrame(tick)
    }
    rafId = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-16 w-full"
    >
      <p className="font-mono text-xs text-fg-base/30 mb-6 tracking-widest uppercase">
        Full-Stack Developer · South Florida
      </p>
      <h1 className="font-display text-6xl md:text-8xl lg:text-9xl text-fg-base leading-[0.95] max-w-5xl">
        Websites{' '}
        <span className="italic" style={{ color: 'var(--color-spot-1)' }}>
          &amp;
        </span>{' '}
        digital experiences
        <br />
        <span className="text-fg-base/35">for local and global brands —</span>
        <br />
        <span className="text-fg-base/35">15 years with cross-functional teams.</span>
      </h1>
      <div className="mt-16 flex items-center gap-3">
        <div className="w-8 h-px bg-fg-base/30" />
        <span className="font-mono text-xs text-fg-base/30 tracking-widest uppercase">Scroll</span>
      </div>
    </div>
  )
}

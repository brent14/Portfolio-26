'use client'

import dynamic from 'next/dynamic'

const HeroPlaceholder = dynamic(() => import('@/components/HeroPlaceholder'), {
  ssr: false,
})

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-end bg-bg-base overflow-hidden">
      <HeroPlaceholder />

      {/* Spot color blocks — screen print bleed elements */}
      <div
        className="absolute top-0 right-0 w-72 h-72 pointer-events-none"
        style={{ backgroundColor: 'var(--color-spot-2)' }}
      />
      <div
        className="absolute top-32 right-32 w-48 h-48 pointer-events-none"
        style={{ backgroundColor: 'var(--color-spot-1)' }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-16 w-full">
        {/* Register mark — screen print detail */}
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
          <span className="text-fg-base/35">for brands that move people.</span>
          <br />
          15 years.
        </h1>

        {/* Scroll cue */}
        <div className="mt-16 flex items-center gap-3">
          <div className="w-8 h-px bg-fg-base/30" />
          <span className="font-mono text-xs text-fg-base/30 tracking-widest uppercase">Scroll</span>
        </div>
      </div>
    </section>
  )
}

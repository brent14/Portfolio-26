'use client'

import dynamic from 'next/dynamic'

const HeroPlaceholder = dynamic(() => import('@/components/HeroPlaceholder'), {
  ssr: false,
})

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center bg-cream overflow-hidden">
      <HeroPlaceholder />
      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-24 pb-16">
        <h1 className="font-display font-bold text-5xl md:text-7xl lg:text-8xl text-charcoal leading-none tracking-tight max-w-4xl">
          Websites and digital experiences{' '}
          <span className="text-charcoal/40">for brands that move people.</span>{' '}
          15 years.
        </h1>
      </div>
    </section>
  )
}

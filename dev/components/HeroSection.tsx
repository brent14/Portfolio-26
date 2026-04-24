'use client'

import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import HeroFluidFallback from '@/components/HeroFluidFallback'

const HeroFluidScene = dynamic(() => import('@/components/HeroFluidScene'), {
  ssr: false,
})

function useFluidEligible() {
  const [eligible, setEligible] = useState(false)

  useEffect(() => {
    const widthQuery = window.matchMedia('(min-width: 1024px)')
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')

    const update = () => {
      setEligible(widthQuery.matches && !motionQuery.matches)
    }
    update()

    widthQuery.addEventListener('change', update)
    motionQuery.addEventListener('change', update)
    return () => {
      widthQuery.removeEventListener('change', update)
      motionQuery.removeEventListener('change', update)
    }
  }, [])

  return eligible
}

function useVideoAspect(src: string) {
  const [aspect, setAspect] = useState<number | null>(null)

  useEffect(() => {
    const video = document.createElement('video')
    video.preload = 'metadata'
    const onMeta = () => {
      if (video.videoWidth > 0 && video.videoHeight > 0) {
        setAspect(video.videoWidth / video.videoHeight)
      }
    }
    video.addEventListener('loadedmetadata', onMeta)
    video.src = src
    return () => {
      video.removeEventListener('loadedmetadata', onMeta)
      video.removeAttribute('src')
      video.load()
    }
  }, [src])

  return aspect
}

export default function HeroSection() {
  const eligible = useFluidEligible()
  const aspect = useVideoAspect('/brent_2.mp4')

  if (!eligible) {
    return (
      <section className="relative w-full bg-bg-base overflow-hidden">
        <HeroFluidFallback />
      </section>
    )
  }

  return (
    <section
      className="relative w-full bg-bg-base overflow-hidden"
      style={{
        aspectRatio: aspect ?? 16 / 9,
        maxHeight: '100svh',
      }}
    >
      <HeroFluidScene />
    </section>
  )
}

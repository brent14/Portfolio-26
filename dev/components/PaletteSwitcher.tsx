'use client'

import { useEffect, useState } from 'react'

export default function PaletteSwitcher() {
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem('palette')
    if (stored === 'dark') {
      document.documentElement.classList.add('palette-dark')
      setIsDark(true)
    }
  }, [])

  const toggle = () => {
    if (!isDark) {
      document.documentElement.classList.add('palette-dark')
      localStorage.setItem('palette', 'dark')
      setIsDark(true)
    } else {
      document.documentElement.classList.remove('palette-dark')
      localStorage.setItem('palette', 'light')
      setIsDark(false)
    }
  }

  return (
    <button
      onClick={toggle}
      className="fixed bottom-6 right-6 z-[9998] font-mono text-xs px-3 py-2 border border-fg-base/20 bg-bg-base/90 text-fg-base backdrop-blur-sm hover:bg-fg-base hover:text-fg-on-alt transition-colors"
      title="Toggle palette"
    >
      {isDark ? 'Dark' : 'Light'} ↔
    </button>
  )
}

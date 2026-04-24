'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const stored = localStorage.getItem('palette')
    if (stored === 'dark') {
      document.documentElement.classList.add('palette-dark')
      setIsDark(true)
    }
  }, [])

  const togglePalette = () => {
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
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-bg-base/95 backdrop-blur-sm border-b border-fg-base/10'
          : 'bg-transparent'
      }`}
      style={
        !scrolled && isDark
          ? { backgroundColor: 'var(--color-spot-1)' }
          : undefined
      }
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="font-display text-xl text-fg-base">
          Brent Carlin
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {[
            { href: '/#work', label: 'Work' },
            { href: '/#about', label: 'About' },
            { href: '/resume', label: 'Resume' },
          ].map(({ href, label }) => (
            <Link
              key={label}
              href={href}
              className="font-mono text-lg text-fg-base hover:text-fg-base/50 transition-colors tracking-widest uppercase"
            >
              {label}
            </Link>
          ))}
          <button
            onClick={togglePalette}
            className="text-fg-base hover:text-fg-base/50 transition-colors"
            aria-label="Toggle palette"
          >
            {isDark ? (
              // Sun icon
              <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="4"/>
                <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>
              </svg>
            ) : (
              // Moon icon
              <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
              </svg>
            )}
          </button>
          <Link
            href="/#contact"
            className="font-mono text-lg tracking-widest uppercase px-4 py-2 transition-opacity hover:opacity-50 text-bg-alt dark-palette:text-fg-on-alt"
            style={{ backgroundColor: 'var(--color-spot-1)' }}
          >
            Contact
          </Link>
          <Link href="https://www.linkedin.com/in/brent-carlin/" target="_blank" rel="noopener noreferrer" className="text-fg-base/70 hover:text-fg-base/40 transition-colors" aria-label="LinkedIn">
            <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" viewBox="0 0 24 24" fill="currentColor">
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/>
              <circle cx="4" cy="4" r="2"/>
            </svg>
          </Link>
          <Link href="https://github.com/brent14" target="_blank" rel="noopener noreferrer" className="text-fg-base/70 hover:text-fg-base/40 transition-colors" aria-label="GitHub">
            <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z"/>
            </svg>
          </Link>
        </nav>

        {/* Mobile: palette toggle + hamburger */}
        <div className="md:hidden flex items-center gap-4">
          <button
            onClick={togglePalette}
            className="text-fg-base hover:text-fg-base/50 transition-colors"
            aria-label="Toggle palette"
          >
            {isDark ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="4"/>
                <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
              </svg>
            )}
          </button>
          <button
            className="flex flex-col gap-1.5 p-1"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span className={`block w-6 h-px bg-fg-base transition-transform duration-200 ${menuOpen ? 'translate-y-2 rotate-45' : ''}`} />
            <span className={`block w-6 h-px bg-fg-base transition-opacity duration-200 ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-6 h-px bg-fg-base transition-transform duration-200 ${menuOpen ? '-translate-y-2 -rotate-45' : ''}`} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-bg-base border-t border-fg-base/10 px-6 py-6 flex flex-col gap-9">
          <Link href="/#work" className="font-mono text-2xl text-fg-base px-3 py-2 -mx-3 rounded hover:bg-fg-base/10 active:bg-fg-base/20 transition-colors" onClick={() => setMenuOpen(false)}>Work</Link>
          <Link href="/#about" className="font-mono text-2xl text-fg-base px-3 py-2 -mx-3 rounded hover:bg-fg-base/10 active:bg-fg-base/20 transition-colors" onClick={() => setMenuOpen(false)}>About</Link>
          <Link href="/resume" className="font-mono text-2xl text-fg-base px-3 py-2 -mx-3 rounded hover:bg-fg-base/10 active:bg-fg-base/20 transition-colors" onClick={() => setMenuOpen(false)}>Resume</Link>
          <Link href="/#contact" className="font-mono text-2xl text-fg-base px-3 py-2 -mx-3 rounded hover:bg-fg-base/10 active:bg-fg-base/20 transition-colors" onClick={() => setMenuOpen(false)}>Contact</Link>
        </div>
      )}
    </header>
  )
}

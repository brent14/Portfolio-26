'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-cream/95 backdrop-blur-sm border-b border-charcoal/10'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link
          href="/"
          className="font-display font-bold text-lg text-charcoal tracking-tight"
        >
          Brent Carlin
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          <Link
            href="/#work"
            className="font-mono text-sm text-charcoal-muted hover:text-charcoal transition-colors"
          >
            Work
          </Link>
          <Link
            href="/#about"
            className="font-mono text-sm text-charcoal-muted hover:text-charcoal transition-colors"
          >
            About
          </Link>
          <Link
            href="/resume"
            className="font-mono text-sm text-charcoal-muted hover:text-charcoal transition-colors"
          >
            Resume
          </Link>
          <Link
            href="/#contact"
            className="font-mono text-sm text-charcoal bg-charcoal text-cream px-4 py-1.5 hover:bg-charcoal-soft transition-colors"
          >
            Contact
          </Link>
        </nav>

        {/* Mobile menu toggle */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-1"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span
            className={`block w-6 h-px bg-charcoal transition-transform duration-200 ${menuOpen ? 'translate-y-2 rotate-45' : ''}`}
          />
          <span
            className={`block w-6 h-px bg-charcoal transition-opacity duration-200 ${menuOpen ? 'opacity-0' : ''}`}
          />
          <span
            className={`block w-6 h-px bg-charcoal transition-transform duration-200 ${menuOpen ? '-translate-y-2 -rotate-45' : ''}`}
          />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-cream border-t border-charcoal/10 px-6 py-6 flex flex-col gap-4">
          <Link
            href="/#work"
            className="font-mono text-sm text-charcoal-muted"
            onClick={() => setMenuOpen(false)}
          >
            Work
          </Link>
          <Link
            href="/#about"
            className="font-mono text-sm text-charcoal-muted"
            onClick={() => setMenuOpen(false)}
          >
            About
          </Link>
          <Link
            href="/resume"
            className="font-mono text-sm text-charcoal-muted"
            onClick={() => setMenuOpen(false)}
          >
            Resume
          </Link>
          <Link
            href="/#contact"
            className="font-mono text-sm text-charcoal"
            onClick={() => setMenuOpen(false)}
          >
            Contact
          </Link>
        </div>
      )}
    </header>
  )
}

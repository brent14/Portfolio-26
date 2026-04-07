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
          ? 'bg-bg-base/95 backdrop-blur-sm border-b border-fg-base/10'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link
          href="/"
          className="font-display text-xl text-fg-base"
        >
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
              className="font-mono text-base text-fg-base/50 hover:text-fg-base transition-colors tracking-widest uppercase"
            >
              {label}
            </Link>
          ))}
          <Link
            href="/#contact"
            className="font-mono text-base text-fg-on-alt tracking-widest uppercase px-4 py-2 transition-colors"
            style={{ backgroundColor: 'var(--color-spot-1)' }}
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
            className={`block w-6 h-px bg-fg-base transition-transform duration-200 ${menuOpen ? 'translate-y-2 rotate-45' : ''}`}
          />
          <span
            className={`block w-6 h-px bg-fg-base transition-opacity duration-200 ${menuOpen ? 'opacity-0' : ''}`}
          />
          <span
            className={`block w-6 h-px bg-fg-base transition-transform duration-200 ${menuOpen ? '-translate-y-2 -rotate-45' : ''}`}
          />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-bg-base border-t border-fg-base/10 px-6 py-6 flex flex-col gap-4">
          <Link
            href="/#work"
            className="font-mono text-sm text-fg-muted"
            onClick={() => setMenuOpen(false)}
          >
            Work
          </Link>
          <Link
            href="/#about"
            className="font-mono text-sm text-fg-muted"
            onClick={() => setMenuOpen(false)}
          >
            About
          </Link>
          <Link
            href="/resume"
            className="font-mono text-sm text-fg-muted"
            onClick={() => setMenuOpen(false)}
          >
            Resume
          </Link>
          <Link
            href="/#contact"
            className="font-mono text-sm text-fg-base"
            onClick={() => setMenuOpen(false)}
          >
            Contact
          </Link>
        </div>
      )}
    </header>
  )
}

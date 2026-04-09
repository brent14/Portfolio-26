import Link from 'next/link'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="relative overflow-hidden" style={{ backgroundColor: 'var(--color-bg-alt)' }}>
      {/* Spot color accent — bottom-left corner bleed */}
      <div
        className="absolute bottom-0 left-0 w-48 h-48 pointer-events-none"
        style={{ backgroundColor: 'var(--color-spot-1)' }}
      />
      <div className="max-w-7xl mx-auto px-6 py-16 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-10">
          <div>
            <p className="font-display text-3xl text-fg-on-alt mb-1">Brent Carlin</p>
            <p className="font-mono text-xs text-fg-on-alt/30 tracking-widest uppercase">
              © {year} All rights reserved.
            </p>
          </div>

          <nav className="flex flex-wrap gap-8">
            {[
              { href: '/#work', label: 'Work' },
              { href: '/#about', label: 'About' },
              { href: '/resume', label: 'Resume' },
              { href: '/#contact', label: 'Contact' },
            ].map(({ href, label }) => (
              <Link
                key={label}
                href={href}
                className="font-mono text-sm text-fg-on-alt hover:text-fg-on-alt/50 transition-colors tracking-widest uppercase"
              >
                {label}
              </Link>
            ))}
          </nav>

          <div className="flex gap-6">
            <a
              href="https://github.com/brent14"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="font-mono text-sm text-fg-on-alt hover:text-fg-on-alt/50 transition-colors tracking-widest uppercase"
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/brent-carlin/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="font-mono text-sm text-fg-on-alt hover:text-fg-on-alt/50 transition-colors tracking-widest uppercase"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

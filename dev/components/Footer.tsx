import Link from 'next/link'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-charcoal text-cream">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div>
            <p className="font-display font-bold text-lg">Brent Carlin</p>
            <p className="font-mono text-sm text-cream/50 mt-1">
              © {year} All rights reserved.
            </p>
          </div>

          <nav className="flex flex-wrap gap-6">
            <Link
              href="/#work"
              className="font-mono text-sm text-cream/60 hover:text-cream transition-colors"
            >
              Work
            </Link>
            <Link
              href="/#about"
              className="font-mono text-sm text-cream/60 hover:text-cream transition-colors"
            >
              About
            </Link>
            <Link
              href="/resume"
              className="font-mono text-sm text-cream/60 hover:text-cream transition-colors"
            >
              Resume
            </Link>
            <Link
              href="/#contact"
              className="font-mono text-sm text-cream/60 hover:text-cream transition-colors"
            >
              Contact
            </Link>
          </nav>

          <div className="flex gap-4">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="font-mono text-sm text-cream/60 hover:text-cream transition-colors"
            >
              GitHub
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="font-mono text-sm text-cream/60 hover:text-cream transition-colors"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

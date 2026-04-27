import Image from 'next/image'
import WorkGrid from '@/components/WorkGrid'
import HeroSection from '@/components/HeroSection'

const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Brent Carlin',
  url: 'https://brentcarlin.com',
  jobTitle: 'Full-Stack Developer',
  description:
    'Full-stack developer with 15 years of experience specializing in WebGL, GSAP animation, WordPress, and DevOps, based in South Florida.',
  sameAs: ['https://github.com/brent14', 'https://www.linkedin.com/in/brent-carlin/'],
  knowsAbout: [
    'WebGL',
    'Three.js',
    'React Three Fiber',
    'GSAP',
    'WordPress',
    'Next.js',
    'DevOps',
    'AWS',
    'Cloudflare',
    'Salesforce CRM',
  ],
  address: {
    '@type': 'PostalAddress',
    addressRegion: 'FL',
    addressCountry: 'US',
  },
}

const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Brent Carlin',
  url: 'https://brentcarlin.com',
  description:
    'Portfolio of Brent Carlin, full-stack developer specializing in WebGL, animation, WordPress, and DevOps.',
  author: {
    '@type': 'Person',
    name: 'Brent Carlin',
  },
}

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />

      {/* Hero */}
      <HeroSection />

      {/* Positioning */}
      <section className="bg-bg-base relative overflow-hidden">
        {/* Spot color accent bar */}
        <div
          className="absolute left-0 top-0 bottom-0 w-1"
          style={{ backgroundColor: 'var(--color-spot-1)' }}
        />
        <div className="max-w-7xl mx-auto px-6 py-24 md:py-32">
          <p className="font-display text-[28px] text-fg-base leading-relaxed">
            For over 15 years, I&apos;ve built websites and digital experiences for brands
            ranging from global automotive dealers and newsroom apps to nonprofit advocacy
            groups. My work spans the full stack, including WebGL/GSAP-driven animations,
            CRM integrations, platform architecture, and the DevOps infrastructure that
            keeps it all running. I have collaborated closely with art directors, brand
            teams and engineers, working together to treat animations as storytelling and
            technical decisions as brand decisions. My building approach is to create
            engaging user-centered experiences supported by solid technical foundations.
          </p>
        </div>
      </section>

      {/* Work grid */}
      <section id="work" className="bg-bg-base border-t border-fg-base/10">
        <div className="max-w-7xl mx-auto px-6 py-24">
          <div className="flex items-baseline justify-between mb-16">
            <h2 className="font-display text-5xl md:text-6xl text-fg-base">Work</h2>
            <span className="font-mono text-xs text-fg-muted">20 projects</span>
          </div>
          <WorkGrid />
        </div>
      </section>

      {/* About */}
      <section id="about" className="relative overflow-hidden" style={{ backgroundColor: 'var(--color-bg-alt)' }}>
        <div className="max-w-7xl mx-auto px-6 py-24 relative z-10">
          <div className="grid md:grid-cols-2 gap-16 items-start">
            <div>
              <h2 className="font-display text-5xl md:text-6xl text-fg-on-alt mb-10 leading-tight">
                About
              </h2>
              <p className="font-sans text-[22px] text-fg-on-alt/75 leading-relaxed">
                I&apos;ve had the pleasure of building websites and digital experiences
                from global automotive brands to scrappy nonprofits and everything in
                between. Most of that work is the unglamorous (but absolutely necessary)
                kind: the CRM pipelines, CMS architecture, and DevOps infrastructure that
                makes everything else possible. But every now and then I get to make
                something move, and that&apos;s where the real satisfaction lives. My
                favorite projects are the ones where motion complements the message to
                create a dynamic experience. I&rsquo;m based in South Florida and when
                I&apos;m not pushing code and pixels, I&apos;m noodling with electronics,
                screen printing or trying to grow my hot pepper empire.
              </p>
            </div>
            {/* Portrait */}
            <div className="aspect-[3/4] relative overflow-hidden">
              <Image
                src="/about-brent-light.jpg"
                alt="Brent Carlin"
                fill
                className="object-cover dark-palette:hidden"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <Image
                src="/about-brent-dark.jpg"
                alt="Brent Carlin"
                fill
                className="object-cover hidden dark-palette:block"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section id="contact" className="bg-bg-base">
        <div className="max-w-7xl mx-auto px-6 py-32">
          <div className="max-w-4xl">
            <h2 className="font-display text-5xl md:text-6xl lg:text-7xl text-fg-base leading-tight mb-8">
              Have a project in mind?
            </h2>
            <a
              href="mailto:brent@brentcarlin.com?subject=Interested%20in%20working%20together"
              className="inline-flex items-center gap-3 font-mono text-lg px-6 py-3 hover:opacity-70 transition-opacity"
              style={{ backgroundColor: 'var(--color-spot-1)', color: 'var(--color-fg-base)' }}
            >
              brent@brentcarlin.com
              <span aria-hidden>→</span>
            </a>
          </div>
        </div>
      </section>
    </>
  )
}

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Resume',
  description:
    'Resume of Brent Carlin, full-stack developer with 15 years of experience in WebGL, GSAP animation, WordPress, DevOps, and CRM integrations.',
  alternates: {
    canonical: 'https://brentcarlin.com/resume',
  },
  openGraph: {
    title: 'Resume — Brent Carlin',
    description:
      'Resume of Brent Carlin, full-stack developer with 15 years of experience in WebGL, GSAP animation, WordPress, DevOps, and CRM integrations.',
    url: 'https://brentcarlin.com/resume',
  },
}

export default function ResumePage() {
  return (
    <div className="min-h-screen bg-cream pt-24">
      <div className="max-w-4xl mx-auto px-6 py-16">
        {/* Header */}
        <div className="mb-16 pb-8 border-b border-charcoal/10">
          <h1 className="font-display font-bold text-5xl text-charcoal mb-2">
            Brent Carlin
          </h1>
          <p className="font-mono text-sm text-charcoal-muted">
            Full-Stack Developer · South Florida
          </p>
          <p className="font-mono text-sm text-charcoal-muted">
            brent@brentcarlin.com
          </p>
        </div>

        {/* Download button */}
        <div className="mb-12">
          <button
            disabled
            className="font-mono text-sm bg-charcoal text-cream px-6 py-3 opacity-40 cursor-not-allowed"
          >
            Download PDF (coming soon)
          </button>
        </div>

        {/* Experience placeholder */}
        <section className="mb-12">
          <h2 className="font-display font-bold text-xl text-charcoal mb-6 pb-2 border-b border-charcoal/10">
            Experience
          </h2>
          <div className="space-y-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="grid md:grid-cols-4 gap-4">
                <div className="md:col-span-1">
                  <div className="h-4 bg-charcoal/10 w-24 mb-2" />
                  <div className="h-3 bg-charcoal/10 w-16" />
                </div>
                <div className="md:col-span-3">
                  <div className="h-5 bg-charcoal/10 w-48 mb-2" />
                  <div className="h-4 bg-charcoal/10 w-32 mb-3" />
                  <div className="space-y-2">
                    <div className="h-3 bg-charcoal/10 w-full" />
                    <div className="h-3 bg-charcoal/10 w-4/5" />
                    <div className="h-3 bg-charcoal/10 w-3/5" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Skills placeholder */}
        <section className="mb-12">
          <h2 className="font-display font-bold text-xl text-charcoal mb-6 pb-2 border-b border-charcoal/10">
            Skills
          </h2>
          <div className="flex flex-wrap gap-2">
            {[
              'Next.js', 'React', 'TypeScript', 'Three.js', 'React Three Fiber',
              'GSAP', 'WordPress', 'PHP', 'JavaScript', 'AWS', 'Cloudflare',
              'Vercel', 'Salesforce', 'DevOps', 'CI/CD', 'Git',
            ].map((skill) => (
              <span
                key={skill}
                className="font-mono text-xs text-charcoal/60 border border-charcoal/20 px-3 py-1"
              >
                {skill}
              </span>
            ))}
          </div>
        </section>

        {/* Education placeholder */}
        <section>
          <h2 className="font-display font-bold text-xl text-charcoal mb-6 pb-2 border-b border-charcoal/10">
            Education
          </h2>
          <div className="h-4 bg-charcoal/10 w-64 mb-2" />
          <div className="h-3 bg-charcoal/10 w-40" />
        </section>

        <p className="font-mono text-xs text-charcoal/30 mt-16">
          Full resume content coming soon.
        </p>
      </div>
    </div>
  )
}

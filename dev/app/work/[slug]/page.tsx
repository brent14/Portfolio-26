import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import { projects, getProjectBySlug, getAdjacentProjects } from '@/data/projects'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const project = getProjectBySlug(slug)
  if (!project) return {}

  const description = project.body.split('.')[0] + '.'

  return {
    title: project.headline,
    description,
    keywords: project.tags,
    openGraph: {
      title: `${project.headline} — Brent Carlin`,
      description,
      url: `https://brentcarlin.com/work/${slug}`,
      type: 'article',
    },
    alternates: {
      canonical: `https://brentcarlin.com/work/${slug}`,
    },
  }
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params
  const project = getProjectBySlug(slug)
  if (!project) notFound()

  const { next, prev } = getAdjacentProjects(slug)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: project.headline,
    description: project.body,
    keywords: project.tags.join(', '),
    url: `https://brentcarlin.com/work/${slug}`,
    creator: {
      '@type': 'Person',
      name: 'Brent Carlin',
      url: 'https://brentcarlin.com',
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Case study header */}
      <div
        className="min-h-[60vh] relative flex items-end pt-24 overflow-hidden"
        style={{ backgroundColor: 'var(--color-bg-alt)' }}
      >
        {/* Spot color block — bottom-right corner */}
        <div
          className="absolute bottom-0 right-0 w-1/2 h-3/4 pointer-events-none"
          style={{ backgroundColor: 'var(--color-spot-1)' }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-6 pb-16 w-full">
          <div className="flex flex-wrap gap-2 mb-6">
            {project.filterTags.map((tag) => (
              <span
                key={tag}
                className="font-mono text-xs text-fg-on-alt/50 border border-fg-on-alt/20 px-2 py-0.5"
              >
                {tag}
              </span>
            ))}
          </div>
          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl text-fg-on-alt leading-tight max-w-4xl">
            {project.headline}
          </h1>
        </div>
      </div>

      {/* Body */}
      <article className="bg-bg-base">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="grid md:grid-cols-3 gap-16">
            {/* Body copy */}
            <div className="md:col-span-2">
              <p className="font-display text-xl md:text-2xl text-fg-base leading-relaxed">
                {project.body}
              </p>

              {/* Tech tags */}
              <div className="flex flex-wrap gap-2 mt-14 pt-8 border-t border-charcoal/10">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-mono text-xs text-fg-base/50 border border-fg-base/15 px-2 py-1"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Sidebar — spot color image placeholder */}
            <aside>
              <div className="aspect-[3/4] relative overflow-hidden">
                <div
                  className="absolute inset-0"
                  style={{ backgroundColor: 'var(--color-spot-1)' }}
                />
                <div className="absolute bottom-4 left-4">
                  <span className="font-mono text-xs text-fg-on-alt/30">Project image</span>
                </div>
              </div>
            </aside>
          </div>

          {/* Media grid placeholders */}
          <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="aspect-video relative overflow-hidden">
                <div
                  className="absolute inset-0"
                  style={{ backgroundColor: i % 2 === 0 ? 'var(--color-spot-2)' : 'var(--color-spot-3)' }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-mono text-xs text-fg-base/20">Media {i}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </article>

      {/* Next / Prev project */}
      <div
        className="border-t border-fg-on-alt/10"
        style={{ backgroundColor: 'var(--color-bg-alt)' }}
      >
        <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row justify-between gap-8">
          <div>
            <p className="font-mono text-xs text-fg-on-alt/30 mb-2 tracking-widest uppercase">Previous</p>
            <Link
              href={`/work/${prev.slug}`}
              className="font-display text-xl text-fg-on-alt hover:italic transition-all duration-300"
            >
              {prev.title}
            </Link>
          </div>
          <div className="text-right">
            <p className="font-mono text-xs text-fg-on-alt/30 mb-2 tracking-widest uppercase">Next</p>
            <Link
              href={`/work/${next.slug}`}
              className="font-display text-xl text-fg-on-alt hover:italic transition-all duration-300"
            >
              {next.title}
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

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

      {/* Case study header placeholder */}
      <div className="min-h-[40vh] bg-charcoal flex items-end pt-24">
        <div className="max-w-7xl mx-auto px-6 pb-16 w-full">
          <div className="flex flex-wrap gap-2 mb-4">
            {project.filterTags.map((tag) => (
              <span
                key={tag}
                className="font-mono text-xs text-cream/50 border border-cream/20 px-2 py-0.5"
              >
                {tag}
              </span>
            ))}
          </div>
          <h1 className="font-display font-bold text-4xl md:text-6xl text-cream leading-tight max-w-4xl">
            {project.headline}
          </h1>
        </div>
      </div>

      {/* Body */}
      <article className="bg-cream">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid md:grid-cols-3 gap-16">
            {/* Body copy */}
            <div className="md:col-span-2">
              <p className="font-sans text-lg md:text-xl text-charcoal/80 leading-relaxed">
                {project.body}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mt-12">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-mono text-xs text-charcoal/60 border border-charcoal/20 px-2 py-1"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Sidebar placeholder */}
            <aside>
              <div className="aspect-square bg-cream-dark flex items-center justify-center">
                <span className="font-mono text-xs text-charcoal/20">
                  Project image
                </span>
              </div>
            </aside>
          </div>

          {/* Media placeholder */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="aspect-video bg-cream-dark flex items-center justify-center"
              >
                <span className="font-mono text-xs text-charcoal/20">Media {i}</span>
              </div>
            ))}
          </div>
        </div>
      </article>

      {/* Next project */}
      <div className="bg-charcoal border-t border-cream/10">
        <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row justify-between gap-8">
          <div>
            <p className="font-mono text-xs text-cream/40 mb-1">Previous</p>
            <Link
              href={`/work/${prev.slug}`}
              className="font-display font-bold text-cream hover:text-cream/70 transition-colors"
            >
              {prev.title}
            </Link>
          </div>
          <div className="text-right">
            <p className="font-mono text-xs text-cream/40 mb-1">Next</p>
            <Link
              href={`/work/${next.slug}`}
              className="font-display font-bold text-cream hover:text-cream/70 transition-colors"
            >
              {next.title}
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

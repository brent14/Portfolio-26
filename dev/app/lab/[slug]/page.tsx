import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

// Placeholder — no real articles in Phase 1
const articles: Record<string, { title: string; description: string }> = {}

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const article = articles[slug]
  if (!article) return { title: 'Article Not Found' }
  return {
    title: article.title,
    description: article.description,
    alternates: {
      canonical: `https://brentcarlin.com/lab/${slug}`,
    },
  }
}

export default async function LabArticlePage({ params }: Props) {
  const { slug } = await params
  const article = articles[slug]

  // No articles in Phase 1 — all 404
  if (!article) notFound()

  return (
    <div className="min-h-screen bg-cream pt-24">
      <div className="max-w-3xl mx-auto px-6 py-16">
        <h1 className="font-display font-bold text-4xl text-charcoal mb-8">
          {article.title}
        </h1>
        <div className="font-sans text-lg text-charcoal/80 leading-relaxed">
          {/* MDX content goes here in Phase 3 */}
          <p>Article content coming soon.</p>
        </div>
      </div>
    </div>
  )
}

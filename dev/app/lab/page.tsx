import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Lab',
  description:
    'Articles, experiments, and tutorials on GSAP animation, React Three Fiber, WebGL, WordPress, and modern web development by Brent Carlin.',
  alternates: {
    canonical: 'https://brentcarlin.com/lab',
  },
  openGraph: {
    title: 'Lab — Brent Carlin',
    description:
      'Articles, experiments, and tutorials on GSAP animation, React Three Fiber, WebGL, WordPress, and modern web development by Brent Carlin.',
    url: 'https://brentcarlin.com/lab',
  },
}

const placeholderPosts = [
  {
    slug: 'gsap-animation-tutorial',
    title: 'GSAP Animation Tutorial: From Zero to Scroll-Driven',
    date: 'Coming soon',
    tag: 'Tutorial',
    excerpt:
      'A practical guide to GSAP timelines, scroll triggers, and orchestrating complex animation sequences.',
  },
  {
    slug: 'react-three-fiber-scroll',
    title: 'Scroll-Driven 3D Scenes with React Three Fiber',
    date: 'Coming soon',
    tag: 'Tutorial',
    excerpt:
      'How to use scroll position to drive Three.js camera movement, material properties, and scene transitions.',
  },
  {
    slug: 'wordpress-headless-cms',
    title: 'WordPress as a Headless CMS: What Actually Works',
    date: 'Coming soon',
    tag: 'Architecture',
    excerpt:
      "When to reach for headless WordPress, when not to, and what the content team doesn't know to worry about.",
  },
  {
    slug: 'parallax-scroll-animation',
    title: 'Parallax Scroll Animation Without the Jank',
    date: 'Coming soon',
    tag: 'Performance',
    excerpt:
      'Techniques for smooth parallax that respects compositing layers and avoids layout thrashing.',
  },
]

export default function LabPage() {
  return (
    <div className="min-h-screen bg-bg-base pt-24">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <h1 className="font-display font-bold text-5xl text-fg-base mb-4">Lab</h1>
        <p className="font-sans text-lg text-fg-base/60 mb-16 max-w-xl">
          Articles, experiments, and tutorials on animation, WebGL, WordPress, and the
          web in general.
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          {placeholderPosts.map((post) => (
            <div
              key={post.slug}
              className="bg-fg-base/5 p-8 opacity-60"
              aria-label="Coming soon"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="font-mono text-xs text-fg-base/50 border border-fg-base/20 px-2 py-0.5">
                  {post.tag}
                </span>
                <span className="font-mono text-xs text-fg-base/40">{post.date}</span>
              </div>
              <h2 className="font-display font-bold text-xl text-fg-base mb-3 leading-snug">
                {post.title}
              </h2>
              <p className="font-sans text-sm text-fg-base/60 leading-relaxed">
                {post.excerpt}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

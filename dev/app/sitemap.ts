import type { MetadataRoute } from 'next'
import { projects } from '@/data/projects'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://brentcarlin.com'

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: base,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${base}/resume`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${base}/lab`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
  ]

  const workRoutes: MetadataRoute.Sitemap = projects.map((project) => ({
    url: `${base}/work/${project.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.9,
  }))

  return [...staticRoutes, ...workRoutes]
}

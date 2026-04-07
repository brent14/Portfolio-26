import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
    sitemap: 'https://brentcarlin.com/sitemap.xml',
    host: 'https://brentcarlin.com',
  }
}

import type { Metadata } from 'next'
import { Rubik, DM_Sans, IBM_Plex_Mono } from 'next/font/google'
import './globals.css'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

const rubik = Rubik({
  subsets: ['latin'],
  variable: '--font-rubik',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
})

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-ibm-plex-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Brent Carlin — Full-Stack Developer',
    template: '%s — Brent Carlin',
  },
  description:
    'Brent Carlin is a full-stack developer with 15 years of experience specializing in WebGL, GSAP animation, WordPress, and DevOps, based in South Florida.',
  metadataBase: new URL('https://brentcarlin.com'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://brentcarlin.com',
    siteName: 'Brent Carlin',
    title: 'Brent Carlin — Full-Stack Developer',
    description:
      'Brent Carlin is a full-stack developer with 15 years of experience specializing in WebGL, GSAP animation, WordPress, and DevOps, based in South Florida.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Brent Carlin — Full-Stack Developer',
    description:
      'Brent Carlin is a full-stack developer with 15 years of experience specializing in WebGL, GSAP animation, WordPress, and DevOps, based in South Florida.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${rubik.variable} ${dmSans.variable} ${ibmPlexMono.variable}`}
    >
      <body>
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}

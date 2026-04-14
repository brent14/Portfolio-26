import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Resume — Brent Carlin',
  description:
    'Resume of Brent Carlin, Front End Engineer with 15 years of experience in React, Next.js, GSAP animation, WordPress, DevOps, and CRM integrations.',
  alternates: {
    canonical: 'https://brentcarlin.com/resume',
  },
  openGraph: {
    title: 'Resume — Brent Carlin',
    description:
      'Resume of Brent Carlin, Front End Engineer with 15 years of experience in React, Next.js, GSAP animation, WordPress, DevOps, and CRM integrations.',
    url: 'https://brentcarlin.com/resume',
  },
}

const experience = [
  {
    company: 'Markham Yard',
    title: 'Digital Director',
    period: 'Jul 2016 – Present',
    description:
      "I'm the lead developer on digital projects for the agency. I've lead small dev teams that work with our art directors to create websites. I'm also responsible for our DevOps architecture and its day-to-day operations.",
    stack: ['JavaScript', 'React.js', 'Next.js', 'CSS', 'SASS', 'Node.js', 'Figma', 'Adobe Creative', 'MySQL', 'PHP', 'Git', 'AWS', 'Nginx', 'Apache', 'Neon', 'Turso', 'WordPress'],
  },
  {
    company: 'Northwest Arkansas Democrat-Gazette',
    title: 'Web Developer',
    period: 'Apr 2015 – Jul 2016',
    description:
      'My team was responsible for the day-to-day hotfixes, UI additions and feature development on the main website and its subsidiary websites. I built the UI, frontend and backend for an Election Day app that was used by the newsroom to track local races and display the current results in the newspaper UI in real time.',
    stack: ['HTML', 'CSS', 'JavaScript', 'PHP', 'Python', 'Laravel', 'Django', 'Apache', 'Git', 'Solr'],
  },
  {
    company: 'Saatchi & Saatchi X',
    title: 'Front End Developer — Freelance',
    period: 'Jan 2014 – Apr 2015',
    description:
      "I worked with art directors to develop engaging landing page UI's for Covergirl, Crest, and Pampers. I also developed banner ads for Duracell, Metamucil and Hasbro.",
    stack: ['HTML', 'CSS', 'JavaScript', 'jQuery', 'GSAP', 'Git', 'Banner Ads', 'DoubleClick for Publishers'],
  },
  {
    company: 'Markham Unlimited',
    title: 'Web Developer — Freelance',
    period: 'Jan 2013 – Jan 2014',
    description:
      'I worked with cross-functional teams to develop product websites and create new UI components for previously developed websites.',
    stack: ['Flash', 'ActionScript', 'HTML', 'CSS', 'JavaScript', 'jQuery', 'GSAP', 'Illustrator', 'Photoshop'],
  },
  {
    company: 'WhiteHatt Technologies, Inc.',
    title: 'Product Designer',
    period: 'Aug 2010 – Oct 2012',
    description:
      'I worked with the CEO to build a prototype UI for our main product. I also designed all investor presentations.',
    stack: ['UI/UX', 'Graphic Design', 'Flash', 'ActionScript', 'HTML', 'CSS', 'JavaScript', 'jQuery', 'Illustrator', 'Photoshop'],
  },
]

const skills = {
  'Front End': ['HTML', 'CSS', 'SASS', 'JavaScript', 'React', 'Next.js'],
  'Backend': ['MySQL', 'Neon', 'Turso', 'PHP', 'Node.js', 'Laravel', 'Django', 'Python', 'Solr'],
  'DevOps': ['AWS', 'Docker', 'Nginx', 'Apache', 'Netlify', 'Git', 'Ubuntu', 'Vercel', 'Cloudflare'],
  'Creative': ['Figma', 'Illustrator', 'Photoshop', 'Indesign', 'After Effects', 'Blender'],
  'Other': ['WordPress', 'Three.js', 'Solidity', 'Playwright', 'Artillery', 'Gulp', 'Vite', 'Arduino'],
}

const education = [
  {
    school: 'University of Florida',
    degree: 'Bachelor of Arts, History',
    period: '1997 – 2001',
  },
  {
    school: 'The Art Institutes',
    degree: 'Associate of Science, Web Design & Interactive Media',
    period: '2008 – 2010',
  },
]

export default function ResumePage() {
  return (
    <div className="min-h-screen bg-bg-base pt-24">
      <div className="max-w-7xl mx-auto px-6 py-16">

        {/* Header */}
        <div className="mb-16 pb-10 border-b border-fg-base/10 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <h1 className="font-display text-6xl md:text-7xl text-fg-base mb-3">
              Brent Carlin
            </h1>
            <p className="font-mono text-lg text-fg-muted tracking-widest uppercase">
              Front End Engineer
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-16">

          {/* Left — Experience */}
          <div className="md:col-span-2">
            <h2 className="font-mono text-xs tracking-widest uppercase text-fg-muted mb-8">Experience</h2>
            <div className="space-y-12">
              {experience.map((job) => (
                <div key={job.company} className="border-t border-fg-base/10 pt-8">
                  <div className="flex flex-wrap items-baseline justify-between gap-2 mb-1">
                    <span className="font-mono text-sm text-fg-muted">{job.company}</span>
                    <span className="font-mono text-xs text-fg-base/40">{job.period}</span>
                  </div>
                  <h3 className="font-display text-3xl text-fg-base mb-4">{job.title}</h3>
                  <p className="font-sans text-base text-fg-muted leading-relaxed mb-5">{job.description}</p>
                  <div>
                    <p className="font-mono text-xs tracking-widest uppercase text-fg-base/40 mb-2">Skills / Software Stack</p>
                    <p className="font-mono text-sm text-fg-muted">{job.stack.join(' · ')}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Education + Skills */}
          <div className="space-y-12">

            {/* Education */}
            <div>
              <h2 className="font-mono text-xs tracking-widest uppercase text-fg-muted mb-8">Education</h2>
              <div className="space-y-8">
                {education.map((edu) => (
                  <div key={edu.school} className="border-t border-fg-base/10 pt-8">
                    <h3 className="font-display text-2xl text-fg-base mb-1">{edu.school}</h3>
                    <p className="font-mono text-sm text-fg-muted">{edu.degree}</p>
                    <p className="font-mono text-xs text-fg-base/40 mt-1">{edu.period}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Skills */}
            <div>
              <h2 className="font-mono text-xs tracking-widest uppercase text-fg-muted mb-8">Skills</h2>
              <div className="space-y-6">
                {Object.entries(skills).map(([category, items]) => (
                  <div key={category} className="border-t border-fg-base/10 pt-6">
                    <p className="font-mono text-xs tracking-widest uppercase text-fg-base/40 mb-2">{category}</p>
                    <p className="font-mono text-sm text-fg-muted leading-relaxed">{items.join(' · ')}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

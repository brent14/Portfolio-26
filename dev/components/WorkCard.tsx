import Link from 'next/link'
import type { Project } from '@/data/projects'

interface WorkCardProps {
  project: Project
}

export default function WorkCard({ project }: WorkCardProps) {
  return (
    <Link
      href={`/work/${project.slug}`}
      className="group block bg-cream-dark hover:bg-charcoal transition-colors duration-300"
    >
      {/* Thumbnail placeholder */}
      <div className="aspect-[4/3] bg-charcoal/10 group-hover:bg-charcoal/20 transition-colors relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-mono text-xs text-charcoal/30 group-hover:text-cream/20 transition-colors text-center px-4">
            {project.title}
          </span>
        </div>
      </div>

      {/* Card content */}
      <div className="p-5">
        <h3 className="font-display font-bold text-base text-charcoal group-hover:text-cream transition-colors leading-snug mb-3">
          {project.title}
        </h3>

        <div className="flex flex-wrap gap-1.5">
          {project.filterTags.map((tag) => (
            <span
              key={tag}
              className="font-mono text-xs text-charcoal/60 group-hover:text-cream/60 transition-colors border border-charcoal/20 group-hover:border-cream/20 px-2 py-0.5"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  )
}

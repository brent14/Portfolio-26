import Link from 'next/link'
import Image from 'next/image'
import type { Project } from '@/data/projects'

interface WorkCardProps {
  project: Project
  index: number
}

// Cycle through all 5 spot colors across the grid
const spotColors = [
  'var(--color-spot-1)',
  'var(--color-spot-2)',
  'var(--color-spot-3)',
  'var(--color-spot-4)',
  'var(--color-spot-5)',
]

export default function WorkCard({ project, index }: WorkCardProps) {
  const spotColor = spotColors[index % spotColors.length]

  return (
    <Link
      href={`/work/${project.slug}`}
      className="group block"
    >
      {/* Image area */}
      <div className="aspect-[4/3] relative overflow-hidden">
        {project.thumb ? (
          <>
            {/* Light palette thumbnail */}
            <Image
              src={project.thumb}
              alt={project.title}
              fill
              className={`object-cover ${project.thumbDark ? 'dark-palette:hidden' : ''}`}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            {/* Dark palette thumbnail — swapped via CSS */}
            {project.thumbDark && (
              <Image
                src={project.thumbDark}
                alt={project.title}
                fill
                className="object-cover hidden dark-palette:block"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            )}
          </>
        ) : (
          /* Solid spot color fallback for projects without a thumbnail */
          <div
            className="absolute inset-0 transition-opacity duration-500 group-hover:opacity-80"
            style={{ backgroundColor: spotColor }}
          />
        )}

        {/* Index number — screen print register mark */}
        <span className="absolute top-4 left-4 font-mono text-xs text-fg-base/20 group-hover:text-fg-on-alt/30 transition-colors z-10">
          {String(index + 1).padStart(2, '0')}
        </span>
      </div>

      {/* Typography block — tags above, title below */}
      <div className="pt-4 pb-6">
        <div className="flex flex-wrap gap-2 mb-2">
          {project.filterTags.map((tag) => (
            <span
              key={tag}
              className="font-mono text-[15px] text-fg-muted"
            >
              {tag}
            </span>
          ))}
        </div>
        <h3 className="font-display text-[26px] leading-snug text-fg-base group-hover:italic transition-all duration-300">
          {project.title}
        </h3>
      </div>
    </Link>
  )
}

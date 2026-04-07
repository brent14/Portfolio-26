import Link from 'next/link'
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
      {/* Image area — solid spot color fill */}
      <div className="aspect-[4/3] relative overflow-hidden">
        {/* Solid spot color — cycles through all 5 */}
        <div
          className="absolute inset-0 transition-opacity duration-500 group-hover:opacity-80"
          style={{ backgroundColor: spotColor }}
        />
        {/* Index number — screen print register mark feel */}
        <span className="absolute top-4 left-4 font-mono text-xs text-fg-base/20 group-hover:text-fg-on-alt/30 transition-colors">
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

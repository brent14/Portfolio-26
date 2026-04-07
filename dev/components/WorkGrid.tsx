'use client'

import { useState, useMemo } from 'react'
import { projects, type FilterTag } from '@/data/projects'
import FilterBar from '@/components/FilterBar'
import WorkCard from '@/components/WorkCard'

export default function WorkGrid() {
  const [activeTags, setActiveTags] = useState<FilterTag[]>([])

  const filtered = useMemo(() => {
    if (activeTags.length === 0) return projects
    return projects.filter((p) =>
      activeTags.every((tag) => p.filterTags.includes(tag))
    )
  }, [activeTags])

  return (
    <div>
      <div className="mb-8">
        <FilterBar active={activeTags} onChange={setActiveTags} />
      </div>

      {filtered.length === 0 ? (
        <div className="py-16 text-center">
          <p className="font-mono text-sm text-charcoal-muted">
            No projects match that filter combination.
          </p>
          <button
            onClick={() => setActiveTags([])}
            className="font-mono text-sm text-charcoal underline underline-offset-2 mt-2"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((project) => (
            <WorkCard key={project.slug} project={project} />
          ))}
        </div>
      )}
    </div>
  )
}

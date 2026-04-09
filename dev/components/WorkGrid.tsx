'use client'

import { useState, useMemo } from 'react'
import Image from 'next/image'
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
          <p className="font-display text-3xl md:text-5xl text-fg-muted mb-8">
            No projects match that filter combination.
          </p>
          <Image
            src="/work/images/homer-no-projects.gif"
            alt="No projects found"
            width={320}
            height={240}
            className="mx-auto"
            unoptimized
          />
          <button
            onClick={() => setActiveTags([])}
            className="font-mono text-sm text-fg-base underline underline-offset-2 mt-2"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
          {filtered.map((project, i) => (
            <WorkCard key={project.slug} project={project} index={i} />
          ))}
        </div>
      )}
    </div>
  )
}

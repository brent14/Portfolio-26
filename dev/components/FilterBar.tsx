'use client'

import { ALL_FILTER_TAGS, type FilterTag } from '@/data/projects'

interface FilterBarProps {
  active: FilterTag[]
  onChange: (tags: FilterTag[]) => void
}

export default function FilterBar({ active, onChange }: FilterBarProps) {
  const toggle = (tag: FilterTag) => {
    if (active.includes(tag)) {
      onChange(active.filter((t) => t !== tag))
    } else {
      onChange([...active, tag])
    }
  }

  const clearAll = () => onChange([])

  return (
    <div className="flex flex-wrap items-center gap-2">
      <button
        onClick={clearAll}
        style={active.length === 0 ? { backgroundColor: 'var(--color-spot-4)', color: 'var(--color-bg-base)', borderColor: 'var(--color-spot-4)' } : {}}
        className={`font-mono text-base px-3 py-1.5 border transition-colors cursor-pointer ${
          active.length === 0
            ? 'border-transparent'
            : 'bg-transparent text-fg-base border-fg-base/30 hover:border-fg-base/15 hover:text-fg-base/50'
        }`}
      >
        All
      </button>
      {ALL_FILTER_TAGS.map((tag) => {
        const isActive = active.includes(tag)
        return (
          <button
            key={tag}
            onClick={() => toggle(tag)}
            style={isActive ? { backgroundColor: 'var(--color-spot-4)', color: 'var(--color-bg-base)', borderColor: 'var(--color-spot-4)' } : {}}
            className={`font-mono text-base px-3 py-1.5 border transition-colors cursor-pointer ${
              isActive
                ? 'border-transparent'
                : 'bg-transparent text-fg-base border-fg-base/30 hover:border-fg-base/15 hover:text-fg-base/50'
            }`}
          >
            {tag}
          </button>
        )
      })}
    </div>
  )
}

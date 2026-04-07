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
      {active.length > 0 && (
        <button
          onClick={clearAll}
          className="font-mono text-sm text-fg-base/40 hover:text-fg-base transition-colors mr-2 tracking-widest uppercase"
        >
          All
        </button>
      )}
      {ALL_FILTER_TAGS.map((tag) => {
        const isActive = active.includes(tag)
        return (
          <button
            key={tag}
            onClick={() => toggle(tag)}
            style={isActive ? { backgroundColor: 'var(--color-spot-1)', color: 'var(--color-fg-on-alt)', borderColor: 'var(--color-spot-1)' } : {}}
            className={`font-mono text-sm px-3 py-1.5 border transition-colors ${
              isActive
                ? 'border-transparent'
                : 'bg-transparent text-fg-base/50 border-fg-base/15 hover:border-fg-base/40 hover:text-fg-base'
            }`}
          >
            {tag}
          </button>
        )
      })}
    </div>
  )
}

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
          className="font-mono text-xs text-charcoal-muted hover:text-charcoal underline underline-offset-2 transition-colors mr-2"
        >
          Clear
        </button>
      )}
      {ALL_FILTER_TAGS.map((tag) => {
        const isActive = active.includes(tag)
        return (
          <button
            key={tag}
            onClick={() => toggle(tag)}
            className={`font-mono text-xs px-3 py-1.5 border transition-colors ${
              isActive
                ? 'bg-charcoal text-cream border-charcoal'
                : 'bg-transparent text-charcoal-muted border-charcoal/20 hover:border-charcoal hover:text-charcoal'
            }`}
          >
            {tag}
          </button>
        )
      })}
    </div>
  )
}

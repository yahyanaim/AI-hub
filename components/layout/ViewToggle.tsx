'use client'

import { FacetedGlyph } from '@/components/ui/FacetedGlyph'
import { cn } from '@/lib/utils'

interface ViewToggleProps {
  view: 'grid' | 'list'
  onChange: (view: 'grid' | 'list') => void
}

export function ViewToggle({ view, onChange }: ViewToggleProps) {
  return (
    <div className="flex items-center rounded-md border border-border bg-card p-0.5">
      <button
        onClick={() => onChange('grid')}
        className={cn(
          'rounded-sm p-1.5 transition-colors',
          view === 'grid'
            ? 'bg-muted text-foreground'
            : 'text-muted-foreground hover:text-muted-foreground'
        )}
        aria-label="Grid view"
        aria-pressed={view === 'grid'}
      >
        <FacetedGlyph kind="grid" className="h-4 w-4" />
      </button>
      <button
        onClick={() => onChange('list')}
        className={cn(
          'rounded-sm p-1.5 transition-colors',
          view === 'list'
            ? 'bg-muted text-foreground'
            : 'text-muted-foreground hover:text-muted-foreground'
        )}
        aria-label="List view"
        aria-pressed={view === 'list'}
      >
        <FacetedGlyph kind="list" className="h-4 w-4" />
      </button>
    </div>
  )
}

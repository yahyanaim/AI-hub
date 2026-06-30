'use client'

import { useState, useRef, useEffect } from 'react'
import { ChevronDown, Check, X } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface FilterOption {
  value: string
  label: string
}

interface DropdownProps {
  label: string
  value: string
  options: FilterOption[]
  onChange: (value: string) => void
  align?: 'left' | 'right'
}

export function Dropdown({
  label,
  value,
  options,
  onChange,
  align = 'left',
}: DropdownProps) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const selected = options.find((o) => o.value === value)

  useEffect(() => {
    if (!open) return
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', onClick)
    return () => document.removeEventListener('mousedown', onClick)
  }, [open])

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className={cn(
          'flex items-center gap-2 rounded-md border border-border bg-card px-3 py-2 text-sm transition-colors',
          open
            ? 'border-ring'
            : 'hover:border-ring',
          value !== 'all' ? 'text-foreground' : 'text-muted-foreground'
        )}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span className="text-muted-foreground">{label}:</span>
        <span className="font-medium">{selected?.label ?? value}</span>
        <ChevronDown
          className={cn('h-4 w-4 text-muted-foreground transition-transform', open && 'rotate-180')}
        />
      </button>

      {open && (
        <div
          role="listbox"
          className={cn(
            'absolute z-30 mt-2 min-w-[200px] overflow-hidden rounded-md border border-border bg-card py-1 shadow-xl animate-fade-in',
            align === 'right' ? 'right-0' : 'left-0'
          )}
        >
          {options.map((opt) => (
            <button
              key={opt.value}
              role="option"
              aria-selected={opt.value === value}
              onClick={() => {
                onChange(opt.value)
                setOpen(false)
              }}
              className={cn(
                'flex w-full items-center justify-between px-3 py-2 text-left text-sm transition-colors hover:bg-muted',
                opt.value === value
                  ? 'text-accent'
                  : 'text-muted-foreground'
              )}
            >
              {opt.label}
              {opt.value === value && <Check className="h-4 w-4" />}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

interface ChipFilterProps {
  label: string
  options: FilterOption[]
  value: string
  onChange: (value: string) => void
}

// Category filter chips
export function ChipFilter({ label, options, value, onChange }: ChipFilterProps) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="shrink-0 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        {label}
      </span>
      {options.map((opt) => (
        <button
          key={opt.value}
          onClick={() => onChange(opt.value)}
          className={cn(
            'shrink-0 rounded-full border px-3 py-1 text-xs font-medium transition-colors',
            value === opt.value
              ? 'border-accent bg-accent/10 text-accent'
              : 'border-border bg-card text-muted-foreground hover:border-ring hover:text-foreground'
          )}
        >
          {opt.label}
        </button>
      ))}
    </div>
  )
}

export function ClearButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-1 rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
    >
      <X className="h-4 w-4" />
      Clear
    </button>
  )
}

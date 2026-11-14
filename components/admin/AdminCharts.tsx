'use client'

import { useState } from 'react'
import { cn, formatNumber } from '@/lib/utils'

export function MiniSparkline({
  values,
  strokeClass = 'stroke-brand-orange',
}: {
  values: number[]
  strokeClass?: string
}) {
  if (values.length < 2) return null
  const max = Math.max(...values, 1)
  const min = Math.min(...values, 0)
  const span = Math.max(max - min, 1)
  const w = 72
  const h = 24
  const points = values
    .map((v, i) => {
      const x = (i / (values.length - 1)) * w
      const y = h - ((v - min) / span) * (h - 4) - 2
      return `${x.toFixed(1)},${y.toFixed(1)}`
    })
    .join(' ')

  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className="shrink-0 overflow-visible">
      <polyline
        fill="none"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={strokeClass}
        points={points}
      />
    </svg>
  )
}

export type ChartSeriesDef = {
  key: string
  label: string
  colorClass: string
  dotClass: string
}

export function BarTrendChart({
  title,
  subtitle,
  data,
  series,
  emptyLabel = 'No events recorded in this period yet.',
}: {
  title: string
  subtitle?: string
  data: Array<Record<string, string | number>>
  series: ChartSeriesDef[]
  emptyLabel?: string
}) {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null)

  const totals = data.map((row) =>
    series.reduce((sum, s) => sum + (Number(row[s.key]) || 0), 0)
  )
  const maxVal = Math.max(...totals, 0)
  const hasAny = maxVal > 0
  const hovered = hoveredIdx !== null ? data[hoveredIdx] : null

  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <div className="mb-4 flex flex-wrap items-start justify-between gap-2">
        <div>
          <h3 className="font-heading text-sm font-semibold text-foreground">{title}</h3>
          {subtitle && <p className="mt-0.5 text-xs text-muted-foreground">{subtitle}</p>}
        </div>
        <div className="flex flex-wrap items-center gap-3">
          {series.map((s) => (
            <span key={s.key} className="inline-flex items-center gap-1.5 text-[11px] text-muted-foreground">
              <span className={cn('h-2 w-2 rounded-full', s.dotClass)} />
              {s.label}
            </span>
          ))}
        </div>
      </div>

      {!hasAny ? (
        <div className="flex h-44 items-center justify-center rounded-lg border border-dashed border-border/80 bg-secondary/20 px-4 text-center text-xs text-muted-foreground">
          {emptyLabel}
        </div>
      ) : (
        <div className="relative">
          {hovered && (
            <div className="mb-2 flex flex-wrap items-center justify-between gap-2 rounded-lg border border-border bg-secondary/50 px-3 py-1.5 text-xs">
              <span className="font-medium text-foreground">{String(hovered.date)}</span>
              <div className="flex flex-wrap items-center gap-3">
                {series.map((s) => (
                  <span key={s.key} className="text-muted-foreground">
                    {s.label}:{' '}
                    <strong className="font-semibold text-foreground">
                      {formatNumber(Number(hovered[s.key]) || 0)}
                    </strong>
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="flex h-44 items-end gap-1 pt-2">
            {data.map((row, idx) => {
              const total = totals[idx] ?? 0
              const pct = maxVal > 0 ? Math.max((total / maxVal) * 100, total > 0 ? 4 : 0) : 0
              return (
                <div
                  key={String(row.date)}
                  onMouseEnter={() => setHoveredIdx(idx)}
                  onMouseLeave={() => setHoveredIdx(null)}
                  className="group flex h-full min-w-0 flex-1 flex-col items-center justify-end"
                >
                  <div
                    style={{ height: `${pct}%` }}
                    className={cn(
                      'flex w-full max-w-[26px] flex-col-reverse overflow-hidden rounded-t-sm transition-opacity',
                      hoveredIdx !== null && hoveredIdx !== idx ? 'opacity-45' : 'opacity-100'
                    )}
                  >
                    {series.map((s) => {
                      const v = Number(row[s.key]) || 0
                      if (v <= 0 || total <= 0) return null
                      const segPct = (v / total) * 100
                      return (
                        <div
                          key={s.key}
                          style={{ height: `${segPct}%` }}
                          className={cn('w-full', s.colorClass)}
                        />
                      )
                    })}
                  </div>
                </div>
              )
            })}
          </div>

          <div className="mt-2 flex items-center justify-between border-t border-border/70 pt-2 text-[10px] text-muted-foreground">
            <span>{String(data[0]?.date ?? '')}</span>
            <span>Peak: {formatNumber(maxVal)}</span>
            <span>{String(data[data.length - 1]?.date ?? '')}</span>
          </div>
        </div>
      )}
    </div>
  )
}

export function HorizontalBreakdown({
  title,
  subtitle,
  items,
}: {
  title: string
  subtitle?: string
  items: Array<{ label: string; value: number; max?: number; colorClass?: string }>
}) {
  const max = Math.max(...items.map((i) => i.max ?? i.value), 1)

  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <div className="mb-4">
        <h3 className="font-heading text-sm font-semibold text-foreground">{title}</h3>
        {subtitle && <p className="mt-0.5 text-xs text-muted-foreground">{subtitle}</p>}
      </div>
      <div className="space-y-3">
        {items.map((item) => {
          const denom = item.max ?? max
          const pct = denom > 0 ? Math.min(100, Math.round((item.value / denom) * 100)) : 0
          return (
            <div key={item.label} className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="truncate font-medium text-foreground">{item.label}</span>
                <span className="shrink-0 tabular-nums text-muted-foreground">
                  {formatNumber(item.value)}
                  {item.max !== undefined ? ` / ${formatNumber(item.max)}` : ''}
                </span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
                <div
                  style={{ width: `${pct}%` }}
                  className={cn('h-full rounded-full transition-all', item.colorClass ?? 'bg-brand-orange')}
                />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default function Loading() {
  return (
    <div className="container-page py-8" role="status" aria-label="Loading">
      <div className="mb-8 h-10 w-64 animate-pulse rounded-lg bg-muted" />
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-48 animate-pulse rounded-2xl border border-border bg-card" />
        ))}
      </div>
    </div>
  )
}

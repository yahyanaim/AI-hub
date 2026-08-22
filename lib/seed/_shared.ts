// Stable ISO timestamps (seeded relative to a fixed base so listings look "recent")
export const NOW = '2026-06-25T09:00:00.000Z'
export const daysAgo = (d: number) =>
  new Date(new Date(NOW).getTime() - d * 86400000).toISOString()

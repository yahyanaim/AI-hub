import { FacetedArt } from '@/components/ui/FacetedArt'

/** Decorative artwork reserved for support and donation cards. */
export function SupportArt({ kind = 'heart', size = 96, className }: {
  kind?: 'heart' | 'coffee' | 'bank' | 'share'
  size?: number
  className?: string
}) {
  return <FacetedArt kind={kind} size={size} className={className} />
}

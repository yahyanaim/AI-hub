import { Logo } from '@/components/ui/Logo'
import type { Offer } from '@/types'

export function OfferLogo({ offer, size = 56 }: { offer: Offer; size?: number }) {
  if (!offer.partnerLogos?.length) {
    return <Logo src={offer.logoUrl} name={offer.name} size={size} />
  }

  return (
    <div className="flex shrink-0 flex-col items-center gap-2" style={{ width: size }}>
      {offer.partnerLogos.map((partner) => (
        <Logo
          key={partner.name}
          src={partner.url}
          name={partner.name}
          size={size}
          className="rounded-full"
        />
      ))}
    </div>
  )
}

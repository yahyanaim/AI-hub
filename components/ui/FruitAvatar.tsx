const PALETTES = [
  { body: '#FF6B6B', leaf: '#4CAF50', bg: '#FFE8E8' },
  { body: '#FFB020', leaf: '#2E7D32', bg: '#FFF3DD' },
  { body: '#F7C948', leaf: '#43A047', bg: '#FFF9E0' },
  { body: '#8BC34A', leaf: '#33691E', bg: '#EDF7E2' },
  { body: '#5C7CFA', leaf: '#66BB6A', bg: '#E7ECFF' },
  { body: '#B388FF', leaf: '#26A69A', bg: '#F1EAFE' },
]

function hashName(name: string): number {
  let hash = 0
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash)
  }
  return Math.abs(hash)
}

interface FruitAvatarProps {
  name: string
  size?: number
  className?: string
}

/** Facebook-style generated mascot avatar: a friendly fruit character
 *  derived deterministically from the username. */
export function FruitAvatar({ name, size = 32, className }: FruitAvatarProps) {
  const h = hashName(name)
  const kind = h % 6
  const p = PALETTES[(h >> 3) % PALETTES.length] ?? PALETTES[0]!

  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      className={className}
      role="img"
      aria-label={`${name} avatar`}
    >
      <circle cx="50" cy="50" r="50" fill={p.bg} />
      {kind === 0 && (
        // apple
        <g>
          <path d="M50 22 C 53 16 60 13 66 14" stroke="#7A4A2B" strokeWidth="4" fill="none" strokeLinecap="round" />
          <ellipse cx="68" cy="17" rx="10" ry="6" fill={p.leaf} transform="rotate(25 68 17)" />
          <circle cx="50" cy="58" r="34" fill={p.body} />
          <circle cx="50" cy="58" r="34" fill="none" stroke="rgba(0,0,0,0.08)" strokeWidth="2" />
        </g>
      )}
      {kind === 1 && (
        // orange with a bite
        <g>
          <ellipse cx="68" cy="30" rx="10" ry="5.5" fill={p.leaf} transform="rotate(-30 68 30)" />
          <circle cx="50" cy="60" r="35" fill={p.body} />
          <circle cx="50" cy="60" r="35" fill="none" stroke="rgba(0,0,0,0.07)" strokeWidth="2" />
          <circle cx="37" cy="48" r="6" fill="rgba(255,255,255,0.25)" />
        </g>
      )}
      {kind === 2 && (
        // lemon
        <g>
          <ellipse cx="50" cy="58" rx="36" ry="29" fill={p.body} transform="rotate(-18 50 58)" />
          <ellipse cx="50" cy="58" rx="36" ry="29" fill="none" stroke="rgba(0,0,0,0.07)" strokeWidth="2" transform="rotate(-18 50 58)" />
          <ellipse cx="22" cy="52" rx="6" ry="4" fill={p.body} transform="rotate(-30 22 52)" />
          <ellipse cx="78" cy="52" rx="6" ry="4" fill={p.body} transform="rotate(30 78 52)" />
          <ellipse cx="80" cy="40" rx="9" ry="5" fill={p.leaf} transform="rotate(25 80 40)" />
        </g>
      )}
      {kind === 3 && (
        // avocado
        <g>
          <path d="M50 18 C 62 18 86 36 86 62 C 86 82 70 92 50 92 C 30 92 14 82 14 62 C 14 36 38 18 50 18 Z" fill="#6B4F3A" />
          <path d="M50 24 C 60 24 80 40 80 62 C 80 78 66 86 50 86 C 34 86 20 78 20 62 C 20 40 40 24 50 24 Z" fill={p.body} />
          <circle cx="50" cy="66" r="15" fill="#8D6E4C" />
          <circle cx="46" cy="62" r="4" fill="rgba(255,255,255,0.35)" />
          <ellipse cx="72" cy="22" rx="9" ry="5" fill={p.leaf} transform="rotate(28 72 22)" />
        </g>
      )}
      {kind === 4 && (
        // blueberry cluster
        <g>
          <circle cx="38" cy="46" r="22" fill={p.body} />
          <circle cx="62" cy="62" r="18" fill={p.body} opacity="0.9" />
          <path d="M38 30 Q 40 22 46 20" stroke={p.leaf} strokeWidth="4" fill="none" strokeLinecap="round" />
          <path d="M62 50 Q 64 44 70 42" stroke={p.leaf} strokeWidth="4" fill="none" strokeLinecap="round" />
          <circle cx="34" cy="40" r="7" fill="rgba(255,255,255,0.22)" />
        </g>
      )}
      {kind === 5 && (
        // watermelon slice
        <g>
          <path d="M12 62 A 38 38 0 0 1 88 62 Z" fill={p.leaf} />
          <path d="M18 62 A 32 32 0 0 1 82 62 Z" fill="#FF6B8A" />
          <circle cx="38" cy="48" r="2.5" fill="#3E2723" />
          <circle cx="55" cy="42" r="2.5" fill="#3E2723" />
          <circle cx="66" cy="52" r="2.5" fill="#3E2723" />
        </g>
      )}

      {/* shared cute face */}
      <g>
        {kind !== 3 && (
          <g>
            <circle cx={40} cy={54} r="7.5" fill="#fff" />
            <circle cx={61} cy={54} r="7.5" fill="#fff" />
            <circle cx={41.5} cy={55} r="3.6" fill="#33302E" />
            <circle cx={62.5} cy={55} r="3.6" fill="#33302E" />
          </g>
        )}
        {kind === 3 && (
          <g>
            <circle cx={44} cy={62} r="6.5" fill="#fff" />
            <circle cx={60} cy={62} r="6.5" fill="#fff" />
            <circle cx={45.5} cy={63} r="3.2" fill="#33302E" />
            <circle cx={61.5} cy={63} r="3.2" fill="#33302E" />
          </g>
        )}
        {kind === 5 ? (
          <path d="M42 60 Q 50 68 58 60" stroke="#33302E" strokeWidth="3.5" fill="none" strokeLinecap="round" />
        ) : (
          <path d="M41 68 Q 50 76 59 68" stroke="#33302E" strokeWidth="3.5" fill="none" strokeLinecap="round" />
        )}
        <circle cx="30" cy="66" r="5" fill="#FF9AA2" opacity="0.55" />
        <circle cx="71" cy="66" r="5" fill="#FF9AA2" opacity="0.55" />
      </g>
    </svg>
  )
}

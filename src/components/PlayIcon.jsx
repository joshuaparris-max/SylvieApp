const icons = {
  flower: (
    <>
      <circle cx="24" cy="18" r="8" />
      <circle cx="36" cy="24" r="8" />
      <circle cx="30" cy="36" r="8" />
      <circle cx="18" cy="30" r="8" />
      <circle cx="28" cy="27" r="5" fill="#fff7ad" />
    </>
  ),
  fairy: (
    <>
      <path d="M14 28c6-14 18-14 24 0" strokeWidth="4" />
      <path d="M20 20c0 8 8 10 14 8" strokeWidth="4" />
      <path d="M20 36c0-8 8-10 14-8" strokeWidth="4" />
      <circle cx="30" cy="30" r="6" fill="#fff7ad" />
    </>
  ),
  wand: (
    <>
      <path d="M18 44 42 20" />
      <circle cx="45" cy="17" r="4" fill="#fff7ad" />
      <path d="M44 10 44 24" />
      <path d="M40 14 48 20" />
    </>
  ),
  crayon: (
    <>
      <rect x="16" y="16" width="28" height="12" rx="3" />
      <path d="M16 16 12 12v16l4-4" />
      <path d="M18 18h24" />
    </>
  ),
  swing: (
    <>
      <path d="M20 14v20" />
      <path d="M40 14v20" />
      <path d="M20 14h20" />
      <path d="M24 34c0 4 4 8 8 8s8-4 8-8" />
    </>
  ),
  farm: (
    <>
      <rect x="12" y="28" width="36" height="22" rx="3" />
      <path d="M14 29 30 14l16 15" />
      <rect x="25" y="36" width="10" height="14" fill="#fff8dc" />
      <path d="M8 50h44" />
    </>
  ),
  crown: (
    <>
      <path d="M12 44h36l-4-25-10 11-8-15-8 15-10-11 4 25Z" />
      <circle cx="18" cy="18" r="3" />
      <circle cx="30" cy="13" r="3" />
      <circle cx="42" cy="18" r="3" />
    </>
  ),
  paint: (
    <>
      <path d="M14 39c2 9 18 10 28 3 8-6 9-19 0-26-11-8-30-2-33 12-1 5 3 6 7 5 4-2 7 2 4 6-2 3-5 3-6 0Z" />
      <circle cx="22" cy="25" r="3" fill="#fff" />
      <circle cx="32" cy="20" r="3" fill="#fff" />
      <circle cx="41" cy="29" r="3" fill="#fff" />
    </>
  ),
  puzzle: (
    <>
      <path d="M16 16h15v8a5 5 0 1 0 0 10v10H16V32h-2a5 5 0 1 1 0-10h2V16Z" />
      <path d="M31 16h13v13h-8a5 5 0 1 1 0 10h8v5H31" />
    </>
  ),
  blocks: (
    <>
      <rect x="10" y="31" width="18" height="18" rx="3" />
      <rect x="31" y="31" width="18" height="18" rx="3" />
      <rect x="21" y="12" width="18" height="18" rx="3" />
      <circle cx="19" cy="36" r="2" fill="#fff" />
      <circle cx="40" cy="36" r="2" fill="#fff" />
      <circle cx="30" cy="17" r="2" fill="#fff" />
    </>
  ),
  truck: (
    <>
      <rect x="8" y="25" width="28" height="18" rx="3" />
      <path d="M36 30h9l7 7v6H36Z" />
      <circle cx="19" cy="46" r="5" fill="#fff" />
      <circle cx="43" cy="46" r="5" fill="#fff" />
      <path d="M16 20h14" />
    </>
  ),
  rainbow: (
    <>
      <path d="M10 42a20 20 0 0 1 40 0" />
      <path d="M17 42a13 13 0 0 1 26 0" />
      <path d="M24 42a6 6 0 0 1 12 0" />
      <path d="M13 45h34" />
    </>
  ),
  sparkleCount: (
    <>
      <circle cx="18" cy="24" r="7" />
      <circle cx="40" cy="19" r="7" />
      <circle cx="32" cy="42" r="7" />
      <path d="M48 34h6M51 31v6M9 42h6M12 39v6" />
    </>
  ),
  patterns: (
    <>
      <circle cx="14" cy="30" r="7" />
      <path d="M30 19 36 31 24 31Z" />
      <circle cx="46" cy="30" r="7" />
      <path d="M10 45h40" />
    </>
  ),
  compare: (
    <>
      <circle cx="18" cy="32" r="6" />
      <circle cx="34" cy="26" r="6" />
      <circle cx="46" cy="38" r="6" />
      <path d="M12 14h20M22 8l10 6-10 6" />
      <path d="M48 50H28M38 44l-10 6 10 6" />
    </>
  ),
  shapes: (
    <>
      <circle cx="17" cy="22" r="8" />
      <rect x="33" y="14" width="16" height="16" rx="3" />
      <path d="M30 35 42 52H18Z" />
    </>
  ),
  words: (
    <>
      <rect x="10" y="15" width="40" height="30" rx="6" />
      <path d="M18 25h24M18 34h16" stroke="#fff" />
      <circle cx="44" cy="43" r="7" />
    </>
  ),
  moon: (
    <path d="M38 44c-11 3-23-5-23-17 0-8 5-15 12-18-2 10 5 20 16 21-2 6-5 10-5 14Z" />
  ),
  settings: (
    <>
      <circle cx="30" cy="30" r="7" fill="#fff" />
      <path d="M30 10v8M30 42v8M10 30h8M42 30h8M16 16l6 6M38 38l6 6M44 16l-6 6M22 38l-6 6" />
    </>
  ),
}

export default function PlayIcon({ name, className = '' }) {
  return (
    <svg
      viewBox="0 0 60 60"
      className={className}
      aria-hidden="true"
      fill="currentColor"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="3"
    >
      {icons[name] || icons.flower}
    </svg>
  )
}

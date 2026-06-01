function PlantRows() {
  return (
    <>
      <circle cx="20" cy="72" r="6" fill="#ef6f8f" />
      <circle cx="34" cy="72" r="6" fill="#f59e0b" />
      <circle cx="48" cy="72" r="6" fill="#4ade80" />
      <path d="M14 82h84" stroke="#7c4a26" strokeWidth="5" strokeLinecap="round" />
      <path d="M20 66v-8M34 66v-8M48 66v-8" stroke="#15803d" strokeWidth="4" strokeLinecap="round" />
    </>
  )
}

function Princess({ dress = '#93c5fd', hair = '#7c4a26', crown = true }) {
  return (
    <>
      {crown ? (
        <path d="M50 30 58 16l8 14 9-10 3 22H47l3-22 8 10Z" fill="#ffd166" />
      ) : null}
      <circle cx="62" cy="48" r="14" fill="#ffd8b5" />
      <path d="M47 47c2-16 27-19 31 1-10-5-20-5-31-1Z" fill={hair} />
      <path d="M62 62 86 104H38L62 62Z" fill={dress} />
      <circle cx="57" cy="48" r="2" fill="#172033" />
      <circle cx="67" cy="48" r="2" fill="#172033" />
      <path d="M57 56c3 3 7 3 10 0" stroke="#172033" strokeWidth="2" strokeLinecap="round" />
    </>
  )
}

function FavoritePicture({ kind, title }) {
  return (
    <svg
      className={`favorite-picture favorite-picture-${kind}`}
      viewBox="0 0 120 120"
      role="img"
      aria-label={title}
    >
      <rect width="120" height="120" rx="16" fill="currentColor" opacity="0.12" />
      {kind === 'fairy' ? (
        <>
          <circle cx="88" cy="24" r="10" fill="#ffd166" />
          <path d="M18 94c16-24 46-34 82-16v22H18Z" fill="#73d69f" />
          <path d="M48 50c-14-22-32-4-18 10 10 10 18 2 18-10Z" fill="#bae6fd" />
          <path d="M72 50c14-22 32-4 18 10-10 10-18 2-18-10Z" fill="#f0abfc" />
          <circle cx="60" cy="50" r="10" fill="#ffd8b5" />
          <path d="M60 62 48 94h24L60 62Z" fill="#ef6f8f" />
          <path d="M38 82v-18M82 82V64" stroke="#15803d" strokeWidth="4" strokeLinecap="round" />
          <circle cx="38" cy="60" r="9" fill="#f9a8d4" />
          <circle cx="82" cy="60" r="9" fill="#fff7ad" />
        </>
      ) : null}
      {kind === 'farm' ? (
        <>
          <rect x="14" y="50" width="46" height="34" rx="4" fill="#ef4444" />
          <path d="M11 52 37 29l26 23Z" fill="#7c2d12" />
          <rect x="32" y="64" width="12" height="20" fill="#fff7ed" />
          <circle cx="82" cy="58" r="11" fill="#fff7ed" />
          <circle cx="78" cy="56" r="2" fill="#172033" />
          <path d="M88 58h8M72 58h-8" stroke="#fff7ed" strokeWidth="6" strokeLinecap="round" />
          <PlantRows />
        </>
      ) : null}
      {kind === 'piglet' ? (
        <>
          <circle cx="60" cy="60" r="31" fill="#f9a8d4" />
          <path d="M34 39 24 24l22 8M86 39l10-15-22 8" fill="#f9a8d4" />
          <ellipse cx="60" cy="68" rx="16" ry="11" fill="#fda4af" />
          <circle cx="54" cy="67" r="2.5" fill="#172033" />
          <circle cx="66" cy="67" r="2.5" fill="#172033" />
          <circle cx="49" cy="55" r="3" fill="#172033" />
          <circle cx="71" cy="55" r="3" fill="#172033" />
          <path d="M50 81c7 5 13 5 20 0" stroke="#172033" strokeWidth="3" strokeLinecap="round" />
        </>
      ) : null}
      {kind === 'puppy' ? (
        <>
          <circle cx="60" cy="60" r="30" fill="#7dd3fc" />
          <path d="M32 42c-10 12-9 30 4 33 10-9 10-23-4-33ZM88 42c10 12 9 30-4 33-10-9-10-23 4-33Z" fill="#38bdf8" />
          <circle cx="49" cy="58" r="3" fill="#172033" />
          <circle cx="71" cy="58" r="3" fill="#172033" />
          <path d="M60 64 53 72h14Z" fill="#172033" />
          <path d="M50 78c8 6 12 6 20 0" stroke="#172033" strokeWidth="3" strokeLinecap="round" />
        </>
      ) : null}
      {kind === 'ocean-princess' ? (
        <>
          <path d="M0 86c20-10 35 10 54 0s35-10 66 0v34H0Z" fill="#67e8f9" />
          <Princess dress="#f97316" hair="#3f2a1d" />
          <path d="M18 38c12-12 22-12 34 0" stroke="#0e7490" strokeWidth="5" strokeLinecap="round" />
          <circle cx="26" cy="44" r="6" fill="#fff7ad" />
        </>
      ) : null}
      {kind === 'ice-sisters' ? (
        <>
          <path d="M18 90 38 40l18 50ZM52 94 78 26l24 68Z" fill="#bfdbfe" />
          <Princess dress="#bae6fd" hair="#f8fafc" />
          <g transform="translate(-28, 8) scale(.78)">
            <Princess dress="#c4b5fd" hair="#a16207" crown={false} />
          </g>
          <path d="M18 104h86" stroke="#e0f2fe" strokeWidth="8" strokeLinecap="round" />
        </>
      ) : null}
      {kind === 'book-princess' ? (
        <>
          <rect x="18" y="72" width="84" height="22" rx="4" fill="#92400e" />
          <rect x="20" y="42" width="30" height="24" rx="3" fill="#fef3c7" />
          <rect x="52" y="42" width="30" height="24" rx="3" fill="#fde68a" />
          <Princess dress="#facc15" hair="#7c2d12" />
        </>
      ) : null}
      {kind === 'mermaid' ? (
        <>
          <path d="M0 84c19-8 33 8 51 0s35-8 69 0v36H0Z" fill="#67e8f9" />
          <circle cx="62" cy="42" r="13" fill="#ffd8b5" />
          <path d="M47 39c5-18 31-16 34 4-12-8-23-8-34-4Z" fill="#be185d" />
          <path d="M60 57c14 12 24 27 16 45-12-4-23-13-28-28Z" fill="#06d6a0" />
          <path d="M77 98c10 1 16 7 20 15-13 2-23-1-30-10Z" fill="#14b8a6" />
          <circle cx="56" cy="43" r="2" fill="#172033" />
          <circle cx="67" cy="43" r="2" fill="#172033" />
          <circle cx="28" cy="74" r="7" fill="#fff7ad" />
        </>
      ) : null}
      {kind === 'mouse-friend' ? (
        <>
          <circle cx="38" cy="40" r="18" fill="#334155" />
          <circle cx="82" cy="40" r="18" fill="#334155" />
          <circle cx="60" cy="62" r="30" fill="#475569" />
          <circle cx="50" cy="59" r="3" fill="#fff" />
          <circle cx="70" cy="59" r="3" fill="#fff" />
          <ellipse cx="60" cy="70" rx="8" ry="6" fill="#f9a8d4" />
          <path d="M42 90h36l-8 20H50Z" fill="#ef6f8f" />
          <circle cx="52" cy="98" r="3" fill="#fff" />
          <circle cx="66" cy="98" r="3" fill="#fff" />
          <path d="M44 28c8-11 24-11 32 0" stroke="#ffd166" strokeWidth="5" strokeLinecap="round" />
        </>
      ) : null}
      {kind === 'sorting-truck' ? (
        <>
          <rect x="10" y="64" width="72" height="28" rx="6" fill="#06d6a0" />
          <path d="M82 72h18l12 12v8H82Z" fill="#118ab2" />
          <circle cx="32" cy="96" r="9" fill="#172033" />
          <circle cx="91" cy="96" r="9" fill="#172033" />
          <circle cx="32" cy="96" r="4" fill="#fff" />
          <circle cx="91" cy="96" r="4" fill="#fff" />
          <rect x="18" y="38" width="18" height="22" rx="3" fill="#dbeafe" />
          <rect x="44" y="34" width="18" height="26" rx="3" fill="#dcfce7" />
          <rect x="70" y="40" width="18" height="20" rx="3" fill="#e2e8f0" />
        </>
      ) : null}
      {kind === 'colouring' ? (
        <>
          <rect x="22" y="28" width="66" height="64" rx="8" fill="#fff" />
          <path d="M34 74c9-24 24-24 34 0" stroke="#8b5cf6" strokeWidth="5" strokeLinecap="round" />
          <rect x="76" y="40" width="12" height="52" rx="5" fill="#ef476f" transform="rotate(20 82 66)" />
          <circle cx="30" cy="100" r="8" fill="#ffd166" />
          <circle cx="50" cy="100" r="8" fill="#06d6a0" />
          <circle cx="70" cy="100" r="8" fill="#118ab2" />
        </>
      ) : null}
      {kind === 'swing' ? (
        <>
          <path d="M28 22v60M92 22v60M28 22h64" stroke="#7c3aed" strokeWidth="7" strokeLinecap="round" />
          <path d="M44 32v42M76 32v42" stroke="#334155" strokeWidth="4" strokeLinecap="round" />
          <rect x="40" y="72" width="40" height="12" rx="6" fill="#f59e0b" />
          <path d="M14 100h92" stroke="#73d69f" strokeWidth="8" strokeLinecap="round" />
        </>
      ) : null}
      {kind === 'trampoline' ? (
        <>
          <ellipse cx="60" cy="76" rx="42" ry="16" fill="#93c5fd" stroke="#2563eb" strokeWidth="7" />
          <path d="M32 84v20M88 84v20" stroke="#334155" strokeWidth="5" strokeLinecap="round" />
          <circle cx="60" cy="38" r="12" fill="#ffd8b5" />
          <path d="M42 56c12 10 24 10 36 0" stroke="#ef6f8f" strokeWidth="7" strokeLinecap="round" />
          <path d="M42 28c10-10 26-10 36 0" stroke="#ffd166" strokeWidth="4" strokeLinecap="round" />
        </>
      ) : null}
      {kind === 'dress-up' ? (
        <>
          <path d="M35 74c-10 7-16 16-10 22 14 4 24 0 32-12Z" fill="#ef6f8f" />
          <path d="M69 74c10 7 16 16 10 22-14 4-24 0-32-12Z" fill="#8b5cf6" />
          <path d="M30 36h60l-12 28H42Z" fill="#f9a8d4" />
          <path d="M39 32 60 16l21 16" fill="#ffd166" />
          <circle cx="44" cy="48" r="3" fill="#fff" />
          <circle cx="60" cy="48" r="3" fill="#fff" />
          <circle cx="76" cy="48" r="3" fill="#fff" />
        </>
      ) : null}
      {kind === 'wand' ? (
        <>
          <path d="M30 96 86 40" stroke="#6d28d9" strokeWidth="8" strokeLinecap="round" />
          <path d="M84 18 90 35l18 1-14 11 5 18-15-10-15 10 5-18-14-11 18-1Z" fill="#ffd166" />
          <circle cx="26" cy="36" r="6" fill="#f0abfc" />
          <circle cx="42" cy="24" r="4" fill="#93c5fd" />
          <circle cx="20" cy="56" r="4" fill="#86efac" />
        </>
      ) : null}
      {kind === 'puzzle' ? (
        <>
          <path d="M24 24h32v17a9 9 0 1 0 0 18v37H24V70h-5a9 9 0 1 1 0-18h5Z" fill="#93c5fd" />
          <path d="M56 24h40v32H78a9 9 0 1 0 0 18h18v22H56Z" fill="#f9a8d4" />
          <path d="M32 90h56" stroke="#fff" strokeWidth="5" strokeLinecap="round" />
        </>
      ) : null}
      {kind === 'blocks' ? (
        <>
          <rect x="22" y="70" width="30" height="26" rx="4" fill="#ef476f" />
          <rect x="56" y="70" width="30" height="26" rx="4" fill="#ffd166" />
          <rect x="38" y="40" width="30" height="26" rx="4" fill="#06d6a0" />
          <rect x="70" y="38" width="30" height="28" rx="4" fill="#118ab2" />
          <circle cx="34" cy="76" r="3" fill="#fff" />
          <circle cx="68" cy="76" r="3" fill="#fff" />
          <circle cx="50" cy="46" r="3" fill="#fff" />
          <circle cx="82" cy="44" r="3" fill="#fff" />
        </>
      ) : null}
    </svg>
  )
}

export default FavoritePicture

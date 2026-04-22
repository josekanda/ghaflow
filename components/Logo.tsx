"use client"

import { cn } from "@/lib/utils"

/* ─────────────────────────────────────────────────────────────
   GhaflowLogo — chain-link symbol + northeast arrow
   Faithful SVG reproduction of the brand concept image.

   Two interlocked rounded-squares (chain links) at -35°,
   with gradient fill + highlight stroke for a 3-D feel,
   plus a large ↗ arrow in the same blue→green gradient.
   ──────────────────────────────────────────────────────────── */

interface LogoProps {
  size?:      number
  variant?:   "color" | "mono" | "white"
  animated?:  boolean
  className?: string
}

export default function GhaflowLogo({
  size      = 40,
  variant   = "color",
  animated  = true,
  className,
}: LogoProps) {

  const isColor = variant === "color"
  const isMono  = variant === "mono"

  /* Colours */
  const c1     = isColor ? "#0D5FE8" : isMono ? "#374151" : "#FFFFFF"   // electric blue
  const c2     = isColor ? "#00CFA0" : isMono ? "#6B7280" : "#FFFFFF"   // emerald teal
  const c1mid  = isColor ? "#0880D8" : c1
  const txtCol = "#FFFFFF"
  const accCol = isColor ? "#00E5FF" : isMono ? "#9CA3AF" : "#FFFFFF"

  /* Unique IDs per variant (header vs footer coexist in the DOM) */
  const V       = variant
  const gMain   = `gfgm-${V}`   // main diagonal gradient
  const gFill   = `gfgf-${V}`   // semi-transparent fill gradient
  const gArrow  = `gfga-${V}`   // arrow gradient
  const fGlow   = `gffw-${V}`   // outer glow filter
  const fSharp  = `gffs-${V}`   // crisp glow filter
  const ctId    = `gfct-${V}`   // clip top half
  const cbId    = `gfcb-${V}`   // clip bottom half

  /* Shared rounded-square geometry (22 × 22, rx=5) */
  const sq = { x: -11, y: -11, width: 22, height: 22, rx: 5 } as const

  return (
    <a
      href="#"
      className={cn("inline-flex items-center gap-3 select-none", className)}
      aria-label="Ghaflow — Accueil"
    >
      {/* ── SVG icon — 56 × 56 internal canvas ─────────── */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 56 56"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        style={animated ? { animation: "gfloat 3s ease-in-out infinite" } : undefined}
      >
        <defs>
          {/* Main diagonal gradient (blue → teal) */}
          <linearGradient id={gMain} x1="0" y1="1" x2="1" y2="0">
            <stop offset="0%"   stopColor={c1}/>
            <stop offset="50%"  stopColor={c1mid}/>
            <stop offset="100%" stopColor={c2}/>
          </linearGradient>

          {/* Semi-transparent fill for 3-D depth illusion */}
          <linearGradient id={gFill} x1="0" y1="1" x2="1" y2="0">
            <stop offset="0%"   stopColor={c1}  stopOpacity="0.18"/>
            <stop offset="100%" stopColor={c2}  stopOpacity="0.08"/>
          </linearGradient>

          {/* Arrow gradient */}
          <linearGradient id={gArrow} x1="0" y1="1" x2="1" y2="0">
            <stop offset="0%"   stopColor={c1mid}/>
            <stop offset="100%" stopColor={c2}/>
          </linearGradient>

          {/* Outer soft glow */}
          <filter id={fGlow} x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation="2.8" result="b"/>
            <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>

          {/* Tighter glow for stroke/highlight details */}
          <filter id={fSharp} x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="1.2" result="b"/>
            <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>

          {/* Clip — upper half: Link 1 goes BEHIND Link 2 */}
          <clipPath id={ctId}>
            <rect x="0" y="0" width="56" height="28"/>
          </clipPath>

          {/* Clip — lower half: Link 1 comes IN FRONT of Link 2 */}
          <clipPath id={cbId}>
            <rect x="0" y="28" width="56" height="28"/>
          </clipPath>

          <style>{`
            @keyframes gfloat {
              0%,100% { transform: translateY(0); }
              50%      { transform: translateY(-1.8px); }
            }
          `}</style>
        </defs>

        {/* ════════════════════════════════════════════════
            CHAIN LINKS — both at −35° ("chain" angle)
            Positions:  Link 1 (19, 33) · Link 2 (35, 21)
            Interlocking: 3-pass clipPath technique
        ════════════════════════════════════════════════ */}

        {/* ── Link 1 — upper clip → goes BEHIND Link 2 ── */}
        <g clipPath={`url(#${ctId})`}>
          <g transform="translate(19,33) rotate(-35)">
            {/* gradient fill for depth */}
            <rect {...sq} fill={`url(#${gFill})`}/>
            {/* outer glow ring */}
            <rect {...sq} stroke={`url(#${gMain})`} strokeWidth="4.5" strokeOpacity="0.25" filter={`url(#${fGlow})`}/>
            {/* main visible ring */}
            <rect {...sq} stroke={`url(#${gMain})`} strokeWidth="2.8"/>
            {/* inner highlight */}
            <rect x="-8" y="-8" width="16" height="16" rx="3.5"
              stroke={`url(#${gMain})`} strokeWidth="0.7" strokeOpacity="0.45"/>
          </g>
        </g>

        {/* ── Link 2 — full (on top in upper zone) ────── */}
        <g>
          <g transform="translate(35,21) rotate(-35)">
            <rect {...sq} fill={`url(#${gFill})`}/>
            <rect {...sq} stroke={`url(#${gMain})`} strokeWidth="4.5" strokeOpacity="0.25" filter={`url(#${fGlow})`}/>
            <rect {...sq} stroke={`url(#${gMain})`} strokeWidth="2.8"/>
            <rect x="-8" y="-8" width="16" height="16" rx="3.5"
              stroke={`url(#${gMain})`} strokeWidth="0.7" strokeOpacity="0.45"/>
          </g>
        </g>

        {/* ── Link 1 — lower clip → IN FRONT of Link 2 ── */}
        <g clipPath={`url(#${cbId})`}>
          <g transform="translate(19,33) rotate(-35)">
            <rect {...sq} fill={`url(#${gFill})`}/>
            <rect {...sq} stroke={`url(#${gMain})`} strokeWidth="4.5" strokeOpacity="0.25" filter={`url(#${fGlow})`}/>
            <rect {...sq} stroke={`url(#${gMain})`} strokeWidth="2.8"/>
            <rect x="-8" y="-8" width="16" height="16" rx="3.5"
              stroke={`url(#${gMain})`} strokeWidth="0.7" strokeOpacity="0.45"/>
          </g>
        </g>

        {/* ════════════════════════════════════════════════
            ARROW — northeast (↗), emerges from top-right
            translate(36,20) rotate(45°) → local-up = NE
              shaft tip  local(0,−12) → global ≈ (44.5, 11.5)
              arrow tip  local(0,−20) → global ≈ (50.1,  5.9)
        ════════════════════════════════════════════════ */}
        <g transform="translate(36,20) rotate(45)">
          {/* outer glow */}
          <line x1="0" y1="4" x2="0" y2="-12"
            stroke={`url(#${gArrow})`} strokeWidth="6" strokeOpacity="0.2"
            strokeLinecap="round" filter={`url(#${fGlow})`}/>
          {/* shaft */}
          <line x1="0" y1="4" x2="0" y2="-12"
            stroke={`url(#${gArrow})`} strokeWidth="2.6" strokeLinecap="round"/>
          {/* arrowhead outer glow */}
          <polygon points="-6,-12 6,-12 0,-21"
            fill={`url(#${gArrow})`} opacity="0.2" filter={`url(#${fGlow})`}/>
          {/* arrowhead filled */}
          <polygon points="-5.5,-12 5.5,-12 0,-21"
            fill={`url(#${gArrow})`}/>
        </g>
      </svg>

      {/* ── Wordmark ──────────────────────────────────── */}
      <span
        className="font-black leading-none"
        style={{
          fontSize:       size * 0.56,
          letterSpacing: "-0.03em",
          color:          txtCol,
        }}
      >
        Gha<span style={{ color: accCol }}>flow</span>
      </span>
    </a>
  )
}

"use client"

import { cn } from "@/lib/utils"

/* ─────────────────────────────────────────────────────────────
   GhaflowLogo — two interlocked chain-link rings (stroke-based)

   Shape   : thick stroked rounded-rect rings, rx=7, no fill
   Gradient: cyan #00D4FF → teal #00C9A7 → deep-blue #0077B6
             applied as a single userSpaceOnUse linear gradient
             so colour flows consistently across both rings
   Interlock: 3-pass clipPath technique
     Pass 1  Link 1 RIGHT half (x > 32) → behind Link 2
     Pass 2  Link 2 FULL                → in front (overlap zone)
     Pass 3  Link 1 LEFT half  (x < 32) → in front of Link 2
   Glow    : subtle feGaussianBlur behind SourceGraphic
   ──────────────────────────────────────────────────────────── */

interface LogoProps {
  size?:      number
  variant?:   "color" | "mono" | "white"
  animated?:  boolean
  className?: string
}

export default function GhaflowLogo({
  size      = 60,
  variant   = "color",
  animated  = false,
  className,
}: LogoProps) {

  const isColor = variant === "color"
  const isMono  = variant === "mono"

  /* Gradient stops — match site accent palette */
  const c1 = isColor ? "#00D4FF" : isMono ? "#9CA3AF" : "#FFFFFF"
  const c2 = isColor ? "#00C9A7" : isMono ? "#6B7280" : "#CCCCCC"
  const c3 = isColor ? "#0077B6" : isMono ? "#374151" : "#AAAAAA"

  /* Wordmark colours */
  const textMain   = variant === "white" ? "#FFFFFF" : "#FFFFFF"
  const textAccent = isColor ? "#00B4FF" : isMono ? "#9CA3AF" : "#FFFFFF"

  /* Unique defs IDs (header + footer render concurrently) */
  const u = variant
  const gid = `lg-g-${u}`
  const fid = `lg-f-${u}`
  const clL = `lg-cl-${u}`
  const clR = `lg-cr-${u}`

  /*
    Internal canvas: 64 × 52 viewBox
    Link 1 center : (22, 26)   Link 2 center : (42, 26)
    Ring path     : rect centered at origin, ±10 × ±14, rx=7
    Stroke-width  : 6.5 px  → visual half-extent ≈ 13.25 h, 17.25 v
    Clip midpoint : x = 32  (midpoint between the two centers)
    Overlap zone  : ≈ 6.5 px of stroke overlap creates the interlock
  */

  /* Shared ring path (rect, no fill, stroked) */
  const RingRect = () => (
    <rect
      x="-10" y="-14" width="20" height="28" rx="7"
      fill="none"
      stroke={`url(#${gid})`}
      strokeWidth="6.5"
      strokeLinejoin="round"
    />
  )

  const VW = 64
  const VH = 52
  const iconW = size
  const iconH = Math.round(size * VH / VW)
  const fs    = Math.round(size * 0.40)
  const gap   = Math.round(size * 0.16)

  return (
    <a
      href="#"
      className={cn("inline-flex items-center select-none", className)}
      style={{ gap }}
      aria-label="Ghaflow — Accueil"
    >
      {/* ── Icon SVG ──────────────────────────────────────── */}
      <svg
        width={iconW}
        height={iconH}
        viewBox={`0 0 ${VW} ${VH}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        style={animated ? { animation: "lgfloat 3s ease-in-out infinite" } : undefined}
      >
        <defs>
          {/* Single gradient flows across both rings L→R top→bottom */}
          <linearGradient id={gid} x1="6" y1="8" x2="58" y2="44" gradientUnits="userSpaceOnUse">
            <stop offset="0%"   stopColor={c1}/>
            <stop offset="50%"  stopColor={c2}/>
            <stop offset="100%" stopColor={c3}/>
          </linearGradient>

          {/* Soft glow behind the stroke */}
          <filter id={fid} x="-55%" y="-55%" width="210%" height="210%">
            <feGaussianBlur stdDeviation="1.8" result="blur"/>
            <feMerge>
              <feMergeNode in="blur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>

          {/* Left clip  — Link 1 left half stays IN FRONT */}
          <clipPath id={clL}>
            <rect x="0"  y="0" width="32"       height={VH}/>
          </clipPath>

          {/* Right clip — Link 1 right half goes BEHIND Link 2 */}
          <clipPath id={clR}>
            <rect x="32" y="0" width={VW - 32}  height={VH}/>
          </clipPath>

          <style>{`
            @keyframes lgfloat {
              0%,100% { transform: translateY(0px);   }
              50%      { transform: translateY(-1.5px); }
            }
          `}</style>
        </defs>

        {/* ── PASS 1 — Link 1 RIGHT half (behind Link 2) ──── */}
        <g clipPath={`url(#${clR})`}>
          <g transform="translate(22,26) rotate(-10)">
            <RingRect/>
          </g>
        </g>

        {/* ── PASS 2 — Link 2 FULL (in front in overlap zone) */}
        <g transform="translate(42,26) rotate(-10)" filter={`url(#${fid})`}>
          <RingRect/>
        </g>

        {/* ── PASS 3 — Link 1 LEFT half (in front of Link 2) */}
        <g clipPath={`url(#${clL})`}>
          <g transform="translate(22,26) rotate(-10)" filter={`url(#${fid})`}>
            <RingRect/>
          </g>
        </g>
      </svg>

      {/* ── Wordmark ──────────────────────────────────────── */}
      <span
        style={{
          fontFamily: "var(--font-display, 'Plus Jakarta Sans', system-ui, sans-serif)",
          fontSize: fs,
          fontWeight: 800,
          letterSpacing: "-0.03em",
          lineHeight: 1,
          color: textMain,
        }}
      >
        Gha<span style={{ color: textAccent }}>flow</span>
      </span>
    </a>
  )
}

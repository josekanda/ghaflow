"use client"

import { cn } from "@/lib/utils"

/* ─────────────────────────────────────────────────────────────
   GhaflowLogo — two interlocked FILLED chain-link rings.

   Each ring is a "donut" shape (outer rounded-rect minus inner
   hole), both at -12° tilt, overlapping ~36%.

   Interlocking : 3-pass clip technique
     Pass 1  Link 1 LOWER half (y > 24) → behind Link 2
     Pass 2  Link 2 FULL                → in front (lower zone)
     Pass 3  Link 1 UPPER half (y < 24) → in front (upper zone)

   Gradient : blue #1055CC → cyan #00BFFF → teal #00D4A8
   3-D look  : highlight arc on lit edge + shadow arc on dark edge
   ──────────────────────────────────────────────────────────── */

interface LogoProps {
  size?:      number
  variant?:   "color" | "mono" | "white"
  animated?:  boolean
  className?: string
}

export default function GhaflowLogo({
  size      = 36,
  variant   = "color",
  animated  = true,
  className,
}: LogoProps) {

  const isColor = variant === "color"
  const isMono  = variant === "mono"

  const blue  = isColor ? "#1055CC" : isMono ? "#374151" : "#FFFFFF"
  const mid   = isColor ? "#00BFFF" : isMono ? "#6B7280" : "#CCCCCC"
  const teal  = isColor ? "#00D4A8" : isMono ? "#9CA3AF" : "#FFFFFF"
  const white = "#FFFFFF"
  const acc   = isColor ? "#00F0FF" : isMono ? "#9CA3AF" : "#FFFFFF"

  /* Unique SVG IDs per variant (avoid header/footer conflict) */
  const gid = `lg-g-${variant}`
  const fid = `lg-f-${variant}`
  const ct  = `lg-ct-${variant}`
  const cb  = `lg-cb-${variant}`

  /*
    Ring path (centered at origin, applied via transform="translate/rotate"):
      Outer rounded-rect : ±11 × ±14, corner r=7   → 22 × 28
      Inner hole         : ±5  × ±8,  corner r=3   → 10 × 16
      fill-rule="evenodd" punches the hole through the fill.
  */
  const ring =
    /* outer */
    "M-4,-14 H4 A7,7 0 0,1 11,-7 V7 A7,7 0 0,1 4,14 H-4 A7,7 0 0,1 -11,7 V-7 A7,7 0 0,1 -4,-14 Z " +
    /* inner hole */
    "M-2,-8 H2 A3,3 0 0,1 5,-5 V5 A3,3 0 0,1 2,8 H-2 A3,3 0 0,1 -5,5 V-5 A3,3 0 0,1 -2,-8 Z"

  /* Highlight arc — top + top-right corner of outer ring (lit side) */
  const hlTop  = "M-4,-14 H4 A7,7 0 0,1 11,-7"
  /* Shadow arc  — bottom + bottom-left corner of outer ring (dark side) */
  const shBot  = "M4,14 H-4 A7,7 0 0,1 -11,7"

  const fs = Math.round(size * 0.60)

  /* One reusable ring element */
  const Ring = ({ glow }: { glow: boolean }) => (
    <g filter={glow ? `url(#${fid})` : undefined}>
      {/* filled donut */}
      <path d={ring} fill={`url(#${gid})`} fillRule="evenodd"/>
      {/* lit-edge highlight */}
      <path d={hlTop} stroke="rgba(180,245,255,0.60)" strokeWidth="1.4"
            fill="none" strokeLinecap="round"/>
      {/* shadow-edge darkening */}
      <path d={shBot} stroke="rgba(0,20,60,0.35)" strokeWidth="1.4"
            fill="none" strokeLinecap="round"/>
    </g>
  )

  return (
    <a
      href="#"
      className={cn("inline-flex items-center gap-2.5 select-none", className)}
      aria-label="Ghaflow — Accueil"
    >
      {/* ── Icon — 48 × 48 internal canvas ──────────────── */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        style={animated ? { animation: "lgfloat 3s ease-in-out infinite" } : undefined}
      >
        <defs>
          {/* Blue → cyan → teal diagonal gradient */}
          <linearGradient id={gid} x1="0" y1="1" x2="1" y2="0">
            <stop offset="0%"   stopColor={blue}/>
            <stop offset="55%"  stopColor={mid}/>
            <stop offset="100%" stopColor={teal}/>
          </linearGradient>

          {/* Soft glow */}
          <filter id={fid} x="-45%" y="-45%" width="190%" height="190%">
            <feGaussianBlur stdDeviation="1.6" result="b"/>
            <feMerge>
              <feMergeNode in="b"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>

          {/* Clip — upper canvas half  (Link 1 upper → IN FRONT of Link 2) */}
          <clipPath id={ct}>
            <rect x="0" y="0"  width="48" height="24"/>
          </clipPath>

          {/* Clip — lower canvas half  (Link 1 lower → BEHIND Link 2) */}
          <clipPath id={cb}>
            <rect x="0" y="24" width="48" height="24"/>
          </clipPath>

          <style>{`
            @keyframes lgfloat {
              0%,100% { transform: translateY(0px);   }
              50%      { transform: translateY(-1.5px); }
            }
          `}</style>
        </defs>

        {/* ── PASS 1 — Link 1 lower half  (behind Link 2) ─── */}
        <g clipPath={`url(#${cb})`}>
          <g transform="translate(15,24) rotate(-12)">
            <Ring glow={false}/>
          </g>
        </g>

        {/* ── PASS 2 — Link 2 full  (in front in lower zone) ─ */}
        <g>
          <g transform="translate(29,24) rotate(-12)">
            <Ring glow={true}/>
          </g>
        </g>

        {/* ── PASS 3 — Link 1 upper half  (in front of Link 2) */}
        <g clipPath={`url(#${ct})`}>
          <g transform="translate(15,24) rotate(-12)">
            <Ring glow={true}/>
          </g>
        </g>
      </svg>

      {/* ── Wordmark ──────────────────────────────────────── */}
      <span
        className="font-black leading-none"
        style={{ fontSize: fs, letterSpacing: "-0.03em", color: white }}
      >
        Gha<span style={{ color: acc }}>flow</span>
      </span>
    </a>
  )
}

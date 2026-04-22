"use client"

import { cn } from "@/lib/utils"

/* ─────────────────────────────────────────────────────────────
   GhaflowLogo — Two interlocked rounded-square chain links
   + diagonal up-right arrow, matching the brand concept image.

   Interlocking technique: 3-pass clip rendering
     Pass 1  Link 1 upper portion → goes BEHIND Link 2
     Pass 2  Link 2 full          → sits on top in upper zone
     Pass 3  Link 1 lower portion → comes IN FRONT of Link 2

   Props:
     size      → icon height in px
     variant   → "color" | "mono" | "white"
     animated  → subtle float (default true)
     className
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

  const blue   = isColor ? "#1D6FE8" : isMono ? "#4B5563" : "#FFFFFF"
  const green  = isColor ? "#0BBF8E" : isMono ? "#6B7280" : "#FFFFFF"
  const txtCol = "#FFFFFF"
  const accCol = isColor ? "#00F0FF" : isMono ? "#9CA3AF" : "#FFFFFF"

  /* Unique IDs per variant — avoids header/footer SVG filter conflicts */
  const gId   = `gfg-${variant}`
  const fId   = `gff-${variant}`
  const ctId  = `gfc-t-${variant}`   // clip top half
  const cbId  = `gfc-b-${variant}`   // clip bottom half

  /* Link geometry — both squares share the same -35° tilt (chain angle) */
  const L1 = "translate(19,32) rotate(-35)"
  const L2 = "translate(33,22) rotate(-35)"
  const SQ = { x: -11, y: -11, width: 22, height: 22, rx: 4.5 } // 22×22 rounded square

  return (
    <a
      href="#"
      className={cn("inline-flex items-center gap-2.5 select-none", className)}
      aria-label="Ghaflow — Accueil"
    >
      {/* ── Icon mark — 56 × 56 canvas ──────────────────── */}
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
          {/* Blue → green diagonal gradient */}
          <linearGradient id={gId} x1="0" y1="1" x2="1" y2="0">
            <stop offset="0%"   stopColor={blue}  />
            <stop offset="100%" stopColor={green} />
          </linearGradient>

          {/* Glow */}
          <filter id={fId} x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="1.8" result="b"/>
            <feMerge>
              <feMergeNode in="b"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>

          {/* Clip — upper half: Link 1 rendered here goes behind Link 2 */}
          <clipPath id={ctId}>
            <rect x="0" y="0" width="56" height="28"/>
          </clipPath>

          {/* Clip — lower half: Link 1 rendered here comes in front of Link 2 */}
          <clipPath id={cbId}>
            <rect x="0" y="28" width="56" height="28"/>
          </clipPath>

          <style>{`
            @keyframes gfloat {
              0%, 100% { transform: translateY(0); }
              50%       { transform: translateY(-1.5px); }
            }
          `}</style>
        </defs>

        {/* ── Pass 1 — Link 1 upper half (behind Link 2) ────── */}
        <g clipPath={`url(#${ctId})`} filter={`url(#${fId})`}>
          <g transform={L1}>
            <rect {...SQ} stroke={`url(#${gId})`} strokeWidth="2.5"/>
          </g>
        </g>

        {/* ── Pass 2 — Link 2 full (on top in upper zone) ────── */}
        <g filter={`url(#${fId})`}>
          <g transform={L2}>
            <rect {...SQ} stroke={`url(#${gId})`} strokeWidth="2.5"/>
          </g>
        </g>

        {/* ── Pass 3 — Link 1 lower half (in front of Link 2) ── */}
        <g clipPath={`url(#${cbId})`} filter={`url(#${fId})`}>
          <g transform={L1}>
            <rect {...SQ} stroke={`url(#${gId})`} strokeWidth="2.5"/>
          </g>
        </g>

        {/* ── Arrow — northeast diagonal (↗) ─────────────────── */}
        {/*
            translate(36,20) rotate(45°) puts local-up in the NE direction.
            Shaft: local (0,3) → (0,−11)  →  global ≈ (36,20) to (44,12)
            Tip:   local (0,−17)           →  global ≈ (48, 8)
        */}
        <g transform="translate(36,20) rotate(45)" filter={`url(#${fId})`}>
          {/* shaft */}
          <line x1="0" y1="3" x2="0" y2="-11"
            stroke={`url(#${gId})`} strokeWidth="2.3" strokeLinecap="round"/>
          {/* filled arrowhead */}
          <polygon points="-4.5,-11 4.5,-11 0,-18"
            fill={`url(#${gId})`}/>
        </g>
      </svg>

      {/* ── Wordmark ─────────────────────────────────────── */}
      <span
        className="font-black tracking-[-0.04em] leading-none"
        style={{ fontSize: size * 0.52, color: txtCol }}
      >
        Gha<span style={{ color: accCol }}>flow</span>
      </span>
    </a>
  )
}

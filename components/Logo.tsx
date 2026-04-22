"use client"

import { cn } from "@/lib/utils"

/* ─────────────────────────────────────────────────────────────
   GhaflowLogo — Two interlocked chain-link ovals + upward arrow
   forming a stylised G mark.

   Props:
     size      → icon height in px
     variant   → "color" | "mono" | "white"
     animated  → subtle float animation (default true)
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

  /* Palette per variant */
  const blue    = isColor ? "#2563EB" : isMono ? "#4B5563" : "#FFFFFF"
  const green   = isColor ? "#10B981" : isMono ? "#6B7280" : "#FFFFFF"
  const txtCol  = "#FFFFFF"
  const accCol  = isColor ? "#00F0FF" : isMono ? "#9CA3AF" : "#FFFFFF"

  /* Unique IDs per variant to avoid SVG filter conflicts (header vs footer) */
  const gid = `gfg-${variant}`
  const fid = `gff-${variant}`

  return (
    <a
      href="#"
      className={cn("inline-flex items-center gap-2.5 select-none", className)}
      aria-label="Ghaflow — Accueil"
    >
      {/* ── Icon mark ───────────────────────────────────── */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        style={animated ? { animation: "gfloat 3s ease-in-out infinite" } : undefined}
      >
        <defs>
          {/* Blue → green diagonal gradient */}
          <linearGradient id={gid} x1="0" y1="1" x2="1" y2="0">
            <stop offset="0%"   stopColor={blue}  />
            <stop offset="100%" stopColor={green} />
          </linearGradient>

          {/* Glow filter */}
          <filter id={fid} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="1.8" result="b"/>
            <feMerge>
              <feMergeNode in="b"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>

          <style>{`
            @keyframes gfloat {
              0%, 100% { transform: translateY(0px); }
              50%       { transform: translateY(-1.5px); }
            }
          `}</style>
        </defs>

        {/* ── Link 2 — lower-right chain link (behind Link 1) ──── */}
        <g transform="translate(26,27) rotate(-15)">
          {/* Draw full oval */}
          <rect x="-11" y="-5.5" width="22" height="11" rx="5.5"
            stroke={`url(#${gid})`} strokeWidth="2.2" fill="none"/>
          {/* Paint over the left (overlapping) half in page-bg colour
              so it appears to go behind Link 1 */}
          <rect x="-14" y="-8" width="15" height="16" fill="#060606"/>
        </g>

        {/* Re-draw only the visible right arc of Link 2 with glow */}
        <g transform="translate(26,27) rotate(-15)" filter={`url(#${fid})`}>
          {/* right cap + right half of top/bottom edges */}
          <path
            d="M0,-5.5 L5.5,-5.5 A5.5,5.5 0 0,1 5.5,5.5 L0,5.5"
            stroke={`url(#${gid})`} strokeWidth="2.2"
            fill="none" strokeLinecap="round"
          />
        </g>

        {/* ── Link 1 — upper-left chain link (in front) ────────── */}
        <g transform="translate(14,19) rotate(-15)" filter={`url(#${fid})`}>
          <rect x="-11" y="-5.5" width="22" height="11" rx="5.5"
            stroke={`url(#${gid})`} strokeWidth="2.4" fill="none"/>
        </g>

        {/* ── Upward arrow (emerges from top of Link 1) ────────── */}
        <g filter={`url(#${fid})`}>
          <line
            x1="14" y1="4" x2="14" y2="12"
            stroke={`url(#${gid})`} strokeWidth="1.8" strokeLinecap="round"
          />
          <polyline
            points="10.5,8 14,4 17.5,8"
            stroke={`url(#${gid})`} strokeWidth="1.8"
            strokeLinecap="round" strokeLinejoin="round"
            fill="none"
          />
        </g>
      </svg>

      {/* ── Wordmark ─────────────────────────────────────────── */}
      <span
        className="font-black tracking-[-0.04em] leading-none"
        style={{ fontSize: size * 0.52, color: txtCol }}
      >
        Gha<span style={{ color: accCol }}>flow</span>
      </span>
    </a>
  )
}

"use client"

import { cn } from "@/lib/utils"

/* ─────────────────────────────────────────────────────────────
   GhaflowLogo — SVG pur, fond transparent.
   Reproduit fidèlement le logo PNG : deux maillons arrondis
   entrelacés + wordmark "Ghaflow", couleurs du site.

   Couleurs site :
     Accent cyan  : #00F0FF
     Bleu         : #1B8EF8
     Texte blanc  : #FFFFFF
     Mono (footer): opacité réduite sur même palette

   Interlocking : technique 3-passes + clipPath (haut / bas).
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

  /* Site palette */
  const blue  = isColor ? "#1B8EF8" : isMono ? "#6B7280" : "#FFFFFF"
  const cyan  = isColor ? "#00F0FF" : isMono ? "#9CA3AF" : "#FFFFFF"
  const white = isColor ? "#FFFFFF" : isMono ? "#9CA3AF" : "#FFFFFF"

  /* Unique SVG IDs per variant */
  const gid = `lg-${variant}`
  const fid = `lf-${variant}`
  const ct  = `lct-${variant}`
  const cb  = `lcb-${variant}`

  /* Icon canvas: 44 × 44, interlocking clip at y = 22 */
  const iconH = size
  const iconW = size   // square icon

  /* Wordmark font size */
  const fs = Math.round(size * 0.58)

  return (
    <a
      href="#"
      className={cn("inline-flex items-center gap-2.5 select-none", className)}
      aria-label="Ghaflow — Accueil"
    >
      {/* ── Icon ──────────────────────────────────────────── */}
      <svg
        width={iconW}
        height={iconH}
        viewBox="0 0 44 44"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        style={animated ? { animation: "lgfloat 3s ease-in-out infinite" } : undefined}
      >
        <defs>
          {/* Blue → cyan diagonal gradient */}
          <linearGradient id={gid} x1="0" y1="1" x2="1" y2="0">
            <stop offset="0%"   stopColor={blue}/>
            <stop offset="100%" stopColor={cyan}/>
          </linearGradient>

          {/* Glow matching site cyan */}
          <filter id={fid} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="1.6" result="b"/>
            <feMerge>
              <feMergeNode in="b"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>

          {/* Clip upper half — Link 1 goes BEHIND Link 2 here */}
          <clipPath id={ct}>
            <rect x="0" y="0" width="44" height="22"/>
          </clipPath>

          {/* Clip lower half — Link 1 comes IN FRONT here */}
          <clipPath id={cb}>
            <rect x="0" y="22" width="44" height="22"/>
          </clipPath>

          <style>{`
            @keyframes lgfloat {
              0%,100% { transform: translateY(0); }
              50%      { transform: translateY(-1.5px); }
            }
          `}</style>
        </defs>

        {/*
          Two rounded squares — both at -20° (matching the logo PNG).
          Link 1 (lower-left): translate(15, 27) rotate(-20)  20×20 rx=4.5
          Link 2 (upper-right): translate(29, 17) rotate(-20) 18×18 rx=4
        */}

        {/* ── Pass 1 — Link 1 upper half (behind Link 2) ── */}
        <g clipPath={`url(#${ct})`} filter={`url(#${fid})`}>
          <g transform="translate(15,27) rotate(-20)">
            <rect x="-10" y="-10" width="20" height="20" rx="4.5"
              fill="rgba(0,240,255,0.06)"
              stroke={`url(#${gid})`} strokeWidth="2.6"/>
          </g>
        </g>

        {/* ── Pass 2 — Link 2 full (on top in upper zone) ── */}
        <g filter={`url(#${fid})`}>
          <g transform="translate(29,17) rotate(-20)">
            <rect x="-9" y="-9" width="18" height="18" rx="4"
              fill="rgba(27,142,248,0.08)"
              stroke={`url(#${gid})`} strokeWidth="2.4"/>
            {/* inner highlight ring */}
            <rect x="-6" y="-6" width="12" height="12" rx="2.5"
              stroke={cyan} strokeWidth="0.6" strokeOpacity="0.35"/>
          </g>
        </g>

        {/* ── Pass 3 — Link 1 lower half (in front of Link 2) ── */}
        <g clipPath={`url(#${cb})`} filter={`url(#${fid})`}>
          <g transform="translate(15,27) rotate(-20)">
            <rect x="-10" y="-10" width="20" height="20" rx="4.5"
              fill="rgba(0,240,255,0.06)"
              stroke={`url(#${gid})`} strokeWidth="2.6"/>
            {/* inner highlight ring */}
            <rect x="-7" y="-7" width="14" height="14" rx="3"
              stroke={cyan} strokeWidth="0.6" strokeOpacity="0.35"/>
          </g>
        </g>
      </svg>

      {/* ── Wordmark ───────────────────────────────────────── */}
      <span
        className="font-black leading-none tracking-tight"
        style={{ fontSize: fs, letterSpacing: "-0.03em", color: white }}
      >
        Gha<span style={{ color: cyan }}>flow</span>
      </span>
    </a>
  )
}

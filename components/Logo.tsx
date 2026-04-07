"use client"

import { cn } from "@/lib/utils"

/* ─────────────────────────────────────────────────────────────
   GhaflowLogo — SVG gear system, fully static coordinates
   (no Math.cos/sin at render → no hydration mismatch)

   Props:
     size      → height in px
     variant   → "color" | "mono" | "white"
     animated  → slow gear rotation (default true)
     className
   ──────────────────────────────────────────────────────────── */

interface LogoProps {
  size?:      number
  variant?:   "color" | "mono" | "white"
  animated?:  boolean
  className?: string
}

/* ── Pre-computed tooth endpoints ─────────────────────────────
   Large gear  (r_inner=11, r_outer=16, 8 teeth, every 45°)
   Small gear  (r_inner=7,  r_outer=11, 6 teeth, every 60°)
   All values rounded to 2 decimal places — stable SSR/CSR.
   ──────────────────────────────────────────────────────────── */

// Large gear teeth — 8 teeth at 0°,45°,90°,135°,180°,225°,270°,315°
const LG_TEETH: [number,number,number,number][] = [
  [ 11.00,  0.00,  16.00,  0.00],
  [  7.78,  7.78,  11.31, 11.31],
  [  0.00, 11.00,  0.00,  16.00],
  [ -7.78,  7.78, -11.31, 11.31],
  [-11.00,  0.00, -16.00,  0.00],
  [ -7.78, -7.78, -11.31,-11.31],
  [  0.00,-11.00,  0.00, -16.00],
  [  7.78, -7.78,  11.31,-11.31],
]

// Large gear spokes — 4 spokes at 22.5°,112.5°,202.5°,292.5° (between teeth)
const LG_SPOKES: [number,number,number,number][] = [
  [ 3.83,  1.59,  8.12,  3.36],
  [-1.59,  3.83, -3.36,  8.12],
  [-3.83, -1.59, -8.12, -3.36],
  [ 1.59, -3.83,  3.36, -8.12],
]

// Small gear teeth — 6 teeth at 0°,60°,120°,180°,240°,300°
const SM_TEETH: [number,number,number,number][] = [
  [ 7.00,  0.00, 11.00,  0.00],
  [ 3.50,  6.06,  5.50,  9.53],
  [-3.50,  6.06, -5.50,  9.53],
  [-7.00,  0.00,-11.00,  0.00],
  [-3.50, -6.06, -5.50, -9.53],
  [ 3.50, -6.06,  5.50, -9.53],
]

// Small gear spokes — 3 spokes at 30°,150°,270°
const SM_SPOKES: [number,number,number,number][] = [
  [ 2.17,  1.25,  4.33,  2.50],
  [-2.17,  1.25, -4.33,  2.50],
  [ 0.00, -2.50,  0.00, -5.00],
]

export default function GhaflowLogo({
  size      = 40,
  variant   = "color",
  animated  = true,
  className,
}: LogoProps) {

  const C = variant === "color"
    ? { large: "#00F0FF", small: "#FFFFFF", hub: "#050505", hubRing: "#00F0FF", text: "#FFFFFF", accent: "#00F0FF" }
    : variant === "mono"
    ? { large: "#4B5563", small: "#6B7280", hub: "#050505", hubRing: "#6B7280", text: "#9CA3AF", accent: "#9CA3AF" }
    : { large: "#FFFFFF", small: "#FFFFFF", hub: "#050505", hubRing: "#FFFFFF", text: "#FFFFFF", accent: "#FFFFFF" }

  const spinCW  = animated ? "gf-cw  12s linear infinite" : "none"
  const spinCCW = animated ? "gf-ccw  8s linear infinite" : "none"

  // SVG canvas: 110 × 44, large gear at (22,22), small at (76,22)
  const svgW = size * 2.6
  const svgH = size

  return (
    <a
      href="#"
      className={cn("inline-flex items-center gap-3 select-none", className)}
      aria-label="Ghaflow — Accueil"
    >
      {/* ── Mark ─────────────────────────────────────── */}
      <svg
        width={svgW}
        height={svgH}
        viewBox="0 0 110 44"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          <filter id="gf-gl" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation="3" result="b"/>
            <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
          <filter id="gf-gs" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation="2" result="b"/>
            <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
        </defs>

        {/* ── Large gear — cx=22, cy=22 ─────────────── */}
        <g
          transform="translate(22,22)"
          style={{ animation: spinCW, transformOrigin: "0px 0px" }}
          filter="url(#gf-gl)"
        >
          {LG_TEETH.map(([x1,y1,x2,y2], i) => (
            <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
              stroke={C.large} strokeWidth="3.5" strokeLinecap="round"/>
          ))}
          <circle r="12" stroke={C.large} strokeWidth="1.5" fill="none"/>
          <circle r="7"  stroke={C.large} strokeWidth="0.8" fill="none" opacity="0.4"/>
          {LG_SPOKES.map(([x1,y1,x2,y2], i) => (
            <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
              stroke={C.large} strokeWidth="1.2" opacity="0.55"/>
          ))}
          <circle r="3.5" fill={C.hub} stroke={C.hubRing} strokeWidth="1.2"/>
          <circle r="1.2" fill={C.hubRing}/>
        </g>

        {/* ── Small gear — cx=76, cy=22 ─────────────── */}
        <g
          transform="translate(76,22)"
          style={{ animation: spinCCW, transformOrigin: "0px 0px" }}
          filter="url(#gf-gs)"
        >
          {SM_TEETH.map(([x1,y1,x2,y2], i) => (
            <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
              stroke={C.small} strokeWidth="2.8" strokeLinecap="round"/>
          ))}
          <circle r="8"  stroke={C.small} strokeWidth="1.2" fill="none"/>
          <circle r="4.5" stroke={C.small} strokeWidth="0.7" fill="none" opacity="0.35"/>
          {SM_SPOKES.map(([x1,y1,x2,y2], i) => (
            <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
              stroke={C.small} strokeWidth="1" opacity="0.5"/>
          ))}
          <circle r="2.5" fill={C.hub} stroke={C.hubRing} strokeWidth="1"/>
          <circle r="0.9" fill={C.hubRing}/>
        </g>

        {/* Keyframes — inlined to avoid external CSS dependency */}
        <style>{`
          @keyframes gf-cw  { to { transform: rotate(360deg);  } }
          @keyframes gf-ccw { to { transform: rotate(-360deg); } }
        `}</style>
      </svg>

      {/* ── Wordmark ─────────────────────────────────── */}
      <span
        className="font-black leading-none tracking-[-0.045em]"
        style={{ fontSize: size * 0.52, color: C.text }}
      >
        Gha<span style={{ color: C.accent }}>flow</span>
      </span>
    </a>
  )
}

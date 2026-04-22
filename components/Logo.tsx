"use client"

import Image from "next/image"
import { cn } from "@/lib/utils"

/* ─────────────────────────────────────────────────────────────
   GhaflowLogo — renders the official logo PNG.
   PNG dimensions: 1376 × 768 (ratio ≈ 1.792 : 1)

   `size` controls the display height; width scales automatically.
   Props variant / animated kept for call-site compatibility.
   ──────────────────────────────────────────────────────────── */

interface LogoProps {
  size?:      number
  variant?:   "color" | "mono" | "white"
  animated?:  boolean
  className?: string
}

export default function GhaflowLogo({
  size      = 40,
  className,
}: LogoProps) {

  const displayH = size
  const displayW = Math.round(size * (1376 / 768))   // preserve aspect ratio

  return (
    <a
      href="#"
      className={cn("inline-flex items-center select-none", className)}
      aria-label="Ghaflow — Accueil"
    >
      <Image
        src="/logo-ghaflow.png"
        alt="Ghaflow"
        width={1376}
        height={768}
        priority
        style={{
          height:    displayH,
          width:     displayW,
          objectFit: "contain",
        }}
      />
    </a>
  )
}

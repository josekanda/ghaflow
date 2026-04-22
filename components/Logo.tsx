"use client"

import Image from "next/image"
import { cn } from "@/lib/utils"

interface LogoProps {
  size?:      number   // unused — sizing controlled by CSS .logo class
  variant?:   "color" | "mono" | "white"
  animated?:  boolean
  className?: string
}

export default function GhaflowLogo({ className }: LogoProps) {
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
        className="logo"
      />
    </a>
  )
}

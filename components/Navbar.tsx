"use client"

import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Menu, X, ArrowRight } from "lucide-react"
import GhaflowLogo from "@/components/Logo"

const NAV_LINKS = [
  { label: "Solutions", href: "#solutions"   },
  { label: "Méthode",  href: "#methodology" },
  { label: "L'Expert",  href: "#expert"      },
  { label: "FAQ",       href: "#faq"         },
  { label: "Contact",   href: "#audit"       },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open,     setOpen]     = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const close = () => setOpen(false)

  return (
    <motion.header
      initial={{ y: -16, opacity: 0 }}
      animate={{ y: 0,   opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={[
        "fixed top-0 left-0 right-0 z-50 transition-all duration-400",
        scrolled ? "bg-[#050505]/80 backdrop-blur-2xl border-b" : "",
      ].join(" ")}
      style={{ borderColor: scrolled ? "rgba(255,255,255,0.06)" : "transparent" }}
    >
      <div className="container">
        <div className="flex items-center justify-between h-16">

          {/* ── Logo ─────────────────────────────────────── */}
          <GhaflowLogo
            size={54}
            variant="color"
            animated={true}
          />

          {/* ── Desktop nav ──────────────────────────────── */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map(({ label, href }) => (
              <a
                key={href}
                href={href}
                className="text-[13px] font-medium text-[#71717A] hover:text-white transition-colors duration-200"
              >
                {label}
              </a>
            ))}
          </nav>

          {/* ── CTA + burger ─────────────────────────────── */}
          <div className="flex items-center gap-3">
            <a
              href="#audit"
              className="hidden md:inline-flex items-center gap-2 text-[13px] font-semibold bg-[#00F0FF] text-[#050505] rounded-full px-5 py-2 hover:shadow-glow transition-all duration-300"
            >
              Audit Gratuit
              <ArrowRight size={14} />
            </a>

            <button
              onClick={() => setOpen(!open)}
              className="md:hidden p-1.5 text-[#A1A1AA] hover:text-white transition-colors"
              aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* ── Mobile menu ──────────────────────────────────── */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden overflow-hidden bg-[#050505]/96 backdrop-blur-2xl border-b"
            style={{ borderColor: "rgba(255,255,255,0.06)" }}
          >
            <div className="container py-4 flex flex-col gap-1">
              {NAV_LINKS.map(({ label, href }) => (
                <a
                  key={href}
                  href={href}
                  onClick={close}
                  className="px-0 py-3 text-[15px] font-medium text-[#71717A] hover:text-white transition-colors border-b"
                  style={{ borderColor: "rgba(255,255,255,0.04)" }}
                >
                  {label}
                </a>
              ))}
              <a
                href="#audit"
                onClick={close}
                className="mt-3 flex items-center justify-center gap-2 bg-[#00F0FF] text-[#050505] font-bold text-sm rounded-full py-3.5"
              >
                Réserver mon Audit Gratuit
                <ArrowRight size={14} />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}

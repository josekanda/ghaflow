"use client"

import { ArrowRight } from "lucide-react"
import GhaflowLogo from "@/components/Logo"

const NAV_LINKS = [
  { label: "Solutions", href: "#solutions"   },
  { label: "Méthode",  href: "#methodology" },
  { label: "L'Expert",  href: "#expert"      },
  { label: "FAQ",       href: "#faq"         },
  { label: "Contact",   href: "#audit"       },
]

export default function Footer() {
  return (
    <footer
      className="border-t"
      style={{ borderColor: "rgba(255,255,255,0.06)", background: "#080808" }}
    >
      {/* ── CTA banner ──────────────────────────────────── */}
      <div className="border-b" style={{ borderColor: "rgba(255,255,255,0.05)" }}>
        <div className="container py-12">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <p className="text-[11px] font-semibold tracking-[0.12em] uppercase text-[#00F0FF] mb-1">
                Prêt à gagner du temps ?
              </p>
              <h3 className="text-xl font-black tracking-tight">
                Réservez votre audit gratuit de 15 min.
              </h3>
            </div>
            <a href="#audit" className="btn-glow shrink-0">
              Démarrer maintenant
              <ArrowRight size={15} />
            </a>
          </div>
        </div>
      </div>

      {/* ── Main footer ─────────────────────────────────── */}
      <div className="container py-10">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">

          {/* Logo + tagline */}
          <div className="flex flex-col gap-2">
            <GhaflowLogo size={44} variant="color" />
            <p className="text-[11px] text-[#3f3f46]">
              Automatisation intelligente pour PME
            </p>
          </div>

          {/* Nav links */}
          <nav className="flex flex-wrap gap-6">
            {NAV_LINKS.map(({ label, href }) => (
              <a
                key={href}
                href={href}
                className="text-[12px] font-medium text-[#52525B] hover:text-[#A1A1AA] transition-colors"
              >
                {label}
              </a>
            ))}
          </nav>

          {/* CTA */}
          <a
            href="#audit"
            className="hidden lg:inline-flex items-center gap-2 text-[13px] font-semibold bg-[#00F0FF] text-[#050505] rounded-full px-5 py-2.5 hover:shadow-glow transition-all duration-300"
          >
            Audit Gratuit
            <ArrowRight size={13} />
          </a>
        </div>

        {/* Divider */}
        <div className="my-8 h-px" style={{ background: "rgba(255,255,255,0.05)" }} />

        {/* Bottom */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="text-[11px] text-[#3f3f46] space-y-0.5">
            <p>© {new Date().getFullYear()} Ghaflow, une division de 9528-0459 Québec inc. Tous droits réservés.</p>
            <p>
              <a href="tel:+14502890459" className="hover:text-[#A1A1AA] transition-colors">450-289-0459</a>
              {" · "}
              <a href="mailto:contact@ghaflow.com" className="hover:text-[#A1A1AA] transition-colors">contact@ghaflow.com</a>
            </p>
          </div>
          <p
            className="text-[10px] tracking-[0.06em] uppercase"
            style={{ color: "rgba(255,255,255,0.1)" }}
          >
            Conçu pour les ambitions qui n'attendent pas
          </p>
        </div>
      </div>
    </footer>
  )
}

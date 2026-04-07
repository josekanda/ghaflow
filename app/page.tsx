import Navbar         from "@/components/Navbar"
import Hero           from "@/components/Hero"
import BentoGrid      from "@/components/BentoGrid"
import StatsSection   from "@/components/StatsSection"
import ProcessSection from "@/components/ProcessSection"
import FounderSection from "@/components/FounderSection"
import ContactForm    from "@/components/ContactForm"
import FAQ            from "@/components/FAQ"
import Footer         from "@/components/Footer"

export default function Page() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />

        {/* ── Scrolling ticker ─── */}
        <Ticker />

        <StatsSection />
        <BentoGrid />
        <ProcessSection />
        <FounderSection />
        <FAQ />
        <ContactForm />
      </main>
      <Footer />
    </>
  )
}

/* ── Ticker (pure server component, no JS) ────────────────── */
const TICKER_ITEMS = [
  "Automatisation CRM",
  "Agents Vocaux IA",
  "Facturation Automatisée",
  "Rappels SMS & Email",
  "Qualification de Leads",
  "Synchronisation d'Outils",
  "Reporting Automatique",
  "Chatbots 24/7",
  "Intégration API",
  "Planification Intelligente",
]

function Ticker() {
  const items = [...TICKER_ITEMS, ...TICKER_ITEMS] // duplicate for seamless loop
  return (
    <div
      className="overflow-hidden border-y"
      style={{ borderColor: "rgba(255,255,255,0.06)", background: "rgba(255,255,255,0.02)" }}
    >
      <div className="flex w-max animate-ticker py-3.5">
        {items.map((item, i) => (
          <div
            key={i}
            className="flex items-center gap-3 px-7 whitespace-nowrap text-[11px] font-semibold tracking-[0.12em] uppercase text-[#52525B]"
          >
            <span className="text-[#00F0FF] text-base leading-none">◆</span>
            {item}
          </div>
        ))}
      </div>
    </div>
  )
}

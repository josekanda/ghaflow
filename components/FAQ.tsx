"use client"

import { useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import { Plus, CircleDollarSign, TrendingUp, Layers } from "lucide-react"
import { fadeInUp, stagger, inViewOptions } from "@/lib/animations"

/* ── Types ─────────────────────────────────────────────────── */
interface FaqItem {
  q:    string
  a:    string
  icon?: React.ReactNode
}

interface FaqGroup {
  label: string
  items: FaqItem[]
}

/* ── Data ──────────────────────────────────────────────────── */
const FAQ_GROUPS: FaqGroup[] = [
  {
    label: "Questions générales",
    items: [
      {
        q: "L'IA, n'est-ce pas juste un gadget pour les grandes entreprises ?",
        a: "Non — c'est exactement l'inverse. L'IA est le levier qui permet aux petites structures de rivaliser avec les géants en automatisant 80% des tâches répétitives, sans embaucher. Les grandes entreprises ont des équipes entières pour ça. Ghaflow vous donne le même avantage, à votre échelle et à votre budget.",
      },
      {
        q: "Mes données sont-elles en sécurité avec ces automatisations ?",
        a: "La sécurité est notre priorité non-négociable. Nous utilisons des protocoles de chiffrement (OAuth2, TLS) et des environnements isolés pour garantir que vos données restent privées. Elles ne transitent jamais vers des modèles publics et ne servent jamais à entraîner quoi que ce soit. Vos données restent dans vos outils — on se contente de les faire circuler de façon sécurisée.",
      },
      {
        q: "Est-ce que je vais devoir devenir un expert en tech pour utiliser Ghaflow ?",
        a: "Absolument pas. On s'occupe de toute la complexité sous le capot. Vous recevez un système \"clé en main\" avec une interface simple que n'importe qui dans votre équipe peut piloter. Notre critère de succès : que vous puissiez superviser le système sans nous appeler.",
      },
      {
        q: "Que se passe-t-il si un processus automatisé fait une erreur ?",
        a: "Nous intégrons systématiquement des points de contrôle \"Human-in-the-loop\" : l'IA prépare le travail, structure les données et rédige les réponses — mais un humain valide l'étape critique avant l'envoi final. En parallèle, chaque workflow inclut un monitoring en temps réel avec alertes automatiques. En cas d'anomalie, vous êtes notifié avant même de le remarquer.",
      },
    ],
  },
  {
    label: "Investissement",
    items: [
      {
        icon: <CircleDollarSign size={15} className="shrink-0" style={{ color: "#00F0FF" }} />,
        q: "Quel est le coût d'implémentation ?",
        a: "Le coût dépend de la complexité du système et de l'envergure des processus à automatiser. Il se situe généralement entre 2 500 $ et 50 000 $ — un Quick Win ciblé se positionne dans le bas de la fourchette, un écosystème complet multi-flux en haut. Bonne nouvelle : une grande partie de ces dépenses peut être subventionnée via des programmes gouvernementaux comme ESSOR, ce qui réduit significativement votre investissement réel. Le montant exact est établi après votre audit gratuit — vous savez exactement ce que vous payez avant de vous engager.",
      },
      {
        icon: <CircleDollarSign size={15} className="shrink-0" style={{ color: "#00F0FF" }} />,
        q: "Quels sont les modèles de facturation disponibles ?",
        a: "Deux options selon votre situation : le Paiement Unique — vous payez une fois pour la mise en place complète du système, idéal si vous souhaitez maîtriser votre budget sans récurrence. Ou le Forfait Mensuel — un abonnement qui inclut la maintenance, les mises à jour et le support prioritaire, adapté si vous voulez que Ghaflow évolue avec votre croissance. On vous aide à choisir le modèle qui correspond le mieux à votre réalité.",
      },
      {
        icon: <TrendingUp size={15} className="shrink-0" style={{ color: "#00F0FF" }} />,
        q: "Puis-je commencer petit et évoluer ensuite ?",
        a: "Absolument — c'est même notre approche recommandée. Vous commencez par un seul workflow prioritaire (celui qui vous coûte le plus de temps aujourd'hui), vous mesurez l'impact, puis vous étendez progressivement. Nos systèmes sont conçus pour être modulaires : chaque automatisation s'intègre dans un écosystème plus large sans avoir à tout reconstruire. Pas d'engagement sur un grand projet dès le départ.",
      },
    ],
  },
]

/* ── Shared accordion state key: group + item ──────────────── */
type OpenKey = `${number}-${number}` | null

/* ── Accordion Item ────────────────────────────────────────── */
function AccordionItem({
  item,
  displayIndex,
  isOpen,
  onToggle,
}: {
  item:         FaqItem
  displayIndex: string
  isOpen:       boolean
  onToggle:     () => void
}) {
  return (
    <motion.div
      variants={fadeInUp}
      onClick={onToggle}
      className="group rounded-xl overflow-hidden cursor-pointer"
      style={{
        background:  isOpen ? "rgba(0,240,255,0.04)" : "rgba(255,255,255,0.025)",
        border:      isOpen ? "0.5px solid rgba(0,240,255,0.35)" : "0.5px solid rgba(255,255,255,0.07)",
        transition:  "background 0.3s, border-color 0.3s",
      }}
      whileHover={{ borderColor: isOpen ? "rgba(0,240,255,0.45)" : "rgba(0,240,255,0.22)" }}
    >
      {/* Question row */}
      <div className="flex items-center justify-between gap-4 px-6 py-5">
        <div className="flex items-center gap-3 min-w-0">
          {/* Index number */}
          <span
            className="shrink-0 text-[11px] font-bold tabular-nums"
            style={{ color: isOpen ? "#00F0FF" : "#3f3f46" }}
          >
            {displayIndex}
          </span>

          {/* Optional price icon */}
          {item.icon && (
            <span className="shrink-0 opacity-70">{item.icon}</span>
          )}

          <h3 className="text-[15px] font-semibold tracking-tight leading-snug">
            {item.q}
          </h3>
        </div>

        {/* +/× toggle */}
        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="shrink-0 w-7 h-7 rounded-full flex items-center justify-center"
          style={{
            background: isOpen ? "rgba(0,240,255,0.15)" : "rgba(255,255,255,0.06)",
            border:     isOpen ? "0.5px solid rgba(0,240,255,0.4)" : "0.5px solid rgba(255,255,255,0.08)",
          }}
        >
          <Plus size={13} style={{ color: isOpen ? "#00F0FF" : "#71717A" }} />
        </motion.div>
      </div>

      {/* Answer — grid-template-rows avoids layout-triggering height animation */}
      <div
        style={{
          display: "grid",
          gridTemplateRows: isOpen ? "1fr" : "0fr",
          transition: "grid-template-rows 0.35s cubic-bezier(0.22, 1, 0.36, 1)",
        }}
      >
        <div style={{ overflow: "hidden" }}>
          <motion.p
            initial={false}
            animate={{ opacity: isOpen ? 1 : 0 }}
            transition={{ duration: 0.25, delay: isOpen ? 0.1 : 0 }}
            className="px-6 pb-6 pl-[52px] text-[14px] leading-[1.8]"
            style={{ color: "rgba(161,161,170,0.85)" }}
          >
            {item.a}
          </motion.p>
        </div>
      </div>
    </motion.div>
  )
}

/* ── Group label ───────────────────────────────────────────── */
function GroupLabel({ label, isPricing }: { label: string; isPricing: boolean }) {
  return (
    <div className="flex items-center gap-3 mb-3 mt-2">
      {isPricing && (
        <div
          className="w-6 h-6 rounded-lg flex items-center justify-center shrink-0"
          style={{ background: "rgba(0,240,255,0.10)", border: "0.5px solid rgba(0,240,255,0.25)" }}
        >
          <Layers size={12} className="text-[#00F0FF]" />
        </div>
      )}
      <span
        className="text-[11px] font-bold tracking-[0.14em] uppercase"
        style={{ color: isPricing ? "#00F0FF" : "#3f3f46" }}
      >
        {label}
      </span>
      <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.05)" }} />
    </div>
  )
}

/* ── Main Component ────────────────────────────────────────── */
export default function FAQ() {
  const ref    = useRef(null)
  const inView = useInView(ref, inViewOptions)

  // Open key encodes "groupIndex-itemIndex"
  const [open, setOpen] = useState<OpenKey>("0-0")

  const toggle = (key: OpenKey) => setOpen(open === key ? null : key)

  return (
    <section id="faq" className="section-wrapper bg-[#080808]">
      <div className="container">
        <div className="grid lg:grid-cols-[380px_1fr] gap-16 lg:gap-24 items-start">

          {/* ── Sidebar ──────────────────────────────────────── */}
          <motion.div
            ref={ref}
            variants={stagger}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="lg:sticky lg:top-24"
          >
            <motion.div variants={fadeInUp} className="mb-5">
              <span className="tag-badge">
                <span className="tag-badge-dot" />
                Réponses honnêtes
              </span>
            </motion.div>

            <motion.h2 variants={fadeInUp} className="section-heading mb-4">
              Questions<br />
              <span className="text-accent">fréquentes</span>
            </motion.h2>

            <motion.p variants={fadeInUp} className="section-sub mb-8">
              Pas de jargon. Des réponses directes sur ce qui compte vraiment
              avant de démarrer.
            </motion.p>

            {/* CTA card */}
            <motion.div
              variants={fadeInUp}
              className="rounded-xl p-5 mb-4"
              style={{
                background: "rgba(0,240,255,0.04)",
                border: "0.5px solid rgba(0,240,255,0.2)",
              }}
            >
              <div
                className="text-[11px] font-semibold tracking-[0.1em] uppercase mb-3"
                style={{ color: "#00F0FF" }}
              >
                Vous avez d'autres questions ?
              </div>
              <p className="text-[13px] text-[#71717A] leading-relaxed mb-4">
                On répond personnellement à chaque question lors de votre audit
                gratuit de 15 minutes.
              </p>
              <a
                href="#audit"
                className="inline-flex items-center gap-2 text-[13px] font-semibold text-[#00F0FF] hover:gap-3 transition-all duration-200"
              >
                Réserver mon audit →
              </a>
            </motion.div>

            {/* Pricing footnote */}
            <motion.div
              variants={fadeInUp}
              className="flex items-start gap-2.5 rounded-xl px-4 py-3"
              style={{ background: "rgba(255,255,255,0.02)", border: "0.5px solid rgba(255,255,255,0.05)" }}
            >
              <CircleDollarSign size={13} className="shrink-0 mt-0.5" style={{ color: "#00F0FF" }} />
              <p className="text-[12px] leading-relaxed" style={{ color: "rgba(161,161,170,0.6)" }}>
                Consultation gratuite de 15 min pour un{" "}
                <a href="#audit" className="text-[#00F0FF] hover:underline font-medium">
                  devis personnalisé
                </a>
                .
              </p>
            </motion.div>
          </motion.div>

          {/* ── Accordion ────────────────────────────────────── */}
          <motion.div
            variants={stagger}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="flex flex-col gap-6"
          >
            {FAQ_GROUPS.map((group, gi) => {
              const isPricing = gi === 1
              // running index across all groups for display numbers
              const offset = FAQ_GROUPS.slice(0, gi).reduce((s, g) => s + g.items.length, 0)

              return (
                <div key={gi}>
                  <GroupLabel label={group.label} isPricing={isPricing} />
                  <div className="flex flex-col gap-2">
                    {group.items.map((item, ii) => {
                      const key: OpenKey = `${gi}-${ii}`
                      return (
                        <AccordionItem
                          key={key}
                          item={item}
                          displayIndex={String(offset + ii + 1).padStart(2, "0")}
                          isOpen={open === key}
                          onToggle={() => toggle(key)}
                        />
                      )
                    })}
                  </div>

                  {/* Pricing section footer note */}
                  {isPricing && (
                    <motion.div
                      variants={fadeInUp}
                      className="mt-4 flex items-center gap-2.5 px-4 py-3 rounded-xl"
                      style={{
                        background: "rgba(0,240,255,0.03)",
                        border: "0.5px solid rgba(0,240,255,0.12)",
                      }}
                    >
                      <TrendingUp size={13} className="shrink-0" style={{ color: "#00F0FF" }} />
                      <p className="text-[12px]" style={{ color: "rgba(161,161,170,0.6)" }}>
                        ROI moyen constaté :{" "}
                        <span className="text-[#A1A1AA] font-semibold">récupéré en 4 à 8 semaines</span>
                        {" "}selon le projet.{" "}
                        <a href="#audit" className="text-[#00F0FF] hover:underline font-medium">
                          Consultation gratuite de 15 min pour un devis personnalisé →
                        </a>
                      </p>
                    </motion.div>
                  )}
                </div>
              )
            })}
          </motion.div>

        </div>
      </div>
    </section>
  )
}

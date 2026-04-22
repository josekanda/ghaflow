"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { fadeInUp, stagger, inViewOptions } from "@/lib/animations"
import { Coffee, Heart, Home, ShoppingBag, Briefcase, Wrench, CheckCircle2, ArrowRight } from "lucide-react"

const SECTORS = [
  {
    Icon: Coffee,
    name: "Restauration & Hôtellerie",
    hook: "Réservations, inventaire, fidélité — encore tout en manuel ?",
    desc: "Automatisez vos flux opérationnels pour vous concentrer sur l'expérience client. Zéro double saisie, zéro perte.",
    solutions: [
      "Gestion automatisée des réservations",
      "Suivi inventaire & réapprovisionnement",
      "Programme fidélité client automatisé",
      "Rapports de performance quotidiens",
    ],
  },
  {
    Icon: Heart,
    name: "Cliniques Dentaires & Médicales",
    hook: "15–20 % de no-shows. C'est 150 000 $/an qui s'évaporent.",
    desc: "Chaque rendez-vous manqué est une perte sèche. Nos systèmes IA automatisent les rappels, confirmations et listes d'attente — vous remplissez vos créneaux sans lever le petit doigt.",
    solutions: [
      "Rappels SMS + Email (J-2, J-1, H-2)",
      "Confirmation de rendez-vous en 1 tap",
      "Remplacement auto. des créneaux annulés",
      "Onboarding patient digitalisé",
    ],
    cta: "Calculer mes pertes de no-shows",
  },
  {
    Icon: Home,
    name: "Immobilier",
    hook: "Des leads qui s'évaporent faute de suivi rapide ?",
    desc: "Qualifiez vos prospects automatiquement, gérez vos baux et relancez au bon moment — sans rien oublier.",
    solutions: [
      "Qualification automatique des leads",
      "Gestion des baux & renouvellements",
      "CRM automatisé avec relances intelligentes",
      "Rapports de portefeuille en temps réel",
    ],
  },
  {
    Icon: ShoppingBag,
    name: "E-commerce & Retail",
    hook: "Vos clients attendent des réponses, pas des tickets.",
    desc: "Automatisez commandes, support client et logistique pour scaler sans embaucher.",
    solutions: [
      "Traitement & suivi commandes automatisé",
      "Support client IA 24/7",
      "Alertes de réapprovisionnement auto.",
      "Relances panier abandonné intelligentes",
    ],
  },
  {
    Icon: Briefcase,
    name: "Services Professionnels",
    hook: "Comptables, avocats, notaires — noyés dans l'admin ?",
    desc: "Récupérez 10–15h par semaine en automatisant l'onboarding clients, les relances et la documentation répétitive.",
    solutions: [
      "Onboarding client digitalisé & auto.",
      "Facturation & relances automatiques",
      "Gestion des rappels & échéances",
      "Génération automatique de documents",
    ],
  },
  {
    Icon: Wrench,
    name: "Construction Résidentielle",
    hook: "Chantiers en retard, sous-traitants difficiles à coordonner ?",
    desc: "Suivez l'avancement de vos projets en temps réel et coordonnez vos équipes sans effort.",
    solutions: [
      "Suivi avancement chantiers en temps réel",
      "Coordination & alertes sous-traitants",
      "Gestion des documents & approbations",
      "Rapports de chantier automatisés",
    ],
  },
]

export default function NicheSection() {
  const ref    = useRef(null)
  const inView = useInView(ref, inViewOptions)

  return (
    <section id="secteurs" className="section-wrapper bg-[#080808]">
      {/* Top glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(0,240,255,0.3), transparent)" }}
      />

      <div className="container">
        {/* Header */}
        <motion.div
          ref={ref}
          variants={stagger}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="text-center mb-16"
        >
          <motion.div variants={fadeInUp} className="mb-5">
            <span className="tag-badge">
              <span className="tag-badge-dot" />
              Secteurs cibles
            </span>
          </motion.div>
          <motion.h2 variants={fadeInUp} className="section-heading mb-4">
            Votre secteur,<br />
            <span className="text-accent">notre expertise</span>
          </motion.h2>
          <motion.p variants={fadeInUp} className="section-sub mx-auto text-center">
            Une même logique dans chaque secteur : l'expertise terrain d'abord, l'IA ensuite.
          </motion.p>
        </motion.div>

        {/* Cards grid */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid md:grid-cols-2 gap-6"
        >
          {SECTORS.map(({ Icon, name, hook, desc, solutions, cta }) => (
            <motion.div
              key={name}
              variants={fadeInUp}
              className="relative rounded-2xl overflow-hidden"
              style={{
                background: "rgba(0,240,255,0.04)",
                border: "0.5px solid rgba(0,240,255,0.2)",
              }}
            >
              {/* Glow orb */}
              <div
                className="absolute -top-20 -right-20 w-56 h-56 rounded-full pointer-events-none"
                style={{ background: "radial-gradient(circle, rgba(0,240,255,0.08) 0%, transparent 70%)" }}
              />

              <div className="relative z-10 p-6 md:p-8">
                {/* Icon + title */}
                <div className="flex items-start gap-4 mb-3">
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: "rgba(0,240,255,0.12)", border: "0.5px solid rgba(0,240,255,0.3)" }}
                  >
                    <Icon size={20} className="text-[#00F0FF]" />
                  </div>
                  <div>
                    <h3 className="text-lg font-black tracking-tight">{name}</h3>
                    <p className="text-[12px] font-semibold mt-0.5" style={{ color: "#00F0FF" }}>
                      {hook}
                    </p>
                  </div>
                </div>

                {/* Description */}
                <p className="text-[13px] text-[#71717A] leading-[1.7] mb-5">
                  {desc}
                </p>

                {/* Solutions grid */}
                <div className="grid grid-cols-2 gap-2 mb-5">
                  {solutions.map((item) => (
                    <div
                      key={item}
                      className="flex items-start gap-2 rounded-xl px-3 py-2.5"
                      style={{
                        background: "rgba(0,240,255,0.05)",
                        border: "0.5px solid rgba(0,240,255,0.12)",
                      }}
                    >
                      <CheckCircle2 size={12} className="text-[#00F0FF] mt-0.5 shrink-0" />
                      <span className="text-[11px] text-[#A1A1AA] leading-snug">{item}</span>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <a
                  href="#audit"
                  className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-[#00F0FF] hover:gap-2.5 transition-all duration-200"
                >
                  {cta ?? "Automatiser mon secteur"}
                  <ArrowRight size={13} />
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

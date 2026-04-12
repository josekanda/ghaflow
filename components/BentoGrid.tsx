"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Bot, Workflow, Link2, BarChart2, Database, MonitorSmartphone, FileText } from "lucide-react"
import { fadeInUp, stagger, hoverLift, inViewOptions } from "@/lib/animations"

const CARDS = [
  {
    id: "agents",
    span: "lg:col-span-7",
    icon: Bot,
    title: "Agents Vocaux & Chatbots",
    description:
      "Gérez 100% des appels entrants et demandes de leads sans opérateur. Nos agents IA qualifient, redirigent et répondent 24/7 avec une voix naturelle et une logique métier adaptée à votre secteur.",
    tags: ["Appels entrants", "Qualification leads", "Réponses FAQ", "Escalade intelligente"],
    accent: true,
    bigNum: "01",
  },
  {
    id: "workflow",
    span: "lg:col-span-5",
    icon: Workflow,
    title: "Automatisation Workflow",
    description:
      "Facturation, rappels SMS/email, planification — automatisés et exécutés sans intervention manuelle. Zéro oubli, zéro retard.",
    tags: ["Facturation", "SMS & Email", "Planification"],
    accent: false,
    bigNum: "02",
  },
  {
    id: "crm",
    span: "lg:col-span-4",
    icon: Link2,
    title: "Intégration CRM & Outils",
    description:
      "HubSpot, Notion, Slack, Google Workspace, Airtable — connexion fluide qui élimine la double-saisie et les silos d'information.",
    tags: ["CRM", "APIs", "No-code / Low-code"],
    accent: false,
    bigNum: "03",
  },
  {
    id: "digitalisation",
    span: "lg:col-span-4",
    icon: MonitorSmartphone,
    title: "Digitalisation",
    description:
      "Transformez vos processus papier et manuels en flux numériques fluides. Formulaires, signatures, validation — tout devient traçable, rapide et sans friction.",
    tags: ["Dématérialisation", "Formulaires", "Signatures électroniques"],
    accent: false,
    bigNum: "04",
  },
  {
    id: "data",
    span: "lg:col-span-4",
    icon: Database,
    title: "Centralisation des Données",
    description:
      "Unifiez vos sources de données dispersées en une seule source de vérité. Décisions plus rapides, moins d'erreurs, visibilité complète sur votre activité.",
    tags: ["Base de données", "Synchronisation", "Source unique"],
    accent: false,
    bigNum: "05",
  },
  {
    id: "docs",
    span: "lg:col-span-12",
    icon: FileText,
    title: "Gestion de la Documentation — Pour Tous les Secteurs",
    description:
      "Instructions de travail, procédures, manuels, rapports de conformité — générés, versionnés et distribués automatiquement. Que vous soyez dans le manufacturier, la santé ou les services, la documentation prend trop de temps. Nous l'automatisons.",
    tags: ["Instructions de travail", "Rapports auto.", "Versioning", "Procédures", "Conformité documentaire", "Distribution intelligente"],
    accent: false,
    bigNum: "07",
  },
  {
    id: "reporting",
    span: "lg:col-span-6",
    icon: BarChart2,
    title: "Reporting & Dashboards",
    description:
      "Tableaux de bord générés automatiquement, envoyés au bon moment aux bonnes personnes.",
    tags: ["Rapports auto.", "KPIs temps réel"],
    accent: false,
    bigNum: "06",
  },
  {
    id: "stat",
    span: "lg:col-span-6",
    icon: null,
    title: null,
    description: null,
    tags: [],
    accent: "stat" as const,
    bigNum: "",
  },
]

export default function BentoGrid() {
  const ref    = useRef(null)
  const inView = useInView(ref, inViewOptions)

  return (
    <section id="solutions" className="section-wrapper bg-[#050505]">
      <div className="container">
        {/* Header */}
        <motion.div
          ref={ref}
          variants={stagger}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="mb-14"
        >
          <motion.div variants={fadeInUp}>
            <span className="tag-badge mb-5 inline-flex">
              <span className="tag-badge-dot" />
              Solutions IA
            </span>
          </motion.div>
          <motion.h2 variants={fadeInUp} className="section-heading mb-4">
            Tout ce dont votre<br />
            <span className="text-accent">entreprise a besoin</span>
          </motion.h2>
          <motion.p variants={fadeInUp} className="section-sub">
            Des automatisations conçues pour résoudre de vrais problèmes —
            pas pour impressionner en démo.
          </motion.p>
        </motion.div>

        {/* Bento */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid lg:grid-cols-12 gap-px rounded-2xl overflow-hidden"
          style={{ border: "0.5px solid rgba(255,255,255,0.07)" }}
        >
          {CARDS.map((card) =>
            card.accent === "stat" ? (
              <motion.div
                key={card.id}
                variants={fadeInUp}
                whileHover={hoverLift}
                className={`${card.span} relative overflow-hidden p-8 flex flex-col justify-between min-h-[200px]`}
                style={{
                  background: "rgba(0,240,255,0.04)",
                  border: "0.5px solid rgba(0,240,255,0.2)",
                }}
              >
                <div>
                  <div className="text-[11px] font-semibold tracking-[0.1em] uppercase text-[#00F0FF] mb-3">
                    Résultats clients
                  </div>
                  <div
                    className="font-black leading-none mb-1"
                    style={{
                      fontSize: "clamp(2.5rem,5vw,3.5rem)",
                      letterSpacing: "-0.05em",
                      textShadow: "0 0 30px rgba(0,240,255,0.5)",
                      color: "#00F0FF",
                    }}
                  >
                    72h
                  </div>
                  <div className="text-sm text-[#A1A1AA]">Premier Quick Win déployé</div>
                </div>
                <div className="flex items-center gap-2 mt-4">
                  <span
                    className="w-2 h-2 rounded-full bg-green-400"
                    style={{ boxShadow: "0 0 8px #4ade80" }}
                  />
                  <span className="text-xs text-[#52525B]">Projets actifs en ce moment</span>
                </div>
              </motion.div>
            ) : (
              <BentoCard key={card.id} card={card} />
            ),
          )}
        </motion.div>
      </div>
    </section>
  )
}

type CardType = (typeof CARDS)[number]

function BentoCard({ card }: { card: CardType }) {
  const Icon = card.icon as React.ElementType
  return (
    <motion.div
      variants={fadeInUp}
      whileHover={{ background: "rgba(255,255,255,0.055)" }}
      className={`${card.span} relative overflow-hidden p-8 min-h-[220px] group`}
      style={{
        background: "rgba(255,255,255,0.03)",
        transition: "background 0.3s",
      }}
    >
      {/* Hover glow orb */}
      <div
        className="absolute -top-16 -right-16 w-52 h-52 rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: card.accent
            ? "radial-gradient(circle, rgba(0,240,255,0.15) 0%, transparent 70%)"
            : "radial-gradient(circle, rgba(0,240,255,0.08) 0%, transparent 70%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10">
        {/* Icon */}
        {Icon && (
          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center mb-5"
            style={{
              background: "rgba(0,240,255,0.10)",
              border: "0.5px solid rgba(0,240,255,0.25)",
            }}
          >
            <Icon size={20} className="text-[#00F0FF]" />
          </div>
        )}

        <h3 className="text-lg font-bold tracking-tight mb-2.5">{card.title}</h3>
        <p className="text-[13px] text-[#71717A] leading-relaxed mb-5">{card.description}</p>

        {/* Tags */}
        {card.tags && card.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {card.tags.map((tag) => (
              <span
                key={tag}
                className="text-[11px] font-medium px-3 py-1 rounded-full text-[#71717A]"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "0.5px solid rgba(255,255,255,0.08)",
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Big number watermark */}
      {card.bigNum && (
        <div
          className="absolute bottom-4 right-5 font-black select-none pointer-events-none"
          style={{ fontSize: "5rem", lineHeight: 1, letterSpacing: "-0.06em", color: "rgba(255,255,255,0.04)" }}
        >
          {card.bigNum}
        </div>
      )}
    </motion.div>
  )
}

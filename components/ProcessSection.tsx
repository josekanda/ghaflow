"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { fadeInUp, slideInLeft, slideInRight, stagger, inViewOptions } from "@/lib/animations"
import { Search, Zap, Rocket } from "lucide-react"

const STEPS = [
  {
    num:   "01",
    icon:  Search,
    title: "Cartographie des Irritants",
    desc:  "On commence par une session de découverte de 30 à 60 minutes pour cartographier précisément où votre temps se perd. On identifie les tâches répétitives, les points de friction et les goulots d'étranglement.",
    items: [
      "Entretien structuré avec vos équipes",
      "Analyse de vos flux de travail actuels",
      "Identification des coûts cachés en temps",
    ],
    side: "left" as const,
  },
  {
    num:   "02",
    icon:  Zap,
    title: "Plan de Quick Wins",
    desc:  "On priorise les automatisations à impact maximal dans un plan en 2 à 6 semaines. Pas de grands projets théoriques — des actions concrètes qui libèrent du temps dès la première semaine.",
    items: [
      "Priorisation par ROI / effort",
      "Roadmap claire avec jalons hebdomadaires",
      "Validation avant développement",
    ],
    side: "right" as const,
  },
  {
    num:   "03",
    icon:  Rocket,
    title: "Déploiement Cadencé & Suivi",
    desc:  "On déploie en sprints courts, on mesure chaque résultat et on optimise en continu. Dashboard de suivi en temps réel et point hebdomadaire avec votre référent Ghaflow.",
    items: [
      "Déploiement en 72h pour les premiers Quick Wins",
      "Suivi des métriques d'économie de temps",
      "Optimisation continue post-lancement",
    ],
    side: "left" as const,
  },
]

export default function ProcessSection() {
  const ref    = useRef(null)
  const inView = useInView(ref, inViewOptions)

  return (
    <section id="methodology" className="section-wrapper bg-[#080808] relative overflow-hidden">
      {/* Center vertical line (desktop) */}
      <div
        className="absolute left-1/2 top-0 bottom-0 w-px hidden lg:block pointer-events-none"
        style={{ background: "linear-gradient(to bottom, transparent, rgba(255,255,255,0.06), transparent)" }}
      />

      <div className="container">
        {/* Header */}
        <motion.div
          ref={ref}
          variants={stagger}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="text-center mb-20"
        >
          <motion.div variants={fadeInUp} className="mb-5">
            <span className="tag-badge">
              <span className="tag-badge-dot" />
              Le Processus Ghaflow
            </span>
          </motion.div>
          <motion.h2 variants={fadeInUp} className="section-heading mb-4">
            De l'idée au déploiement<br />
            <span className="text-accent">en 3 étapes</span>
          </motion.h2>
          <motion.p variants={fadeInUp} className="section-sub mx-auto text-center">
            Pas de projet fleuve. Un sprint structuré qui part de vos irritants réels
            et livre des résultats mesurables en quelques jours.
          </motion.p>
        </motion.div>

        {/* Steps */}
        <div className="flex flex-col gap-6">
          {STEPS.map((step, i) => (
            <Step key={step.num} step={step} index={i} active={inView} />
          ))}
        </div>
      </div>
    </section>
  )
}

function Step({
  step,
  index,
  active,
}: {
  step: (typeof STEPS)[number]
  index: number
  active: boolean
}) {
  const isLeft = step.side === "left"
  const Icon   = step.icon

  return (
    <div className="grid lg:grid-cols-[1fr_80px_1fr] gap-0 items-start">

      {/* Left slot */}
      <div className={isLeft ? "block" : "hidden lg:block"}>
        {isLeft && (
          <motion.div
            variants={slideInLeft}
            initial="hidden"
            animate={active ? "visible" : "hidden"}
            transition={{ delay: index * 0.15 }}
            whileHover={{ borderColor: "rgba(0,240,255,0.3)", background: "rgba(0,240,255,0.03)" }}
            className="rounded-2xl p-7 my-3 transition-all duration-300"
            style={{ background: "rgba(255,255,255,0.025)", border: "0.5px solid rgba(255,255,255,0.07)" }}
          >
            <StepContent step={step} Icon={Icon} />
          </motion.div>
        )}
      </div>

      {/* Center — circle + line */}
      <div className="hidden lg:flex flex-col items-center pt-10">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={active ? { scale: 1, opacity: 1 } : {}}
          transition={{ delay: index * 0.15 + 0.1, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="w-12 h-12 rounded-full flex items-center justify-center z-10 relative shrink-0"
          style={{
            background: "#050505",
            border: "0.5px solid rgba(0,240,255,0.4)",
            boxShadow: "0 0 20px rgba(0,240,255,0.2)",
            color: "#00F0FF",
            fontWeight: 700,
            fontSize: 14,
          }}
        >
          {step.num}
        </motion.div>
        {index < STEPS.length - 1 && (
          <div
            className="w-px flex-1 min-h-[80px] mt-2"
            style={{ background: "linear-gradient(to bottom, rgba(0,240,255,0.25), transparent)" }}
          />
        )}
      </div>

      {/* Right slot */}
      <div className={!isLeft ? "block" : "hidden lg:block"}>
        {!isLeft && (
          <motion.div
            variants={slideInRight}
            initial="hidden"
            animate={active ? "visible" : "hidden"}
            transition={{ delay: index * 0.15 }}
            whileHover={{ borderColor: "rgba(0,240,255,0.3)", background: "rgba(0,240,255,0.03)" }}
            className="rounded-2xl p-7 my-3 transition-all duration-300"
            style={{ background: "rgba(255,255,255,0.025)", border: "0.5px solid rgba(255,255,255,0.07)" }}
          >
            <StepContent step={step} Icon={Icon} />
          </motion.div>
        )}
      </div>

      {/* Mobile — always show card */}
      <div className="lg:hidden col-span-full">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate={active ? "visible" : "hidden"}
          transition={{ delay: index * 0.1 }}
          className="rounded-2xl p-6"
          style={{ background: "rgba(255,255,255,0.025)", border: "0.5px solid rgba(255,255,255,0.07)" }}
        >
          {/* Mobile step number */}
          <div
            className="text-[11px] font-bold tracking-[0.12em] uppercase mb-3"
            style={{ color: "#00F0FF" }}
          >
            Étape {step.num}
          </div>
          <StepContent step={step} Icon={Icon} />
        </motion.div>
      </div>
    </div>
  )
}

function StepContent({
  step,
  Icon,
}: {
  step: (typeof STEPS)[number]
  Icon: React.ElementType
}) {
  return (
    <>
      {/* Icon + title */}
      <div className="flex items-center gap-3 mb-3">
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
          style={{ background: "rgba(0,240,255,0.10)", border: "0.5px solid rgba(0,240,255,0.2)" }}
        >
          <Icon size={16} className="text-[#00F0FF]" />
        </div>
        <h3 className="text-[17px] font-bold tracking-tight">{step.title}</h3>
      </div>

      {/* Label */}
      <div
        className="text-[11px] font-semibold tracking-[0.1em] uppercase mb-3"
        style={{ color: "#00F0FF" }}
      >
        Étape {step.num}
      </div>

      <p className="text-sm text-[#71717A] leading-relaxed mb-4">{step.desc}</p>

      <ul className="flex flex-col gap-2">
        {step.items.map((item) => (
          <li key={item} className="flex items-start gap-2.5 text-[13px] text-[#52525B]">
            <span className="text-[#00F0FF] mt-0.5 shrink-0">→</span>
            {item}
          </li>
        ))}
      </ul>
    </>
  )
}

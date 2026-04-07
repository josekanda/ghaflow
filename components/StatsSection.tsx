"use client"

import { useRef, useEffect, useState } from "react"
import { motion, useInView } from "framer-motion"
import { fadeInUp, stagger, inViewOptions } from "@/lib/animations"
import { Timer, TrendingDown, TrendingUp } from "lucide-react"

/* ── Animated counter hook ─────────────────────────────────── */
function useCounter(target: number, duration = 1400, active: boolean) {
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!active) return
    let startTime: number | null = null

    const tick = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      // Cubic ease-out
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(Math.round(eased * target))
      if (progress < 1) requestAnimationFrame(tick)
    }

    const id = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(id)
  }, [target, duration, active])

  return value
}

/* ── Stat config ───────────────────────────────────────────── */
const STATS = [
  {
    icon:   Timer,
    prefix: "",
    value:  25,
    suffix: "h",
    label:  "sauvées par semaine",
    desc:   "En moyenne par client. Vos équipes se concentrent sur la valeur réelle, pas sur la saisie et les relances.",
    color:  "#00F0FF",
  },
  {
    icon:   TrendingDown,
    prefix: "−",
    value:  50,
    suffix: "%",
    label:  "Temps de traitement",
    desc:   "Facturation, suivi client, reporting — automatisés et exécutés sans intervention humaine.",
    color:  "#00F0FF",
  },
  {
    icon:   TrendingUp,
    prefix: "+",
    value:  40,
    suffix: "%",
    label:  "Efficacité opérationnelle",
    desc:   "Moins d'erreurs, plus de cadence. Vos processus tournent 24/7 sans surveillance.",
    color:  "#00F0FF",
  },
]

export default function StatsSection() {
  const ref    = useRef(null)
  const inView = useInView(ref, inViewOptions)

  return (
    <section id="impact" className="section-wrapper bg-[#080808]">
      {/* Subtle top line glow */}
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
              Résultats mesurables
            </span>
          </motion.div>
          <motion.h2 variants={fadeInUp} className="section-heading mb-4">
            Des chiffres qui<br />
            <span className="text-accent">parlent d'eux-mêmes</span>
          </motion.h2>
          <motion.p variants={fadeInUp} className="section-sub mx-auto text-center">
            Nos clients gagnent du temps dès les premières semaines. Voici ce que
            l'automatisation change concrètement.
          </motion.p>
        </motion.div>

        {/* Cards */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid md:grid-cols-3 gap-px rounded-2xl overflow-hidden"
          style={{ border: "0.5px solid rgba(255,255,255,0.07)" }}
        >
          {STATS.map((stat, i) => (
            <StatCard key={i} stat={stat} active={inView} delay={i * 0.15} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}

function StatCard({
  stat,
  active,
  delay,
}: {
  stat: (typeof STATS)[number]
  active: boolean
  delay: number
}) {
  const count = useCounter(stat.value, 1400, active)
  const Icon  = stat.icon

  return (
    <motion.div
      variants={fadeInUp}
      transition={{ delay }}
      whileHover={{ background: "rgba(0,240,255,0.04)" }}
      className="relative group flex flex-col p-10 overflow-hidden"
      style={{ background: "rgba(255,255,255,0.025)", transition: "background 0.3s" }}
    >
      {/* Top glow on hover */}
      <div
        className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: "linear-gradient(90deg, transparent, rgba(0,240,255,0.5), transparent)" }}
      />

      {/* Icon badge */}
      <div
        className="w-11 h-11 rounded-xl flex items-center justify-center mb-6 shrink-0"
        style={{ background: "rgba(0,240,255,0.10)", border: "0.5px solid rgba(0,240,255,0.25)" }}
      >
        <Icon size={19} className="text-[#00F0FF]" />
      </div>

      {/* Number */}
      <div
        className="font-black leading-none mb-2"
        style={{
          fontSize: "clamp(3rem,5vw,4.5rem)",
          letterSpacing: "-0.055em",
          color: "#00F0FF",
          textShadow: "0 0 40px rgba(0,240,255,0.45)",
        }}
      >
        {stat.prefix}{count}{stat.suffix}
      </div>

      <div className="text-base font-bold tracking-tight mb-2">{stat.label}</div>
      <p className="text-[13px] text-[#52525B] leading-relaxed">{stat.desc}</p>
    </motion.div>
  )
}

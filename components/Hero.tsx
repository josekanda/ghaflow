"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { ArrowRight, Play, CheckCircle2, Zap, BarChart3 } from "lucide-react"
import { fadeInUp, stagger } from "@/lib/animations"

/* ── Floating mockup data ──────────────────────────────────── */
const WORKFLOW_STEPS = ["Non-conformité détectée", "Analyse IA", "NCR générée", "Responsable notifié", "Clôture tracée"]
const ACTIVE_STEP = 2

export default function Hero() {
  const ref    = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] })
  const mockupY = useTransform(scrollYProgress, [0, 1], [0, 60])
  const bgY     = useTransform(scrollYProgress, [0, 1], [0, 120])

  return (
    <section
      ref={ref}
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* ── Background ─────────────────────────────────────────── */}
      <motion.div style={{ y: bgY }} className="absolute inset-0 pointer-events-none">
        {/* Perspective grid */}
        <div
          className="absolute inset-0 bg-grid bg-grid opacity-100"
          style={{
            maskImage: "radial-gradient(ellipse 80% 60% at 50% 0%, black, transparent)",
            WebkitMaskImage: "radial-gradient(ellipse 80% 60% at 50% 0%, black, transparent)",
          }}
        />
        {/* Orbs */}
        <div
          className="absolute -top-32 -right-32 w-[700px] h-[700px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(0,240,255,0.09) 0%, transparent 65%)", filter: "blur(40px)" }}
        />
        <div
          className="absolute bottom-0 -left-24 w-[500px] h-[500px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(0,240,255,0.05) 0%, transparent 65%)", filter: "blur(60px)" }}
        />
      </motion.div>

      {/* ── Content ────────────────────────────────────────────── */}
      <div className="container relative z-10 pt-24 pb-16">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left — text */}
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="visible"
            className="flex flex-col"
          >
            {/* Eyebrow tag */}
            <motion.div variants={fadeInUp} className="mb-7">
              <span className="tag-badge">
                <span className="tag-badge-dot" />
                Aérospatial · Manufacturier · Automobile · Industriel — IA sur-mesure
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={fadeInUp}
              className="font-black tracking-tight leading-[1.0] mb-6"
              style={{ fontSize: "clamp(2.6rem, 6.5vw, 5rem)", letterSpacing: "-0.045em" }}
            >
              L'expertise terrain,<br />
              <span className="text-accent">augmentée<br />par l'IA</span>
            </motion.h1>

            {/* Sub */}
            <motion.p
              variants={fadeInUp}
              className="text-[#A1A1AA] text-lg leading-[1.7] mb-6 max-w-[480px]"
            >
              Concepteur mécanique et agent des méthodes dans l'aéronautique depuis 15 ans. J'automatise les processus
              qualité et documentation des PME manufacturières — parce que je vis ces problèmes
              tous les jours.
            </motion.p>

            {/* CTAs */}
            <motion.div variants={fadeInUp} className="flex flex-wrap gap-4 mb-4">
              <a href="#audit" className="btn-glow">
                Réserver mon Audit Gratuit
                <ArrowRight size={16} />
              </a>
              <a href="#solutions" className="btn-ghost group">
                <span
                  className="flex items-center justify-center w-8 h-8 rounded-full border"
                  style={{ borderColor: "rgba(255,255,255,0.12)" }}
                >
                  <Play size={12} className="translate-x-0.5" />
                </span>
                Voir les solutions
              </a>
            </motion.div>

            {/* ESSOR notice */}
            <motion.div
              variants={fadeInUp}
              className="flex items-center gap-2 text-xs mb-10"
              style={{ color: "#52525B" }}
            >
              <span className="text-green-400 font-bold">✓</span>
              Subventions ESSOR disponibles — jusqu'à{" "}
              <span className="text-green-400 font-semibold">50% du coût</span>{" "}
              couvert par le gouvernement
            </motion.div>

            {/* Stat strip */}
            <motion.div
              variants={fadeInUp}
              className="flex flex-wrap gap-8 pt-8"
              style={{ borderTop: "0.5px solid rgba(255,255,255,0.08)" }}
            >
              {[
                { value: "15 ans", label: "expertise aéronautique"   },
                { value: "72h",    label: "premier résultat garanti" },
                { value: "50%",    label: "financement ESSOR"        },
              ].map(({ value, label }) => (
                <div key={label}>
                  <div
                    className="font-black text-2xl tracking-tight"
                    style={{ color: "#00F0FF", letterSpacing: "-0.04em", textShadow: "0 0 30px rgba(0,240,255,0.4)" }}
                  >
                    {value}
                  </div>
                  <div className="text-xs text-[#52525B] mt-0.5">{label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right — floating mockup */}
          <motion.div
            style={{ y: mockupY }}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="hidden lg:flex justify-center"
          >
            <MockupDashboard />
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
        <div
          className="w-px h-12"
          style={{
            background: "linear-gradient(to bottom, transparent, #00F0FF)",
            animation: "scan-line 2s ease-in-out infinite",
          }}
        />
      </div>
    </section>
  )
}

/* ── Floating Dashboard Mockup ─────────────────────────────── */
function MockupDashboard() {
  return (
    <div className="relative w-full max-w-[460px] animate-float">

      {/* Main card */}
      <motion.div
        initial={{ rotateY: 8, rotateX: 4 }}
        whileHover={{ rotateY: 0, rotateX: 0 }}
        transition={{ duration: 0.5 }}
        className="rounded-2xl overflow-hidden shadow-[0_40px_80px_rgba(0,0,0,0.6)]"
        style={{
          background: "#0a0a0a",
          border: "0.5px solid rgba(255,255,255,0.08)",
          transformStyle: "preserve-3d",
          perspective: "1000px",
        }}
      >
        {/* Window chrome */}
        <div
          className="flex items-center gap-2 px-4 py-3 border-b"
          style={{ borderColor: "rgba(255,255,255,0.06)", background: "#0d0d0d" }}
        >
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
          <div
            className="flex-1 mx-4 rounded-full h-5"
            style={{ background: "rgba(255,255,255,0.04)", border: "0.5px solid rgba(255,255,255,0.06)" }}
          />
        </div>

        {/* Body */}
        <div className="p-4 space-y-3">
          {/* Stat row */}
          <div className="grid grid-cols-2 gap-3">
            <StatCard icon={<Zap size={12} />} label="Processus qualité" value="NCR" delta="automatisées" />
            <StatCard icon={<BarChart3 size={12} />} label="Docs générées" value="auto." delta="conformes" />
          </div>

          {/* Workflow pipeline */}
          <div
            className="rounded-xl p-3.5"
            style={{ background: "rgba(255,255,255,0.03)", border: "0.5px solid rgba(255,255,255,0.06)" }}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-[#A1A1AA]">Pipeline actif</span>
              <span className="text-[10px] font-semibold text-[#00F0FF] flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00F0FF] animate-pulse-dot" />
                En cours
              </span>
            </div>
            <div className="flex gap-1 mb-2">
              {WORKFLOW_STEPS.map((_, i) => (
                <div
                  key={i}
                  className="h-1 flex-1 rounded-full transition-all"
                  style={{
                    background: i <= ACTIVE_STEP ? "#00F0FF" : "rgba(255,255,255,0.1)",
                    boxShadow: i === ACTIVE_STEP ? "0 0 6px #00F0FF" : "none",
                  }}
                />
              ))}
            </div>
            <div className="flex flex-col gap-1 mt-2.5">
              {WORKFLOW_STEPS.map((step, i) => (
                <div key={i} className="flex items-center gap-2">
                  <CheckCircle2
                    size={11}
                    className={i <= ACTIVE_STEP ? "text-[#00F0FF]" : "text-[#3f3f46]"}
                  />
                  <span
                    className={`text-[11px] ${i <= ACTIVE_STEP ? "text-[#A1A1AA]" : "text-[#3f3f46]"}`}
                  >
                    {step}
                  </span>
                  {i === ACTIVE_STEP && (
                    <span className="ml-auto text-[10px] text-[#00F0FF] font-semibold">• actif</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Floating notification — top right */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, x: 10 }}
        animate={{ opacity: 1, scale: 1, x: 0 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="absolute -top-4 -right-4 rounded-xl px-3 py-2 shadow-lg"
        style={{
          background: "#0d0d0d",
          border: "0.5px solid rgba(0,240,255,0.25)",
          boxShadow: "0 0 20px rgba(0,240,255,0.15)",
        }}
      >
        <div className="text-[11px] font-semibold text-[#00F0FF]">✓ NCR clôturée auto.</div>
        <div className="text-[10px] text-[#52525B]">il y a 2 secondes</div>
      </motion.div>

      {/* Floating doc badge — bottom left */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, x: -10 }}
        animate={{ opacity: 1, scale: 1, x: 0 }}
        transition={{ delay: 1.1, duration: 0.5 }}
        className="absolute -bottom-4 -left-4 rounded-xl px-3 py-2.5 shadow-lg"
        style={{
          background: "#0d0d0d",
          border: "0.5px solid rgba(255,255,255,0.08)",
        }}
      >
        <div className="text-[11px] text-[#A1A1AA]">📄 Rapport AS9100 généré</div>
        <div
          className="mt-1.5 h-0.5 w-16 rounded-full"
          style={{ background: "#00F0FF", boxShadow: "0 0 8px #00F0FF" }}
        />
      </motion.div>
    </div>
  )
}

function StatCard({
  icon, label, value, delta,
}: {
  icon: React.ReactNode
  label: string
  value: string
  delta: string
}) {
  return (
    <div
      className="rounded-xl p-3"
      style={{ background: "rgba(255,255,255,0.03)", border: "0.5px solid rgba(255,255,255,0.06)" }}
    >
      <div className="flex items-center gap-1.5 text-[#00F0FF] mb-2 text-[11px] font-medium">
        {icon}
        {label}
      </div>
      <div className="text-xl font-black tracking-tight">{value}</div>
      <div className="text-[11px] text-green-400 mt-0.5">↑ {delta}</div>
    </div>
  )
}

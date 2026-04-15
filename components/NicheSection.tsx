"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { fadeInUp, stagger, inViewOptions } from "@/lib/animations"
import { Plane, CheckCircle2, ArrowRight } from "lucide-react"

/* ── Manufacturier / Aéro ────────────────────────────────────── */
const SECTORS = [
  "Aérospatial & Défense",
  "Fabrication Mécanique",
  "Automobile & Sous-traitants",
  "Équipements Industriels",
]

const MANUFACTURING_SOLUTIONS = [
  "Gestion des Non-Conformités (NCR)",
  "Génération automatique d'instructions de travail",
  "Assistant de préparation d'audit AS9100 / ISO 9001",
  "Automatisation des demandes de devis (RFQ) entrants",
  "Suivi automatisé des FAI (First Article Inspection)",
  "Chatbot interne « expert »",
  "Automatisation des CAPA (Corrective and Preventive Actions)",
  "Suivi des certifications fournisseurs",
  "Reporting OEE / production automatisé",
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
            Un avantage que personne<br />
            <span className="text-accent">ne peut copier</span>
          </motion.h2>
          <motion.p variants={fadeInUp} className="section-sub mx-auto text-center">
            Deux secteurs, une même logique : l'expertise terrain d'abord, l'IA ensuite.
          </motion.p>
        </motion.div>

        {/* Cards — stacked (1 colonne) */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="flex flex-col gap-6"
        >
          {/* ── Card 1 : Manufacturier / Aéro ──────────────────── */}
          <motion.div
            variants={fadeInUp}
            className="relative rounded-2xl overflow-hidden"
            style={{
              background: "rgba(0,240,255,0.04)",
              border: "0.5px solid rgba(0,240,255,0.2)",
            }}
          >
            {/* Glow orb */}
            <div
              className="absolute -top-24 -right-24 w-72 h-72 rounded-full pointer-events-none"
              style={{ background: "radial-gradient(circle, rgba(0,240,255,0.10) 0%, transparent 70%)" }}
            />

            <div className="relative z-10 p-8 md:p-10">
              {/* Icon + titre */}
              <div className="flex items-start gap-4 mb-4">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: "rgba(0,240,255,0.12)", border: "0.5px solid rgba(0,240,255,0.3)" }}
                >
                  <Plane size={22} className="text-[#00F0FF]" />
                </div>
                <div>
                  <h3 className="text-xl font-black tracking-tight">PME Manufacturières & Aéronautiques</h3>
                  <p className="text-sm font-semibold mt-0.5" style={{ color: "#00F0FF" }}>
                    Vous connaissez AS9100 ? Nous aussi — de l'intérieur.
                  </p>
                </div>
              </div>

              {/* Sectors badges */}
              <div className="flex flex-wrap gap-2 mb-6">
                {SECTORS.map((s) => (
                  <span
                    key={s}
                    className="text-[11px] font-medium px-3 py-1 rounded-full"
                    style={{
                      background: "rgba(0,240,255,0.08)",
                      border: "0.5px solid rgba(0,240,255,0.22)",
                      color: "#00F0FF",
                    }}
                  >
                    {s}
                  </span>
                ))}
              </div>

              {/* Description */}
              <p className="text-[14px] text-[#71717A] leading-[1.7] mb-8 max-w-2xl">
                15 ans dans l'industrie aéronautique et manufacturière. Je ne « comprends » pas vos
                processus qualité — je les vis chaque jour. C'est pourquoi j'automatise ce qu'aucune
                autre agence ne peut même expliquer.
              </p>

              {/* Solutions grid */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-8">
                {MANUFACTURING_SOLUTIONS.map((item) => (
                  <div
                    key={item}
                    className="flex items-start gap-2.5 rounded-xl px-4 py-3"
                    style={{
                      background: "rgba(0,240,255,0.05)",
                      border: "0.5px solid rgba(0,240,255,0.12)",
                    }}
                  >
                    <CheckCircle2 size={13} className="text-[#00F0FF] mt-0.5 shrink-0" />
                    <span className="text-[12px] text-[#A1A1AA] leading-snug">{item}</span>
                  </div>
                ))}
              </div>

              <a href="#audit" className="btn-glow inline-flex">
                Parler à un expert terrain
                <ArrowRight size={14} />
              </a>
            </div>
          </motion.div>

        </motion.div>
      </div>
    </section>
  )
}

"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { fadeInUp, stagger, inViewOptions } from "@/lib/animations"
import { ArrowRight } from "lucide-react"

export default function FounderSection() {
  const ref    = useRef(null)
  const inView = useInView(ref, inViewOptions)

  return (
    <section id="expert" className="py-20 md:py-24 bg-[#050505]" ref={ref}>
      <div className="container">
        <div className="max-w-3xl mx-auto">
          <motion.div
            variants={stagger}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            <motion.div variants={fadeInUp} className="mb-5">
              <span className="tag-badge">
                <span className="tag-badge-dot" />
                L'Expert Derrière Ghaflow
              </span>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="text-[12px] font-semibold tracking-[0.1em] uppercase mb-7"
              style={{ color: "#00F0FF" }}
            >
              Concepteur mécanique & Agent des méthodes · Aéronautique &nbsp;|&nbsp; Fondateur · Ghaflow
            </motion.div>

            {/* Quote */}
            <motion.blockquote
              variants={fadeInUp}
              className="text-xl md:text-2xl font-bold tracking-tight leading-[1.35] mb-6"
              style={{ letterSpacing: "-0.02em" }}
            >
              <span className="text-[#00F0FF]">"</span>
              Je n'explique pas vos problèmes de qualité.<br />
              Je les vis chaque jour — et je les automatise.
              <span className="text-[#00F0FF]">"</span>
            </motion.blockquote>

            {/* Bio */}
            <motion.p
              variants={fadeInUp}
              className="text-[#71717A] text-[15px] leading-[1.75] mb-6"
            >
              <span className="text-[#A1A1AA] font-semibold">Concepteur mécanique et agent des méthodes dans l'aéronautique depuis 15 ans.</span>
              Mon quotidien : rédiger des instructions de travail,
              résoudre des non-conformités, coordonner des changements d'ingénierie, naviguer dans
              Enovia et CATIA.
              <br /><br />
              C'est cette expertise terrain — que{" "}
              <span className="text-[#A1A1AA] font-semibold">personne ne peut copier sans 15 ans d'expérience</span>{" "}
              — que j'apporte dans chaque projet Ghaflow.
              J'automatise ce que les autres agences ne peuvent même pas expliquer.
            </motion.p>

            {/* Expertise badges */}
            <motion.div variants={fadeInUp} className="flex flex-wrap gap-2 mb-8">
              {["NCR / Non-conformités", "AS9100", "Documentation technique", "Enovia · CATIA", "Qualité & Logistique"].map((tag) => (
                <span
                  key={tag}
                  className="text-[11px] font-medium px-3 py-1 rounded-full"
                  style={{
                    background: "rgba(0,240,255,0.07)",
                    border: "0.5px solid rgba(0,240,255,0.2)",
                    color: "#00F0FF",
                  }}
                >
                  {tag}
                </span>
              ))}
            </motion.div>

            {/* CTA */}
            <motion.div variants={fadeInUp}>
              <a href="#audit" className="btn-glow inline-flex">
                Réserver mon Audit Gratuit
                <ArrowRight size={15} />
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

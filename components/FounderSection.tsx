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
              Fondateur · Ghaflow
            </motion.div>

            {/* Quote */}
            <motion.blockquote
              variants={fadeInUp}
              className="text-xl md:text-2xl font-bold tracking-tight leading-[1.35] mb-6"
              style={{ letterSpacing: "-0.02em" }}
            >
              <span className="text-[#00F0FF]">"</span>
              Des automatisations utiles,<br />pas de la complexité pour la complexité
              <span className="text-[#00F0FF]">"</span>
            </motion.blockquote>

            {/* Bio */}
            <motion.p
              variants={fadeInUp}
              className="text-[#71717A] text-[15px] leading-[1.75] mb-8"
            >
              Un professionnel de l'aéronautique, passionné par l'IA. Après des années dans
              l'industrie aéronautique — chez{" "}
              <span className="text-[#A1A1AA] font-semibold">Bombardier</span> et{" "}
              <span className="text-[#A1A1AA] font-semibold">Safran Landing Systems Canada</span>{" "}
              — j'ai vu de près ce que les processus manuels coûtent réellement aux organisations.
              <br /><br />
              Formé en IA et automatisation, j'ai créé Ghaflow pour une raison simple : les
              entreprises québécoises méritent les mêmes outils d'efficacité que les grandes
              corporations — à leur échelle et à leur budget.
            </motion.p>

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

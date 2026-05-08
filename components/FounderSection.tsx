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
              Expert en automatisation de processus &nbsp;|&nbsp; Fondateur · Ghaflow
            </motion.div>


{/* Bio */}
            <motion.div variants={fadeInUp} className="text-[#71717A] text-[15px] leading-[1.75] mb-6">
              <p className="text-[#A1A1AA] font-bold text-[16px] mb-4">
                Fondateur de Ghaflow – Expert en automatisation de processus IA
              </p>
              <p className="mb-4">
                Je ne vends pas de technologie, je résous des problèmes opérationnels que j'ai vécus
                moi-même sur le terrain. Ancien opérateur en fabrication, j'ai passé des années au
                cœur de processus manuels, de tâches répétitives et de pertes de temps qu'on tolère
                {" "}«&nbsp;parce qu'on a toujours fait comme ça&nbsp;».
              </p>
              <p>
                Avec Ghaflow, je m'appuie sur cette expérience terrain pour concevoir des systèmes
                d'automatisation vraiment alignés sur la réalité des équipes. Je pars de vos
                opérations, pas des outils. Aujourd'hui, je combine expertise opérationnelle et
                maîtrise d'outils IA pour mettre en place des workflows fiables, prêts à l'emploi et intégrés à vos
                systèmes existants.
              </p>
            </motion.div>

            {/* Expertise badges */}
            <motion.div variants={fadeInUp} className="flex flex-wrap gap-2 mb-8">
              {["Automatisation IA", "Processus industriels", "Documentation technique", "Qualité & Logistique", "Optimisation des flux"].map((tag) => (
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

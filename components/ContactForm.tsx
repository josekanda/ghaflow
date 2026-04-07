"use client"

import { useRef } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { motion, useInView } from "framer-motion"
import { Send, Lock, CheckCircle2 } from "lucide-react"
import { fadeInUp, stagger, inViewOptions } from "@/lib/animations"

/* ── Zod schema ────────────────────────────────────────────── */
const schema = z.object({
  name: z
    .string()
    .min(2, { message: "Le nom est requis (min. 2 caractères)" }),
  email: z
    .string()
    .email({ message: "Adresse email invalide" }),
  company: z
    .string()
    .optional(),
  teamSize: z
    .string()
    .min(1, { message: "Veuillez sélectionner une taille d'équipe" }),
  needs: z
    .string()
    .min(20, { message: "Décrivez vos besoins (min. 20 caractères)" }),
  consent: z
    .boolean()
    .refine((v) => v === true, { message: "Veuillez accepter pour continuer" }),
})

type FormData = z.infer<typeof schema>

/* ── Component ─────────────────────────────────────────────── */
export default function ContactForm() {
  const ref    = useRef(null)
  const inView = useInView(ref, inViewOptions)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { consent: false },
  })

  const onSubmit = async (data: FormData) => {
    const res = await fetch(
      "https://j2kanda.app.n8n.cloud/webhook/ghaflow-contact",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name:     data.name,
          email:    data.email,
          company:  data.company ?? "",
          teamSize: data.teamSize,
          needs:    data.needs,
        }),
      }
    )
    if (!res.ok) throw new Error("Erreur lors de l'envoi")
  }

  return (
    <section id="audit" className="section-wrapper bg-[#080808] relative overflow-hidden">
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 50% 60% at 50% 50%, rgba(0,240,255,0.04) 0%, transparent 70%)",
        }}
      />

      <div className="container relative z-10">
        <motion.div
          ref={ref}
          variants={stagger}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="max-w-2xl mx-auto text-center mb-12"
        >
          <motion.div variants={fadeInUp} className="mb-5">
            <span className="tag-badge">
              <span className="tag-badge-dot" />
              Audit Gratuit
            </span>
          </motion.div>
          <motion.h2 variants={fadeInUp} className="section-heading mb-4">
            Obtenez votre<br />
            <span className="text-accent">plan d'automatisation</span>
          </motion.h2>
          <motion.p variants={fadeInUp} className="section-sub mx-auto">
            15 minutes pour identifier vos 3 premières automatisations à fort impact.
            Gratuit, sans engagement, avec un plan d'action concret.
          </motion.p>
        </motion.div>

        {/* Card */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          transition={{ delay: 0.2 }}
          className="max-w-2xl mx-auto rounded-2xl p-8 md:p-12"
          style={{
            background: "rgba(255,255,255,0.03)",
            backdropFilter: "blur(30px)",
            WebkitBackdropFilter: "blur(30px)",
            border: "0.5px solid rgba(255,255,255,0.08)",
            boxShadow: "inset 0 0.5px 0 rgba(255,255,255,0.06), 0 40px 80px rgba(0,0,0,0.5)",
          }}
        >
          {isSubmitSuccessful ? (
            <SuccessState />
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
              {/* Row: Name + Email */}
              <div className="grid sm:grid-cols-2 gap-4">
                <Field label="Votre Nom" error={errors.name?.message}>
                  <input
                    {...register("name")}
                    placeholder="Jean Dupont"
                    className="input-base"
                    autoComplete="name"
                  />
                </Field>
                <Field label="Email Professionnel" error={errors.email?.message}>
                  <input
                    {...register("email")}
                    type="email"
                    placeholder="jean@entreprise.com"
                    className="input-base"
                    autoComplete="email"
                  />
                </Field>
              </div>

              {/* Company */}
              <Field label="Entreprise & Secteur">
                <input
                  {...register("company")}
                  placeholder="Mon Entreprise — Secteur"
                  className="input-base"
                />
              </Field>

              {/* Team size */}
              <Field label="Taille de l'équipe" error={errors.teamSize?.message}>
                <select
                  {...register("teamSize")}
                  className="input-base appearance-none cursor-pointer bg-[#0a0a0a]"
                  defaultValue=""
                >
                  <option value="" disabled>Sélectionner...</option>
                  <option value="1-5">1–5 personnes (Solo ou micro-équipe)</option>
                  <option value="6-20">6–20 personnes (PME)</option>
                  <option value="21-50">21–50 personnes</option>
                  <option value="50+">50+ personnes</option>
                </select>
              </Field>

              {/* Needs */}
              <Field label="Vos principaux irritants & objectifs" error={errors.needs?.message}>
                <textarea
                  {...register("needs")}
                  rows={4}
                  placeholder="Ex : Je passe 3h par jour à faire des relances manuelles par email, je n'ai pas de suivi centralisé des leads..."
                  className="input-base resize-none"
                />
              </Field>

              {/* Consent */}
              <div className="space-y-1">
                <label className="flex items-start gap-3 cursor-pointer group">
                  <input
                    {...register("consent")}
                    type="checkbox"
                    className="mt-0.5 w-4 h-4 rounded accent-[#00F0FF] cursor-pointer shrink-0"
                  />
                  <span className="text-[12px] text-[#52525B] leading-relaxed group-hover:text-[#71717A] transition-colors">
                    J'accepte d'être contacté par Ghaflow pour planifier mon audit.
                    Aucun spam, jamais.
                  </span>
                </label>
                {errors.consent && (
                  <p className="text-red-400 text-[11px] pl-7">{errors.consent.message}</p>
                )}
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-glow w-full mt-2 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:shadow-none disabled:hover:translate-y-0"
              >
                {isSubmitting ? (
                  <>
                    <span className="w-4 h-4 rounded-full border-2 border-current border-t-transparent animate-spin" />
                    Envoi en cours…
                  </>
                ) : (
                  <>
                    Réserver mon Audit Express — Gratuit
                    <Send size={15} />
                  </>
                )}
              </button>
            </form>
          )}

          {/* Footer note */}
          {!isSubmitSuccessful && (
            <p className="flex items-center justify-center gap-2 text-[11px] text-[#3f3f46] mt-5">
              <Lock size={11} className="text-[#00F0FF]" />
              Données protégées · 15 minutes · Sans engagement
            </p>
          )}
        </motion.div>
      </div>
    </section>
  )
}

/* ── Field wrapper ─────────────────────────────────────────── */
function Field({
  label,
  error,
  children,
}: {
  label: string
  error?: string
  children: React.ReactNode
}) {
  return (
    <div>
      <label className="form-label">{label}</label>
      {children}
      {error && (
        <p className="text-red-400 text-[11px] mt-1.5 flex items-center gap-1">
          <span className="w-1 h-1 rounded-full bg-red-400 shrink-0" />
          {error}
        </p>
      )}
    </div>
  )
}

/* ── Success state ─────────────────────────────────────────── */
function SuccessState() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center text-center py-8 gap-4"
    >
      <div
        className="w-16 h-16 rounded-full flex items-center justify-center"
        style={{
          background: "rgba(34,197,94,0.1)",
          border: "0.5px solid rgba(34,197,94,0.3)",
          boxShadow: "0 0 30px rgba(34,197,94,0.2)",
        }}
      >
        <CheckCircle2 size={28} className="text-green-400" />
      </div>
      <h3 className="text-xl font-bold tracking-tight">Demande reçue !</h3>
      <p className="text-[#71717A] text-sm max-w-xs">
        Nous vous contacterons dans les 24 heures pour planifier votre session d'audit.
      </p>
    </motion.div>
  )
}

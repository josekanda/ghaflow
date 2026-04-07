import type { Variants } from "framer-motion"

/** Fade up — the universal reveal */
export const fadeInUp: Variants = {
  hidden:  { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
}

/** Fade in only (no Y movement) */
export const fadeIn: Variants = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6 } },
}

/** Scale + fade */
export const scaleIn: Variants = {
  hidden:  { opacity: 0, scale: 0.92 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
}

/** Slide in from left */
export const slideInLeft: Variants = {
  hidden:  { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
}

/** Slide in from right */
export const slideInRight: Variants = {
  hidden:  { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
}

/** Stagger container — wraps children that use fadeInUp */
export const stagger: Variants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.12 } },
}

/** Fast stagger for dense lists */
export const staggerFast: Variants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.07 } },
}

/** Hover glow lift — use with `whileHover` */
export const hoverLift = {
  y: -4,
  transition: { duration: 0.25, ease: "easeOut" },
}

/** Section reveal config (re-usable useInView options) */
export const inViewOptions = {
  once: true,
  amount: 0.15,
} as const

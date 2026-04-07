import type { Metadata, Viewport } from "next"
import type { ReactNode } from "react"
import { Plus_Jakarta_Sans, DM_Sans } from "next/font/google"
import "./globals.css"

// Display / headings — geometric confidence, not generic
const jakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "600", "700", "800"],
  display: "swap",
})

// Body — humanist, readable, DM Sans ≠ Inter
const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["300", "400", "500"],
  display: "swap",
})

export const metadata: Metadata = {
  title: "Ghaflow — Automatisation Intelligente sur Mesure",
  description:
    "Ghaflow automatise vos processus métier et intègre l'IA sur-mesure. Gagnez 20 à 30 heures par semaine grâce à des agents vocaux, workflows automatisés et intégrations CRM.",
  keywords: [
    "automatisation IA",
    "agents vocaux",
    "workflow automation",
    "CRM integration",
    "no-code",
    "PME",
    "ghaflow",
  ],
  openGraph: {
    title: "Ghaflow — L'intelligence qui libère votre temps",
    description: "Gagnez 2 à 3 heures par jour en automatisant vos tâches répétitives.",
    type: "website",
    locale: "fr_FR",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ghaflow — Automatisation Intelligente",
  },
  robots: { index: true, follow: true },
}

export const viewport: Viewport = {
  themeColor: "#050505",
  colorScheme: "dark",
}

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="fr" className={`${jakartaSans.variable} ${dmSans.variable}`}>
      <body>{children}</body>
    </html>
  )
}

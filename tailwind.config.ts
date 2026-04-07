import type { Config } from "tailwindcss"

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
      screens: { "2xl": "1200px" },
    },
    extend: {
      colors: {
        background: "#050505",
        foreground: "#FFFFFF",
        accent: {
          DEFAULT: "#00F0FF",
          foreground: "#050505",
          dim: "rgba(0, 240, 255, 0.12)",
          glow: "rgba(0, 240, 255, 0.25)",
        },
        muted: {
          DEFAULT: "#A1A1AA",
          foreground: "#71717A",
          subtle:    "#52525B",
        },
        surface: {
          DEFAULT: "#0a0a0a",
          raised:  "#0f0f0f",
        },
        border: {
          DEFAULT: "rgba(255, 255, 255, 0.08)",
          strong:  "rgba(255, 255, 255, 0.14)",
          accent:  "rgba(0, 240, 255, 0.30)",
        },
      },
      fontFamily: {
        sans:    ["var(--font-body)",    "DM Sans",           "system-ui", "sans-serif"],
        display: ["var(--font-display)", "Plus Jakarta Sans", "system-ui", "sans-serif"],
      },
      fontSize: {
        "display-xl": ["clamp(3rem,7vw,5rem)", { lineHeight: "1.0", letterSpacing: "-0.04em", fontWeight: "900" }],
        "display-lg": ["clamp(2rem,5vw,3.5rem)", { lineHeight: "1.05", letterSpacing: "-0.035em", fontWeight: "800" }],
        "display-md": ["clamp(1.5rem,3vw,2.25rem)", { lineHeight: "1.1", letterSpacing: "-0.03em", fontWeight: "800" }],
      },
      boxShadow: {
        "glow-sm": "0 0 20px rgba(0, 240, 255, 0.3)",
        "glow":    "0 0 40px rgba(0, 240, 255, 0.4)",
        "glow-lg": "0 0 80px rgba(0, 240, 255, 0.25)",
        "card":    "0 0 0 0.5px rgba(255,255,255,0.06), 0 24px 60px rgba(0,0,0,0.5)",
        "glass":   "inset 0 0.5px 0 rgba(255,255,255,0.06), 0 0 0 0.5px rgba(255,255,255,0.06)",
      },
      backgroundImage: {
        "grid":             "linear-gradient(rgba(0,240,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,240,255,0.03) 1px, transparent 1px)",
        "gradient-radial":  "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":   "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "shine":            "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.07) 50%, transparent 60%)",
      },
      backgroundSize: {
        "grid": "60px 60px",
      },
      animation: {
        "pulse-dot":    "pulse-dot 2s cubic-bezier(0.4,0,0.6,1) infinite",
        "ticker":       "ticker 35s linear infinite",
        "float":        "float 7s ease-in-out infinite",
        "float-slow":   "float 10s ease-in-out infinite",
        "glow-border":  "glow-border 2s ease-in-out infinite",
        "scan-line":    "scan-line 2s ease-in-out infinite",
      },
      keyframes: {
        "pulse-dot": {
          "0%, 100%": { opacity: "1" },
          "50%":      { opacity: "0.25" },
        },
        ticker: {
          "0%":   { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%":      { transform: "translateY(-10px)" },
        },
        "glow-border": {
          "0%, 100%": { borderColor: "rgba(0, 240, 255, 0.25)" },
          "50%":      { borderColor: "rgba(0, 240, 255, 0.65)" },
        },
        "scan-line": {
          "0%":   { transform: "translateY(-100%)", opacity: "0" },
          "50%":  { opacity: "1" },
          "100%": { transform: "translateY(200%)", opacity: "0" },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}

export default config

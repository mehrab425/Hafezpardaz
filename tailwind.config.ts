import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#171717",
        "background-secondary": "#222222",
        accent: "#C6FF34",
        "accent-dim": "#a8d92b",
        "text-primary": "#FFFFFF",
        "text-secondary": "#A3A3A3",
        "text-muted": "#525252",
        border: "rgba(255,255,255,0.08)",
        "border-accent": "rgba(198,255,52,0.3)",
        glass: "rgba(255,255,255,0.04)",
        "glass-hover": "rgba(255,255,255,0.08)",
      },
      fontFamily: {
        sans: ["var(--font-vazirmatn)", "Vazirmatn", "system-ui", "sans-serif"],
        vazir: ["var(--font-vazirmatn)", "Vazirmatn", "sans-serif"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "hero-gradient": "radial-gradient(ellipse 80% 60% at 50% -20%, rgba(198,255,52,0.15) 0%, transparent 60%)",
        "accent-glow": "radial-gradient(ellipse 60% 40% at 50% 50%, rgba(198,255,52,0.2) 0%, transparent 70%)",
        "card-gradient": "linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)",
        "grid-pattern": "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
      },
      backgroundSize: {
        "grid": "60px 60px",
      },
      boxShadow: {
        "glow-accent": "0 0 40px rgba(198,255,52,0.15), 0 0 80px rgba(198,255,52,0.05)",
        "glow-sm": "0 0 20px rgba(198,255,52,0.1)",
        "glass": "0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.1)",
        "card": "0 4px 24px rgba(0,0,0,0.3), 0 1px 0 rgba(255,255,255,0.05)",
        "card-hover": "0 8px 40px rgba(0,0,0,0.5), 0 1px 0 rgba(198,255,52,0.2)",
        "inner-glow": "inset 0 1px 0 rgba(255,255,255,0.1)",
      },
      animation: {
        "float": "float 6s ease-in-out infinite",
        "float-delayed": "float 6s ease-in-out infinite 2s",
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
        "spin-slow": "spin 20s linear infinite",
        "particle": "particle 8s ease-in-out infinite",
        "grid-move": "grid-move 20s linear infinite",
        "shimmer": "shimmer 2s linear infinite",
        "typewriter": "typewriter 3s steps(40) 1s forwards",
        "blink": "blink 1s step-end infinite",
        "ticker": "ticker 30s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        "pulse-glow": {
          "0%, 100%": { boxShadow: "0 0 20px rgba(198,255,52,0.2)" },
          "50%": { boxShadow: "0 0 40px rgba(198,255,52,0.5), 0 0 80px rgba(198,255,52,0.2)" },
        },
        particle: {
          "0%": { transform: "translateY(100vh) translateX(0) scale(0)", opacity: "0" },
          "10%": { opacity: "1" },
          "90%": { opacity: "0.5" },
          "100%": { transform: "translateY(-100px) translateX(50px) scale(1)", opacity: "0" },
        },
        "grid-move": {
          "0%": { transform: "translateY(0)" },
          "100%": { transform: "translateY(60px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        typewriter: {
          "from": { width: "0" },
          "to": { width: "100%" },
        },
        blink: {
          "from, to": { borderColor: "transparent" },
          "50%": { borderColor: "#C6FF34" },
        },
        ticker: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      transitionDuration: {
        "400": "400ms",
        "600": "600ms",
        "800": "800ms",
      },
      borderRadius: {
        "2xl": "1rem",
        "3xl": "1.5rem",
        "4xl": "2rem",
      },
      spacing: {
        "18": "4.5rem",
        "22": "5.5rem",
        "30": "7.5rem",
      },
    },
  },
  plugins: [],
};

export default config;

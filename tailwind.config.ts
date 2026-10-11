import type { Config } from "tailwindcss";

/**
 * Stone-and-lamplight tokens mapped for Tailwind.
 * Source of truth is CSS variables in app/globals.css.
 */
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        night: {
          950: "var(--night-950)",
          900: "var(--night-900)",
          800: "var(--night-800)",
        },
        soapstone: {
          100: "var(--soapstone-100)",
          200: "var(--soapstone-200)",
          300: "var(--soapstone-300)",
          400: "var(--soapstone-400)",
          500: "var(--soapstone-500)",
        },
        lamp: {
          400: "var(--lamp-400)",
          500: "var(--lamp-500)",
          600: "var(--lamp-600)",
          glow: "var(--lamp-glow)",
        },
        bone: {
          DEFAULT: "var(--bone)",
          muted: "var(--bone-muted)",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        sans: ["var(--font-body)", "sans-serif"],
        kannada: ["var(--font-kannada)", "serif"],
      },
      fontSize: {
        "fluid-h1": "var(--type-h1)",
        "fluid-h2": "var(--type-h2)",
        "fluid-h3": "var(--type-h3)",
        "fluid-h4": "var(--type-h4)",
        "fluid-body": "var(--type-body)",
        "fluid-caption": "var(--type-caption)",
      },
      spacing: {
        "carved-xs": "var(--space-xs)",
        "carved-sm": "var(--space-sm)",
        "carved-md": "var(--space-md)",
        "carved-lg": "var(--space-lg)",
        "carved-xl": "var(--space-xl)",
      },
      borderRadius: {
        chisel: "var(--radius-chisel)",
        "chisel-sm": "var(--radius-chisel-sm)",
      },
      boxShadow: {
        "carved-in": "var(--shadow-carved-in)",
        "carved-out": "var(--shadow-carved-out)",
        lamp: "var(--shadow-lamp)",
      },
      transitionTimingFunction: {
        carved: "var(--ease-carved)",
      },
      transitionDuration: {
        carved: "var(--duration-carved)",
        "carved-slow": "var(--duration-carved-slow)",
      },
    },
  },
};

export default config;

import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#F36F21",
          50: "#FFF4EC",
          100: "#FEE6D3",
          200: "#FCC9A3",
          300: "#FAA96D",
          400: "#F78B44",
          500: "#F36F21",
          600: "#D9560F",
          700: "#B3430C",
          800: "#8C350D",
          900: "#722C0F",
        },
        ink: {
          DEFAULT: "#12141A",
          50: "#F4F5F7",
          100: "#E5E7EB",
          200: "#CBD0D8",
          300: "#9CA5B3",
          400: "#6B7386",
          500: "#4A5162",
          600: "#363B49",
          700: "#262A35",
          800: "#1A1D25",
          900: "#12141A",
          950: "#0B0C10",
        },
      },
      fontFamily: {
        sans: [
          "Inter",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "system-ui",
          "sans-serif",
        ],
      },
      backgroundImage: {
        "brand-gradient": "linear-gradient(135deg, #F36F21 0%, #D9560F 100%)",
        "fade-white-down": "linear-gradient(360deg, #FFFFFF 0%, rgba(255,255,255,0) 100%)",
        "fade-white-up": "linear-gradient(180deg, #FFFFFF 0%, rgba(255,255,255,0) 100%)",
        "sidebar-sheen": "linear-gradient(180deg, rgba(243,111,33,0.14) 0%, rgba(243,111,33,0) 60%)",
      },
      boxShadow: {
        card: "0 1px 2px rgba(18,20,26,0.04), 0 8px 24px -8px rgba(18,20,26,0.10)",
        "card-hover": "0 4px 8px rgba(18,20,26,0.06), 0 16px 32px -12px rgba(18,20,26,0.16)",
        pop: "0 12px 40px -8px rgba(243,111,33,0.35)",
      },
      borderRadius: {
        xl2: "1.25rem",
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(6px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.35s ease-out",
      },
    },
  },
  plugins: [],
};

export default config;

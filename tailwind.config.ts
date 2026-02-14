import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Minimalist gallery aesthetic
        gallery: {
          white: "#FFFFFF",
          gray: {
            light: "#F5F5F5",
            DEFAULT: "#E5E5E5",
            dark: "#CCCCCC",
            darker: "#999999",
          },
          black: {
            light: "#666666",
            DEFAULT: "#333333",
            dark: "#000000",
          },
        },
      },
      boxShadow: {
        "soft": "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
        "soft-lg": "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
        "float": "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
        "cardstock": "5px 5px 0px 0px rgba(0,0,0,0.3)",
        "cardstock-hover": "3px 3px 0px 0px rgba(0,0,0,0.3)",
        "photo": "2px 2px 8px rgba(0,0,0,0.2), 0 0 0 1px rgba(0,0,0,0.1)",
      },
      fontFamily: {
        typewriter: ["Special Elite", "Courier New", "monospace"],
        handwritten: ["var(--font-dancing-script)", "cursive"],
        serif: ["Georgia", "Times New Roman", "serif"],
        sans: ["-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
};
export default config;

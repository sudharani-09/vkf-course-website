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
        "deep-black": "#0E0E0E",
        "charcoal": "#333233",
        "warm-gray": "#575553",
        "taupe": "#8A857F",
        "silver": "#C7C7C7",
        "pure-white": "#FDFDFD",
      },
      fontFamily: {
        cormorant: ["var(--font-cormorant)", "Georgia", "serif"],
        inter: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        "tightest": "-0.04em",
        "tight-xl": "-0.02em",
        "wide-xl": "0.2em",
        "wide-2xl": "0.3em",
      },
      lineHeight: {
        "tight-0": "0.9",
        "tight-1": "0.95",
        "tight-2": "1.0",
      },
    },
  },
  plugins: [],
};
export default config;

import type { Config } from "tailwindcss";
import { mtConfig } from "@material-tailwind/react";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@material-tailwind/react/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        "spotify-green": "#1DB954",
        "spotify-green-hovered": "#0DA944"
      },
    },
  },
  plugins: [],
} satisfies Config;





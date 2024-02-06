import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      container: {
        center: true,

        screens: {
          sm: "100%",
          md: "100%",
          lg: "768px",
          xl: "1024px",
        },

        padding: {
          DEFAULT: "1rem",
          sm: "2rem",
          lg: "4rem",
          xl: "5rem",
        },
      },

      colors: {
        background: "rgba(var(--background))",
        accent: "rgba(var(--accent))",
        foreground: "rgba(var(--foreground))",
        muted: "rgba(var(--muted))",
      },
    },
  },
  plugins: [],
} satisfies Config;

import type { Config } from "tailwindcss";
import { PluginCreator } from "tailwindcss/types/config";

const customUtilities: PluginCreator = ({ addUtilities }) => {
  addUtilities({
    ".border-border": {
      borderColor: "hsl(var(--border))",
    },
    ".bg-background": {
      backgroundColor: "hsl(var(--background))",
    },
    ".text-foreground": {
      color: "hsl(var(--foreground))",
    },
    ".font-body": {
      fontFamily: "var(--font-body)",
    },
    ".font-heading": {
      fontFamily: "var(--font-heading)",
    },
  });
};

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: "hsl(var(--primary))",
        "primary-foreground": "hsl(var(--primary-foreground))",
        secondary: "hsl(var(--secondary))",
        "secondary-foreground": "hsl(var(--secondary-foreground))",
        accent: "hsl(var(--accent))",
        "accent-foreground": "hsl(var(--accent-foreground))",
        destructive: "hsl(var(--destructive))",
        "destructive-foreground": "hsl(var(--destructive-foreground))",
        muted: "hsl(var(--muted))",
        "muted-foreground": "hsl(var(--muted-foreground))",
        card: "hsl(var(--card))",
        "card-foreground": "hsl(var(--card-foreground))",
        popover: "hsl(var(--popover))",
        "popover-foreground": "hsl(var(--popover-foreground))",
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
      },
      borderRadius: {
        DEFAULT: "var(--radius)",
      },
      fontFamily: {
        body: ["YourBodyFontFamily"],
        heading: ["YourHeadingFontFamily"],
      },
    },
  },
  plugins: [customUtilities],
};

export default config;

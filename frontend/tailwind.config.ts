import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        "text-white-op-100": "#fff",
        darkgray: "#9f9f9f",
        black: "#000",
        gainsboro: "#d9d9d9",
        darkolivegreen: {
          "100": "#568153",
          "200": "#376634",
          "300": "rgba(86, 129, 83, 0.48)",
        },
        whitesmoke: "#f8f8f8",
        "layout-preview": "#61b3ff",
        silver: "#aec3ac",
        red: "#ff0000",
        "layout-banner": "#6171ff",
        gray: "#878787",
      },
      spacing: {},
      fontFamily: {
        poppins: "Poppins",
        nunito: "Nunito",
      },
      borderRadius: {
        "8xs": "5px",
        "3xs": "10px",
      },
    },
    fontSize: {
      base: "16px",
      sm: "14px",
      xl: "20px",
      "13xl": "32px",
      "29xl": "48px",
      "17xl": "36px",
      smi: "13px",
      "2xs": "11px",
      "5xl": "24px",
      "23xl": "42px",
      lg: "18px",
      inherit: "inherit",
    },
    screens: {
      lg: {
        max: "1200px",
      },
      md: {
        max: "960px",
      },
      sm: {
        max: "420px",
      },
    },
  },
  corePlugins: {
    preflight: false,
  },
};
export default config;

import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0663EC",
        secondary: "#01CDFF",
        dark: "#0F0F35",
        white: "#FFFFFF",
      },
      // Add a comma here
      // backgroundImage: {
      //   "bg-login": "url('/assets/bg-login.png')",
      //   "img-login": "url('/assets/img-login.png')",
      // },
    },
  },
  daisyui: {
    themes: ["light", "dark", "cupcake"],
  },
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  plugins: [require("daisyui")],
};

export default config;

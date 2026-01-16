/** @type {import('tailwindcss').Config} */

// 匯入顏色配置
import { colors } from "./src/colors/colors";

export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors,
    },
    backgroundImage: {
      coffee_bg: "url('/images/coffee_bg.png')",
      island_bg: "url('/images/island_bg.jpg')",
    },
  },
  plugins: [],
  // Element Plus 與 Tailwind 相容性好，可以啟用 preflight
  corePlugins: {
    preflight: true,
  },
};

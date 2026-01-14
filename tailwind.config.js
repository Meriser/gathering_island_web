/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // 全大寫 DEFAULT 為預設值，使用時 bg-primary 即可
        primary: {
          light: "#F7D6A9",
          DEFAULT: "#C49B5C",
          dark: "#9C7A49"
        },
        secondary: {
          light: "#B9834C",
          DEFAULT: "#925D24",
          dark: "#5E3C23"
        },
        info: {
          light: "#BAA889",    
          DEFAULT: "#8B7355",  
          dark: "#5D4932"      
        },
        success: {
          light: "#80E27E",
          DEFAULT: "#4CAF50",
          dark: "#087F23"
        },
        warning: {
          light: "#FFE082",
          DEFAULT: "#FFC107",
          dark: "#C79100"
        },
        danger: {
          light: "#FF867F",
          DEFAULT: "#FF5252",
          dark: "#C50E29"
        },
        white: {
          light: "#FFFFFF",
          DEFAULT: "#F5F5F5",
          dark: "#CCCCCC"
        },
        black: {
          light: "#484848",
          DEFAULT: "#212121",
          dark: "#000000"
        },
      },
    },
    backgroundImage: {
      'coffee_bg': "url('/images/coffee_bg.png')",
      'island_bg': "url('/images/island_bg.jpg')",
    },
  },
  plugins: [],
  // Element Plus 與 Tailwind 相容性好，可以啟用 preflight
  corePlugins: {
    preflight: true,
  },
};

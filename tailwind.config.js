/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: "#005467", // Teal (الأساسي)
          accent: "#CDDC2D",  // Lime (أساسي ملازم)
          secondary: "#808285",
          secondaryDark: "#414042"
        }
      },
      fontFamily: {
        // الافتراضي لـ font-sans
        sans: ['"Lyon Arabic Display"', '"IBM Plex Sans Arabic"', 'Cairo', '"Noto Sans Arabic"', 'system-ui', 'sans-serif'],
        // نص عربي عام
        arabic: ['"Lyon Arabic Display"', '"IBM Plex Sans Arabic"', 'Cairo', '"Noto Sans Arabic"', 'system-ui', 'sans-serif'],
        // عناوين كبيرة
        display: ['"Lyon Arabic Display"', '"Readex Pro"', '"IBM Plex Sans Arabic"', 'Cairo', 'sans-serif'],
        // للتوافق مع أي استخدام سابق
        inter: ['Inter', '"IBM Plex Sans Arabic"', 'Cairo', 'ui-sans-serif', 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'],
      },
    },
  },
  plugins: [],
}

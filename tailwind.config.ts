import type { Config } from 'tailwindcss'
const config: Config = {
  darkMode: 'class',
  content: ['./pages/**/*.{js,ts,jsx,tsx,mdx}','./components/**/*.{js,ts,jsx,tsx,mdx}','./app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        care: { 50:'#f0fdfa',100:'#ccfbf1',200:'#99f6e4',300:'#5eead4',400:'#2dd4bf',500:'#14b8a6',600:'#0d9488',700:'#0f766e',800:'#115e59',900:'#134e4a',950:'#042f2e' },
        slate: { 50:'#f8fafc',100:'#f1f5f9',200:'#e2e8f0',300:'#cbd5e1',400:'#94a3b8',500:'#64748b',600:'#475569',700:'#334155',800:'#1e293b',900:'#0f172a' },
        amber: { 50:'#fffbeb',100:'#fef3c7',200:'#fde68a',300:'#fcd34d',400:'#fbbf24',500:'#f59e0b',600:'#d97706',700:'#b45309' },
        rose: { 50:'#fff1f2',100:'#ffe4e6',200:'#fecdd3',400:'#fb7185',500:'#f43f5e',600:'#e11d48' },
        emerald: { 50:'#ecfdf5',100:'#d1fae5',400:'#34d399',500:'#10b981',600:'#059669' },
      },
      fontFamily: { sans: ['Inter','system-ui','sans-serif'] },
      keyframes: {
        fadeIn: { '0%': { opacity:'0', transform:'translateY(4px)' }, '100%': { opacity:'1', transform:'translateY(0)' } },
      },
      animation: { fadeIn: 'fadeIn 0.2s ease-out' },
    },
  },
  plugins: [],
}
export default config

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'ss-bg': 'var(--ss-bg)',
        'ss-panel': 'var(--ss-panel)',
        'ss-muted': 'var(--ss-muted)',
        'ss-text': 'var(--ss-text)',
        'ss-subtle': 'var(--ss-subtle)',
        'ss-primary': 'var(--ss-primary)',
        'ss-green': 'var(--ss-green)',
        'ss-red': 'var(--ss-red)',
        'ss-blue': 'var(--ss-blue)',
        'ss-line': 'var(--ss-line)',
      },
      borderRadius: {
        'ss-sm': '8px',
        'ss-md': '12px',
        'ss-lg': '20px',
        'ss-pill': '999px'
      },
      fontFamily: {
        'inter': ['Inter', 'sans-serif'],
        'plex': ['IBM Plex Sans', 'sans-serif'],
        'noto': ['Noto Sans', 'sans-serif']
      },
      boxShadow: {
        'ss-sm': 'var(--shadow-sm)',
        'ss-md': 'var(--shadow-md)',
        'ss-lg': 'var(--shadow-lg)',
        'ss-xl': 'var(--shadow-xl)'
      },
      screens: {
        'tablet': '1024px',
        'desktop': '1440px'
      }
    },
  },
  plugins: [],
}
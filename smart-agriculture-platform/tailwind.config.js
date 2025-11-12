/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#00FFC6',
          fg: '#a5f3fc',
          muted: '#0b1220'
        },
        secondary: '#0A192F',
        accent: '#64FFDA',
        dark: '#0A192F',
        'dark-light': '#112240',
      },
      boxShadow: {
        'card': '0 1px 0 0 rgba(255,255,255,0.06), 0 8px 24px -8px rgba(0,0,0,0.45)',
        'glow': '0 0 10px rgba(0, 255, 198, 0.3), 0 0 20px rgba(0, 255, 198, 0.2)',
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.25rem',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '112': '28rem',
        '128': '32rem',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      animation: {
        'glow': 'glow 2s ease-in-out infinite alternate',
        'float': 'float 3s ease-in-out infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 5px #00FFC6, 0 0 10px #00FFC6, 0 0 15px #00FFC6' },
          '100%': { boxShadow: '0 0 10px #00FFC6, 0 0 20px #00FFC6, 0 0 30px #00FFC6' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
      fontSize: {
        '2xs': '0.625rem',
      },
      lineHeight: {
        '12': '3rem',
      },
      maxWidth: {
        '8xl': '88rem',
        '9xl': '96rem',
      },
    },
  },
  plugins: [],
}

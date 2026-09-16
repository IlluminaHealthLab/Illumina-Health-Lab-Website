/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#071B4D',
          50: '#EEF1F8',
          100: '#D6DCEC',
        },
        coral: {
          DEFAULT: '#F15B61',
          50: '#FEEEEE',
        },
        blush: '#FFF3F0',
        skyblue: '#DDEEF7',
        amber: '#F5A14A',
      },
      fontFamily: {
        serif: ['"Playfair Display"', '"Cormorant Garamond"', 'serif'],
        sans: ['Inter', 'sans-serif'],
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        dash: {
          '0%': { strokeDashoffset: '1000' },
          '100%': { strokeDashoffset: '0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        'pulse-soft': {
          '0%, 100%': { opacity: '0.6', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.06)' },
        },
        'heart-pulse': {
          '0%, 36%, 100%': { transform: 'scale(1)' },
          '8%': { transform: 'scale(1.022)' },
          '16%': { transform: 'scale(1)' },
          '24%': { transform: 'scale(1.012)' },
        },
        'ecg-scroll': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'wave-drift': {
          '0%': { transform: 'translateX(0) translateY(0)' },
          '50%': { transform: 'translateX(-2%) translateY(1%)' },
          '100%': { transform: 'translateX(0) translateY(0)' },
        },
        heartbeat: {
          '0%, 40%, 100%': { transform: 'scale(1)' },
          '8%': { transform: 'scale(1.022)' },
          '16%': { transform: 'scale(1)' },
          '24%': { transform: 'scale(1.013)' },
        },
      },
      animation: {
        marquee: 'marquee 32s linear infinite',
        'fade-up': 'fade-up 0.8s ease-out forwards',
        'fade-in': 'fade-in 1s ease-out forwards',
        dash: 'dash 3.5s ease-in-out infinite',
        float: 'float 6s ease-in-out infinite',
        'pulse-soft': 'pulse-soft 4s ease-in-out infinite',
        'heart-pulse': 'heart-pulse 2.6s ease-in-out infinite',
        'ecg-scroll': 'ecg-scroll 7s linear infinite',
        'wave-drift': 'wave-drift 12s ease-in-out infinite',
        heartbeat: 'heartbeat 2.6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}

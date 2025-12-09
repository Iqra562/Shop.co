/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: { 
      screens: {
        hd: '2560px'
      },
      colors: {

        primary: '#1F1F1F',
        secondary:'#3f5a48',
        paragraphDark: '#333333',
        paragraphLight: '#E5E5E5',
        lightGrayBg: '#F5F5F5',
      },
      backgroundImage: {
        'primary-button-gradient': 'linear-gradient(to right, #2d3d32, #3f5a48, #55795f)',
      },
      keyframes: {
        slideInLeftTechStack: {
          '0%': { transform: 'translateX(50.5rem)' },
          '100%': { transform: 'translateX(0)' },
        },
        slideDown: {
          '0%': { maxHeight: '0', opacity: '0' },
          '100%': { maxHeight: '500px', opacity: '1' },
        },
        slideUp: {
          '0%': { maxHeight: '500px', opacity: '1' },
          '100%': { maxHeight: '0', opacity: '0' },
        },
        slideInLeft: {
          '0%': { transform: 'translateX(-50.5rem)' },
          '100%': { transform: 'translateX(0)' },
        },
        slideOutLeft: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50rem)' },
        },
        fadeInOut: {
          '0%': { opacity: '0', transform: 'scale(0.8)' },
          '50%': { opacity: '1', transform: 'scale(1)' },
          '100%': { opacity: '0', transform: 'scale(0.8)' },
        },
        borderGradient: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },

      },
      animation: {
        slideDown: 'slideDown 0.4s ease forwards',
        slideUp: 'slideUp 0.4s ease forwards',
        slideInLeftTechStack: 'slideInLeftTechStack 0.5s ease-out forwards',
        slideInLeft: 'slideInLeft 0.2s ease-out forwards',
        slideOutLeft: 'slideOutLeft 0.2s ease-in forwards',
        fadeInOut: 'fadeInOut 3s ease-in-out infinite',
        fadeInOutDelay: 'fadeInOut 3s ease-in-out infinite ',
        borderGradient: 'borderGradient 10s linear infinite',


      },
    },
  },
  plugins: [],
}
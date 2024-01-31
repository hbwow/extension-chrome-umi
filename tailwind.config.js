/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  important: ':root',
  theme: {
    extend: {
      colors: {
        bg: {
          100: '#6b6b6b',
          200: '#5e5e5e',
          300: '#525252',
          400: '#454545',
          500: '#383838',
          600: '#2C2C2C',
          700: '#050505',
          800: '#383838',
          900: '#2c2c2c',
          1000: '#050505',
        },
      },
      fontSize: {
        48: ['48px', '56px'],
        40: ['40px', '48px'],
        32: ['32px', '40px'],
        28: ['28px', '36px'],
        24: ['24px', '32px'],
        20: ['20px', '28px'],
        16: ['16px', '24px'],
        14: ['14px', '22px'],
        12: ['12px', '20px'],
        10: ['10px', '18px'],
      },
      width: {
        24: '24px',
        600: '600px',
      },
      height: {
        20: '20px',
        60: '60px',
        420: '420px',
      },
      padding: {
        2: '2px',
        4: '4px',
        12: '12px',
        24: '24px',
        64: '64px',
        120: '120px',
      },
      margin: {
        4: '4px',
        6: '6px',
        12: '12px',
        24: '24px',
      },
      borderRadius: {
        18: '18px',
      },
    },
  },
  plugins: [],
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  important: ':root',
  theme: {
    extend: {
      colors: {
        bg: {
          600: '#2C2C2C',
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
        12: '12px',
        24: '24px',
        180: '180px',
      },
      margin: {
        6: '6px',
      },
    },
  },
  plugins: [],
};

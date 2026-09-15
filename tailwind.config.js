export default {
  content: [
  './index.html',
  './src/**/*.{js,ts,jsx,tsx}'
],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: '#0D1411',
          900: '#0D1411',
          800: '#16211C',
          700: '#223029',
          600: '#3A4A42',
        },
        forest: {
          DEFAULT: '#10382A',
          light: '#1B5240',
          mid: '#2F6B55',
          pale: '#E3EDE8',
        },
        amber: {
          DEFAULT: '#C9821F',
          bright: '#E39B31',
          soft: '#F6E7CE',
        },
        bone: {
          DEFAULT: '#F8F5EF',
          dim: '#EFEAE1',
          line: '#DED7CA',
        },
      },
      fontFamily: {
        display: ['"Instrument Serif"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        tightest: '-0.03em',
      },
      transitionTimingFunction: {
        swift: 'cubic-bezier(0.23, 1, 0.32, 1)',
      },
      maxWidth: {
        shell: '1320px',
      },
    },
  },
  plugins: [],
}

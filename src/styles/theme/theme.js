const THEME = {
  colorScheme: 'light',
  colors: {
    // Add your color
    deepBlue: ['#E9EDFC', '#C1CCF6', '#99ABF0'],
    // or replace default theme color
    darkBlack: ['#222222'],
    accentGray: ['#DDDDDD'],
    reddy: 'red'
  },

  shadows: {
    md: '1px 1px 3px rgba(0, 0, 0, .25)',
    xl: '5px 5px 3px rgba(0, 0, 0, .25)'
  },

  fontFamily: 'Inter, sans-serif',

  headings: {
    fontFamily: 'Libre Baskerville, serif',
    sizes: {
      h1: { fontSize: '32px' }
    }
  },
  breakpoints: {
    xs: '320px',
    sm: '576px',
    md: '768px',
    lg: '992px',
    xl: '1200px'
  },
  fontSizes: {
    xs: '12px',
    sm: '14px',
    md: '16px',
    lg: '20px',
    xl: '24px',
    '2xl': '32px',
    '3xl': '36px'
  },
  globalStyles: (theme) => ({
    '*, *::before, *::after': {
      boxSizing: 'border-box'
    },
    body: {
      'font-family': theme.fontFamily
    },
    a: {
      color: 'unset'
    }
  })
}

export default THEME

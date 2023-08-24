const THEME = {
  colorScheme: 'light',
  colors: {
    // Add your color
    deepBlue: ['#E9EDFC', '#C1CCF6', '#99ABF0'],
    // or replace default theme color
    darkBlack: ['#222222'],
    gray: ['#727272'],
    darkGray: ['#444444'],
    accentGray: ['#DDDDDD'],
    purple: ['#513DFF'],
    lightPurple: ['#EFEEFF'],
    darkPurple: '#4A148C',
    gold: '#FFC200'
  },

  shadows: {
    md: '1px 1px 3px rgba(0, 0, 0, .25)',
    xl: '5px 5px 3px rgba(0, 0, 0, .25)'
  },

  fontFamily: 'Inter, sans-serif',

  headings: {
    fontFamily: 'Libre Baskerville, serif',
    sizes: {
      h1: { fontSize: '32px' },
      h2: { fontSize: '28px' },
      h3: { fontSize: '24px' },
      h4: { fontSize: '20px' }
    }
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
  components: {
    Container: {
      defaultProps: {
        sizes: {
          xs: 540,
          sm: 720,
          md: 960,
          lg: 1140,
          xl: 1320
        }
      }
    },
    MultiSelect: {
      styles: (theme, params) => ({
        input: {
          borderColor: theme.colors.gray[0],
          fontSize: theme.fontSizes.md,
          padding: '9px 16px',
          borderRadius: '12px',
          lineHeight: 1,
          height: 'unset',
          border: `1px solid ${theme.colors.accentGray[0]}`,
          '&:focus-within': {
            border: `1px solid ${theme.colors.darkBlack}`
          }
        },
        label: {
          fontSize: '16px',
          marginBottom: '8px',
          color: theme.colors.darkBlack[0]
        },
        searchInput: {
          fontSize: '16px'
        },
        defaultValueRemove: {
          color: theme.colors.accentGray[0]
        },
        error: {
          textAlign: 'center'
        }
      })
    },
    Select: {
      styles: (theme) => ({
        input: {
          borderColor: theme.colors.gray[0],
          fontSize: theme.fontSizes.md,
          padding: '16px',
          borderRadius: '12px',
          lineHeight: 1,
          height: 'unset',
          border: `1px solid ${theme.colors.accentGray[0]}`,
          '&:focus-within': {
            border: `1px solid ${theme.colors.darkBlack}`
          }
        },
        label: {
          fontSize: '16px',
          marginBottom: '8px',
          color: theme.colors.darkBlack[0]
        },
        error: {
          textAlign: 'center'
        }
      })
    },
    TextInput: {
      styles: (theme, params) => ({
        input: {
          fontSize: theme.fontSizes.md,
          padding: '16px',
          borderRadius: '12px',
          lineHeight: 1,
          height: 'unset',
          border: `1px solid ${theme.colors.accentGray[0]}`,
          '&:focus': {
            border: `2px solid ${theme.colors.darkBlack[0]}`
          },
          '&[data-invalid=true]:focus': {
            borderColor: 'unset'
          }
        },
        label: {
          fontSize: theme.fontSizes.md,
          marginBottom: '8px'
        },
        error: {
          textAlign: 'center'
        }
      })
    },
    Tabs: {
      styles: (theme, params) => ({
        tab: {
          minWidth: '250px',
          borderBottom: `4px solid ${theme.colors.lightPurple[0]}`,
          fontSize: '16px',
          '&:hover': {
            backgroundColor: 'unset',
            borderColor: theme.colors.lightPurple[0]
          },
          //apply styles for active tab
          '&[aria-selected=true]': {
            borderColor: theme.colors.purple[0],
            fontWeight: 600
          },
          '&[aria-selected=true]:hover': {
            borderColor: theme.colors.purple[0]
          }
        }
      })
    },
    Checkbox: {
      styles: (theme) => ({
        input: {
          border: '1px solid gray'
        }
      })
    },
    CloseButton: {
      styles: (theme) => ({
        root: {
          color: theme.colors.darkBlack[0],
          size: '24px',
          '&:hover': {
            color: theme.colors.darkBlack[0],
            backgroundColor: `${theme.colors.lightPurple[0]} !important`,
            borderRadius: '50%'
          },
          '&:focus-visible': {
            outline: 'none'
          },
          svg: {
            width: '24px !important',
            height: '24px !important'
          }
        }
      })
    },
    Switch: {
      styles: (theme) => ({
        input: {
          //checked
          '&:checked + .mantine-Switch-track': {
            backgroundColor: theme.colors.lightPurple[0],
            border: `1px solid transparent`
          }
        },
        track: {
          backgroundColor: 'none',
          border: `1px solid ${theme.colors.gray[0]}`
        },
        thumb: {
          backgroundColor: theme.colors.darkPurple
        }
      })
    },
    DatePicker: {
      styles: (theme) => ({
        //day disabled
        day: {
          '&:disabled': {
            color: theme.colors.accentGray[0]
          },
          '&:hover': {
            backgroundColor: theme.colors.lightPurple[0]
          },
          //data-selected
          '&[data-selected=true]': {
            backgroundColor: theme.colors.purple[0]
          },
          //data-selected hover
          '&[data-selected=true]:hover': {
            backgroundColor: theme.colors.purple[0]
          }
        },
        calendarHeaderControl: {
          '&:hover': {
            backgroundColor: theme.colors.lightPurple[0]
          }
        }
      })
    }
  },
  globalStyles: (theme) => ({
    '*, *::before, *::after': {
      boxSizing: 'border-box'
    },
    body: {
      fontFamily: theme.fontFamily
    },
    a: {
      color: 'unset'
    }
  })
}

export default THEME

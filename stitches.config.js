import { createStitches } from '@stitches/react'
import { breakpoints } from '@lib/breakpoints'

export const transitions = {
  in: `cubic-bezier(0.32, 0, 0.67, 0)`,
  out: `cubic-bezier(0.33, 1, 0.68, 1)`,
  inOut: `cubic-bezier(0.65, 0, 0.35, 1)`,
}

const fontFamilies = {
  ttHovesRegular: 'TTHoves, Helvetica Neue, sans-serif',
  abel: 'Abel, Helvetica Neue, sans-serif',
  chronical: 'Chronicle, Times, serif'
}

export const { styled, getCssText, globalCss } = createStitches({
  media: {
    sm: `(max-width: ${breakpoints.sm}px)`,
    md: `(max-width: ${breakpoints.md}px)`,
    lg: `(max-width: ${breakpoints.lg}px)`,
  },
  theme: {
    colors: {
      ltGrey: '#f7f7f7',
      black: '#000000',
      black5: '#e3e3e3',
      black10: '#cccccc',
      black50: '#999999',
      black70: '#666666',
      white: '#ffffff',
      red: '#ff0000',
      primary: '$black',
      primary5: '$black5',
      primary10: '$black10',
      primary50: '$black50',
      primary70: '$black70',
      background: '$white',
    },
    space: {
      smallMargin: '1rem',
      margin: '2rem',
      dmargin: '4rem',
      tmargin: '4rem',
      header: '12rem',
    },
    fonts: {
      display:
        '-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif',
      body: 'SFMono-Regular, Consolas, Liberation Mono, Menlo, monospace',
    },
    fontSizes: {
      mast: '3.75rem',
      body: '1.5rem',
      heading: '2.25rem',
      caption: '1.75rem',
      navigation: '1.75rem',
      small: '1.25rem',
    },
    lineHeights: {
      body: 1.6,
      display: 1.2,
    },
    transitions,
    shadows: {
      slight: '0 0 15px rgba(0,0,0,0.12)',
      heavy: '0 17px 20px rgba(0,0,0,0.40)',
    },
  },
})

export const globalStyles = globalCss({
  '@font-face': [
    {
      fontFamily: 'TTHoves',
      src: 'url(/fonts/TT-Hoves-Medium.otf)'
    },
    {
      fontFamily: 'Chronicle',
      src: 'url(/fonts/ChronicleDisp-Roman.otf)'
    }
  ],
  '*': {
    margin: 0,
    padding: 0,
    font: 'inherit',
    appearance: 'none',
    boxSizing: 'border-box',
    background: 'none',
    border: 'none',
    outline: 'none',
    color: 'inherit',
    textDecoration: 'none',
    '-webkit-overflow-scrolling': 'touch',
  },
  footer: {
    position: 'fixed',
    bottom: 0,
    zIndex: 100,
    overflow: 'visible',
  },
  header: {
    minHeight: '$space$header',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '$smallMargin $margin calc($margin / 1.5)',
    width: '100%',
    zIndex: 500,
    position: 'sticky',
    top: 0,
    backgroundColor: '$black5',
    '@md': {
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'center',
      padding: '$smallMargin',
      position: 'relative',
    }
  },
  main: {
    position: 'relative',
    zIndex: 0,
    width: '100%',
  },
  html: {
    fontSize: '12px',
    background: '$background',
    fontFamily: '$display',
  },
  body: {
    fontSize: '$body',
    lineHeight: '$body',
    color: '$primary',
    padding: '0',
    margin: '0',
  },
  em: {
    fontStyle: 'italic',
  },
  strong: {
    fontWeight: '600',
  },
  hr: {
    borderTop: '1px solid $black',
    opacity: .1,
    margin: '$smallMargin auto',
    width: '100%',
    position: 'relative',
    '@sm': {
      margin: 'calc($smallMargin / 1.5) auto',
    }
  },
  '.small-link': {
    fontSize: '$small',
    textTransform: 'uppercase',
    textDecoration: 'underline'
  },
  '.backdrop': {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    display: 'flex',
    zIndex: 2000,
    backdropFilter: 'blur(5px)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    overflowY: 'scroll',
    padding: '$smallMargin',
    '@sm': {
      paddingBottom: '$smallMargin',
    }
  },
  '.code-wrapper': {
    textAlign: 'start',
    borderRadius: '5px',
    padding: '12px',
    backgroundColor: '#f3f3f3',
    overflowX: 'scroll',
    'code': {
      fontSize: '12px',
      fontFamily: 'SFMono-Regular, Consolas, Liberation Mono, Menlo, monospace',
      lineHeight: 1.25,
      backgroundColor: '#f3f3f3',
    }
  }
})

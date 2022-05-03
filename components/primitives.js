import { useCallback, useState } from 'react'
import { styled } from '../stitches.config'

const baseSection = {
  width: '100%',
  margin: '0 auto',
  display: 'flex',
  flexDirection: 'column',
  gap: '$margin',
}

export const Box = styled('div', {
  dl: {
    display: 'grid',
    gridTemplateColumns: '1fr 2fr',
    columnGap: '2rem',
  },
  'dt, dd': {
    margin: 0,
    padding: 0
  },
  'article': {
    'h1': {
      fontSize: '$mast',
      textTransform: 'uppercase',
      margin: 0,
      'margin-block-start': 0,
      'margin-block-end': 0,
      lineHeight: '1',
    },
    'h2': {
      fontSize: '$heading',
      textTransform: 'uppercase',
      paddingBottom: 'calc($margin / 2)',
    },
    'h3': {
      fontSize: '$heading',
      paddingBottom: 'calc($margin / 4)',
    },
    'p': {
      paddingBottom: '$margin',
      fontFamily: '$body',
      '&:last-of-type': {
        paddingBottom: 0,
      }
    }
  },
  variants: {
    flexColumn: {
      true: {
        display: 'flex',
        flexDirection: 'column',
        gap: '$margin',
      }
    },
    tokenGrid: {
      true: {
        backgroundColor: '$white',
        columnGap: '$dmargin',
        rowGap: '$dmargin',
        borderBottom: '1px dashed $background',
        display: 'grid',
        gridTemplateColumns: '500px 1fr',
        padding: '$margin $margin calc($header * 1.5)',
        margin: '0 auto',
        maxWidth: 1400,
        '@lg': {
          gridTemplateColumns: '2fr 3fr',
        },
        '@sm': {
          display: 'flex',
          flexDirection: 'column-reverse',
        },
        '&:last-of-type': {
          borderBottom: 0,
        },
        figure: {
          width: '100%',
          maxWidth: 900
        }
      }
    },
    sectionLarge: {
      true: {
        ...baseSection,
        width: '75%',
        maxWidth: 1400,
        padding: '$margin',
        '@md': {
          width: '100%',
          padding: '$smallMargin',
        }
      }
    },
    sectionSmall: {
      true: {
        ...baseSection,
        maxWidth: 960,
        padding: '$margin $margin calc($header * 1.5)',
      }
    }
  }
})

export const HR = styled('hr')

export const Span = styled('span')

export const Text = styled('p', {
  a: {
    textUnderlineOffset: '0.1em',
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'none',
    },
  },
  variants: {
    center: {
      true: {
        textAlign: 'center',
      },
    },
    error: {
      true: {
        color: '$red',
        fontSize: '$small',
      },
    },
  },
})

const BaseFigure = styled('figure')

export const Figure = ({ src, alt, caption, css, image, ...props }) => {
  return (
    <BaseFigure
      {...props}
      css={{
        ...css,
        margin: 0,
        figcaption: {
          fontSize: '$caption',
          marginTop: '0.5rem',
          textAlign: 'center',
        },
      }}
    >
      <Box css={{
        aspectRatio: '1 / 1',
        position: 'relative',
        img: {
          display: 'block',
          width: '100%',
          height: '100%',
          objectFit: 'cover',
        },
      }}>
        {image || <img src={src} alt={alt} />}
      </Box>
        {caption && <figcaption>{caption}</figcaption>}
    </BaseFigure>
  )
}

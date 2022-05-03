import { styled } from 'stitches.config'
import { Box } from '@components/primitives'

const closeIcon = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='64' height='64' viewBox='0 0 64 64'%3E%3Cg stroke-linecap='square' stroke-linejoin='miter' stroke-width='2' fill='none' stroke='%23000000' stroke-miterlimit='10'%3E%3Cline x1='51.092' y1='12.908' x2='12.908' y2='51.092'%3E%3C/line%3E%3Cline x1='51.092' y1='51.092' x2='12.908' y2='12.908'%3E%3C/line%3E%3C/g%3E%3C/svg%3E")`
const closeIconWhite = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='64' height='64' viewBox='0 0 64 64'%3E%3Cg stroke-linecap='square' stroke-linejoin='miter' stroke-width='2' fill='none' stroke='%23FFFFFF' stroke-miterlimit='10'%3E%3Cline x1='51.092' y1='12.908' x2='12.908' y2='51.092'%3E%3C/line%3E%3Cline x1='51.092' y1='51.092' x2='12.908' y2='12.908'%3E%3C/line%3E%3C/g%3E%3C/svg%3E")`

export const linkStyle = {
  padding: 0,
  color: '$primary',
  background: 'transparent',
  textDecoration: 'none',
  position: 'relative',
  border: 0,
  borderRadius: 0,
  fontSize: '$navigation',
}

const closeButton = {
  padding: 0,
  width: 50,
  height: 50,
  backgroundSize: '80%',
  backgroundPosition: 'center',
  borderRadius: 0,
  backgroundColor: 'transparent',
  transition: 'opacity 250ms $inOut',
  '@media(hover:hover)': {
    '&:hover': {
      opacity: '0.9',
      backgroundColor: 'transparent',
    },
  },
}

export const ButtonSet = ({ css, children }) => {
  return (
    <Box
      css={{
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: '$smallMargin',
        width: '100%',
        ...css,
      }}
    >
      {children}
    </Box>
  )
}

export const Button = ({ css, children, ...props }) => {
  return (
    <BaseButton
      {...props}
      css={{
        ...css,
      }}
    >
      <span>{children}</span>
    </BaseButton>
  )
}

const BaseButton = styled('button', {
  backgroundColor: '$white',
  color: '$black',
  cursor: 'pointer',
  padding: '0.5rem 1rem',
  fontSize: '$small',
  margin: 0,
  '@media(hover:hover)': {
    '&:hover': {
      color: '$primary',
      backgroundColor: '$primary10',
    },
  },
  variants: {
    pill: {
      true: {
        padding: '.78rem 1.5rem .75rem',
        borderRadius: 300,
        boxShadow: '$slight',
        backgroundColor: '$white',
        textTransform: 'uppercase',
        '@md': {
          padding: '0.5rem 1rem',
        },
      }
    },
    pillLarge: {
      true: {
        padding: '1rem 1.5rem 1rem',
        borderRadius: 300,
        boxShadow: '$slight',
        fontSize: '$navigation',
        backgroundColor: '$white',
        textTransform: 'uppercase',
        '@md': {
          padding: '0.5rem 1rem',
        },
      }
    },
    disabled: {
      true: {
        pointerEvents: 'none',
        opacity: '0.6',
        background: '$primary50',
        color: '$primary70',
      },
    },
    close: {
      true: {
        backgroundImage: closeIcon,
        ...closeButton,
      },
    },
    closeWhite: {
      true: {
        backgroundImage: closeIconWhite,
        ...closeButton,
      }
    },
    text: {
      true: {
        backgroundColor: 'transparent',
        fontSize: '$small',
        padding: 0,
        lineHeight: 1,
        display: 'inline-flex',
        '@media(hover:hover)': {
          '&:hover': {
            color: '$primary',
            backgroundColor: 'transparent',
            opacity: 0.8,
          },
        },
      }
    },
    link: {
      true: {
        ...linkStyle,
      },
    },
  },
})

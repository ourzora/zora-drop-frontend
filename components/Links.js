import { Box } from './primitives'
import { linkStyle } from './Button'
import { LINKS, NFT_LINKS } from '@lib/content'
import { useDrops } from '@drops'

export function Links() {
  const { isSaleActive } = useDrops()
  return (
    <Box
      css={{
        display: 'flex',
        gap: '$smallMargin',
        fontSize: '$small',
        textTransform: 'uppercase',
        '@sm': {
          flexDirection: 'column',
          gap: 0,
        },
      }}
    >
      {LINKS.map((link) => (
        <a
          key={link.url}
          css={{ ...linkStyle }}
          href={link.url}
          target="_blank"
          rel="noreferrer"
        >
          {link.title}
        </a>
      ))}
      {NFT_LINKS.map((link) => (
        <a
          key={link.url}
          css={{ ...linkStyle }}
          href={link.url}
          target="_blank"
          rel="noreferrer"
        >
          {link.title}
        </a>
      ))}
    </Box>
  )
}

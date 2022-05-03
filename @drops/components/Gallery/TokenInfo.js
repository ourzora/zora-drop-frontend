import { Box } from '@components/primitives'

export function TokenInfo({ index, tokens }) {
  if (index === null) return null
  return (
    <Box
      css={{
        position: 'absolute',
        top: '6rem',
        left: '0',
        padding: '4rem',
        paddingTop: '0',
        textAlign: 'left',
        zIndex: 3,
      }}
    >
      <Box css={{ marginBottom: 0 }}>
        <dl>
          {tokens[index].attributes.map((t) => (
            <>
              <dt>{t['trait_type']}</dt>
              <dd>{t['value']}</dd>
            </>
          ))}
        </dl>
      </Box>
    </Box>
  )
}

import { Box } from '@components/primitives'
import { ipfsImage } from '@lib/helpers'
import { TokenLinks } from './TokenLinks'
import { DropComponents } from '@drops'

export function Token({ metadata }) {
  const { name, tokenId, image, attributes = [] } = metadata

  return (
    <>
      <Box
        css={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Box>
          <Box css={{ display: 'grid', gridTemplateColumns: '10em 1fr' }}>
            <Box>ID:</Box>
            <Box>{tokenId}</Box>
          </Box>
          <Box css={{ display: 'grid', gridTemplateColumns: '10em 1fr' }}>
            <Box>Name:</Box>
            <Box>{name}</Box>
          </Box>
          <br />
          <Box>
            {attributes.map(({ trait_type, value }) => (
              <Box
                css={{ display: 'grid', gridTemplateColumns: '10em 1fr' }}
                key={trait_type}
              >
                <Box>{trait_type}:</Box>
                <Box>{value}</Box>
              </Box>
            ))}
          </Box>
          <br />
          <br />
          <TokenLinks tokenId={tokenId} />
        </Box>
      </Box>
      <Box
        css={{
          display: 'flex',
          width: '100%',
        }}
      >
        <DropComponents.GalleryThumbnail
          src={ipfsImage(image)}
        />
      </Box>
    </>
  )
}

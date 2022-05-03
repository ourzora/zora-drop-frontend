import { useDrops } from '@drops'
import { Box, Text } from '@components/primitives'
import { ButtonSet, Button } from '@components/Button'

export function SoldOut() {
  const { constants, isSoldOut } = useDrops()

  if (isSoldOut) {
    return (
      <Box>
        <Text css={{ marginBottom: '0' }}>Sold out!</Text>
        <Text>
          But you can still pick up a piece on the secondary market at
          <br />
          <ButtonSet>
            <Button>
              <a
                target="_blank"
                rel="noreferrer"
                href={`https://zora.co/collections/${constants.contractAddress}`}
              >
                Zora
              </a>
            </Button>
          </ButtonSet>
        </Text>
      </Box>
    )
  } else {
    return null
  }
}

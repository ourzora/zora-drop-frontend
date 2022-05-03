import { Text, Box } from '@components/primitives'
import { NavLink } from '@components/utils/NavLink'
import { useState, useContext } from 'react'
import { useScrollPosition } from '@n8tb1t/use-scroll-position'
import { APP_TITLE } from '@lib/env-vars'
import { Button } from '@components/Button'
import { LayoutContext } from '@context/layoutContext'
import { ConnectWalletSimple } from '@drops/components/ConnectWalletSimple'

export function Header() {
  const [hideOnScroll, setHideOnScroll] = useState(true)
  const { toggleAbout } = useContext(LayoutContext)

  useScrollPosition(
    ({ prevPos, currPos }) => {
      const isShow = currPos.y > prevPos.y
      if (isShow !== hideOnScroll) setHideOnScroll(isShow)
    },
    [hideOnScroll],
    false,
    false,
    300
  )

  return (
    <Box as="header">
      <Box css={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        gap: 5,
        '@md': {
          alignItems: 'center',
          gap: '$smallMargin',
          textAlign: 'center',
        }
      }}>
        <NavLink href="/" passHref>
          <Text
            as="a"
            css={{
              fontSize: '$mast',
              lineHeight: 1.1,
              '@md': {
                fontSize: '$navigation',
              },
            }}
          >
            {APP_TITLE}
          </Text>
        </NavLink>
        <Button text onClick={toggleAbout} css={{fontSize: '$body'}}>
          About
        </Button>
      </Box>
      <ConnectWalletSimple />
    </Box>
  )
}

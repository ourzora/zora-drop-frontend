import { useState } from "react"
import { Box } from "@components/primitives"
import { PoweredByZora } from "@components/zora/PoweredByZora"
import { useScrollPosition } from '@n8tb1t/use-scroll-position'

export function Footer() {
  const [hideOnScroll, setHideOnScroll] = useState(true)
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
    <Box
      as="footer"
      className={sceneScrolled || !hideOnScroll ? 'scrolled' : ''}
      css={{
        transition: 'all 250ms $inOut',
        '@md': {
          '&.scrolled': {
            opacity: 0,
            pointerEvents: 'none',
          }
        }
      }}
    >
      <PoweredByZora
        css={{
          position: 'fixed',
          bottom: '$margin',
          left: '$margin',
          fontSize: '$small',
          '@md': {
            left: '$smallMargin',
            bottom: 'calc($smallMargin + 3px)',
          },
        }}
      />
    </Box>
  )
}
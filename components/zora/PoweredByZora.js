import { useCallback, useState, useMemo } from "react";
import { Box, Text } from "../primitives";
import { Zorb } from "./Zorb";
import { useWindowWidth } from "@hooks/useWindowWidth";

export function PoweredByZora({css, showText = false, ...props}) {
  const [isHovered, setIsHovered] = useState(showText ? true : false)

  const hoverHandler = useCallback((state) => {
    if (!showText) {
      setIsHovered(state)
    } else {
      setIsHovered(true)
    }
  }, [isHovered])
  
  const { isLarge, isMedium } = useWindowWidth()
  const zorbSize = useMemo(() => {
    return isLarge ? 35 : 30
  }, [isLarge])

  return (
    <Box
      {...props}
      as="a"
      href="https://zora.co"
      target="_blank"
      rel="noreferrer"
      css={{
        display: 'flex',
        height: zorbSize,
        width: zorbSize,
        zIndex: 1000,
        position: 'relative',
        ...css
      }}
      onMouseEnter={() => hoverHandler(true)}
      onMouseLeave={() => hoverHandler(false)}
    >
      <Box css={{position: 'absolute'}}>
        <Zorb />
      </Box>
      <Text
        as="span"
        css={{
          position: 'absolute',
          top: 6,
          left: 30,
          fontSize: '$small',
          pointerEvents: 'none',
          width: 120,
          transition: 'all 350ms $inOut',
          willChange: 'all',
          opacity: `${isHovered && isMedium ? '1' : '0'}`,
          transform: `translateX(${isHovered ? '12px' : '7px'})`
        }}
      >
        Powered by Zora
      </Text>
    </Box>
  )
}
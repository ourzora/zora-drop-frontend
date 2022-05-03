import { useRouter } from 'next/router'
import { useContext } from 'react'
import { Box, Text } from '@components/primitives'
import { Button } from '@components/Button'
import { LayoutContext } from '@context/layoutContext'
import Link from 'next/link'
import { Links } from '@components/Links'
import { PoweredByZora } from "@components/zora/PoweredByZora"

export function PopoutWrapper({
  children,
  visibleState,
  toggleFunction,
  ...props
}) {
  const { closePopout } = useContext(LayoutContext)
  const { pathname } = useRouter()

  return (
    <Box
      id={props.id}
      as="aside"
      css={{
        width: '100%',
        maxWidth: '65rem',
        backgroundColor: '$white',
        position: 'fixed',
        zIndex: 3000,
        top: 0,
        left: 0,
        boxShadow: '0 0 10px rgba(0,0,0,.5)',
        height: '100vh',
        overflowY: 'scroll',
        transform: `translateX(${visibleState ? 0 : '-100rem'})`,
        transition: 'transform 250ms $inOut',
        willChange: 'transform',
      }}
    >
      <Box css={{
        position: 'sticky',
        top: 0,
        right: 0,
        zIndex: 10,
        display: 'flex',
        justifyContent: 'flex-end',
      }}>
        <Button
          close
          onClick={toggleFunction}
        />
      </Box>
      <Box css={{
        padding: '0 $margin calc($header / 2)',
        position: 'relative',
        '@sm': {
          '&:after': {
            content: '',
            position: 'relative',
            paddingBottom: '$header',
            display: 'block',
          }
        }
      }}>
        {children}
        <Box css={{
          display: 'flex',
          flexDirection: 'column'
        }}>
          <Box as="hr" css={{borderTop: '1px solid $black50', opacity: 0.5}}/>
          <Links />
          <Box as="hr" css={{borderTop: '1px solid $black50', opacity: 0.5}}/>
          <PoweredByZora
            showText
            css={{
              marginTop: '$smallMargin',
              marginBottom: '$smallMargin',
            }}
          />
        </Box>
        <Box as="hr" css={{borderTop: '1px solid $black50', opacity: 0.5}}/>
        <Box css={{
          display: 'flex',
          justifyContent: `${pathname !== '/' ? 'space-between' : 'flex-end'}`,
        }}>
          {pathname !== '/' &&
            <Link href="/" passHref>
              <Text
                as="a"
                className="small-link"
                onClick={closePopout}
              >
                Mint Page
              </Text>
            </Link>
          }
          <Link href="/ownership-license" passHref>
            <Text
              as="a"
              className="small-link"
              onClick={closePopout}
            >
              Ownership License
            </Text>
          </Link>
        </Box>
      </Box>
    </Box>
  )
}

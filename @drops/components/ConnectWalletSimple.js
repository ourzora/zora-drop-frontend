import { useState, useEffect } from 'react'
import { useConnect, useAccount } from 'wagmi'
import { Button } from '@components/Button'
import { Box, Text } from '@components/primitives'
import { trimAddress } from "@lib/trimAddress"

export const useIsMounted = () => {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  return mounted
}

export const ConnectWalletSimple = ({addressAndEns = false}) => {
  const isMounted = useIsMounted()
  
  const [{ data, error }, connect] = useConnect()
  const [{ data: accountData }, disconnect] = useAccount({
    fetchEns: true,
  })

  useEffect(() => {
    if(error) console.error(error)
  }, [error])

  return (
    <Box css={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-start',
      height: 45,
      padding: '0 2rem',
      borderRadius: 300,
      backgroundColor: '$white',
      boxShadow: '$slight',
      '*': {
        fontSize: '$small'
      },
      '@md': {
        boxShadow: 'none',
        backgroundColor: 'transparent',
        padding: 0,
        flexDirection: 'column',
        alignItems: 'center',
        gap: 5,
        height: 'auto',
        borderRadius: 0,
        paddingTop: '$smallMargin'
      },
    }}>
      {accountData
        ? <Box css={{display: 'flex'}}>
            <Text css={{
              paddingRight: 5,
              display: 'flex',
              alignItems: 'center',
              lineHeight: 1,
              '&:after': {
                content: '/',
                paddingLeft: 3,
              }
            }}>
              {accountData.ens?.avatar && (
                <img src={accountData.ens?.avatar} alt="ENS Avatar" />
              )}
              <span>
                {accountData.ens?.name
                  ? `
                      ${accountData.ens?.name}
                      ${addressAndEns ? ` / ${trimAddress(accountData.address)}` : ''}
                    `
                : trimAddress(accountData.address)}
              </span>
            </Text>
            <Button
              text
              onClick={disconnect}
              css={{
                'span': {
                  display: 'flex',
                  '@sm': {
                    textDecoration: 'underline'
                  }
                }
              }}
            >
              <div>Disconnect</div>
              <Box css={{
                display: 'block',
                '@sm': {
                  display: 'none'
                }
              }}>&nbsp;from {accountData.connector.name}</Box>
            </Button>
          </Box>
        : <>
            <Text css={{marginRight: 5}}>Connect:</Text>
            {data.connectors.map((x) => (
              <Box
                key={x.id}
                css={{
                  fontSize: '$small',
                  '&:after': {
                    content: '/',
                    paddingLeft: 3,
                    paddingRight: 3,
                  },
                  '&:last-of-type:after': {
                    content: '',
                  },
                  '@md': {
                    'span': {
                      textDecoration: 'underline',
                      textAlign: 'center'
                    },
                    '&:after': {
                      content: '',
                      padding: 0,
                    }
                  }
                }}
              >
              <Button
                disabled={isMounted ? !x.ready : false}
                onClick={() => connect(x)}
                text
              >
                {isMounted ? x.name : x.id === 'injected' ? x.id : x.name}
                {isMounted ? !x.ready && ' (unsupported)' : ''}
              </Button>
            </Box>
          ))}
          {error &&
            <div>{error?.message ?? 'Failed to connect'}</div>
          }
        </>
      } 
    </Box>
  )
}

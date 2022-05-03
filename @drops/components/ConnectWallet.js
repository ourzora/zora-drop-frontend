import { useState, useEffect } from 'react'
import { useConnect, useAccount } from 'wagmi'
import { Button, ButtonSet } from '@components/Button'
import { Box } from '@components/primitives'
import { trimAddress } from "@lib/trimAddress"

export const useIsMounted = () => {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  return mounted
}

export const ConnectWallet = ({addressAndEns = false}) => {
  const isMounted = useIsMounted()
  const [{ data, error }, connect] = useConnect()
  const [{ data: accountData }, disconnect] = useAccount({
    fetchEns: true,
  })

  if (accountData) {
    return (
      <Box css={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: '$smallMargin',
        alignItems: 'center',
      }}>
        {accountData.ens?.avatar && (
          <img src={accountData.ens?.avatar} alt="ENS Avatar" />
        )}
        <Box>
          {accountData.ens?.name
            ? `
                ${accountData.ens?.name}
                ${addressAndEns ? ` / ${trimAddress(accountData.address)}` : ''}
              `
            : trimAddress(accountData.address)}
        </Box>
        <Button pill onClick={disconnect}>
          Disconnect from {accountData.connector.name}
        </Button>
      </Box>
    )
  }

  return (
    <Box css={{
      display: 'flex',
      flexDirection: 'column',
      gap: '$smallMargin',
      alignItems: 'flex-start',
    }}>
      <ButtonSet>
        {data.connectors.map((x) => (
          <Button
            disabled={isMounted ? !x.ready : false}
            key={x.id}
            onClick={() => connect(x)}
            pill
          >
            {isMounted ? x.name : x.id === 'injected' ? x.id : x.name}
            {isMounted ? !x.ready && ' (unsupported)' : ''}
          </Button>
        ))}
      </ButtonSet>
      {error && <div>{error?.message ?? 'Failed to connect'}</div>}
    </Box>
  )
}

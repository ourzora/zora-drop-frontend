import App from 'next/app'
import { chains } from '@lib/chains'
import { chainId, title } from '@lib/constants'

import { providers } from 'ethers'
import { Provider } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'
import { WalletLinkConnector } from 'wagmi/connectors/walletLink'
import { SWRConfig } from 'swr'

/* Compositions */
import { Header } from '@compositions/Header'
import { Footer } from 'compositions/Footer'
import { AboutPopout } from '@compositions/AboutPopout'
import { LayoutProvider } from '@context/layoutContext'
import { Box } from '@components/primitives'

import { DropsProvider } from '@drops/provider'
import { getContractProps } from '@drops/contract'
import { PopoutOverlay } from '@components/PopoutOverlay'

function MyApp({ Component, pageProps, rawContractProps }) {
  const provider = () => {
    const chain = chains.find((x) => x.id == chainId)?.rpcUrls[0]
    return new providers.StaticJsonRpcProvider(chain)
  }

  // Set up connectors
  const connectors = () => {
    const rpcUrl = chains.find((x) => x.id == chainId)?.rpcUrls[0]
    const rpcUrls = chains.reduce(
      (obj, item) => Object.assign(obj, { [item.id]: item.rpcUrls[0] }),
      {}
    )
    return [
      new InjectedConnector({
        chains: chains,
        options: { shimDisconnect: true },
      }),
      new WalletConnectConnector({
        options: {
          qrcode: true,
          rpc: rpcUrls,
        },
      }),
      new WalletLinkConnector({
        options: {
          appName: title,
          jsonRpcUrl: rpcUrl,
        },
      }),
    ]
  }

  return (
    <Provider autoConnect provider={provider} connectors={connectors}>
      <SWRConfig 
        value={{
          refreshInterval: 3000,
          fetcher: (resource, init) => fetch(resource, init).then(res => res.json())
        }}
      >
        <DropsProvider rawContractProps={rawContractProps}>
          <LayoutProvider>
            <Box 
              id="modal-root"
              css={{position: 'fixed', top: 0, left: 0, zIndex: 9000}}
            />
            <Header />
            <AboutPopout />
            <PopoutOverlay />
            <Box as="main">
              <Component {...pageProps} />
            </Box>
            <Footer />
          </LayoutProvider>
        </DropsProvider>
      </SWRConfig>
    </Provider>
  )
}

MyApp.getInitialProps = async (appContext) => {
  const appProps = await App.getInitialProps(appContext)
  const rawContractProps = await getContractProps()

  return { ...appProps, rawContractProps }
}

export default MyApp

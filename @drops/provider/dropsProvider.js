import { createContext, useContext } from 'react'
import { hydrateContractProps } from '../contract'
import { useDropsStore } from './useDropsStore'

const DropsContext = createContext({})

export function useDrops() {
  return useContext(DropsContext)
}

export function DropsProvider({ rawContractProps, ...props }) {
  const contractProps = hydrateContractProps(rawContractProps)
  const dropsStore = useDropsStore(contractProps)

  return <DropsContext.Provider value={dropsStore} {...props} />
}
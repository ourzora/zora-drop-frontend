import {
  createContext,
  useState,
  useCallback
} from "react";

export const LayoutContext = createContext(undefined);

export function LayoutProvider({ children }) {
  const [aboutState, setAboutState] = useState(false)
  const [mintScheduleState, setMintScheduleState] = useState(false)
  const [popoutState, setPopoutState] = useState(false)

  const toggleAbout = useCallback(() => {
    setAboutState(!aboutState)
    setPopoutState(!popoutState)
  }, [aboutState, setAboutState, popoutState, setPopoutState])

  const toggleMintSchedule = useCallback(() => {
    setMintScheduleState(!mintScheduleState)
    setPopoutState(!popoutState)
  }, [mintScheduleState, setMintScheduleState, popoutState, setPopoutState])
  
  const closePopout = useCallback(() => {
    setAboutState(false)
    setMintScheduleState(false)
    setPopoutState(false)
  }, [aboutState, setAboutState])

  return (
    <LayoutContext.Provider value={{
      children,
      aboutState,
      setAboutState,
      toggleAbout,
      closePopout,
      mintScheduleState,
      popoutState,
      setMintScheduleState,
      toggleMintSchedule,
    }}>
      {children}
    </LayoutContext.Provider>
  );
}

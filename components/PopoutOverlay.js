import { useContext } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import PreventOutsideScroll from 'react-prevent-outside-scroll'
import { Box } from '@components/primitives'
import { LayoutContext } from '@context/layoutContext'

const MotionBox = motion(Box)

export function PopoutOverlay() {
  const { popoutState } = useContext(LayoutContext)
  
  return (
    <AnimatePresence>
      {popoutState &&
        <PreventOutsideScroll>
          <MotionBox
            transition={{ duration: 0.4 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            css={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100vw',
              height: '100vh',
              zIndex: 1000,
              backdropFilter: 'blur(5px)',
            }}
          />
        </PreventOutsideScroll>
      }
    </AnimatePresence>
  )
}
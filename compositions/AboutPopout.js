import { useContext } from 'react'
import { LayoutContext } from '@context/layoutContext'
import { MarkDown } from '@components/utils/Markdown'
import aboutCopy from '@docs/about.md'

import { PopoutWrapper } from '@components/PopoutWrapper'

export function AboutPopout() {
  const {
    aboutState,
    toggleAbout
  } = useContext(LayoutContext)
  
  return (
    <PopoutWrapper
      id="about"
      visibleState={aboutState}
      toggleFunction={toggleAbout}
    >
      <MarkDown
        md={aboutCopy}
      />
    </PopoutWrapper>
  )
}
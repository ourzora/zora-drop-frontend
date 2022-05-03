import { useState, useCallback } from 'react'
import { Button } from '@components/Button'
import { Box } from '@components/primitives'
import { GalleryThumbnail } from './GalleryThumbnail'
import { motion, AnimatePresence } from 'framer-motion'
import { ipfsImage } from '@lib/helpers'
import PreventOutsideScroll from 'react-prevent-outside-scroll'
import { Modal } from '@components/utils/Modal'

const MotionBox = motion(Box)

export function Gallery({ tokens, ...props }) {
  if (!tokens || !tokens.length) return null

  return <TokenGallery tokens={tokens} {...props} />
}

function TokenGallery({ css, preview, tokens, ...props }) {
  const [lightbox, setLightbox] = useState(null)
  const [showInfo, setShowInfo] = useState(false)

  const next = useCallback(
    (e) => {
      e.stopPropagation()
      e.preventDefault()
      const nextImage = lightbox + 1
      setLightbox(nextImage >= tokens.length ? 0 : nextImage)
    },
    [lightbox, tokens.length]
  )

  const prev = useCallback(
    (e) => {
      e.stopPropagation()
      e.preventDefault()
      const prevImage = lightbox - 1
      setLightbox(prevImage >= 0 ? prevImage : tokens.length - 1)
    },
    [lightbox, tokens.length]
  )

  const lightboxEl = lightbox !== null && lightbox > -1 && (
    <Modal>
      <PreventOutsideScroll>
        <MotionBox
          transition={{ duration: 0.4 }}
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          exit={{ opacity: 0 }}
          css={{
            color: '$background',
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: 5000,
            display: 'flex',
            backdropFilter: 'blur(20px)',
            figure: {
              margin: 'auto',
              position: 'relative',
              zIndex: 2,
              figcaption: {
                textAlign: 'left',
                marginTop: '1rem',
                fontSize: '$body',
              },
            },
            img: {
              width: 'auto',
              height: 'auto',
              maxHeight: 'calc(100vh - 4rem)',
              maxWidth: 'calc(100vw - 20rem)',
              objectFit: 'contain',
              '@sm': {
                maxWidth: 'calc(100vw - 11rem)',
              },
            },
            '.wrapper': {
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              background: '$primary',
              opacity: 0.5,
            },
            '.close': {
              fontSize: '4rem',
              cursor: 'pointer',
              lineHeight: '1',
              fontWeight: '300',
              zIndex: 4,
            },
            '.nav': {
              cursor: 'pointer',
              position: 'absolute',
              top: '50%',
              transform: 'translateY(-50%)',
              fontSize: '4rem',
              fontWeight: '300',
              zIndex: 4,
              span: {
                display: 'block',
              },
              '&.prev': {
                left: '$margin',
                '@sm': {
                  left: '-2rem',
                  paddingLeft: '3rem',
                },
              },
              '&.next': {
                right: '$margin',
                '@sm': {
                  right: '-2rem',
                  paddingRight: '3rem',
                },
                i: {
                  display: 'block',
                },
              },
            },
            '.tools': {
              position: 'absolute',
              bottom: '$margin',
              right: '$margin',
              display: 'flex',
              gap: '$margin',
              justifyContent: 'flex-end',
              width: '100%',
              zIndex: '3',
            },
          }}
          onClick={() => setLightbox(null)}
        >
          <Box className="wrapper" />
          <Box
            className="close"
            onClick={() => setLightbox(null)}
            css={{
              position: 'fixed',
              top: '$margin',
              right: '$margin',
            }}
          >
            {/* prettier-ignore */}
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M0.514709 0.404724L17.4853 17.3753" stroke="currentColor" strokeWidth="2" strokeMiterlimit="10"/> <path d="M17.4853 0.404724L0.514727 17.3753" stroke="currentColor" strokeWidth="2" strokeMiterlimit="10"/> </svg>
          </Box>
          <AnimatePresence>
            {showInfo && <TokenInfo index={lightbox} tokens={tokens} />}
          </AnimatePresence>
          <Box className="tools" onClick={(e) => e.stopPropagation()}>
            {!preview &&
              (showInfo ? (
                <Button pill onClick={() => setShowInfo(false)}>
                  Hide info
                </Button>
              ) : (
                <Button
                  pill
                  onClick={() =>
                    preview
                      ? setShowInfo(true)
                      : window.open(`/token/${tokens[lightbox].tokenId}`)
                  }
                >
                  Show info
                </Button>
              ))}
          </Box>
          <Box className="nav prev" onClick={prev}>
            <Box css={{ transform: 'rotate(180deg)' }}>&#10749;</Box>
          </Box>
          <Box className="nav next" onClick={next}>
            &#10749;
          </Box>
          <Box
            css={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'absolute',
              top: '$dmargin',
              right: '$dmargin',
              bottom: '$dmargin',
              left: '$dmargin',
            }}
          >
            <img src={ipfsImage(tokens[lightbox].image)} />
          </Box>
        </MotionBox>
      </PreventOutsideScroll>
    </Modal>
  )

  if (!tokens || !tokens.length) return null

  return (
    <>
      <AnimatePresence>{lightboxEl}</AnimatePresence>
      <Box
        {...props}
        css={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '$margin',
          figure: {
            display: 'inline-block',
            cursor: 'zoom-in',
            figcaption: {
              textAlign: 'left',
            },
          },
          '@sm': {
            gridTemplateColumns: '1fr',
          },
          ...css,
        }}
      >
        {tokens.map((image, i) => (
          <GalleryThumbnail
            key={image.tokenId}
            onClick={() => setLightbox(i)}
            src={ipfsImage(image.image)}
            caption={preview ? '' : image.name}
          />
        ))}
      </Box>
    </>
  )
}

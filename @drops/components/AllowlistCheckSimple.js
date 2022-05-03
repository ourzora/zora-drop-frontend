import { useState, useEffect, useCallback } from 'react'
import { useDrops } from '@drops'
import { Button } from '@components/Button'
import { Modal } from '@components/utils/Modal'
import { Box, Text } from '@components/primitives'
import { motion, AnimatePresence } from 'framer-motion'
import { getActivePhases } from '@lib/mintPhases'
import PreventOutsideScroll from 'react-prevent-outside-scroll'

const MotionBox = motion(Box)

export const AllowlistCheckSimple = () => {
  const [revealAllowlist, setRevealAllowlist] = useState(false)

  const { account, isPresaleMintActive, allowlist, mintedPerAddress, contractProps } =
    useDrops()

  useEffect(() => {
    if (allowlist.isChecked && isPresaleMintActive) setRevealAllowlist(true)
  }, [allowlist.isChecked, isPresaleMintActive])

  const closeAllowlist = useCallback(() => {
    setRevealAllowlist(false)
  }, [])

  if (!account.data) return null

  const { activePresale } = getActivePhases()
  const hoursRemaining = Math.floor(
    (new Date(activePresale.end) - new Date()) / (1000 * 60 * 60)
  )

  return (
    <AnimatePresence>
      {revealAllowlist && (
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
              className="backdrop"
            >
              <Box
                css={{
                  width: '100%',
                  maxWidth: '70rem',
                  backgroundColor: '$black',
                  boxShadow: '$heavy',
                  position: 'relative',
                  borderRadius: 10,
                  color: '$white',
                  paddingBottom: '$margin',
                }}
              >
                <Button
                  closeWhite
                  onClick={closeAllowlist}
                  css={{
                    position: 'absolute',
                    right: 0,
                    top: 0,
                    'svg *': {
                      fill: '$white',
                      stroke: '$white',
                    },
                  }}
                />
                <Box
                  css={{
                    padding: '4rem $margin $margin',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '$smallMargin',
                    '@sm': {
                      padding: '$margin $margin 0',
                    },
                  }}
                >
                  {allowlist.isChecked &&
                    (allowlist.isVerified ? (
                      <>
                        <Text
                          css={{
                            fontSize: '$heading',
                            lineHeight: 1.125,
                            '@sm': {
                              fontSize: '$navigation',
                              paddingRight: 40,
                            },
                          }}
                        >
                          Congratulations! You are on the mint list today!
                        </Text>
                        <Box
                          as="hr"
                          css={{
                            margin: '0',
                            borderBottom: '1px solid $white',
                            opacity: 0.5,
                          }}
                        />
                        <Box
                          css={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '$smallMargin',
                          }}
                        >
                          {!isPresaleMintActive && (
                            <>
                              <Text>
                                You will be able to purchase directly through the website
                                once the presale goes live.
                              </Text>
                              <Box
                                as="hr"
                                css={{
                                  margin: '0',
                                  borderBottom: '1px solid $white',
                                  opacity: 0.5,
                                }}
                              />
                            </>
                          )}
                          <Text>
                            You have {hoursRemaining} hours to mint.
                            <br />
                            <>
                              {activePresale && (
                                <>
                                  You can mint: {allowlist.entry.maxCount}
                                  <br />
                                  You have minted:{' '}
                                  {mintedPerAddress?.data?.presaleMints || '0'}
                                  <br />
                                </>
                              )}
                            </>
                          </Text>
                        </Box>
                      </>
                    ) : (
                      <>
                        <Text
                          css={{
                            fontSize: '$heading',
                            lineHeight: 1.125,
                            '@sm': {
                              fontSize: '$navigation',
                              paddingRight: 40,
                            },
                          }}
                        >
                          Sorry, you are not allowed to mint at this time
                        </Text>
                      </>
                    ))}
                </Box>
              </Box>
            </MotionBox>
          </PreventOutsideScroll>
        </Modal>
      )}
    </AnimatePresence>
  )
}

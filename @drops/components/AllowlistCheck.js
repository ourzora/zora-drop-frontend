import { useMemo, useState, useEffect, useCallback } from 'react'
import { useDrops } from '@drops'
import { Button } from '@components/Button'
import { useAccount } from 'wagmi'
import { Modal } from '@components/utils/Modal'
import { Box, Text } from '@components/primitives'
import { motion, AnimatePresence } from 'framer-motion'
import PreventOutsideScroll from 'react-prevent-outside-scroll'
import { utils } from 'ethers'

const MotionBox = motion(Box)

export const AllowlistCheck = ({}) => {
  const [revealAllowlist, setRevealAllowlist] = useState(false)

  const { account, isPresaleMintActive, allowlist } = useDrops()

  useEffect(() => {
    if (allowlist.isChecked && isPresaleMintActive) setRevealAllowlist(true)
  }, [allowlist.isChecked, isPresaleMintActive])

  const closeAllowlist = useCallback(() => {
    setRevealAllowlist(false)
  }, [])

  if (!account.data) return null

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
              css={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                zIndex: 5000,
                display: 'flex',
                backdropFilter: 'blur(5px)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                overflowY: 'scroll',
                '@sm': {
                  alignItems: 'flex-start',
                },
              }}
            >
              <Box
                css={{
                  width: '100%',
                  maxWidth: '70rem',
                  backgroundColor: '$white',
                  boxShadow: '$heavy',
                  position: 'relative',
                }}
              >
                <Button
                  close
                  onClick={closeAllowlist}
                  css={{
                    position: 'absolute',
                    right: 0,
                    top: 0,
                  }}
                />
                {allowlist.isChecked &&
                  (allowlist.isVerified ? (
                    <Box
                      css={{
                        padding: '4rem $margin $margin',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '$smallMargin',
                      }}
                    >
                      <Text
                        css={{
                          fontSize: '$heading',
                        }}
                      >
                        Congratulations! You are on the presale list!
                      </Text>
                      <Box as="hr" css={{ margin: '0 0 $smallMargin' }} />
                      <Text>Merkle tree root</Text>
                      <Box className="code-wrapper">
                        <Text
                          as="code"
                          css={{ textAlign: 'left', wordBreak: 'break-all' }}
                        >
                          {allowlist.root}
                        </Text>
                      </Box>
                      <Box
                        css={{
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '$smallMargin',
                        }}
                      >
                        <Text>
                          You will be able to purchase directly through the website once
                          the presale goes live.
                          <br />
                          If you would prefer, the following data can be used to mint
                          directly from the contract during the presale.
                        </Text>
                        <Text>purchasePresale (ETH price)</Text>
                        <Box className="code-wrapper">
                          <Text
                            as="code"
                            css={{ textAlign: 'left', wordBreak: 'break-all' }}
                          >
                            {utils.formatEther(allowlist.entry.price)}
                          </Text>
                        </Box>
                        <Text>quantity</Text>
                        <Box className="code-wrapper">
                          <Text
                            as="code"
                            css={{ textAlign: 'left', wordBreak: 'break-all' }}
                          >
                            1
                          </Text>
                        </Box>
                        <Text>maxQuantity</Text>
                        <Box className="code-wrapper">
                          <Text
                            as="code"
                            css={{ textAlign: 'left', wordBreak: 'break-all' }}
                          >
                            {JSON.stringify(allowlist.entry.maxCount)}
                          </Text>
                        </Box>
                        <Text>pricePerToken</Text>
                        <Box className="code-wrapper">
                          <Text
                            as="code"
                            css={{ textAlign: 'left', wordBreak: 'break-all' }}
                          >
                            {allowlist.entry.price}
                          </Text>
                        </Box>
                        <Text>merkleProof</Text>
                        <Box className="code-wrapper">
                          <Text
                            as="code"
                            css={{ textAlign: 'left', wordBreak: 'break-all' }}
                          >
                            {JSON.stringify(allowlist.entry.proof).replace(/"/g, '')}
                          </Text>
                        </Box>
                      </Box>
                    </Box>
                  ) : (
                    <>
                      <Text>Sorry, you are not allowed to mint at this time</Text>
                    </>
                  ))}
              </Box>
            </MotionBox>
          </PreventOutsideScroll>
        </Modal>
      )}
    </AnimatePresence>
  )
}

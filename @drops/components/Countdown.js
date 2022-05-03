import { useDrops } from '@drops'
import { Box } from '@components/primitives'
import { formattedDate } from '@lib/formattedDate'

export function Countdown() {
  const { isPublicSaleMintActive, isPresaleMintActive, isSoldOut, countdown } = useDrops()

  if (isSoldOut) {
    return null
  } else {
    return (
      <Box
        css={{
          display: 'flex',
          flexDirection: 'column',
          gap: '$smallMargin',
          '*': {
            fontSize: '$caption',
            lineHeight: 1.25,
          },
        }}
      >
        <Box>
          <strong>Presale:&nbsp;</strong>
          {isPresaleMintActive ? (
            <span>Live now!</span>
          ) : (
            <>
              {isPublicSaleMintActive ? (
                'Finished'
              ) : (
                <>
                  {countdown.presale.text}
                  <br />
                  {'' + formattedDate(presaleLaunchTime)}
                </>
              )}
            </>
          )}
        </Box>

        <Box>
          <strong>Public sale:&nbsp;</strong>
          {isPublicSaleMintActive ? (
            <span>Live now!</span>
          ) : (
            <>
              {isSoldOut ? (
                'Sale finished'
              ) : (
                <>
                  {countdown.publicSale.text}
                  <br />
                  {'' + formattedDate(launchTime)}
                </>
              )}
            </>
          )}
        </Box>
      </Box>
    )
  }
}

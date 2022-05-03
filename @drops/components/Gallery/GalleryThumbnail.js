import { useCallback, useEffect, useState } from 'react'
import { styled } from '../../../stitches.config'
import { Box } from '@components/primitives'
import { useInView } from 'react-intersection-observer';
import { baseUrl } from '@lib/constants';

const BaseFigure = styled('figure')

export const GalleryThumbnail = ({ src, alt, caption, css, image, ...props }) => {
  const [loaded, setLoaded] = useState(false)

  const loadedHandler = useCallback((e) => {
    if (e.target.src !== `${baseUrl}/placeholder.png`) setLoaded(true)
  }, [])

  const { ref, inView } = useInView({
    threshold: 0,
  });

  useEffect(() => {
    if (!inView) setLoaded(false)
  }, [inView])

  return (
    <BaseFigure
      {...props}
      ref={ref}
      css={{
        ...css,
        margin: 0,
        figcaption: {
          fontSize: '$caption',
          marginTop: '0.5rem',
          textAlign: 'center',
        },
      }}
    >
      <Box css={{
        aspectRatio: '1 / 1',
        position: 'relative',
        backgroundColor: '$ltGrey',
        width: '100%',
        img: {
          display: 'block',
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          position: 'absolute',
          inset: 0,
          opacity: `${loaded ? 1 : 0}`,
          transition: 'opacity 350ms $inOut 200ms',
        },
      }}>
        {image || <img src={inView ? src : '/placeholder.png'} alt={alt} onLoad={loadedHandler} />}
      </Box>
        {caption && <figcaption>{caption}</figcaption>}
    </BaseFigure>
  )
}

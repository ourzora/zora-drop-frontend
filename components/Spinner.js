import { Box } from "./primitives";
import { keyframes } from "@stitches/react"

const spinKeyframes = keyframes({
  from: {
    transform: 'rotate(0deg)',
  },
  to: {
    transform: 'rotate(360deg)',
  },
});

export function Spinner({color = '#ffffff', size = 48, css}) {
	return (
    <Box css={{
      width: size,
      height: size,
      animation: `${spinKeyframes} 1s infinite linear`,
      ...css,
      'svg': {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
      }
    }}>
      <svg height="48" width="48" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
        <g fill={color}>
          <path d="M24,1C11.318,1,1,11.318,1,24c0,3.277,0.675,6.443,2.007,9.41c0.227,0.504,0.818,0.729,1.322,0.502 c0.504-0.226,0.729-0.818,0.502-1.322C3.616,29.883,3,26.993,3,24C3,12.42,12.42,3,24,3s21,9.42,21,21s-9.42,21-21,21 c-4.853,0-9.586-1.694-13.328-4.771c-0.428-0.351-1.056-0.289-1.408,0.137c-0.351,0.427-0.289,1.057,0.137,1.408 C13.5,45.144,18.685,47,24,47c12.682,0,23-10.318,23-23S36.682,1,24,1z" fill={color} />
        </g>
      </svg>
    </Box>
	);
};

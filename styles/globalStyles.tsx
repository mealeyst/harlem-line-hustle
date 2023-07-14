import { createGlobalStyle, keyframes } from 'styled-components'
import { colors } from './colors'
import grainSVG from '../public/grain.svg'

const animateGradient = keyframes`
  	0% {
      background-position: 50% 50%;
    }
    25% {
      background-position: 0% 0%;
    }
    50% {
      background-position: 50% 50%;
    }
    75% {
      background-position: 100% 100%;
    }
    100% {
      background-position: 50% 50%;
    }
`

export const GlobalStyle = createGlobalStyle<{ $whiteColor?: boolean }>`
  html, body {
	  animation: ${animateGradient} 30s ease infinite;
    background: ${colors.background[0]};
    background: radial-gradient(
      circle at top center,
      ${colors.background[2]} 0%,
      ${colors.background[1]} 25%,
      ${colors.background[0]} 75%
    );
    background-size: 300%;
    color: ${colors.text};
    font-family: Merriweather, serif;
    margin: 0;
  }

  * {
    box-sizing: border-box;
  }

  a {
    color: ${colors.text};
  }
`

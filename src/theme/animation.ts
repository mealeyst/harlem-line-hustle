import { css, keyframes } from 'styled-components'

const timingValues = [
  75,
  100,
  150,
  200,
  300,
  400,
  500,
  700,
  1000
]

const spinKeyframes = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`

const pingKeyframes = keyframes `
  0% {
    transform: scale(1);
    opacity: 1;
  }
  75%, 100% {
    transform: scale(2);
    opacity: 0;
  }
`

const pulseKeyframes = keyframes`
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: .5;
  }
`

const bounceKeyframes = keyframes`
  0%, 100% {
    transform: translateY(-25%);
  }
  50% {
    transform: translateY(0);
  }
`

const spin = css`
  animation: ${spinKeyframes} 1s linear infinite;
`

const ping = css`
  animation: ${pingKeyframes} 1s cubic-bezier(0, 0, 0.2, 1) infinite;
`
const pulse = css`
  animation: ${pulseKeyframes} 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
`

export const bounce = css`
  animation: ${bounceKeyframes} 1s infinite;
`

interface Animation {
  [key: string]: {
    [key: string]: string | Function
  } 
  property?: {
    [key: string]: string
  }
}

console.log(bounce)

export const animation: Animation = {
  delay: (() => {
    const output = {}
    timingValues.forEach((value) => {
      output[value] = `transition-delay: ${value}ms;`
    })
    return output
  })(),
  duration: (() => {
    const output = {}
    timingValues.forEach((value) => {
      output[value] = `transition-duration: ${value}ms;`
    })
    return output
  })(),
  timingFunction: (() => {
    const values = {
      linear: 'linear',
      easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
      easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
      easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)'
    }
    const output = {}
    Object.keys(values).forEach((key) => {
      output[key] = `transition-timing-function: ${values[key]};`
    })
    return output
  })(),
  predefined: (() => {
    return {
      none: 'animation: none;',
      spin,
      ping,
      pulse,
      bounce
    }
  })()
}

animation.property = (() => {
  const values = {
    none: 'none',
    all: 'all',
    transition: 'background-color, border-color, color, fill, stroke, opacity, box-shadow, transform',
    colors: 'background-color, border-color, color, fill, stroke',
    opacity: 'opacity',
    shadow: 'box-shadow',
    transform: 'transform'
  }
  const output = {}
  Object.keys(values).forEach((key) => {
    switch (key) {
      case 'none':
        output[key] = `transition-property: ${values[key]};`
        break
      default:
        output[key] = `transition-property: ${values[key]};\n${animation.duration[150]}\n${animation.timingFunction.easeInOut}`
    }
  })
  return output
})()
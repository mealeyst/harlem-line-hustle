import React, { useEffect, useRef, useState } from 'react'
import styled, { keyframes } from 'styled-components'
import { spacing } from "../../theme/spacing";
import { color } from "../../theme/color"

interface InputProps {
  error?: boolean
}

const topLeftHover = keyframes`
  0%, 100% {
    transform: translate(0px, 0px);
  }
  47%, 63% {
    transform: translate(-2px, -2px);
  }
`
const topRightHover = keyframes`
  0%, 100% {
    transform: translate(0px, 0px);
  }
  47%, 63% {
    transform: translate(2px, -2px);
  }
`
const bottomLeftHover = keyframes`
  0%, 100% {
    transform: translate(0px, 0px);
  }
  47%, 63% {
    transform: translate(-2px, 2px);
  }
`

const bottomRightHover = keyframes`
  0%, 100% {
    transform: translate(0px, 0px);
  }
  47%, 63% {
    transform: translate(2px, 2px);
  }
`

const InputBase = React.forwardRef((props: React.HTMLProps<HTMLInputElement> & InputProps, ref?: React.Ref<HTMLInputElement>) => {
  const { className, error } = props
  const containerRef = useRef<HTMLDivElement>(null)
  const [inputWidth, setInputWidth] = useState(0)
  useEffect(() => {
    if (containerRef.current) {
      setInputWidth(containerRef.current.offsetWidth)
    }
  }, [containerRef])
  const errorClass = error ? ' error': ''
  return (
    <div className={`${className}${errorClass}`} ref={containerRef}>
      <input  {...props} ref={ref} />
      <svg xmlns="http://www.w3.org/2000/svg" viewBox={`0 0 ${inputWidth + 2} 48`}>
        <rect className="background" x="4" y="4" width={`${inputWidth - 6}`} height="40" />
        <path className='corner top-left' d="M4 14 V 4 H 14"/>
        <path className='corner top-right' d={`M${inputWidth - 2} 14 V 4 H ${inputWidth - 12}`}/>
        <path className='corner bottom-left' d="M4 34 V 44 H 14"/>
        <path className='corner bottom-right' d={`M${inputWidth - 2} 34 V 44 H ${inputWidth - 12}`}/>
      </svg>
    </div>

  )
})

export const Input = styled(InputBase)<React.HTMLProps<HTMLInputElement>>`
  width: 100%;
  height: ${spacing(12)};
  position: relative;
  cursor: pointer;
  input {
    width: 100%;
    height: 100%;
    padding: ${spacing(3)};
    background-color: transparent;
    border: none;
    font-weight: bold;
    color: ${color('primary.100')};
    transition: color 0.25s ease-in-out;
    margin: 0;
    border-radius: 0;
    position: absolute;
    &:focus {
      outline: none;
      background: transparent;
      box-shadow: none;
    }
  }
  svg {
    .background {
      fill: ${color('primary.800')};
      transition: fill 0.25s ease-in-out;
      stroke: ${color('primary.600')};
      stroke-width: 1;
    }
    .corner {
      stroke-width: 2;
      fill: none;
      transition: stroke 0.25s ease-in-out;
      stroke: ${color('primary.200')};
    }
  }
  input:hover ~ svg, input:focus ~ svg{
    .background {
      fill: ${color('primary.700')}
    }
    .top-left {
      animation: ${topLeftHover} 1s infinite;
    }
    .top-right {
      animation: ${topRightHover} 1s infinite;
    }
    .bottom-left {
      animation: ${bottomLeftHover} 1s infinite;
    }
    .bottom-right {
      animation: ${bottomRightHover} 1s infinite;
    }
  }
  &.error{
    input {
      caret-color: ${color('red.100')};
      color: ${color('red.100')};
    }
    svg {
      .background {
        fill: ${color('red.800')};
        stroke: ${color('red.600')};
      }
      .corner {
        stroke: ${color('red.200')};
      }
    }
  }
}
`
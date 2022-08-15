import * as React from "react";
import styled, { css, DefaultTheme, keyframes, StyledProps, ThemedStyledProps } from "styled-components";
import { spacing } from "../../theme/spacing";
import { color } from "../../theme/color"

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

const BaseButton = React.forwardRef((props: React.HTMLAttributes<HTMLButtonElement>, ref?: React.Ref<HTMLButtonElement>) => {
  const { className } = props
  return (
    <div className={className}>
      <button {...props} ref={ref} />
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 48">
        <rect className="background" x="4" y="4" width="192" height="40" />
        <path className='corner top-left' d="M4 14 V 4 H 14"/>
        <path className='corner top-right' d="M196 14 V 4 H 186"/>
        <path className='corner bottom-left' d="M4 34 V 44 H 14"/>
        <path className='corner bottom-right' d="M196 34 V 44 H 186"/>
      </svg>
    </div>
  )
})

export const Button  = styled(BaseButton)<React.HTMLAttributes<HTMLButtonElement>>`
  width: ${spacing(50)};
  height: ${spacing(12)};
  position: relative;
  cursor: pointer;
  button {
    width: 100%;
    height: 100%;
    background-color: transparent;
    border: none;
    text-transform: uppercase;
    font-weight: bold;
    color: ${color('primary.800')};
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
      fill: ${color('primary.600')};
      transition: fill 0.25s ease-in-out;
    }
    .corner {
      stroke-width: 2;
      fill: none;
      stroke: ${color('primary.200')};
    }
  }
  button:hover ~ svg{
    .background {
      fill: ${color('primary.500')}
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
  button:focus
`
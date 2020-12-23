import { keyframes } from 'styled-components'

export const shrinkLogo = keyframes`
  0% {
    height: calc(100vh - 5rem);
  }
  95% {
    height: calc(100vh - 5rem);
  }
  100% {
    height: 3rem;
  }
`

export const trainApproach = keyframes`
  0% {
    transform: scale(0);
  }
  57% {
    transform: scale(0);
  }
  67% {
    transform: scale(1);
  }
  100% {
    transform: scale(1);
  }
`

export const scaleUpBackground = keyframes`
  0% {
    transform: scale(0) rotate(-90deg);
  }
  20% {
    transform: scale(1) rotate(0deg);
  }
  100% {
    transform: scale(1) rotate(0deg);
  }
`

export const changeOrangeBackgroundFill = keyframes`
  0% {
    fill: color(orange);
  }
  20% {
    fill: color(orange);
  }
  30% {
    fill: color(blue);
  }
  100% {
    fill: color(blue);
  }
`

export const changeGreenBackgroundFill = keyframes`
  0% {
    fill: color(green);
  }
  20% {
    fill: color(green);
  }
  30% {
    fill: color(blue);
  }
  100% {
    fill: color(blue);
  }
`

export const animateHarlem = keyframes`
  0% {
    transform: scale(2) translate(30%, -50%);
  }
  40% {
    transform: scale(2) translate(30%, -50%);
  }
  50% {
    transform: translateX(2%);
  }
  52.5% {
    transform: translateX(0%);
  }
  55% {
    transform: scale(1) translate(0%, 0%);
  }
  95% {
    transform: scale(1) translate(0%, 0%);
  }
  100% {
    transform: scale(0) translate(0%, 0%);
  }
`

export const animateLine = keyframes`
  0% {
    transform: scale(2) translate(-3.5%, -40%);
  }
  40% {
    transform: scale(2) translate(-3.5%, -40%);
  }
  55% {
    transform: scale(1) translate(0%, 0%);
  }
  95% {
    transform: scale(1) translate(0%, 0%);
  }
  100% {
    transform: scale(0) translate(0%, 0%);
  }
`

export const animateHustle = keyframes`
  0% {
    transform: scale(2) translate(-35%, -30%);
  }
  40% {
    transform: scale(2) translate(-35%, -30%);
  }
  50% {
    transform: translateX(-3%);
  }
  52.5% {
    transform: translateX(0%);
  }
  55% {
    transform: scale(1) translate(0%, 0%);
  }
  95% {
    transform: scale(1) translate(0%, 0%);
  }
  100% {
    transform: scale(0) translate(0%, 0%);
  }
`

export const animateInnerRing = keyframes`
  0% {
    opacity: 0;
  }
  60% {
    opacity: 0;
  }
  62% {
    opacity: 1;
  }
  64% {
    opacity: 0;
  }
  66% {
    opacity: 1;
  }
  68% {
    opacity: 0;
  }
  70% {
    opacity: 1;
  }
  100% {
    opacity: 1;
  }
`

export const animateMiddleRing = keyframes`
  0% {
    opacity: 0;
  }
  70% {
    opacity: 0;
  }
  72% {
    opacity: 1;
  }
  74% {
    opacity: 0;
  }
  76% {
    opacity: 1;
  }
  78% {
    opacity: 0;
  }
  80% {
    opacity: 1;
  }
  100% {
    opacity: 1;
  }
`

export const animateOuterRing = keyframes`
  0% {
    opacity: 0;
  }
  80% {
    opacity: 0;
  }
  82% {
    opacity: 1;
  }
  84% {
    opacity: 0;
  }
  86% {
    opacity: 1;
  }
  88% {
    opacity: 0;
  }
  90% {
    opacity: 1;
  }
  100% {
    opacity: 1;
  }
`
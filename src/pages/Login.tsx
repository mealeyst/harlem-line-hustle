import styled, { keyframes } from "styled-components";
import { Logo } from "../components/Logo";
import { ScrollCode } from "../components/ScrollCode";
import { Trinity } from "../layouts/Trinity";
import { query } from "../theme/mediaQueries";

import fakeCode from "../constants/fakeCode";

const animateLogo = keyframes`
  from {
    transform: translate(0%, 50%);
    opacity: 0.1;
  }
  to {
    transform: translate(0%, 0%);
    opacity: 1;
  }
`

export const Login = styled(({className}) => (
  <Trinity className={className}>
    <ScrollCode>{fakeCode[0]}</ScrollCode>
    <ScrollCode>{fakeCode[1]}</ScrollCode>
    <ScrollCode>{fakeCode[2]}</ScrollCode>
    <Logo />
  </Trinity>
  ))`
  ${ScrollCode} {
    display: none;
    ${query('md')}{
      display: block;
      height: 100%;
      grid-area: left;
      &:nth-of-type(2) {
        grid-row-start: 2;
      }
      &:nth-of-type(3) {
        grid-row-start: 3;
      }
    }
  }
  ${Logo} {
    width: 100%;
    height: 100%;
    grid-area: logo;
    animation: ${animateLogo} 1.5s ease-in-out forwards;
  }
  `
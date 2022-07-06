import styled, { keyframes } from "styled-components";
import { Logo } from "../components/Logo";
import { Trinity } from "../layouts/Trinity";

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
    <Logo />
  </Trinity>
  ))`
  ${Logo} {
    width: 100%;
    height: 100%;
    grid-area: logo;
    animation: ${animateLogo} 1.5s ease-in-out forwards;
  }
  `
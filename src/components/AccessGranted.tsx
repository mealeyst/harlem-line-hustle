import styled, { keyframes } from "styled-components";
import { SmallAlert } from "./SmallAlert"
import { useAppSelector } from "../hooks/state";
import { selectAnimationStage } from "../redux/homepage/selectors";
import { ANIMATION_STAGE } from "../redux/homepage/slice";
import { spacing } from '../theme/spacing';

const animateAccessGranted = keyframes`
  from {
    transform: translate(0%, 50%);
    opacity: 0.1;
  }
  to {
    transform: translate(0%, 0%);
    opacity: 1;
  }
`

export const AccessGranted = styled(({ className }) => {
  const animationStage = useAppSelector(selectAnimationStage)
  const shouldRender = (animationStage >= ANIMATION_STAGE.ACCESS_GRANTED)
  if (shouldRender) {
    return (
      <SmallAlert className={className}><h2>Access Granted</h2></SmallAlert>
    )
  }
  return null
})`
height: ${spacing(30)};
grid-area: inputs;
animation: ${animateAccessGranted} 1.5s ease-in-out forwards;
margin-top: auto;
margin-bottom: auto;
text-transform: uppercase;
`
import  { useEffect, useRef, useState } from "react";
import styled, { keyframes } from "styled-components";
import { spacing } from "../theme/spacing";
import { color } from "../theme/color";
import { useAppDispatch, useAppSelector } from "../hooks/state";
import { actions } from "../redux/homepage";
import { ANIMATION_STAGE } from "../redux/homepage/slice";
import { selectAnimationStage, selectLoginError } from "../redux/homepage/selectors";

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-10%);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`

const fadeOut = keyframes`
  to {
    opacity: 0;
    transform: translateY(-10%);
  }
  from {
    opacity: 1;
    transform: translateY(0);
  }
`

const cursorFade = keyframes`
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
`

const shake = keyframes`
  0%, 100% {
    transform: translateX(0px);
  }
  25%, 75% {
    transform: translateX(-30px);
  }
  50% {
    transform: translateX(30px);
  }
`

export const HackingScript = styled(({className, children}) => {
  const dispatch = useAppDispatch()
  const animationStage = useAppSelector(selectAnimationStage)
  const error = useAppSelector(selectLoginError)
  const codeRef = useRef<HTMLDivElement>(null);
  const shouldRender = (animationStage >= ANIMATION_STAGE.SCRIPT_RUNNING)
  const [formFade, setFormFade] = useState<boolean>(true)
  useEffect(() => {
    if(shouldRender) {
      const code = codeRef.current

      setTimeout(() => {
        setFormFade(false)
      }, 3000)

      const strText = `
      // Initialize login script...
      function loginScript () {
        const credentials = [
          {u_name: 'shawn.mealey@harlem-line-hustle.com', p_word: 'ILikeProgramming11!'},
          {u_name: 'mealey.shawn@harlem-line-hustle.com', p_word: 'IHeartHacking11!'},
          {u_name: 'admin@harlem-line-hustle.com', p_word: 'password'}
        ];
        credentials.forEach((credential, index) => {
          const { u_name, p_word } = credential;
          const u_name_input = document.getElementById('user_name');
          const p_word_input = document.getElementById('password');
          const submit_button = document.getElementById('submit');\n
          setTimeout(() => {
            u_name_input.value = u_name;

             p_word_input.value = p_word;

             submit_button.click();
          }, 1000 * index);
      });
    }\n
    loginScript();`
      let charIndex = 0;
      let animation: number;
      const createChar = () => {
        if (code) {
            code.scrollTop = code.scrollHeight;
            code.innerHTML = strText.substring(0, charIndex) + "<span class='cursor'>\u25ae</span>";
            if( charIndex < strText.length) {
              charIndex++;
              animation = requestAnimationFrame(createChar)
            } else {
              dispatch(actions.setAnimationStage(ANIMATION_STAGE.LOGGING_IN))
              cancelAnimationFrame(animation)
            }
        }
      }
      animation = requestAnimationFrame(createChar)
    }
  }, [dispatch, shouldRender])
  const fadeClass = formFade ? ' fadeIn' : ''
  const fadeOutClass = animationStage >= ANIMATION_STAGE.ACCESS_GRANTED ? 'fadeOut' : ''
  const errorClasses = error ? ' shake error' : ''
  if(shouldRender) {
    return (
      <code aria-hidden className={`${className} ${errorClasses} ${fadeClass} ${fadeOutClass}`} ref={codeRef} />
   )
  }
  return null 
})`
  height: 100%;
  width: 100%;
  border: 2px solid ${color('primary.600')};
  opacity: 1;
  background-color: ${color('primary.900', .5)};
  border-color: ${color('primary.400', 0.7)};
  border-top-width: 8px;
  border-bottom-width: 1px;
  border-left-width: 1px;
  border-right-width: 1px;
  border-style: solid;
  font-size: 8px;
  padding: ${spacing(3)};
  overflow-y: hidden;
  word-wrap: break-word;
  white-space:pre-wrap;
  backdrop-filter: blur(5px);
  .cursor {
    animation: ${cursorFade} 1s ease-in-out infinite;
  }
  &.fadeOut {
    animation: ${fadeOut} 0.5s ease-in-out forwards;
  }
  &.error{
    border-color: ${color('red.600')};
    color: ${color('red.100')};
    background-color: ${color('red.900', 0.4)};
  }
  &.fadeIn {
    animation: ${fadeIn} 0.25s ease-in-out;
  }
  &.shake {
    animation: ${shake} 0.3s ease-in-out forwards !important;
  }
`
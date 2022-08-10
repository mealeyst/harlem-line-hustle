import React, { useRef, useState } from "react";
import { useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { spacing } from "../theme/spacing";
import { color } from "../theme/color";

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

const cursorFade = keyframes`
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
`

export const HackingScript = styled(({className, children}) => {
  const codeRef = useRef<HTMLDivElement>(null);
  const [ shouldRender, setShouldRender] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setShouldRender(true), 3500);
  }, []);
  useEffect(() => {
    if(shouldRender) {
      const code = codeRef.current
      const FPS = 40

      const strText = `
        
      // Initialize login script...
      function loginScript () {
        let credentials = [
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
          }, 3000 * index);
      });
    }\n
    loginScript();`
      let charIndex = 0;
      const createChar = () => {
        if (code) {
            code.scrollTop = code.scrollHeight;
            code.innerHTML = strText.substring(0, charIndex) + "<span class='cursor'>\u25ae</span>";
            if( charIndex < strText.length) {
              charIndex++;
              setTimeout(createChar, 1000 / (FPS))
            }
        }
      }
      createChar();
    }
  }, [shouldRender])
  if(shouldRender) {
    return (
      <code aria-hidden="true" className={className} ref={codeRef} />
   )
  }
  return null 
})`
  height: 100%;
  width: 100%;
  border: 1px solid #74c69d;
  opacity: 0;
  background-color: ${color('primary.900', .5)};
  font-size: 8px;
  padding: ${spacing(3)};
  overflow-y: hidden;
  word-wrap: break-word;
  white-space:pre-wrap;
  animation: ${fadeIn} 0.25s ease-in-out forwards;
  backdrop-filter: blur(5px);
  .cursor {
    animation: ${cursorFade} 1s ease-in-out infinite;
  }
`
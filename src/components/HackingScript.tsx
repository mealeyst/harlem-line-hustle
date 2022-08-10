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
        // Initialize login script...\n
        function loginScript = () {\n
          let credentials = [\n
            {u_name: \'shawn.mealey@harlemlinehustle.com\', p_word: \'ILikeProgramming11!\'},\n
            {u_name: \'mealey.shawn@harlemlinehustle.com\', p_word: \'IHeartHacking11!\'},\n
            {u_name: \'admin@harlemlinehustle.com\', p_word: \'password\'}\n
          ];\n
          for (const credential in credentials) {\n
            const { u_name, p_word } = credential;\n
            const u_name_input = document.getElementById('#user_name');\n
            const p_word_input = document.getElementById('#password');\n
            const login_form = document.getElementById('#login_form');\n
            u_name_input.value = u_name;\n
            p_word_input.value = p_word;\n
            login_form.submit();\n
          }\n
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
  .cursor {
    animation: ${cursorFade} 1s ease-in-out infinite;
  }
`
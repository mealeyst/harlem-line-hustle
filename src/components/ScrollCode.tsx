import React, { useRef } from "react";
import { useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { spacing } from "../theme/spacing";

const fadeTextIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-10%);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`

export const ScrollCode = styled(({className, children}) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (scrollRef.current) {
      const strText = scrollRef.current?.textContent;
      const splitText = strText?.split("");
      scrollRef.current.textContent = '';
      let i = 0;
      const createChar = () => {
        if (scrollRef.current && splitText && splitText.length > 0) {
          scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
          const element = document.createElement('span');
          const char = document.createTextNode(splitText[i]);
          element.appendChild(char);
          scrollRef.current.appendChild(element);
          if (i < splitText.length) {
            i++;
          } else {
            scrollRef.current.textContent = '';
            i = 0;
          }
        }
      }
      setInterval(createChar, 50);
    }
  }, [])
  return (<code className={className} ref={scrollRef}>
    {children}
   </code>)
})`
  height: 100%;
  width: 100%;
  border: 1px solid #74c69d;
  background-color: hsla(155, 43%, 18%, 0.1);
  padding: ${spacing(3)};
  overflow-y: hidden;
  word-wrap: break-word;
  > span {
    animation: ${fadeTextIn} 0.25s ease-in-out forwards; 

  }
`
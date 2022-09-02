import { HTMLAttributes, ReactElement } from 'react'
import styled from 'styled-components'
import { color } from "../theme/color";
import { spacing } from "../theme/spacing";

interface IWindow extends HTMLAttributes<HTMLDivElement> {
  header?: ReactElement
}

export const Window = styled(({className, children, header}: IWindow) => {

  return (
    <div className={className}>
      {
        header &&
        <header>{header}</header>
      }
      <section>{children}</section>
    </div>
  )
})`
  backdrop-filter: blur(5px);
  border-color: ${color('primary.400', 0.7)};
  border-top-width: 8px;
  border-bottom-width: 1px;
  border-left-width: 1px;
  border-right-width: 1px;
  border-style: solid;
  display: flex;
  flex-direction: column;
  transition: border-color 0.3s ease-in-out;
  header {

  }
  section {
    display: flex;
    &:before, &:after {
      display: block;
      content: ' ';
      background-color: ${color('primary.700', 0.4)};
      height: 100%;
      width: ${spacing(14)};
    }
  }
`
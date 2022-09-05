import { HTMLAttributes, ReactElement } from 'react'
import styled from 'styled-components'
import { color } from "../theme/color";
import { spacing } from "../theme/spacing";

interface IWindow extends HTMLAttributes<HTMLDivElement> {
  header?: ReactElement
}

export const Window = styled(({className, children, header}: IWindow) => {
  const headerClass = header ? '' : 'with-border'
  return (
    <div className={className}>
      {
        header &&
        <header>{header}</header>
      }
      
      <section className={headerClass}>
        {children}
      </section>
    </div>
  )
})`
  backdrop-filter: blur(5px);
  border-color: ${color('primary.400', 0.7)};
  border-top-width: ${spacing(5)};
  border-bottom-width: 1px;
  border-left-width: 1px;
  border-right-width: 1px;
  border-style: solid;
  display: flex;
  flex-direction: column;
  transition: border-color 0.3s ease-in-out;

  header {
    background-color: ${color('primary.700', 0.4)};
    padding: ${spacing(0, 5)};
  }
  section {
    height: 100%;
    border: 1px solid red;
    border-color: ${color('primary.700', 0.4)};
    border-left-width: ${spacing(5)};
    border-right-width: ${spacing(5)};
    border-bottom-width: ${spacing(5)};
    padding: ${spacing(0, 5)};
    box-sizing: border-box;
  }
  .with-border {
    border-top-width: ${spacing(5)};
  }
`
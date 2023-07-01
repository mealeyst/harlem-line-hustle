import Container from './container'
import { EXAMPLE_PATH } from '../lib/constants'
import styled from 'styled-components'

export const Footer = styled(({ className }: { className?: string }) => {
  return (
    <footer className={className}>
      ©{new Date().getFullYear()} Harlem Line Hustle Studios. All rights
      reserved.
    </footer>
  )
})`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 80px;
`

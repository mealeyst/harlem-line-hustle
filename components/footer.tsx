import styled from 'styled-components'
import { colors } from '../styles/colors'

export const Footer = styled(({ className }: { className?: string }) => {
  return (
    <footer className={className}>
      ©{new Date().getFullYear()} Harlem Line Hustle Studios. <br /> All rights
      reserved.
    </footer>
  )
})`
  grid-column: 1 / 13;
  grid-row: 9 / 10;
  border-top: 1px solid ${colors.grey[5]};
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 20px;
`

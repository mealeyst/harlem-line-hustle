import Link from 'next/link'
import { Logo } from './logo'
import styled from 'styled-components'
import { colors } from '../styles/colors'

export const Header = styled(({ className }: { className?: string }) => {
  return (
    <header className={className}>
      <Link href='/'>
        <Logo />
      </Link>
    </header>
  )
})`
  grid-column: 1 / 13;
  align-items: center;
  display: flex;
  flex-direction: row;
  padding: 10px 20px;

  border-bottom: 1px solid ${colors.grey[5]};
`

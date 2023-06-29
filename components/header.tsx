import Link from 'next/link'
import { Logo } from './logo'
import styled from 'styled-components'

export const Header = styled(({ className }: { className?: string }) => {
  return (
    <header className={className}>
      <Link href='/' className='hover:underline'>
        <Logo />
      </Link>
    </header>
  )
})`
  padding: 10px 20px;
  display: flex;
  flex-direction: row;
`

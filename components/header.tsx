import Link from 'next/link'
import { Logo } from './logo'
import styled from 'styled-components'

export const Header =  styled.header`
  padding: 10px 20px;
`

export default () => {
  return (
    <Header>
      <Link href="/" className="hover:underline">
        <Logo />
      </Link>
    </Header>
  )
}

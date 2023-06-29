import styled from 'styled-components'
import Link from 'next/link'
import { ReactNode, useContext } from 'react'
import { NavigationData } from '../context/context'

type Link = {
  children: ReactNode
  href: string
}

export type INavigation = { navigation: Link[] }

type NavigationProps = INavigation & {
  className?: string
}

export const Navigation = styled(
  ({ className, navigation }: NavigationProps) => (
    <nav className={className}>
      <ul>
        {navigation.map(({ children, href }) => {
          return (
            <li>
              <Link href={href}>{children}</Link>
            </li>
          )
        })}
      </ul>
    </nav>
  ),
)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  ul {
    display: flex;
    flex-direction: column;
  }
`

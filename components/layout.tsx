import { Footer } from './footer'
import Meta from './meta'
import { GlobalStyle } from '../styles/globalStyles'
import { Navigation, INavigation } from './navigation'
import { Header } from './header'
import styled from 'styled-components'
import { ReactNode, useState } from 'react'
import { colors } from '../styles/colors'
type LayoutProps = INavigation & {
  className?: string
  children: ReactNode
}

export const Layout = styled(
  ({ className, children, navigation }: LayoutProps) => {
    const [menuOpen, setMenuOpen] = useState(false)
    return (
      <>
        <GlobalStyle />
        <Meta />
        <div className={className}>
          <Header />
          <a
            className='menuToggle'
            onClick={() => {
              console.log(`menu is ${!menuOpen}`)
              setMenuOpen(!menuOpen)
            }}
          >
            {menuOpen ? 'Close Menu' : 'Open Menu'}
            <span />
            <span />
            <span />
          </a>
          <Navigation navigation={navigation} />
          <main>{children}</main>
        </div>
        <Footer />
      </>
    )
  },
)`
  display: grid;
  max-width: 1920px;
  height: 100vh;
  margin: 0 auto;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: repeat(9, 1fr);
  column-gap: 20px;
  position: relative;
  ${Header} {
    grid-column-start: 1;
    grid-column-end: 10;
  }
  ${Navigation} {
    grid-column-start: 10;
    grid-column-end: 13;
    grid-row-start: 1;
    grid-row-end: 10;
    // border: 1px solid red;
    min-height: 100%;
  }
  main {
    grid-column-start: 1;
    grid-column-end: 10;
    grid-row-start: 2;
    grid-row-end: 10;
    overflow-y: scroll;
    > * {
      padding-left: 20px;
      padding-right: 20px;
    }
    &::-webkit-scrollbar-track {
      border-radius: 10px;
      background-color: transparent;
    }

    &::-webkit-scrollbar {
      max-width: 6px;
      max-height: 6px;
      background-color: transparent;
    }

    &::-webkit-scrollbar-thumb {
      border-radius: 10px;
      background-color: ${colors.red[4]};
    }
  }
`

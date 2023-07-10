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
          <a className='menuToggle' onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? 'Close Menu' : 'Open Menu'}
            <span />
            <span />
            <span />
          </a>
          <Navigation
            className={menuOpen ? 'open' : ''}
            navigation={navigation}
          />
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
  overflow: hidden;
  .menuToggle {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 60px;
    width: 60px;
    position: absolute;
    top: 10px;
    right: 10px;
    font-size: 0;
    z-index: 10;
    span {
      background-color: ${colors.text};
      height: 4px;
      width: 40px;
      margin-top: 5px;
    }
  }
  @media (min-width: 768px) {
    .menuToggle {
      display: none;
    }
  }
  ${Header} {
    grid-row-start: 1;
    grid-row-end: 2;
    grid-column-start: 1;
    grid-column-end: 13;
    @media (min-width: 768px) {
      grid-row-start: 1;
      grid-row-end: 2;
      grid-column-start: 1;
      grid-column-end: 10;
    }
  }
  ${Navigation} {
    grid-column-start: 2;
    grid-column-end: 13;
    grid-row-start: 1;
    grid-row-end: 10;
    min-height: 100%;
    z-index: 1;
    transform: translateX(100%);
    transition: transform 0.55s ease-in;
    @media (min-width: 768px) {
      grid-column-start: 10;
      grid-column-end: 13;
      grid-row-start: 1;
      grid-row-end: 10;
      transition: none;
      transform: translateX(0%);
    }
  }
  .open {
    transform: translateX(0%);
  }
  main {
    grid-column-start: 1;
    grid-column-end: 13;
    grid-row-start: 2;
    grid-row-end: 10;
    @media (min-width: 768px) {
      grid-column-start: 1;
      grid-column-end: 10;
      grid-row-start: 2;
      grid-row-end: 10;
    }
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

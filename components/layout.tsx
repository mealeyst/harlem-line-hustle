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
          <a className='menu-toggle' onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? 'Close Menu' : 'Open Menu'}
            <span />
            <span />
            <span />
          </a>
          <Navigation
            className={menuOpen ? 'open' : ''}
            navigation={navigation}
            setMenuOpen={setMenuOpen}
          />
          <main>{children}</main>
          <Footer />
        </div>
      </>
    )
  },
)`
  column-gap: 20px;
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: repeat(9, 1fr);
  height: 100vh;
  max-height: 100%;
  margin: 0 auto;
  max-width: 1920px;
  overflow: hidden;
  position: relative;

  .menu-toggle {
    align-items: center;
    display: flex;
    flex-direction: column;
    font-size: 0;
    height: 40px;
    justify-content: center;
    position: absolute;
    right: 20px;
    top: 20px;
    width: 40px;
    z-index: 10;

    span {
      background-color: ${colors.text};
      height: 3px;
      margin-top: 5px;
      width: 30px;
    }
  }

  @media (min-width: 768px) {
    .menu-toggle {
      display: none;
    }
  }
  ${Header} {
  }
  ${Navigation} {
    grid-column: 2 / 13;
    grid-row: 2 / 9;
    transform: translateX(100%);
    transition: transform 0.55s ease-in;
    z-index: 1;

    @media (min-width: 768px) {
      grid-column: 10 / 13;
      transform: translateX(0%);
      transition: none;
    }
  }

  .open {
    transform: translateX(1px);
  }

  main {
    grid-column: 1 / 13;
    grid-row: 2 / 9;
    overflow-y: scroll;
    padding-top: 1.35rem;
    padding-bottom: 1.35rem;

    @media (min-width: 768px) {
      grid-column: 1 / 10;
    }

    > * {
      padding-left: 20px;
      padding-right: 20px;
    }

    &::-webkit-scrollbar-track {
      background-color: transparent;
      border-radius: 10px;
    }

    &::-webkit-scrollbar {
      background-color: transparent;
      max-height: 6px;
      max-width: 6px;
    }

    &::-webkit-scrollbar-thumb {
      background-color: ${colors.red[4]};
      border-radius: 10px;
    }
  }
`

import Footer from './footer'
import Meta from './meta'
import { GlobalStyle } from '../styles/globalStyles'
import { Navigation, INavigation } from './navigation'
import { Header } from './header'
import styled from 'styled-components'
import { ReactNode } from 'react'

type LayoutProps = INavigation & {
  className?: string
  children: ReactNode
}

export const Layout = styled(
  ({ className, children, navigation }: LayoutProps) => {
    return (
      <>
        <GlobalStyle />
        <Meta />
        <div className={className}>
          <Header />
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
  ${Header} {
    grid-column-start: 1;
    grid-column-end: 10;
  }
  ${Navigation} {
    grid-column-start: 10;
    grid-column-end: 13;
    grid-row-start: 2;
    grid-row-end: 10;
    border: 1px solid red;
    min-height: 100%;
  }
  main {
    grid-column-start: 1;
    grid-column-end: 10;
    grid-row-start: 2;
    grid-row-end: 10;
    overflow-y: scroll;
  }
`

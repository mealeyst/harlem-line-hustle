import styled, { keyframes } from 'styled-components'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { ReactNode, useState } from 'react'
import { colors } from '../styles/colors'

type Link = {
  children: ReactNode
  href: string
}

export type INavigation = { navigation: Link[] }

type NavigationProps = INavigation & {
  className?: string
  setMenuOpen: (open: boolean) => void
}

const pulse = keyframes`
  0%{
    transform: translateY(-50%) scale(100%);
  }
  50% {
    transform: translateY(-50%) scale(200%);
  }
  100%{
    transform: translateY(-50%) scale(100%);
  }
`

export const Navigation = styled(
  ({ className, navigation, setMenuOpen }: NavigationProps) => {
    const router = useRouter()
    return (
      <nav className={className}>
        <ul>
          {navigation.map(({ children, href }) => {
            return (
              <li>
                <Link
                  className={router.asPath === href ? 'current' : undefined}
                  onClick={() => setMenuOpen(false)}
                  href={href}
                >
                  {children}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>
    )
  },
)`
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;
  position: relative;
  width: 100%;

  ul {
    align-items: flex-end;
    display: flex;
    flex-direction: column;
    list-style: none;
    margin: 0;
    padding-right: 10px;
    z-index: 2;

    &::after {
      background-color: ${colors.grey[5]};
      content: '';
      height: 100%;
      position: absolute;
      right: 10px;
      top: 0;
      width: 1px;
      z-index: 1;
    }

    @media only screen and (max-width: 768px) {
      backdrop-filter: blur(5px);
      background: rgb(13 16 19 / 95%);
      height: 100%;
      justify-content: center;
    }
  }

  li {
    align-items: center;
    height: 60px;

    a {
      align-items: center;
      color: ${colors.text};
      display: flex;
      padding-right: 20px;
      position: relative;
      text-decoration: none;
      text-transform: uppercase;
      font-family: 'Merriweather Sans', sans-serif;

      @media (max-width: 768px) {
        font-size: 1.1rem;
      }

      &.current {
        padding-right: 40px;

        &::before {
          animation: ${pulse} 3s ease infinite;
          border: 1px solid ${colors.grey[0]};
          border-radius: 100%;
          content: '';
          display: block;
          height: 7px;
          position: absolute;
          right: -3px;
          top: 50%;
          transform: translateY(-50%);
          width: 7px;
          z-index: 2;
        }

        &::after {
          background-color: ${colors.grey[0]};
        }
      }

      &::after {
        background-color: ${colors.grey[3]};
        border-radius: 100%;
        content: '';
        display: block;
        height: 7px;
        position: absolute;
        right: -3px;
        top: 50%;
        transform: translateY(-50%);
        width: 7px;
        z-index: 2;
      }
    }
  }
`

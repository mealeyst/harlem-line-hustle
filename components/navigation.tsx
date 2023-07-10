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
  ({ className, navigation }: NavigationProps) => {
    const router = useRouter()
    return (
      <nav className={className}>
        <ul>
          {navigation.map(({ children, href }) => {
            return (
              <li>
                <Link
                  className={router.asPath === href ? 'current' : undefined}
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
  justify-content: center;
  position: relative;
  width: 100%;
  height: 100%;
  .menuToggle {
    font-size: 0;
    position: absolute;
    height: 60px;
    width: 60px;
    display: flex;
    z-index: 10;
    top: 10px;
    left: 10px;
    flex-direction: column;
    align-items: center;
    @media only screen and (min-width: 769px) {
      display: none;
    }
    span {
      height: 4px;
      background-color: ${colors.text};
      width: 40px;
      margin-bottom: 8px;
    }
  }
  ul {
    display: flex;
    flex-direction: column;
    list-style: none;
    align-items: flex-end;
    margin: 0;
    padding-right: 10px;
    z-index: 2;
    &:after {
      content: '';
      height: 100%;
      width: 1px;
      background-color: ${colors.grey[5]};
      position: absolute;
      top: 0;
      right: 10px;
      z-index: 1;
    }
    @media only screen and (max-width: 768px) {
      background: rgba(13, 16, 19, 0.95);
      backdrop-filter: blur(5px);
      height: 100%;
      justify-content: center;
    }
  }
  li {
    height: 60px;
    align-items: center;
    a {
      color: ${colors.text};
      text-decoration: none;
      text-transform: uppercase;
      display: flex;
      align-items: center;
      padding-right: 20px;
      position: relative;
      @media (max-width: 768px) {
        font-size: 1.5rem;
      }
      &.current {
        padding-right: 40px;
        &:before {
          position: absolute;
          right: -3px;
          top: 50%;
          transform: translateY(-50%);
          content: '';
          display: block;
          border-radius: 100%;
          border: 1px solid ${colors.grey[0]};
          height: 7px;
          width: 7px;
          z-index: 2;
          animation: ${pulse} 3s ease infinite;
        }
        &:after {
          background-color: ${colors.grey[0]};
        }
      }
      &:after {
        position: absolute;
        right: -3px;
        top: 50%;
        transform: translateY(-50%);
        content: '';
        display: block;
        border-radius: 100%;
        background-color: ${colors.grey[3]};
        height: 7px;
        width: 7px;
        z-index: 2;
      }
    }
  }
`

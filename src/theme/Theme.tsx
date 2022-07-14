import React, { FC, ReactChild } from 'react';
import { createGlobalStyle, css, ThemeProvider } from 'styled-components';
import { color } from './color';
import { spacing } from './spacing';
import { Join, PathsToStringProps } from './types';

const minWidthQuery = (minWidth: number) => `@media (min-width: ${minWidth}px)`

export const THEME = {
  baseFontSize: 16,
  breakpoints: {
    sm: minWidthQuery(480),
    md: minWidthQuery(768),
    lg: minWidthQuery(1024),
    xl: minWidthQuery(1200),
  },
  colors: {
    primary: {
     '50' : 'hsl(129, 53%, 90%)',
     '100': 'hsl(141, 45%, 81%)',
     '200': 'hsl(147, 43%, 71%)',
     '300': 'hsl(150, 42%, 62%)',
     '400': 'hsl(152, 41%, 52%)',
     '500': 'hsl(153, 39%, 41%)',
     '600': 'hsl(153, 40%, 30%)',
     '700': 'hsl(155, 43%, 18%)',
     '800': 'hsl(159, 56%, 7%)',
     '900': 'hsl(205, 52%, 6%)',
    },
    secondary: {
      '50': 'hsl(201, 50%, 90%)',
      '100': 'hsl(201, 50%, 84%)',
      '200': 'hsl(202, 50%, 77%)',
      '300': 'hsl(201, 50%, 71%)',
      '400': 'hsl(201, 50%, 58%)',
      '500': 'hsl(201, 50%, 45%)',
      '600': 'hsl(201, 50%, 39%)',
      '700': 'hsl(201, 50%, 26%)',
      '800': 'hsl(200, 51%, 13%)',
      '900': 'hsl(201, 52%, 6%)',
    }
  },
  fonts: {
    inter: '"Inter", sans-serif'
  },
  spacing: [
    0,
    0.5,
    1,
    1.5,
    2,
    2.5,
    3,
    3.5,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
    14,
    16,
    20,
    24,
    28,
    32,
    36,
    40,
    44,
    48,
    52,
    56,
    60,
    64,
    72,
    80,
    96,
  ],
}

export type Theme = typeof THEME

export type ColorSetKey = keyof Theme['colors']

export type ColorSet<T extends ColorSetKey = ColorSetKey> = Theme['colors'][T]

export type ColorKey<T extends ColorSet = ColorSet> = T extends ColorSet
  ? keyof T
  : never

export type ColorPath = Join<PathsToStringProps<Theme['colors']>, '.'>

export type BreakpointPath = Join<PathsToStringProps<Theme['breakpoints']>, '.'>

declare module 'styled-components' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface,@typescript-eslint/no-unused-vars
  interface DefaultTheme extends Theme {}
}

export const GlobalStyles = createGlobalStyle`
  * {
    box-sizing: border-box;
  }
  html {
    font-family: 'Inter', sans-serif;
    height: 100vh;
  }
  body {
    background-color: #081219;
    position: relative;
    height: 100%;
    box-sizing: border-box;
    color: #74c69d;
    font-family: "Inter", sans-serif;
    text-shadow: 0 0 2px #74c69d;
    cursor: url("${process.env.PUBLIC_URL}/cursor.svg"), url("${process.env.PUBLIC_URL}/cursor.png"), default;
  }
  hr {
    width: 100%;
    background-color: ${color('primary.500')};
    height: 1px;
    border: none;
  }
  ${THEME.spacing.map(
    (space) =>
      css`
        .mt-${space} {
          margin-top: ${spacing(space)};
        }
        .ml-${space} {
          margin-left: ${spacing(space)};
        }
        .mr-${space} {
          margin-right: ${spacing(space)};
        }
        .mb-${space} {
          margin-bottom: ${spacing(space)};
        }
        .pt-${space} {
          padding-top: ${spacing(space)};
        }
        .pl-${space} {
          padding-left: ${spacing(space)};
        }
        .pr-${space} {
          padding-right: ${spacing(space)};
        }
        .pb-${space} {
          padding-bottom: ${spacing(space)};
        }
      `
  )}
`

interface Props {
  children: ReactChild | JSX.Element[]
}

export const GlowTheme: FC<Props> = ({ children }) => (
  <ThemeProvider theme={THEME}>
    <GlobalStyles />
    {children}
  </ThemeProvider>
)
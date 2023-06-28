import { createGlobalStyle } from 'styled-components'
import { colors } from './colors'


export const GlobalStyle = createGlobalStyle<{ $whiteColor?: boolean; }>`
  html, body {
    background-color: ${colors.background};
    color: ${colors.text};
  }
`
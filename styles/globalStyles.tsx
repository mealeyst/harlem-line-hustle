import { createGlobalStyle } from 'styled-components'
import { colors } from './colors'

export const GlobalStyle = createGlobalStyle<{ $whiteColor?: boolean }>`
  @import url('https://fonts.googleapis.com/css2?family=Work+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap');
  html, body {
    background-color: ${colors.background};
    color: ${colors.text};
    font-family: 'Work Sans', sans-serif;
  }
`
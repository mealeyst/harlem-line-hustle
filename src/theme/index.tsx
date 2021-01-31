import { ThemeProvider } from 'styled-components';  
import { ImportFonts } from './typography'
import * as Accessibility from './accessibility'
import { animation } from './animation'
import * as Color from './colors'
import * as Background from './background'
import * as Border from './border'
import * as Layout from './layout'
import * as Sizing from './sizing'
import * as Spacing from './spacing'

const theme = {
  Accessibility,
  animation,
  Background,
  Border,
  Color,
  Layout,
  Sizing,
  Spacing
}

export default theme
export const ThemeDecorator = ({children}) => {
  return (
    <ThemeProvider theme={theme}>
      <ImportFonts />
      {children}
    </ThemeProvider>
  )
}
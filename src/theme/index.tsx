import { ThemeProvider } from 'styled-components';  
import { ImportFonts } from './typography'
import { accessibility } from './accessibility'
import { animation } from './animation'
import background from './background'
import { border } from './border'
import * as Sizing from './sizing'
import * as Spacing from './spacing'

const theme = {
  accessibility,
  animation,
  background,
  border,
  ...Sizing,
  ...Spacing
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
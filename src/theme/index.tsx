import { ThemeProvider } from 'styled-components';  
import { ImportFonts } from './typography'
import { accessibility } from './accessibility'
import { animation } from './animation'
export * as Background from './background'
export * as Border from './border'
export * as Color from './colors'
export * as Sizing from './sizing'
export * as Spacing from './spacing'

// const theme = {
//   accessibility,
//   animation,
//   background,
//   border,
//   ...Sizing,
//   ...Spacing
// }

const theme = {}

export const ThemeDecorator = ({children}) => {
  return (
    <ThemeProvider theme={theme}>
      <ImportFonts />
      {children}
    </ThemeProvider>
  )
}
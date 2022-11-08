// import { get } from 'lodash'
// import { Theme, ColorPath, THEME } from './Theme'
// import { GetFieldType } from './types'

// const getColor = <T extends ColorPath>(
//   theme: Theme,
//   colorPath: ColorPath
// ): GetFieldType<Theme['colors'], T> => get(THEME.colors, colorPath)

// export const color = <T extends ColorPath>(colorPath: T, opacity?: number) =>
// ({theme }: any) => {
//   if(opacity) {
//     const hsl_regex = /hsl\(\s*(\d+)\s*,\s*(\d+)%\s*,\s*(\d+)%\s*\)/
//     const args = hsl_regex.exec(getColor<T>(theme, colorPath))
//     if(args) {
//       return `hsla(${args[1]}, ${args[2]}%, ${args[3]}%, ${opacity})`
//     }
//   }
//   return getColor<T>(theme, colorPath)
// }

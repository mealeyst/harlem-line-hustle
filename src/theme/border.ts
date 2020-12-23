import colors from './colors'
import { sizes } from './sizing'

const borderSizeKeys = [0, 0.1, 0.5]

export const border = {
  color: (()=> {
    const output = {}
    Object.keys(colors).forEach((name) => {
      const color = colors[name]
      output[name] = {}
      Object.keys(color).forEach((shade) => {
        output[name][shade] = `border-color: ${colors[name][shade]};`
      })
    })
    return output
  })(),
  width: ((key: typeof borderSizeKeys) => {
    return `border-width: ${sizes[`${key}`]};`
  })
}
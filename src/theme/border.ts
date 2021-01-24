import getColor, { ColorKeys, ShadeKeys} from './colors'
import { sizes } from './sizing'

const borderSizeKeys = [0, 0.1, 0.5]

export const border = {
  color: (colorName: ColorKeys, shade?:  ShadeKeys) => {
    return  `border-color: ${getColor(colorName, shade)};`
  },
  width: ((key: typeof borderSizeKeys): string => {
    return `border-width: ${sizes[`${key}`]};`
  })
}
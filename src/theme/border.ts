import getColor, { COLOR_NAMES, COLOR_SHADES, COLOR_GRAY_SHADES} from './colors'
import { SIZES, getSize } from './sizing'

export const border = {
  color: (colorName: COLOR_NAMES, shade?:  COLOR_SHADES | COLOR_GRAY_SHADES) => {
    return  `border-color: ${getColor(colorName, shade)};`
  },
  width: (...args: SIZES[]) => {
    return `border-width: ${args.map(arg => getSize(arg)).join(' ')};`
  }
}
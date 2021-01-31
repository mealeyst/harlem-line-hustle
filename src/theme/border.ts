import getColor, { COLOR_NAMES, COLOR_SHADES, COLOR_GRAY_SHADES} from './colors'
import { SIZES, getSize } from './sizing'


export const color = (colorName: COLOR_NAMES, shade?:  COLOR_SHADES | COLOR_GRAY_SHADES) => {
  return  `border-color: ${getColor(colorName, shade)};`
}
export const width = (...args: SIZES[]) => {
  return `border-width: ${args.map(arg => getSize(arg)).join(' ')};`
}
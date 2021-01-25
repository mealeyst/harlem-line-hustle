import getColor, { COLOR_NAMES, COLOR_SHADES, COLOR_GRAY_SHADES} from './colors'
import { SIZES, getSize, computeRem } from './sizing'

const radiuses = {
  none: 0,
  sm: 2,
  default: 4,
  md: 6,
  lg: 8,
  xl: 12,
  '2xl': 16,
  '3xl': 24
}

export const radius = (borderType) => {
  const borderRegex = /([1-3A-Z]+)/g
  const results = borderType.match(borderRegex)
  console.log(results)
  
}

export enum BORDER_RADIUS {
  ROUNDED_NONE,
  ROUNDED_SM,
  ROUNDED,
  ROUNDED_MD,
  ROUNDED_LG,
  ROUNDED_XL,
  ROUNDED_2XL,
  ROUNDED_3XL,
  ROUNDED_FULL,
  ROUNDED_T_NONE,
  ROUNDED_R_NONE,
  ROUNDED_B_NONE,
  ROUNDED_L_NONE,
  ROUNDED_T_SM,
  ROUNDED_R_SM,
  ROUNDED_B_SM,
  ROUNDED_L_SM,
  ROUNDED_T,
  ROUNDED_R,
  ROUNDED_B,
  ROUNDED_L,
  ROUNDED_T_MD,
  ROUNDED_R_MD,
  ROUNDED_B_MD,
  ROUNDED_L_MD,
  ROUNDED_T_LG,
  ROUNDED_R_LG,
  ROUNDED_B_LG,
  ROUNDED_L_LG,
  ROUNDED_T_XL,
  ROUNDED_R_XL,
  ROUNDED_B_XL,
  ROUNDED_L_XL,
  ROUNDED_T_2XL,
  ROUNDED_R_2XL,
  ROUNDED_B_2XL,
  ROUNDED_L_2XL,
  ROUNDED_T_3XL,
  ROUNDED_R_3XL,
  ROUNDED_B_3XL,
  ROUNDED_L_3XL,
  ROUNDED_T_FULL,
  ROUNDED_R_FULL,
  ROUNDED_B_FULL,
  ROUNDED_L_FULL,
  ROUNDED_TL_NONE,
  ROUNDED_TR_NONE,
  ROUNDED_BR_NONE,
  ROUNDED_BL_NONE,
  ROUNDED_TL_SM,
  ROUNDED_TR_SM,
  ROUNDED_BR_SM,
  ROUNDED_BL_SM,
  ROUNDED_TL,
  ROUNDED_TR,
  ROUNDED_BR,
  ROUNDED_BL,
  ROUNDED_TL_MD,
  ROUNDED_TR_MD,
  ROUNDED_BR_MD,
  ROUNDED_BL_MD,
  ROUNDED_TL_LG,
  ROUNDED_TR_LG,
  ROUNDED_BR_LG,
  ROUNDED_BL_LG,
  ROUNDED_TL_XL,
  ROUNDED_TR_XL,
  ROUNDED_BR_XL,
  ROUNDED_BL_XL,
  ROUNDED_TL_2XL,
  ROUNDED_TR_2XL,
  ROUNDED_BR_2XL,
  ROUNDED_BL_2XL,
  ROUNDED_TL_3XL,
  ROUNDED_TR_3XL,
  ROUNDED_BR_3XL,
  ROUNDED_BL_3XL,
  ROUNDED_TL_FULL,
  ROUNDED_TR_FULL,
  ROUNDED_BR_FULL,
  ROUNDED_BL_FULL
}

export const color = (colorName: COLOR_NAMES, shade?:  COLOR_SHADES | COLOR_GRAY_SHADES) => {
  return  `border-color: ${getColor(colorName, shade)};`
}

export const width = (...args: SIZES[]) => {
  return `border-width: ${args.map(arg => getSize(arg)).join(' ')};`
}
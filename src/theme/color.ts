import { StyledProps } from 'styled-components'
import { get } from 'lodash'
import { Theme, ColorPath } from './Theme'
import { GetFieldType } from './types'

const getColor = <T extends ColorPath>(
  theme: Theme,
  colorPath: ColorPath
): GetFieldType<Theme['colors'], T> => get(theme.colors, colorPath)

export const color = <T extends ColorPath>(colorPath: T) => ({
  theme,
}: StyledProps<unknown>) => getColor<T>(theme, colorPath)

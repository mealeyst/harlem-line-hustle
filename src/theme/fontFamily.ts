import { StyledProps } from 'styled-components'
import { Theme } from './Theme'

type FontFamilyPath = keyof Theme['fonts']

export const fontFamily = <T extends FontFamilyPath>(font: T) => ({
  theme,
}: StyledProps<unknown>): Theme['fonts'][T] => theme.fonts[font]

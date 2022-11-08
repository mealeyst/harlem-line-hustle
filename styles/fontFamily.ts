import { Theme } from './theme'

type FontFamilyPath = keyof Theme['fonts']

export const fontFamily = <T extends FontFamilyPath>(font: T) => ({
  theme,
}: any): Theme['fonts'][T] => theme.fonts[font]

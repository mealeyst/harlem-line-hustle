import { THEME } from './theme'
import { rem } from './rem'

type Spacings = typeof THEME['spacing'][number]

export const spacing = (
  ...values: Spacings[]
): (({ theme }: any ) => string) => ({
  theme
}): string => {
  const result = values
    .map((value) => rem(theme.baseFontSize * (value * 0.25))({ theme }))
    .join(' ')
  return result
}

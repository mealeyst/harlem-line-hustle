import { StyledProps } from 'styled-components'

import { THEME } from './Theme'
import { rem } from './rem'

type Spacings = typeof THEME['spacing'][number]

export const spacing = (
  ...values: Spacings[]
): (({ theme }: StyledProps<unknown>) => string) => ({
  theme,
}: StyledProps<unknown>): string => {
  const result = values
    .map((value) => rem(theme.baseFontSize * (value * 0.25))({ theme }))
    .join(' ')
  return result
}

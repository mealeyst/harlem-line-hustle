import { StyledProps } from 'styled-components'

export const rem = (...values: Array<number | 'auto'>) => ({
  theme,
}: StyledProps<unknown>) =>
  values
    .map((n) => (n === 'auto' ? n : `${n / theme.baseFontSize}rem`))
    .join(' ')

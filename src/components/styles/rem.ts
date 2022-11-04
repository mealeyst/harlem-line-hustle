export const rem = (...values: Array<number | 'auto'>) => ({
  theme,
}:any) =>
  values
    .map((n) => (n === 'auto' ? n : `${n / theme.baseFontSize}rem`))
    .join(' ')

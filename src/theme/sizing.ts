const baseSize = 16

const computeRem = (size: number) => `${size / baseSize}rem`

const computePercent = (size: number) => `${size * 100}%`

export const sizes  = {
  0: computeRem(0),
  0.1: computeRem(1),
  0.5: computeRem(2),
  1: computeRem(4),
  1.5: computeRem(6),
  2: computeRem(12),
  2.5: computeRem(10),
  3: computeRem(12),
  3.5: computeRem(14),
  4: computeRem(16),
  5: computeRem(20),
  6: computeRem(24),
  7: computeRem(28),
  8: computeRem(32),
  9: computeRem(36),
  10: computeRem(40),
  11: computeRem(44),
  12: computeRem(48),
  14: computeRem(56),
  16: computeRem(64),
  24: computeRem(96),
  28: computeRem(112),
  32: computeRem(128),
  36: computeRem(144),
  40: computeRem(160),
  44: computeRem(176),
  48: computeRem(192),
  52: computeRem(208),
  56: computeRem(224),
  60: computeRem(240),
  64: computeRem(256),
  72: computeRem(288),
  80: computeRem(320),
  96: computeRem(384),
  half: computePercent(1/2),
  third: computePercent(1/3),
  two_thirds: computePercent(2/3),
  quarter: computePercent(1/4),
  two_fourths: computePercent(2/4),
  three_fourths: computePercent(3/4),
  fifth: computePercent(1/5),
  two_fifths: computePercent(2/5),
  three_fifths: computePercent(3/5),
  four_fifths: computePercent(4/5),
  sixth: computePercent(1/6),
  two_sixths: computePercent(2/6),
  three_sixths: computePercent(3/6),
  four_sixths: computePercent(4/6),
  five_sixths: computePercent(5/6),
  twelfth: computePercent(1/12),
  two_twelfths: computePercent(2/12),
  three_twelfths: computePercent(3/12),
  four_twelfths: computePercent(4/12),
  five_twelfths: computePercent(5/12),
  six_twelfths: computePercent(6/12),
  seven_twelfths: computePercent(7/12),
  eight_twelfths: computePercent(8/12),
  nine_twelfths: computePercent(9/12),
  ten_twelfths: computePercent(10/12),
  eleven_twelfths: computePercent(11/12),
  full: computePercent(1)
}

type SizeKey = keyof typeof sizes

export const SizeKeys = Object.keys(sizes)

export const getSize = (key: SizeKey): string => sizes[key]

const sizing = (type: string) => (width: SizeKey) => {
  return `${type}: ${getSize(width)};`
}

export const width = sizing('width')
export const height = sizing('height')
export const minWidth = sizing('min-width')
export const maxWidth = sizing('max-width')
export const minHeight = sizing('min-height')
export const maxHeight = sizing('max-height')
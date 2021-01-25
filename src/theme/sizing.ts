const baseSize = 16

export const computeRem = (size: number) => `${size / baseSize}rem`

export const computePercent = (size: number) => `${size * 100}%`

export enum SIZES {
  S0,
  S0_1,
  S0_5,
  S1,
  S1_5,
  S2,
  S2_5,
  S3,
  S3_5,
  S4,
  S5,
  S6,
  S7,
  S8,
  S9,
  S10,
  S11,
  S12,
  S14,
  S16,
  S24,
  S28,
  S32,
  S36,
  S40,
  S44,
  S48,
  S52,
  S56,
  S60,
  S64,
  S72,
  S80,
  S96,
  HALF,
  THIRD,
  TWO_THIRDS,
  QUARTER,
  TWO_FOURTHS,
  THREE_FOURTHS,
  FIFTH,
  TWO_FIFTHS,
  THREE_FIFTHS,
  FOUR_FIFTHS,
  SIXTH,
  TWO_SIXTHS,
  THREE_SIXTHS,
  FOUR_SIXTHS,
  FIVE_SIXTHS,
  TWELFTH,
  TWO_TWELFTHS,
  THREE_TWELFTHS,
  FOUR_TWELFTHS,
  FIVE_TWELFTHS,
  SIX_TWELTHS,
  SEVEN_TWELTHS,
  EIGHT_TWELFTHS,
  NINE_TWELFTHS,
  TEN_TWELFTHS,
  ELEVEN_TWELTHS,
  FULL
}

type SizeInterface = {
  [size in SIZES]: string
}
export const sizeValues: SizeInterface  = {
  [SIZES.S0]: computeRem(0),
  [SIZES.S0_1]: computeRem(1),
  [SIZES.S0_5]: computeRem(2),
  [SIZES.S1]: computeRem(4),
  [SIZES.S1_5]: computeRem(6),
  [SIZES.S2]: computeRem(8),
  [SIZES.S2_5]: computeRem(10),
  [SIZES.S3]: computeRem(12),
  [SIZES.S3_5]: computeRem(14),
  [SIZES.S4]: computeRem(16),
  [SIZES.S5]: computeRem(20),
  [SIZES.S6]: computeRem(24),
  [SIZES.S7]: computeRem(28),
  [SIZES.S8]: computeRem(32),
  [SIZES.S9]: computeRem(36),
  [SIZES.S10]: computeRem(40),
  [SIZES.S11]: computeRem(44),
  [SIZES.S12]: computeRem(48),
  [SIZES.S14]: computeRem(56),
  [SIZES.S16]: computeRem(64),
  [SIZES.S24]: computeRem(96),
  [SIZES.S28]: computeRem(112),
  [SIZES.S32]: computeRem(128),
  [SIZES.S36]: computeRem(144),
  [SIZES.S40]: computeRem(160),
  [SIZES.S44]: computeRem(176),
  [SIZES.S48]: computeRem(192),
  [SIZES.S52]: computeRem(208),
  [SIZES.S56]: computeRem(224),
  [SIZES.S60]: computeRem(240),
  [SIZES.S64]: computeRem(256),
  [SIZES.S72]: computeRem(288),
  [SIZES.S80]: computeRem(320),
  [SIZES.S96]: computeRem(384),
  [SIZES.HALF]: computePercent(1/2),
  [SIZES.THIRD]: computePercent(1/3),
  [SIZES.TWO_THIRDS]: computePercent(2/3),
  [SIZES.QUARTER]: computePercent(1/4),
  [SIZES.TWO_FOURTHS]: computePercent(2/4),
  [SIZES.THREE_FOURTHS]: computePercent(3/4),
  [SIZES.FIFTH]: computePercent(1/5),
  [SIZES.TWO_FIFTHS]: computePercent(2/5),
  [SIZES.THREE_FIFTHS]: computePercent(3/5),
  [SIZES.FOUR_FIFTHS]: computePercent(4/5),
  [SIZES.SIXTH]: computePercent(1/6),
  [SIZES.TWO_SIXTHS]: computePercent(2/6),
  [SIZES.THREE_SIXTHS]: computePercent(3/6),
  [SIZES.FOUR_SIXTHS]: computePercent(4/6),
  [SIZES.FIVE_SIXTHS]: computePercent(5/6),
  [SIZES.TWELFTH]: computePercent(1/12),
  [SIZES.TWO_TWELFTHS]: computePercent(2/12),
  [SIZES.THREE_TWELFTHS]: computePercent(3/12),
  [SIZES.FOUR_TWELFTHS]: computePercent(4/12),
  [SIZES.FIVE_TWELFTHS]: computePercent(5/12),
  [SIZES.SIX_TWELTHS]: computePercent(6/12),
  [SIZES.SEVEN_TWELTHS]: computePercent(7/12),
  [SIZES.EIGHT_TWELFTHS]: computePercent(8/12),
  [SIZES.NINE_TWELFTHS]: computePercent(9/12),
  [SIZES.TEN_TWELFTHS]: computePercent(10/12),
  [SIZES.ELEVEN_TWELTHS]: computePercent(11/12),
  [SIZES.FULL]: computePercent(1)
}


export const getSize = (key: SIZES): string => sizeValues[key]

const sizing = (type: string) => (width: SIZES) => {
  return `${type}: ${getSize(width)};`
}

export const width = sizing('width')
export const height = sizing('height')
export const minWidth = sizing('min-width')
export const maxWidth = sizing('max-width')
export const minHeight = sizing('min-height')
export const maxHeight = sizing('max-height')
import spacing from './spacing'

export enum Sizing {
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
  SIX_TWELFTHS,
  SEVEN_TWELFTHS,
  EIGHT_TWELFTHS,
  NINE_TWELFTHS,
  TEN_TWELFTHS,
  ELEVEN_TWELFTHS,
  FULL
}

export const sizes: {[key in Sizing]: number} = {
  [Sizing.HALF]: 1/2,
  [Sizing.THIRD]: 1/3,
  [Sizing.TWO_THIRDS]: 2/3,
  [Sizing.QUARTER]: 1/4,
  [Sizing.TWO_FOURTHS]: 2/4,
  [Sizing.THREE_FOURTHS]: 3/4,
  [Sizing.FIFTH]: 1/5,
  [Sizing.TWO_FIFTHS]: 2/5,
  [Sizing.THREE_FIFTHS]: 3/5,
  [Sizing.FOUR_FIFTHS]: 4/5,
  [Sizing.SIXTH]: 1/6,
  [Sizing.TWO_SIXTHS]: 2/6,
  [Sizing.THREE_SIXTHS]: 3/6,
  [Sizing.FOUR_SIXTHS]: 4/6,
  [Sizing.FIVE_SIXTHS]: 5/6,
  [Sizing.TWELFTH]: 1/12,
  [Sizing.TWO_TWELFTHS]: 2/12,
  [Sizing.THREE_TWELFTHS]: 3/12,
  [Sizing.FOUR_TWELFTHS]: 4/12,
  [Sizing.FIVE_TWELFTHS]: 5/12,
  [Sizing.SIX_TWELFTHS]: 6/12,
  [Sizing.SEVEN_TWELFTHS]: 7/12,
  [Sizing.EIGHT_TWELFTHS]: 8/12,
  [Sizing.NINE_TWELFTHS]: 9/12,
  [Sizing.TEN_TWELFTHS]: 10/12,
  [Sizing.ELEVEN_TWELFTHS]: 11/12,
  [Sizing.FULL]: 1
}

export default (() => {
  const sizingObject = {}
  Object.keys(sizes).forEach((index) => { 
    sizingObject[index] = `${(sizes[index] * 100)}%`
  });
  return {
    ...sizingObject,
    ...spacing
  }
})()
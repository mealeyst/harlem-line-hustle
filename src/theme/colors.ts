export enum Shades {
  lightest = 'lightest',
  lighter = 'lighter',
  light = 'light',
  default = 'default',
  dark = 'dark',
  darker = 'darker',
  darkest = 'darkest'
}

export enum Colors {
  blue = 'blue',
  orange = 'orange',
  green = 'green',
  black = 'black',
  white = 'white'
}

export type ColorKeys = keyof typeof Colors

interface ShadeInterface {
  lightest: string,
  lighter: string,
  light: string,
  default: string,
  dark: string,
  darker: string,
  darkest: string
}

export type ShadeKeys = keyof ShadeInterface

interface ColorsInterface {
  [Colors.blue]: {
    [shade in keyof ShadeInterface]: string
  },
  [Colors.orange]: {
    [shade in keyof ShadeInterface]: string
  },
  [Colors.green]: {
    [shade in keyof ShadeInterface]: string
  },
  [Colors.black]: {
    [shade in keyof ShadeInterface]: string
  },
  [Colors.white]: {
    [shade in keyof ShadeInterface]: string
  }
}

const colors: ColorsInterface = {
  blue: {
    lightest: 'hsl(224, 98%, 40%)',
    lighter: 'hsl(224, 98%, 32%)',
    light: 'hsl(224, 98%, 24%)',
    default: 'hsl(224, 98%, 16%)',
    dark: 'hsl(224, 97%, 12%)',
    darker: 'hsl(225, 95%, 8%)',
    darkest: 'hsl(227, 90%, 4%)',
  },
  orange: {
    lightest: 'hsl(24, 100%, 80%)',
    lighter: 'hsl(24, 100%, 70%)',
    light: 'hsl(24, 100%, 60%)',
    default: 'hsl(24, 100%, 50%)',
    dark: 'hsl(24, 100%, 40%)',
    darker: 'hsl(24, 100%, 30%)',
    darkest: 'hsl(24, 100%, 20%)',
  },
  green: {
    lightest: 'hsl(120, 90%, 96%)',
    lighter: 'hsl(122, 90%, 92%)',
    light: 'hsl(121, 90%, 88%)',
    default: 'hsl(121, 90%, 81%)',
    dark: 'hsl(120, 90%, 68%)',
    darker: 'hsl(120, 90%, 48%)',
    darkest: 'hsl(120, 90%, 32%)',
  },
  black: {
    lightest: 'hsl(233, 12%, 56%)',
    lighter: 'hsl(234, 12%, 48%)',
    light: 'hsl(233, 12%, 40%)',
    dark: 'hsl(231, 12%, 32%)',
    darker: 'hsl(230, 12%, 20%)',
    darkest: 'hsl(231, 11%, 12%)',
    default: 'hsl(228, 12%, 8%)'
  },
  white: {
    default: 'hsl(206, 70%, 96%)',
    lightest: 'hsl(205, 71%, 92%)',
    lighter: 'hsl(205, 70%, 88%)',
    light: 'hsl(205, 70%, 84%)',
    dark: 'hsl(205, 70%, 80%)',
    darker: 'hsl(205, 70%, 76%)',
    darkest: 'hsl(205, 70%, 72%)'
  }
}

export default (color: ColorKeys, shade?: ShadeKeys) => {
  if (shade) {
    return colors[color][shade]
  } else {
    return colors[color].default
  }
}
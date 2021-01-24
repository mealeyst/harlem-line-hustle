export enum COLOR_SHADES {
  LIGHTEST = 'lightest',
  LIGHTER = 'lighter',
  LIGHT = 'light',
  DEFAULT = 'default',
  DARK = 'dark',
  DARKER = 'darker',
  DARKEST = 'darkest'
}

export enum COLOR_GRAY_SHADES {
  WHITE = 'white',
  GRAY_1 = 'gray1',
  GRAY_2 = 'gray2',
  GRAY_3 = 'gray3',
  GRAY_4 = 'gray4',
  DEFAULT = 'default',
  GRAY_6 = 'gray6',
  GRAY_7 = 'gray7',
  GRAY_8 = 'gray8',
  BLACK = 'black'
}

export enum COLOR_NAMES {
  BLUE,
  ORANGE,
  GREEN,
  GRAYS
}

interface ColorShadeInterface {
  [COLOR_SHADES.LIGHTEST]: string,
  [COLOR_SHADES.LIGHTER]: string,
  [COLOR_SHADES.LIGHT]: string,
  [COLOR_SHADES.DEFAULT]: string,
  [COLOR_SHADES.DARK]: string,
  [COLOR_SHADES.DARKER]: string,
  [COLOR_SHADES.DARKEST]: string
}

interface GrayShadeInterface {
  [COLOR_GRAY_SHADES.GRAY_1]: string
  [COLOR_GRAY_SHADES.GRAY_2]: string
  [COLOR_GRAY_SHADES.GRAY_3]: string
  [COLOR_GRAY_SHADES.GRAY_4]: string
  [COLOR_GRAY_SHADES.DEFAULT]: string
  [COLOR_GRAY_SHADES.GRAY_6]: string
  [COLOR_GRAY_SHADES.GRAY_7]: string
  [COLOR_GRAY_SHADES.GRAY_8]: string
  [COLOR_GRAY_SHADES.WHITE]: string
  [COLOR_GRAY_SHADES.BLACK]: string
}

interface ColorsInterface {
  [COLOR_NAMES.BLUE]: {
    [shade in keyof ColorShadeInterface]: string
  },
  [COLOR_NAMES.ORANGE]: {
    [shade in keyof ColorShadeInterface]: string
  },
  [COLOR_NAMES.GREEN]: {
    [shade in keyof ColorShadeInterface]: string
  },
  [COLOR_NAMES.GRAYS]: {
    [shade in keyof GrayShadeInterface]: string
  }
}

const colors: ColorsInterface = {
  [COLOR_NAMES.BLUE]: {
    [COLOR_SHADES.LIGHTEST]: 'hsl(224, 98%, 40%)',
    [COLOR_SHADES.LIGHTER]: 'hsl(224, 98%, 32%)',
    [COLOR_SHADES.LIGHT]: 'hsl(224, 98%, 24%)',
    [COLOR_SHADES.DEFAULT]: 'hsl(224, 98%, 16%)',
    [COLOR_SHADES.DARK]: 'hsl(224, 97%, 12%)',
    [COLOR_SHADES.DARKER]: 'hsl(225, 95%, 8%)',
    [COLOR_SHADES.DARKEST]: 'hsl(227, 90%, 4%)',
  },
  [COLOR_NAMES.ORANGE]: {
    [COLOR_SHADES.LIGHTEST]: 'hsl(24, 100%, 80%)',
    [COLOR_SHADES.LIGHTER]: 'hsl(24, 100%, 70%)',
    [COLOR_SHADES.LIGHT]: 'hsl(24, 100%, 60%)',
    [COLOR_SHADES.DEFAULT]: 'hsl(24, 100%, 50%)',
    [COLOR_SHADES.DARK]: 'hsl(24, 100%, 40%)',
    [COLOR_SHADES.DARKER]: 'hsl(24, 100%, 30%)',
    [COLOR_SHADES.DARKEST]: 'hsl(24, 100%, 20%)',
  },
  [COLOR_NAMES.GREEN]: {
    [COLOR_SHADES.LIGHTEST]: 'hsl(120, 90%, 96%)',
    [COLOR_SHADES.LIGHTER]: 'hsl(122, 90%, 92%)',
    [COLOR_SHADES.LIGHT]: 'hsl(121, 90%, 88%)',
    [COLOR_SHADES.DEFAULT]: 'hsl(121, 90%, 81%)',
    [COLOR_SHADES.DARK]: 'hsl(120, 90%, 68%)',
    [COLOR_SHADES.DARKER]: 'hsl(120, 90%, 48%)',
    [COLOR_SHADES.DARKEST]: 'hsl(120, 90%, 32%)',
  },
  [COLOR_NAMES.GRAYS]: {
    [COLOR_GRAY_SHADES.WHITE]: 'hsl(210,14%,97%)',
    [COLOR_GRAY_SHADES.GRAY_1]: 'hsl(204,18%,94%)',
    [COLOR_GRAY_SHADES.GRAY_2]: 'hsl(205,17%,91%)',
    [COLOR_GRAY_SHADES.GRAY_3]: 'hsl(205,17%,91%)',
    [COLOR_GRAY_SHADES.GRAY_4]: 'hsl(205,15%,82%)',
    [COLOR_GRAY_SHADES.DEFAULT]: 'hsl(208,12%,70%)',
    [COLOR_GRAY_SHADES.GRAY_6]: 'hsl(208,8%,55%)',
    [COLOR_GRAY_SHADES.GRAY_7]: 'hsl(208,10%,31%)',
    [COLOR_GRAY_SHADES.GRAY_8]: 'hsl(207,11%,22%)',
    [COLOR_GRAY_SHADES.BLACK]: 'hsl(209,13%,14%)'
  }
}

export default (color: COLOR_NAMES, shade?: COLOR_SHADES | COLOR_GRAY_SHADES) => {
  if(shade) {
    return colors[color][shade]
  } else {
    return colors[color]['default']
  }
}
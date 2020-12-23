enum Shades {
  Lightest,
  Lighter,
  Light,
  Default,
  Dark,
  Darker,
  Darkest
}

interface Color {
  [key: string]: {
    [key in keyof typeof Shades]: string
  }
}

const colors: Color = {
  blue: {
    Lightest: 'hsl(224, 98%, 40%)',
    Lighter: 'hsl(224, 98%, 32%)',
    Light: 'hsl(224, 98%, 24%)',
    Default: 'hsl(224, 98%, 16%)',
    Dark: 'hsl(224, 97%, 12%)',
    Darker: 'hsl(225, 95%, 8%)',
    Darkest: 'hsl(227, 90%, 4%)',
  },
  orange: {
    Lightest: 'hsl(24, 100%, 80%)',
    2: 'hsl(24, 100%, 70%)',
    3: 'hsl(24, 100%, 60%)',
    4: 'hsl(24, 100%, 50%)',
    5: 'hsl(24, 100%, 40%)',
    6: 'hsl(24, 100%, 30%)',
    7: 'hsl(24, 100%, 20%)',
  },
  green: {
    Lightest: 'hsl(120, 90%, 96%)',
    2: 'hsl(122, 90%, 92%)',
    3: 'hsl(121, 90%, 88%)',
    4: 'hsl(121, 90%, 81%)',
    5: 'hsl(120, 90%, 68%)',
    6: 'hsl(120, 90%, 48%)',
    7: 'hsl(120, 90%, 32%)',
  },
  black: {
    Lightest: 'hsl(233, 12%, 56%)',
    2: 'hsl(234, 12%, 48%)',
    3: 'hsl(233, 12%, 40%)',
    4: 'hsl(231, 12%, 32%)',
    5: 'hsl(230, 12%, 20%)',
    6: 'hsl(231, 11%, 12%)',
    7: 'hsl(228, 12%, 8%)'
  },
  white: {
    Lightest: 'hsl(206, 70%, 96%)',
    2: 'hsl(205, 71%, 92%)',
    3: 'hsl(205, 70%, 88%)',
    4: 'hsl(205, 70%, 84%)',
    5: 'hsl(205, 70%, 80%)',
    6: 'hsl(205, 70%, 76%)',
    7: 'hsl(205, 70%, 72%)'
  }
}

Object.keys(colors).forEach((color) => {
  switch(color) {
    case 'black':
      colors[color].default = colors[color][7]
      break;
    case 'white':
      colors[color].default = colors[color][0]
      break;
    default:
      colors[color].default = colors[color][4]   
  }
})

export default colors;
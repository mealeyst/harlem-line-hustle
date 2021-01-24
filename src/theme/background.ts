import getColor, { ColorKeys, ShadeKeys} from './colors'

interface Clip {
  border: string,
  padding: string,
  content: string,
  text: string
}

interface Position {
  bottom: string,
  center: string,
  left: string,
  leftBottom: string,
  leftTop: string,
  right: string,
  rightBottom: string,
  rightTop: string,
  top: string
}

interface Repeat {
  repeat: string,
  noRepeat: string,
  repeatX: string,
  repeatY: string,
  round: string,
  space: string
}

interface Background {
  attachment: ReadonlyArray<string>,
  clip: Clip,
  position: Position,
  repeat: Repeat,
  size: ReadonlyArray<string>
}

const background: Background = {
  attachment: [
    'fixed',
    'local',
    'scroll'
  ],
  clip: {
    border: 'border-box',
    padding: 'padding-box',
    content: 'content-box',
    text: 'text'
  },
  position: {
    bottom: 'bottom',
    center: 'center',
    left: 'left',
    leftBottom: 'left bottom',
    leftTop: 'left top',
    right: 'right',
    rightBottom: 'right bottom',
    rightTop: 'right top',
    top: 'top'
  },
  repeat: {
    repeat: 'repeat',
    noRepeat: 'no-repeat',
    repeatX: 'repeat-x',
    repeatY: 'repeat-y',
    round: 'round',
    space: 'space'
  },
  size: [
    'auto',
    'cover',
    'contain'
  ]
}

export default {
  attachment: (value: typeof background.attachment): string => {
    return `background-attachment: ${value};`
  },
  clip: (key: keyof typeof background.clip): string => {
    return `background-clip: ${background.clip[key]};`
  },
  color: (colorName: ColorKeys, shade?:  ShadeKeys) => {
    return `background-color: ${getColor(colorName, shade)};`
  },
  image: (url: string): string => {
    return `background-image: url(${url});`
  },
  position: (key: keyof typeof background.position): string => {
    return `background-position: ${background.position[key]};`
  },
  repeat: (key: keyof typeof background.repeat): string => {
    return `background-repeat: ${background.repeat[key]};`
  },
  size: (key: typeof background.size) => {
    return `background-size: ${key};`
  }
}
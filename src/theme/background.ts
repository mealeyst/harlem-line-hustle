import getColor, { COLOR_NAMES, COLOR_SHADES, COLOR_GRAY_SHADES} from './colors'

export enum BACKGROUND_ATTACHMENT {
  FIXED,
  LOCAL,
  SCROLL
}

type Attachment = {
  [key in BACKGROUND_ATTACHMENT]: string
}

export enum BACKGROUND_CLIP {
  BORDER,
  PADDING,
  CONTENT,
  TEXT
}

type Clip = {
  [key in BACKGROUND_CLIP]: string
}

export enum BACKGROUND_POSITION {
  BOTTOM,
  CENTER,
  LEFT,
  LEFT_BOTTOM,
  LEFT_TOP,
  RIGHT,
  RIGHT_BOTTOM,
  RIGHT_TOP,
  TOP
}

type Position = {
  [key in BACKGROUND_POSITION]: string
}

export enum BACKGROUND_REPEAT {
  REPEAT,
  NO_REPEAT,
  REPEAT_X,
  REPEAT_Y,
  ROUND,
  SPACE
}

type Repeat = {
  [key in BACKGROUND_REPEAT]: string
}

export enum BACKGROUND_SIZE {
  AUTO,
  COVER,
  CONTAIN
}

type Size = {
  [key in BACKGROUND_SIZE]: string
}

interface Background {
  attachment: Attachment,
  clip: Clip,
  position: Position,
  repeat: Repeat,
  size: Size
}

const background: Background = {
  attachment: {
    [BACKGROUND_ATTACHMENT.FIXED]: 'fixed',
    [BACKGROUND_ATTACHMENT.LOCAL]: 'local',
    [BACKGROUND_ATTACHMENT.SCROLL]: 'scroll'
  },
  clip: {
    [BACKGROUND_CLIP.BORDER]: 'border-box',
    [BACKGROUND_CLIP.PADDING]: 'padding-box',
    [BACKGROUND_CLIP.CONTENT]: 'content-box',
    [BACKGROUND_CLIP.TEXT]: 'text'
  },
  position: {
    [BACKGROUND_POSITION.BOTTOM]: 'bottom',
    [BACKGROUND_POSITION.CENTER]: 'center',
    [BACKGROUND_POSITION.LEFT]: 'left',
    [BACKGROUND_POSITION.LEFT_BOTTOM]: 'left bottom',
    [BACKGROUND_POSITION.LEFT_TOP]: 'left top',
    [BACKGROUND_POSITION.RIGHT]: 'right',
    [BACKGROUND_POSITION.RIGHT_BOTTOM]: 'right bottom',
    [BACKGROUND_POSITION.RIGHT_TOP]: 'right top',
    [BACKGROUND_POSITION.TOP]: 'top'
  },
  repeat: {
    [BACKGROUND_REPEAT.REPEAT]: 'repeat',
    [BACKGROUND_REPEAT.NO_REPEAT]: 'no-repeat',
    [BACKGROUND_REPEAT.REPEAT_X]: 'repeat-x',
    [BACKGROUND_REPEAT.REPEAT_Y]: 'repeat-y',
    [BACKGROUND_REPEAT.ROUND]: 'round',
    [BACKGROUND_REPEAT.SPACE]: 'space'
  },
  size: {
    [BACKGROUND_SIZE.AUTO]: 'auto',
    [BACKGROUND_SIZE.CONTAIN]: 'contain',
    [BACKGROUND_SIZE.COVER]: 'cover'
  }
}

export const attachment = (key: BACKGROUND_ATTACHMENT): string => `background-attachment: ${background.attachment[key]};`
export const clip = (key: BACKGROUND_CLIP): string => `background-clip: ${background.clip[key]};`
export const color = (colorName: COLOR_NAMES, shade?:  COLOR_SHADES | COLOR_GRAY_SHADES) => `background-color: ${getColor(colorName, shade)};`
export const image = (url: string): string => `background-image: url(${url});`
export const position = (key: BACKGROUND_POSITION): string => `background-position: ${background.position[key]};`
export const repeat = (key: BACKGROUND_REPEAT): string => `background-repeat: ${background.repeat[key]};`
export const size = (key: BACKGROUND_SIZE): string =>  `background-size: ${background.size[key]};`
import { SIZES, getSize } from './sizing'

export enum LAYOUT_CONTAINER {
    DEFAULT,
    SMALL,
    MEDIUM,
    LARGE,
    EXTRA_LARGE,
    EXTRA_LARGE_X2
}

type Container = {
    [key in LAYOUT_CONTAINER]: string
}

export enum LAYOUT_BOX_SIZING {
    BORDER_BOX,
    CONTENT_BOX
}

type BoxSizing = {
    [key in LAYOUT_BOX_SIZING]: string
}

export enum LAYOUT_DISPLAY {
    BLOCK,
    INLINE_BLOCK,
    INLINE,
    FLEX,
    INLINE_FLEX,
    TABLE,
    TABLE_CAPTION,
    TABLE_CELL,
    TABLE_COLUMN,
    TABLE_COLUMN_GROUP,
    TABLE_FOOTER_GROUP,
    TABLE_HEADER_GROUP,
    TABLE_ROW_GROUP,
    TABLE_ROW,
    FLOW_ROOT,
    GRID,
    INLINE_GRID,
    CONTENTS,
    HIDDEN
}

type Dispay = {
    [key in LAYOUT_DISPLAY]: string
}

export enum LAYOUT_FLOAT {
    LEFT,
    RIGHT,
    NONE
}

type Float = {
    [key in LAYOUT_FLOAT]: string
}

interface Layout {
    container: Container,
    boxSizing: BoxSizing,
    display: Dispay,
    float: Float
}

const layout: Layout = {
    container: {
        [LAYOUT_CONTAINER.DEFAULT]: getSize(SIZES.FULL),
        [LAYOUT_CONTAINER.SMALL]: getSize(SIZES.C_SM),
        [LAYOUT_CONTAINER.MEDIUM]: getSize(SIZES.C_MD),
        [LAYOUT_CONTAINER.LARGE]: getSize(SIZES.C_LG),
        [LAYOUT_CONTAINER.EXTRA_LARGE]: getSize(SIZES.C_XL),
        [LAYOUT_CONTAINER.EXTRA_LARGE_X2]: getSize(SIZES.C_2XL)
    },
    boxSizing: {
        [LAYOUT_BOX_SIZING.BORDER_BOX]: 'border-box',
        [LAYOUT_BOX_SIZING.CONTENT_BOX]: 'content-box'
    },
    display: {
        [LAYOUT_DISPLAY.BLOCK]: 'block',
        [LAYOUT_DISPLAY.INLINE_BLOCK]: 'inline-block',
        [LAYOUT_DISPLAY.INLINE]: 'inline',
        [LAYOUT_DISPLAY.FLEX]: 'flex',
        [LAYOUT_DISPLAY.INLINE_FLEX]: 'inline-flex',
        [LAYOUT_DISPLAY.TABLE]: 'table',
        [LAYOUT_DISPLAY.TABLE_CAPTION]: 'table-caption',
        [LAYOUT_DISPLAY.TABLE_CELL]: 'table-cell',
        [LAYOUT_DISPLAY.TABLE_COLUMN]: 'table-column',
        [LAYOUT_DISPLAY.TABLE_COLUMN_GROUP]: 'table-column-group',
        [LAYOUT_DISPLAY.TABLE_FOOTER_GROUP]: 'table-footer-group',
        [LAYOUT_DISPLAY.TABLE_HEADER_GROUP]: 'table-header-group',
        [LAYOUT_DISPLAY.TABLE_ROW_GROUP]: 'table-row-group',
        [LAYOUT_DISPLAY.TABLE_ROW]: 'table-row',
        [LAYOUT_DISPLAY.FLOW_ROOT]: 'flow-root',
        [LAYOUT_DISPLAY.GRID]: 'grid',
        [LAYOUT_DISPLAY.INLINE_GRID]: 'inline-grid',
        [LAYOUT_DISPLAY.CONTENTS]: 'contents',
        [LAYOUT_DISPLAY.HIDDEN]: 'hidden'
    },
    float: {
        [LAYOUT_FLOAT.LEFT]: 'left',
        [LAYOUT_FLOAT.RIGHT]: 'right',
        [LAYOUT_FLOAT.NONE]: 'none'
    }
}

export const container = (containerType: LAYOUT_CONTAINER): string => {
    const size = layout.container[containerType]
    if (containerType === LAYOUT_CONTAINER.DEFAULT) {
        return `width: ${size};`
    }
    return `max-width: ${size};`
}

export const boxSizing = (sizingType: LAYOUT_BOX_SIZING): string => `box-sizing: ${layout.boxSizing[sizingType]};`

export const display = (displayType: LAYOUT_DISPLAY): string => `display: ${layout.display[displayType]};`

export const float = (floatType: LAYOUT_FLOAT): string => `float: ${layout.float[floatType]};`
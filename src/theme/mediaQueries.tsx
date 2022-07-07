import { StyledProps } from 'styled-components'
import { get } from 'lodash'
import { Theme, BreakpointPath } from './Theme'

const getBreakpoint = (theme: Theme, brekpointPath: BreakpointPath): string =>
  get(theme.breakpoints, brekpointPath)

export const query = <T extends BreakpointPath>(queryPath: T) => ({
  theme,
}: StyledProps<unknown>) => getBreakpoint(theme, queryPath)

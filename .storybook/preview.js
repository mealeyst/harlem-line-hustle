import React from 'react'
import { ThemeDecorator } from '../src/theme/index.tsx'

export const decorators = [
  (Story) => (
    <ThemeDecorator>
      <Story />
    </ThemeDecorator>
  ),
]
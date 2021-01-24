import React from 'react';
import { action } from '@storybook/addon-actions';
import { Button } from '@storybook/react/demo';
import styled from 'styled-components'
import theme from '../src/theme'
import { COLOR_NAMES, COLOR_GRAY_SHADES } from '../src/theme/colors'
import { SIZES } from '../src/theme/sizing'
import { animation } from '../src/theme/animation'

export default {
  title: 'Button',
  component: Button,
};

const StyledButton = styled((props) => {
  return (<button {...props} />)
})(() => {
  return `
    ${theme.padding(SIZES.S0, SIZES.S6)}
    ${theme.height(SIZES.S12)}
    ${theme.background.color(COLOR_NAMES.GRAYS, COLOR_GRAY_SHADES.GRAY_6)}
    ${theme.border.color(COLOR_NAMES.BLUE)}
    ${theme.border.width(SIZES.S0_5, SIZES.S0_1, SIZES.S0_1, SIZES.S0_5)}
  `
})

export const Text = () => <StyledButton onClick={action('clicked')}>Hello Button</StyledButton>;

export const Emoji = () => (
  <Button onClick={action('clicked')}>
    <span role="img" aria-label="so cool">
      😀 😎 👍 💯
    </span>
  </Button>
);

import React from 'react';
import { action } from '@storybook/addon-actions';
import { Button } from '@storybook/react/demo';
import styled from 'styled-components'
import theme from '../src/theme'
export default {
  title: 'Button',
  component: Button,
};

const StyledButton = styled((props) => {
  return (<button {...props} />)
})(() => {
  const {
    Background: {
      color: backgroundColor
    },
    Border: {
      BORDER_RADIUS,
      color: borderColor,
      radius,
      width: borderWidth
    },
    Color: {
      COLOR_GRAY_SHADES,
      COLOR_NAMES,
    },
    Layout: {
      display,
      LAYOUT_DISPLAY
    },
    Sizing: {
      SIZES,
      height
    },
    Spacing: {
      padding
    }
  } = theme
  return `
    ${padding(SIZES.S0, SIZES.S6)}
    ${height(SIZES.S12)}
    ${backgroundColor(COLOR_NAMES.GRAYS, COLOR_GRAY_SHADES.GRAY_6)}
    ${borderColor(COLOR_NAMES.BLUE)}
    ${radius(BORDER_RADIUS.ROUNDED)}
    ${borderWidth(SIZES.S0_1)}
    ${display(LAYOUT_DISPLAY.FLEX)}
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

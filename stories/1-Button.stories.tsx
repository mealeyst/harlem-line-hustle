import React from 'react';
import { action } from '@storybook/addon-actions';
import { Button } from '@storybook/react/demo';
import styled from 'styled-components'
import {
  Background,
  Border,
  Color,
  Sizing,
  Spacing
} from '../src/theme'
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
    ${Spacing.padding(Sizing.SIZES.S0, Sizing.SIZES.S6)}
    ${Sizing.height(Sizing.SIZES.S12)}
    ${Background.color(
      Color.COLOR_NAMES.GRAYS,
      Color.COLOR_GRAY_SHADES.GRAY_6
    )}
    ${Border.color(Color.COLOR_NAMES.BLUE)}
    ${Border.width(
      Sizing.SIZES.S0_5,
      Sizing.SIZES.S0_1,
      Sizing.SIZES.S0_1,
      Sizing.SIZES.S0_5
    )}
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

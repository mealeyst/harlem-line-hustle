import React from 'react';
import { action } from '@storybook/addon-actions';
import { Button } from '@storybook/react/demo';
import styled, { css } from 'styled-components'
import { bounce } from '../src/theme/animation';
import theme from '../src/theme'
import { Colors, Shades } from '../src/theme/colors'
import { border } from '../src/theme/border'

export default {
  title: 'Button',
  component: Button,
};

const StyledButton = styled((props) => {
  return (<button {...props} />)
})(() => {
  return `
    ${theme.width('half')}
    ${theme.height(12)}
    ${theme.background.color(Colors.blue)}
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

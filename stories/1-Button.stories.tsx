import React from 'react';
import { action } from '@storybook/addon-actions';
import { Button } from '@storybook/react/demo';
import styled, { css } from 'styled-components'
import { bounce } from '../src/theme/animation';

export default {
  title: 'Button',
  component: Button,
};

const StyledButton = styled((props) => {
  return (<button {...props} />)
})(({ theme }) => {
  console.log(theme)
  return `
    ${theme.background.color.orange.default}
    ${theme.width('half')}
    ${theme.height(12)}
    ${theme.border.width(0)}
    &:hover {
      ${theme.background.color.orange[6]}
    }
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

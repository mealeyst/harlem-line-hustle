import type { Preview } from '@storybook/react';
import '../src/styles/tokens.css';

const preview: Preview = {
  parameters: {
    backgrounds: {
      default: 'dark',
      values: [
        { name: 'dark', value: 'hsl(205, 52%, 6%)' },
        { name: 'elevated', value: 'hsl(159, 56%, 7%)' },
      ],
    },
    layout: 'centered',
  },
};

export default preview;

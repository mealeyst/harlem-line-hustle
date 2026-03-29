import type { Meta, StoryObj } from '@storybook/react';
import { Scanlines } from './Scanlines';

const meta: Meta<typeof Scanlines> = {
  title: 'Components/Scanlines',
  component: Scanlines,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Fixed overlay that renders CRT-style scanlines and a traveling interference bar. Drop it once at the top of your layout — `z-index: 10` and `pointer-events: none` keep it non-interactive.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Scanlines>;

export const Default: Story = {
  render: () => (
    <div style={{ background: 'hsl(205, 52%, 6%)', height: '100vh', padding: '2rem' }}>
      <Scanlines />
      <p
        style={{
          color: 'hsl(147, 43%, 71%)',
          fontFamily: 'monospace',
          textShadow: '0 0 2px hsl(147, 43%, 71%)',
        }}
      >
        Content sits beneath the scanline overlay.
      </p>
    </div>
  ),
};

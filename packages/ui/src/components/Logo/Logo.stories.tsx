import type { Meta, StoryObj } from '@storybook/react';
import { Logo } from './Logo';

const meta: Meta<typeof Logo> = {
  title: 'Components/Logo',
  component: Logo,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    glitch: { control: 'boolean' },
  },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'The Harlem Line Hustle SVG logo. Three concentric rings, a train icon, and the wordmark. Use `size` for sm (80px) / md (200px) / lg (400px), and `glitch` to enable the CRT distortion effect.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Logo>;

export const Small: Story = {
  args: { size: 'sm' },
};

export const Medium: Story = {
  args: { size: 'md' },
};

export const Large: Story = {
  args: { size: 'lg' },
};

export const Glitch: Story = {
  args: { size: 'md', glitch: true },
  parameters: {
    docs: {
      description: {
        story:
          'Two desynchronised animations fire in short bursts: `glitch-jitter` shifts the SVG with chromatic aberration (red + cyan drop-shadows), and `glitch-clip` tears a horizontal band away mid-frame.',
      },
    },
  },
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: '3rem', flexWrap: 'wrap' }}>
      {(['sm', 'md', 'lg'] as const).map((size) => (
        <div
          key={size}
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem' }}
        >
          <Logo size={size} />
          <span
            style={{
              fontFamily: 'monospace',
              fontSize: '0.7rem',
              color: 'var(--color-text-dim)',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
            }}
          >
            {size}
          </span>
        </div>
      ))}
    </div>
  ),
};

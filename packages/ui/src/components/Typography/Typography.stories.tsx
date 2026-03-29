import type { Meta, StoryObj } from '@storybook/react';
import { Typography } from './Typography';

const meta: Meta<typeof Typography> = {
  title: 'Components/Typography',
  component: Typography,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'body', 'body-sm', 'caption', 'label', 'mono'],
    },
    glow: { control: 'boolean' },
    muted: { control: 'boolean' },
    accent: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Typography>;

export const Heading1: Story = {
  args: { variant: 'h1', children: 'Harlem Hustle Studios' },
};

export const Heading2: Story = {
  args: { variant: 'h2', children: 'Dungeon Devils' },
};

export const Heading3: Story = {
  args: { variant: 'h3', children: 'A 3D Browser MMORPG' },
};

export const Heading4: Story = {
  args: { variant: 'h4', children: 'Features' },
};

export const Label: Story = {
  args: { variant: 'label', children: 'Status: In Development' },
};

export const Body: Story = {
  args: {
    variant: 'body',
    children:
      "We build immersive 3D browser experiences that push the boundaries of what's possible on the web. No downloads. No installs. Just play.",
  },
};

export const Mono: Story = {
  args: { variant: 'mono', children: 'VERSION_2.0.0 // BUILD_2026' },
};

export const GlowVariant: Story = {
  args: { variant: 'h2', glow: true, children: 'Glow Effect' },
};

export const AccentVariant: Story = {
  args: { variant: 'h3', accent: true, children: 'Accent Color' },
};

export const TypeScale: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <Typography variant="h1">H1 — Studio Name</Typography>
      <Typography variant="h2">H2 — Game Title</Typography>
      <Typography variant="h3">H3 — Section Header</Typography>
      <Typography variant="h4">H4 — Subsection</Typography>
      <Typography variant="h5">H5 — Label Group</Typography>
      <Typography variant="h6">H6 — Metadata</Typography>
      <Typography variant="body">Body — The quick brown fox jumps over the lazy dog.</Typography>
      <Typography variant="body-sm">Body SM — Smaller body text for secondary content.</Typography>
      <Typography variant="caption">Caption — Small supporting text</Typography>
      <Typography variant="label">Label — Field Label</Typography>
      <Typography variant="mono">Mono — 0xDEADBEEF</Typography>
    </div>
  ),
};

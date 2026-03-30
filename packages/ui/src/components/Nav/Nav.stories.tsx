import type { Meta, StoryObj } from '@storybook/react';
import { Nav } from './Nav';

const links = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

const meta: Meta<typeof Nav> = {
  title: 'Components/Nav',
  component: Nav,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof Nav>;

export const Default: Story = {
  args: { links, currentPath: '/' },
};

export const AboutActive: Story = {
  args: { links, currentPath: '/about' },
};

import type { Meta, StoryObj } from '@storybook/react';
import { Card, CardHeader, CardBody, CardFooter } from './Card';
import { Button } from '../Button/Button';
import { Typography } from '../Typography/Typography';

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['default', 'elevated', 'outlined'] },
    glow: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
  render: () => (
    <Card style={{ width: 360 }}>
      <CardHeader label="PROJECT // ACTIVE">
        <Typography variant="h3">Dungeon Devils</Typography>
      </CardHeader>
      <CardBody>
        <Typography variant="body-sm">
          A 3D browser-based MMORPG. Explore procedurally generated dungeons, battle demons, and
          forge alliances in real-time.
        </Typography>
      </CardBody>
      <CardFooter>
        <Button variant="primary" size="sm">
          Learn More
        </Button>
        <Button variant="ghost" size="sm">
          View Source
        </Button>
      </CardFooter>
    </Card>
  ),
};

export const Outlined: Story = {
  render: () => (
    <Card variant="outlined" style={{ width: 360 }}>
      <CardBody>
        <Typography variant="h4">Outlined Card</Typography>
      </CardBody>
    </Card>
  ),
};

export const WithGlow: Story = {
  render: () => (
    <Card glow style={{ width: 360 }}>
      <CardHeader label="FEATURED">
        <Typography variant="h3">Harlem Line Hustle</Typography>
      </CardHeader>
      <CardBody>
        <Typography variant="body-sm">
          An immersive 3D browser experience set on the NYC Metro North Harlem Line.
        </Typography>
      </CardBody>
    </Card>
  ),
};

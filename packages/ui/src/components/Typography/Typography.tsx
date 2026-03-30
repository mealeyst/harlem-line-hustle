import React from 'react';
import cx from 'classnames';
import styles from './Typography.module.css';

type HeadingLevel = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
type BodyVariant = 'body' | 'body-sm' | 'caption' | 'label' | 'mono';

export type TypographyVariant = HeadingLevel | BodyVariant;

export interface TypographyProps {
  variant?: TypographyVariant;
  as?: keyof React.JSX.IntrinsicElements;
  glow?: boolean;
  muted?: boolean;
  accent?: boolean;
  className?: string;
  children: React.ReactNode;
}

const defaultTags: Record<TypographyVariant, keyof React.JSX.IntrinsicElements> = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
  body: 'p',
  'body-sm': 'p',
  caption: 'span',
  label: 'span',
  mono: 'span',
};

export const Typography: React.FC<TypographyProps> = ({
  variant = 'body',
  as,
  glow = false,
  muted = false,
  accent = false,
  className,
  children,
}) => {
  const Tag = (as ?? defaultTags[variant]) as React.ElementType;

  const classes = cx(
    styles[variant],
    { [styles.glow]: glow, [styles.muted]: muted, [styles.accent]: accent },
    className
  );

  return <Tag className={classes}>{children}</Tag>;
};

import React from 'react';
import cx from 'classnames';
import styles from './Card.module.css';

export interface CardProps {
  variant?: 'default' | 'elevated' | 'outlined';
  glow?: boolean;
  className?: string;
  children: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({
  variant = 'default',
  glow = false,
  className,
  children,
}) => {
  const classes = cx(styles.card, styles[variant], { [styles.glow]: glow }, className);

  return <div className={classes}>{children}</div>;
};

export interface CardHeaderProps {
  label?: string;
  className?: string;
  children: React.ReactNode;
}

export const CardHeader: React.FC<CardHeaderProps> = ({ label, className, children }) => (
  <div className={cx(styles.header, className)}>
    {label && <span className={styles.label}>{label}</span>}
    {children}
  </div>
);

export interface CardBodyProps {
  className?: string;
  children: React.ReactNode;
}

export const CardBody: React.FC<CardBodyProps> = ({ className, children }) => (
  <div className={cx(styles.body, className)}>{children}</div>
);

export interface CardFooterProps {
  className?: string;
  children: React.ReactNode;
}

export const CardFooter: React.FC<CardFooterProps> = ({ className, children }) => (
  <div className={cx(styles.footer, className)}>{children}</div>
);

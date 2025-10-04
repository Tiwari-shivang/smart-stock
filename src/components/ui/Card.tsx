import React from 'react';
import { clsx } from 'clsx';
import { motion } from 'framer-motion';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  hoverable?: boolean;
  elevation?: 'sm' | 'md' | 'lg' | 'xl';
  radius?: 'sm' | 'md' | 'lg';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({
  children,
  className,
  style,
  hoverable = false,
  elevation = 'md',
  radius = 'md',
  padding = 'md',
  onClick
}) => {
  const elevationClasses = {
    sm: 'shadow-ss-sm',
    md: 'shadow-ss-md',
    lg: 'shadow-ss-lg',
    xl: 'shadow-ss-xl'
  };

  const radiusClasses = {
    sm: 'rounded-ss-sm',
    md: 'rounded-ss-md',
    lg: 'rounded-ss-lg'
  };

  const paddingClasses = {
    none: '',
    sm: 'p-2',
    md: 'p-4',
    lg: 'p-6'
  };

  const Component = hoverable ? motion.div : 'div';
  const hoverProps = hoverable ? {
    whileHover: { y: -2, transition: { duration: 0.2 } }
  } : {};

  return (
    <Component
      className={clsx(
        'panel',
        elevationClasses[elevation],
        radiusClasses[radius],
        paddingClasses[padding],
        hoverable && 'hover-lift cursor-pointer',
        className
      )}
      style={style}
      onClick={onClick}
      {...hoverProps}
    >
      {children}
    </Component>
  );
};
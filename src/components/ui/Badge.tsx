import React from 'react';
import { clsx } from 'clsx';

interface BadgeProps {
  variant?: 'default' | 'restock' | 'replace' | 'promote' | 'success' | 'danger' | 'warning' | 'info';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  className?: string;
  icon?: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({
  variant = 'default',
  size = 'md',
  children,
  className,
  icon
}) => {
  const variantClasses = {
    default: 'chip',
    restock: 'chip-restock',
    replace: 'chip-replace',
    promote: 'chip-promote',
    success: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    danger: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
    warning: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    info: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
  };

  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-sm px-3 py-1',
    lg: 'text-base px-4 py-1.5'
  };

  return (
    <span
      className={clsx(
        variantClasses[variant],
        sizeClasses[size],
        'inline-flex items-center gap-1 rounded-full font-medium',
        className
      )}
    >
      {icon}
      {children}
    </span>
  );
};
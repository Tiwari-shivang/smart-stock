import React from 'react';
import { clsx } from 'clsx';
import { motion } from 'framer-motion';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'ghost' | 'success' | 'danger' | 'info';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  icon?: React.ReactNode;
  children?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  icon,
  children,
  className,
  disabled,
  ...props
}) => {
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2',
    lg: 'px-6 py-3 text-lg'
  };

  const variantClasses = {
    primary: 'btn-primary',
    ghost: 'btn-ghost',
    success: 'btn-success',
    danger: 'btn-danger',
    info: 'btn-info'
  };

  return (
    <motion.button
      whileTap={{ scale: 0.98 }}
      className={clsx(
        'btn',
        variantClasses[variant],
        sizeClasses[size],
        isLoading && 'opacity-70 cursor-wait',
        disabled && 'opacity-50 cursor-not-allowed',
        className
      )}
      disabled={disabled || isLoading}
      {...(props as any)}
    >
      {isLoading ? (
        <span className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
      ) : icon}
      {children}
    </motion.button>
  );
};
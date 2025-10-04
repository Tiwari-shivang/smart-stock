import React, { useState } from 'react';
import { clsx } from 'clsx';
import { motion } from 'framer-motion';

export interface TabItem {
  key: string;
  label: string;
  icon?: React.ReactNode;
  badge?: string | number;
}

interface TabsProps {
  items: TabItem[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  className?: string;
  variant?: 'default' | 'pills';
}

export const Tabs: React.FC<TabsProps> = ({
  items,
  value,
  defaultValue,
  onChange,
  className,
  variant = 'default'
}) => {
  const [activeTab, setActiveTab] = useState(value || defaultValue || items[0]?.key);
  const currentTab = value !== undefined ? value : activeTab;

  const handleTabClick = (key: string) => {
    if (value === undefined) {
      setActiveTab(key);
    }
    onChange?.(key);
  };

  return (
    <div
      className={clsx(
        'flex items-center gap-1',
        variant === 'pills' && 'p-1 bg-gray-100 dark:bg-gray-800 rounded-lg',
        className
      )}
    >
      {items.map((item) => (
        <button
          key={item.key}
          onClick={() => handleTabClick(item.key)}
          className={clsx(
            'relative px-4 py-2 font-medium transition-colors duration-200',
            'flex items-center gap-2',
            variant === 'default' ? [
              'border-b-2',
              currentTab === item.key
                ? 'border-ss-primary text-ss-primary'
                : 'border-transparent text-ss-subtle hover:text-ss-text'
            ] : [
              'rounded-md',
              currentTab === item.key
                ? 'bg-white dark:bg-gray-900 text-ss-text shadow-sm'
                : 'text-ss-subtle hover:text-ss-text'
            ]
          )}
        >
          {item.icon}
          <span>{item.label}</span>
          {item.badge && (
            <span className="ml-1 px-2 py-0.5 text-xs bg-ss-primary text-white rounded-full">
              {item.badge}
            </span>
          )}
          {currentTab === item.key && variant === 'pills' && (
            <motion.div
              layoutId="activeTab"
              className="absolute inset-0 bg-white dark:bg-gray-900 rounded-md -z-10"
              transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
            />
          )}
        </button>
      ))}
    </div>
  );
};
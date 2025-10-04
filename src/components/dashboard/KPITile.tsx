import React from 'react';
import { clsx } from 'clsx';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Minus, Info } from 'lucide-react';
import { Card } from '@/components/ui';
import type { KPITile as KPITileType } from '@/types';

interface KPITileProps extends KPITileType {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
}

export const KPITile: React.FC<KPITileProps> = ({
  title,
  value,
  delta,
  deltaType,
  sparklineData,
  unit,
  tooltip,
  className,
  size = 'md',
  loading = false
}) => {
  const sizeClasses = {
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-6'
  };

  const valueSizeClasses = {
    sm: 'text-xl',
    md: 'text-2xl',
    lg: 'text-3xl'
  };

  if (loading) {
    return (
      <Card className={clsx(sizeClasses[size], className)}>
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-3"></div>
          <div className="h-8 bg-gray-300 dark:bg-gray-600 rounded w-1/2 mb-2"></div>
          <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
        </div>
      </Card>
    );
  }

  const getDeltaIcon = () => {
    if (!delta) return <Minus className="w-4 h-4" />;
    if (deltaType === 'increase') return <TrendingUp className="w-4 h-4" />;
    return <TrendingDown className="w-4 h-4" />;
  };

  const getDeltaColor = () => {
    if (!deltaType) return 'text-ss-subtle';
    return deltaType === 'increase' ? 'text-green-600' : 'text-red-600';
  };

  // Generate sparkline SVG path
  const generateSparkline = () => {
    if (!sparklineData || sparklineData.length === 0) return '';
    
    const max = Math.max(...sparklineData);
    const min = Math.min(...sparklineData);
    const range = max - min || 1;
    const width = 100;
    const height = 30;
    
    const points = sparklineData.map((val, i) => {
      const x = (i / (sparklineData.length - 1)) * width;
      const y = height - ((val - min) / range) * height;
      return `${x},${y}`;
    }).join(' ');
    
    return `M ${points}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Card className={clsx(sizeClasses[size], 'relative group', className)} hoverable>
        {/* Tooltip Icon */}
        {tooltip && (
          <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="relative">
              <Info className="w-4 h-4 text-ss-subtle cursor-help" />
              <div className="absolute z-10 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-opacity bottom-full right-0 mb-2">
                <div className="bg-gray-900 text-white text-xs rounded-lg px-3 py-2 whitespace-nowrap">
                  {tooltip}
                  <div className="absolute top-full right-2">
                    <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Title */}
        <h3 className="text-sm font-medium text-ss-subtle mb-2">{title}</h3>

        {/* Main Value */}
        <div className="flex items-baseline gap-2 mb-2">
          <span className={clsx('font-bold text-ss-text', valueSizeClasses[size])}>
            {value}
          </span>
          {unit && (
            <span className="text-sm text-ss-subtle">{unit}</span>
          )}
        </div>

        {/* Delta and Sparkline */}
        <div className="flex items-center justify-between">
          {/* Delta */}
          {delta !== undefined && (
            <div className={clsx('flex items-center gap-1', getDeltaColor())}>
              {getDeltaIcon()}
              <span className="text-sm font-medium">
                {delta > 0 ? '+' : ''}{delta}%
              </span>
            </div>
          )}

          {/* Sparkline */}
          {sparklineData && sparklineData.length > 0 && (
            <div className="ml-auto">
              <svg
                width="100"
                height="30"
                className="overflow-visible"
              >
                <path
                  d={generateSparkline()}
                  fill="none"
                  stroke="url(#gradient)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="var(--ss-primary)" stopOpacity="0.5" />
                    <stop offset="100%" stopColor="var(--ss-blue)" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          )}
        </div>
      </Card>
    </motion.div>
  );
};
import React from 'react';
import { clsx } from 'clsx';
import { motion } from 'framer-motion';
import { 
  Cloud, 
  CloudRain, 
  Sun, 
  CloudSnow,
  Wind,
  Droplets,
  Thermometer,
  TrendingUp,
  Umbrella
} from 'lucide-react';
import { Card, Badge } from '@/components/ui';
import type { WeatherImpact } from '@/types';

interface WeatherImpactPanelProps {
  weather: WeatherImpact;
  className?: string;
}

export const WeatherImpactPanel: React.FC<WeatherImpactPanelProps> = ({
  weather,
  className
}) => {
  const getWeatherIcon = (condition: string) => {
    switch (condition) {
      case 'SUNNY': return <Sun size={24} className="text-yellow-500" />;
      case 'RAINY': return <CloudRain size={24} className="text-blue-500" />;
      case 'CLOUDY': return <Cloud size={24} className="text-gray-500" />;
      case 'HOT': return <Thermometer size={24} className="text-red-500" />;
      case 'COLD': return <CloudSnow size={24} className="text-blue-300" />;
      default: return <Cloud size={24} className="text-gray-400" />;
    }
  };

  const getImpactProducts = () => {
    const products: { [key: string]: string[] } = {
      'RAINY': ['Umbrellas', 'Hot Drinks', 'Instant Noodles', 'Rain Gear'],
      'SUNNY': ['Cold Drinks', 'Ice Cream', 'Sunscreen', 'Sunglasses'],
      'HOT': ['Energy Drinks', 'Water', 'Ice', 'Cooling Products'],
      'COLD': ['Hot Coffee', 'Tea', 'Soup', 'Hand Warmers'],
      'CLOUDY': ['Snacks', 'Indoor Items', 'Comfort Food']
    };
    return products[weather.condition] || [];
  };

  return (
    <Card className={clsx('p-4 h-full', className)}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-ss-text">Weather Impact</h3>
        <Badge 
          variant={weather.demandModifier > 1.5 ? 'danger' : weather.demandModifier > 1.2 ? 'warning' : 'info'}
          size="sm"
        >
          {weather.demandModifier}x demand
        </Badge>
      </div>

      {/* Current Weather */}
      <div className="flex items-center justify-between mb-4 p-3 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-lg">
        <div className="flex items-center gap-3">
          {getWeatherIcon(weather.condition)}
          <div>
            <p className="font-medium text-ss-text capitalize">
              {weather.condition.toLowerCase()}
            </p>
            <div className="flex items-center gap-3 mt-1">
              <span className="flex items-center gap-1 text-xs text-ss-subtle">
                <Thermometer size={12} />
                {weather.temperature}°C
              </span>
              <span className="flex items-center gap-1 text-xs text-ss-subtle">
                <Droplets size={12} />
                {weather.humidity}%
              </span>
            </div>
          </div>
        </div>

        {/* Weather Animation */}
        {weather.condition === 'RAINY' && (
          <motion.div
            animate={{
              y: [0, 10, 0]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          >
            <Umbrella className="text-blue-600" size={20} />
          </motion.div>
        )}
      </div>

      {/* 48h Forecast */}
      <div className="mb-4">
        <h4 className="text-sm font-medium text-ss-subtle mb-2">48-Hour Forecast</h4>
        <div className="p-2 bg-ss-muted rounded-lg">
          <p className="text-xs text-ss-text">{weather.forecast48h}</p>
        </div>
      </div>

      {/* High-Impact Products */}
      <div>
        <h4 className="text-sm font-medium text-ss-subtle mb-2">
          High-Impact Products
        </h4>
        <div className="grid grid-cols-2 gap-2">
          {getImpactProducts().map((product, index) => (
            <motion.div
              key={product}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              className="flex items-center gap-2 p-2 bg-gray-800 rounded-lg hover:shadow-sm transition-shadow"
            >
              <TrendingUp size={12} className="text-green-500" />
              <span className="text-xs text-white text-ss-text">{product}</span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Affected Categories Bar */}
      <div className="mt-4 pt-4 border-t border-ss-line">
        <div className="flex items-center justify-between text-xs">
          <span className="text-ss-subtle">Categories Impact</span>
          <div className="flex gap-1">
            {weather.affectedCategories.map((category, idx) => (
              <span
                key={idx}
                className="px-2 py-0.5 bg-ss-primary/10 text-ss-primary rounded-full"
              >
                {category}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
};
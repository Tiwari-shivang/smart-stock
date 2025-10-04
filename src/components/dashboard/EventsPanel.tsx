import React from 'react';
import { clsx } from 'clsx';
import { motion } from 'framer-motion';
import { 
  Calendar, 
  MapPin, 
  TrendingUp, 
  Users,
  Trophy,
  Music,
  Sun,
  CloudRain,
  Sparkles
} from 'lucide-react';
import { Card, Badge } from '@/components/ui';
import type { Event } from '@/types';

interface EventsPanelProps {
  events: Event[];
  className?: string;
}

export const EventsPanel: React.FC<EventsPanelProps> = ({ events, className }) => {
  const getEventIcon = (type: string) => {
    switch (type) {
      case 'FOOTBALL': return <Trophy size={16} />;
      case 'FESTIVAL': return <Sparkles size={16} />;
      case 'CONCERT': return <Music size={16} />;
      case 'WEATHER': return <CloudRain size={16} />;
      case 'HOLIDAY': return <Sun size={16} />;
      default: return <Calendar size={16} />;
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'HIGH': return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400';
      case 'MEDIUM': return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'LOW': return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400';
      default: return 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400';
    }
  };

  const formatDate = (date: Date) => {
    const now = new Date();
    const diff = date.getTime() - now.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);

    if (hours < 0) return 'Ongoing';
    if (hours < 24) return `In ${hours}h`;
    if (days === 1) return 'Tomorrow';
    if (days < 7) return `In ${days} days`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <Card className={clsx('p-4', className)}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-ss-text">Upcoming Events & Context</h3>
        <Badge variant="default" size="sm">
          {events.length} active
        </Badge>
      </div>

      <div className="space-y-3 max-h-96 overflow-y-auto">
        {events.map((event, index) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="p-3 bg-ss-muted rounded-lg hover:shadow-md transition-all duration-200"
          >
            <div className="flex items-start gap-3">
              {/* Event Icon */}
              <div className={clsx(
                'w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0',
                getImpactColor(event.impact)
              )}>
                {getEventIcon(event.type)}
              </div>

              {/* Event Details */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <h4 className="font-medium text-ss-text text-sm truncate">
                    {event.name}
                  </h4>
                  <span className="text-xs font-medium text-ss-primary whitespace-nowrap">
                    {formatDate(event.date)}
                  </span>
                </div>

                {event.description && (
                  <p className="text-xs text-ss-subtle mt-1 line-clamp-2">
                    {event.description}
                  </p>
                )}

                <div className="flex items-center gap-3 mt-2">
                  {event.location && (
                    <div className="flex items-center gap-1 text-xs text-ss-subtle">
                      <MapPin size={12} />
                      <span>{event.location}</span>
                    </div>
                  )}

                  <div className="flex items-center gap-1 text-xs">
                    <TrendingUp size={12} className="text-green-500" />
                    <span className="text-ss-subtle">
                      {event.estimatedDemandMultiplier}x demand
                    </span>
                  </div>
                </div>

                {/* Affected Categories */}
                <div className="flex flex-wrap gap-1 mt-2">
                  {event.affectedCategories.slice(0, 3).map((category, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 bg-white dark:bg-gray-800 rounded text-xs text-ss-subtle"
                    >
                      {category}
                    </span>
                  ))}
                  {event.affectedCategories.length > 3 && (
                    <span className="px-2 py-0.5 text-xs text-ss-subtle">
                      +{event.affectedCategories.length - 3} more
                    </span>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Tourist/Local Mix Indicator */}
      <div className="mt-4 pt-4 border-t border-ss-line">
        <div className="flex items-center justify-between text-sm">
          <span className="text-ss-subtle">Customer Mix Today</span>
          <div className="flex items-center gap-2">
            <Users size={16} className="text-ss-subtle" />
            <div className="flex h-2 w-32 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700">
              <div className="bg-blue-500 w-[65%]"></div>
              <div className="bg-green-500 w-[35%]"></div>
            </div>
            <span className="text-xs text-ss-subtle">65% Local</span>
          </div>
        </div>
      </div>
    </Card>
  );
};
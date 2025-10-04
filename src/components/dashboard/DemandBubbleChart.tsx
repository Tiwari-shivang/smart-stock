import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui';
import type { DemandBubble } from '@/types';
import { Info, TrendingUp, Package, AlertCircle } from 'lucide-react';

interface DemandBubbleChartProps {
  bubbles: DemandBubble[];
  onBubbleClick?: (bubble: DemandBubble) => void;
}

export const DemandBubbleChart: React.FC<DemandBubbleChartProps> = ({
  bubbles,
  onBubbleClick
}) => {
  const [hoveredBubble, setHoveredBubble] = useState<string | null>(null);
  const [selectedBubble, setSelectedBubble] = useState<DemandBubble | null>(null);

  const getActionIcon = (action: string) => {
    switch (action) {
      case 'RESTOCK': return <Package size={14} />;
      case 'PROMOTE': return <TrendingUp size={14} />;
      case 'REPLACE': return <AlertCircle size={14} />;
      default: return null;
    }
  };

  const handleBubbleClick = (bubble: DemandBubble) => {
    setSelectedBubble(bubble);
    onBubbleClick?.(bubble);
  };

  return (
    <Card className="relative h-full min-h-[300px] p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-ss-text">Demand Intelligence Map</h2>
        <div className="flex items-center gap-4 text-xs">
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span className="text-ss-subtle">Restock</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full bg-blue-500"></div>
            <span className="text-ss-subtle">Promote</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <span className="text-ss-subtle">Replace</span>
          </div>
        </div>
      </div>

      {/* Chart Area */}
      <div className="relative h-64 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-lg overflow-hidden">
        {/* Grid Lines */}
        <svg className="absolute inset-0 w-full h-full">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path
                d="M 40 0 L 0 0 0 40"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.5"
                className="text-gray-300 dark:text-gray-700"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>

        {/* Bubbles */}
        {bubbles.map((bubble, index) => {
          const isHovered = hoveredBubble === bubble.sku;
          const bubbleSize = (bubble.size / 100) * 80 + 20; // Scale size between 20-100px

          return (
            <motion.div
              key={bubble.sku}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ 
                scale: isHovered ? 1.1 : 1, 
                opacity: bubble.confidence 
              }}
              transition={{ 
                delay: index * 0.05,
                duration: 0.3,
                type: 'spring',
                stiffness: 200
              }}
              className="absolute cursor-pointer"
              style={{
                left: `${bubble.x}%`,
                top: `${bubble.y}%`,
                transform: 'translate(-50%, -50%)'
              }}
              onMouseEnter={() => setHoveredBubble(bubble.sku)}
              onMouseLeave={() => setHoveredBubble(null)}
              onClick={() => handleBubbleClick(bubble)}
            >
              {/* Bubble Circle */}
              <div
                className="relative flex items-center justify-center rounded-full transition-all duration-300"
                style={{
                  width: `${bubbleSize}px`,
                  height: `${bubbleSize}px`,
                  backgroundColor: bubble.color,
                  borderWidth: `${bubble.volatility * 4}px`,
                  borderColor: 'rgba(255, 255, 255, 0.5)',
                  boxShadow: isHovered 
                    ? '0 10px 30px rgba(0, 0, 0, 0.3)' 
                    : '0 4px 10px rgba(0, 0, 0, 0.1)'
                }}
              >
                {/* Bubble Content */}
                <div className="text-white text-center">
                  <div className="flex items-center justify-center mb-1">
                    {getActionIcon(bubble.action)}
                  </div>
                  <p className="text-xs font-medium truncate px-2">
                    {bubble.label}
                  </p>
                  <p className="text-xs opacity-80">
                    {bubble.size}%
                  </p>
                </div>

                {/* Pulse Animation for High Priority */}
                {bubble.size > 70 && (
                  <motion.div
                    className="absolute inset-0 rounded-full border-2"
                    style={{ borderColor: bubble.color }}
                    animate={{
                      scale: [1, 1.3, 1],
                      opacity: [0.5, 0, 0.5]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: 'easeInOut'
                    }}
                  />
                )}
              </div>

              {/* Tooltip */}
              <AnimatePresence>
                {isHovered && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute z-10 top-full mt-2 left-1/2 transform -translate-x-1/2"
                  >
                    <div className="bg-gray-900 text-white rounded-lg px-3 py-2 text-xs whitespace-nowrap">
                      <div className="font-semibold mb-1">{bubble.label}</div>
                      <div className="space-y-1">
                        <div>Impact: {bubble.size}%</div>
                        <div>Confidence: {Math.round(bubble.confidence * 100)}%</div>
                        <div>Volatility: {Math.round(bubble.volatility * 100)}%</div>
                      </div>
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2">
                        <div className="w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-gray-900"></div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>

      {/* Selected Bubble Details */}
      <AnimatePresence>
        {selectedBubble && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-4 p-3 bg-ss-muted rounded-lg"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-ss-text">{selectedBubble.label}</h3>
                <p className="text-sm text-ss-subtle mt-1">
                  Recommended action: {selectedBubble.action}
                </p>
              </div>
              <button
                onClick={() => setSelectedBubble(null)}
                className="text-ss-subtle hover:text-ss-text transition-colors"
              >
                ×
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Info Note */}
      <div className="flex items-start gap-2 mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
        <Info className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
        <p className="text-xs text-ss-subtle">
          Bubble size represents impact score. Border thickness indicates volatility. 
          Opacity shows confidence level. Click bubbles for detailed insights.
        </p>
      </div>
    </Card>
  );
};
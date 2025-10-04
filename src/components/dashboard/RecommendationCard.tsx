import React, { useState } from 'react';
import { clsx } from 'clsx';
import { motion } from 'framer-motion';
import { 
  Check, 
  X, 
  Clock, 
  TrendingUp, 
  Package, 
  ShoppingCart,
  AlertCircle,
  Sparkles
} from 'lucide-react';
import { Card, Badge, Button } from '@/components/ui';
import type { Recommendation } from '@/types';

interface RecommendationCardProps {
  recommendation: Recommendation;
  onApprove?: (id: string) => void;
  onReject?: (id: string) => void;
  onDefer?: (id: string) => void;
  isSelected?: boolean;
  onSelect?: (id: string) => void;
}

export const RecommendationCard: React.FC<RecommendationCardProps> = ({
  recommendation,
  onApprove,
  onReject,
  onDefer,
  isSelected = false,
  onSelect
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getActionIcon = (action: string) => {
    switch (action) {
      case 'RESTOCK': return <Package size={16} />;
      case 'PROMOTE': return <TrendingUp size={16} />;
      case 'REPLACE': return <AlertCircle size={16} />;
      default: return null;
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.8) return 'text-green-600';
    if (confidence >= 0.6) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'HIGH': return 'border-red-500';
      case 'MEDIUM': return 'border-yellow-500';
      case 'LOW': return 'border-blue-500';
      default: return 'border-gray-300';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card
        className={clsx(
          'relative overflow-hidden transition-all duration-300',
          isExpanded && 'ring-2 ring-ss-primary',
          getPriorityColor(recommendation.priority),
          'border-l-4'
        )}
        hoverable
      >
        {/* Selection Checkbox (for batch mode) */}
        {onSelect && (
          <div className="absolute top-4 left-4 z-10">
            <input
              type="checkbox"
              checked={isSelected}
              onChange={() => onSelect(recommendation.id)}
              className="w-5 h-5 rounded border-ss-line text-ss-primary focus:ring-ss-primary"
            />
          </div>
        )}

        {/* Header */}
        <div className="flex items-start gap-4 mb-4">
          {/* Product Image */}
          <div className="relative flex-shrink-0">
            <img
              src={recommendation.imageUrl || 'https://via.placeholder.com/100'}
              alt={recommendation.skuName}
              className="w-20 h-20 object-cover rounded-lg"
            />
            {recommendation.volatility > 0.5 && (
              <div className="absolute -top-2 -right-2">
                <Sparkles className="w-5 h-5 text-yellow-500" />
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-semibold text-lg text-ss-text truncate">
                {recommendation.skuName}
              </h3>
              <Badge
                variant={recommendation.action.toLowerCase() as any}
                icon={getActionIcon(recommendation.action)}
                size="sm"
              >
                {recommendation.action}
              </Badge>
            </div>

            <div className="flex items-center gap-4 text-sm">
              {/* SKU ID */}
              <span className="text-ss-subtle">#{recommendation.sku}</span>

              {/* Confidence Score */}
              <div className="flex items-center gap-1">
                <span className={clsx('font-medium', getConfidenceColor(recommendation.confidence))}>
                  {Math.round(recommendation.confidence * 100)}%
                </span>
                <span className="text-ss-subtle">confidence</span>
              </div>

              {/* Impact Score */}
              <div className="flex items-center gap-1">
                <div className="w-16 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-ss-primary to-ss-blue"
                    style={{ width: `${recommendation.impactScore}%` }}
                  />
                </div>
                <span className="text-ss-subtle text-xs">{recommendation.impactScore}</span>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="flex flex-col items-end gap-1 text-right">
            {recommendation.estimatedRevenue && (
              <div>
                <span className={clsx(
                  'font-semibold text-lg',
                  recommendation.estimatedRevenue > 0 ? 'text-green-600' : 'text-red-600'
                )}>
                  {recommendation.estimatedRevenue > 0 ? '+' : ''}${Math.abs(recommendation.estimatedRevenue)}
                </span>
                <p className="text-xs text-ss-subtle">est. revenue</p>
              </div>
            )}
            {recommendation.quantity && recommendation.quantity > 0 && (
              <div className="text-sm text-ss-subtle">
                Qty: <span className="font-medium text-ss-text">{recommendation.quantity}</span>
              </div>
            )}
          </div>
        </div>

        {/* Reasons */}
        <div className="mb-4">
          <p className="text-sm text-ss-subtle mb-2">Why this recommendation?</p>
          <div className="flex flex-wrap gap-2">
            {recommendation.reasons.map((reason, index) => (
              <Badge key={index} variant="default" size="sm">
                {reason}
              </Badge>
            ))}
          </div>
        </div>

        {/* Expanded Content */}
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-4 pt-4 border-t border-ss-line"
          >
            {/* Cross-sell Suggestions */}
            {recommendation.crossSellSuggestions && recommendation.crossSellSuggestions.length > 0 && (
              <div className="mb-3">
                <p className="text-sm text-ss-subtle mb-1">Cross-sell opportunities:</p>
                <div className="flex gap-2">
                  {recommendation.crossSellSuggestions.map((item, index) => (
                    <Badge key={index} variant="info" size="sm" icon={<ShoppingCart size={12} />}>
                      {item}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Shelf Fit Status */}
            <div className="flex items-center gap-2 text-sm">
              <span className="text-ss-subtle">Shelf fit:</span>
              <span className={clsx(
                'font-medium',
                recommendation.shelfFit ? 'text-green-600' : 'text-red-600'
              )}>
                {recommendation.shelfFit ? 'Available' : 'Needs rearrangement'}
              </span>
            </div>
          </motion.div>
        )}

        {/* Actions Footer */}
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-ss-line">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-sm text-ss-primary hover:text-ss-blue transition-colors"
          >
            {isExpanded ? 'Show less' : 'Show more'}
          </button>

          <div className="flex gap-2">
            <Button
              variant="success"
              size="sm"
              icon={<Check size={16} />}
              onClick={() => onApprove?.(recommendation.id)}
            >
              Approve
            </Button>
            <Button
              variant="danger"
              size="sm"
              icon={<X size={16} />}
              onClick={() => onReject?.(recommendation.id)}
            >
              Reject
            </Button>
            <Button
              variant="ghost"
              size="sm"
              icon={<Clock size={16} />}
              onClick={() => onDefer?.(recommendation.id)}
            >
              Defer
            </Button>
          </div>
        </div>

        {/* Keyboard Shortcuts Hint */}
        <div className="absolute bottom-2 left-4 text-xs text-ss-subtle opacity-0 hover:opacity-100 transition-opacity">
          Press <kbd className="px-1 py-0.5 bg-ss-muted rounded">A</kbd> to approve,{' '}
          <kbd className="px-1 py-0.5 bg-ss-muted rounded">R</kbd> to reject,{' '}
          <kbd className="px-1 py-0.5 bg-ss-muted rounded">D</kbd> to defer
        </div>
      </Card>
    </motion.div>
  );
};
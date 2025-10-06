import React from 'react';
import { clsx } from 'clsx';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from './Button';

interface PaginationProps {
  currentIndex: number;
  totalItems: number;
  onPrevious: () => void;
  onNext: () => void;
  onSelect: (index: number) => void;
  maxDots?: number;
  className?: string;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentIndex,
  totalItems,
  onPrevious,
  onNext,
  onSelect,
  maxDots = 5,
  className
}) => {
  if (totalItems <= 1) return null;

  return (
    <div className={clsx('flex items-center gap-3', className)}>
      <Button
        variant="ghost"
        size="sm"
        icon={<ChevronLeft size={20} />}
        onClick={onPrevious}
        className="w-10 h-10 p-0"
        disabled={totalItems === 0}
      />
      
      {/* Page Indicators */}
      <div className="flex gap-2">
        {Array.from({ length: Math.min(maxDots, totalItems) }).map((_, index) => (
          <button
            key={index}
            onClick={() => onSelect(index)}
            className={clsx(
              'w-3 h-3 rounded-full transition-colors',
              index === currentIndex
                ? 'bg-ss-primary'
                : 'bg-ss-line hover:bg-ss-subtle'
            )}
            aria-label={`Go to item ${index + 1}`}
          />
        ))}
        {totalItems > maxDots && (
          <span className="text-xs text-ss-subtle ml-1">...</span>
        )}
      </div>
      
      <Button
        variant="ghost"
        size="sm"
        icon={<ChevronRight size={20} />}
        onClick={onNext}
        className="w-10 h-10 p-0"
        disabled={totalItems === 0}
      />
    </div>
  );
};
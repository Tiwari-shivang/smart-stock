import React from 'react';
import { clsx } from 'clsx';

interface GridItemProps {
  children: React.ReactNode;
  colSpan?: {
    mobile?: number;
    lg?: number;
    desktop?: number;
  };
  className?: string;
}

export const GridItem: React.FC<GridItemProps> = ({
  children,
  colSpan = { mobile: 1, lg: 4, desktop: 6 },
  className
}) => {
  return (
    <div
      className={clsx(
        'col-span-1',
        `lg:col-span-${colSpan.lg || 4}`,
        `desktop:col-span-${colSpan.desktop || 6}`,
        className
      )}
      style={{
        gridColumn: `span ${colSpan.mobile || 1} / span ${colSpan.mobile || 1}`
      }}
    >
      {children}
    </div>
  );
};

interface DashboardGridProps {
  children: React.ReactNode;
  className?: string;
}

export const DashboardGrid: React.FC<DashboardGridProps> = ({
  children,
  className
}) => {
  return (
    <div
      className={clsx(
        'dashboard-grid',
        'grid grid-cols-1 lg:grid-cols-8 desktop:grid-cols-12',
        'gap-4 p-4 lg:p-6 desktop:p-8',
        className
      )}
    >
      {children}
    </div>
  );
};

// Pre-configured grid sections based on the updated layout specifications
export const DashboardSections = {
  // A1: Greeting / Summary (columns 1-6)
  GreetingSummary: ({ children }: { children: React.ReactNode }) => (
    <div className="col-span-1 lg:col-span-4 desktop:col-span-6">
      {children}
    </div>
  ),

  // A2: Quick Cards (columns 7-12)
  QuickCards: ({ children }: { children: React.ReactNode }) => (
    <div className="col-span-1 lg:col-span-4 desktop:col-span-6 grid grid-cols-2 lg:grid-cols-2 gap-4">
      {children}
    </div>
  ),

  // Left Column: Main Content (columns 1-8)
  LeftColumn: ({ children }: { children: React.ReactNode }) => (
    <div className="col-span-1 lg:col-span-8 desktop:col-span-8 flex flex-col gap-6 h-full">
      {children}
    </div>
  ),

  // Right Column: Side Content (columns 9-12)
  RightColumn: ({ children }: { children: React.ReactNode }) => (
    <div className="col-span-1 lg:col-span-8 desktop:col-span-4 flex flex-col gap-6 h-full">
      {children}
    </div>
  ),

  // Full Width Section (columns 1-12)
  FullWidth: ({ children }: { children: React.ReactNode }) => (
    <div className="col-span-1 lg:col-span-8 desktop:col-span-12">
      {children}
    </div>
  ),

  // Legacy sections for backward compatibility
  DemandBubbles: ({ children }: { children: React.ReactNode }) => (
    <div className="col-span-1 lg:col-span-8 desktop:col-span-8">
      {children}
    </div>
  ),

  EventsAndActions: ({ children }: { children: React.ReactNode }) => (
    <div className="col-span-1 lg:col-span-8 desktop:col-span-4 space-y-4">
      {children}
    </div>
  ),

  RecommendationFeed: ({ children }: { children: React.ReactNode }) => (
    <div className="col-span-1 lg:col-span-8 desktop:col-span-8">
      {children}
    </div>
  ),

  PromotionsBundles: ({ children }: { children: React.ReactNode }) => (
    <div className="col-span-1 lg:col-span-8 desktop:col-span-8">
      {children}
    </div>
  ),

  ImpactTrends: ({ children }: { children: React.ReactNode }) => (
    <div className="col-span-1 lg:col-span-8 desktop:col-span-4">
      {children}
    </div>
  )
};
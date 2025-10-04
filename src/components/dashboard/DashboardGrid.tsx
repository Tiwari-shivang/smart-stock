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

// Pre-configured grid sections based on the style guide layout map
export const DashboardSections = {
  // A1: Greeting / Summary (columns 1-6)
  GreetingSummary: ({ children }: { children: React.ReactNode }) => (
    <div className="col-span-1 lg:col-span-8 desktop:col-span-6">
      {children}
    </div>
  ),

  // A2-A5: Quick Cards (columns 7-10, 2x2 grid)
  QuickCards: ({ children }: { children: React.ReactNode }) => (
    <div className="col-span-1 lg:col-span-8 desktop:col-span-4 grid grid-cols-1 lg:grid-cols-2 gap-4">
      {children}
    </div>
  ),

  // A6: Store Overview (columns 11-12)
  StoreOverview: ({ children }: { children: React.ReactNode }) => (
    <div className="col-span-1 lg:col-span-8 desktop:col-span-2">
      {children}
    </div>
  ),

  // B1: Demand Bubbles (columns 1-9)
  DemandBubbles: ({ children }: { children: React.ReactNode }) => (
    <div className="col-span-1 lg:col-span-8 desktop:col-span-9">
      {children}
    </div>
  ),

  // B2-B3: Events & Actions (columns 10-12)
  EventsAndActions: ({ children }: { children: React.ReactNode }) => (
    <div className="col-span-1 lg:col-span-8 desktop:col-span-3 space-y-4">
      {children}
    </div>
  ),

  // C: Recommendation Feed (full width)
  RecommendationFeed: ({ children }: { children: React.ReactNode }) => (
    <div className="col-span-1 lg:col-span-8 desktop:col-span-12">
      {children}
    </div>
  ),

  // D1: Promotions & Bundles (columns 1-8)
  PromotionsBundles: ({ children }: { children: React.ReactNode }) => (
    <div className="col-span-1 lg:col-span-8 desktop:col-span-8">
      {children}
    </div>
  ),

  // D2: Impact & Trends (columns 9-12)
  ImpactTrends: ({ children }: { children: React.ReactNode }) => (
    <div className="col-span-1 lg:col-span-8 desktop:col-span-4">
      {children}
    </div>
  )
};
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Plus,
  CloudRain,
  Search,
  Package,
  TrendingUp,
  CheckSquare,
  RefreshCw,
  Download
} from 'lucide-react';
import {
  DashboardLayout,
  DashboardGrid,
  DashboardSections,
  RecommendationCard,
  DemandBubbleChart,
  KPITile,
  EventsPanel,
  WeatherImpactPanel
} from '@/components/dashboard';
import { Button, Card, Badge, Pagination } from '@/components/ui';
import { useDashboardStore } from '@/store/dashboardStore';

export const Dashboard: React.FC = () => {
  const {
    recommendations,
    events,
    storeMetrics,
    weatherImpact,
    kpiTiles,
    demandBubbles,
    bundles,
    activeTab,
    selectedRecommendations,
    isLoading,
    currentRecommendationIndex,
    setActiveTab,
    toggleRecommendationSelection,
    approveRecommendation,
    rejectRecommendation,
    deferRecommendation,
    batchApproveRecommendations,
    refreshData,
    nextRecommendation,
    previousRecommendation
  } = useDashboardStore();

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement) return;

      switch (e.key.toLowerCase()) {
        case 'a':
          if (selectedRecommendations.length > 0) {
            batchApproveRecommendations();
          } else if (recommendations.length > 0) {
            approveRecommendation(recommendations[currentRecommendationIndex].id);
          }
          break;
        case 'r':
          if (e.ctrlKey || e.metaKey) {
            refreshData();
          } else if (recommendations.length > 0) {
            rejectRecommendation(recommendations[currentRecommendationIndex].id);
          }
          break;
        case 'd':
          if (recommendations.length > 0) {
            deferRecommendation(recommendations[currentRecommendationIndex].id);
          }
          break;
        case 'arrowleft':
          e.preventDefault();
          previousRecommendation();
          break;
        case 'arrowright':
          e.preventDefault();
          nextRecommendation();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [selectedRecommendations, recommendations, currentRecommendationIndex, batchApproveRecommendations, refreshData, approveRecommendation, rejectRecommendation, deferRecommendation, nextRecommendation, previousRecommendation]);

  const getCurrentGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <DashboardLayout activeTab={activeTab} onTabChange={setActiveTab}>
      <DashboardGrid>
        {/* A1: Greeting & Summary with KPI Tiles */}
        <DashboardSections.GreetingSummary>
          <div className="space-y-4">
            {/* Top Row: Greeting Card matching height with right side cards */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card 
                className="h-32 text-white p-4"
                style={{
                  background: 'linear-gradient(135deg, #eb0e2a 0%, #ff6c01 100%)'
                }}
              >
                <div className="flex justify-between items-start h-full">
                  <div className="flex-1">
                    <h2 className="text-xl text-white font-bold mb-1">
                      {getCurrentGreeting()}, {storeMetrics.storeName}!
                    </h2>
                    <p className="opacity-90 text-white text-sm mb-2">
                      You're ranked #{storeMetrics.rank} out of {storeMetrics.totalRanks} stores
                    </p>
                    <div className="flex gap-2 flex-wrap">
                      <Badge variant="default" className="bg-white/20 text-white text-xs">
                        {storeMetrics.pendingRecommendations} pending actions
                      </Badge>
                      <Badge variant="default" className="bg-white/20 text-white text-xs">
                        +{storeMetrics.revenueDelta}% revenue
                      </Badge>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
            
            {/* Bottom Row: KPI Tiles matching height with right side cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
              {kpiTiles.slice(0, 2).map((kpi, index) => (
                <motion.div
                  key={kpi.title}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="h-32">
                    <KPITile {...kpi} size="sm" />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </DashboardSections.GreetingSummary>

        {/* A2-A5: Quick Action Cards */}
        <DashboardSections.QuickCards>
          {/* Add Event Card */}
          <Card className="h-32 p-4 hover:shadow-lg transition-all cursor-pointer group">
            <div className="flex flex-col justify-center h-full">
              <div className="flex items-center gap-4 mb-2">
                <motion.div 
                  className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <Plus className="text-green-600" size={24} />
                </motion.div>
                <div>
                  <h4 className="font-semibold text-base text-ss-text">Add Event</h4>
                  <p className="text-sm text-ss-subtle">Football/Festival</p>
                </div>
              </div>
            </div>
          </Card>

          {/* Weather Impact Card */}
          <Card className="h-32 p-4 hover:shadow-lg transition-all cursor-pointer group">
            <div className="flex flex-col justify-center h-full">
              <div className="flex items-center gap-4 mb-2">
                <motion.div 
                  className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center"
                  whileHover={{ scale: 1.1, y: -2 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <CloudRain className="text-blue-600" size={24} />
                </motion.div>
                <div>
                  <h4 className="font-semibold text-base text-ss-text">Weather</h4>
                  <p className="text-sm text-ss-subtle">{weatherImpact.demandModifier}x impact</p>
                </div>
              </div>
            </div>
          </Card>

          {/* Bulk Approvals Card */}
          <Card className="h-32 p-4 hover:shadow-lg transition-all cursor-pointer group">
            <div className="flex flex-col justify-center h-full">
              <div className="flex items-center gap-4 mb-2">
                <motion.div 
                  className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center"
                  whileHover={{ scale: 1.1, rotate: -5 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <Package className="text-purple-600" size={24} />
                </motion.div>
                <div>
                  <h4 className="font-semibold text-base text-ss-text">Bulk Actions</h4>
                  <p className="text-sm text-ss-subtle">Quick approve</p>
                </div>
              </div>
            </div>
          </Card>

          {/* Command Search Card */}
          <Card className="h-32 p-4 hover:shadow-lg transition-all cursor-pointer group">
            <div className="flex flex-col justify-center h-full">
              <div className="flex items-center gap-4 mb-2">
                <motion.div 
                  className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg flex items-center justify-center"
                  whileHover={{ scale: 1.15, rotate: 10 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <Search className="text-yellow-600" size={24} />
                </motion.div>
                <div>
                  <h4 className="font-semibold text-base text-ss-text">Search</h4>
                  <p className="text-sm text-ss-subtle">Cmd + K</p>
                </div>
              </div>
            </div>
          </Card>
        </DashboardSections.QuickCards>

        {/* Main Content Row - Equal Height Columns */}
        <div className="col-span-1 lg:col-span-8 desktop:col-span-12 grid grid-cols-1 desktop:grid-cols-12 gap-6">
          {/* Left Column: Main Content (col-8) */}
          <div className="col-span-1 desktop:col-span-8 flex flex-col gap-6">
            {/* Demand Intelligence Map */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <DemandBubbleChart
                bubbles={demandBubbles}
                onBubbleClick={(bubble) => console.log('Bubble clicked:', bubble)}
              />
            </motion.div>

            {/* AI Recommendations - Single Card with Pagination */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-ss-text">
                    AI Recommendations
                  </h2>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      icon={<RefreshCw size={16} className={isLoading ? 'animate-spin' : ''} />}
                      onClick={refreshData}
                      disabled={isLoading}
                    >
                      Refresh
                    </Button>
                    <select className="px-3 py-1.5 text-sm bg-ss-muted rounded-lg outline-none">
                      <option>Priority: High to Low</option>
                      <option>Confidence: High to Low</option>
                      <option>Impact: High to Low</option>
                      <option>Date: Newest First</option>
                    </select>
                  </div>
                </div>

                {/* Single Recommendation Card */}
                {recommendations.length > 0 && (
                  <div className="mb-4">
                    <motion.div
                      key={currentRecommendationIndex}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <RecommendationCard
                        recommendation={recommendations[currentRecommendationIndex]}
                        onApprove={approveRecommendation}
                        onReject={rejectRecommendation}
                        onDefer={deferRecommendation}
                        isSelected={selectedRecommendations.includes(recommendations[currentRecommendationIndex]?.id)}
                        onSelect={toggleRecommendationSelection}
                      />
                    </motion.div>
                  </div>
                )}

                {/* Pagination Controls */}
                <div className="flex items-center justify-between">
                  <div className="text-sm text-ss-subtle">
                    {recommendations.length > 0 ? (
                      <>Recommendation {currentRecommendationIndex + 1} of {recommendations.length}</>
                    ) : (
                      'No recommendations available'
                    )}
                  </div>

                  {recommendations.length > 1 && (
                    <Pagination
                      currentIndex={currentRecommendationIndex}
                      totalItems={recommendations.length}
                      onPrevious={previousRecommendation}
                      onNext={nextRecommendation}
                      onSelect={(index) => useDashboardStore.getState().setRecommendationIndex(index)}
                      maxDots={5}
                    />
                  )}
                </div>
              </Card>
            </motion.div>

            {/* Current Promotions & Bundles */}
            <Card className="p-4 flex-1">
              <h3 className="font-semibold text-ss-text mb-4">Current Promotions & Bundles</h3>
              <div className="space-y-3">
                {bundles.filter(b => b.active).map((bundle) => (
                  <div
                    key={bundle.id}
                    className="flex items-center justify-between p-3 bg-ss-muted rounded-lg hover:shadow-md transition-all"
                  >
                    <div>
                      <h4 className="font-medium text-sm text-ss-text">{bundle.name}</h4>
                      <p className="text-xs text-ss-subtle mt-1">
                        {bundle.items.join(' + ')}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-green-600">
                        +{bundle.projectedUplift}%
                      </p>
                      <p className="text-xs text-ss-subtle">
                        {Math.round(bundle.attachRate * 100)}% attach
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Right Column: Side Content (col-4) */}
          <div className="col-span-1 desktop:col-span-4 flex flex-col gap-6">
            {/* Upcoming Events & Context */}
            <EventsPanel events={events} />

            {/* Today's Actions Summary */}
            <Card className="p-4">
              <h3 className="font-semibold text-ss-text mb-3">Today's Actions</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-2 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <span className="text-sm text-ss-text">Restock</span>
                  <Badge variant="restock">{recommendations.filter(r => r.action === 'RESTOCK').length}</Badge>
                </div>
                <div className="flex items-center justify-between p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <span className="text-sm text-ss-text">Promote</span>
                  <Badge variant="promote">{recommendations.filter(r => r.action === 'PROMOTE').length}</Badge>
                </div>
                <div className="flex items-center justify-between p-2 bg-red-50 dark:bg-red-900/20 rounded-lg">
                  <span className="text-sm text-ss-text">Replace</span>
                  <Badge variant="replace">{recommendations.filter(r => r.action === 'REPLACE').length}</Badge>
                </div>
              </div>
            </Card>

            {/* Weather Impact Panel */}
            <div className="flex-1">
              <WeatherImpactPanel weather={weatherImpact} />
            </div>
          </div>
        </div>


        {/* Bottom KPI Tiles Row - Full Width (col-12) */}
        <DashboardSections.FullWidth>
          <div className="grid grid-cols-2 lg:grid-cols-4 desktop:grid-cols-4 gap-4">
            {kpiTiles.slice(2).map((kpi, index) => (
              <motion.div
                key={kpi.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <KPITile {...kpi} size="md" />
              </motion.div>
            ))}
          </div>
        </DashboardSections.FullWidth>
      </DashboardGrid>
    </DashboardLayout>
  );
};
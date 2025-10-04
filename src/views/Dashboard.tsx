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
import { Button, Card, Badge } from '@/components/ui';
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
    setActiveTab,
    toggleRecommendationSelection,
    approveRecommendation,
    rejectRecommendation,
    deferRecommendation,
    batchApproveRecommendations,
    refreshData
  } = useDashboardStore();

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement) return;
      
      switch (e.key.toLowerCase()) {
        case 'a':
          if (selectedRecommendations.length > 0) {
            batchApproveRecommendations();
          }
          break;
        case 'r':
          refreshData();
          break;
      }
    };

    window.addEventListener('keypress', handleKeyPress);
    return () => window.removeEventListener('keypress', handleKeyPress);
  }, [selectedRecommendations, batchApproveRecommendations, refreshData]);

  const getCurrentGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <DashboardLayout activeTab={activeTab} onTabChange={setActiveTab}>
      <DashboardGrid>
        {/* A1: Greeting & Summary */}
        <DashboardSections.GreetingSummary>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="h-32 bg-gradient-to-r from-ss-primary to-ss-blue text-white">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-2xl font-bold mb-2">
                    {getCurrentGreeting()}, {storeMetrics.storeName}!
                  </h2>
                  <p className="opacity-90">
                    You're ranked #{storeMetrics.rank} out of {storeMetrics.totalRanks} stores
                  </p>
                  <div className="flex gap-3 mt-3">
                    <Badge variant="default" className="bg-white/20 text-white">
                      {storeMetrics.pendingRecommendations} pending actions
                    </Badge>
                    <Badge variant="default" className="bg-white/20 text-white">
                      +{storeMetrics.revenueDelta}% revenue
                    </Badge>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    icon={<CheckSquare size={16} />}
                    className="text-white border-white/30 hover:bg-white/10"
                    onClick={batchApproveRecommendations}
                    disabled={selectedRecommendations.length === 0}
                  >
                    Approve All ({selectedRecommendations.length})
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    icon={<Download size={16} />}
                    className="text-white border-white/30 hover:bg-white/10"
                  >
                    Export
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        </DashboardSections.GreetingSummary>

        {/* A2-A5: Quick Action Cards */}
        <DashboardSections.QuickCards>
          {/* Add Event Card */}
          <Card className="p-3 hover:shadow-lg transition-all cursor-pointer group">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                <Plus className="text-green-600" size={20} />
              </div>
              <div>
                <h4 className="font-medium text-sm text-ss-text">Add Event</h4>
                <p className="text-xs text-ss-subtle">Football/Festival</p>
              </div>
            </div>
          </Card>

          {/* Weather Impact Card */}
          <Card className="p-3 hover:shadow-lg transition-all cursor-pointer group">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                <CloudRain className="text-blue-600" size={20} />
              </div>
              <div>
                <h4 className="font-medium text-sm text-ss-text">Weather</h4>
                <p className="text-xs text-ss-subtle">{weatherImpact.demandModifier}x impact</p>
              </div>
            </div>
          </Card>

          {/* Bulk Approvals Card */}
          <Card className="p-3 hover:shadow-lg transition-all cursor-pointer group">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                <Package className="text-purple-600" size={20} />
              </div>
              <div>
                <h4 className="font-medium text-sm text-ss-text">Bulk Actions</h4>
                <p className="text-xs text-ss-subtle">Quick approve</p>
              </div>
            </div>
          </Card>

          {/* Command Search Card */}
          <Card className="p-3 hover:shadow-lg transition-all cursor-pointer group">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                <Search className="text-yellow-600" size={20} />
              </div>
              <div>
                <h4 className="font-medium text-sm text-ss-text">Search</h4>
                <p className="text-xs text-ss-subtle">Cmd + K</p>
              </div>
            </div>
          </Card>
        </DashboardSections.QuickCards>

        {/* A6: Store Overview - KPI Tiles */}
        <DashboardSections.StoreOverview>
          <div className="grid grid-cols-1 gap-3">
            {kpiTiles.slice(0, 2).map((kpi, index) => (
              <motion.div
                key={kpi.title}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <KPITile {...kpi} size="sm" />
              </motion.div>
            ))}
          </div>
        </DashboardSections.StoreOverview>

        {/* B1: Demand Bubbles */}
        <DashboardSections.DemandBubbles>
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
        </DashboardSections.DemandBubbles>

        {/* B2-B3: Events & Actions */}
        <DashboardSections.EventsAndActions>
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
        </DashboardSections.EventsAndActions>

        {/* C: Recommendation Feed */}
        <DashboardSections.RecommendationFeed>
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
            
            <div className="grid gap-4">
              {recommendations.slice(0, 5).map((rec, index) => (
                <motion.div
                  key={rec.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <RecommendationCard
                    recommendation={rec}
                    onApprove={approveRecommendation}
                    onReject={rejectRecommendation}
                    onDefer={deferRecommendation}
                    isSelected={selectedRecommendations.includes(rec.id)}
                    onSelect={toggleRecommendationSelection}
                  />
                </motion.div>
              ))}
            </div>
          </Card>
        </DashboardSections.RecommendationFeed>

        {/* D1: Promotions & Bundles */}
        <DashboardSections.PromotionsBundles>
          <Card className="p-4">
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
        </DashboardSections.PromotionsBundles>

        {/* D2: Weather Impact */}
        <DashboardSections.ImpactTrends>
          <WeatherImpactPanel weather={weatherImpact} />
        </DashboardSections.ImpactTrends>

        {/* Additional KPI Tiles Row */}
        <div className="col-span-1 lg:col-span-8 desktop:col-span-12 grid grid-cols-2 lg:grid-cols-4 desktop:grid-cols-6 gap-4">
          {kpiTiles.slice(2).map((kpi, index) => (
            <motion.div
              key={kpi.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="col-span-1"
            >
              <KPITile {...kpi} size="sm" />
            </motion.div>
          ))}
        </div>
      </DashboardGrid>
    </DashboardLayout>
  );
};
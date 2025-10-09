import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Plus,
  CloudRain,
  Package,
  CheckSquare,
  RefreshCw,
  Star,
  X,
  TrendingUp
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
    previousRecommendation,
    addEvent,
    generateEventRecommendations
  } = useDashboardStore();

  const [isBestSellersModalOpen, setIsBestSellersModalOpen] = useState(false);
  const [isAddEventModalOpen, setIsAddEventModalOpen] = useState(false);
  const [highlightWeather, setHighlightWeather] = useState(false);
  const [highlightBundles, setHighlightBundles] = useState(false);
  
  // Event form state
  const [eventForm, setEventForm] = useState({
    name: '',
    type: 'FOOTBALL' as const,
    date: '',
    time: '',
    impact: 'MEDIUM' as const,
    location: '',
    description: '',
    affectedCategories: [] as string[],
    estimatedDemandMultiplier: 1.5
  });

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

  // Get best seller items - essential daily items that customers buy frequently
  const getBestSellerItems = () => {
    // Essential daily item categories and keywords
    const essentialKeywords = [
      'toothpaste', 'soap', 'beer', 'cigarette', 'towel', 'tissue', 'shampoo',
      'deodorant', 'razor', 'brush', 'milk', 'bread', 'coffee', 'water',
      'cola', 'chips', 'chocolate', 'candy', 'energy drink', 'juice'
    ];
    
    // Filter recommendations for essential items
    const essentialItems = recommendations.filter(rec => {
      const itemName = rec.skuName?.toLowerCase() || rec.sku?.toLowerCase() || '';
      return essentialKeywords.some(keyword => itemName.includes(keyword));
    });
    
    // If we have essential items, prioritize them
    if (essentialItems.length > 0) {
      return essentialItems
        .sort((a, b) => (b.confidence * b.impactScore) - (a.confidence * a.impactScore))
        .slice(0, 8);
    }
    
    // Fallback to high-performing items if no essentials found
    return recommendations
      .filter(rec => rec.confidence >= 0.8 || rec.impactScore >= 70)
      .sort((a, b) => (b.confidence * b.impactScore) - (a.confidence * a.impactScore))
      .slice(0, 8);
  };

  const bestSellerItems = getBestSellerItems();

  // Filter out weather-based recommendations from stock recommendations
  const nonWeatherRecommendations = recommendations.filter(rec => {
    const weatherKeywords = ['rainy', 'weather', 'rain', 'storm', 'umbrella'];
    const hasWeatherReason = rec.reasons.some(reason =>
      weatherKeywords.some(keyword => reason.toLowerCase().includes(keyword))
    );
    return !hasWeatherReason;
  });

  // Scroll and highlight functions
  const scrollToWeather = () => {
    const element = document.getElementById('weather-impact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setHighlightWeather(true);
      setTimeout(() => setHighlightWeather(false), 1000);
    }
  };

  const scrollToBundles = () => {
    const element = document.getElementById('current-bundles');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setHighlightBundles(true);
      setTimeout(() => setHighlightBundles(false), 1000);
    }
  };

  // Handle event form submission
  const handleCreateEvent = () => {
    // Create new event
    const newEvent = {
      id: `event-${Date.now()}`,
      name: eventForm.name,
      type: eventForm.type,
      date: new Date(`${eventForm.date}T${eventForm.time}`),
      impact: eventForm.impact,
      location: eventForm.location,
      description: eventForm.description,
      affectedCategories: eventForm.affectedCategories,
      estimatedDemandMultiplier: eventForm.estimatedDemandMultiplier
    };

    // Add event to store and generate recommendations
    addEvent(newEvent);
    generateEventRecommendations(newEvent);
    
    // Reset form and close modal
    setEventForm({
      name: '',
      type: 'FOOTBALL',
      date: '',
      time: '',
      impact: 'MEDIUM',
      location: '',
      description: '',
      affectedCategories: [],
      estimatedDemandMultiplier: 1.5
    });
    setIsAddEventModalOpen(false);
  };


  // Available categories for events
  const availableCategories = [
    'Beverages', 'Snacks', 'Alcohol', 'Ready-to-Eat', 'Personal Care', 
    'Household', 'Instant Food', 'Dairy & Frozen', 'Non-Food'
  ];

  // Handle category selection
  const toggleCategory = (category: string) => {
    setEventForm(prev => ({
      ...prev,
      affectedCategories: prev.affectedCategories.includes(category)
        ? prev.affectedCategories.filter(c => c !== category)
        : [...prev.affectedCategories, category]
    }));
  };

  return (
    <DashboardLayout activeTab="overview">
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
          {/* Total Recommendations Card */}
          <Card
            className="h-32 p-4 hover:shadow-lg transition-all cursor-pointer group"
            onClick={() => {
              const element = document.getElementById('stock-recommendations');
              element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }}
          >
            <div className="flex flex-col justify-center h-full">
              <div className="flex items-center gap-4 mb-2">
                <motion.div
                  className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <Package className="text-green-600" size={24} />
                </motion.div>
                <div>
                  <h4 className="font-semibold text-base text-ss-text">Recommendations</h4>
                  <p className="text-sm text-ss-subtle">{recommendations.length} total items</p>
                </div>
              </div>
            </div>
          </Card>

          {/* Weather Impact Card */}
          <Card className="h-32 p-4 hover:shadow-lg transition-all cursor-pointer group" onClick={scrollToWeather}>
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

          {/* New Combos Card */}
          <Card
            className="h-32 p-4 hover:shadow-lg transition-all cursor-pointer group"
            onClick={scrollToBundles}
          >
            <div className="flex flex-col justify-center h-full">
              <div className="flex items-center gap-4 mb-2">
                <motion.div
                  className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center"
                  whileHover={{ scale: 1.1, rotate: -5 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <Star className="text-purple-600" size={24} />
                </motion.div>
                <div>
                  <h4 className="font-semibold text-base text-ss-text">New Combos</h4>
                  <p className="text-sm text-ss-subtle">{bundles.length} active bundles</p>
                </div>
              </div>
            </div>
          </Card>

          {/* Best Sellers Card */}
          <Card
            className="h-32 p-4 hover:shadow-lg transition-all cursor-pointer group"
            onClick={() => setIsBestSellersModalOpen(true)}
          >
            <div className="flex flex-col justify-center h-full">
              <div className="flex items-center gap-4 mb-2">
                <motion.div
                  className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg flex items-center justify-center"
                  whileHover={{ scale: 1.15, rotate: 10 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <Star className="text-yellow-600" size={24} />
                </motion.div>
                <div>
                  <h4 className="font-semibold text-base text-ss-text">Best Sellers</h4>
                  <p className="text-sm text-ss-subtle">{bestSellerItems.length} essential items</p>
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
              id="stock-recommendations"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-ss-text">
                    Stock Recommendations
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
                {nonWeatherRecommendations.length > 0 && (
                  <div className="mb-4">
                    <motion.div
                      key={currentRecommendationIndex}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <RecommendationCard
                        recommendation={nonWeatherRecommendations[currentRecommendationIndex % nonWeatherRecommendations.length]}
                        onApprove={approveRecommendation}
                        onReject={rejectRecommendation}
                        onDefer={deferRecommendation}
                        isSelected={selectedRecommendations.includes(nonWeatherRecommendations[currentRecommendationIndex % nonWeatherRecommendations.length]?.id)}
                        onSelect={toggleRecommendationSelection}
                      />
                    </motion.div>
                  </div>
                )}

                {/* Pagination Controls */}
                <div className="flex items-center justify-between">
                  <div className="text-sm text-ss-subtle">
                    {nonWeatherRecommendations.length > 0 ? (
                      <>Recommendation {(currentRecommendationIndex % nonWeatherRecommendations.length) + 1} of {nonWeatherRecommendations.length}</>
                    ) : (
                      'No recommendations available'
                    )}
                  </div>

                  {nonWeatherRecommendations.length > 1 && (
                    <Pagination
                      currentIndex={currentRecommendationIndex % nonWeatherRecommendations.length}
                      totalItems={nonWeatherRecommendations.length}
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
            <motion.div
              className="flex-1"
              animate={{
                backgroundColor: highlightBundles ? 'rgba(168, 85, 247, 0.1)' : 'transparent',
              }}
              transition={{ duration: 0.3 }}
            >
              <Card id="current-bundles" className="p-4">
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
                        ${bundle.potentialRevenueLift || bundle.projectedUplift} revenue lift
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              </Card>
            </motion.div>
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
            <motion.div
              id="weather-impact"
              className="flex-1"
              animate={{
                backgroundColor: highlightWeather ? 'rgba(59, 130, 246, 0.1)' : 'transparent',
              }}
              transition={{ duration: 0.3 }}
            >
              <WeatherImpactPanel weather={weatherImpact} />
            </motion.div>
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

      {/* Best Sellers Modal */}
      {isBestSellersModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-ss-panel rounded-lg shadow-xl w-full max-w-4xl max-h-[80vh] overflow-hidden"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-ss-line">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg flex items-center justify-center">
                  <Star className="text-yellow-600" size={20} />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-ss-text">Best Sellers</h2>
                  <p className="text-sm text-ss-subtle">Essential daily items customers buy frequently</p>
                </div>
              </div>
              <button
                onClick={() => setIsBestSellersModalOpen(false)}
                className="p-2 rounded-lg hover:bg-ss-muted transition-colors"
              >
                <X size={20} className="text-ss-subtle" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 overflow-y-auto max-h-[60vh]">
              {bestSellerItems.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {bestSellerItems.map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-ss-muted rounded-lg p-4 hover:shadow-md transition-all"
                    >
                      <div className="flex items-start gap-4">
                        {/* Product Image */}
                        <div className="flex-shrink-0">
                          <img
                            src={item.imageUrl || 'https://via.placeholder.com/60'}
                            alt={item.skuName}
                            className="w-16 h-16 object-cover rounded-lg"
                          />
                        </div>

                        {/* Product Info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-semibold text-sm text-ss-text truncate">
                              {item.skuName}
                            </h3>
                            <Badge
                              variant={item.action.toLowerCase() as any}
                              size="sm"
                            >
                              {item.action}
                            </Badge>
                          </div>

                          <div className="space-y-2">
                            {/* Confidence */}
                            <div className="flex items-center justify-between">
                              <span className="text-xs text-ss-subtle">Confidence</span>
                              <div className="flex items-center gap-2">
                                <div className="w-16 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                                  <div
                                    className="h-full bg-gradient-to-r from-green-500 to-green-600"
                                    style={{ width: `${item.confidence * 100}%` }}
                                  />
                                </div>
                                <span className="text-xs font-medium text-ss-text">
                                  {Math.round(item.confidence * 100)}%
                                </span>
                              </div>
                            </div>

                            {/* Impact Score */}
                            <div className="flex items-center justify-between">
                              <span className="text-xs text-ss-subtle">Impact</span>
                              <div className="flex items-center gap-2">
                                <div className="w-16 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                                  <div
                                    className="h-full bg-gradient-to-r from-ss-primary to-ss-blue"
                                    style={{ width: `${item.impactScore}%` }}
                                  />
                                </div>
                                <span className="text-xs font-medium text-ss-text">
                                  {item.impactScore}
                                </span>
                              </div>
                            </div>

                            {/* Quantity and Revenue */}
                            <div className="flex items-center justify-between text-xs">
                              {item.quantity && item.quantity > 0 && (
                                <span className="text-ss-subtle">
                                  Qty: <span className="font-medium text-ss-text">{item.quantity}</span>
                                </span>
                              )}
                              {item.estimatedRevenue && (
                                <span className={`font-medium ${
                                  item.estimatedRevenue > 0 ? 'text-green-600' : 'text-red-600'
                                }`}>
                                  {item.estimatedRevenue > 0 ? '+' : ''}${Math.abs(item.estimatedRevenue)}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Reasons */}
                      <div className="mt-3 pt-3 border-t border-ss-line">
                        <div className="flex flex-wrap gap-1">
                          {item.reasons.slice(0, 2).map((reason, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-1 bg-white dark:bg-gray-800 rounded text-xs text-ss-subtle"
                            >
                              {reason}
                            </span>
                          ))}
                          {item.reasons.length > 2 && (
                            <span className="px-2 py-1 text-xs text-ss-subtle">
                              +{item.reasons.length - 2} more
                            </span>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Star className="w-16 h-16 text-ss-subtle mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-ss-text mb-2">No Best Sellers Found</h3>
                  <p className="text-ss-subtle">
                    Essential daily items like soaps, toothpaste, beverages, and snacks will appear here.
                  </p>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-between p-6 border-t border-ss-line bg-ss-muted">
              <div className="text-sm text-ss-subtle">
                Showing {bestSellerItems.length} best selling items
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsBestSellersModalOpen(false)}
              >
                Close
              </Button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Add Event Modal */}
      {isAddEventModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-ss-panel rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-hidden"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-ss-line">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                  <Plus className="text-green-600" size={20} />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-ss-text">Add New Event</h2>
                  <p className="text-sm text-ss-subtle">Create event to generate smart recommendations</p>
                </div>
              </div>
              <button
                onClick={() => setIsAddEventModalOpen(false)}
                className="p-2 rounded-lg hover:bg-ss-muted transition-colors"
              >
                <X size={20} className="text-ss-subtle" />
              </button>
            </div>

            {/* Modal Content - Form */}
            <div className="p-6 overflow-y-auto max-h-[70vh]">
              <form className="space-y-6">
                {/* Event Name */}
                <div>
                  <label className="block text-sm font-medium text-ss-text mb-2">
                    Event Name *
                  </label>
                  <input
                    type="text"
                    value={eventForm.name}
                    onChange={(e) => setEventForm(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="e.g., Champions League Final, Summer Festival"
                    className="w-full px-3 py-2 bg-ss-muted rounded-lg text-ss-text placeholder-ss-subtle outline-none focus:ring-2 focus:ring-ss-primary border border-ss-line"
                  />
                </div>

                {/* Event Type & Impact */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-ss-text mb-2">
                      Event Type *
                    </label>
                    <select
                      value={eventForm.type}
                      onChange={(e) => setEventForm(prev => ({ ...prev, type: e.target.value as any }))}
                      className="w-full px-3 py-2 bg-ss-muted rounded-lg text-ss-text outline-none focus:ring-2 focus:ring-ss-primary border border-ss-line"
                    >
                      <option value="FOOTBALL">Football Match</option>
                      <option value="FESTIVAL">Festival</option>
                      <option value="CONCERT">Concert</option>
                      <option value="WEATHER">Weather Event</option>
                      <option value="HOLIDAY">Holiday</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-ss-text mb-2">
                      Expected Impact *
                    </label>
                    <select
                      value={eventForm.impact}
                      onChange={(e) => setEventForm(prev => ({ ...prev, impact: e.target.value as any }))}
                      className="w-full px-3 py-2 bg-ss-muted rounded-lg text-ss-text outline-none focus:ring-2 focus:ring-ss-primary border border-ss-line"
                    >
                      <option value="LOW">Low Impact</option>
                      <option value="MEDIUM">Medium Impact</option>
                      <option value="HIGH">High Impact</option>
                    </select>
                  </div>
                </div>

                {/* Date & Time */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-ss-text mb-2">
                      Date *
                    </label>
                    <input
                      type="date"
                      value={eventForm.date}
                      onChange={(e) => setEventForm(prev => ({ ...prev, date: e.target.value }))}
                      className="w-full px-3 py-2 bg-ss-muted rounded-lg text-ss-text outline-none focus:ring-2 focus:ring-ss-primary border border-ss-line"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-ss-text mb-2">
                      Time
                    </label>
                    <input
                      type="time"
                      value={eventForm.time}
                      onChange={(e) => setEventForm(prev => ({ ...prev, time: e.target.value }))}
                      className="w-full px-3 py-2 bg-ss-muted rounded-lg text-ss-text outline-none focus:ring-2 focus:ring-ss-primary border border-ss-line"
                    />
                  </div>
                </div>

                {/* Location */}
                <div>
                  <label className="block text-sm font-medium text-ss-text mb-2">
                    Location
                  </label>
                  <input
                    type="text"
                    value={eventForm.location}
                    onChange={(e) => setEventForm(prev => ({ ...prev, location: e.target.value }))}
                    placeholder="e.g., National Stadium, City Center"
                    className="w-full px-3 py-2 bg-ss-muted rounded-lg text-ss-text placeholder-ss-subtle outline-none focus:ring-2 focus:ring-ss-primary border border-ss-line"
                  />
                </div>

                {/* Demand Multiplier */}
                <div>
                  <label className="block text-sm font-medium text-ss-text mb-2">
                    Demand Multiplier: {eventForm.estimatedDemandMultiplier}x
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="5"
                    step="0.1"
                    value={eventForm.estimatedDemandMultiplier}
                    onChange={(e) => setEventForm(prev => ({ ...prev, estimatedDemandMultiplier: parseFloat(e.target.value) }))}
                    className="w-full h-2 bg-ss-muted rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-xs text-ss-subtle mt-1">
                    <span>1x (Normal)</span>
                    <span>3x (High)</span>
                    <span>5x (Extreme)</span>
                  </div>
                </div>

                {/* Affected Categories */}
                <div>
                  <label className="block text-sm font-medium text-ss-text mb-2">
                    Affected Categories
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {availableCategories.map((category) => (
                      <label
                        key={category}
                        className={`flex items-center gap-2 p-2 rounded-lg cursor-pointer transition-colors ${
                          eventForm.affectedCategories.includes(category)
                            ? 'bg-ss-primary/10 text-ss-primary'
                            : 'bg-ss-muted hover:bg-ss-muted/80'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={eventForm.affectedCategories.includes(category)}
                          onChange={() => toggleCategory(category)}
                          className="hidden"
                        />
                        <CheckSquare
                          size={16}
                          className={eventForm.affectedCategories.includes(category) ? 'text-ss-primary' : 'text-ss-subtle'}
                        />
                        <span className="text-sm">{category}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-ss-text mb-2">
                    Description
                  </label>
                  <textarea
                    value={eventForm.description}
                    onChange={(e) => setEventForm(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Additional details about the event..."
                    rows={3}
                    className="w-full px-3 py-2 bg-ss-muted rounded-lg text-ss-text placeholder-ss-subtle outline-none focus:ring-2 focus:ring-ss-primary border border-ss-line resize-none"
                  />
                </div>
              </form>
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-between p-6 border-t border-ss-line bg-ss-muted">
              <div className="text-sm text-ss-subtle">
                {eventForm.affectedCategories.length > 0 && (
                  <span>{eventForm.affectedCategories.length} categories selected</span>
                )}
              </div>
              <div className="flex gap-3">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsAddEventModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={handleCreateEvent}
                  disabled={!eventForm.name || !eventForm.date}
                >
                  Create Event
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </DashboardLayout>
  );
};
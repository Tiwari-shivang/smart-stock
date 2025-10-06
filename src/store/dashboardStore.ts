import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import type { 
  Recommendation, 
  Event, 
  StoreMetrics, 
  WeatherImpact,
  UserProfile,
  Bundle,
  KPITile,
  DemandBubble
} from '@/types';
import {
  mockRecommendations,
  mockEvents,
  mockStoreMetrics,
  mockWeatherImpact,
  mockUserProfile,
  mockBundles,
  mockKPITiles,
  mockDemandBubbles
} from '@/mocks-data/mockData';

interface DashboardState {
  // Data
  recommendations: Recommendation[];
  events: Event[];
  storeMetrics: StoreMetrics;
  weatherImpact: WeatherImpact;
  userProfile: UserProfile;
  bundles: Bundle[];
  kpiTiles: KPITile[];
  demandBubbles: DemandBubble[];
  
  // UI State
  activeTab: string;
  selectedRecommendations: string[];
  isLoading: boolean;
  searchQuery: string;
  theme: 'light' | 'dark' | 'system';
  currentRecommendationIndex: number;
  
  // Actions
  setActiveTab: (tab: string) => void;
  toggleRecommendationSelection: (id: string) => void;
  selectAllRecommendations: () => void;
  deselectAllRecommendations: () => void;
  approveRecommendation: (id: string) => void;
  rejectRecommendation: (id: string) => void;
  deferRecommendation: (id: string) => void;
  batchApproveRecommendations: () => void;
  setSearchQuery: (query: string) => void;
  toggleTheme: () => void;
  refreshData: () => Promise<void>;
  updateStoreMetrics: (metrics: Partial<StoreMetrics>) => void;
  nextRecommendation: () => void;
  previousRecommendation: () => void;
  setRecommendationIndex: (index: number) => void;
  addEvent: (event: Event) => void;
  generateEventRecommendations: (event: Event) => void;
}

export const useDashboardStore = create<DashboardState>()(
  devtools(
    persist(
      (set, get) => ({
        // Initial Data
        recommendations: mockRecommendations,
        events: mockEvents,
        storeMetrics: mockStoreMetrics,
        weatherImpact: mockWeatherImpact,
        userProfile: mockUserProfile,
        bundles: mockBundles,
        kpiTiles: mockKPITiles,
        demandBubbles: mockDemandBubbles,
        
        // Initial UI State
        activeTab: 'overview',
        selectedRecommendations: [],
        isLoading: false,
        searchQuery: '',
        theme: 'light',
        currentRecommendationIndex: 0,
        
        // Actions
        setActiveTab: (tab) => 
          set({ activeTab: tab }),
        
        toggleRecommendationSelection: (id) =>
          set((state) => ({
            selectedRecommendations: state.selectedRecommendations.includes(id)
              ? state.selectedRecommendations.filter(recId => recId !== id)
              : [...state.selectedRecommendations, id]
          })),
        
        selectAllRecommendations: () =>
          set((state) => ({
            selectedRecommendations: state.recommendations.map(rec => rec.id)
          })),
        
        deselectAllRecommendations: () =>
          set({ selectedRecommendations: [] }),
        
        approveRecommendation: (id) =>
          set((state) => {
            const newRecommendations = state.recommendations.filter(rec => rec.id !== id);
            const newIndex = state.currentRecommendationIndex >= newRecommendations.length 
              ? Math.max(0, newRecommendations.length - 1)
              : state.currentRecommendationIndex;
            
            return {
              recommendations: newRecommendations,
              currentRecommendationIndex: newIndex,
              storeMetrics: {
                ...state.storeMetrics,
                pendingRecommendations: state.storeMetrics.pendingRecommendations - 1
              }
            };
          }),
        
        rejectRecommendation: (id) =>
          set((state) => {
            const newRecommendations = state.recommendations.filter(rec => rec.id !== id);
            const newIndex = state.currentRecommendationIndex >= newRecommendations.length 
              ? Math.max(0, newRecommendations.length - 1)
              : state.currentRecommendationIndex;
            
            return {
              recommendations: newRecommendations,
              currentRecommendationIndex: newIndex,
              storeMetrics: {
                ...state.storeMetrics,
                pendingRecommendations: state.storeMetrics.pendingRecommendations - 1
              }
            };
          }),
        
        deferRecommendation: (id) =>
          set((state) => ({
            recommendations: state.recommendations.map(rec =>
              rec.id === id
                ? { ...rec, priority: 'LOW' as const }
                : rec
            )
          })),
        
        batchApproveRecommendations: () =>
          set((state) => {
            const selectedSet = new Set(state.selectedRecommendations);
            return {
              recommendations: state.recommendations.filter(
                rec => !selectedSet.has(rec.id)
              ),
              selectedRecommendations: [],
              storeMetrics: {
                ...state.storeMetrics,
                pendingRecommendations: 
                  state.storeMetrics.pendingRecommendations - state.selectedRecommendations.length
              }
            };
          }),
        
        setSearchQuery: (query) =>
          set({ searchQuery: query }),
        
        toggleTheme: () =>
          set((state) => {
            const themes: ('light' | 'dark' | 'system')[] = ['light', 'dark', 'system'];
            const currentIndex = themes.indexOf(state.theme);
            const nextTheme = themes[(currentIndex + 1) % themes.length];
            
            // Apply theme to document
            if (nextTheme === 'dark' || 
                (nextTheme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
              document.documentElement.setAttribute('data-theme', 'dark');
            } else {
              document.documentElement.removeAttribute('data-theme');
            }
            
            return { theme: nextTheme };
          }),
        
        refreshData: async () => {
          set({ isLoading: true });
          
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          // In a real app, fetch fresh data from API
          // For now, we'll just update the sync time
          set((state) => ({
            isLoading: false,
            storeMetrics: {
              ...state.storeMetrics,
              lastSync: new Date()
            }
          }));
        },
        
        updateStoreMetrics: (metrics) =>
          set((state) => ({
            storeMetrics: {
              ...state.storeMetrics,
              ...metrics
            }
          })),
          
        nextRecommendation: () =>
          set((state) => ({
            currentRecommendationIndex: 
              state.currentRecommendationIndex < state.recommendations.length - 1
                ? state.currentRecommendationIndex + 1
                : 0
          })),
          
        previousRecommendation: () =>
          set((state) => ({
            currentRecommendationIndex: 
              state.currentRecommendationIndex > 0
                ? state.currentRecommendationIndex - 1
                : state.recommendations.length - 1
          })),
          
        setRecommendationIndex: (index) =>
          set({ currentRecommendationIndex: index }),
          
        addEvent: (event) =>
          set((state) => ({
            events: [event, ...state.events]
          })),
          
        generateEventRecommendations: (event) =>
          set((state) => {
            const categories = event.affectedCategories || [];
            const multiplier = event.estimatedDemandMultiplier || 1.5;
            
            const newRecommendations: Recommendation[] = categories.slice(0, 3).map((category, index) => {
              const baseImpact = event.impact === 'HIGH' ? 15000 : event.impact === 'MEDIUM' ? 8000 : 4000;
              const confidence = event.impact === 'HIGH' ? 92 : event.impact === 'MEDIUM' ? 85 : 78;
              
              const categoryItems: Record<string, { name: string; image: string; quantity: number }> = {
                'BEVERAGES': { name: 'Energy Drinks & Water', image: '/energy.png', quantity: Math.floor(50 * multiplier) },
                'SNACKS': { name: 'Chips & Popcorn Bundle', image: '/noodles.png', quantity: Math.floor(40 * multiplier) },
                'READY_TO_EAT': { name: 'Sandwiches & Wraps', image: '/umbrella.png', quantity: Math.floor(30 * multiplier) },
                'DAIRY': { name: 'Ice Cream & Frozen Treats', image: '/beer.png', quantity: Math.floor(25 * multiplier) },
                'ALCOHOL': { name: 'Beer & Wine Selection', image: '/beer.png', quantity: Math.floor(35 * multiplier) },
                'HOUSEHOLD': { name: 'Paper Products', image: '/umbrella.png', quantity: Math.floor(20 * multiplier) }
              };
              
              const item = categoryItems[category] || { 
                name: `${category} Bundle`, 
                image: '/noodles.png', 
                quantity: Math.floor(30 * multiplier) 
              };
              
              return {
                id: `event-rec-${event.id}-${index}`,
                sku: `SKU-${category}-${index}`,
                skuName: item.name,
                imageUrl: item.image,
                action: 'STOCK_UP',
                confidence: (confidence + (index * -2)) / 100,
                impactScore: Math.floor(baseImpact * multiplier * (1 - index * 0.1)),
                reasons: [`${event.name} expected to increase demand for ${category.toLowerCase()} by ${Math.floor((multiplier - 1) * 100)}%`],
                quantity: item.quantity,
                shelfFit: true,
                priority: event.impact,
                source: 'EVENT_ANALYSIS',
                status: 'PENDING',
                createdAt: new Date(),
                expiresAt: new Date(event.date)
              };
            });
            
            return {
              recommendations: [...newRecommendations, ...state.recommendations],
              storeMetrics: {
                ...state.storeMetrics,
                pendingRecommendations: state.storeMetrics.pendingRecommendations + newRecommendations.length
              }
            };
          })
      }),
      {
        name: 'smartstock-dashboard',
        partialize: (state) => ({
          theme: state.theme,
          activeTab: state.activeTab
        })
      }
    )
  )
);
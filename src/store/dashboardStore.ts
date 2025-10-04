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
          set((state) => ({
            recommendations: state.recommendations.filter(rec => rec.id !== id),
            storeMetrics: {
              ...state.storeMetrics,
              pendingRecommendations: state.storeMetrics.pendingRecommendations - 1
            }
          })),
        
        rejectRecommendation: (id) =>
          set((state) => ({
            recommendations: state.recommendations.filter(rec => rec.id !== id),
            storeMetrics: {
              ...state.storeMetrics,
              pendingRecommendations: state.storeMetrics.pendingRecommendations - 1
            }
          })),
        
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
          }))
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
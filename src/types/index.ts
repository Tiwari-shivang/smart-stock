// SmartStock Type Definitions

export type RecAction = 'RESTOCK' | 'REPLACE' | 'PROMOTE';

export interface SKU {
  id: string;
  name: string;
  category: string;
  currentStock: number;
  minStock: number;
  maxStock: number;
  price: number;
  imageUrl?: string;
  barcode: string;
  supplier: string;
}

export interface Recommendation {
  id: string;
  sku: string;
  skuName: string;
  imageUrl?: string;
  action: RecAction;
  confidence: number; // 0..1
  impactScore: number; // normalized 0..100
  reasons: string[]; // ['Football Final', 'Rain forecast']
  quantity?: number;
  shelfFit: boolean;
  crossSellSuggestions?: string[];
  estimatedRevenue?: number;
  volatility: number; // 0..1
  priority: 'HIGH' | 'MEDIUM' | 'LOW';
  createdAt: Date;
}

export interface Event {
  id: string;
  name: string;
  type: 'FOOTBALL' | 'FESTIVAL' | 'CONCERT' | 'WEATHER' | 'HOLIDAY';
  date: Date;
  impact: 'HIGH' | 'MEDIUM' | 'LOW';
  affectedCategories: string[];
  estimatedDemandMultiplier: number;
  location?: string;
  description?: string;
}

export interface StoreMetrics {
  storeId: string;
  storeName: string;
  rank: number;
  totalRanks: number;
  lastSync: Date;
  revenue: number;
  revenueDelta: number;
  wasteReduction: number;
  stockoutRate: number;
  customerSatisfaction: number;
  pendingRecommendations: number;
}

export interface Bundle {
  id: string;
  name: string;
  items: string[];
  attachRate?: number;
  projectedUplift: number;
  potentialRevenueLift?: number;
  active: boolean;
  price: number;
  discount: number;
  description?: string;
}

export interface TrendData {
  date: string;
  value: number;
  category?: string;
}

export interface WeatherImpact {
  condition: 'SUNNY' | 'RAINY' | 'CLOUDY' | 'HOT' | 'COLD';
  temperature: number;
  humidity: number;
  forecast48h: string;
  demandModifier: number;
  affectedCategories: string[];
}

export interface DemandBubble {
  sku: string;
  x: number; // position
  y: number; // position
  size: number; // impact score
  color: string; // action type
  volatility: number; // border weight
  confidence: number; // opacity
  label: string;
  action: RecAction;
}

export interface KPITile {
  title: string;
  value: number | string;
  delta?: number;
  deltaType?: 'increase' | 'decrease';
  sparklineData?: number[];
  unit?: string;
  tooltip?: string;
}

export interface UserProfile {
  id: string;
  name: string;
  role: 'STORE_MANAGER' | 'REGIONAL_MANAGER' | 'ADMIN';
  avatar?: string;
  storeId?: string;
  lastLogin: Date;
  preferences: {
    theme: 'light' | 'dark' | 'system';
    language: 'en' | 'vi' | 'jp' | 'zh' | 'kr';
    notifications: boolean;
  };
}
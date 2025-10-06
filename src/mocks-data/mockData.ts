import type {
  SKU,
  Recommendation,
  Event,
  StoreMetrics,
  Bundle,
  WeatherImpact,
  DemandBubble,
  KPITile,
  UserProfile,
  TrendData
} from '@/types';

// Mock SKUs / Products
export const mockSKUs: SKU[] = [
  {
    id: 'sku-001',
    name: 'Coca Cola 500ml',
    category: 'Beverages',
    currentStock: 145,
    minStock: 50,
    maxStock: 300,
    price: 2.50,
    imageUrl: 'https://via.placeholder.com/150/FF0000/FFFFFF?text=Coke',
    barcode: '4894128302847',
    supplier: 'Coca Cola Company'
  },
  {
    id: 'sku-002',
    name: 'Lay\'s Original Chips',
    category: 'Snacks',
    currentStock: 89,
    minStock: 30,
    maxStock: 200,
    price: 3.50,
    imageUrl: '/lays.png',
    barcode: '4894128302848',
    supplier: 'PepsiCo'
  },
  {
    id: 'sku-003',
    name: 'Cup Noodles Seafood',
    category: 'Instant Food',
    currentStock: 23,
    minStock: 40,
    maxStock: 150,
    price: 1.80,
    imageUrl: '/noodles.png',
    barcode: '4894128302849',
    supplier: 'Nissin Foods'
  },
  {
    id: 'sku-004',
    name: 'Red Bull Energy Drink',
    category: 'Beverages',
    currentStock: 67,
    minStock: 40,
    maxStock: 120,
    price: 4.50,
    imageUrl: '/energy.png',
    barcode: '4894128302850',
    supplier: 'Red Bull GmbH'
  },
  {
    id: 'sku-005',
    name: 'Pocky Chocolate',
    category: 'Snacks',
    currentStock: 156,
    minStock: 50,
    maxStock: 250,
    price: 2.20,
    imageUrl: 'https://via.placeholder.com/150/8B4513/FFFFFF?text=Pocky',
    barcode: '4894128302851',
    supplier: 'Glico'
  },
  {
    id: 'sku-006',
    name: 'Onigiri Tuna Mayo',
    category: 'Fresh Food',
    currentStock: 12,
    minStock: 20,
    maxStock: 60,
    price: 3.80,
    imageUrl: 'https://via.placeholder.com/150/000000/FFFFFF?text=Onigiri',
    barcode: '4894128302852',
    supplier: 'Local Kitchen'
  },
  {
    id: 'sku-007',
    name: 'Asahi Beer 350ml',
    category: 'Alcohol',
    currentStock: 234,
    minStock: 100,
    maxStock: 400,
    price: 5.50,
    imageUrl: '/beer.png',
    barcode: '4894128302853',
    supplier: 'Asahi Breweries'
  },
  {
    id: 'sku-008',
    name: 'KitKat Green Tea',
    category: 'Snacks',
    currentStock: 78,
    minStock: 40,
    maxStock: 200,
    price: 2.80,
    imageUrl: 'https://via.placeholder.com/150/90EE90/000000?text=KitKat',
    barcode: '4894128302854',
    supplier: 'Nestle'
  },
  {
    id: 'sku-009',
    name: 'Fresh Eggs (6 pack)',
    category: 'Fresh Food',
    currentStock: 45,
    minStock: 30,
    maxStock: 100,
    price: 4.20,
    imageUrl: 'https://via.placeholder.com/150/FAFAD2/000000?text=Eggs',
    barcode: '4894128302855',
    supplier: 'Farm Fresh'
  },
  {
    id: 'sku-010',
    name: 'Umbrella - Compact',
    category: 'Non-Food',
    currentStock: 8,
    minStock: 15,
    maxStock: 40,
    price: 12.00,
    imageUrl: '/umbrella.png',
    barcode: '4894128302856',
    supplier: 'Weather Gear Co.'
  },
  {
    id: 'sku-011',
    name: 'Chicken Sandwich',
    category: 'Ready-to-Eat',
    currentStock: 28,
    minStock: 35,
    maxStock: 80,
    price: 6.50,
    imageUrl: 'https://via.placeholder.com/150/F4A460/FFFFFF?text=Sandwich',
    barcode: '4894128302857',
    supplier: 'Fresh Express'
  },
  {
    id: 'sku-012',
    name: 'Beef Wrap',
    category: 'Ready-to-Eat',
    currentStock: 15,
    minStock: 25,
    maxStock: 60,
    price: 7.20,
    imageUrl: 'https://via.placeholder.com/150/8B4513/FFFFFF?text=Wrap',
    barcode: '4894128302858',
    supplier: 'Fresh Express'
  },
  {
    id: 'sku-013',
    name: 'Colgate Toothpaste',
    category: 'Personal Care',
    currentStock: 42,
    minStock: 30,
    maxStock: 100,
    price: 4.80,
    imageUrl: 'https://via.placeholder.com/150/FF0000/FFFFFF?text=Toothpaste',
    barcode: '4894128302859',
    supplier: 'Colgate-Palmolive'
  },
  {
    id: 'sku-014',
    name: 'Hot Dog',
    category: 'Ready-to-Eat',
    currentStock: 18,
    minStock: 30,
    maxStock: 70,
    price: 3.50,
    imageUrl: 'https://via.placeholder.com/150/FF6347/FFFFFF?text=HotDog',
    barcode: '4894128302860',
    supplier: 'Quick Bites'
  },
  {
    id: 'sku-015',
    name: 'Paper Towels',
    category: 'Household',
    currentStock: 35,
    minStock: 20,
    maxStock: 80,
    price: 5.20,
    imageUrl: 'https://via.placeholder.com/150/FFFFFF/000000?text=Towels',
    barcode: '4894128302861',
    supplier: 'Clean & Co'
  },
  {
    id: 'sku-016',
    name: 'Hand Soap',
    category: 'Personal Care',
    currentStock: 28,
    minStock: 25,
    maxStock: 75,
    price: 3.80,
    imageUrl: 'https://via.placeholder.com/150/87CEEB/000000?text=Soap',
    barcode: '4894128302862',
    supplier: 'Clean & Fresh'
  }
];

// Mock Recommendations
export const mockRecommendations: Recommendation[] = [
  {
    id: 'rec-001',
    sku: 'sku-003',
    skuName: 'Cup Noodles Seafood',
    imageUrl: '/noodles.png',
    action: 'RESTOCK',
    confidence: 0.92,
    impactScore: 85,
    reasons: ['Below minimum stock', 'Rainy weather forecast', 'High demand trend'],
    quantity: 80,
    shelfFit: true,
    crossSellSuggestions: ['Fresh Eggs', 'Bottled Water'],
    estimatedRevenue: 144,
    volatility: 0.3,
    priority: 'HIGH',
    createdAt: new Date('2025-10-04T08:00:00')
  },
  {
    id: 'rec-002',
    sku: 'sku-010',
    skuName: 'Umbrella - Compact',
    imageUrl: '/umbrella.png',
    action: 'RESTOCK',
    confidence: 0.88,
    impactScore: 78,
    reasons: ['Heavy rain forecast', 'Below minimum stock', 'Seasonal demand'],
    quantity: 25,
    shelfFit: true,
    crossSellSuggestions: ['Raincoat', 'Waterproof Phone Case'],
    estimatedRevenue: 300,
    volatility: 0.6,
    priority: 'HIGH',
    createdAt: new Date('2025-10-04T08:15:00')
  },
  {
    id: 'rec-003',
    sku: 'sku-002',
    skuName: 'Lay\'s Original Chips',
    imageUrl: '/lays.png',
    action: 'PROMOTE',
    confidence: 0.75,
    impactScore: 65,
    reasons: ['Football match tonight', 'Bundle opportunity with beer'],
    quantity: 0,
    shelfFit: true,
    crossSellSuggestions: ['Asahi Beer', 'Coca Cola'],
    estimatedRevenue: 210,
    volatility: 0.4,
    priority: 'MEDIUM',
    createdAt: new Date('2025-10-04T09:00:00')
  },
  {
    id: 'rec-004',
    sku: 'sku-007',
    skuName: 'Asahi Beer 350ml',
    imageUrl: '/beer.png',
    action: 'PROMOTE',
    confidence: 0.82,
    impactScore: 72,
    reasons: ['Football World Cup Finals', 'Weekend peak', 'Bundle with snacks'],
    quantity: 0,
    shelfFit: true,
    crossSellSuggestions: ['Lay\'s Chips', 'Peanuts'],
    estimatedRevenue: 550,
    volatility: 0.2,
    priority: 'HIGH',
    createdAt: new Date('2025-10-04T09:30:00')
  },
  {
    id: 'rec-005',
    sku: 'sku-006',
    skuName: 'Onigiri Tuna Mayo',
    imageUrl: 'https://via.placeholder.com/150/000000/FFFFFF?text=Onigiri',
    action: 'REPLACE',
    confidence: 0.68,
    impactScore: 45,
    reasons: ['Low turnover rate', 'Near expiry', 'Better alternatives available'],
    quantity: 0,
    shelfFit: true,
    crossSellSuggestions: ['Sandwich', 'Sushi Roll'],
    estimatedRevenue: -45,
    volatility: 0.7,
    priority: 'LOW',
    createdAt: new Date('2025-10-04T10:00:00')
  },
  {
    id: 'rec-006',
    sku: 'sku-004',
    skuName: 'Red Bull Energy Drink',
    imageUrl: '/energy.png',
    action: 'RESTOCK',
    confidence: 0.79,
    impactScore: 68,
    reasons: ['University exam period', 'Night shift workers', 'Gaming tournament'],
    quantity: 60,
    shelfFit: true,
    crossSellSuggestions: ['Coffee', 'Energy Bars'],
    estimatedRevenue: 270,
    volatility: 0.35,
    priority: 'MEDIUM',
    createdAt: new Date('2025-10-04T10:30:00')
  },
  {
    id: 'rec-007',
    sku: 'sku-011',
    skuName: 'Chicken Sandwich',
    imageUrl: 'https://via.placeholder.com/150/F4A460/FFFFFF?text=Sandwich',
    action: 'RESTOCK',
    confidence: 0.86,
    impactScore: 73,
    reasons: ['Below minimum stock', 'Lunch rush approaching', 'High office worker demand'],
    quantity: 45,
    shelfFit: true,
    crossSellSuggestions: ['Coca Cola', 'Lay\'s Chips'],
    estimatedRevenue: 292,
    volatility: 0.4,
    priority: 'HIGH',
    createdAt: new Date('2025-10-04T11:00:00')
  },
  {
    id: 'rec-008',
    sku: 'sku-012',
    skuName: 'Beef Wrap',
    imageUrl: 'https://via.placeholder.com/150/8B4513/FFFFFF?text=Wrap',
    action: 'RESTOCK',
    confidence: 0.81,
    impactScore: 69,
    reasons: ['Below minimum stock', 'Healthy option trending', 'University lunch demand'],
    quantity: 35,
    shelfFit: true,
    crossSellSuggestions: ['Fresh Juice', 'Yogurt'],
    estimatedRevenue: 252,
    volatility: 0.3,
    priority: 'HIGH',
    createdAt: new Date('2025-10-04T11:15:00')
  },
  {
    id: 'rec-009',
    sku: 'sku-013',
    skuName: 'Colgate Toothpaste',
    imageUrl: 'https://via.placeholder.com/150/FF0000/FFFFFF?text=Toothpaste',
    action: 'PROMOTE',
    confidence: 0.74,
    impactScore: 58,
    reasons: ['Essential item', 'Brand loyalty high', 'Bundle opportunity with toothbrush'],
    quantity: 0,
    shelfFit: true,
    crossSellSuggestions: ['Toothbrush', 'Mouthwash'],
    estimatedRevenue: 144,
    volatility: 0.2,
    priority: 'MEDIUM',
    createdAt: new Date('2025-10-04T11:30:00')
  },
  {
    id: 'rec-010',
    sku: 'sku-014',
    skuName: 'Hot Dog',
    imageUrl: 'https://via.placeholder.com/150/FF6347/FFFFFF?text=HotDog',
    action: 'RESTOCK',
    confidence: 0.83,
    impactScore: 71,
    reasons: ['Below minimum stock', 'Quick meal demand', 'Late night workers'],
    quantity: 40,
    shelfFit: true,
    crossSellSuggestions: ['Soft Drink', 'Chips'],
    estimatedRevenue: 140,
    volatility: 0.45,
    priority: 'HIGH',
    createdAt: new Date('2025-10-04T11:45:00')
  },
  {
    id: 'rec-011',
    sku: 'sku-015',
    skuName: 'Paper Towels',
    imageUrl: 'https://via.placeholder.com/150/FFFFFF/000000?text=Towels',
    action: 'PROMOTE',
    confidence: 0.71,
    impactScore: 55,
    reasons: ['Household essential', 'Bulk purchase opportunity', 'Rainy season demand'],
    quantity: 0,
    shelfFit: true,
    crossSellSuggestions: ['Tissue Paper', 'Cleaning Spray'],
    estimatedRevenue: 156,
    volatility: 0.25,
    priority: 'MEDIUM',
    createdAt: new Date('2025-10-04T12:00:00')
  },
  {
    id: 'rec-012',
    sku: 'sku-016',
    skuName: 'Hand Soap',
    imageUrl: 'https://via.placeholder.com/150/87CEEB/000000?text=Soap',
    action: 'PROMOTE',
    confidence: 0.78,
    impactScore: 62,
    reasons: ['Health awareness high', 'Essential hygiene item', 'Post-pandemic behavior'],
    quantity: 0,
    shelfFit: true,
    crossSellSuggestions: ['Hand Sanitizer', 'Tissues'],
    estimatedRevenue: 114,
    volatility: 0.3,
    priority: 'MEDIUM',
    createdAt: new Date('2025-10-04T12:15:00')
  }
];

// Mock Events
export const mockEvents: Event[] = [
  {
    id: 'event-001',
    name: 'Football World Cup Finals',
    type: 'FOOTBALL',
    date: new Date('2025-10-04T20:00:00'),
    impact: 'HIGH',
    affectedCategories: ['Beverages', 'Snacks', 'Alcohol'],
    estimatedDemandMultiplier: 2.5,
    location: 'National Stadium',
    description: 'Japan vs Brazil final match'
  },
  {
    id: 'event-002',
    name: 'Heavy Rain Forecast',
    type: 'WEATHER',
    date: new Date('2025-10-05T00:00:00'),
    impact: 'MEDIUM',
    affectedCategories: ['Instant Food', 'Non-Food', 'Beverages'],
    estimatedDemandMultiplier: 1.8,
    description: 'Heavy rainfall expected for next 48 hours'
  },
  {
    id: 'event-003',
    name: 'Mid-Autumn Festival',
    type: 'FESTIVAL',
    date: new Date('2025-10-07T00:00:00'),
    impact: 'MEDIUM',
    affectedCategories: ['Snacks', 'Fresh Food'],
    estimatedDemandMultiplier: 1.6,
    description: 'Traditional mooncake festival'
  },
  {
    id: 'event-004',
    name: 'Local Music Festival',
    type: 'CONCERT',
    date: new Date('2025-10-06T18:00:00'),
    impact: 'LOW',
    affectedCategories: ['Beverages', 'Snacks'],
    estimatedDemandMultiplier: 1.3,
    location: 'City Park',
    description: 'Annual summer music festival'
  }
];

// Mock Store Metrics
export const mockStoreMetrics: StoreMetrics = {
  storeId: 'STORE-7E-JP-001',
  storeName: 'Ho Chi Minh City',
  rank: 3,
  totalRanks: 250,
  lastSync: new Date('2025-10-04T11:30:00'),
  revenue: 125000,
  revenueDelta: 12.5,
  wasteReduction: 23.8,
  stockoutRate: 2.3,
  customerSatisfaction: 4.6,
  pendingRecommendations: 12
};

// Mock Bundles
export const mockBundles: Bundle[] = [
  {
    id: 'bundle-001',
    name: 'Game Day Combo',
    items: ['Lay\'s Original Chips', 'Asahi Beer 350ml', 'Peanuts'],
    attachRate: 0.68,
    projectedUplift: 28,
    active: true,
    price: 12.50,
    discount: 15
  },
  {
    id: 'bundle-002',
    name: 'Rainy Day Comfort',
    items: ['Cup Noodles Seafood', 'Fresh Eggs', 'Hot Coffee'],
    attachRate: 0.52,
    projectedUplift: 18,
    active: true,
    price: 8.80,
    discount: 10
  },
  {
    id: 'bundle-003',
    name: 'Study Fuel Pack',
    items: ['Red Bull Energy Drink', 'KitKat Green Tea', 'Sandwich'],
    attachRate: 0.45,
    projectedUplift: 22,
    active: false,
    price: 10.50,
    discount: 12
  }
];

// Mock Weather Impact
export const mockWeatherImpact: WeatherImpact = {
  condition: 'RAINY',
  temperature: 22,
  humidity: 85,
  forecast48h: 'Heavy rain continuing for next 2 days',
  demandModifier: 1.4,
  affectedCategories: ['Instant Food', 'Hot Beverages', 'Umbrellas']
};

// Mock Demand Bubbles for visualization
export const mockDemandBubbles: DemandBubble[] = [
  {
    sku: 'Cup Noodles',
    x: 20,
    y: 30,
    size: 85,
    color: '#16A34A', // green for restock
    volatility: 0.3,
    confidence: 0.92,
    label: 'Cup Noodles',
    action: 'RESTOCK'
  },
  {
    sku: 'Umbrella',
    x: 35,
    y: 45,
    size: 78,
    color: '#16A34A',
    volatility: 0.6,
    confidence: 0.88,
    label: 'Umbrella',
    action: 'RESTOCK'
  },
  {
    sku: 'Beer',
    x: 60,
    y: 55,
    size: 72,
    color: '#2563EB', // blue for promote
    volatility: 0.2,
    confidence: 0.82,
    label: 'Beer',
    action: 'PROMOTE'
  },
  {
    sku: 'Chips',
    x: 50,
    y: 25,
    size: 65,
    color: '#2563EB',
    volatility: 0.4,
    confidence: 0.75,
    label: 'Chips',
    action: 'PROMOTE'
  },
  {
    sku: 'Red Bull',
    x: 75,
    y: 40,
    size: 68,
    color: '#16A34A',
    volatility: 0.35,
    confidence: 0.79,
    label: 'Red Bull',
    action: 'RESTOCK'
  },
  {
    sku: 'Onigiri',
    x: 85,
    y: 70,
    size: 45,
    color: '#DC2626', // red for replace
    volatility: 0.7,
    confidence: 0.68,
    label: 'Onigiri',
    action: 'REPLACE'
  }
];

// Mock KPI Tiles
export const mockKPITiles: KPITile[] = [
  {
    title: 'Revenue Today',
    value: '$12,450',
    delta: 12.5,
    deltaType: 'increase',
    sparklineData: [100, 115, 108, 122, 118, 125],
    unit: 'USD',
    tooltip: 'Total revenue for current day'
  },
  {
    title: 'Waste Reduction',
    value: '23.8%',
    delta: 5.2,
    deltaType: 'increase',
    sparklineData: [18, 19, 20, 21, 22, 24],
    unit: '%',
    tooltip: 'Percentage reduction in product waste'
  },
  {
    title: 'Stockout Rate',
    value: '2.3%',
    delta: -0.8,
    deltaType: 'decrease',
    sparklineData: [3.5, 3.2, 2.8, 2.5, 2.4, 2.3],
    unit: '%',
    tooltip: 'Percentage of items out of stock'
  },
  {
    title: 'Customer Satisfaction',
    value: '4.6',
    delta: 0.2,
    deltaType: 'increase',
    sparklineData: [4.3, 4.4, 4.4, 4.5, 4.5, 4.6],
    unit: '/5',
    tooltip: 'Average customer rating'
  },
  {
    title: 'Active Recommendations',
    value: '12',
    delta: 3,
    deltaType: 'increase',
    sparklineData: [8, 9, 10, 11, 10, 12],
    tooltip: 'Number of pending recommendations'
  },
  {
    title: 'Store Rank',
    value: '#3',
    delta: 2,
    deltaType: 'increase',
    sparklineData: [8, 7, 6, 5, 4, 3],
    tooltip: 'Ranking among all stores in region'
  }
];

// Mock User Profile
export const mockUserProfile: UserProfile = {
  id: 'user-001',
  name: 'Takeshi Yamamoto',
  role: 'STORE_MANAGER',
  avatar: 'https://via.placeholder.com/100/4169E1/FFFFFF?text=TY',
  storeId: 'STORE-7E-JP-001',
  lastLogin: new Date('2025-10-04T08:00:00'),
  preferences: {
    theme: 'light',
    language: 'en',
    notifications: true
  }
};

// Mock Trend Data for charts
export const mockTrendData: TrendData[] = [
  { date: '2025-09-28', value: 95000, category: 'revenue' },
  { date: '2025-09-29', value: 98000, category: 'revenue' },
  { date: '2025-09-30', value: 102000, category: 'revenue' },
  { date: '2025-10-01', value: 108000, category: 'revenue' },
  { date: '2025-10-02', value: 115000, category: 'revenue' },
  { date: '2025-10-03', value: 120000, category: 'revenue' },
  { date: '2025-10-04', value: 125000, category: 'revenue' }
];

// Helper function to get random recommendations
export const getRandomRecommendations = (count: number): Recommendation[] => {
  const shuffled = [...mockRecommendations].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

// Helper function to get upcoming events
export const getUpcomingEvents = (days: number = 7): Event[] => {
  const now = new Date();
  const futureDate = new Date(now.getTime() + days * 24 * 60 * 60 * 1000);
  return mockEvents.filter(event => event.date >= now && event.date <= futureDate);
};

// Helper function to simulate real-time updates
export const simulateDataUpdate = (data: any): any => {
  const variance = 0.05; // 5% variance
  if (typeof data === 'number') {
    return data * (1 + (Math.random() * variance * 2 - variance));
  }
  return data;
};
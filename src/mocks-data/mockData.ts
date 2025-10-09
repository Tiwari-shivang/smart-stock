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
    imageUrl: 'https://ik.imagekit.io/r3grqaeps/static_site_imgs/lays.png?updatedAt=1759762012314',
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
    imageUrl: 'https://ik.imagekit.io/r3grqaeps/static_site_imgs/noodles.png?updatedAt=1759762012378',
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
    imageUrl: 'https://ik.imagekit.io/r3grqaeps/static_site_imgs/energy.png?updatedAt=1759762012825',
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
    imageUrl: 'https://ik.imagekit.io/r3grqaeps/static_site_imgs/beer.png?updatedAt=1759762012171',
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
    imageUrl: 'https://ik.imagekit.io/r3grqaeps/static_site_imgs/umbrella.png?updatedAt=1759762011792',
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
  // Event-driven: GBA-Erdinger Oktoberfest (Oct 9-11) - Foreign tourists & expats
  {
    id: 'rec-001',
    sku: 'sku-007',
    skuName: 'Asahi Beer 350ml',
    imageUrl: 'https://ik.imagekit.io/r3grqaeps/static_site_imgs/beer.png?updatedAt=1759762012171',
    action: 'RESTOCK',
    confidence: 0.94,
    impactScore: 92,
    reasons: ['GBA Oktoberfest Oct 9-11', 'High foreign tourist demand', 'Festival beer consumption spike'],
    quantity: 150,
    shelfFit: true,
    crossSellSuggestions: ['Lay\'s Chips', 'Peanuts', 'Hot Dog'],
    estimatedRevenue: 825,
    volatility: 0.2,
    priority: 'HIGH',
    createdAt: new Date('2025-10-07T08:00:00')
  },
  {
    id: 'rec-002',
    sku: 'sku-002',
    skuName: 'Lay\'s Original Chips',
    imageUrl: 'https://ik.imagekit.io/r3grqaeps/static_site_imgs/lays.png?updatedAt=1759762012314',
    action: 'RESTOCK',
    confidence: 0.89,
    impactScore: 86,
    reasons: ['Oktoberfest snack pairing', 'V.League match Oct 18', 'Universal appeal - all consumers'],
    quantity: 100,
    shelfFit: true,
    crossSellSuggestions: ['Asahi Beer', 'Coca Cola'],
    estimatedRevenue: 350,
    volatility: 0.3,
    priority: 'HIGH',
    createdAt: new Date('2025-10-07T08:15:00')
  },
  {
    id: 'rec-003',
    sku: 'sku-014',
    skuName: 'Hot Dog',
    imageUrl: 'https://via.placeholder.com/150/FF6347/FFFFFF?text=HotDog',
    action: 'RESTOCK',
    confidence: 0.87,
    impactScore: 84,
    reasons: ['Oktoberfest food demand', 'Quick meal for festival goers', 'Popular with foreign tourists'],
    quantity: 80,
    shelfFit: true,
    crossSellSuggestions: ['Asahi Beer', 'Soft Drink'],
    estimatedRevenue: 280,
    volatility: 0.4,
    priority: 'HIGH',
    createdAt: new Date('2025-10-07T08:30:00')
  },
  // Weather-driven: Rainy season - Local consumers
  {
    id: 'rec-004',
    sku: 'sku-003',
    skuName: 'Cup Noodles Seafood',
    imageUrl: 'https://ik.imagekit.io/r3grqaeps/static_site_imgs/noodles.png?updatedAt=1759762012378',
    action: 'RESTOCK',
    confidence: 0.93,
    impactScore: 88,
    reasons: ['Rainy weather forecast', 'High local consumer demand', 'Comfort food trend'],
    quantity: 120,
    shelfFit: true,
    crossSellSuggestions: ['Fresh Eggs', 'Hot Coffee', 'Umbrella'],
    estimatedRevenue: 216,
    volatility: 0.25,
    priority: 'HIGH',
    createdAt: new Date('2025-10-07T09:00:00')
  },
  {
    id: 'rec-005',
    sku: 'sku-010',
    skuName: 'Umbrella - Compact',
    imageUrl: 'https://ik.imagekit.io/r3grqaeps/static_site_imgs/umbrella.png?updatedAt=1759762011792',
    action: 'RESTOCK',
    confidence: 0.91,
    impactScore: 85,
    reasons: ['Heavy rain forecast', 'Essential for all consumers', 'High tourist demand during Lantern Festival'],
    quantity: 50,
    shelfFit: true,
    crossSellSuggestions: ['Raincoat', 'Paper Towels'],
    estimatedRevenue: 600,
    volatility: 0.5,
    priority: 'HIGH',
    createdAt: new Date('2025-10-07T09:15:00')
  },
  // Event-driven: V.League 1 Match (Oct 18) - Local consumers
  {
    id: 'rec-006',
    sku: 'sku-001',
    skuName: 'Coca Cola 500ml',
    imageUrl: 'https://via.placeholder.com/150/FF0000/FFFFFF?text=Coke',
    action: 'RESTOCK',
    confidence: 0.88,
    impactScore: 82,
    reasons: ['V.League match Oct 18', 'High local sports fan demand', 'Universal beverage choice'],
    quantity: 100,
    shelfFit: true,
    crossSellSuggestions: ['Lay\'s Chips', 'Chicken Sandwich'],
    estimatedRevenue: 250,
    volatility: 0.2,
    priority: 'HIGH',
    createdAt: new Date('2025-10-07T09:30:00')
  },
  // Event-driven: GENfest Nov 4-5 - Youth/local consumers
  {
    id: 'rec-007',
    sku: 'sku-004',
    skuName: 'Red Bull Energy Drink',
    imageUrl: 'https://ik.imagekit.io/r3grqaeps/static_site_imgs/energy.png?updatedAt=1759762012825',
    action: 'RESTOCK',
    confidence: 0.90,
    impactScore: 87,
    reasons: ['GENfest Nov 4-5', 'Youth festival crowd', 'High energy demand for music event'],
    quantity: 90,
    shelfFit: true,
    crossSellSuggestions: ['KitKat', 'Chicken Sandwich'],
    estimatedRevenue: 405,
    volatility: 0.3,
    priority: 'HIGH',
    createdAt: new Date('2025-10-28T08:00:00')
  },
  {
    id: 'rec-008',
    sku: 'sku-008',
    skuName: 'KitKat Green Tea',
    imageUrl: 'https://via.placeholder.com/150/90EE90/000000?text=KitKat',
    action: 'RESTOCK',
    confidence: 0.85,
    impactScore: 78,
    reasons: ['GENfest youth demand', 'Quick snack for festival', 'Popular with local & foreign youth'],
    quantity: 80,
    shelfFit: true,
    crossSellSuggestions: ['Red Bull', 'Pocky'],
    estimatedRevenue: 224,
    volatility: 0.35,
    priority: 'MEDIUM',
    createdAt: new Date('2025-10-28T08:15:00')
  },
  // Event-driven: Hoi An Lantern Festival (Nov 3 & Dec 3) - Foreign tourists
  {
    id: 'rec-009',
    sku: 'sku-011',
    skuName: 'Chicken Sandwich',
    imageUrl: 'https://via.placeholder.com/150/F4A460/FFFFFF?text=Sandwich',
    action: 'RESTOCK',
    confidence: 0.86,
    impactScore: 80,
    reasons: ['Lantern Festival Nov 3', 'High tourist foot traffic', 'Quick meal for festival visitors'],
    quantity: 70,
    shelfFit: true,
    crossSellSuggestions: ['Coca Cola', 'Bottled Water'],
    estimatedRevenue: 455,
    volatility: 0.4,
    priority: 'HIGH',
    createdAt: new Date('2025-10-28T08:30:00')
  },
  {
    id: 'rec-010',
    sku: 'sku-005',
    skuName: 'Pocky Chocolate',
    imageUrl: 'https://via.placeholder.com/150/8B4513/FFFFFF?text=Pocky',
    action: 'PROMOTE',
    confidence: 0.82,
    impactScore: 75,
    reasons: ['Popular with Asian tourists', 'Lantern Festival souvenir snack', 'High stock level supports promotion'],
    quantity: 0,
    shelfFit: true,
    crossSellSuggestions: ['KitKat', 'Bottled Tea'],
    estimatedRevenue: 343,
    volatility: 0.25,
    priority: 'MEDIUM',
    createdAt: new Date('2025-10-28T08:45:00')
  },
  // General - Local daily essentials
  {
    id: 'rec-011',
    sku: 'sku-015',
    skuName: 'Paper Towels',
    imageUrl: 'https://via.placeholder.com/150/FFFFFF/000000?text=Towels',
    action: 'PROMOTE',
    confidence: 0.76,
    impactScore: 68,
    reasons: ['Rainy season essentials', 'Local household demand', 'Bundle opportunity with cleaning items'],
    quantity: 0,
    shelfFit: true,
    crossSellSuggestions: ['Tissue Paper', 'Cleaning Spray'],
    estimatedRevenue: 208,
    volatility: 0.2,
    priority: 'MEDIUM',
    createdAt: new Date('2025-10-07T10:00:00')
  },
  {
    id: 'rec-012',
    sku: 'sku-012',
    skuName: 'Beef Wrap',
    imageUrl: 'https://via.placeholder.com/150/8B4513/FFFFFF?text=Wrap',
    action: 'RESTOCK',
    confidence: 0.84,
    impactScore: 77,
    reasons: ['Below minimum stock', 'Healthy option for locals', 'Festival season meal alternative'],
    quantity: 45,
    shelfFit: true,
    crossSellSuggestions: ['Fresh Juice', 'Bottled Water'],
    estimatedRevenue: 324,
    volatility: 0.3,
    priority: 'HIGH',
    createdAt: new Date('2025-10-07T10:15:00')
  },
  {
    id: 'rec-013',
    sku: 'sku-009',
    skuName: 'Fresh Eggs (6 pack)',
    imageUrl: 'https://via.placeholder.com/150/FAFAD2/000000?text=Eggs',
    action: 'RESTOCK',
    confidence: 0.80,
    impactScore: 72,
    reasons: ['Rainy day cooking at home', 'Local consumer staple', 'Pairs with instant noodles'],
    quantity: 40,
    shelfFit: true,
    crossSellSuggestions: ['Cup Noodles', 'Bread'],
    estimatedRevenue: 168,
    volatility: 0.25,
    priority: 'MEDIUM',
    createdAt: new Date('2025-10-07T10:30:00')
  },
  {
    id: 'rec-014',
    sku: 'sku-013',
    skuName: 'Colgate Toothpaste',
    imageUrl: 'https://via.placeholder.com/150/FF0000/FFFFFF?text=Toothpaste',
    action: 'PROMOTE',
    confidence: 0.75,
    impactScore: 65,
    reasons: ['Essential for all consumers', 'Tourist travel necessity', 'Bundle with personal care items'],
    quantity: 0,
    shelfFit: true,
    crossSellSuggestions: ['Toothbrush', 'Hand Soap'],
    estimatedRevenue: 192,
    volatility: 0.15,
    priority: 'MEDIUM',
    createdAt: new Date('2025-10-07T10:45:00')
  },
  {
    id: 'rec-015',
    sku: 'sku-016',
    skuName: 'Hand Soap',
    imageUrl: 'https://via.placeholder.com/150/87CEEB/000000?text=Soap',
    action: 'PROMOTE',
    confidence: 0.78,
    impactScore: 70,
    reasons: ['Hygiene essential for all', 'Rainy season health awareness', 'Festival crowds increase hygiene needs'],
    quantity: 0,
    shelfFit: true,
    crossSellSuggestions: ['Hand Sanitizer', 'Paper Towels'],
    estimatedRevenue: 152,
    volatility: 0.2,
    priority: 'MEDIUM',
    createdAt: new Date('2025-10-07T11:00:00')
  }
];

// Mock Events
export const mockEvents: Event[] = [
  {
    id: 'event-001',
    name: 'GBA-Erdinger Oktoberfest (HCMC)',
    type: 'FESTIVAL',
    date: new Date('2025-10-09T18:00:00'),
    impact: 'HIGH',
    affectedCategories: ['Beverages', 'Snacks', 'Alcohol'],
    estimatedDemandMultiplier: 2.8,
    location: 'Hotel Nikko Saigon',
    description: "Vietnam's biggest Oktoberfest edition, Oct 9-11. Celebrating 50th anniversary of Vietnam-Germany relations with authentic German beer and food."
  },
  {
    id: 'event-002',
    name: 'V.League 1 - Hanoi FC Match',
    type: 'FOOTBALL',
    date: new Date('2025-10-18T19:00:00'),
    impact: 'HIGH',
    affectedCategories: ['Beverages', 'Snacks', 'Alcohol'],
    estimatedDemandMultiplier: 2.3,
    location: 'Multiple Cities',
    description: 'V.League 1 2025/26 season fixtures. Vietnamese football league matches driving high demand for beverages and snacks.'
  },
  {
    id: 'event-003',
    name: 'Hoi An Lantern Festival',
    type: 'FESTIVAL',
    date: new Date('2025-11-03T18:00:00'),
    impact: 'MEDIUM',
    affectedCategories: ['Fresh Food', 'Beverages', 'Snacks'],
    estimatedDemandMultiplier: 1.9,
    location: 'Hoi An Ancient Town',
    description: 'Monthly full-moon festival at Hoi An with thousands of colorful lanterns, traditional performances, and street food.'
  },
  {
    id: 'event-004',
    name: 'GENfest - Multisensory Music Festival',
    type: 'CONCERT',
    date: new Date('2025-11-04T18:00:00'),
    impact: 'MEDIUM',
    affectedCategories: ['Beverages', 'Snacks', 'Energy Drinks'],
    estimatedDemandMultiplier: 2.0,
    location: 'HCMC',
    description: 'Youth-focused live music experience blending music, art, games, fashion and culture over 2 days.'
  },
  {
    id: 'event-005',
    name: 'Hoi An Lantern Festival',
    type: 'FESTIVAL',
    date: new Date('2025-12-03T18:00:00'),
    impact: 'MEDIUM',
    affectedCategories: ['Fresh Food', 'Beverages', 'Snacks'],
    estimatedDemandMultiplier: 1.9,
    location: 'Hoi An Ancient Town',
    description: 'December full-moon edition with floating lanterns on Hoai River and cultural activities.'
  },
  {
    id: 'event-006',
    name: 'V.League 1 Season Break',
    type: 'FOOTBALL',
    date: new Date('2025-11-24T00:00:00'),
    impact: 'LOW',
    affectedCategories: ['Beverages', 'Snacks'],
    estimatedDemandMultiplier: 0.8,
    location: 'Nationwide',
    description: '64-day break for Vietnam U-23 to compete in SEA Games and AFC U-23 Asian Cup. League resumes late January 2026.'
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

// Mock Bundles - Only Weather-based promotions
export const mockBundles: Bundle[] = [
  {
    id: 'bundle-001',
    name: 'Rainy Day Combo 1',
    items: ['Cup Noodles Seafood', 'Hot Coffee', 'Umbrella - Compact'],
    potentialRevenueLift: 35,
    projectedUplift: 35,
    active: true,
    price: 16.00,
    discount: 20,
    description: 'Perfect for rainy weather! Get your comfort meal with a hot coffee and stay dry. Save $2.30!'
  },
  {
    id: 'bundle-002',
    name: 'Rainy Day Combo 2',
    items: ['Cup Noodles Seafood', 'Fresh Eggs (6 pack)', 'Paper Towels'],
    potentialRevenueLift: 28,
    projectedUplift: 28,
    active: true,
    price: 9.50,
    discount: 15,
    description: 'Cook at home during the rain! Complete meal kit with cleanup essentials. Save $1.70!'
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
    title: 'Slow moving items',
    value: '5',
    delta: -1,
    deltaType: 'decrease',
    sparklineData: [8, 7, 6, 6, 5, 5],
    tooltip: 'Number of slow moving items in inventory'
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
  name: 'Dustin Nguyen',
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
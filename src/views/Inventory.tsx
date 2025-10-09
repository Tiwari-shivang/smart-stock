import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Package,
  Search,
  Filter,
  TrendingUp,
  TrendingDown,
  AlertCircle,
  CheckCircle,
  XCircle,
  RefreshCw,
  Download,
  Plus,
  Grid,
  List
} from 'lucide-react';
import { DashboardLayout } from '@/components/dashboard';
import { Card, Button, Badge } from '@/components/ui';
import { inventoryItems, InventoryItem, InventoryCategory } from '@/mocks-data/inventoryData';

type ViewMode = 'grid' | 'list';
type FilterStatus = 'all' | 'in-stock' | 'low-stock' | 'out-of-stock';

export const Inventory: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<InventoryCategory | 'all'>('all');
  const [filterStatus, setFilterStatus] = useState<FilterStatus>('all');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Get unique categories
  const categories: InventoryCategory[] = useMemo(() => {
    const uniqueCategories = Array.from(new Set(inventoryItems.map(item => item.category)));
    return uniqueCategories as InventoryCategory[];
  }, []);

  // Filter and search logic
  const filteredItems = useMemo(() => {
    return inventoryItems.filter(item => {
      // Search filter
      const matchesSearch = searchQuery === '' ||
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.sku.toLowerCase().includes(searchQuery.toLowerCase());

      // Category filter
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;

      // Status filter
      let matchesStatus = true;
      if (filterStatus === 'in-stock') {
        matchesStatus = item.status === 'in-stock';
      } else if (filterStatus === 'low-stock') {
        matchesStatus = item.status === 'low-stock';
      } else if (filterStatus === 'out-of-stock') {
        matchesStatus = item.status === 'out-of-stock';
      }

      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [searchQuery, selectedCategory, filterStatus]);

  // Calculate stats
  const stats = useMemo(() => {
    const total = inventoryItems.length;
    const inStock = inventoryItems.filter(item => item.status === 'in-stock').length;
    const lowStock = inventoryItems.filter(item => item.status === 'low-stock').length;
    const outOfStock = inventoryItems.filter(item => item.status === 'out-of-stock').length;
    const totalValue = inventoryItems.reduce((sum, item) => sum + (item.currentStock * item.price), 0);

    return { total, inStock, lowStock, outOfStock, totalValue };
  }, []);

  // Handle refresh
  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  // Get status badge variant
  const getStatusVariant = (status: InventoryItem['status']) => {
    switch (status) {
      case 'in-stock': return 'success';
      case 'low-stock': return 'warning';
      case 'out-of-stock': return 'danger';
      default: return 'default';
    }
  };

  // Get status icon
  const getStatusIcon = (status: InventoryItem['status']) => {
    switch (status) {
      case 'in-stock': return <CheckCircle size={16} />;
      case 'low-stock': return <AlertCircle size={16} />;
      case 'out-of-stock': return <XCircle size={16} />;
    }
  };

  return (
    <DashboardLayout activeTab="inventory">
      <div className="p-4 lg:p-6 desktop:px-16 space-y-6">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4"
        >
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-ss-text mb-2">
              Inventory Management
            </h1>
            <p className="text-sm text-ss-subtle">
              Track and manage your store inventory across all categories
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              icon={<RefreshCw size={16} className={isRefreshing ? 'animate-spin' : ''} />}
              onClick={handleRefresh}
              disabled={isRefreshing}
            >
              Refresh
            </Button>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="p-4 h-[120px] flex flex-col justify-between">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-ss-subtle">Total Items</span>
                <Package className="text-ss-primary" size={20} />
              </div>
              <p className="text-2xl font-bold text-ss-text">{stats.total}</p>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="p-4 h-[120px] flex flex-col justify-between">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-ss-subtle">In Stock</span>
                <CheckCircle className="text-green-600" size={20} />
              </div>
              <div>
                <p className="text-2xl font-bold text-ss-text">{stats.inStock}</p>
                <p className="text-xs text-ss-subtle mt-1">
                  {((stats.inStock / stats.total) * 100).toFixed(0)}% of total
                </p>
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="p-4 h-[120px] flex flex-col justify-between">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-ss-subtle">Low Stock</span>
                <AlertCircle className="text-yellow-600" size={20} />
              </div>
              <div>
                <p className="text-2xl font-bold text-ss-text">{stats.lowStock}</p>
                <p className="text-xs text-ss-subtle mt-1">Needs attention</p>
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="p-4 h-[120px] flex flex-col justify-between">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-ss-subtle">Total Value</span>
                <TrendingUp className="text-ss-blue" size={20} />
              </div>
              <p className="text-2xl font-bold text-ss-text">
                ${stats.totalValue.toLocaleString()}
              </p>
            </Card>
          </motion.div>
        </div>

        {/* Filters & Search */}
        <Card className="p-4">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-ss-subtle" size={18} />
                <input
                  type="text"
                  placeholder="Search by name or SKU..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-ss-muted rounded-lg text-ss-text placeholder-ss-subtle outline-none focus:ring-2 focus:ring-ss-primary"
                />
              </div>
            </div>

            {/* Category Filter */}
            <div className="flex-shrink-0">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value as any)}
                className="px-4 py-2 bg-ss-muted rounded-lg text-ss-text outline-none focus:ring-2 focus:ring-ss-primary"
              >
                <option value="all">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            {/* Status Filter */}
            <div className="flex-shrink-0">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value as FilterStatus)}
                className="px-4 py-2 bg-ss-muted rounded-lg text-ss-text outline-none focus:ring-2 focus:ring-ss-primary"
              >
                <option value="all">All Status</option>
                <option value="in-stock">In Stock</option>
                <option value="low-stock">Low Stock</option>
                <option value="out-of-stock">Out of Stock</option>
              </select>
            </div>

            {/* View Mode Toggle */}
            <div className="flex gap-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'grid'
                    ? 'bg-ss-primary text-white'
                    : 'bg-ss-muted text-ss-subtle hover:bg-ss-muted/80'
                }`}
              >
                <Grid size={18} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'list'
                    ? 'bg-ss-primary text-white'
                    : 'bg-ss-muted text-ss-subtle hover:bg-ss-muted/80'
                }`}
              >
                <List size={18} />
              </button>
            </div>
          </div>

          {/* Active Filters Display */}
          {(searchQuery || selectedCategory !== 'all' || filterStatus !== 'all') && (
            <div className="mt-4 pt-4 border-t border-ss-line">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-sm text-ss-subtle">Active filters:</span>
                {searchQuery && (
                  <Badge variant="default">
                    Search: "{searchQuery}"
                  </Badge>
                )}
                {selectedCategory !== 'all' && (
                  <Badge variant="default">
                    Category: {selectedCategory}
                  </Badge>
                )}
                {filterStatus !== 'all' && (
                  <Badge variant="default">
                    Status: {filterStatus}
                  </Badge>
                )}
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('all');
                    setFilterStatus('all');
                  }}
                  className="text-sm text-ss-primary hover:underline"
                >
                  Clear all
                </button>
              </div>
            </div>
          )}
        </Card>

        {/* Results Count */}
        <div className="flex items-center justify-between">
          <p className="text-sm text-ss-subtle">
            Showing {filteredItems.length} of {stats.total} items
          </p>
        </div>

        {/* Inventory Items - Grid View */}
        {viewMode === 'grid' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 desktop:grid-cols-4 gap-4">
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.02 }}
              >
                <Card className="p-4 hover:shadow-lg transition-all">
                  {/* Item Header */}
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="font-semibold text-sm text-ss-text mb-1 line-clamp-2">
                        {item.name}
                      </h3>
                      <p className="text-xs text-ss-subtle">{item.sku}</p>
                    </div>
                    <Badge
                      variant={getStatusVariant(item.status)}
                      className="ml-2 flex-shrink-0"
                    >
                      {getStatusIcon(item.status)}
                    </Badge>
                  </div>

                  {/* Category Badge */}
                  <div className="mb-3">
                    <Badge variant="default" size="sm">
                      {item.category}
                    </Badge>
                  </div>

                  {/* Stock Info */}
                  <div className="space-y-2 mb-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-ss-subtle">Current Stock</span>
                      <span className="font-semibold text-ss-text">{item.currentStock}</span>
                    </div>
                    <div className="w-full h-2 bg-ss-muted rounded-full overflow-hidden">
                      <div
                        className={`h-full transition-all ${
                          item.status === 'in-stock'
                            ? 'bg-green-500'
                            : item.status === 'low-stock'
                            ? 'bg-yellow-500'
                            : 'bg-red-500'
                        }`}
                        style={{ width: `${(item.currentStock / item.reorderPoint) * 100}%` }}
                      />
                    </div>
                    <div className="flex items-center justify-between text-xs text-ss-subtle">
                      <span>Reorder at: {item.reorderPoint}</span>
                      <span>Max: {item.maxStock}</span>
                    </div>
                  </div>

                  {/* Price & Trend */}
                  <div className="flex items-center justify-between pt-3 border-t border-ss-line">
                    <div>
                      <p className="text-lg font-bold text-ss-text">${item.price}</p>
                      <p className="text-xs text-ss-subtle">per unit</p>
                    </div>
                    {item.trend === 'up' ? (
                      <div className="flex items-center gap-1 text-green-600">
                        <TrendingUp size={16} />
                        <span className="text-sm font-medium">+{item.trendPercentage}%</span>
                      </div>
                    ) : item.trend === 'down' ? (
                      <div className="flex items-center gap-1 text-red-600">
                        <TrendingDown size={16} />
                        <span className="text-sm font-medium">-{item.trendPercentage}%</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-1 text-ss-subtle">
                        <span className="text-sm">Stable</span>
                      </div>
                    )}
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        )}

        {/* Inventory Items - List View */}
        {viewMode === 'list' && (
          <Card className="overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-ss-muted">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-ss-text uppercase tracking-wider">
                      Product
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-ss-text uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-ss-text uppercase tracking-wider">
                      SKU
                    </th>
                    <th className="px-4 py-3 text-center text-xs font-semibold text-ss-text uppercase tracking-wider">
                      Stock
                    </th>
                    <th className="px-4 py-3 text-center text-xs font-semibold text-ss-text uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-4 py-3 text-right text-xs font-semibold text-ss-text uppercase tracking-wider">
                      Price
                    </th>
                    <th className="px-4 py-3 text-center text-xs font-semibold text-ss-text uppercase tracking-wider">
                      Trend
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-ss-line">
                  {filteredItems.map((item, index) => (
                    <motion.tr
                      key={item.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: index * 0.01 }}
                      className="hover:bg-ss-muted/50 transition-colors"
                    >
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-ss-muted rounded-lg flex items-center justify-center">
                            <Package size={20} className="text-ss-primary" />
                          </div>
                          <div>
                            <p className="font-medium text-sm text-ss-text">{item.name}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <Badge variant="default" size="sm">
                          {item.category}
                        </Badge>
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-sm text-ss-subtle">{item.sku}</span>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <div className="flex flex-col items-center">
                          <span className="font-semibold text-sm text-ss-text">{item.currentStock}</span>
                          <span className="text-xs text-ss-subtle">/ {item.maxStock}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <Badge variant={getStatusVariant(item.status)}>
                          {item.status.replace('-', ' ')}
                        </Badge>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <span className="font-semibold text-sm text-ss-text">${item.price}</span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-center gap-1">
                          {item.trend === 'up' ? (
                            <div className="flex items-center gap-1 text-green-600">
                              <TrendingUp size={16} />
                              <span className="text-sm font-medium">+{item.trendPercentage}%</span>
                            </div>
                          ) : item.trend === 'down' ? (
                            <div className="flex items-center gap-1 text-red-600">
                              <TrendingDown size={16} />
                              <span className="text-sm font-medium">-{item.trendPercentage}%</span>
                            </div>
                          ) : (
                            <span className="text-sm text-ss-subtle">—</span>
                          )}
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        )}

        {/* Empty State */}
        {filteredItems.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <Card className="p-12">
              <Package className="w-16 h-16 text-ss-subtle mx-auto mb-4" />
              <h3 className="text-lg font-medium text-ss-text mb-2">No items found</h3>
              <p className="text-ss-subtle mb-6">
                Try adjusting your search or filter criteria
              </p>
              <Button
                variant="primary"
                size="sm"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                  setFilterStatus('all');
                }}
              >
                Clear Filters
              </Button>
            </Card>
          </motion.div>
        )}
      </div>
    </DashboardLayout>
  );
};

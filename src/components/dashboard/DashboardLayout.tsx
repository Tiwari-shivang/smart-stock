import React from 'react';
import { clsx } from 'clsx';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  Package, 
  TrendingUp, 
  BarChart3, 
  Trophy,
  Search,
  Bell,
  Menu,
  X
} from 'lucide-react';
import { Tabs, TabItem } from '@/components/ui';
import { mockUserProfile } from '@/mocks-data/mockData';

interface DashboardLayoutProps {
  children: React.ReactNode;
  activeTab?: string;
  onTabChange?: (tab: string) => void;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children,
  activeTab = 'overview',
  onTabChange
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [isSearchOpen, setIsSearchOpen] = React.useState(false);

  const navigationTabs: TabItem[] = [
    { key: 'overview', label: 'Overview', icon: <LayoutDashboard size={18} /> },
    { key: 'inventory', label: 'Inventory', icon: <Package size={18} />, badge: '23' },
    { key: 'trends', label: 'Trends', icon: <TrendingUp size={18} /> },
    { key: 'analytics', label: 'Analytics', icon: <BarChart3 size={18} /> },
    { key: 'leaderboard', label: 'Leaderboard', icon: <Trophy size={18} /> }
  ];

  return (
    <div className="min-h-screen bg-ss-bg transition-colors duration-300">
      {/* Top App Bar */}
      <header className="sticky top-0 z-50 bg-ss-panel border-b border-ss-line">
        <div className="h-20 px-4 lg:px-6 desktop:px-16">
          <div className="h-full flex items-center justify-between">
            {/* Left: Logo & Navigation */}
            <div className="flex items-center gap-8">
              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 rounded-lg hover:bg-ss-muted transition-colors"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>

              {/* Logo */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 flex items-center justify-center">
                  <img 
                    src="https://ik.imagekit.io/r3grqaeps/static_site_imgs/appLogo.svg?updatedAt=1759761984148" 
                    alt="7-Eleven Logo" 
                    className="w-10 h-10"
                  />
                </div>
                <div>
                  <h1 className="font-bold text-xl text-ss-text">SmartStock</h1>
                  <p className="text-xs text-ss-subtle hidden lg:block">7-Eleven Inventory AI</p>
                </div>
              </div>

              {/* Desktop Navigation */}
              <nav className="hidden lg:block">
                <Tabs
                  items={navigationTabs}
                  value={activeTab}
                  onChange={onTabChange}
                  variant="default"
                />
              </nav>
            </div>

            {/* Right: Search & Profile */}
            <div className="flex items-center gap-4">
              {/* Search */}
              <div className="relative">
                <button
                  onClick={() => setIsSearchOpen(!isSearchOpen)}
                  className="p-2 rounded-lg hover:bg-ss-muted transition-colors"
                >
                  <Search size={20} className="text-ss-subtle" />
                </button>
                
                {isSearchOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute right-0 top-full mt-2 w-72 bg-ss-panel rounded-lg shadow-lg p-3"
                  >
                    <input
                      type="text"
                      placeholder="Search products, orders, analytics..."
                      className="w-full px-3 py-2 bg-ss-muted rounded-lg text-ss-text placeholder-ss-subtle outline-none focus:ring-2 focus:ring-ss-primary"
                      autoFocus
                    />
                  </motion.div>
                )}
              </div>

              {/* Notifications */}
              <button className="relative p-2 rounded-lg hover:bg-ss-muted transition-colors">
                <Bell size={20} className="text-ss-subtle" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>

              {/* Profile */}
              <div className="flex items-center gap-3">
                <div className="hidden lg:block text-right">
                  <p className="text-sm font-medium text-ss-text">{mockUserProfile.name}</p>
                  <p className="text-xs text-ss-subtle">Store #{mockUserProfile.storeId?.slice(-3)}</p>
                </div>
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold">
                    {mockUserProfile.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <motion.nav
            initial={{ height: 0 }}
            animate={{ height: 'auto' }}
            exit={{ height: 0 }}
            className="lg:hidden border-t border-ss-line overflow-hidden"
          >
            <div className="p-4 space-y-2">
              {navigationTabs.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => {
                    onTabChange?.(tab.key);
                    setIsMobileMenuOpen(false);
                  }}
                  className={clsx(
                    'w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors',
                    activeTab === tab.key
                      ? 'bg-ss-primary text-white'
                      : 'hover:bg-ss-muted text-ss-text'
                  )}
                >
                  {tab.icon}
                  <span className="font-medium">{tab.label}</span>
                  {tab.badge && (
                    <span className="ml-auto px-2 py-1 text-xs bg-white/20 rounded-full">
                      {tab.badge}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </motion.nav>
        )}
      </header>

      {/* Main Content Area */}
      <main className="container max-w-screen-desktop mx-auto">
        {children}
      </main>

      {/* Footer Status Bar */}
      <footer className="mt-8 border-t border-ss-line bg-ss-panel">
        <div className="container max-w-screen-desktop mx-auto px-4 lg:px-6 desktop:px-16">
          <div className="h-14 flex items-center justify-between text-xs text-ss-subtle">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                Online
              </span>
              <span>v2.1.0</span>
              <span className="hidden lg:inline">Last sync: 2 mins ago</span>
            </div>
            <div className="flex items-center gap-4">
              <button className="hover:text-ss-text transition-colors">Quick Tips</button>
              <button className="hover:text-ss-text transition-colors">Help</button>
              <select className="bg-transparent outline-none hover:text-ss-text transition-colors">
                <option value="en">English</option>
                <option value="jp">日本語</option>
                <option value="zh">中文</option>
              </select>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
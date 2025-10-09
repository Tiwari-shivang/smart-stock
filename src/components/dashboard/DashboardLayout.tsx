import React from 'react';
import { clsx } from 'clsx';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Package,
  TrendingUp,
  BarChart3,
  Trophy,
  Search,
  Settings,
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
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [isSearchOpen, setIsSearchOpen] = React.useState(false);
  const [isSettingsDrawerOpen, setIsSettingsDrawerOpen] = React.useState(false);
  const [isSalesforceEnabled, setIsSalesforceEnabled] = React.useState(true);
  const [isGPTEnabled, setIsGPTEnabled] = React.useState(true);

  // Determine active tab from location
  const currentTab = React.useMemo(() => {
    if (activeTab) return activeTab;
    if (location.pathname === '/inventory') return 'inventory';
    return 'overview';
  }, [activeTab, location.pathname]);

  const navigationTabs: TabItem[] = [
    { key: 'overview', label: 'Overview', icon: <LayoutDashboard size={18} /> },
    { key: 'inventory', label: 'Inventory', icon: <Package size={18} />, badge: '23' }
  ];

  // Handle tab navigation
  const handleTabChange = (tab: string) => {
    if (onTabChange) {
      onTabChange(tab);
    } else {
      // Use React Router navigation
      if (tab === 'inventory') {
        navigate('/inventory');
      } else {
        navigate('/');
      }
    }
  };

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
                <div className="flex items-center justify-center">
                  <img
                    src="https://ik.imagekit.io/r3grqaeps/static_site_imgs/appLogo.png?updatedAt=1760002106861"
                    alt="7-Eleven Logo"
                    className="h-[60px] w-[70px]"
                  />
                </div>
                <div>
                  <h1 className="font-bold text-xl text-ss-text">SmartStock</h1>
                  <p className="text-xs text-ss-subtle hidden lg:block">7-Eleven Inventory</p>
                </div>
              </div>

              {/* Desktop Navigation */}
              <nav className="hidden lg:block">
                <Tabs
                  items={navigationTabs}
                  value={currentTab}
                  onChange={handleTabChange}
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

              {/* Settings */}
              <button
                onClick={() => setIsSettingsDrawerOpen(true)}
                className="relative p-2 rounded-lg hover:bg-ss-muted transition-colors"
              >
                <Settings size={20} className="text-ss-subtle" />
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
                    handleTabChange(tab.key);
                    setIsMobileMenuOpen(false);
                  }}
                  className={clsx(
                    'w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors',
                    currentTab === tab.key
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

      {/* Settings Drawer */}
      <AnimatePresence>
        {isSettingsDrawerOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
              onClick={() => setIsSettingsDrawerOpen(false)}
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed right-0 top-0 bottom-0 w-full sm:w-96 bg-ss-panel shadow-2xl z-50 overflow-y-auto"
            >
              <div className="flex flex-col h-full">
                {/* Drawer Header */}
                <div className="flex items-center justify-between p-6 border-b border-ss-line">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-ss-primary/10 rounded-lg">
                      <Settings size={24} className="text-ss-primary" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-ss-text">Settings</h2>
                      <p className="text-xs text-ss-subtle">Configure integrations</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsSettingsDrawerOpen(false)}
                    className="p-2 rounded-lg hover:bg-ss-muted transition-colors"
                  >
                    <X size={20} className="text-ss-subtle" />
                  </button>
                </div>

                {/* Drawer Content */}
                <div className="flex-1 p-6 space-y-6">
                  {/* Integrations Section */}
                  <div>
                    <h3 className="text-sm font-semibold text-ss-text mb-4 uppercase tracking-wider">
                      Integrations
                    </h3>
                    <div className="space-y-4">
                      {/* Salesforce Toggle */}
                      <div className="bg-ss-bg rounded-xl p-4 border border-ss-line hover:border-ss-primary/30 transition-colors">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="p-3 bg-blue-500/10 rounded-lg">
                              <svg
                                className="w-6 h-6 text-blue-500"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                              >
                                <path d="M10.006 5.413a5.23 5.23 0 011.625 4.588c-.276 2.021-1.88 3.656-3.914 3.982a5.232 5.232 0 01-5.21-2.313 5.243 5.243 0 01-.332-4.971 5.22 5.22 0 013.868-3.165c.71-.118 1.439-.064 2.125.205l-1.108 1.109a3.484 3.484 0 00-2.526.36 3.497 3.497 0 00-1.647 2.118 3.502 3.502 0 00.221 2.636 3.492 3.492 0 002.188 1.81 3.489 3.489 0 002.614-.337 3.496 3.496 0 001.737-2.266h-2.833v-1.488h4.563c.088.491.088.994 0 1.485-.441 2.467-2.575 4.27-5.078 4.29a5.21 5.21 0 01-3.69-1.53 5.23 5.23 0 01-1.625-4.588c.276-2.021 1.88-3.656 3.914-3.982a5.232 5.232 0 015.21 2.313l-1.108 1.109z" />
                              </svg>
                            </div>
                            <div>
                              <h4 className="font-semibold text-ss-text">Salesforce</h4>
                              <p className="text-xs text-ss-subtle mt-1">
                                {isSalesforceEnabled ? 'Connected' : 'Disconnected'}
                              </p>
                            </div>
                          </div>
                          <button
                            onClick={() => setIsSalesforceEnabled(!isSalesforceEnabled)}
                            className={clsx(
                              'relative inline-flex h-7 w-12 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-ss-primary focus:ring-offset-2',
                              isSalesforceEnabled ? 'bg-ss-primary' : 'bg-ss-muted'
                            )}
                          >
                            <span
                              className={clsx(
                                'inline-block h-5 w-5 transform rounded-full bg-white shadow-lg transition-transform',
                                isSalesforceEnabled ? 'translate-x-6' : 'translate-x-1'
                              )}
                            />
                          </button>
                        </div>
                        {isSalesforceEnabled && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="mt-4 pt-4 border-t border-ss-line"
                          >
                            <div className="flex items-center gap-2 text-xs text-ss-subtle">
                              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                              <span>Syncing inventory data</span>
                            </div>
                          </motion.div>
                        )}
                      </div>

                      {/* GPT Toggle */}
                      <div className="bg-ss-bg rounded-xl p-4 border border-ss-line hover:border-ss-primary/30 transition-colors">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="p-3 bg-green-500/10 rounded-lg">
                              <svg
                                className="w-6 h-6 text-green-500"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                              >
                                <path d="M22.282 9.821a5.985 5.985 0 00-.516-4.91 6.046 6.046 0 00-6.51-2.9A6.065 6.065 0 004.981 4.18a5.985 5.985 0 00-3.998 2.9 6.046 6.046 0 00.743 7.097 5.98 5.98 0 00.51 4.911 6.051 6.051 0 006.515 2.9A5.985 5.985 0 0013.26 24a6.056 6.056 0 005.772-4.206 5.99 5.99 0 003.997-2.9 6.056 6.056 0 00-.747-7.073zM13.26 22.43a4.476 4.476 0 01-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 00.392-.681v-6.737l2.02 1.168a.071.071 0 01.038.052v5.583a4.504 4.504 0 01-4.494 4.494zM3.6 18.304a4.47 4.47 0 01-.535-3.014l.142.085 4.783 2.759a.771.771 0 00.78 0l5.843-3.369v2.332a.08.08 0 01-.033.062L9.74 19.95a4.5 4.5 0 01-6.14-1.646zM2.34 7.896a4.485 4.485 0 012.366-1.973V11.6a.766.766 0 00.388.676l5.815 3.355-2.02 1.168a.076.076 0 01-.071 0l-4.83-2.786A4.504 4.504 0 012.34 7.872zm16.597 3.855l-5.833-3.387L15.119 7.2a.076.076 0 01.071 0l4.83 2.791a4.494 4.494 0 01-.676 8.105v-5.678a.79.79 0 00-.407-.667zm2.01-3.023l-.141-.085-4.774-2.782a.776.776 0 00-.785 0L9.409 9.23V6.897a.066.066 0 01.028-.061l4.83-2.787a4.5 4.5 0 016.68 4.66zm-12.64 4.135l-2.02-1.164a.08.08 0 01-.038-.057V6.075a4.5 4.5 0 017.375-3.453l-.142.08L8.704 5.46a.795.795 0 00-.393.681zm1.097-2.365l2.602-1.5 2.607 1.5v2.999l-2.597 1.5-2.607-1.5z" />
                              </svg>
                            </div>
                            <div>
                              <h4 className="font-semibold text-ss-text">GPT Intelligence</h4>
                              <p className="text-xs text-ss-subtle mt-1">
                                {isGPTEnabled ? 'Active' : 'Inactive'}
                              </p>
                            </div>
                          </div>
                          <button
                            onClick={() => setIsGPTEnabled(!isGPTEnabled)}
                            className={clsx(
                              'relative inline-flex h-7 w-12 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-ss-primary focus:ring-offset-2',
                              isGPTEnabled ? 'bg-ss-primary' : 'bg-ss-muted'
                            )}
                          >
                            <span
                              className={clsx(
                                'inline-block h-5 w-5 transform rounded-full bg-white shadow-lg transition-transform',
                                isGPTEnabled ? 'translate-x-6' : 'translate-x-1'
                              )}
                            />
                          </button>
                        </div>
                        {isGPTEnabled && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="mt-4 pt-4 border-t border-ss-line"
                          >
                            <div className="flex items-center gap-2 text-xs text-ss-subtle">
                              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                              <span>AI recommendations enabled</span>
                            </div>
                          </motion.div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Drawer Footer */}
                <div className="p-6 border-t border-ss-line bg-ss-bg">
                  <div className="text-xs text-ss-subtle text-center">
                    <p>Last updated: {new Date().toLocaleTimeString()}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};
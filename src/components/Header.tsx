import React, { useState } from 'react';
import {
  Search,
  MapPin,
  User,
  Heart,
  ShoppingBag,
  Menu,
  X,
  Bell,
  Sparkles,
  ShieldCheck,
  ChevronDown,
  LogOut,
  Package,
  SlidersHorizontal,
  ChevronRight,
} from 'lucide-react';
import { useShop, AppView } from '../context/ShopContext';

export const Header: React.FC = () => {
  const {
    currentView,
    navigateTo,
    cart,
    wishlist,
    user,
    deliveryPincode,
    setDeliveryPincode,
    pincodeEstimatedDays,
    setIsSearchOpen,
    notifications,
    markNotificationAsRead,
    setAccountActiveTab,
  } = useShop();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isPincodeDropdownOpen, setIsPincodeDropdownOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [pincodeInput, setPincodeInput] = useState(deliveryPincode);

  const cartItemsCount = cart.reduce((total, item) => total + item.quantity, 0);
  const wishlistCount = wishlist.length;
  const unreadNotifsCount = notifications.filter((n) => !n.read).length;

  const handlePincodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pincodeInput.trim().length >= 6) {
      setDeliveryPincode(pincodeInput.trim());
      setIsPincodeDropdownOpen(false);
    }
  };

  const navLinks: { label: string; view: AppView; filter?: any; badge?: string }[] = [
    { label: 'MEN', view: 'catalog', filter: { gender: ['Men'] } },
    { label: 'WOMEN', view: 'catalog', filter: { gender: ['Women'] } },
    { label: 'NEW ARRIVALS', view: 'catalog', filter: { sortBy: 'newest' }, badge: 'HOT' },
    { label: 'TRENDING', view: 'catalog', filter: { sortBy: 'popularity' } },
    { label: 'BESTSELLERS', view: 'catalog', filter: { sortBy: 'recommended' } },
    { label: 'COLLECTIONS', view: 'collections' },
    { label: 'SALE', view: 'catalog', filter: { discount: 30 }, badge: '50% OFF' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-neutral-200 transition-all">
      {/* Top Promotional Bar */}
      <div className="bg-neutral-950 text-neutral-200 text-xs py-2 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between font-medium tracking-wider uppercase text-[11px]">
          <div className="flex items-center gap-2">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"></span>
            <span className="hidden sm:inline">LIMITED EDITION DROP:</span>
            <span>FREE EXPRESS SHIPPING ON ORDERS ABOVE ₹1,999</span>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => {
                navigateTo('catalog', { filterUpdates: { discount: 30 } });
              }}
              className="text-amber-300 hover:text-amber-200 transition-colors underline font-semibold cursor-pointer"
            >
              USE CODE: WELCOME (15% OFF)
            </button>
            <span className="text-neutral-500 hidden md:inline">|</span>
            <button
              onClick={() => navigateTo('admin')}
              className="hidden md:flex items-center gap-1.5 text-neutral-400 hover:text-white transition-colors cursor-pointer text-[10px]"
              title="Switch to Admin Dashboard"
            >
              <SlidersHorizontal className="w-3 h-3 text-amber-400" />
              <span>ADMIN PORTAL</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Header Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          {/* Mobile menu trigger */}
          <div className="flex items-center gap-3 lg:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-neutral-800 hover:text-black rounded-lg focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* SAVARA Brand Logo */}
          <div
            onClick={() => navigateTo('home')}
            className="flex flex-col cursor-pointer select-none group py-1"
          >
            <div className="flex items-center gap-1.5">
              <span className="font-serif-luxury text-2xl sm:text-3xl font-bold tracking-[0.22em] text-neutral-950 group-hover:text-black transition-colors">
                SAVARA
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mb-1"></span>
            </div>
            <span className="text-[9px] tracking-[0.3em] font-medium text-neutral-500 uppercase -mt-1 group-hover:text-neutral-700 transition-colors">
              Wear Your Statement
            </span>
          </div>

          {/* Desktop Categories Navigation */}
          <nav className="hidden lg:flex items-center space-x-7 text-xs font-semibold tracking-[0.14em] text-neutral-800">
            {navLinks.map((item) => (
              <button
                key={item.label}
                onClick={() => {
                  navigateTo(item.view, { filterUpdates: item.filter });
                }}
                className={`relative py-2 hover:text-black transition-colors group cursor-pointer ${
                  currentView === item.view ? 'text-black font-bold' : ''
                }`}
              >
                <span>{item.label}</span>
                {item.badge && (
                  <span className="absolute -top-1.5 -right-6 px-1.5 py-0.2 bg-neutral-900 text-amber-300 text-[9px] font-bold rounded-full tracking-normal">
                    {item.badge}
                  </span>
                )}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-neutral-950 transition-all duration-300 group-hover:w-full"></span>
              </button>
            ))}
          </nav>

          {/* Right Action Icons & Search */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Desktop Search Bar */}
            <div
              onClick={() => setIsSearchOpen(true)}
              className="hidden md:flex items-center gap-3 px-3.5 py-2.5 bg-neutral-100/90 hover:bg-neutral-100 rounded-full cursor-pointer transition-all border border-neutral-200/80 w-52 lg:w-72 xl:w-80 group"
            >
              <Search className="w-4 h-4 text-neutral-400 group-hover:text-neutral-700 transition-colors" />
              <span className="text-xs text-neutral-400 group-hover:text-neutral-600 truncate">
                Search products, brands, styles...
              </span>
              <kbd className="hidden xl:inline-block ml-auto text-[10px] bg-white border border-neutral-300 px-1.5 py-0.5 rounded text-neutral-400">
                ⌘K
              </kbd>
            </div>

            {/* Mobile Search Icon */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="md:hidden p-2 text-neutral-700 hover:text-black rounded-full"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Delivery Location Selector */}
            <div className="relative hidden sm:block">
              <button
                onClick={() => setIsPincodeDropdownOpen(!isPincodeDropdownOpen)}
                className="flex items-center gap-1.5 text-xs text-neutral-600 hover:text-black py-1.5 px-2.5 rounded-full hover:bg-neutral-100 transition-colors cursor-pointer"
                title="Delivery Pincode"
              >
                <MapPin className="w-4 h-4 text-neutral-500" />
                <span className="font-medium">{deliveryPincode}</span>
                <ChevronDown className="w-3 h-3 text-neutral-400" />
              </button>

              {isPincodeDropdownOpen && (
                <div className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-xl border border-neutral-200 p-4 z-50">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-neutral-900">
                      Delivery Location
                    </span>
                    <button
                      onClick={() => setIsPincodeDropdownOpen(false)}
                      className="text-neutral-400 hover:text-neutral-700 text-xs"
                    >
                      ✕
                    </button>
                  </div>
                  <p className="text-xs text-neutral-500 mb-3">
                    Enter your PIN code to view accurate delivery timelines and express slots.
                  </p>
                  <form onSubmit={handlePincodeSubmit} className="flex gap-2">
                    <input
                      type="text"
                      maxLength={6}
                      value={pincodeInput}
                      onChange={(e) => setPincodeInput(e.target.value.replace(/\D/g, ''))}
                      placeholder="Enter 6-digit PIN"
                      className="flex-1 px-3 py-1.5 text-xs border border-neutral-300 rounded-lg focus:outline-none focus:border-neutral-900"
                    />
                    <button
                      type="submit"
                      className="px-3 py-1.5 bg-neutral-900 text-white text-xs font-semibold rounded-lg hover:bg-black transition-colors"
                    >
                      Check
                    </button>
                  </form>
                  <div className="mt-3 pt-3 border-t border-neutral-100 flex items-center gap-2 text-[11px] text-emerald-700">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                    <span>{pincodeEstimatedDays}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Notifications Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                className="relative p-2 text-neutral-700 hover:text-black rounded-full hover:bg-neutral-100 transition-colors cursor-pointer"
                aria-label="Notifications"
              >
                <Bell className="w-5 h-5" />
                {unreadNotifsCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-amber-500 rounded-full"></span>
                )}
              </button>

              {isNotificationsOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-2xl border border-neutral-200 py-3 z-50">
                  <div className="px-4 pb-2 border-b border-neutral-100 flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-neutral-900">
                      Notifications ({notifications.length})
                    </span>
                    <button
                      onClick={() => setIsNotificationsOpen(false)}
                      className="text-neutral-400 hover:text-neutral-700 text-xs"
                    >
                      ✕
                    </button>
                  </div>
                  <div className="max-h-80 overflow-y-auto divide-y divide-neutral-100">
                    {notifications.length === 0 ? (
                      <div className="p-4 text-center text-xs text-neutral-400">
                        No notifications at this time.
                      </div>
                    ) : (
                      notifications.map((n) => (
                        <div
                          key={n.id}
                          onClick={() => {
                            markNotificationAsRead(n.id);
                            if (n.link === 'orders') {
                              setAccountActiveTab('orders');
                              navigateTo('account');
                            } else if (n.link === 'collections') {
                              navigateTo('collections');
                            } else {
                              navigateTo('catalog');
                            }
                            setIsNotificationsOpen(false);
                          }}
                          className={`p-3 text-xs hover:bg-neutral-50 transition-colors cursor-pointer flex gap-3 ${
                            !n.read ? 'bg-amber-50/50' : ''
                          }`}
                        >
                          <div className="w-2 h-2 rounded-full bg-neutral-900 mt-1.5 shrink-0"></div>
                          <div>
                            <p className="font-semibold text-neutral-900">{n.title}</p>
                            <p className="text-neutral-600 text-[11px] mt-0.5">{n.message}</p>
                            <span className="text-[10px] text-neutral-400 mt-1 block">
                              {n.time}
                            </span>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Wishlist Icon */}
            <button
              onClick={() => navigateTo('wishlist')}
              className="relative p-2 text-neutral-700 hover:text-black rounded-full hover:bg-neutral-100 transition-colors cursor-pointer"
              aria-label="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 flex items-center justify-center min-w-[16px] h-4 px-1 text-[10px] font-bold text-white bg-neutral-900 rounded-full">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Cart Icon */}
            <button
              onClick={() => navigateTo('cart')}
              className="relative p-2 text-neutral-700 hover:text-black rounded-full hover:bg-neutral-100 transition-colors cursor-pointer"
              aria-label="Shopping Bag"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartItemsCount > 0 && (
                <span className="absolute top-1 right-1 flex items-center justify-center min-w-[16px] h-4 px-1 text-[10px] font-bold text-neutral-900 bg-amber-400 rounded-full">
                  {cartItemsCount}
                </span>
              )}
            </button>

            {/* User Profile Menu */}
            <div className="relative">
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center gap-1.5 p-1.5 rounded-full hover:bg-neutral-100 transition-colors cursor-pointer text-neutral-700 hover:text-black"
                aria-label="User Account"
              >
                <div className="w-7 h-7 rounded-full bg-neutral-900 text-white flex items-center justify-center text-xs font-semibold">
                  {user.name ? user.name[0].toUpperCase() : 'S'}
                </div>
              </button>

              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-2xl border border-neutral-200 py-3 z-50">
                  <div className="px-4 py-2 border-b border-neutral-100">
                    <p className="text-xs font-bold text-neutral-950 uppercase tracking-wide">
                      {user.name}
                    </p>
                    <p className="text-[11px] text-neutral-500 truncate">{user.email}</p>
                    <div className="mt-2 flex items-center justify-between text-[11px] bg-neutral-100 px-2.5 py-1 rounded-lg">
                      <span className="text-neutral-600">SAVARA Wallet:</span>
                      <span className="font-bold text-neutral-900">₹{user.walletBalance}</span>
                    </div>
                  </div>

                  <div className="py-1 text-xs text-neutral-700">
                    <button
                      onClick={() => {
                        setAccountActiveTab('orders');
                        navigateTo('account');
                        setIsUserMenuOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-neutral-100 flex items-center gap-2.5 transition-colors cursor-pointer"
                    >
                      <Package className="w-4 h-4 text-neutral-500" />
                      <span>My Orders & Tracking</span>
                    </button>
                    <button
                      onClick={() => {
                        setAccountActiveTab('profile');
                        navigateTo('account');
                        setIsUserMenuOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-neutral-100 flex items-center gap-2.5 transition-colors cursor-pointer"
                    >
                      <User className="w-4 h-4 text-neutral-500" />
                      <span>Account Details</span>
                    </button>
                    <button
                      onClick={() => {
                        setAccountActiveTab('addresses');
                        navigateTo('account');
                        setIsUserMenuOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-neutral-100 flex items-center gap-2.5 transition-colors cursor-pointer"
                    >
                      <MapPin className="w-4 h-4 text-neutral-500" />
                      <span>Saved Addresses</span>
                    </button>
                    <button
                      onClick={() => {
                        navigateTo('wishlist');
                        setIsUserMenuOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-neutral-100 flex items-center gap-2.5 transition-colors cursor-pointer"
                    >
                      <Heart className="w-4 h-4 text-neutral-500" />
                      <span>Saved Wishlist ({wishlistCount})</span>
                    </button>

                    <div className="my-1 border-t border-neutral-100"></div>

                    <button
                      onClick={() => {
                        navigateTo('admin');
                        setIsUserMenuOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-amber-50 text-neutral-900 font-semibold flex items-center gap-2.5 transition-colors cursor-pointer"
                    >
                      <SlidersHorizontal className="w-4 h-4 text-amber-600" />
                      <span>Admin Management Portal</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Slide-Over Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            onClick={() => setIsMobileMenuOpen(false)}
          ></div>
          <div className="relative w-4/5 max-w-sm bg-white h-full shadow-2xl flex flex-col z-10 overflow-y-auto">
            <div className="p-5 border-b border-neutral-200 flex items-center justify-between">
              <div>
                <span className="font-serif-luxury text-xl font-bold tracking-[0.2em] text-neutral-950">
                  SAVARA
                </span>
                <span className="block text-[9px] tracking-widest text-neutral-400">
                  WEAR YOUR STATEMENT
                </span>
              </div>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-1.5 text-neutral-500 hover:text-black rounded-lg"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Mobile Pincode bar */}
            <div className="px-5 py-3 bg-neutral-50 border-b border-neutral-100 flex items-center justify-between text-xs">
              <div className="flex items-center gap-1.5 text-neutral-700">
                <MapPin className="w-4 h-4 text-neutral-500" />
                <span>Deliver to: <strong>{deliveryPincode}</strong></span>
              </div>
              <span className="text-[10px] text-emerald-600 font-medium">Verified</span>
            </div>

            {/* Mobile Links */}
            <div className="p-5 space-y-3 flex-1">
              <p className="text-[10px] font-bold tracking-widest text-neutral-400 uppercase">
                Categories
              </p>
              {navLinks.map((item) => (
                <button
                  key={item.label}
                  onClick={() => {
                    navigateTo(item.view, { filterUpdates: item.filter });
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full text-left py-2.5 text-sm font-semibold tracking-wider text-neutral-800 flex items-center justify-between border-b border-neutral-100 hover:text-black"
                >
                  <span>{item.label}</span>
                  {item.badge ? (
                    <span className="text-[10px] px-2 py-0.5 bg-neutral-950 text-amber-300 font-bold rounded-full">
                      {item.badge}
                    </span>
                  ) : (
                    <ChevronRight className="w-4 h-4 text-neutral-400" />
                  )}
                </button>
              ))}

              <div className="pt-4 space-y-2">
                <p className="text-[10px] font-bold tracking-widest text-neutral-400 uppercase">
                  Account & Settings
                </p>
                <button
                  onClick={() => {
                    navigateTo('account');
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full text-left py-2 text-xs font-medium text-neutral-700 hover:text-black flex items-center gap-2"
                >
                  <User className="w-4 h-4" /> My Profile & Orders
                </button>
                <button
                  onClick={() => {
                    navigateTo('wishlist');
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full text-left py-2 text-xs font-medium text-neutral-700 hover:text-black flex items-center gap-2"
                >
                  <Heart className="w-4 h-4" /> Wishlist ({wishlistCount})
                </button>
                <button
                  onClick={() => {
                    navigateTo('admin');
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full text-left py-2 text-xs font-semibold text-amber-700 hover:text-amber-800 flex items-center gap-2"
                >
                  <SlidersHorizontal className="w-4 h-4" /> Admin Management Dashboard
                </button>
              </div>
            </div>

            <div className="p-5 border-t border-neutral-200 bg-neutral-50 text-xs text-neutral-500">
              <p className="font-semibold text-neutral-900">SAVARA Concierge Support</p>
              <p className="text-[11px] mt-1">Available 24/7 via WhatsApp & Live Chat</p>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

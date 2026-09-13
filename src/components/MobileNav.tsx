import React from 'react';
import { Home, Grid, Heart, ShoppingBag, User } from 'lucide-react';
import { useShop, AppView } from '../context/ShopContext';

export const MobileNav: React.FC = () => {
  const { currentView, navigateTo, cart, wishlist } = useShop();

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const wishlistCount = wishlist.length;

  const items = [
    {
      id: 'home' as AppView,
      label: 'HOME',
      icon: Home,
    },
    {
      id: 'catalog' as AppView,
      label: 'CATEGORIES',
      icon: Grid,
    },
    {
      id: 'wishlist' as AppView,
      label: 'WISHLIST',
      icon: Heart,
      badge: wishlistCount,
    },
    {
      id: 'cart' as AppView,
      label: 'BAG',
      icon: ShoppingBag,
      badge: cartCount,
    },
    {
      id: 'account' as AppView,
      label: 'PROFILE',
      icon: User,
    },
  ];

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-neutral-200 py-2 px-3 safe-area-pb">
      <div className="grid grid-cols-5 items-center">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.id;
          return (
            <button
              key={item.label}
              onClick={() => navigateTo(item.id)}
              className={`flex flex-col items-center justify-center py-1 relative transition-colors ${
                isActive ? 'text-black' : 'text-neutral-500 hover:text-neutral-800'
              }`}
            >
              <div className="relative">
                <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5px]' : 'stroke-2'}`} />
                {item.badge !== undefined && item.badge > 0 && (
                  <span className="absolute -top-1.5 -right-2 min-w-[15px] h-[15px] px-1 bg-neutral-900 text-amber-300 rounded-full text-[9px] font-bold flex items-center justify-center">
                    {item.badge}
                  </span>
                )}
              </div>
              <span
                className={`text-[9px] tracking-wider mt-1 uppercase ${
                  isActive ? 'font-bold text-neutral-950' : 'font-medium'
                }`}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

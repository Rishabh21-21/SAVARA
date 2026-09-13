/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
import { ShopProvider, useShop } from './context/ShopContext';
import { Header } from './components/Header';
import { MobileNav } from './components/MobileNav';
import { Footer } from './components/Footer';
import { SearchModal } from './components/SearchModal';
import { QuickViewModal } from './components/QuickViewModal';
import { SizeGuideModal } from './components/SizeGuideModal';
import { CustomerSupportModal } from './components/CustomerSupportModal';

// Views
import { HomeView } from './views/HomeView';
import { CatalogView } from './views/CatalogView';
import { ProductDetailView } from './views/ProductDetailView';
import { BagView } from './views/BagView';
import { CheckoutView } from './views/CheckoutView';
import { AccountView } from './views/AccountView';
import { CollectionsView } from './views/CollectionsView';
import { AdminView } from './views/AdminView';

const MainLayout: React.FC = () => {
  const { currentView } = useShop();

  // Scroll to top on view change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentView]);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F6] text-neutral-900 font-sans selection:bg-neutral-950 selection:text-white">
      {/* Sticky Header with Announcement & Luxury Navigation */}
      <Header />

      {/* Main Content Area */}
      <main className="flex-1">
        {currentView === 'home' && <HomeView />}
        {currentView === 'catalog' && <CatalogView />}
        {currentView === 'product-detail' && <ProductDetailView />}
        {currentView === 'bag' && <BagView />}
        {currentView === 'checkout' && <CheckoutView />}
        {currentView === 'account' && <AccountView />}
        {currentView === 'collections' && <CollectionsView />}
        {currentView === 'admin' && <AdminView />}
      </main>

      {/* Comprehensive Atelier Footer */}
      <Footer />

      {/* Mobile App-Style Bottom Navigation Bar */}
      <MobileNav />

      {/* Overlays & Modals */}
      <SearchModal />
      <QuickViewModal />
      <SizeGuideModal />
      <CustomerSupportModal />
    </div>
  );
};

export default function App() {
  return (
    <ShopProvider>
      <MainLayout />
    </ShopProvider>
  );
}

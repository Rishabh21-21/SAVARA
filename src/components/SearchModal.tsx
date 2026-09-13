import React, { useState, useEffect, useRef } from 'react';
import { Search, X, TrendingUp, Clock, ArrowRight, Star } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { Product } from '../types';

export const SearchModal: React.FC = () => {
  const { isSearchOpen, setIsSearchOpen, products, navigateTo, setFilterState } = useShop();
  const [searchTerm, setSearchTerm] = useState('');
  const [recentSearches, setRecentSearches] = useState<string[]>([
    'Oversized T-shirt',
    'Black Hoodie',
    'Cargo Pants',
    'Summer Dress',
  ]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setSearchTerm('');
    }
  }, [isSearchOpen]);

  if (!isSearchOpen) return null;

  const popularSearches = [
    'Oversized Signature Tee',
    'Heavyweight 420 GSM Hoodie',
    'Urban Cargo Pants',
    'Co-ord Sets',
    'Luxe Overshirt',
    'Wide Leg Denim',
  ];

  const categorySuggestions = [
    { title: "Men's Oversized T-Shirts", gender: 'Men', cat: 'T-Shirts' },
    { title: "Women's Co-ord Sets", gender: 'Women', cat: 'Co-ord Sets' },
    { title: "Black Streetwear Collection", color: 'Black' },
    { title: "SAVARA Heavyweight Hoodies", cat: 'Hoodies' },
  ];

  // Filter products based on search term
  const filteredProducts: Product[] = searchTerm.trim()
    ? products
        .filter((p) => {
          const q = searchTerm.toLowerCase();
          return (
            p.name.toLowerCase().includes(q) ||
            p.category.toLowerCase().includes(q) ||
            p.brand.toLowerCase().includes(q) ||
            p.description.toLowerCase().includes(q) ||
            p.colors.some((c) => c.name.toLowerCase().includes(q))
          );
        })
        .slice(0, 6)
    : [];

  const handleExecuteSearch = (query: string) => {
    if (!query.trim()) return;
    if (!recentSearches.includes(query)) {
      setRecentSearches([query, ...recentSearches.slice(0, 4)]);
    }
    setFilterState((prev) => ({
      ...prev,
      searchQuery: query,
    }));
    setIsSearchOpen(false);
    navigateTo('catalog');
  };

  const handleSelectProduct = (product: Product) => {
    setIsSearchOpen(false);
    navigateTo('product-detail', { productId: product.id });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-8 sm:pt-16 px-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-2xl border border-neutral-200 overflow-hidden flex flex-col max-h-[85vh]">
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 p-4 border-b border-neutral-200 bg-white">
          <Search className="w-5 h-5 text-neutral-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleExecuteSearch(searchTerm);
              }
            }}
            placeholder="Search for products, brands and styles (e.g. black oversized t-shirt)..."
            className="flex-1 text-sm sm:text-base text-neutral-900 placeholder-neutral-400 focus:outline-none bg-transparent"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="text-neutral-400 hover:text-neutral-600 p-1"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={() => setIsSearchOpen(false)}
            className="text-xs font-semibold px-2.5 py-1 text-neutral-600 hover:text-black bg-neutral-100 rounded-md"
          >
            ESC
          </button>
        </div>

        {/* Search Content */}
        <div className="overflow-y-auto p-5 space-y-6 divide-y divide-neutral-100">
          {/* Live Product Results if typing */}
          {searchTerm.trim() ? (
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-neutral-900">
                  Products matching &ldquo;{searchTerm}&rdquo; ({filteredProducts.length})
                </span>
                <button
                  onClick={() => handleExecuteSearch(searchTerm)}
                  className="text-xs text-neutral-900 font-semibold hover:underline flex items-center gap-1"
                >
                  View all in catalog <ArrowRight className="w-3 h-3" />
                </button>
              </div>

              {filteredProducts.length === 0 ? (
                <div className="py-8 text-center text-neutral-500">
                  <p className="text-sm">No exact products found for &ldquo;{searchTerm}&rdquo;</p>
                  <p className="text-xs text-neutral-400 mt-1">
                    Try searching for &quot;T-Shirt&quot;, &quot;Hoodie&quot;, &quot;Cargo&quot;, or &quot;Dress&quot;.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {filteredProducts.map((p) => (
                    <div
                      key={p.id}
                      onClick={() => handleSelectProduct(p)}
                      className="flex gap-3 p-2.5 rounded-xl border border-neutral-100 hover:border-neutral-300 hover:bg-neutral-50 transition-all cursor-pointer group"
                    >
                      <img
                        src={p.images[0]}
                        alt={p.name}
                        className="w-16 h-20 object-cover rounded-lg shrink-0 group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="flex flex-col justify-between py-0.5 min-w-0">
                        <div>
                          <span className="text-[10px] tracking-wider text-neutral-400 uppercase block font-semibold">
                            {p.brand}
                          </span>
                          <p className="text-xs font-semibold text-neutral-900 truncate group-hover:text-black">
                            {p.name}
                          </p>
                          <div className="flex items-center gap-1 mt-0.5 text-[11px] text-amber-600">
                            <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                            <span>{p.rating}</span>
                            <span className="text-neutral-400 text-[10px]">
                              ({p.reviewCount})
                            </span>
                          </div>
                        </div>
                        <div className="flex items-baseline gap-2">
                          <span className="text-xs font-bold text-neutral-950">₹{p.price}</span>
                          <span className="text-[10px] text-neutral-400 line-through">
                            ₹{p.originalPrice}
                          </span>
                          <span className="text-[10px] text-emerald-600 font-bold">
                            {p.discountPercent}% OFF
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <>
              {/* Recent Searches */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-neutral-400 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" /> Recent Searches
                  </span>
                  <button
                    onClick={() => setRecentSearches([])}
                    className="text-[10px] text-neutral-400 hover:text-neutral-700"
                  >
                    Clear
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {recentSearches.map((s) => (
                    <button
                      key={s}
                      onClick={() => handleExecuteSearch(s)}
                      className="px-3 py-1.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 text-xs rounded-full transition-colors cursor-pointer"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Popular Searches */}
              <div className="pt-4">
                <span className="text-xs font-bold uppercase tracking-wider text-neutral-400 flex items-center gap-1.5 mb-2">
                  <TrendingUp className="w-3.5 h-3.5 text-amber-500" /> Trending Searches
                </span>
                <div className="flex flex-wrap gap-2">
                  {popularSearches.map((term) => (
                    <button
                      key={term}
                      onClick={() => handleExecuteSearch(term)}
                      className="px-3 py-1.5 border border-neutral-200 hover:border-neutral-900 text-neutral-800 text-xs rounded-full transition-colors cursor-pointer flex items-center gap-1"
                    >
                      <span>{term}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Curated Category Shortcuts */}
              <div className="pt-4">
                <span className="text-xs font-bold uppercase tracking-wider text-neutral-400 block mb-2">
                  Explore Curated Categories
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {categorySuggestions.map((cat, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setIsSearchOpen(false);
                        navigateTo('catalog', {
                          filterUpdates: {
                            gender: cat.gender ? [cat.gender] : [],
                            categories: cat.cat ? [cat.cat] : [],
                            colors: cat.color ? [cat.color] : [],
                          },
                        });
                      }}
                      className="p-3 text-left border border-neutral-100 rounded-xl hover:border-neutral-900 hover:bg-neutral-50 transition-all flex items-center justify-between text-xs font-medium text-neutral-800"
                    >
                      <span>{cat.title}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-neutral-400" />
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

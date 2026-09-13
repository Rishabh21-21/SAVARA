import React, { useState, useMemo } from 'react';
import {
  SlidersHorizontal,
  X,
  ChevronDown,
  ChevronUp,
  Star,
  Check,
  RotateCcw,
  Grid3X3,
  LayoutGrid,
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { ProductCard } from '../components/ProductCard';
import { Product } from '../types';

export const CatalogView: React.FC = () => {
  const { products, filterState, setFilterState, updateFilter, resetFilters } = useShop();

  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  const [gridCols, setGridCols] = useState<3 | 4>(4);

  // Accordion collapsed states for filter sections
  const [openSections, setOpenSections] = useState({
    gender: true,
    categories: true,
    price: true,
    size: true,
    color: true,
    brand: true,
    rating: true,
    discount: true,
  });

  const toggleSection = (key: keyof typeof openSections) => {
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // Static options
  const genderOptions = ['Men', 'Women', 'Unisex'];
  const categoryOptions = [
    'T-Shirts',
    'Shirts',
    'Hoodies',
    'Sweatshirts',
    'Jeans',
    'Cargo Pants',
    'Trousers',
    'Jackets',
    'Co-ord Sets',
    'Dresses',
    'Tops',
    'Accessories',
  ];
  const brandOptions = ['SAVARA', 'SAVARA Atelier', 'SAVARA Black Label'];
  const priceRanges = [
    { label: 'Under ₹999', min: 0, max: 999 },
    { label: '₹999–₹1,499', min: 999, max: 1499 },
    { label: '₹1,499–₹2,499', min: 1499, max: 2499 },
    { label: '₹2,499–₹4,999', min: 2499, max: 4999 },
    { label: '₹5,000+', min: 5000, max: 99999 },
  ];
  const sizeOptions = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'One Size'];
  const colorOptions = [
    { name: 'Black', hex: '#18181B' },
    { name: 'White', hex: '#FFFFFF' },
    { name: 'Beige', hex: '#D7C4B7' },
    { name: 'Grey', hex: '#9CA3AF' },
    { name: 'Brown', hex: '#5C4033' },
    { name: 'Blue', hex: '#2563EB' },
    { name: 'Green', hex: '#4B5320' },
  ];
  const discountOptions = [
    { label: '10%+ OFF', value: 10 },
    { label: '20%+ OFF', value: 20 },
    { label: '30%+ OFF', value: 30 },
    { label: '50%+ OFF', value: 50 },
  ];

  // Checkbox toggle helpers
  const handleToggleArrayFilter = (field: 'gender' | 'categories' | 'brands' | 'priceRange' | 'sizes' | 'colors', value: string) => {
    const current = filterState[field];
    const exists = current.includes(value);
    const updated = exists ? current.filter((v) => v !== value) : [...current, value];
    updateFilter(field, updated);
  };

  // Dynamic Filtering Logic
  const filteredProducts = useMemo(() => {
    return products.filter((item: Product) => {
      // Search query
      if (filterState.searchQuery.trim()) {
        const q = filterState.searchQuery.toLowerCase();
        const match =
          item.name.toLowerCase().includes(q) ||
          item.category.toLowerCase().includes(q) ||
          item.brand.toLowerCase().includes(q) ||
          item.description.toLowerCase().includes(q) ||
          (item.collectionName && item.collectionName.toLowerCase().includes(q)) ||
          item.colors.some((c) => c.name.toLowerCase().includes(q));
        if (!match) return false;
      }

      // Gender
      if (filterState.gender.length > 0) {
        if (!filterState.gender.includes(item.gender) && item.gender !== 'Unisex') {
          return false;
        }
      }

      // Categories
      if (filterState.categories.length > 0) {
        if (!filterState.categories.includes(item.category)) return false;
      }

      // Brands
      if (filterState.brands.length > 0) {
        if (!filterState.brands.includes(item.brand)) return false;
      }

      // Sizes
      if (filterState.sizes.length > 0) {
        const hasSize = filterState.sizes.some((sz) => item.sizes.includes(sz));
        if (!hasSize) return false;
      }

      // Colors
      if (filterState.colors.length > 0) {
        const hasColor = filterState.colors.some((col) =>
          item.colors.some((c) => c.name.toLowerCase().includes(col.toLowerCase()))
        );
        if (!hasColor) return false;
      }

      // Price Ranges
      if (filterState.priceRange.length > 0) {
        const matchPrice = filterState.priceRange.some((rangeLabel) => {
          const found = priceRanges.find((r) => r.label === rangeLabel);
          if (!found) return false;
          return item.price >= found.min && item.price <= found.max;
        });
        if (!matchPrice) return false;
      }

      // Rating
      if (filterState.rating !== null) {
        if (item.rating < filterState.rating) return false;
      }

      // Discount
      if (filterState.discount !== null) {
        if (item.discountPercent < filterState.discount) return false;
      }

      return true;
    });
  }, [products, filterState]);

  // Sorting
  const sortedProducts = useMemo(() => {
    const list = [...filteredProducts];
    switch (filterState.sortBy) {
      case 'newest':
        return list.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
      case 'popularity':
        return list.sort((a, b) => b.reviewCount - a.reviewCount);
      case 'price-asc':
        return list.sort((a, b) => a.price - b.price);
      case 'price-desc':
        return list.sort((a, b) => b.price - a.price);
      case 'rating':
        return list.sort((a, b) => b.rating - a.rating);
      case 'discount':
        return list.sort((a, b) => b.discountPercent - a.discountPercent);
      case 'recommended':
      default:
        return list.sort((a, b) => (b.isBestseller ? 1 : 0) - (a.isBestseller ? 1 : 0));
    }
  }, [filteredProducts, filterState.sortBy]);

  // Active filters count
  const activeFiltersCount =
    filterState.gender.length +
    filterState.categories.length +
    filterState.brands.length +
    filterState.priceRange.length +
    filterState.sizes.length +
    filterState.colors.length +
    (filterState.rating ? 1 : 0) +
    (filterState.discount ? 1 : 0) +
    (filterState.searchQuery ? 1 : 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Top Header & Breadcrumb */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-neutral-200">
        <div>
          <div className="flex items-center gap-2 text-xs text-neutral-400 mb-1">
            <span>SAVARA</span>
            <span>/</span>
            <span>CATALOG</span>
            {filterState.gender.length > 0 && (
              <>
                <span>/</span>
                <span className="text-neutral-700 font-medium">
                  {filterState.gender.join(', ')}
                </span>
              </>
            )}
            {filterState.categories.length > 0 && (
              <>
                <span>/</span>
                <span className="text-neutral-700 font-medium">
                  {filterState.categories.join(', ')}
                </span>
              </>
            )}
          </div>
          <h1 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-neutral-950">
            {filterState.searchQuery ? `Results for "${filterState.searchQuery}"` : 'SAVARA ATELIER CATALOG'}
          </h1>
          <p className="text-xs text-neutral-500 mt-0.5">
            Showing <strong>{sortedProducts.length}</strong> distinctive contemporary luxury pieces
          </p>
        </div>

        {/* Sorting & Layout controls */}
        <div className="flex items-center gap-3 self-start md:self-auto">
          {/* Mobile Filter Button */}
          <button
            onClick={() => setIsMobileFiltersOpen(true)}
            className="lg:hidden flex items-center gap-2 px-3.5 py-2 bg-neutral-900 text-white rounded-lg text-xs font-semibold"
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span>Filters {activeFiltersCount > 0 && `(${activeFiltersCount})`}</span>
          </button>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2 text-xs">
            <span className="text-neutral-500 hidden sm:inline font-medium">Sort by:</span>
            <select
              value={filterState.sortBy}
              onChange={(e) => updateFilter('sortBy', e.target.value as any)}
              className="bg-white border border-neutral-300 rounded-lg px-3 py-2 text-xs font-semibold text-neutral-800 focus:outline-none focus:border-neutral-900 cursor-pointer"
            >
              <option value="recommended">Recommended</option>
              <option value="newest">What&apos;s New</option>
              <option value="popularity">Popularity</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Customer Rating</option>
              <option value="discount">Highest Discount</option>
            </select>
          </div>

          {/* Desktop Grid Switch */}
          <div className="hidden sm:flex items-center border border-neutral-300 rounded-lg overflow-hidden">
            <button
              onClick={() => setGridCols(3)}
              className={`p-1.5 transition-colors ${
                gridCols === 3 ? 'bg-neutral-900 text-white' : 'bg-white text-neutral-600'
              }`}
              title="3 Columns"
            >
              <Grid3X3 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setGridCols(4)}
              className={`p-1.5 transition-colors ${
                gridCols === 4 ? 'bg-neutral-900 text-white' : 'bg-white text-neutral-600'
              }`}
              title="4 Columns"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Active Filter Badges Strip */}
      {activeFiltersCount > 0 && (
        <div className="flex flex-wrap items-center gap-2 py-4 border-b border-neutral-100">
          <span className="text-xs text-neutral-400 font-medium">Applied Filters:</span>

          {filterState.searchQuery && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-neutral-100 text-neutral-900 text-xs rounded-full">
              <span>Search: &ldquo;{filterState.searchQuery}&rdquo;</span>
              <button
                onClick={() => updateFilter('searchQuery', '')}
                className="hover:text-black cursor-pointer"
              >
                ✕
              </button>
            </span>
          )}

          {filterState.gender.map((g) => (
            <span
              key={g}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-neutral-100 text-neutral-900 text-xs rounded-full"
            >
              <span>{g}</span>
              <button
                onClick={() => handleToggleArrayFilter('gender', g)}
                className="hover:text-black cursor-pointer"
              >
                ✕
              </button>
            </span>
          ))}

          {filterState.categories.map((c) => (
            <span
              key={c}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-neutral-100 text-neutral-900 text-xs rounded-full"
            >
              <span>{c}</span>
              <button
                onClick={() => handleToggleArrayFilter('categories', c)}
                className="hover:text-black cursor-pointer"
              >
                ✕
              </button>
            </span>
          ))}

          {filterState.brands.map((b) => (
            <span
              key={b}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-neutral-100 text-neutral-900 text-xs rounded-full"
            >
              <span>{b}</span>
              <button
                onClick={() => handleToggleArrayFilter('brands', b)}
                className="hover:text-black cursor-pointer"
              >
                ✕
              </button>
            </span>
          ))}

          {filterState.priceRange.map((p) => (
            <span
              key={p}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-neutral-100 text-neutral-900 text-xs rounded-full"
            >
              <span>{p}</span>
              <button
                onClick={() => handleToggleArrayFilter('priceRange', p)}
                className="hover:text-black cursor-pointer"
              >
                ✕
              </button>
            </span>
          ))}

          {filterState.sizes.map((s) => (
            <span
              key={s}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-neutral-100 text-neutral-900 text-xs rounded-full"
            >
              <span>Size {s}</span>
              <button
                onClick={() => handleToggleArrayFilter('sizes', s)}
                className="hover:text-black cursor-pointer"
              >
                ✕
              </button>
            </span>
          ))}

          {filterState.colors.map((col) => (
            <span
              key={col}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-neutral-100 text-neutral-900 text-xs rounded-full"
            >
              <span>{col}</span>
              <button
                onClick={() => handleToggleArrayFilter('colors', col)}
                className="hover:text-black cursor-pointer"
              >
                ✕
              </button>
            </span>
          ))}

          {filterState.rating && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-neutral-100 text-neutral-900 text-xs rounded-full">
              <span>{filterState.rating}★ & Above</span>
              <button
                onClick={() => updateFilter('rating', null)}
                className="hover:text-black cursor-pointer"
              >
                ✕
              </button>
            </span>
          )}

          {filterState.discount && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-neutral-100 text-neutral-900 text-xs rounded-full">
              <span>{filterState.discount}%+ Discount</span>
              <button
                onClick={() => updateFilter('discount', null)}
                className="hover:text-black cursor-pointer"
              >
                ✕
              </button>
            </span>
          )}

          <button
            onClick={resetFilters}
            className="text-xs text-rose-600 hover:text-rose-800 font-semibold underline ml-2 cursor-pointer"
          >
            Clear All
          </button>
        </div>
      )}

      {/* Main Catalog Layout */}
      <div className="flex gap-8 mt-6">
        {/* Desktop Filter Sidebar */}
        <aside className="hidden lg:block w-64 shrink-0 space-y-6 select-none">
          <div className="flex items-center justify-between pb-3 border-b border-neutral-200">
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-900 flex items-center gap-2">
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Filters</span>
            </span>
            {activeFiltersCount > 0 && (
              <button
                onClick={resetFilters}
                className="text-[11px] text-neutral-500 hover:text-neutral-900 font-medium"
              >
                Reset
              </button>
            )}
          </div>

          {/* 1. GENDER FILTER */}
          <div className="border-b border-neutral-100 pb-4">
            <button
              onClick={() => toggleSection('gender')}
              className="w-full flex items-center justify-between text-xs font-bold text-neutral-900 uppercase tracking-wider mb-2.5 cursor-pointer"
            >
              <span>Gender</span>
              {openSections.gender ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>
            {openSections.gender && (
              <div className="space-y-2">
                {genderOptions.map((g) => {
                  const checked = filterState.gender.includes(g);
                  return (
                    <label
                      key={g}
                      onClick={() => handleToggleArrayFilter('gender', g)}
                      className="flex items-center gap-2 text-xs text-neutral-700 hover:text-black cursor-pointer"
                    >
                      <div
                        className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${
                          checked ? 'bg-neutral-950 border-neutral-950 text-white' : 'border-neutral-300 bg-white'
                        }`}
                      >
                        {checked && <Check className="w-3 h-3" />}
                      </div>
                      <span>{g}</span>
                    </label>
                  );
                })}
              </div>
            )}
          </div>

          {/* 2. CATEGORIES FILTER */}
          <div className="border-b border-neutral-100 pb-4">
            <button
              onClick={() => toggleSection('categories')}
              className="w-full flex items-center justify-between text-xs font-bold text-neutral-900 uppercase tracking-wider mb-2.5 cursor-pointer"
            >
              <span>Category</span>
              {openSections.categories ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>
            {openSections.categories && (
              <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                {categoryOptions.map((c) => {
                  const checked = filterState.categories.includes(c);
                  return (
                    <label
                      key={c}
                      onClick={() => handleToggleArrayFilter('categories', c)}
                      className="flex items-center gap-2 text-xs text-neutral-700 hover:text-black cursor-pointer"
                    >
                      <div
                        className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${
                          checked ? 'bg-neutral-950 border-neutral-950 text-white' : 'border-neutral-300 bg-white'
                        }`}
                      >
                        {checked && <Check className="w-3 h-3" />}
                      </div>
                      <span>{c}</span>
                    </label>
                  );
                })}
              </div>
            )}
          </div>

          {/* 3. BRAND FILTER */}
          <div className="border-b border-neutral-100 pb-4">
            <button
              onClick={() => toggleSection('brand')}
              className="w-full flex items-center justify-between text-xs font-bold text-neutral-900 uppercase tracking-wider mb-2.5 cursor-pointer"
            >
              <span>Brand Line</span>
              {openSections.brand ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>
            {openSections.brand && (
              <div className="space-y-2">
                {brandOptions.map((b) => {
                  const checked = filterState.brands.includes(b);
                  return (
                    <label
                      key={b}
                      onClick={() => handleToggleArrayFilter('brands', b)}
                      className="flex items-center gap-2 text-xs text-neutral-700 hover:text-black cursor-pointer"
                    >
                      <div
                        className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${
                          checked ? 'bg-neutral-950 border-neutral-950 text-white' : 'border-neutral-300 bg-white'
                        }`}
                      >
                        {checked && <Check className="w-3 h-3" />}
                      </div>
                      <span>{b}</span>
                    </label>
                  );
                })}
              </div>
            )}
          </div>

          {/* 4. PRICE RANGE */}
          <div className="border-b border-neutral-100 pb-4">
            <button
              onClick={() => toggleSection('price')}
              className="w-full flex items-center justify-between text-xs font-bold text-neutral-900 uppercase tracking-wider mb-2.5 cursor-pointer"
            >
              <span>Price</span>
              {openSections.price ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>
            {openSections.price && (
              <div className="space-y-2">
                {priceRanges.map((p) => {
                  const checked = filterState.priceRange.includes(p.label);
                  return (
                    <label
                      key={p.label}
                      onClick={() => handleToggleArrayFilter('priceRange', p.label)}
                      className="flex items-center gap-2 text-xs text-neutral-700 hover:text-black cursor-pointer"
                    >
                      <div
                        className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${
                          checked ? 'bg-neutral-950 border-neutral-950 text-white' : 'border-neutral-300 bg-white'
                        }`}
                      >
                        {checked && <Check className="w-3 h-3" />}
                      </div>
                      <span>{p.label}</span>
                    </label>
                  );
                })}
              </div>
            )}
          </div>

          {/* 5. SIZES */}
          <div className="border-b border-neutral-100 pb-4">
            <button
              onClick={() => toggleSection('size')}
              className="w-full flex items-center justify-between text-xs font-bold text-neutral-900 uppercase tracking-wider mb-2.5 cursor-pointer"
            >
              <span>Size</span>
              {openSections.size ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>
            {openSections.size && (
              <div className="grid grid-cols-3 gap-2">
                {sizeOptions.map((s) => {
                  const selected = filterState.sizes.includes(s);
                  return (
                    <button
                      key={s}
                      onClick={() => handleToggleArrayFilter('sizes', s)}
                      className={`py-1.5 text-xs font-semibold rounded-lg border transition-all cursor-pointer ${
                        selected
                          ? 'bg-neutral-950 text-white border-neutral-950'
                          : 'bg-white text-neutral-700 border-neutral-200 hover:border-neutral-400'
                      }`}
                    >
                      {s}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* 6. COLORS */}
          <div className="border-b border-neutral-100 pb-4">
            <button
              onClick={() => toggleSection('color')}
              className="w-full flex items-center justify-between text-xs font-bold text-neutral-900 uppercase tracking-wider mb-2.5 cursor-pointer"
            >
              <span>Color</span>
              {openSections.color ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>
            {openSections.color && (
              <div className="flex flex-wrap gap-2">
                {colorOptions.map((c) => {
                  const selected = filterState.colors.includes(c.name);
                  return (
                    <button
                      key={c.name}
                      onClick={() => handleToggleArrayFilter('colors', c.name)}
                      className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs border transition-all cursor-pointer ${
                        selected
                          ? 'border-neutral-950 bg-neutral-950 text-white'
                          : 'border-neutral-200 bg-white text-neutral-700 hover:border-neutral-400'
                      }`}
                    >
                      <span
                        className="w-2.5 h-2.5 rounded-full border border-neutral-300"
                        style={{ backgroundColor: c.hex }}
                      />
                      <span>{c.name}</span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* 7. RATING */}
          <div className="border-b border-neutral-100 pb-4">
            <button
              onClick={() => toggleSection('rating')}
              className="w-full flex items-center justify-between text-xs font-bold text-neutral-900 uppercase tracking-wider mb-2.5 cursor-pointer"
            >
              <span>Customer Rating</span>
              {openSections.rating ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>
            {openSections.rating && (
              <div className="space-y-2">
                {[4, 3].map((r) => {
                  const checked = filterState.rating === r;
                  return (
                    <label
                      key={r}
                      onClick={() => updateFilter('rating', checked ? null : r)}
                      className="flex items-center gap-2 text-xs text-neutral-700 hover:text-black cursor-pointer"
                    >
                      <div
                        className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors ${
                          checked ? 'bg-neutral-950 border-neutral-950 text-white' : 'border-neutral-300'
                        }`}
                      >
                        {checked && <div className="w-1.5 h-1.5 bg-white rounded-full"></div>}
                      </div>
                      <div className="flex items-center gap-1">
                        <span>{r}★ & above</span>
                      </div>
                    </label>
                  );
                })}
              </div>
            )}
          </div>

          {/* 8. DISCOUNT */}
          <div>
            <button
              onClick={() => toggleSection('discount')}
              className="w-full flex items-center justify-between text-xs font-bold text-neutral-900 uppercase tracking-wider mb-2.5 cursor-pointer"
            >
              <span>Discount</span>
              {openSections.discount ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>
            {openSections.discount && (
              <div className="space-y-2">
                {discountOptions.map((d) => {
                  const checked = filterState.discount === d.value;
                  return (
                    <label
                      key={d.value}
                      onClick={() => updateFilter('discount', checked ? null : d.value)}
                      className="flex items-center gap-2 text-xs text-neutral-700 hover:text-black cursor-pointer"
                    >
                      <div
                        className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors ${
                          checked ? 'bg-neutral-950 border-neutral-950 text-white' : 'border-neutral-300'
                        }`}
                      >
                        {checked && <div className="w-1.5 h-1.5 bg-white rounded-full"></div>}
                      </div>
                      <span>{d.label}</span>
                    </label>
                  );
                })}
              </div>
            )}
          </div>
        </aside>

        {/* Product Grid Area */}
        <div className="flex-1">
          {sortedProducts.length === 0 ? (
            <div className="py-20 text-center bg-white rounded-2xl border border-neutral-200 p-8 space-y-4">
              <div className="w-16 h-16 rounded-full bg-neutral-100 flex items-center justify-center mx-auto text-neutral-400">
                <SlidersHorizontal className="w-8 h-8" />
              </div>
              <h3 className="font-serif-luxury text-xl font-bold text-neutral-900">
                No matching garments found
              </h3>
              <p className="text-xs text-neutral-500 max-w-md mx-auto leading-relaxed">
                We couldn&apos;t find any products matching your specific combination of filters. Try clearing some selections or searching for generic terms.
              </p>
              <button
                onClick={resetFilters}
                className="px-6 py-2.5 bg-neutral-950 text-white text-xs font-bold rounded-xl hover:bg-black transition-colors"
              >
                CLEAR ALL FILTERS
              </button>
            </div>
          ) : (
            <div
              className={`grid grid-cols-2 ${
                gridCols === 3
                  ? 'sm:grid-cols-2 md:grid-cols-3 gap-5'
                  : 'sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'
              }`}
            >
              {sortedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Mobile Filters Slide-up Sheet */}
      {isMobileFiltersOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex flex-col justify-end bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white w-full rounded-t-3xl max-h-[85vh] flex flex-col shadow-2xl overflow-hidden">
            <div className="p-4 border-b border-neutral-200 flex items-center justify-between">
              <span className="text-sm font-bold uppercase tracking-wider text-neutral-900">
                Filters ({activeFiltersCount})
              </span>
              <div className="flex items-center gap-3">
                <button
                  onClick={resetFilters}
                  className="text-xs text-neutral-500 hover:text-black font-medium"
                >
                  Reset
                </button>
                <button
                  onClick={() => setIsMobileFiltersOpen(false)}
                  className="p-1 text-neutral-500 hover:text-black"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="p-5 overflow-y-auto space-y-6">
              {/* Mobile Gender */}
              <div>
                <p className="text-xs font-bold uppercase text-neutral-900 mb-2">Gender</p>
                <div className="flex gap-2">
                  {genderOptions.map((g) => (
                    <button
                      key={g}
                      onClick={() => handleToggleArrayFilter('gender', g)}
                      className={`px-4 py-2 rounded-xl text-xs font-semibold border ${
                        filterState.gender.includes(g)
                          ? 'bg-neutral-950 text-white border-neutral-950'
                          : 'border-neutral-200 text-neutral-700'
                      }`}
                    >
                      {g}
                    </button>
                  ))}
                </div>
              </div>

              {/* Mobile Categories */}
              <div>
                <p className="text-xs font-bold uppercase text-neutral-900 mb-2">Category</p>
                <div className="flex flex-wrap gap-2">
                  {categoryOptions.map((c) => (
                    <button
                      key={c}
                      onClick={() => handleToggleArrayFilter('categories', c)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium border ${
                        filterState.categories.includes(c)
                          ? 'bg-neutral-950 text-white border-neutral-950'
                          : 'border-neutral-200 text-neutral-700'
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              {/* Mobile Price */}
              <div>
                <p className="text-xs font-bold uppercase text-neutral-900 mb-2">Price</p>
                <div className="flex flex-wrap gap-2">
                  {priceRanges.map((p) => (
                    <button
                      key={p.label}
                      onClick={() => handleToggleArrayFilter('priceRange', p.label)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium border ${
                        filterState.priceRange.includes(p.label)
                          ? 'bg-neutral-950 text-white border-neutral-950'
                          : 'border-neutral-200 text-neutral-700'
                      }`}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-4 border-t border-neutral-200 bg-white">
              <button
                onClick={() => setIsMobileFiltersOpen(false)}
                className="w-full py-3.5 bg-neutral-950 text-white text-xs font-bold rounded-xl uppercase tracking-widest cursor-pointer"
              >
                APPLY FILTERS ({sortedProducts.length} ITEMS)
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

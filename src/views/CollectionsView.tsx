import React, { useState } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { EDITORIAL_COLLECTIONS } from '../data/mockData';
import { ProductCard } from '../components/ProductCard';

export const CollectionsView: React.FC = () => {
  const { products, navigateTo } = useShop();
  const [selectedCollectionId, setSelectedCollectionId] = useState<string | null>(null);

  const activeCollection = EDITORIAL_COLLECTIONS.find((c) => c.id === selectedCollectionId);

  // If a collection is selected, filter products for it
  const collectionProducts = selectedCollectionId
    ? products.filter(
        (p) =>
          p.collectionName?.toLowerCase() === activeCollection?.name.toLowerCase() ||
          p.category.toLowerCase().includes('t-shirt') ||
          p.isBestseller
      ).slice(0, 8)
    : [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-neutral-100 rounded-full text-neutral-800 text-xs font-bold uppercase tracking-widest">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span>EDITORIAL ARCHIVES</span>
        </div>
        <h1 className="font-serif-luxury text-3xl sm:text-5xl font-bold tracking-tight text-neutral-950">
          SAVARA ATELIER CAPSULES
        </h1>
        <p className="text-xs sm:text-sm text-neutral-500">
          Curated conceptual drops defined by specific silhouettes, weights, and monochromatic palettes.
        </p>
      </div>

      {/* Detail View if Selected */}
      {activeCollection ? (
        <div className="space-y-8 animate-fade-in">
          <div className="relative rounded-3xl overflow-hidden aspect-[21/9] min-h-[260px] bg-neutral-950 text-white flex items-end p-6 sm:p-12">
            <img
              src={activeCollection.image}
              alt={activeCollection.name}
              className="absolute inset-0 w-full h-full object-cover opacity-60"
            />
            <div className="relative z-10 space-y-2 max-w-xl">
              <button
                onClick={() => setSelectedCollectionId(null)}
                className="text-xs text-amber-300 hover:underline mb-2 block font-medium"
              >
                ← Back to All Collections
              </button>
              <h2 className="font-serif-luxury text-2xl sm:text-4xl font-bold text-white tracking-wide">
                {activeCollection.name}
              </h2>
              <p className="text-xs sm:text-sm text-neutral-200">{activeCollection.tagline}</p>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <h3 className="font-serif-luxury text-xl font-bold text-neutral-950">
              Curated Pieces ({collectionProducts.length})
            </h3>
            <button
              onClick={() => navigateTo('catalog', { filterUpdates: { searchQuery: activeCollection.name } })}
              className="text-xs font-bold uppercase text-neutral-900 underline"
            >
              Open in Filterable Catalog →
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {collectionProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      ) : (
        /* Collections Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {EDITORIAL_COLLECTIONS.map((col) => (
            <div
              key={col.id}
              onClick={() => setSelectedCollectionId(col.id)}
              className="group relative rounded-3xl overflow-hidden aspect-[3/4] cursor-pointer shadow-md hover:shadow-2xl transition-all duration-500 bg-neutral-900"
            >
              <img
                src={col.image}
                alt={col.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent flex flex-col justify-end p-8">
                <span className="text-[10px] font-bold tracking-[0.25em] text-amber-400 uppercase mb-1">
                  {col.itemCount}
                </span>
                <h3 className="font-serif-luxury text-2xl font-bold text-white tracking-wider">
                  {col.name}
                </h3>
                <p className="text-xs text-neutral-300 mt-1 line-clamp-2">{col.tagline}</p>

                <div className="mt-5 flex items-center gap-2 text-xs font-bold text-white uppercase tracking-widest group-hover:text-amber-300 transition-colors">
                  <span>EXPLORE CAPSULE</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

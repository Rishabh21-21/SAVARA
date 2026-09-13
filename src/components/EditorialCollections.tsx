import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { EDITORIAL_COLLECTIONS } from '../data/mockData';

export const EditorialCollections: React.FC = () => {
  const { navigateTo } = useShop();

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
        <div>
          <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.2em] text-neutral-400 mb-1">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>SEASONAL EDITORIAL DROPS</span>
          </div>
          <h2 className="font-serif-luxury text-2xl sm:text-4xl font-bold tracking-tight text-neutral-950">
            CURATED COLLECTIONS
          </h2>
        </div>
        <button
          onClick={() => navigateTo('collections')}
          className="text-xs font-bold tracking-widest uppercase text-neutral-900 hover:text-black flex items-center gap-1.5 cursor-pointer group"
        >
          <span>EXPLORE ALL ARCHIVES</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {EDITORIAL_COLLECTIONS.map((col) => (
          <div
            key={col.id}
            onClick={() => navigateTo('catalog', { filterUpdates: { searchQuery: col.name } })}
            className="group relative aspect-[4/5] rounded-2xl overflow-hidden cursor-pointer shadow-sm hover:shadow-2xl transition-all duration-500"
          >
            <img
              src={col.image}
              alt={col.name}
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent flex flex-col justify-end p-6">
              <span className="text-[10px] font-bold tracking-[0.25em] text-amber-300 uppercase mb-1">
                {col.itemCount}
              </span>
              <h3 className="font-serif-luxury text-xl sm:text-2xl font-bold text-white tracking-wider">
                {col.name}
              </h3>
              <p className="text-xs text-neutral-300 mt-1 line-clamp-2">
                {col.tagline}
              </p>
              <div className="mt-4 flex items-center gap-1 text-xs font-bold tracking-wider text-white uppercase group-hover:text-amber-300 transition-colors">
                <span>SHOP CAPSULE</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

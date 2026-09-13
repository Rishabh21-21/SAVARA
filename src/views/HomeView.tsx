import React from 'react';
import { ArrowRight, Sparkles, ShieldCheck, Truck, ChevronRight, Zap } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { ProductCard } from '../components/ProductCard';
import { FlashSaleBanner } from '../components/FlashSaleBanner';
import { EditorialCollections } from '../components/EditorialCollections';

export const HomeView: React.FC = () => {
  const { products, navigateTo } = useShop();

  const menCategories = [
    { name: 'T-Shirts', img: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=500&q=80' },
    { name: 'Shirts', img: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=500&q=80' },
    { name: 'Hoodies', img: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=500&q=80' },
    { name: 'Cargo Pants', img: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=500&q=80' },
    { name: 'Jackets', img: 'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=500&q=80' },
    { name: 'Co-ord Sets', img: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=500&q=80' },
  ];

  const womenCategories = [
    { name: 'Tops', img: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=500&q=80' },
    { name: 'Dresses', img: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=500&q=80' },
    { name: 'Shirts', img: 'https://images.unsplash.com/photo-1598554747436-c9293d6a588f?auto=format&fit=crop&w=500&q=80' },
    { name: 'Co-ord Sets', img: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=500&q=80' },
    { name: 'Jeans', img: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=500&q=80' },
    { name: 'Jackets', img: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=500&q=80' },
  ];

  const bestsellers = products.filter((p) => p.isBestseller).slice(0, 4);
  const trending = products.filter((p) => p.isTrending || p.isNew).slice(0, 4);

  return (
    <div className="space-y-12 sm:space-y-20 pb-16">
      {/* 1. HERO SECTION */}
      <section className="relative w-full min-h-[85vh] lg:min-h-[92vh] flex items-center justify-center overflow-hidden bg-neutral-950 text-white">
        {/* Editorial Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=2000&q=85"
            alt="SAVARA Haute Couture Campaign"
            className="w-full h-full object-cover object-center opacity-65 scale-100 hover:scale-105 transition-transform duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-black/40 to-neutral-950/60"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-neutral-200 text-xs font-semibold tracking-widest uppercase mb-6 animate-fade-in">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>AUTUMN / WINTER 2026 CAMPAIGN</span>
          </div>

          <h1 className="font-serif-luxury text-5xl sm:text-7xl lg:text-8xl font-black tracking-[0.18em] text-white uppercase drop-shadow-lg leading-tight">
            SAVARA
          </h1>

          <p className="font-editorial italic text-2xl sm:text-3xl lg:text-4xl text-amber-200/90 font-light mt-2 tracking-wide">
            Wear Your Statement.
          </p>

          <p className="text-sm sm:text-base text-neutral-200 mt-6 max-w-xl font-normal leading-relaxed">
            Premium fashion designed for the way you move, live and stand out. Heavyweight cottons, bespoke tailoring, and contemporary silhouettes.
          </p>

          {/* Hero Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <button
              onClick={() => navigateTo('catalog', { filterUpdates: { gender: ['Men'] } })}
              className="w-full sm:w-48 py-4 px-6 bg-white text-neutral-950 hover:bg-neutral-100 text-xs font-bold tracking-[0.16em] uppercase rounded-xl shadow-xl transition-all hover:scale-105 cursor-pointer text-center"
            >
              SHOP MEN
            </button>
            <button
              onClick={() => navigateTo('catalog', { filterUpdates: { gender: ['Women'] } })}
              className="w-full sm:w-48 py-4 px-6 bg-neutral-900/80 backdrop-blur-md hover:bg-black text-white text-xs font-bold tracking-[0.16em] uppercase rounded-xl border border-white/30 transition-all hover:scale-105 cursor-pointer text-center"
            >
              SHOP WOMEN
            </button>
          </div>
        </div>
      </section>

      {/* 2. PROMOTIONAL BANNERS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 sm:-mt-10 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div
            onClick={() => navigateTo('catalog')}
            className="p-6 rounded-2xl bg-neutral-900 text-white border border-neutral-800 shadow-xl flex items-center justify-between cursor-pointer group hover:border-neutral-600 transition-all"
          >
            <div>
              <span className="text-[10px] font-bold tracking-widest text-amber-400 uppercase">
                DOMESTIC PRIVILEGE
              </span>
              <h3 className="font-serif-luxury text-base sm:text-lg font-bold text-white mt-0.5">
                FREE SHIPPING ON ORDERS ABOVE ₹1,999
              </h3>
              <p className="text-xs text-neutral-400 mt-1">
                Complimentary 24-48h air dispatch to all metropolitan cities.
              </p>
            </div>
            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0 group-hover:translate-x-1 transition-transform">
              <ArrowRight className="w-5 h-5 text-white" />
            </div>
          </div>

          <div
            onClick={() => navigateTo('catalog', { filterUpdates: { discount: 20 } })}
            className="p-6 rounded-2xl bg-[#EFECE6] text-neutral-900 border border-neutral-300 shadow-xl flex items-center justify-between cursor-pointer group hover:border-neutral-500 transition-all"
          >
            <div>
              <span className="text-[10px] font-bold tracking-widest text-neutral-600 uppercase">
                WELCOME OFFER
              </span>
              <h3 className="font-serif-luxury text-base sm:text-lg font-bold text-neutral-950 mt-0.5">
                EXTRA 10% OFF ON YOUR FIRST ORDER
              </h3>
              <p className="text-xs text-neutral-600 mt-1">
                Use checkout coupon <strong>SAVARA10</strong> on any items.
              </p>
            </div>
            <div className="w-10 h-10 rounded-full bg-neutral-900 text-white flex items-center justify-center shrink-0 group-hover:translate-x-1 transition-transform">
              <ArrowRight className="w-5 h-5" />
            </div>
          </div>
        </div>
      </section>

      {/* 3. CATEGORY SECTIONS - MEN */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-400">
              MASCULINE SILHOUETTES
            </span>
            <h2 className="font-serif-luxury text-2xl sm:text-3xl font-bold tracking-tight text-neutral-950 mt-1">
              SHOP MEN
            </h2>
          </div>
          <button
            onClick={() => navigateTo('catalog', { filterUpdates: { gender: ['Men'] } })}
            className="text-xs font-bold uppercase tracking-widest text-neutral-900 hover:text-black flex items-center gap-1 cursor-pointer"
          >
            <span>VIEW ALL MEN</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {menCategories.map((cat) => (
            <div
              key={cat.name}
              onClick={() =>
                navigateTo('catalog', {
                  filterUpdates: { gender: ['Men'], categories: [cat.name] },
                })
              }
              className="group flex flex-col items-center text-center cursor-pointer"
            >
              <div className="w-full aspect-[4/5] rounded-xl overflow-hidden bg-neutral-100 mb-2.5 relative border border-neutral-200/80 shadow-xs group-hover:shadow-md transition-all">
                <img
                  src={cat.img}
                  alt={cat.name}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <span className="text-xs font-semibold text-neutral-800 group-hover:text-black tracking-wide">
                {cat.name}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* 4. FLASH SALE SECTION */}
      <FlashSaleBanner />

      {/* 5. CATEGORY SECTIONS - WOMEN */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-400">
              FEMININE ARCHITECTURES
            </span>
            <h2 className="font-serif-luxury text-2xl sm:text-3xl font-bold tracking-tight text-neutral-950 mt-1">
              SHOP WOMEN
            </h2>
          </div>
          <button
            onClick={() => navigateTo('catalog', { filterUpdates: { gender: ['Women'] } })}
            className="text-xs font-bold uppercase tracking-widest text-neutral-900 hover:text-black flex items-center gap-1 cursor-pointer"
          >
            <span>VIEW ALL WOMEN</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {womenCategories.map((cat) => (
            <div
              key={cat.name}
              onClick={() =>
                navigateTo('catalog', {
                  filterUpdates: { gender: ['Women'], categories: [cat.name] },
                })
              }
              className="group flex flex-col items-center text-center cursor-pointer"
            >
              <div className="w-full aspect-[4/5] rounded-xl overflow-hidden bg-neutral-100 mb-2.5 relative border border-neutral-200/80 shadow-xs group-hover:shadow-md transition-all">
                <img
                  src={cat.img}
                  alt={cat.name}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <span className="text-xs font-semibold text-neutral-800 group-hover:text-black tracking-wide">
                {cat.name}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* 6. BESTSELLERS SHOWCASE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.2em] text-amber-600 mb-1">
              <Zap className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
              <span>COMMUNITY FAVORITES</span>
            </div>
            <h2 className="font-serif-luxury text-2xl sm:text-3xl font-bold tracking-tight text-neutral-950">
              SAVARA BESTSELLERS
            </h2>
          </div>
          <button
            onClick={() => navigateTo('catalog', { filterUpdates: { sortBy: 'popularity' } })}
            className="text-xs font-bold uppercase tracking-widest text-neutral-900 hover:text-black flex items-center gap-1 cursor-pointer"
          >
            <span>VIEW FULL CATALOG</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bestsellers.map((prod) => (
            <ProductCard key={prod.id} product={prod} />
          ))}
        </div>
      </section>

      {/* 7. EDITORIAL COLLECTIONS */}
      <EditorialCollections />

      {/* 8. TRENDING DROPS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-400">
              JUST DROPPED IN THE ATELIER
            </span>
            <h2 className="font-serif-luxury text-2xl sm:text-3xl font-bold tracking-tight text-neutral-950 mt-1">
              TRENDING RELEASES
            </h2>
          </div>
          <button
            onClick={() => navigateTo('catalog', { filterUpdates: { sortBy: 'newest' } })}
            className="text-xs font-bold uppercase tracking-widest text-neutral-900 hover:text-black flex items-center gap-1 cursor-pointer"
          >
            <span>VIEW ALL NEW DROPS</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {trending.map((prod) => (
            <ProductCard key={prod.id} product={prod} />
          ))}
        </div>
      </section>

      {/* 9. BRAND PHILOSOPHY / LOOKBOOK BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-neutral-950 text-white p-8 sm:p-16 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-xl space-y-4">
            <span className="text-xs font-bold tracking-[0.25em] text-amber-400 uppercase">
              THE SAVARA MANIFESTO
            </span>
            <h3 className="font-serif-luxury text-2xl sm:text-4xl font-bold tracking-tight text-white leading-snug">
              Fashion that speaks without screaming. Built for the modern silhouette.
            </h3>
            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
              Every garment in our catalog undergoes rigorous pattern engineering in our Mumbai atelier. We source combed Egyptian cottons, vintage shuttle loom denim, and high-tenacity ripstop to deliver unmatched luxury longevity.
            </p>
            <div className="pt-2">
              <button
                onClick={() => navigateTo('catalog')}
                className="px-6 py-3.5 bg-white text-neutral-950 hover:bg-neutral-200 text-xs font-bold uppercase tracking-widest rounded-xl transition-all cursor-pointer"
              >
                DISCOVER THE ARCHIVE
              </button>
            </div>
          </div>

          <div className="w-full md:w-1/3 aspect-[3/4] rounded-2xl overflow-hidden border border-neutral-800 shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=800&q=80"
              alt="SAVARA Tailoring"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

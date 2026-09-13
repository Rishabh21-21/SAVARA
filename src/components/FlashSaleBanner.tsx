import React, { useState, useEffect } from 'react';
import { Flame, Clock, ShoppingBag, ArrowRight } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const FlashSaleBanner: React.FC = () => {
  const { products, addToCart, navigateTo } = useShop();

  // Functional countdown timer
  const [timeLeft, setTimeLeft] = useState({
    hours: 2,
    minutes: 14,
    seconds: 36,
    milliseconds: 88,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let ms = prev.milliseconds - 4;
        let s = prev.seconds;
        let m = prev.minutes;
        let h = prev.hours;

        if (ms < 0) {
          ms = 99;
          s -= 1;
        }
        if (s < 0) {
          s = 59;
          m -= 1;
        }
        if (m < 0) {
          m = 59;
          h -= 1;
        }
        if (h < 0) {
          h = 2;
          m = 59;
          s = 59;
        }
        return { hours: h, minutes: m, seconds: s, milliseconds: ms };
      });
    }, 40);

    return () => clearInterval(timer);
  }, []);

  const flashItems = products.slice(0, 4);

  return (
    <div className="bg-neutral-950 text-white py-12 px-4 sm:px-6 lg:px-8 border-y border-neutral-800">
      <div className="max-w-7xl mx-auto">
        {/* Header with Countdown */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 border-b border-neutral-800 pb-6">
          <div>
            <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-widest mb-1.5">
              <Flame className="w-4 h-4 fill-amber-400" />
              <span>LIMITED MIDNIGHT DROP</span>
            </div>
            <h2 className="font-serif-luxury text-2xl sm:text-3xl font-bold tracking-tight text-white">
              SAVARA FLASH SALE
            </h2>
            <p className="text-xs sm:text-sm text-neutral-400 mt-1 max-w-lg">
              Curated luxury pieces at up to 40% off. Dynamic pricing resets when timer reaches zero.
            </p>
          </div>

          {/* Realtime Clock display */}
          <div className="flex items-center gap-3 bg-neutral-900/90 border border-neutral-800 px-5 py-3 rounded-2xl">
            <Clock className="w-5 h-5 text-amber-400 shrink-0" />
            <div className="flex items-center gap-1.5 text-center font-mono">
              <div className="flex flex-col">
                <span className="text-xl sm:text-2xl font-bold text-white leading-none">
                  {String(timeLeft.hours).padStart(2, '0')}
                </span>
                <span className="text-[9px] text-neutral-400 mt-1 uppercase">HRS</span>
              </div>
              <span className="text-lg text-neutral-500 font-bold">:</span>
              <div className="flex flex-col">
                <span className="text-xl sm:text-2xl font-bold text-white leading-none">
                  {String(timeLeft.minutes).padStart(2, '0')}
                </span>
                <span className="text-[9px] text-neutral-400 mt-1 uppercase">MIN</span>
              </div>
              <span className="text-lg text-neutral-500 font-bold">:</span>
              <div className="flex flex-col">
                <span className="text-xl sm:text-2xl font-bold text-white leading-none">
                  {String(timeLeft.seconds).padStart(2, '0')}
                </span>
                <span className="text-[9px] text-neutral-400 mt-1 uppercase">SEC</span>
              </div>
              <span className="text-lg text-neutral-500 font-bold">:</span>
              <div className="flex flex-col">
                <span className="text-xl sm:text-2xl font-bold text-amber-400 leading-none">
                  {String(timeLeft.milliseconds).padStart(2, '0')}
                </span>
                <span className="text-[9px] text-neutral-400 mt-1 uppercase">MS</span>
              </div>
            </div>
          </div>
        </div>

        {/* Flash Sale Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {flashItems.map((item, idx) => {
            const stockPercent = 75 - idx * 18;
            return (
              <div
                key={item.id}
                onClick={() => navigateTo('product-detail', { productId: item.id })}
                className="bg-neutral-900 rounded-xl overflow-hidden border border-neutral-800 hover:border-neutral-600 transition-all duration-300 flex flex-col justify-between group cursor-pointer"
              >
                <div className="relative aspect-[3/4] overflow-hidden bg-neutral-800">
                  <img
                    src={item.images[0]}
                    alt={item.name}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-2.5 left-2.5 bg-rose-600 text-white text-[10px] font-bold px-2 py-0.5 rounded tracking-wider uppercase">
                    {item.discountPercent}% OFF
                  </div>
                </div>

                <div className="p-4 flex flex-col justify-between flex-1 gap-3">
                  <div>
                    <span className="text-[10px] text-neutral-400 uppercase tracking-widest font-semibold block">
                      {item.brand}
                    </span>
                    <h4 className="text-xs sm:text-sm font-semibold text-white truncate mt-0.5">
                      {item.name}
                    </h4>

                    <div className="flex items-baseline gap-2 mt-2">
                      <span className="text-sm sm:text-base font-bold text-white">
                        ₹{item.price.toLocaleString('en-IN')}
                      </span>
                      <span className="text-xs text-neutral-500 line-through">
                        ₹{item.originalPrice.toLocaleString('en-IN')}
                      </span>
                    </div>

                    {/* Stock Indicator */}
                    <div className="mt-3">
                      <div className="flex justify-between text-[10px] text-neutral-400 mb-1 font-medium">
                        <span>Stock Claimed</span>
                        <span className="text-amber-400 font-bold">{stockPercent}%</span>
                      </div>
                      <div className="w-full bg-neutral-800 h-1.5 rounded-full overflow-hidden">
                        <div
                          className="bg-gradient-to-r from-amber-400 to-rose-500 h-full rounded-full transition-all duration-500"
                          style={{ width: `${stockPercent}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart(item, item.colors[0]?.name || 'Default', item.sizes[0] || 'M', 1);
                    }}
                    className="w-full py-2 bg-white text-neutral-950 hover:bg-neutral-200 text-xs font-bold rounded-lg flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>CLAIM DEAL</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* View full sale CTA */}
        <div className="mt-8 text-center">
          <button
            onClick={() => navigateTo('catalog', { filterUpdates: { discount: 30 } })}
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-neutral-300 hover:text-white transition-colors cursor-pointer"
          >
            <span>DISCOVER ALL LIMITED DISCOUNT EDITIONS</span>
            <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
          </button>
        </div>
      </div>
    </div>
  );
};

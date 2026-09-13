import React, { useState } from 'react';
import { X, Star, Heart, ShoppingBag, ShieldCheck, ArrowRight } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const QuickViewModal: React.FC = () => {
  const {
    quickViewProduct,
    setQuickViewProduct,
    addToCart,
    toggleWishlist,
    isInWishlist,
    navigateTo,
    setIsSizeGuideOpen,
  } = useShop();

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [isAdded, setIsAdded] = useState(false);

  if (!quickViewProduct) return null;

  const inWishlist = isInWishlist(quickViewProduct.id);
  const currentColor = selectedColor || quickViewProduct.colors[0]?.name || 'Standard';
  const currentSize = selectedSize || quickViewProduct.sizes[0] || 'M';

  const handleAddToCart = () => {
    addToCart(quickViewProduct, currentColor, currentSize, 1);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const handleBuyNow = () => {
    addToCart(quickViewProduct, currentColor, currentSize, 1);
    setQuickViewProduct(null);
    navigateTo('checkout');
  };

  const handleFullDetails = () => {
    const id = quickViewProduct.id;
    setQuickViewProduct(null);
    navigateTo('product-detail', { productId: id });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl border border-neutral-200 overflow-hidden max-h-[90vh] flex flex-col md:flex-row">
        {/* Close Button */}
        <button
          onClick={() => setQuickViewProduct(null)}
          className="absolute top-3 right-3 z-30 p-2 bg-white/80 hover:bg-white text-neutral-800 rounded-full shadow-md"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Gallery on Left */}
        <div className="w-full md:w-1/2 bg-neutral-100 flex flex-col p-4">
          <div className="relative aspect-[3/4] w-full rounded-xl overflow-hidden bg-white shadow-inner">
            <img
              src={quickViewProduct.images[activeImageIndex] || quickViewProduct.images[0]}
              alt={quickViewProduct.name}
              className="w-full h-full object-cover object-center transition-all duration-300"
            />
          </div>
          {quickViewProduct.images.length > 1 && (
            <div className="flex gap-2 mt-3 overflow-x-auto pb-1">
              {quickViewProduct.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`w-14 h-16 rounded-lg overflow-hidden shrink-0 border-2 transition-all ${
                    activeImageIndex === idx ? 'border-neutral-950 scale-105' : 'border-transparent opacity-60'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Details on Right */}
        <div className="w-full md:w-1/2 p-6 overflow-y-auto flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-400">
                {quickViewProduct.brand}
              </span>
              <div className="flex items-center gap-1 text-xs text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full font-bold">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span>{quickViewProduct.rating}</span>
                <span className="text-neutral-400 font-normal">
                  ({quickViewProduct.reviewCount})
                </span>
              </div>
            </div>

            <h2 className="text-lg sm:text-xl font-bold text-neutral-950 mt-1">
              {quickViewProduct.name}
            </h2>

            {quickViewProduct.tagline && (
              <p className="text-xs text-neutral-500 mt-1 italic">
                {quickViewProduct.tagline}
              </p>
            )}

            {/* Price */}
            <div className="flex items-baseline gap-2.5 mt-3">
              <span className="text-2xl font-bold text-neutral-950">
                ₹{quickViewProduct.price.toLocaleString('en-IN')}
              </span>
              <span className="text-sm text-neutral-400 line-through">
                ₹{quickViewProduct.originalPrice.toLocaleString('en-IN')}
              </span>
              <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                {quickViewProduct.discountPercent}% OFF
              </span>
            </div>
            <span className="text-[11px] text-neutral-400">Inclusive of all taxes</span>

            {/* Colors */}
            <div className="mt-5">
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-800">
                Color: <span className="font-normal text-neutral-600">{currentColor}</span>
              </span>
              <div className="flex gap-2 mt-2">
                {quickViewProduct.colors.map((c) => (
                  <button
                    key={c.name}
                    onClick={() => setSelectedColor(c.name)}
                    className={`w-7 h-7 rounded-full border-2 transition-all ${
                      currentColor === c.name
                        ? 'border-neutral-950 scale-110 ring-2 ring-neutral-400'
                        : 'border-neutral-200 hover:scale-105'
                    }`}
                    style={{ backgroundColor: c.hex }}
                    title={c.name}
                  />
                ))}
              </div>
            </div>

            {/* Sizes */}
            <div className="mt-5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-neutral-800">
                  Select Size
                </span>
                <button
                  onClick={() => setIsSizeGuideOpen(true)}
                  className="text-xs text-neutral-900 underline font-semibold hover:text-black cursor-pointer"
                >
                  Size Guide
                </button>
              </div>
              <div className="grid grid-cols-5 gap-2 mt-2">
                {quickViewProduct.sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSelectedSize(s)}
                    className={`py-2 text-xs font-semibold rounded-lg border transition-all ${
                      currentSize === s
                        ? 'bg-neutral-950 text-white border-neutral-950'
                        : 'bg-white text-neutral-800 border-neutral-300 hover:border-neutral-900'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <p className="text-xs text-neutral-600 mt-4 line-clamp-3">
              {quickViewProduct.description}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="mt-6 pt-4 border-t border-neutral-100 space-y-2">
            <div className="flex gap-2">
              <button
                onClick={handleAddToCart}
                className="flex-1 py-3 bg-neutral-950 hover:bg-black text-white text-xs font-bold rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>{isAdded ? 'ADDED TO BAG ✓' : 'ADD TO BAG'}</span>
              </button>
              <button
                onClick={() => toggleWishlist(quickViewProduct.id)}
                className={`p-3 border rounded-xl transition-colors cursor-pointer ${
                  inWishlist
                    ? 'border-rose-300 bg-rose-50 text-rose-600'
                    : 'border-neutral-300 hover:border-neutral-900 text-neutral-700'
                }`}
              >
                <Heart className={`w-5 h-5 ${inWishlist ? 'fill-rose-600' : ''}`} />
              </button>
            </div>

            <button
              onClick={handleBuyNow}
              className="w-full py-2.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-900 text-xs font-bold rounded-xl transition-colors cursor-pointer text-center"
            >
              BUY NOW WITH 1-CLICK
            </button>

            <button
              onClick={handleFullDetails}
              className="w-full py-1 text-center text-xs text-neutral-500 hover:text-black flex items-center justify-center gap-1 font-medium"
            >
              <span>View complete product specs & reviews</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

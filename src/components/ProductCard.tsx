import React, { useState } from 'react';
import { Heart, Star, Eye, ShoppingBag, Check } from 'lucide-react';
import { Product } from '../types';
import { useShop } from '../context/ShopContext';

interface ProductCardProps {
  product: Product;
  onQuickView?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onQuickView }) => {
  const {
    navigateTo,
    toggleWishlist,
    isInWishlist,
    addToCart,
    setQuickViewProduct,
  } = useShop();

  const [isHovered, setIsHovered] = useState(false);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.name || 'Standard');
  const [showSizePicker, setShowSizePicker] = useState(false);
  const [addedAnimation, setAddedAnimation] = useState(false);

  const inWishlist = isInWishlist(product.id);

  const displayImage =
    isHovered && product.images.length > 1 ? product.images[1] : product.images[0];

  const handleQuickAdd = (size: string) => {
    addToCart(product, selectedColor, size, 1);
    setShowSizePicker(false);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1800);
  };

  const handleCardClick = () => {
    navigateTo('product-detail', { productId: product.id });
  };

  return (
    <div
      className="group relative flex flex-col bg-white rounded-xl overflow-hidden border border-neutral-200/70 hover:border-neutral-400 hover:shadow-xl transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setShowSizePicker(false);
      }}
    >
      {/* Badges container */}
      <div className="absolute top-2.5 left-2.5 z-20 flex flex-col gap-1 items-start">
        {product.isBestseller && (
          <span className="px-2 py-0.5 bg-neutral-950 text-amber-300 text-[10px] font-bold tracking-widest uppercase rounded">
            BESTSELLER
          </span>
        )}
        {product.isNew && (
          <span className="px-2 py-0.5 bg-white text-neutral-900 text-[10px] font-bold tracking-widest uppercase border border-neutral-300 rounded shadow-sm">
            NEW DROP
          </span>
        )}
        {product.isLimitedStock && (
          <span className="px-2 py-0.5 bg-rose-600 text-white text-[10px] font-bold tracking-widest uppercase rounded animate-pulse">
            LIMITED STOCK
          </span>
        )}
        {product.discountPercent >= 30 && !product.isLimitedStock && (
          <span className="px-2 py-0.5 bg-neutral-900 text-white text-[10px] font-bold tracking-wider rounded">
            {product.discountPercent}% OFF
          </span>
        )}
      </div>

      {/* Wishlist Button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          toggleWishlist(product.id);
        }}
        aria-label={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
        className="absolute top-2.5 right-2.5 z-20 p-2 bg-white/90 hover:bg-white text-neutral-700 hover:text-rose-600 rounded-full shadow-md transition-all cursor-pointer backdrop-blur-xs"
      >
        <Heart
          className={`w-4 h-4 transition-colors ${
            inWishlist ? 'fill-rose-600 text-rose-600' : 'stroke-neutral-700'
          }`}
        />
      </button>

      {/* Product Image Area */}
      <div
        onClick={handleCardClick}
        className="relative aspect-[3/4] w-full overflow-hidden bg-neutral-100 cursor-pointer"
      >
        <img
          src={displayImage}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
        />

        {/* Quick View Button overlay */}
        <div className="absolute inset-x-0 bottom-3 px-3 hidden sm:flex justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-20">
          <button
            onClick={(e) => {
              e.stopPropagation();
              if (onQuickView) onQuickView(product);
              else setQuickViewProduct(product);
            }}
            className="w-full py-2 bg-white/95 hover:bg-white text-neutral-950 text-xs font-semibold rounded-lg shadow-lg backdrop-blur-sm flex items-center justify-center gap-1.5 transition-all cursor-pointer border border-neutral-200"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>QUICK VIEW</span>
          </button>
        </div>
      </div>

      {/* Product Info Section */}
      <div className="p-3.5 flex flex-col flex-1 justify-between gap-2.5 bg-white">
        <div>
          {/* Brand & Rating */}
          <div className="flex items-center justify-between gap-1 text-[11px] text-neutral-500 mb-1">
            <span className="font-semibold uppercase tracking-wider text-neutral-400 truncate">
              {product.brand}
            </span>
            <div className="flex items-center gap-1 bg-neutral-50 px-1.5 py-0.5 rounded border border-neutral-100 shrink-0">
              <span className="font-bold text-neutral-800 text-[10px]">{product.rating}</span>
              <Star className="w-2.5 h-2.5 fill-amber-400 text-amber-400" />
              <span className="text-[9px] text-neutral-400">({product.reviewCount})</span>
            </div>
          </div>

          {/* Product Title */}
          <h3
            onClick={handleCardClick}
            className="text-xs sm:text-sm font-semibold text-neutral-900 line-clamp-1 hover:text-black cursor-pointer tracking-tight"
            title={product.name}
          >
            {product.name}
          </h3>

          {/* Available Colors preview */}
          <div className="flex items-center gap-1.5 mt-2">
            {product.colors.map((c) => (
              <button
                key={c.name}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedColor(c.name);
                }}
                className={`w-3.5 h-3.5 rounded-full border transition-all cursor-pointer ${
                  selectedColor === c.name
                    ? 'border-neutral-950 scale-125 shadow-xs ring-1 ring-neutral-400'
                    : 'border-neutral-300 hover:scale-110'
                }`}
                style={{ backgroundColor: c.hex }}
                title={c.name}
              />
            ))}
            <span className="text-[10px] text-neutral-400 ml-1 truncate">
              {selectedColor}
            </span>
          </div>

          {/* Sizes preview */}
          <div className="flex items-center gap-1 mt-1.5 flex-wrap">
            <span className="text-[10px] text-neutral-400 font-medium">Sizes:</span>
            {product.sizes.map((s) => (
              <span
                key={s}
                className="text-[10px] px-1 py-0.2 bg-neutral-100 text-neutral-600 rounded font-medium"
              >
                {s}
              </span>
            ))}
          </div>
        </div>

        {/* Pricing & Add to Bag Area */}
        <div className="pt-2 border-t border-neutral-100">
          <div className="flex items-baseline gap-2">
            <span className="text-sm sm:text-base font-bold text-neutral-950">
              ₹{product.price.toLocaleString('en-IN')}
            </span>
            <span className="text-xs text-neutral-400 line-through">
              ₹{product.originalPrice.toLocaleString('en-IN')}
            </span>
            <span className="text-xs font-bold text-emerald-600">
              {product.discountPercent}% OFF
            </span>
          </div>

          {/* Action Buttons: Add to Bag or Quick Size Picker */}
          <div className="mt-2.5 relative">
            {showSizePicker ? (
              <div className="p-2 bg-neutral-950 text-white rounded-lg animate-fade-in shadow-xl">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-neutral-300">
                    Select Size
                  </span>
                  <button
                    onClick={() => setShowSizePicker(false)}
                    className="text-[10px] text-neutral-400 hover:text-white"
                  >
                    ✕
                  </button>
                </div>
                <div className="grid grid-cols-5 gap-1">
                  {product.sizes.map((sz) => (
                    <button
                      key={sz}
                      onClick={() => handleQuickAdd(sz)}
                      className="py-1 text-[11px] font-semibold bg-neutral-800 hover:bg-white hover:text-black rounded transition-colors text-center cursor-pointer"
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-1.5">
                <button
                  onClick={() => setShowSizePicker(true)}
                  className={`w-full py-2 text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-all cursor-pointer border ${
                    addedAnimation
                      ? 'bg-emerald-600 text-white border-emerald-600'
                      : 'bg-neutral-900 hover:bg-black text-white border-neutral-900'
                  }`}
                >
                  {addedAnimation ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>ADDED!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>ADD TO BAG</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => {
                    addToCart(product, selectedColor, product.sizes[0] || 'M', 1);
                    navigateTo('checkout');
                  }}
                  className="w-full py-2 text-xs font-semibold rounded-lg text-neutral-900 bg-neutral-100 hover:bg-neutral-200 border border-neutral-300/80 transition-colors cursor-pointer text-center"
                >
                  BUY NOW
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import {
  Star,
  Heart,
  ShoppingBag,
  Truck,
  RotateCcw,
  ShieldCheck,
  Ruler,
  Share2,
  Check,
  ChevronRight,
  Maximize2,
  X,
  Plus,
  Sparkles,
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { ProductCard } from '../components/ProductCard';

export const ProductDetailView: React.FC = () => {
  const {
    currentProductId,
    products,
    addToCart,
    toggleWishlist,
    isInWishlist,
    setIsSizeGuideOpen,
    navigateTo,
    addReview,
  } = useShop();

  // Selected product
  const product = products.find((p) => p.id === currentProductId) || products[0];

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(product?.colors[0]?.name || 'Standard');
  const [selectedSize, setSelectedSize] = useState(product?.sizes[0] || 'M');
  const [quantity, setQuantity] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [addedAnimation, setAddedAnimation] = useState(false);

  // Pincode checker
  const [pincode, setPincode] = useState('');
  const [pincodeStatus, setPincodeStatus] = useState<string | null>(null);

  // Active accordion / tab
  const [activeTab, setActiveTab] = useState<'details' | 'fabric' | 'fit' | 'returns'>('details');

  // Review Form
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewName, setReviewName] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');

  if (!product) return null;

  const inWishlist = isInWishlist(product.id);

  const handlePincodeCheck = (e: React.FormEvent) => {
    e.preventDefault();
    if (pincode.trim().length === 6) {
      setPincodeStatus(`Available! Express Delivery by ${new Date(Date.now() + 86400000 * 2).toLocaleDateString('en-IN', { weekday: 'short', month: 'short', day: 'numeric' })}. Free Shipping.`);
    } else {
      setPincodeStatus('Please enter a valid 6-digit postal code.');
    }
  };

  const handleAddToCart = () => {
    addToCart(product, selectedColor, selectedSize, quantity);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 2000);
  };

  const handleBuyNow = () => {
    addToCart(product, selectedColor, selectedSize, quantity);
    navigateTo('checkout');
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewName.trim() || !reviewComment.trim()) return;

    addReview(product.id, {
      id: `rev-${Date.now()}`,
      userName: reviewName,
      rating: reviewRating,
      date: 'Just now',
      comment: reviewComment,
      verified: true,
    });

    setReviewName('');
    setReviewComment('');
    setShowReviewForm(false);
  };

  // Complete The Look items
  const completeLookItems = products
    .filter((p) => p.id !== product.id && p.gender === product.gender)
    .slice(0, 2);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-xs text-neutral-400">
        <button onClick={() => navigateTo('home')} className="hover:text-black">
          HOME
        </button>
        <span>/</span>
        <button
          onClick={() => navigateTo('catalog', { filterUpdates: { gender: [product.gender] } })}
          className="hover:text-black"
        >
          {product.gender.toUpperCase()}
        </button>
        <span>/</span>
        <button
          onClick={() => navigateTo('catalog', { filterUpdates: { categories: [product.category] } })}
          className="hover:text-black"
        >
          {product.category.toUpperCase()}
        </button>
        <span>/</span>
        <span className="text-neutral-900 font-medium truncate max-w-xs">{product.name}</span>
      </nav>

      {/* Main Product Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left: Sticky Image Gallery (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex flex-col-reverse md:flex-row gap-4">
            {/* Thumbnails on Desktop Left */}
            <div className="flex md:flex-col gap-2.5 overflow-x-auto md:overflow-y-auto max-h-[620px] shrink-0 no-scrollbar">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImageIndex(idx)}
                  className={`w-16 sm:w-20 aspect-[3/4] rounded-xl overflow-hidden border-2 transition-all shrink-0 cursor-pointer ${
                    selectedImageIndex === idx
                      ? 'border-neutral-950 scale-102 shadow-md'
                      : 'border-transparent opacity-65 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>

            {/* Main Stage Image with Zoom button */}
            <div className="relative flex-1 aspect-[3/4] rounded-2xl overflow-hidden bg-neutral-100 border border-neutral-200 group">
              <img
                src={product.images[selectedImageIndex] || product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
              />

              {/* Fullscreen Trigger */}
              <button
                onClick={() => setIsFullscreen(true)}
                className="absolute top-4 right-4 p-2.5 bg-white/90 hover:bg-white text-neutral-800 rounded-full shadow-lg backdrop-blur-xs transition-colors"
                title="View Fullscreen"
              >
                <Maximize2 className="w-4 h-4" />
              </button>

              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-1.5">
                {product.isBestseller && (
                  <span className="px-2.5 py-1 bg-neutral-950 text-amber-300 text-[10px] font-bold tracking-widest uppercase rounded shadow">
                    BESTSELLER
                  </span>
                )}
                {product.isNew && (
                  <span className="px-2.5 py-1 bg-white text-neutral-900 text-[10px] font-bold tracking-widest uppercase rounded shadow border border-neutral-200">
                    NEW DROP
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Right: Product Details & Purchase Actions (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-400">
                {product.brand}
              </span>
              <button
                onClick={() => {
                  navigator.clipboard?.writeText(window.location.href);
                  alert('Product link copied to clipboard!');
                }}
                className="text-neutral-400 hover:text-black p-1"
                title="Share garment"
              >
                <Share2 className="w-4 h-4" />
              </button>
            </div>

            <h1 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-neutral-950 mt-1">
              {product.name}
            </h1>

            {product.tagline && (
              <p className="font-editorial italic text-sm text-neutral-500 mt-1">
                &ldquo;{product.tagline}&rdquo;
              </p>
            )}

            {/* Rating summary */}
            <div className="flex items-center gap-2 mt-2.5">
              <div className="flex items-center gap-1 bg-neutral-950 text-white px-2 py-0.5 rounded text-xs font-bold">
                <span>{product.rating}</span>
                <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
              </div>
              <span className="text-xs text-neutral-500">
                {product.reviewCount.toLocaleString('en-IN')} verified customer reviews
              </span>
            </div>

            {/* Pricing Section */}
            <div className="flex items-baseline gap-3 mt-4">
              <span className="text-3xl font-bold text-neutral-950">
                ₹{product.price.toLocaleString('en-IN')}
              </span>
              <span className="text-base text-neutral-400 line-through">
                ₹{product.originalPrice.toLocaleString('en-IN')}
              </span>
              <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                {product.discountPercent}% OFF
              </span>
            </div>
            <p className="text-[11px] text-neutral-400 mt-0.5">
              Inclusive of all duties and GST. Free delivery on orders above ₹1,999.
            </p>
          </div>

          <hr className="border-neutral-200" />

          {/* Color Swatches */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-900">
                Color: <span className="font-normal text-neutral-600">{selectedColor}</span>
              </span>
            </div>
            <div className="flex gap-2.5">
              {product.colors.map((c) => (
                <button
                  key={c.name}
                  onClick={() => setSelectedColor(c.name)}
                  className={`w-8 h-8 rounded-full border-2 transition-all cursor-pointer ${
                    selectedColor === c.name
                      ? 'border-neutral-950 scale-110 ring-2 ring-neutral-400 shadow-sm'
                      : 'border-neutral-300 hover:scale-105'
                  }`}
                  style={{ backgroundColor: c.hex }}
                  title={c.name}
                />
              ))}
            </div>
          </div>

          {/* Size Picker & Size Guide */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-neutral-900">
                  Select Size
                </span>
                {product.isLimitedStock && (
                  <span className="text-[10px] text-rose-600 font-bold animate-pulse">
                    Only 3 left in stock!
                  </span>
                )}
              </div>
              <button
                onClick={() => setIsSizeGuideOpen(true)}
                className="text-xs text-neutral-900 font-semibold underline hover:text-black flex items-center gap-1 cursor-pointer"
              >
                <Ruler className="w-3.5 h-3.5" />
                <span>Size Guide & Fit Tool</span>
              </button>
            </div>

            <div className="grid grid-cols-6 gap-2">
              {product.sizes.map((sz) => (
                <button
                  key={sz}
                  onClick={() => setSelectedSize(sz)}
                  className={`py-3 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                    selectedSize === sz
                      ? 'bg-neutral-950 text-white border-neutral-950 shadow-md'
                      : 'bg-white text-neutral-800 border-neutral-300 hover:border-neutral-900'
                  }`}
                >
                  {sz}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity Selector */}
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-900">
              Quantity:
            </span>
            <div className="flex items-center border border-neutral-300 rounded-xl overflow-hidden bg-white">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-3 py-1.5 text-neutral-700 hover:bg-neutral-100 font-bold"
              >
                -
              </button>
              <span className="px-4 py-1.5 text-xs font-bold text-neutral-900 min-w-[36px] text-center">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="px-3 py-1.5 text-neutral-700 hover:bg-neutral-100 font-bold"
              >
                +
              </button>
            </div>
          </div>

          {/* Action Buttons: Add to Bag, Buy Now, Wishlist */}
          <div className="space-y-3 pt-2">
            <div className="flex gap-3">
              <button
                onClick={handleAddToCart}
                className={`flex-1 py-4 text-xs font-bold rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer uppercase tracking-wider shadow-lg ${
                  addedAnimation
                    ? 'bg-emerald-600 text-white'
                    : 'bg-neutral-950 hover:bg-black text-white hover:scale-[1.01]'
                }`}
              >
                {addedAnimation ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>ITEM ADDED TO BAG!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>ADD TO BAG</span>
                  </>
                )}
              </button>

              <button
                onClick={() => toggleWishlist(product.id)}
                className={`p-4 rounded-xl border transition-all cursor-pointer ${
                  inWishlist
                    ? 'bg-rose-50 border-rose-300 text-rose-600'
                    : 'bg-white border-neutral-300 hover:border-neutral-900 text-neutral-700'
                }`}
                title={inWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
              >
                <Heart className={`w-5 h-5 ${inWishlist ? 'fill-rose-600' : ''}`} />
              </button>
            </div>

            <button
              onClick={handleBuyNow}
              className="w-full py-3.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-950 text-xs font-bold rounded-xl uppercase tracking-wider transition-colors cursor-pointer border border-neutral-300"
            >
              EXPRESS 1-CLICK CHECKOUT
            </button>
          </div>

          {/* Pincode & Delivery Checker */}
          <div className="p-4 bg-neutral-50 rounded-2xl border border-neutral-200 space-y-2.5">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-neutral-900">
              <Truck className="w-4 h-4 text-neutral-700" />
              <span>DELIVERY OPTIONS & VERIFICATION</span>
            </div>

            <form onSubmit={handlePincodeCheck} className="flex gap-2">
              <input
                type="text"
                maxLength={6}
                value={pincode}
                onChange={(e) => setPincode(e.target.value.replace(/\D/g, ''))}
                placeholder="Enter 6-digit Pincode (e.g. 560038)"
                className="flex-1 px-3.5 py-2 text-xs border border-neutral-300 rounded-xl bg-white focus:outline-none focus:border-neutral-900"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-neutral-900 hover:bg-black text-white text-xs font-bold rounded-xl transition-colors cursor-pointer uppercase"
              >
                CHECK
              </button>
            </form>

            {pincodeStatus && (
              <p className="text-xs text-neutral-800 font-medium">{pincodeStatus}</p>
            )}

            <div className="pt-2 text-[11px] text-neutral-500 space-y-1">
              <p className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-600" /> Cash on Delivery available
              </p>
              <p className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-600" /> 7-Day Hassle-Free Returns & Exchanges
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Product Specification Tabs */}
      <div className="border-t border-neutral-200 pt-10">
        <div className="flex border-b border-neutral-200 gap-6 text-xs font-bold uppercase tracking-wider overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveTab('details')}
            className={`pb-3 transition-colors cursor-pointer ${
              activeTab === 'details'
                ? 'border-b-2 border-neutral-950 text-neutral-950'
                : 'text-neutral-400 hover:text-neutral-800'
            }`}
          >
            Product Story & Overview
          </button>
          <button
            onClick={() => setActiveTab('fabric')}
            className={`pb-3 transition-colors cursor-pointer ${
              activeTab === 'fabric'
                ? 'border-b-2 border-neutral-950 text-neutral-950'
                : 'text-neutral-400 hover:text-neutral-800'
            }`}
          >
            Fabric & Atelier GSM
          </button>
          <button
            onClick={() => setActiveTab('fit')}
            className={`pb-3 transition-colors cursor-pointer ${
              activeTab === 'fit'
                ? 'border-b-2 border-neutral-950 text-neutral-950'
                : 'text-neutral-400 hover:text-neutral-800'
            }`}
          >
            Fit, Silhouette & Model
          </button>
          <button
            onClick={() => setActiveTab('returns')}
            className={`pb-3 transition-colors cursor-pointer ${
              activeTab === 'returns'
                ? 'border-b-2 border-neutral-950 text-neutral-950'
                : 'text-neutral-400 hover:text-neutral-800'
            }`}
          >
            Returns & Doorstep Exchange
          </button>
        </div>

        <div className="py-6 text-xs text-neutral-700 leading-relaxed max-w-4xl">
          {activeTab === 'details' && (
            <div className="space-y-3">
              <p className="text-sm font-medium text-neutral-900">{product.description}</p>
              <p>
                Engineered for elevated streetwear and contemporary casual aesthetics. Pairs effortlessly across minimalist capsules and high-fashion urban wardrobes.
              </p>
            </div>
          )}

          {activeTab === 'fabric' && (
            <div className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-200">
                  <span className="text-[10px] uppercase font-bold text-neutral-400 block">
                    Material Composition
                  </span>
                  <span className="text-xs font-bold text-neutral-900 mt-1 block">
                    {product.fabric || '100% Super-Combed Bio-Washed Cotton'}
                  </span>
                </div>
                <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-200">
                  <span className="text-[10px] uppercase font-bold text-neutral-400 block">
                    Garment Weight
                  </span>
                  <span className="text-xs font-bold text-neutral-900 mt-1 block">
                    {product.gsm ? `${product.gsm} Heavyweight Terry Weave` : '280 GSM Premium Weight'}
                  </span>
                </div>
              </div>
              <p className="text-neutral-500 text-[11px]">
                Care: Cold machine wash inside-out on delicate cycle. Do not bleach. Flat air dry in shade. Warm iron on reverse side.
              </p>
            </div>
          )}

          {activeTab === 'fit' && (
            <div className="space-y-3">
              <p>
                <strong>Cut:</strong> {product.fit || 'Contemporary Boxy Oversized Silhouette with dropped shoulders.'}
              </p>
              <p>
                <strong>Model Specifications:</strong> {product.modelStats || "Model is 6'1\" (185 cm) with 39\" chest and wears size L."}
              </p>
              <p>
                For a standard regular fit, we recommend ordering one size down. For the intended editorial draped streetwear look, choose your true standard size.
              </p>
            </div>
          )}

          {activeTab === 'returns' && (
            <div className="space-y-3">
              <p>
                SAVARA provides a <strong>7-Day Doorstep Return & Instant Exchange Window</strong>.
              </p>
              <p>
                Our courier representative will inspect the tags and collect the garment from your address without requiring printouts or packaging boxes.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Complete The Look Section */}
      {completeLookItems.length > 0 && (
        <section className="border-t border-neutral-200 pt-10">
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-amber-600">
                <Sparkles className="w-3.5 h-3.5" />
                <span>ATELIER STYLING</span>
              </div>
              <h3 className="font-serif-luxury text-xl font-bold text-neutral-950">
                COMPLETE THE STATEMENT LOOK
              </h3>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {completeLookItems.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        </section>
      )}

      {/* Reviews & Ratings Section */}
      <section className="border-t border-neutral-200 pt-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h3 className="font-serif-luxury text-2xl font-bold text-neutral-950">
              CUSTOMER REVIEWS & EXPERIENCES
            </h3>
            <div className="flex items-center gap-3 mt-1.5">
              <div className="flex items-center text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.round(product.rating) ? 'fill-amber-400' : 'text-neutral-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs font-bold text-neutral-900">
                {product.rating} out of 5
              </span>
              <span className="text-xs text-neutral-400">
                Based on {product.reviewCount} customer reviews
              </span>
            </div>
          </div>

          <button
            onClick={() => setShowReviewForm(!showReviewForm)}
            className="px-5 py-2.5 bg-neutral-950 hover:bg-black text-white text-xs font-bold rounded-xl transition-colors cursor-pointer uppercase tracking-wider self-start md:self-auto"
          >
            {showReviewForm ? 'CANCEL REVIEW' : 'WRITE A VERIFIED REVIEW'}
          </button>
        </div>

        {/* Review Form Drawer */}
        {showReviewForm && (
          <form
            onSubmit={handleReviewSubmit}
            className="p-6 bg-neutral-50 rounded-2xl border border-neutral-200 mb-8 max-w-2xl space-y-4 animate-fade-in"
          >
            <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-900">
              Submit Your Garment Review
            </h4>

            <div>
              <label className="text-[11px] font-semibold text-neutral-600 block mb-1">
                Your Rating
              </label>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    type="button"
                    key={star}
                    onClick={() => setReviewRating(star)}
                    className="p-1 cursor-pointer"
                  >
                    <Star
                      className={`w-5 h-5 ${
                        star <= reviewRating
                          ? 'fill-amber-400 text-amber-400'
                          : 'text-neutral-300'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-[11px] font-semibold text-neutral-600 block mb-1">
                  Your Full Name
                </label>
                <input
                  type="text"
                  required
                  value={reviewName}
                  onChange={(e) => setReviewName(e.target.value)}
                  placeholder="e.g. Aryan Sharma"
                  className="w-full px-3.5 py-2 text-xs border border-neutral-300 rounded-xl bg-white focus:outline-none focus:border-neutral-900"
                />
              </div>
            </div>

            <div>
              <label className="text-[11px] font-semibold text-neutral-600 block mb-1">
                Your Feedback & Fabric Impressions
              </label>
              <textarea
                rows={3}
                required
                value={reviewComment}
                onChange={(e) => setReviewComment(e.target.value)}
                placeholder="Describe fit, fabric quality, and comfort..."
                className="w-full p-3 text-xs border border-neutral-300 rounded-xl bg-white focus:outline-none focus:border-neutral-900"
              />
            </div>

            <button
              type="submit"
              className="px-6 py-2.5 bg-neutral-900 hover:bg-black text-white text-xs font-bold rounded-xl transition-colors cursor-pointer uppercase"
            >
              POST REVIEW
            </button>
          </form>
        )}

        {/* Existing Reviews List */}
        <div className="space-y-4">
          {product.reviews.map((rev) => (
            <div key={rev.id} className="p-4 bg-white rounded-xl border border-neutral-200 space-y-1.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-neutral-900">{rev.userName}</span>
                  {rev.verified && (
                    <span className="text-[9px] bg-emerald-50 text-emerald-700 font-bold px-1.5 py-0.5 rounded border border-emerald-200">
                      Verified Buyer
                    </span>
                  )}
                </div>
                <span className="text-[10px] text-neutral-400">{rev.date}</span>
              </div>

              <div className="flex items-center text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3 h-3 ${
                      i < rev.rating ? 'fill-amber-400' : 'text-neutral-200'
                    }`}
                  />
                ))}
              </div>

              <p className="text-xs text-neutral-600 leading-relaxed">{rev.comment}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Fullscreen Lightbox Modal */}
      {isFullscreen && (
        <div className="fixed inset-0 z-50 bg-black/95 flex flex-col items-center justify-center p-4">
          <button
            onClick={() => setIsFullscreen(false)}
            className="absolute top-6 right-6 text-white p-2 hover:bg-white/10 rounded-full"
          >
            <X className="w-6 h-6" />
          </button>
          <div className="max-w-4xl max-h-[85vh] overflow-hidden rounded-2xl">
            <img
              src={product.images[selectedImageIndex]}
              alt={product.name}
              className="max-h-[85vh] w-auto object-contain mx-auto"
            />
          </div>
        </div>
      )}
    </div>
  );
};

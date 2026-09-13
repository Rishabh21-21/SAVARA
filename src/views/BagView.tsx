import React, { useState } from 'react';
import {
  Trash2,
  Heart,
  Tag,
  ArrowRight,
  ShieldCheck,
  RotateCcw,
  ShoppingBag,
  Check,
  Percent,
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { AVAILABLE_COUPONS } from '../data/mockData';

export const BagView: React.FC = () => {
  const {
    cart,
    cartSummary,
    removeFromCart,
    updateCartItemQuantity,
    updateCartItemSize,
    moveToWishlist,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    navigateTo,
  } = useShop();

  const [couponCodeInput, setCouponCodeInput] = useState('');
  const [couponMsg, setCouponMsg] = useState<{ text: string; success: boolean } | null>(null);

  const handleApplyCoupon = (code: string) => {
    const success = applyCoupon(code);
    if (success) {
      setCouponMsg({ text: `Coupon ${code} applied successfully!`, success: true });
      setCouponCodeInput('');
    } else {
      setCouponMsg({ text: 'Invalid or ineligible coupon code.', success: false });
    }
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-20 h-20 rounded-full bg-neutral-100 flex items-center justify-center mx-auto text-neutral-400">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <h2 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-neutral-900">
          Your Shopping Bag is Empty
        </h2>
        <p className="text-xs sm:text-sm text-neutral-500 max-w-sm mx-auto">
          Explore our newest seasonal drops, architectural essentials, and contemporary luxury staples.
        </p>
        <button
          onClick={() => navigateTo('catalog')}
          className="px-8 py-4 bg-neutral-950 hover:bg-black text-white text-xs font-bold uppercase tracking-widest rounded-xl transition-all cursor-pointer shadow-lg"
        >
          START EXPLORING CATALOG
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Progress Steps Header */}
      <div className="flex items-center justify-center gap-4 sm:gap-8 pb-8 border-b border-neutral-200 text-xs font-bold tracking-widest uppercase">
        <div className="flex items-center gap-2 text-neutral-950">
          <span className="w-5 h-5 rounded-full bg-neutral-950 text-white flex items-center justify-center text-[10px]">
            1
          </span>
          <span>SHOPPING BAG</span>
        </div>
        <span className="text-neutral-300">———</span>
        <div className="flex items-center gap-2 text-neutral-400">
          <span className="w-5 h-5 rounded-full bg-neutral-200 text-neutral-600 flex items-center justify-center text-[10px]">
            2
          </span>
          <span>DELIVERY ADDRESS</span>
        </div>
        <span className="text-neutral-300">———</span>
        <div className="flex items-center gap-2 text-neutral-400">
          <span className="w-5 h-5 rounded-full bg-neutral-200 text-neutral-600 flex items-center justify-center text-[10px]">
            3
          </span>
          <span>PAYMENT</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mt-8">
        {/* Left: Bag Items List (8 cols) */}
        <div className="lg:col-span-8 space-y-4">
          <div className="flex items-center justify-between pb-2">
            <h1 className="font-serif-luxury text-xl font-bold text-neutral-950">
              BAG ({cart.length} {cart.length === 1 ? 'ITEM' : 'ITEMS'})
            </h1>
            {cartSummary.deliveryFee === 0 ? (
              <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
                ✓ Free Express Delivery Unlocked!
              </span>
            ) : (
              <span className="text-xs text-neutral-500">
                Add ₹{(1999 - cartSummary.subtotal).toLocaleString('en-IN')} more for free delivery
              </span>
            )}
          </div>

          <div className="divide-y divide-neutral-200 border border-neutral-200 rounded-2xl bg-white overflow-hidden shadow-xs">
            {cart.map((item) => (
              <div key={item.id} className="p-4 sm:p-5 flex gap-4">
                {/* Product Image */}
                <div
                  onClick={() => navigateTo('product-detail', { productId: item.productId })}
                  className="w-20 sm:w-28 aspect-[3/4] rounded-xl overflow-hidden bg-neutral-100 shrink-0 cursor-pointer"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover object-center"
                  />
                </div>

                {/* Info & Modifiers */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">
                          {item.brand}
                        </span>
                        <h3
                          onClick={() => navigateTo('product-detail', { productId: item.productId })}
                          className="text-xs sm:text-sm font-bold text-neutral-950 cursor-pointer hover:underline"
                        >
                          {item.name}
                        </h3>
                      </div>
                      <div className="text-right">
                        <div className="text-sm sm:text-base font-bold text-neutral-950">
                          ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                        </div>
                        <div className="text-xs text-neutral-400 line-through">
                          ₹{(item.originalPrice * item.quantity).toLocaleString('en-IN')}
                        </div>
                      </div>
                    </div>

                    {/* Color and Size selectors */}
                    <div className="flex flex-wrap items-center gap-3 mt-3 text-xs">
                      <div className="flex items-center gap-1.5 px-2.5 py-1 bg-neutral-100 rounded-lg text-neutral-700">
                        <span className="text-neutral-400">Color:</span>
                        <span className="font-semibold">{item.color}</span>
                      </div>

                      {/* Size modifier */}
                      <div className="flex items-center gap-1.5 px-2.5 py-1 bg-neutral-100 rounded-lg text-neutral-700">
                        <span className="text-neutral-400">Size:</span>
                        <select
                          value={item.size}
                          onChange={(e) => updateCartItemSize(item.id, e.target.value)}
                          className="bg-transparent font-bold text-neutral-900 focus:outline-none cursor-pointer"
                        >
                          {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map((sz) => (
                            <option key={sz} value={sz}>
                              {sz}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Quantity modifier */}
                      <div className="flex items-center border border-neutral-300 rounded-lg overflow-hidden">
                        <button
                          onClick={() => updateCartItemQuantity(item.id, item.quantity - 1)}
                          className="px-2.5 py-0.5 text-xs text-neutral-700 hover:bg-neutral-100 font-bold"
                        >
                          -
                        </button>
                        <span className="px-2.5 py-0.5 text-xs font-bold text-neutral-900 min-w-[24px] text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateCartItemQuantity(item.id, item.quantity + 1)}
                          className="px-2.5 py-0.5 text-xs text-neutral-700 hover:bg-neutral-100 font-bold"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Actions: Move to wishlist & Remove */}
                  <div className="flex items-center gap-4 mt-4 pt-3 border-t border-neutral-100 text-xs font-semibold text-neutral-500">
                    <button
                      onClick={() => moveToWishlist(item.id)}
                      className="flex items-center gap-1.5 hover:text-neutral-950 transition-colors cursor-pointer"
                    >
                      <Heart className="w-3.5 h-3.5" />
                      <span>MOVE TO WISHLIST</span>
                    </button>
                    <span className="text-neutral-200">|</span>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="flex items-center gap-1.5 hover:text-rose-600 transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>REMOVE</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Order Summary & Coupons (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Coupon Code Section */}
          <div className="p-5 bg-white rounded-2xl border border-neutral-200 shadow-xs space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-neutral-900">
              <Tag className="w-4 h-4 text-amber-500" />
              <span>OFFERS & COUPONS</span>
            </div>

            {appliedCoupon ? (
              <div className="flex items-center justify-between p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs">
                <div>
                  <span className="font-bold text-emerald-800">{appliedCoupon.code} APPLIED</span>
                  <p className="text-[11px] text-emerald-600">
                    Saving ₹{cartSummary.couponDiscount.toLocaleString('en-IN')} with this offer
                  </p>
                </div>
                <button
                  onClick={removeCoupon}
                  className="text-xs font-bold text-rose-600 hover:underline cursor-pointer"
                >
                  REMOVE
                </button>
              </div>
            ) : (
              <div className="flex gap-2">
                <input
                  type="text"
                  value={couponCodeInput}
                  onChange={(e) => setCouponCodeInput(e.target.value.toUpperCase())}
                  placeholder="Enter coupon code"
                  className="flex-1 px-3 py-2 text-xs border border-neutral-300 rounded-xl uppercase font-mono tracking-wider focus:outline-none focus:border-neutral-900"
                />
                <button
                  onClick={() => handleApplyCoupon(couponCodeInput)}
                  className="px-4 py-2 bg-neutral-950 text-white text-xs font-bold rounded-xl uppercase hover:bg-black transition-colors cursor-pointer"
                >
                  APPLY
                </button>
              </div>
            )}

            {couponMsg && !appliedCoupon && (
              <p
                className={`text-xs ${
                  couponMsg.success ? 'text-emerald-600' : 'text-rose-600'
                } font-medium`}
              >
                {couponMsg.text}
              </p>
            )}

            {/* Quick Apply Available Coupons */}
            {!appliedCoupon && (
              <div className="pt-2 space-y-2 border-t border-neutral-100">
                <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 block">
                  Available Vouchers
                </span>
                {AVAILABLE_COUPONS.map((cp) => (
                  <div
                    key={cp.code}
                    className="flex items-center justify-between p-2 rounded-lg border border-dashed border-neutral-200 hover:border-neutral-400 bg-neutral-50/50"
                  >
                    <div>
                      <span className="font-mono text-xs font-bold text-neutral-900">
                        {cp.code}
                      </span>
                      <p className="text-[10px] text-neutral-500">{cp.description}</p>
                    </div>
                    <button
                      onClick={() => handleApplyCoupon(cp.code)}
                      className="text-xs font-bold text-neutral-950 hover:underline cursor-pointer"
                    >
                      APPLY
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Price Breakdown Card */}
          <div className="p-5 bg-white rounded-2xl border border-neutral-200 shadow-xs space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-900 border-b border-neutral-100 pb-2.5">
              ORDER SUMMARY ({cart.length} ITEMS)
            </h3>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between text-neutral-600">
                <span>Total MRP</span>
                <span>₹{cartSummary.totalMRP.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-emerald-600">
                <span>Bag Discount</span>
                <span>-₹{cartSummary.discount.toLocaleString('en-IN')}</span>
              </div>
              {cartSummary.couponDiscount > 0 && (
                <div className="flex justify-between text-emerald-600">
                  <span>Coupon Discount ({appliedCoupon?.code})</span>
                  <span>-₹{cartSummary.couponDiscount.toLocaleString('en-IN')}</span>
                </div>
              )}
              <div className="flex justify-between text-neutral-600">
                <span>Estimated Delivery Fee</span>
                {cartSummary.deliveryFee === 0 ? (
                  <span className="text-emerald-600 font-bold">FREE</span>
                ) : (
                  <span>₹{cartSummary.deliveryFee}</span>
                )}
              </div>

              <div className="pt-3 border-t border-neutral-200 flex justify-between text-base font-bold text-neutral-950">
                <span>Total Amount</span>
                <span>₹{cartSummary.finalTotal.toLocaleString('en-IN')}</span>
              </div>
            </div>

            {/* Checkout Button */}
            <button
              onClick={() => navigateTo('checkout')}
              className="w-full mt-4 py-4 bg-neutral-950 hover:bg-black text-white text-xs font-bold rounded-xl uppercase tracking-widest flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg hover:scale-[1.01]"
            >
              <span>PROCEED TO CHECKOUT</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Trust Assurances */}
          <div className="p-4 bg-neutral-50 rounded-2xl border border-neutral-200 space-y-2 text-xs text-neutral-600">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>100% Authentic Atelier Fabrics & Tailoring</span>
            </div>
            <div className="flex items-center gap-2">
              <RotateCcw className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>7-Day Hassle-Free Doorstep Pickup</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

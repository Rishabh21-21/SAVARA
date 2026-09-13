import React, { useState } from 'react';
import {
  User,
  Package,
  Heart,
  MapPin,
  Wallet,
  Bell,
  LogOut,
  Download,
  RotateCcw,
  Truck,
  CheckCircle2,
  Clock,
  ChevronRight,
  ShieldCheck,
  Plus,
  Trash2,
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { ProductCard } from '../components/ProductCard';

export const AccountView: React.FC = () => {
  const {
    userProfile,
    updateUserProfile,
    orders,
    wishlist,
    products,
    accountActiveTab,
    setAccountActiveTab,
    requestOrderReturn,
    navigateTo,
  } = useShop();

  // Return modal state
  const [selectedOrderForReturn, setSelectedOrderForReturn] = useState<string | null>(null);
  const [returnType, setReturnType] = useState<'return' | 'exchange'>('return');
  const [returnReason, setReturnReason] = useState('Size too large, need smaller fit');
  const [refundTarget, setRefundTarget] = useState<'Original' | 'Wallet'>('Wallet');

  // Edit profile state
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [nameInput, setNameInput] = useState(userProfile.name);
  const [emailInput, setEmailInput] = useState(userProfile.email);
  const [phoneInput, setPhoneInput] = useState(userProfile.phone);

  const wishlistProducts = products.filter((p) => wishlist.includes(p.id));

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateUserProfile({
      name: nameInput,
      email: emailInput,
      phone: phoneInput,
    });
    setIsEditingProfile(false);
  };

  const handleConfirmReturn = () => {
    if (selectedOrderForReturn) {
      requestOrderReturn(selectedOrderForReturn, returnReason, returnType);
      setSelectedOrderForReturn(null);
      alert(
        `Your ${returnType} request has been recorded. Free doorstep pickup has been scheduled with Delhivery Logistics.`
      );
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Top Profile Card */}
      <div className="bg-white rounded-2xl border border-neutral-200 p-6 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-6 mb-8">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-neutral-900 text-white flex items-center justify-center font-serif-luxury text-2xl font-bold border-2 border-amber-400">
            {userProfile.name.charAt(0)}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-serif-luxury text-xl font-bold text-neutral-950">
                {userProfile.name}
              </h1>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 bg-neutral-900 text-amber-300 rounded">
                SAVARA NOIR MEMBER
              </span>
            </div>
            <p className="text-xs text-neutral-500">{userProfile.email} • +91 {userProfile.phone}</p>
          </div>
        </div>

        <div className="flex gap-4">
          <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-200 text-center min-w-[120px]">
            <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 block">
              SAVARA CREDITS
            </span>
            <span className="text-base font-bold text-neutral-950 mt-0.5 block">
              ₹{userProfile.walletBalance}
            </span>
          </div>
          <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-200 text-center min-w-[120px]">
            <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 block">
              LOYALTY TIER
            </span>
            <span className="text-base font-bold text-neutral-950 mt-0.5 block">
              ATELIER GOLD
            </span>
          </div>
        </div>
      </div>

      {/* Main Dashboard Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Sidebar Menu (3 cols) */}
        <aside className="lg:col-span-3 space-y-1">
          {[
            { id: 'overview', label: 'Dashboard Overview', icon: User },
            { id: 'orders', label: `Orders & Tracking (${orders.length})`, icon: Package },
            { id: 'wishlist', label: `Wishlist (${wishlist.length})`, icon: Heart },
            { id: 'addresses', label: 'Saved Addresses', icon: MapPin },
            { id: 'wallet', label: 'SAVARA Wallet', icon: Wallet },
            { id: 'notifications', label: 'Notifications', icon: Bell },
          ].map((item) => {
            const Icon = item.icon;
            const active = accountActiveTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setAccountActiveTab(item.id as any)}
                className={`w-full p-3 rounded-xl text-left text-xs font-bold flex items-center justify-between transition-colors cursor-pointer ${
                  active
                    ? 'bg-neutral-950 text-white shadow-sm'
                    : 'text-neutral-700 hover:bg-neutral-100'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 opacity-60" />
              </button>
            );
          })}

          <div className="pt-4 border-t border-neutral-200 mt-4">
            <button
              onClick={() => {
                alert('Signed out of SAVARA Atelier account.');
                navigateTo('home');
              }}
              className="w-full p-3 text-left text-xs font-bold text-rose-600 hover:bg-rose-50 rounded-xl flex items-center gap-2.5 transition-colors cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              <span>Log Out</span>
            </button>
          </div>
        </aside>

        {/* Right Content Panels (9 cols) */}
        <div className="lg:col-span-9 bg-white rounded-2xl border border-neutral-200 p-6 shadow-xs min-h-[500px]">
          {/* 1. OVERVIEW TAB */}
          {accountActiveTab === 'overview' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-neutral-200">
                <h2 className="font-serif-luxury text-xl font-bold text-neutral-950">
                  Account Overview
                </h2>
                <button
                  onClick={() => setIsEditingProfile(!isEditingProfile)}
                  className="text-xs font-bold text-neutral-900 underline hover:text-black cursor-pointer"
                >
                  {isEditingProfile ? 'Cancel' : 'Edit Profile'}
                </button>
              </div>

              {isEditingProfile ? (
                <form onSubmit={handleSaveProfile} className="space-y-4 max-w-md">
                  <div>
                    <label className="text-xs font-bold uppercase text-neutral-600 block mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={nameInput}
                      onChange={(e) => setNameInput(e.target.value)}
                      className="w-full p-2.5 text-xs border border-neutral-300 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold uppercase text-neutral-600 block mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={emailInput}
                      onChange={(e) => setEmailInput(e.target.value)}
                      className="w-full p-2.5 text-xs border border-neutral-300 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold uppercase text-neutral-600 block mb-1">
                      Mobile Number
                    </label>
                    <input
                      type="tel"
                      value={phoneInput}
                      onChange={(e) => setPhoneInput(e.target.value)}
                      className="w-full p-2.5 text-xs border border-neutral-300 rounded-lg"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-neutral-950 text-white text-xs font-bold rounded-xl"
                  >
                    SAVE CHANGES
                  </button>
                </form>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-200">
                    <span className="text-[10px] uppercase font-bold text-neutral-400 block">
                      Name
                    </span>
                    <span className="text-sm font-bold text-neutral-900 mt-1 block">
                      {userProfile.name}
                    </span>
                  </div>
                  <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-200">
                    <span className="text-[10px] uppercase font-bold text-neutral-400 block">
                      Email
                    </span>
                    <span className="text-sm font-bold text-neutral-900 mt-1 block">
                      {userProfile.email}
                    </span>
                  </div>
                  <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-200">
                    <span className="text-[10px] uppercase font-bold text-neutral-400 block">
                      Phone Number
                    </span>
                    <span className="text-sm font-bold text-neutral-900 mt-1 block">
                      +91 {userProfile.phone}
                    </span>
                  </div>
                  <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-200">
                    <span className="text-[10px] uppercase font-bold text-neutral-400 block">
                      Primary Address
                    </span>
                    <span className="text-xs font-semibold text-neutral-900 mt-1 block">
                      {userProfile.addresses[0]?.street}, {userProfile.addresses[0]?.city}
                    </span>
                  </div>
                </div>
              )}

              {/* Recent Orders Quick Preview */}
              <div className="pt-6 border-t border-neutral-200">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-900">
                    Recent Orders
                  </h3>
                  <button
                    onClick={() => setAccountActiveTab('orders')}
                    className="text-xs text-neutral-900 font-semibold underline"
                  >
                    View All Orders
                  </button>
                </div>
                {orders.slice(0, 1).map((ord) => (
                  <div key={ord.id} className="p-4 bg-neutral-50 rounded-xl border border-neutral-200 flex justify-between items-center">
                    <div>
                      <span className="font-mono text-xs font-bold text-neutral-900">
                        {ord.orderNumber}
                      </span>
                      <p className="text-xs text-neutral-500 mt-0.5">
                        Status: <strong className="text-emerald-700">{ord.status}</strong> • ₹{ord.totalAmount.toLocaleString('en-IN')}
                      </p>
                    </div>
                    <button
                      onClick={() => setAccountActiveTab('orders')}
                      className="px-3.5 py-1.5 bg-neutral-900 text-white text-xs font-bold rounded-lg"
                    >
                      Track Order
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 2. ORDERS & VISUAL TIMELINE TAB */}
          {accountActiveTab === 'orders' && (
            <div className="space-y-6">
              <div className="pb-4 border-b border-neutral-200">
                <h2 className="font-serif-luxury text-xl font-bold text-neutral-950">
                  My Orders & Shipment Tracking
                </h2>
                <p className="text-xs text-neutral-500 mt-0.5">
                  Real-time status updates from our logistics network
                </p>
              </div>

              {orders.length === 0 ? (
                <div className="py-12 text-center text-neutral-500 text-xs">
                  No orders placed yet.
                </div>
              ) : (
                <div className="space-y-6">
                  {orders.map((ord) => {
                    const statusSteps = [
                      'Ordered',
                      'Confirmed',
                      'Shipped',
                      'Out for Delivery',
                      'Delivered',
                    ];
                    let currentStepIndex = 1;
                    if (ord.status === 'Shipped') currentStepIndex = 2;
                    if (ord.status === 'Out for Delivery') currentStepIndex = 3;
                    if (ord.status === 'Delivered') currentStepIndex = 4;

                    return (
                      <div
                        key={ord.id}
                        className="p-5 rounded-2xl border border-neutral-200 bg-white shadow-xs space-y-4"
                      >
                        {/* Order Header */}
                        <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-neutral-100 text-xs">
                          <div>
                            <span className="font-mono font-bold text-neutral-950">
                              #{ord.orderNumber}
                            </span>
                            <span className="text-neutral-400 ml-2">Placed on {ord.date}</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="font-bold text-neutral-950">
                              ₹{ord.totalAmount.toLocaleString('en-IN')}
                            </span>
                            <span className="px-2.5 py-0.5 bg-neutral-100 font-semibold text-neutral-800 rounded">
                              {ord.paymentMethod}
                            </span>
                          </div>
                        </div>

                        {/* Visual Progress Timeline */}
                        <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-200">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-xs font-bold text-neutral-950 flex items-center gap-1.5">
                              <Truck className="w-4 h-4 text-neutral-700" />
                              <span>{ord.courierPartner} Tracking ID: {ord.trackingId}</span>
                            </span>
                            <span className="text-xs text-emerald-700 font-bold">
                              ETA: {ord.estimatedDeliveryDate}
                            </span>
                          </div>

                          {/* Progress Line */}
                          <div className="flex items-center justify-between mt-4 relative">
                            {statusSteps.map((st, i) => (
                              <div key={st} className="flex flex-col items-center z-10">
                                <div
                                  className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${
                                    i <= currentStepIndex
                                      ? 'bg-neutral-950 text-white'
                                      : 'bg-neutral-200 text-neutral-500'
                                  }`}
                                >
                                  {i <= currentStepIndex ? '✓' : i + 1}
                                </div>
                                <span className="text-[10px] text-neutral-600 mt-1 font-medium text-center">
                                  {st}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Items in order */}
                        <div className="divide-y divide-neutral-100">
                          {ord.items.map((item) => (
                            <div key={item.id} className="py-2.5 flex items-center justify-between gap-4">
                              <div className="flex items-center gap-3">
                                <img
                                  src={item.image}
                                  alt={item.name}
                                  className="w-12 h-14 object-cover rounded-lg"
                                />
                                <div>
                                  <h4 className="text-xs font-bold text-neutral-900">{item.name}</h4>
                                  <span className="text-[10px] text-neutral-500">
                                    Size: {item.size} • Color: {item.color} • Qty: {item.quantity}
                                  </span>
                                </div>
                              </div>
                              <span className="text-xs font-bold text-neutral-950">
                                ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                              </span>
                            </div>
                          ))}
                        </div>

                        {/* Order Actions */}
                        <div className="flex flex-wrap gap-2 pt-2 border-t border-neutral-100">
                          <button
                            onClick={() => {
                              setSelectedOrderForReturn(ord.id);
                            }}
                            className="px-4 py-2 border border-neutral-300 hover:border-neutral-900 text-xs font-bold rounded-lg transition-colors cursor-pointer flex items-center gap-1.5"
                          >
                            <RotateCcw className="w-3.5 h-3.5" />
                            <span>Return / Exchange</span>
                          </button>

                          <button
                            onClick={() => alert(`Tax Invoice for ${ord.orderNumber} generated.`)}
                            className="px-4 py-2 border border-neutral-300 hover:border-neutral-900 text-xs font-bold rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 text-neutral-700"
                          >
                            <Download className="w-3.5 h-3.5" />
                            <span>Download Invoice</span>
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* 3. WISHLIST TAB */}
          {accountActiveTab === 'wishlist' && (
            <div className="space-y-6">
              <div className="pb-4 border-b border-neutral-200">
                <h2 className="font-serif-luxury text-xl font-bold text-neutral-950">
                  My Saved Wishlist ({wishlistProducts.length})
                </h2>
                <p className="text-xs text-neutral-500 mt-0.5">
                  Items saved for future atelier acquisitions
                </p>
              </div>

              {wishlistProducts.length === 0 ? (
                <div className="py-12 text-center text-neutral-500 text-xs">
                  Your wishlist is empty. Tap the heart icon on any product to save it here!
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {wishlistProducts.map((p) => (
                    <ProductCard key={p.id} product={p} />
                  ))}
                </div>
              )}
            </div>
          )}

          {/* 4. ADDRESSES TAB */}
          {accountActiveTab === 'addresses' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-neutral-200">
                <h2 className="font-serif-luxury text-xl font-bold text-neutral-950">
                  Saved Delivery Addresses
                </h2>
                <button
                  onClick={() => alert('Add Address dialog')}
                  className="px-4 py-2 bg-neutral-950 text-white text-xs font-bold rounded-xl"
                >
                  + ADD NEW ADDRESS
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {userProfile.addresses.map((addr) => (
                  <div key={addr.id} className="p-4 rounded-xl border border-neutral-200 space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold text-neutral-900">{addr.name}</span>
                      <span className="text-[10px] uppercase font-bold px-2 py-0.5 bg-neutral-100 rounded">
                        {addr.type}
                      </span>
                    </div>
                    <p className="text-xs text-neutral-600">{addr.street}</p>
                    <p className="text-xs text-neutral-600">
                      {addr.city}, {addr.state} - {addr.pincode}
                    </p>
                    <p className="text-xs text-neutral-700 font-medium">Phone: +91 {addr.phone}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 5. WALLET TAB */}
          {accountActiveTab === 'wallet' && (
            <div className="space-y-6">
              <div className="pb-4 border-b border-neutral-200">
                <h2 className="font-serif-luxury text-xl font-bold text-neutral-950">
                  SAVARA Store Credit & Wallet
                </h2>
                <p className="text-xs text-neutral-500 mt-0.5">
                  Instant refunds and promotional rewards credited directly
                </p>
              </div>

              <div className="p-6 bg-neutral-950 text-white rounded-2xl flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                    AVAILABLE BALANCE
                  </span>
                  <div className="text-3xl font-bold mt-1">₹{userProfile.walletBalance}</div>
                  <p className="text-[11px] text-neutral-400 mt-1">
                    Auto-applies at checkout for 1-click zero hassle payments
                  </p>
                </div>
                <div className="p-4 bg-white/10 rounded-2xl">
                  <Wallet className="w-8 h-8 text-amber-400" />
                </div>
              </div>
            </div>
          )}

          {/* 6. NOTIFICATIONS TAB */}
          {accountActiveTab === 'notifications' && (
            <div className="space-y-4">
              <h2 className="font-serif-luxury text-xl font-bold text-neutral-950 pb-4 border-b border-neutral-200">
                VIP Notifications & Drop Alerts
              </h2>
              <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-200 text-xs">
                <span className="font-bold text-neutral-900 block">
                  Midnight Archive Sale live now!
                </span>
                <p className="text-neutral-500 mt-0.5">
                  Enjoy up to 40% off on signature heavyweight hoodies and cargo silhouettes.
                </p>
              </div>
              <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-200 text-xs">
                <span className="font-bold text-neutral-900 block">
                  Order #SAVARA-2026-9041 Dispatched
                </span>
                <p className="text-neutral-500 mt-0.5">
                  Your order is en-route with Blue Dart Apex Air.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Return / Exchange Modal */}
      {selectedOrderForReturn && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full border border-neutral-200 shadow-2xl space-y-4">
            <h3 className="font-serif-luxury text-lg font-bold text-neutral-950">
              Request Doorstep Return / Exchange
            </h3>

            <div>
              <label className="text-xs font-bold uppercase text-neutral-600 block mb-1">
                Select Request Type
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setReturnType('return')}
                  className={`py-2 text-xs font-bold rounded-lg border ${
                    returnType === 'return'
                      ? 'bg-neutral-950 text-white border-neutral-950'
                      : 'border-neutral-300 text-neutral-700'
                  }`}
                >
                  Return for Refund
                </button>
                <button
                  type="button"
                  onClick={() => setReturnType('exchange')}
                  className={`py-2 text-xs font-bold rounded-lg border ${
                    returnType === 'exchange'
                      ? 'bg-neutral-950 text-white border-neutral-950'
                      : 'border-neutral-300 text-neutral-700'
                  }`}
                >
                  Exchange Size / Color
                </button>
              </div>
            </div>

            <div>
              <label className="text-xs font-bold uppercase text-neutral-600 block mb-1">
                Reason for Return
              </label>
              <select
                value={returnReason}
                onChange={(e) => setReturnReason(e.target.value)}
                className="w-full p-2.5 text-xs border border-neutral-300 rounded-lg focus:outline-none focus:border-neutral-900 bg-white"
              >
                <option value="Size too large, need smaller fit">Size too large, need smaller fit</option>
                <option value="Size too tight, need larger fit">Size too tight, need larger fit</option>
                <option value="Color shade difference from studio photos">Color shade difference from studio photos</option>
                <option value="Defective stitch or fabric flaw">Defective stitch or fabric flaw</option>
                <option value="Fabric feeling different than expected">Fabric feeling different than expected</option>
              </select>
            </div>

            {returnType === 'return' && (
              <div>
                <label className="text-xs font-bold uppercase text-neutral-600 block mb-1">
                  Refund Method
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setRefundTarget('Wallet')}
                    className={`py-2 text-xs font-bold rounded-lg border ${
                      refundTarget === 'Wallet'
                        ? 'bg-neutral-950 text-white border-neutral-950'
                        : 'border-neutral-300 text-neutral-700'
                    }`}
                  >
                    SAVARA Wallet (Instant)
                  </button>
                  <button
                    type="button"
                    onClick={() => setRefundTarget('Original')}
                    className={`py-2 text-xs font-bold rounded-lg border ${
                      refundTarget === 'Original'
                        ? 'bg-neutral-950 text-white border-neutral-950'
                        : 'border-neutral-300 text-neutral-700'
                    }`}
                  >
                    Original Payment Source
                  </button>
                </div>
              </div>
            )}

            <div className="flex gap-2 pt-2">
              <button
                onClick={() => setSelectedOrderForReturn(null)}
                className="flex-1 py-2.5 border border-neutral-300 rounded-xl text-xs font-bold text-neutral-700"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmReturn}
                className="flex-1 py-2.5 bg-neutral-950 hover:bg-black text-white rounded-xl text-xs font-bold"
              >
                CONFIRM PICKUP
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

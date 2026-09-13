import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import {
  CheckCircle2,
  ShieldCheck,
  CreditCard,
  Smartphone,
  Building,
  Truck,
  Download,
  ArrowRight,
  Sparkles,
  MapPin,
  Lock,
  QrCode,
  Check,
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { Address } from '../types';

export const CheckoutView: React.FC = () => {
  const {
    cart,
    cartSummary,
    userProfile,
    placeOrder,
    navigateTo,
    setAccountActiveTab,
  } = useShop();

  const [step, setStep] = useState<1 | 2 | 3 | 4 | 5>(1);

  // Step 1: Login / Phone state
  const [phoneNumber, setPhoneNumber] = useState(userProfile.phone || '9876543210');
  const [otp, setOtp] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);

  // Step 2: Address state
  const [selectedAddressId, setSelectedAddressId] = useState(userProfile.addresses[0]?.id || 'new');
  const [newAddress, setNewAddress] = useState<Omit<Address, 'id'>>({
    name: userProfile.name || 'Aryan Sharma',
    phone: userProfile.phone || '9876543210',
    street: 'Penthouse 4B, Sky High Heights, Indiranagar',
    city: 'Bengaluru',
    state: 'Karnataka',
    pincode: '560038',
    type: 'Home',
    isDefault: true,
  });

  // Step 3: Delivery Option state
  const [deliverySpeed, setDeliverySpeed] = useState<'standard' | 'express'>('standard');

  // Step 4: Payment state
  const [paymentMethod, setPaymentMethod] = useState<'UPI' | 'Card' | 'NetBanking' | 'COD' | 'Wallet'>('UPI');
  const [upiVpa, setUpiVpa] = useState('aryan@okhdfcbank');
  const [cardNumber, setCardNumber] = useState('•••• •••• •••• 4242');
  const [cardExpiry, setCardExpiry] = useState('12/28');
  const [cardCvv, setCardCvv] = useState('888');

  // Step 5: Completed Order Result
  const [completedOrderNumber, setCompletedOrderNumber] = useState<string | null>(null);

  if (cart.length === 0 && step !== 5) {
    return (
      <div className="max-w-md mx-auto py-20 px-4 text-center">
        <h2 className="font-serif-luxury text-xl font-bold text-neutral-900">Your bag is empty</h2>
        <p className="text-xs text-neutral-500 mt-2">Add items to bag to proceed with checkout.</p>
        <button
          onClick={() => navigateTo('catalog')}
          className="mt-6 px-6 py-3 bg-neutral-950 text-white text-xs font-bold rounded-xl"
        >
          EXPLORE CATALOG
        </button>
      </div>
    );
  }

  const handlePlaceOrder = () => {
    const chosenAddress: Address =
      selectedAddressId !== 'new' && userProfile.addresses.find((a) => a.id === selectedAddressId)
        ? userProfile.addresses.find((a) => a.id === selectedAddressId)!
        : { id: `addr-${Date.now()}`, ...newAddress };

    const newOrder = placeOrder(chosenAddress, paymentMethod);
    setCompletedOrderNumber(newOrder.orderNumber);
    setStep(5);

    // Trigger celebratory confetti
    try {
      confetti({
        particleCount: 120,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#000000', '#D4AF37', '#E5E5E5', '#10B981'],
      });
    } catch {
      // safe fallback
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Checkout Header */}
      <div className="flex items-center justify-between pb-6 border-b border-neutral-200">
        <div className="flex items-center gap-2">
          <span className="font-serif-luxury text-xl font-bold tracking-[0.15em] text-neutral-950">
            SAVARA
          </span>
          <span className="text-xs text-neutral-400 font-mono">SECURE CHECKOUT</span>
        </div>
        <div className="flex items-center gap-1 text-xs text-emerald-700 font-semibold bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
          <Lock className="w-3.5 h-3.5" />
          <span>256-Bit SSL Encrypted</span>
        </div>
      </div>

      {/* Progress Wizard Steps */}
      {step !== 5 && (
        <div className="flex items-center justify-between my-8 px-2">
          {[
            { num: 1, label: 'Identity' },
            { num: 2, label: 'Address' },
            { num: 3, label: 'Shipping' },
            { num: 4, label: 'Payment' },
          ].map((s) => (
            <div key={s.num} className="flex flex-col items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                  step === s.num
                    ? 'bg-neutral-950 text-white ring-4 ring-neutral-200'
                    : step > s.num
                    ? 'bg-emerald-600 text-white'
                    : 'bg-neutral-100 text-neutral-400'
                }`}
              >
                {step > s.num ? <Check className="w-4 h-4" /> : s.num}
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-600 mt-1.5 hidden sm:inline">
                {s.label}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Main Container */}
      <div className="bg-white rounded-2xl border border-neutral-200 p-6 sm:p-8 shadow-sm">
        {/* STEP 1: MOBILE / LOGIN */}
        {step === 1 && (
          <div className="space-y-6 max-w-lg mx-auto">
            <div className="text-center">
              <h2 className="font-serif-luxury text-2xl font-bold text-neutral-950">
                Log In or Continue as Guest
              </h2>
              <p className="text-xs text-neutral-500 mt-1">
                Enter your mobile number to retrieve your SAVARA VIP points, saved addresses and order updates.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-neutral-700 block mb-1.5">
                  Mobile Number (India)
                </label>
                <div className="flex rounded-xl border border-neutral-300 overflow-hidden focus-within:border-neutral-950">
                  <span className="px-3.5 py-3 bg-neutral-100 text-xs font-semibold text-neutral-700 border-r border-neutral-300">
                    +91
                  </span>
                  <input
                    type="tel"
                    maxLength={10}
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ''))}
                    placeholder="98765 43210"
                    className="flex-1 px-3.5 py-3 text-sm focus:outline-none"
                  />
                </div>
              </div>

              {isOtpSent && (
                <div className="animate-fade-in">
                  <label className="text-xs font-bold uppercase tracking-wider text-neutral-700 block mb-1.5">
                    Enter OTP sent to +91 {phoneNumber} (Use 1234)
                  </label>
                  <input
                    type="text"
                    maxLength={4}
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    placeholder="1234"
                    className="w-full px-3.5 py-3 text-center tracking-[0.5em] font-mono text-lg border border-neutral-300 rounded-xl focus:outline-none focus:border-neutral-950"
                  />
                </div>
              )}

              {isOtpSent ? (
                <button
                  onClick={() => setStep(2)}
                  className="w-full py-4 bg-neutral-950 hover:bg-black text-white text-xs font-bold uppercase tracking-widest rounded-xl transition-all cursor-pointer"
                >
                  VERIFY & PROCEED
                </button>
              ) : (
                <button
                  onClick={() => setIsOtpSent(true)}
                  className="w-full py-4 bg-neutral-950 hover:bg-black text-white text-xs font-bold uppercase tracking-widest rounded-xl transition-all cursor-pointer"
                >
                  SEND ONE-TIME PASSWORD
                </button>
              )}

              <div className="text-center pt-2">
                <button
                  onClick={() => setStep(2)}
                  className="text-xs text-neutral-500 hover:text-black underline font-medium cursor-pointer"
                >
                  Skip and Continue as Guest →
                </button>
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: DELIVERY ADDRESS */}
        {step === 2 && (
          <div className="space-y-6">
            <div>
              <h2 className="font-serif-luxury text-xl font-bold text-neutral-950">
                Select or Add Delivery Address
              </h2>
              <p className="text-xs text-neutral-500 mt-0.5">
                Where should we courier your SAVARA garments?
              </p>
            </div>

            {/* Saved Addresses List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {userProfile.addresses.map((addr) => (
                <div
                  key={addr.id}
                  onClick={() => setSelectedAddressId(addr.id)}
                  className={`p-4 rounded-xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                    selectedAddressId === addr.id
                      ? 'border-neutral-950 bg-neutral-50/70 shadow-sm'
                      : 'border-neutral-200 hover:border-neutral-400'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs font-bold text-neutral-950">{addr.name}</span>
                      <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 bg-neutral-200 rounded text-neutral-700">
                        {addr.type}
                      </span>
                    </div>
                    <p className="text-xs text-neutral-600 leading-relaxed">{addr.street}</p>
                    <p className="text-xs text-neutral-600">
                      {addr.city}, {addr.state} - {addr.pincode}
                    </p>
                    <p className="text-xs font-medium text-neutral-800 mt-2">
                      Phone: +91 {addr.phone}
                    </p>
                  </div>
                  {selectedAddressId === addr.id && (
                    <div className="mt-3 flex items-center gap-1.5 text-xs font-bold text-emerald-600">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Deliver to this address</span>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Option to create new address */}
            <div className="pt-4 border-t border-neutral-200">
              <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-900 mb-3">
                Or Enter New Shipping Address
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="text-neutral-600 font-medium block mb-1">Full Name</label>
                  <input
                    type="text"
                    value={newAddress.name}
                    onChange={(e) => setNewAddress({ ...newAddress, name: e.target.value })}
                    className="w-full p-2.5 border border-neutral-300 rounded-lg focus:outline-none focus:border-neutral-900"
                  />
                </div>
                <div>
                  <label className="text-neutral-600 font-medium block mb-1">Mobile Number</label>
                  <input
                    type="tel"
                    value={newAddress.phone}
                    onChange={(e) => setNewAddress({ ...newAddress, phone: e.target.value })}
                    className="w-full p-2.5 border border-neutral-300 rounded-lg focus:outline-none focus:border-neutral-900"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="text-neutral-600 font-medium block mb-1">
                    Flat, House No, Building, Street
                  </label>
                  <input
                    type="text"
                    value={newAddress.street}
                    onChange={(e) => setNewAddress({ ...newAddress, street: e.target.value })}
                    className="w-full p-2.5 border border-neutral-300 rounded-lg focus:outline-none focus:border-neutral-900"
                  />
                </div>
                <div>
                  <label className="text-neutral-600 font-medium block mb-1">City</label>
                  <input
                    type="text"
                    value={newAddress.city}
                    onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
                    className="w-full p-2.5 border border-neutral-300 rounded-lg focus:outline-none focus:border-neutral-900"
                  />
                </div>
                <div>
                  <label className="text-neutral-600 font-medium block mb-1">Pincode</label>
                  <input
                    type="text"
                    maxLength={6}
                    value={newAddress.pincode}
                    onChange={(e) => setNewAddress({ ...newAddress, pincode: e.target.value })}
                    className="w-full p-2.5 border border-neutral-300 rounded-lg focus:outline-none focus:border-neutral-900"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-between pt-4 border-t border-neutral-200">
              <button
                onClick={() => setStep(1)}
                className="px-5 py-2.5 border border-neutral-300 text-neutral-700 text-xs font-bold rounded-xl"
              >
                Back
              </button>
              <button
                onClick={() => setStep(3)}
                className="px-8 py-3 bg-neutral-950 hover:bg-black text-white text-xs font-bold uppercase tracking-widest rounded-xl transition-all cursor-pointer"
              >
                CONTINUE TO SHIPPING METHOD
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: DELIVERY SPEED */}
        {step === 3 && (
          <div className="space-y-6">
            <div>
              <h2 className="font-serif-luxury text-xl font-bold text-neutral-950">
                Choose Delivery Speed
              </h2>
              <p className="text-xs text-neutral-500 mt-0.5">
                All garments dispatched in our signature matte black recyclable packaging box.
              </p>
            </div>

            <div className="space-y-3">
              <label
                onClick={() => setDeliverySpeed('standard')}
                className={`flex items-center justify-between p-4 rounded-xl border-2 transition-all cursor-pointer ${
                  deliverySpeed === 'standard'
                    ? 'border-neutral-950 bg-neutral-50 shadow-sm'
                    : 'border-neutral-200 hover:border-neutral-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                      deliverySpeed === 'standard' ? 'border-neutral-950 bg-neutral-950' : 'border-neutral-300'
                    }`}
                  >
                    {deliverySpeed === 'standard' && <div className="w-1.5 h-1.5 rounded-full bg-white"></div>}
                  </div>
                  <div>
                    <span className="text-xs font-bold text-neutral-950 block">
                      Standard Domestic Express (3–5 Business Days)
                    </span>
                    <span className="text-[11px] text-neutral-500">
                      Dispatched via Blue Dart / Delhivery Air
                    </span>
                  </div>
                </div>
                <span className="text-xs font-bold text-emerald-600">FREE</span>
              </label>

              <label
                onClick={() => setDeliverySpeed('express')}
                className={`flex items-center justify-between p-4 rounded-xl border-2 transition-all cursor-pointer ${
                  deliverySpeed === 'express'
                    ? 'border-neutral-950 bg-neutral-50 shadow-sm'
                    : 'border-neutral-200 hover:border-neutral-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                      deliverySpeed === 'express' ? 'border-neutral-950 bg-neutral-950' : 'border-neutral-300'
                    }`}
                  >
                    {deliverySpeed === 'express' && <div className="w-1.5 h-1.5 rounded-full bg-white"></div>}
                  </div>
                  <div>
                    <span className="text-xs font-bold text-neutral-950 block">
                      Priority Next-Day Air Dispatch (1–2 Days)
                    </span>
                    <span className="text-[11px] text-neutral-500">
                      Guaranteed morning slot with priority fulfillment
                    </span>
                  </div>
                </div>
                <span className="text-xs font-bold text-neutral-950">₹99</span>
              </label>
            </div>

            <div className="flex justify-between pt-4 border-t border-neutral-200">
              <button
                onClick={() => setStep(2)}
                className="px-5 py-2.5 border border-neutral-300 text-neutral-700 text-xs font-bold rounded-xl"
              >
                Back
              </button>
              <button
                onClick={() => setStep(4)}
                className="px-8 py-3 bg-neutral-950 hover:bg-black text-white text-xs font-bold uppercase tracking-widest rounded-xl transition-all cursor-pointer"
              >
                PROCEED TO PAYMENT
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: PAYMENT OPTIONS */}
        {step === 4 && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-serif-luxury text-xl font-bold text-neutral-950">
                  Select Payment Method
                </h2>
                <p className="text-xs text-neutral-500 mt-0.5">
                  Amount Payable:{' '}
                  <strong className="text-neutral-950 text-sm">
                    ₹{(cartSummary.finalTotal + (deliverySpeed === 'express' ? 99 : 0)).toLocaleString('en-IN')}
                  </strong>
                </p>
              </div>
              <div className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 bg-amber-50 text-amber-800 rounded-md border border-amber-200">
                SAVARA Wallet Credit: ₹{userProfile.walletBalance}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Payment selector left column */}
              <div className="space-y-2">
                {[
                  { id: 'UPI', label: 'UPI (GPay / PhonePe / Paytm)', icon: Smartphone },
                  { id: 'Card', label: 'Credit / Debit Cards', icon: CreditCard },
                  { id: 'NetBanking', label: 'Net Banking', icon: Building },
                  { id: 'COD', label: 'Cash On Delivery', icon: Truck },
                  { id: 'Wallet', label: `SAVARA Wallet (₹${userProfile.walletBalance})`, icon: Sparkles },
                ].map((item) => {
                  const Icon = item.icon;
                  const active = paymentMethod === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setPaymentMethod(item.id as any)}
                      className={`w-full p-3 rounded-xl border text-left text-xs font-bold flex items-center gap-2.5 transition-all cursor-pointer ${
                        active
                          ? 'border-neutral-950 bg-neutral-950 text-white shadow-sm'
                          : 'border-neutral-200 bg-neutral-50 hover:bg-white text-neutral-700'
                      }`}
                    >
                      <Icon className="w-4 h-4 shrink-0" />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Payment details right column */}
              <div className="md:col-span-2 p-5 bg-neutral-50 rounded-2xl border border-neutral-200 flex flex-col justify-between">
                {paymentMethod === 'UPI' && (
                  <div className="space-y-4">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-900">
                      Instant UPI Payment
                    </h4>
                    <div>
                      <label className="text-[11px] font-semibold text-neutral-600 block mb-1">
                        Enter UPI Virtual ID (e.g. mobile@upi)
                      </label>
                      <input
                        type="text"
                        value={upiVpa}
                        onChange={(e) => setUpiVpa(e.target.value)}
                        placeholder="yourname@okhdfcbank"
                        className="w-full p-2.5 text-xs border border-neutral-300 rounded-xl bg-white focus:outline-none focus:border-neutral-900 font-mono"
                      />
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-white rounded-xl border border-neutral-200">
                      <QrCode className="w-10 h-10 text-neutral-800" />
                      <div className="text-[11px] text-neutral-600">
                        Scan QR code with Google Pay, PhonePe, Paytm or BHIM app on next screen.
                      </div>
                    </div>
                  </div>
                )}

                {paymentMethod === 'Card' && (
                  <div className="space-y-3">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-900">
                      Credit or Debit Card
                    </h4>
                    <div>
                      <label className="text-[11px] font-semibold text-neutral-600 block mb-1">
                        Card Number
                      </label>
                      <input
                        type="text"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        className="w-full p-2.5 text-xs border border-neutral-300 rounded-xl bg-white focus:outline-none focus:border-neutral-900 font-mono"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-[11px] font-semibold text-neutral-600 block mb-1">
                          Valid Thru (MM/YY)
                        </label>
                        <input
                          type="text"
                          value={cardExpiry}
                          onChange={(e) => setCardExpiry(e.target.value)}
                          className="w-full p-2.5 text-xs border border-neutral-300 rounded-xl bg-white focus:outline-none focus:border-neutral-900 font-mono"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] font-semibold text-neutral-600 block mb-1">
                          CVV
                        </label>
                        <input
                          type="password"
                          maxLength={3}
                          value={cardCvv}
                          onChange={(e) => setCardCvv(e.target.value)}
                          className="w-full p-2.5 text-xs border border-neutral-300 rounded-xl bg-white focus:outline-none focus:border-neutral-900 font-mono"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {paymentMethod === 'COD' && (
                  <div className="space-y-2">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-900">
                      Cash on Delivery
                    </h4>
                    <p className="text-xs text-neutral-600 leading-relaxed">
                      Pay in cash or through UPI QR code at the time of delivery to the courier executive.
                    </p>
                    <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-[11px] text-amber-800">
                      Please keep exact cash ready. You will receive an SMS with the OTP when the package is out for delivery.
                    </div>
                  </div>
                )}

                {paymentMethod === 'Wallet' && (
                  <div className="space-y-2">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-900">
                      SAVARA Store Credit
                    </h4>
                    <p className="text-xs text-neutral-600">
                      Current balance: <strong>₹{userProfile.walletBalance}</strong>
                    </p>
                    <p className="text-[11px] text-emerald-700 bg-emerald-50 p-2.5 rounded-xl border border-emerald-200">
                      Store credit will be automatically debited. No additional OTP required.
                    </p>
                  </div>
                )}

                {paymentMethod === 'NetBanking' && (
                  <div className="space-y-2">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-900">
                      Popular Indian Banks
                    </h4>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      {['HDFC Bank', 'ICICI Bank', 'SBI', 'Axis Bank', 'Kotak', 'Others'].map(
                        (b) => (
                          <div
                            key={b}
                            className="p-2 border border-neutral-200 rounded-lg bg-white text-center font-medium hover:border-neutral-900 cursor-pointer"
                          >
                            {b}
                          </div>
                        )
                      )}
                    </div>
                  </div>
                )}

                <div className="pt-6">
                  <button
                    onClick={handlePlaceOrder}
                    className="w-full py-4 bg-neutral-950 hover:bg-black text-white text-xs font-bold uppercase tracking-widest rounded-xl transition-all cursor-pointer shadow-xl flex items-center justify-center gap-2"
                  >
                    <ShieldCheck className="w-4 h-4 text-amber-400" />
                    <span>CONFIRM & PLACE ORDER</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="flex justify-between pt-4 border-t border-neutral-200">
              <button
                onClick={() => setStep(3)}
                className="px-5 py-2.5 border border-neutral-300 text-neutral-700 text-xs font-bold rounded-xl"
              >
                Back
              </button>
            </div>
          </div>
        )}

        {/* STEP 5: ORDER SUCCESS */}
        {step === 5 && (
          <div className="py-10 text-center max-w-lg mx-auto space-y-6 animate-fade-in">
            <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
              <Check className="w-10 h-10 stroke-[3]" />
            </div>

            <div>
              <span className="text-[11px] uppercase font-bold tracking-[0.25em] text-amber-600">
                SAVARA VIP ORDER CONFIRMED
              </span>
              <h2 className="font-serif-luxury text-3xl font-bold text-neutral-950 mt-1">
                Order Placed Successfully!
              </h2>
              <p className="text-xs text-neutral-500 mt-2">
                Thank you for choosing SAVARA. We are preparing your garments with bespoke care.
              </p>
            </div>

            <div className="p-5 bg-neutral-50 rounded-2xl border border-neutral-200 text-left space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-neutral-500">Order Reference:</span>
                <span className="font-mono font-bold text-neutral-950">
                  {completedOrderNumber || 'SAVARA-2026-9041'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Estimated Delivery:</span>
                <span className="font-bold text-neutral-950">
                  {new Date(Date.now() + 86400000 * 3).toLocaleDateString('en-IN', {
                    weekday: 'long',
                    month: 'short',
                    day: 'numeric',
                  })}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Payment Status:</span>
                <span className="font-bold text-emerald-600">
                  {paymentMethod === 'COD' ? 'Pay on Delivery (Verified)' : 'Paid Online'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Courier Partner:</span>
                <span className="font-medium text-neutral-900">Blue Dart Apex Air</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
              <button
                onClick={() => {
                  setAccountActiveTab('orders');
                  navigateTo('account');
                }}
                className="px-6 py-3.5 bg-neutral-950 hover:bg-black text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all cursor-pointer"
              >
                TRACK ORDER REAL-TIME
              </button>
              <button
                onClick={() => {
                  alert('Tax Invoice PDF generation downloaded to your system.');
                }}
                className="px-6 py-3.5 border border-neutral-300 hover:border-neutral-900 text-neutral-800 text-xs font-bold uppercase tracking-wider rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>DOWNLOAD INVOICE</span>
              </button>
            </div>

            <button
              onClick={() => navigateTo('home')}
              className="text-xs text-neutral-500 hover:text-black font-semibold underline block mx-auto"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

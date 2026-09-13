import React, { useState } from 'react';
import { Mail, ArrowRight, Instagram, Facebook, Youtube, ShieldCheck, Truck, RotateCcw, Award } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const Footer: React.FC = () => {
  const { navigateTo, setIsSupportOpen, setAccountActiveTab } = useShop();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  return (
    <footer className="bg-neutral-950 text-white border-t border-neutral-800">
      {/* Brand Value Props Banner */}
      <div className="border-b border-neutral-800 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center sm:text-left">
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <div className="p-3 rounded-full bg-neutral-900 border border-neutral-800 text-amber-400">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h5 className="text-xs font-bold uppercase tracking-wider text-white">
                Complimentary Shipping
              </h5>
              <p className="text-[11px] text-neutral-400">On all domestic orders over ₹1,999</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3">
            <div className="p-3 rounded-full bg-neutral-900 border border-neutral-800 text-amber-400">
              <RotateCcw className="w-5 h-5" />
            </div>
            <div>
              <h5 className="text-xs font-bold uppercase tracking-wider text-white">
                7-Day Seamless Returns
              </h5>
              <p className="text-[11px] text-neutral-400">Doorstep pickups with zero hassle</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3">
            <div className="p-3 rounded-full bg-neutral-900 border border-neutral-800 text-amber-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h5 className="text-xs font-bold uppercase tracking-wider text-white">
                Secure PCI-DSS Payments
              </h5>
              <p className="text-[11px] text-neutral-400">Razorpay 256-bit encrypted checkout</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3">
            <div className="p-3 rounded-full bg-neutral-900 border border-neutral-800 text-amber-400">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h5 className="text-xs font-bold uppercase tracking-wider text-white">
                Atelier Luxury Quality
              </h5>
              <p className="text-[11px] text-neutral-400">280–420 GSM combed organic fabrics</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto py-14 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand & Manifesto */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <span className="font-serif-luxury text-2xl font-bold tracking-[0.2em] text-white">
                SAVARA
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
            </div>
            <p className="font-serif-luxury italic text-amber-300/90 text-sm">
              &ldquo;Wear Your Statement.&rdquo;
            </p>
            <p className="text-xs text-neutral-400 max-w-sm leading-relaxed">
              Premium contemporary fashion for men and women. Designed in Mumbai and Bengaluru, crafted with uncompromising architectural silhouettes, heavyweight cottons, and timeless modern proportion.
            </p>

            {/* Newsletter Form */}
            <div className="pt-2">
              <h6 className="text-xs font-bold uppercase tracking-wider text-white mb-1.5">
                JOIN THE SAVARA COMMUNITY
              </h6>
              <p className="text-[11px] text-neutral-400 mb-3">
                Get early access to limited drops, private collections and secret archive sales.
              </p>

              {subscribed ? (
                <div className="p-3 bg-neutral-900 border border-amber-400/40 rounded-xl text-xs text-amber-300 font-medium">
                  Welcome to SAVARA. Check your inbox for your 15% welcome voucher!
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-2 max-w-md">
                  <div className="relative flex-1">
                    <Mail className="w-4 h-4 text-neutral-500 absolute left-3 top-3" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      className="w-full pl-9 pr-3 py-2.5 bg-neutral-900 border border-neutral-800 rounded-xl text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-white hover:bg-neutral-200 text-neutral-950 text-xs font-bold rounded-xl transition-colors shrink-0 uppercase tracking-wider cursor-pointer"
                  >
                    SUBSCRIBE
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Customer Service Links */}
          <div>
            <h6 className="text-xs font-bold uppercase tracking-widest text-neutral-200 mb-4">
              CUSTOMER SERVICE
            </h6>
            <ul className="space-y-2.5 text-xs text-neutral-400">
              <li>
                <button
                  onClick={() => setIsSupportOpen(true)}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Contact Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => setIsSupportOpen(true)}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Help & FAQs
                </button>
              </li>
              <li>
                <button
                  onClick={() => setIsSupportOpen(true)}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Shipping & Delivery
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setAccountActiveTab('orders');
                    navigateTo('account');
                  }}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Returns & Exchange
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setAccountActiveTab('orders');
                    navigateTo('account');
                  }}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Track Order
                </button>
              </li>
            </ul>
          </div>

          {/* About SAVARA */}
          <div>
            <h6 className="text-xs font-bold uppercase tracking-widest text-neutral-200 mb-4">
              ABOUT SAVARA
            </h6>
            <ul className="space-y-2.5 text-xs text-neutral-400">
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">Our Story</span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">Atelier Process</span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">Sustainability</span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">Careers</span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">Flagship Stores</span>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('admin')}
                  className="text-amber-400 hover:text-amber-300 transition-colors font-medium text-[11px]"
                >
                  Admin Management Portal →
                </button>
              </li>
            </ul>
          </div>

          {/* Legal & Social */}
          <div>
            <h6 className="text-xs font-bold uppercase tracking-widest text-neutral-200 mb-4">
              LEGAL & POLICIES
            </h6>
            <ul className="space-y-2.5 text-xs text-neutral-400">
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">Privacy Policy</span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">Terms & Conditions</span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">Cookie Policy</span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">Refund Policy</span>
              </li>
            </ul>

            <div className="mt-6">
              <h6 className="text-xs font-bold uppercase tracking-widest text-neutral-200 mb-3">
                FOLLOW US
              </h6>
              <div className="flex gap-3 text-neutral-400">
                <span className="p-2 rounded-lg bg-neutral-900 hover:text-white hover:bg-neutral-800 transition-colors cursor-pointer">
                  <Instagram className="w-4 h-4" />
                </span>
                <span className="p-2 rounded-lg bg-neutral-900 hover:text-white hover:bg-neutral-800 transition-colors cursor-pointer">
                  <Facebook className="w-4 h-4" />
                </span>
                <span className="p-2 rounded-lg bg-neutral-900 hover:text-white hover:bg-neutral-800 transition-colors cursor-pointer">
                  <Youtube className="w-4 h-4" />
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Payment Badges & Copyright */}
        <div className="mt-14 pt-8 border-t border-neutral-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <div>
            <p>SAVARA © 2026. ALL RIGHTS RESERVED. Contemporary Luxury Fashion.</p>
          </div>

          {/* Payment Methods */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[10px] uppercase font-bold tracking-wider text-neutral-400 mr-1">
              PAYMENT PARTNERS:
            </span>
            <span className="px-2 py-0.5 bg-neutral-900 border border-neutral-800 rounded text-[10px] text-neutral-300 font-mono">
              UPI
            </span>
            <span className="px-2 py-0.5 bg-neutral-900 border border-neutral-800 rounded text-[10px] text-neutral-300 font-mono">
              VISA
            </span>
            <span className="px-2 py-0.5 bg-neutral-900 border border-neutral-800 rounded text-[10px] text-neutral-300 font-mono">
              MASTERCARD
            </span>
            <span className="px-2 py-0.5 bg-neutral-900 border border-neutral-800 rounded text-[10px] text-neutral-300 font-mono">
              RAZORPAY
            </span>
            <span className="px-2 py-0.5 bg-neutral-900 border border-neutral-800 rounded text-[10px] text-neutral-300 font-mono">
              COD
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

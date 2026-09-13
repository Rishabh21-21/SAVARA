import React, { useState } from 'react';
import {
  DollarSign,
  Package,
  Users,
  ShoppingBag,
  Plus,
  Trash2,
  Edit2,
  TrendingUp,
  AlertTriangle,
  Tag,
  CheckCircle,
  Truck,
  ArrowRight,
  Search,
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { Product } from '../types';

export const AdminView: React.FC = () => {
  const {
    products,
    addProduct,
    deleteProduct,
    updateStock,
    orders,
    updateOrderStatus,
    navigateTo,
  } = useShop();

  const [adminTab, setAdminTab] = useState<'dashboard' | 'products' | 'orders' | 'customers' | 'inventory' | 'coupons'>('dashboard');

  // Product addition state
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [newProdName, setNewProdName] = useState('');
  const [newProdBrand, setNewProdBrand] = useState('SAVARA Atelier');
  const [newProdCategory, setNewProdCategory] = useState('T-Shirts');
  const [newProdGender, setNewProdGender] = useState<'Men' | 'Women' | 'Unisex'>('Men');
  const [newProdPrice, setNewProdPrice] = useState(1899);
  const [newProdOrigPrice, setNewProdOrigPrice] = useState(2599);
  const [newProdImage, setNewProdImage] = useState('https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80');
  const [newProdStock, setNewProdStock] = useState(24);
  const [newProdDesc, setNewProdDesc] = useState('Crafted from 280 GSM heavyweight combed cotton.');

  // Coupons state
  const [coupons, setCoupons] = useState([
    { code: 'SAVARA10', discount: 10, type: 'PERCENT', expires: '31 Dec 2026', uses: 84 },
    { code: 'SAVARA20', discount: 20, type: 'PERCENT', expires: '30 Jun 2026', uses: 122 },
    { code: 'FLAT500', discount: 500, type: 'FLAT', expires: '31 May 2026', uses: 45 },
  ]);
  const [newCouponCode, setNewCouponCode] = useState('');
  const [newCouponDisc, setNewCouponDisc] = useState(15);

  // Total stats calculations
  const totalRevenue = orders.reduce((sum, ord) => sum + ord.totalAmount, 0) + 128450;
  const totalOrdersCount = orders.length + 42;
  const lowStockProducts = products.filter((p) => (p.stockQuantity ?? p.stock ?? 10) <= 5);

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProdName.trim()) return;

    addProduct({
      name: newProdName,
      brand: newProdBrand,
      category: newProdCategory,
      gender: newProdGender,
      price: Number(newProdPrice),
      originalPrice: Number(newProdOrigPrice),
      discountPercent: Math.round(
        ((newProdOrigPrice - newProdPrice) / newProdOrigPrice) * 100
      ),
      rating: 4.8,
      reviewCount: 1,
      images: [newProdImage, 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=800&q=80'],
      description: newProdDesc,
      details: {
        material: '100% Superfine Combed Cotton',
        fit: 'Relaxed Atelier Fit',
        care: 'Machine wash cold inside-out',
        fabricWeight: '280 GSM',
      },
      sizes: ['S', 'M', 'L', 'XL'],
      colors: [{ name: 'Onyx Black', hex: '#18181B' }],
      stockQuantity: Number(newProdStock),
      stock: Number(newProdStock),
      isNew: true,
    });

    setShowAddProductModal(false);
    setNewProdName('');
    alert('Product successfully published to SAVARA catalog!');
  };

  const handleDeleteProduct = (id: string) => {
    if (confirm('Are you sure you want to retire this product from the catalog?')) {
      deleteProduct(id);
    }
  };

  const handleAddCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCouponCode.trim()) return;
    setCoupons([
      ...coupons,
      {
        code: newCouponCode.toUpperCase(),
        discount: newCouponDisc,
        type: 'PERCENT',
        expires: '31 Dec 2026',
        uses: 0,
      },
    ]);
    setNewCouponCode('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-neutral-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-serif-luxury text-2xl font-bold text-neutral-950">
              SAVARA ATELIER
            </span>
            <span className="px-2 py-0.5 bg-neutral-950 text-amber-300 text-[10px] font-bold tracking-widest uppercase rounded">
              OPERATIONS PORTAL
            </span>
          </div>
          <p className="text-xs text-neutral-500 mt-1">
            Enterprise management for catalog inventory, orders, customers & pricing
          </p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => navigateTo('catalog')}
            className="px-4 py-2 border border-neutral-300 text-xs font-semibold rounded-xl hover:bg-neutral-100"
          >
            Live Storefront
          </button>
          <button
            onClick={() => setShowAddProductModal(true)}
            className="px-4 py-2 bg-neutral-950 hover:bg-black text-white text-xs font-bold rounded-xl flex items-center gap-1.5 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>ADD PRODUCT</span>
          </button>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex border-b border-neutral-200 gap-6 text-xs font-bold uppercase tracking-wider overflow-x-auto no-scrollbar">
        {[
          { id: 'dashboard', label: 'Analytics' },
          { id: 'products', label: `Products (${products.length})` },
          { id: 'orders', label: `Orders (${orders.length})` },
          { id: 'inventory', label: `Inventory & Stock (${lowStockProducts.length} low)` },
          { id: 'coupons', label: 'Discount Codes' },
          { id: 'customers', label: 'VIP Clients' },
        ].map((t) => (
          <button
            key={t.id}
            onClick={() => setAdminTab(t.id as any)}
            className={`pb-3 transition-colors cursor-pointer ${
              adminTab === t.id
                ? 'border-b-2 border-neutral-950 text-neutral-950'
                : 'text-neutral-400 hover:text-neutral-800'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* 1. DASHBOARD ANALYTICS TAB */}
      {adminTab === 'dashboard' && (
        <div className="space-y-8 animate-fade-in">
          {/* Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <div className="p-5 bg-white rounded-2xl border border-neutral-200 shadow-xs space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">
                GROSS SALES REVENUE
              </span>
              <div className="text-2xl font-bold text-neutral-950">
                ₹{totalRevenue.toLocaleString('en-IN')}
              </div>
              <span className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
                <TrendingUp className="w-3.5 h-3.5" /> +24.8% vs last month
              </span>
            </div>

            <div className="p-5 bg-white rounded-2xl border border-neutral-200 shadow-xs space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">
                TOTAL FULFILLED ORDERS
              </span>
              <div className="text-2xl font-bold text-neutral-950">{totalOrdersCount}</div>
              <span className="text-[11px] text-neutral-500">Average order: ₹2,840</span>
            </div>

            <div className="p-5 bg-white rounded-2xl border border-neutral-200 shadow-xs space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">
                ACTIVE CATALOG STYLES
              </span>
              <div className="text-2xl font-bold text-neutral-950">{products.length} SKUs</div>
              <span className="text-[11px] text-emerald-600 font-semibold">
                98.4% in-stock availability
              </span>
            </div>

            <div className="p-5 bg-white rounded-2xl border border-neutral-200 shadow-xs space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">
                RETURN / EXCHANGE RATIO
              </span>
              <div className="text-2xl font-bold text-neutral-950">1.8%</div>
              <span className="text-[11px] text-emerald-600 font-semibold">
                Industry benchmark: 14%
              </span>
            </div>
          </div>

          {/* Quick Orders and Low Stock alerts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Orders Card */}
            <div className="p-6 bg-white rounded-2xl border border-neutral-200 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-serif-luxury text-base font-bold text-neutral-950">
                  Recent Dispatch Queue
                </h3>
                <button
                  onClick={() => setAdminTab('orders')}
                  className="text-xs text-neutral-900 font-semibold underline"
                >
                  Manage All
                </button>
              </div>
              <div className="divide-y divide-neutral-100">
                {orders.slice(0, 3).map((ord) => (
                  <div key={ord.id} className="py-3 flex items-center justify-between">
                    <div>
                      <span className="font-mono text-xs font-bold text-neutral-900">
                        {ord.orderNumber}
                      </span>
                      <p className="text-[11px] text-neutral-500">
                        {ord.shippingAddress.name} • {ord.items.length} garments
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-bold text-neutral-950">
                        ₹{ord.totalAmount.toLocaleString('en-IN')}
                      </span>
                      <span className="block text-[10px] text-emerald-700 font-semibold">
                        {ord.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Low Stock Alerts */}
            <div className="p-6 bg-white rounded-2xl border border-neutral-200 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-serif-luxury text-base font-bold text-neutral-950 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-500" />
                  <span>Low Inventory Alerts</span>
                </h3>
                <button
                  onClick={() => setAdminTab('inventory')}
                  className="text-xs text-neutral-900 font-semibold underline"
                >
                  Restock All
                </button>
              </div>
              <div className="divide-y divide-neutral-100">
                {products.slice(0, 3).map((p) => (
                  <div key={p.id} className="py-3 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <img src={p.images[0]} alt="" className="w-10 h-12 object-cover rounded-lg" />
                      <div>
                        <p className="text-xs font-bold text-neutral-900 truncate max-w-[200px]">
                          {p.name}
                        </p>
                        <span className="text-[10px] text-neutral-400">SKU: {p.id}</span>
                      </div>
                    </div>
                    <span className="px-2.5 py-1 bg-rose-50 text-rose-700 text-xs font-bold rounded-lg border border-rose-200">
                      {p.stockQuantity ?? p.stock ?? 10} units left
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. PRODUCTS TAB */}
      {adminTab === 'products' && (
        <div className="space-y-4 animate-fade-in">
          <div className="flex items-center justify-between">
            <h2 className="font-serif-luxury text-xl font-bold text-neutral-950">
              Live Product Catalog ({products.length})
            </h2>
            <button
              onClick={() => setShowAddProductModal(true)}
              className="px-4 py-2 bg-neutral-950 text-white text-xs font-bold rounded-xl flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add New Garment</span>
            </button>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-neutral-200 bg-white">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-neutral-50 text-neutral-600 uppercase text-[10px] tracking-wider border-b border-neutral-200">
                  <th className="p-3.5">Product</th>
                  <th className="p-3.5">Category</th>
                  <th className="p-3.5">Gender</th>
                  <th className="p-3.5">Price</th>
                  <th className="p-3.5">Inventory</th>
                  <th className="p-3.5">Rating</th>
                  <th className="p-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {products.map((prod) => (
                  <tr key={prod.id} className="hover:bg-neutral-50/70 transition-colors">
                    <td className="p-3.5 flex items-center gap-3">
                      <img
                        src={prod.images[0]}
                        alt=""
                        className="w-10 h-12 object-cover rounded-lg shrink-0"
                      />
                      <div>
                        <span className="font-bold text-neutral-900 block truncate max-w-xs">
                          {prod.name}
                        </span>
                        <span className="text-[10px] text-neutral-400">{prod.brand}</span>
                      </div>
                    </td>
                    <td className="p-3.5 text-neutral-700">{prod.category}</td>
                    <td className="p-3.5 text-neutral-700">{prod.gender}</td>
                    <td className="p-3.5 font-bold text-neutral-900">
                      ₹{prod.price.toLocaleString('en-IN')}
                    </td>
                    <td className="p-3.5">
                      <span
                        className={`font-semibold ${
                          (prod.stockQuantity ?? prod.stock ?? 10) <= 5 ? 'text-rose-600' : 'text-neutral-700'
                        }`}
                      >
                        {prod.stockQuantity ?? prod.stock ?? 10} in stock
                      </span>
                    </td>
                    <td className="p-3.5 text-neutral-700">{prod.rating} ★</td>
                    <td className="p-3.5 text-right">
                      <button
                        onClick={() => handleDeleteProduct(prod.id)}
                        className="p-1.5 text-neutral-400 hover:text-rose-600 rounded-lg hover:bg-neutral-100"
                        title="Delete product"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 3. ORDERS TAB */}
      {adminTab === 'orders' && (
        <div className="space-y-4 animate-fade-in">
          <h2 className="font-serif-luxury text-xl font-bold text-neutral-950">
            Fulfillment & Logistics Pipeline
          </h2>

          <div className="space-y-4">
            {orders.map((ord) => (
              <div
                key={ord.id}
                className="p-5 rounded-2xl border border-neutral-200 bg-white shadow-xs space-y-4"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-neutral-100 pb-3 text-xs">
                  <div>
                    <span className="font-mono font-bold text-neutral-950">#{ord.orderNumber}</span>
                    <span className="text-neutral-400 ml-2">Client: {ord.shippingAddress.name}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-neutral-950">
                      ₹{ord.totalAmount.toLocaleString('en-IN')}
                    </span>
                    {/* Status Dropdown changer */}
                    <select
                      value={ord.status}
                      onChange={(e) => updateOrderStatus(ord.id, e.target.value as any)}
                      className="bg-neutral-100 border border-neutral-300 rounded-lg px-2.5 py-1 text-xs font-bold text-neutral-900 focus:outline-none"
                    >
                      <option value="Confirmed">Confirmed</option>
                      <option value="Processing">Processing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Out for Delivery">Out for Delivery</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row justify-between gap-4 text-xs">
                  <div>
                    <span className="text-neutral-500 font-medium block">Shipping Destination:</span>
                    <p className="text-neutral-800">
                      {ord.shippingAddress.street}, {ord.shippingAddress.city}, {ord.shippingAddress.state} - {ord.shippingAddress.pincode}
                    </p>
                    <p className="text-neutral-600 mt-1">
                      Carrier: <strong>{ord.courierPartner}</strong> • Tracking: <strong>{ord.trackingId}</strong>
                    </p>
                  </div>

                  <div className="text-neutral-600 text-right sm:text-right">
                    <span>Payment: {ord.paymentMethod}</span>
                    <p className="text-[11px] text-neutral-400">Order Placed: {ord.date}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. INVENTORY TAB */}
      {adminTab === 'inventory' && (
        <div className="space-y-4 animate-fade-in">
          <h2 className="font-serif-luxury text-xl font-bold text-neutral-950">
            Real-Time Atelier Stock Management
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {products.map((prod) => (
              <div
                key={prod.id}
                className="p-4 rounded-xl border border-neutral-200 bg-white flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <img src={prod.images[0]} alt="" className="w-12 h-14 object-cover rounded-lg" />
                  <div>
                    <h4 className="text-xs font-bold text-neutral-900 truncate max-w-[150px]">
                      {prod.name}
                    </h4>
                    <span className="text-[10px] text-neutral-400">{prod.category}</span>
                  </div>
                </div>
                <div className="text-right space-y-1">
                  <span
                    className={`text-xs font-bold block ${
                      (prod.stockQuantity ?? prod.stock ?? 10) <= 5 ? 'text-rose-600' : 'text-emerald-700'
                    }`}
                  >
                    {prod.stockQuantity ?? prod.stock ?? 10} units
                  </span>
                  <button
                    onClick={() => {
                      updateStock(prod.id, (prod.stockQuantity ?? prod.stock ?? 10) + 20);
                    }}
                    className="px-2.5 py-1 text-[10px] font-bold bg-neutral-100 hover:bg-neutral-200 rounded text-neutral-800 cursor-pointer"
                  >
                    + Restock 20
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 5. COUPONS TAB */}
      {adminTab === 'coupons' && (
        <div className="space-y-6 animate-fade-in">
          <div className="flex items-center justify-between">
            <h2 className="font-serif-luxury text-xl font-bold text-neutral-950">
              Discount Vouchers & Campaign Codes
            </h2>
          </div>

          <form
            onSubmit={handleAddCoupon}
            className="p-4 bg-neutral-50 rounded-2xl border border-neutral-200 flex flex-wrap items-end gap-3"
          >
            <div>
              <label className="text-xs font-bold uppercase text-neutral-600 block mb-1">
                Coupon Code
              </label>
              <input
                type="text"
                value={newCouponCode}
                onChange={(e) => setNewCouponCode(e.target.value.toUpperCase())}
                placeholder="e.g. MONSOON25"
                className="px-3.5 py-2 text-xs border border-neutral-300 rounded-xl bg-white focus:outline-none"
              />
            </div>
            <div>
              <label className="text-xs font-bold uppercase text-neutral-600 block mb-1">
                Discount Percentage (%)
              </label>
              <input
                type="number"
                min={5}
                max={50}
                value={newCouponDisc}
                onChange={(e) => setNewCouponDisc(Number(e.target.value))}
                className="px-3.5 py-2 text-xs border border-neutral-300 rounded-xl bg-white focus:outline-none"
              />
            </div>
            <button
              type="submit"
              className="px-5 py-2 bg-neutral-950 text-white text-xs font-bold rounded-xl hover:bg-black"
            >
              CREATE VOUCHER
            </button>
          </form>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {coupons.map((cp) => (
              <div
                key={cp.code}
                className="p-4 rounded-xl border border-neutral-200 bg-white shadow-xs space-y-2"
              >
                <div className="flex justify-between items-center">
                  <span className="font-mono text-sm font-bold text-neutral-950">{cp.code}</span>
                  <span className="text-xs font-bold text-emerald-600">{cp.discount}% OFF</span>
                </div>
                <p className="text-[11px] text-neutral-500">Expires: {cp.expires}</p>
                <div className="text-[10px] text-neutral-400 font-medium">
                  Claimed by {cp.uses} shoppers
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 6. CUSTOMERS TAB */}
      {adminTab === 'customers' && (
        <div className="space-y-4 animate-fade-in">
          <h2 className="font-serif-luxury text-xl font-bold text-neutral-950">
            VIP Atelier Client Roster
          </h2>
          <div className="overflow-x-auto rounded-2xl border border-neutral-200 bg-white">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-neutral-50 text-neutral-600 uppercase text-[10px] tracking-wider border-b border-neutral-200">
                  <th className="p-3.5">Client Name</th>
                  <th className="p-3.5">Contact</th>
                  <th className="p-3.5">City</th>
                  <th className="p-3.5">Tier</th>
                  <th className="p-3.5">Lifetime Value</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                <tr className="hover:bg-neutral-50">
                  <td className="p-3.5 font-bold text-neutral-900">Aryan Sharma</td>
                  <td className="p-3.5 text-neutral-600">aryan@savara.luxury</td>
                  <td className="p-3.5 text-neutral-600">Bengaluru</td>
                  <td className="p-3.5">
                    <span className="px-2 py-0.5 bg-neutral-900 text-amber-300 text-[10px] font-bold rounded">
                      NOIR GOLD
                    </span>
                  </td>
                  <td className="p-3.5 font-bold text-neutral-900">₹42,800</td>
                </tr>
                <tr className="hover:bg-neutral-50">
                  <td className="p-3.5 font-bold text-neutral-900">Natasha Singhania</td>
                  <td className="p-3.5 text-neutral-600">natasha.s@gmail.com</td>
                  <td className="p-3.5 text-neutral-600">Mumbai</td>
                  <td className="p-3.5">
                    <span className="px-2 py-0.5 bg-neutral-900 text-amber-300 text-[10px] font-bold rounded">
                      ATELIER VIP
                    </span>
                  </td>
                  <td className="p-3.5 font-bold text-neutral-900">₹36,200</td>
                </tr>
                <tr className="hover:bg-neutral-50">
                  <td className="p-3.5 font-bold text-neutral-900">Kabir Mehta</td>
                  <td className="p-3.5 text-neutral-600">kabir.m@outlook.com</td>
                  <td className="p-3.5 text-neutral-600">New Delhi</td>
                  <td className="p-3.5">
                    <span className="px-2 py-0.5 bg-neutral-100 text-neutral-800 text-[10px] font-bold rounded">
                      MEMBER
                    </span>
                  </td>
                  <td className="p-3.5 font-bold text-neutral-900">₹18,450</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Modal: Add New Product */}
      {showAddProductModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-2xl p-6 max-w-lg w-full border border-neutral-200 shadow-2xl max-h-[90vh] overflow-y-auto space-y-4">
            <h3 className="font-serif-luxury text-xl font-bold text-neutral-950">
              Publish New Garment to Catalog
            </h3>

            <form onSubmit={handleCreateProduct} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-neutral-700 block mb-1">Product Name</label>
                <input
                  type="text"
                  required
                  value={newProdName}
                  onChange={(e) => setNewProdName(e.target.value)}
                  placeholder="e.g. Vintage Washed French Terry Hoodie"
                  className="w-full p-2.5 border border-neutral-300 rounded-lg focus:outline-none focus:border-neutral-900"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-neutral-700 block mb-1">Brand Line</label>
                  <select
                    value={newProdBrand}
                    onChange={(e) => setNewProdBrand(e.target.value)}
                    className="w-full p-2.5 border border-neutral-300 rounded-lg bg-white"
                  >
                    <option value="SAVARA">SAVARA</option>
                    <option value="SAVARA Atelier">SAVARA Atelier</option>
                    <option value="SAVARA Black Label">SAVARA Black Label</option>
                  </select>
                </div>
                <div>
                  <label className="font-bold text-neutral-700 block mb-1">Category</label>
                  <select
                    value={newProdCategory}
                    onChange={(e) => setNewProdCategory(e.target.value)}
                    className="w-full p-2.5 border border-neutral-300 rounded-lg bg-white"
                  >
                    <option value="T-Shirts">T-Shirts</option>
                    <option value="Hoodies">Hoodies</option>
                    <option value="Shirts">Shirts</option>
                    <option value="Cargo Pants">Cargo Pants</option>
                    <option value="Jackets">Jackets</option>
                    <option value="Co-ord Sets">Co-ord Sets</option>
                    <option value="Dresses">Dresses</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="font-bold text-neutral-700 block mb-1">Gender</label>
                  <select
                    value={newProdGender}
                    onChange={(e) => setNewProdGender(e.target.value as any)}
                    className="w-full p-2.5 border border-neutral-300 rounded-lg bg-white"
                  >
                    <option value="Men">Men</option>
                    <option value="Women">Women</option>
                    <option value="Unisex">Unisex</option>
                  </select>
                </div>
                <div>
                  <label className="font-bold text-neutral-700 block mb-1">Selling Price (₹)</label>
                  <input
                    type="number"
                    value={newProdPrice}
                    onChange={(e) => setNewProdPrice(Number(e.target.value))}
                    className="w-full p-2.5 border border-neutral-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="font-bold text-neutral-700 block mb-1">MRP Price (₹)</label>
                  <input
                    type="number"
                    value={newProdOrigPrice}
                    onChange={(e) => setNewProdOrigPrice(Number(e.target.value))}
                    className="w-full p-2.5 border border-neutral-300 rounded-lg"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-neutral-700 block mb-1">Image URL</label>
                <input
                  type="url"
                  value={newProdImage}
                  onChange={(e) => setNewProdImage(e.target.value)}
                  className="w-full p-2.5 border border-neutral-300 rounded-lg"
                />
              </div>

              <div>
                <label className="font-bold text-neutral-700 block mb-1">Initial Stock Count</label>
                <input
                  type="number"
                  value={newProdStock}
                  onChange={(e) => setNewProdStock(Number(e.target.value))}
                  className="w-full p-2.5 border border-neutral-300 rounded-lg"
                />
              </div>

              <div>
                <label className="font-bold text-neutral-700 block mb-1">Garment Description</label>
                <textarea
                  rows={3}
                  value={newProdDesc}
                  onChange={(e) => setNewProdDesc(e.target.value)}
                  className="w-full p-2.5 border border-neutral-300 rounded-lg"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-neutral-200">
                <button
                  type="button"
                  onClick={() => setShowAddProductModal(false)}
                  className="px-4 py-2 border border-neutral-300 rounded-xl font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-neutral-950 text-white rounded-xl font-bold"
                >
                  PUBLISH GARMENT
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

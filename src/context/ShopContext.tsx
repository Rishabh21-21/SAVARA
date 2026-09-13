import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Product,
  CartItem,
  Order,
  UserProfile,
  Address,
  Coupon,
  FilterState,
  NotificationItem,
  OrderStatus,
} from '../types';
import { INITIAL_PRODUCTS } from '../data/mockProducts';
import {
  INITIAL_COUPONS,
  INITIAL_ORDERS,
  INITIAL_ADDRESSES,
  INITIAL_NOTIFICATIONS,
} from '../data/mockData';

export type AppView =
  | 'home'
  | 'catalog'
  | 'product-detail'
  | 'cart'
  | 'checkout'
  | 'account'
  | 'wishlist'
  | 'admin'
  | 'collections'
  | 'order-success';

const DEFAULT_FILTERS: FilterState = {
  gender: [],
  categories: [],
  brands: [],
  priceRange: [],
  sizes: [],
  colors: [],
  rating: null,
  discount: null,
  availability: [],
  searchQuery: '',
  sortBy: 'recommended',
};

interface ShopContextType {
  // Products & Admin
  products: Product[];
  addProduct: (product: Omit<Product, 'id' | 'sku' | 'reviews'>) => void;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  updateStock: (id: string, newStock: number) => void;

  // Navigation
  currentView: AppView;
  navigateTo: (view: AppView, params?: { productId?: string; collectionId?: string; filterUpdates?: Partial<FilterState> }) => void;
  selectedProductId: string | null;
  selectedCollectionId: string | null;
  lastPlacedOrder: Order | null;

  // Cart
  cart: CartItem[];
  addToCart: (product: Product, color: string, size: string, quantity?: number) => void;
  removeFromCart: (cartId: string) => void;
  updateCartQty: (cartId: string, quantity: number) => void;
  clearCart: () => void;
  cartTotalAmount: number;
  cartDiscountAmount: number;
  cartDeliveryFee: number;
  finalPayableAmount: number;

  // Wishlist
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  moveCartItemToWishlist: (cartId: string) => void;
  moveWishlistItemToCart: (productId: string, size?: string, color?: string) => void;

  // User & Orders
  user: UserProfile;
  updateUserProfile: (updates: Partial<UserProfile>) => void;
  savedAddresses: Address[];
  addAddress: (address: Omit<Address, 'id'>) => void;
  updateAddress: (id: string, updates: Partial<Address>) => void;
  deleteAddress: (id: string) => void;
  setDefaultAddress: (id: string) => void;
  orders: Order[];
  placeOrder: (
    orderDataOrAddress:
      | {
          items?: CartItem[];
          address: Address;
          paymentMethod: Order['paymentMethod'];
          deliveryMethod?: 'standard' | 'express';
        }
      | Address,
    maybePaymentMethod?: any
  ) => Order;
  cancelOrder: (orderId: string) => void;
  requestReturn: (orderId: string, reason: string, type: 'Return' | 'Exchange') => void;
  requestOrderReturn: (orderId: string, reason: string, type: string) => void;
  updateOrderStatus: (orderId: string, newStatus: OrderStatus) => void;
  activeTrackingOrder: Order | null;
  setActiveTrackingOrder: (order: Order | null) => void;

  // Cart helper aliases
  cartSummary: {
    subtotal: number;
    discount: number;
    delivery: number;
    couponDiscount: number;
    finalTotal: number;
    totalItems: number;
  };
  updateCartItemQuantity: (cartId: string, quantity: number) => void;
  updateCartItemSize: (cartId: string, newSize: string) => void;
  moveToWishlist: (cartId: string) => void;
  userProfile: UserProfile & { addresses: Address[] };

  // Coupons
  coupons: Coupon[];
  appliedCoupon: Coupon | null;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  createCoupon: (coupon: Coupon) => void;
  toggleCoupon: (code: string) => void;

  // Filters & Search
  filterState: FilterState;
  setFilterState: React.Dispatch<React.SetStateAction<FilterState>>;
  updateFilter: <K extends keyof FilterState>(key: K, value: FilterState[K]) => void;
  resetFilters: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;

  // Delivery Pincode
  deliveryPincode: string;
  setDeliveryPincode: (pin: string) => void;
  pincodeEstimatedDays: string;

  // UI Modals
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  quickViewProduct: Product | null;
  setQuickViewProduct: (product: Product | null) => void;
  isSizeGuideOpen: boolean;
  setIsSizeGuideOpen: (open: boolean) => void;
  isSupportOpen: boolean;
  setIsSupportOpen: (open: boolean) => void;
  accountActiveTab: string;
  setAccountActiveTab: (tab: string) => void;

  // Notifications
  notifications: NotificationItem[];
  markNotificationAsRead: (id: string) => void;
  clearAllNotifications: () => void;
  addReviewToProduct: (productId: string, review: { userName: string; rating: number; title: string; comment: string; sizePurchased?: string; colorPurchased?: string }) => void;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // 1. Products
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('savara_products');
    return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
  });

  useEffect(() => {
    localStorage.setItem('savara_products', JSON.stringify(products));
  }, [products]);

  // 2. Navigation
  const [currentView, setCurrentView] = useState<AppView>('home');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [selectedCollectionId, setSelectedCollectionId] = useState<string | null>(null);
  const [lastPlacedOrder, setLastPlacedOrder] = useState<Order | null>(null);
  const [activeTrackingOrder, setActiveTrackingOrder] = useState<Order | null>(null);

  // 3. Cart
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('savara_cart');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('savara_cart', JSON.stringify(cart));
  }, [cart]);

  // 4. Wishlist
  const [wishlist, setWishlist] = useState<string[]>(() => {
    const saved = localStorage.getItem('savara_wishlist');
    return saved ? JSON.parse(saved) : ['svr-001', 'svr-011', 'svr-013'];
  });

  useEffect(() => {
    localStorage.setItem('savara_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  // 5. User Profile
  const [user, setUser] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('savara_user');
    return saved
      ? JSON.parse(saved)
      : {
          name: 'Rishabh Rana',
          email: 'rishabhrana7088764123@gmail.com',
          phone: '+91 98765 43210',
          walletBalance: 1250,
          savedAddresses: INITIAL_ADDRESSES,
        };
  });

  useEffect(() => {
    localStorage.setItem('savara_user', JSON.stringify(user));
  }, [user]);

  // 6. Orders
  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('savara_orders');
    return saved ? JSON.parse(saved) : INITIAL_ORDERS;
  });

  useEffect(() => {
    localStorage.setItem('savara_orders', JSON.stringify(orders));
  }, [orders]);

  // 7. Coupons
  const [coupons, setCoupons] = useState<Coupon[]>(() => {
    const saved = localStorage.getItem('savara_coupons');
    return saved ? JSON.parse(saved) : INITIAL_COUPONS;
  });

  useEffect(() => {
    localStorage.setItem('savara_coupons', JSON.stringify(coupons));
  }, [coupons]);

  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);

  // 8. Notifications
  const [notifications, setNotifications] = useState<NotificationItem[]>(() => {
    const saved = localStorage.getItem('savara_notifications');
    return saved ? JSON.parse(saved) : INITIAL_NOTIFICATIONS;
  });

  useEffect(() => {
    localStorage.setItem('savara_notifications', JSON.stringify(notifications));
  }, [notifications]);

  // 9. Filters
  const [filterState, setFilterState] = useState<FilterState>(DEFAULT_FILTERS);

  // 10. UI States
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [isSupportOpen, setIsSupportOpen] = useState(false);
  const [accountActiveTab, setAccountActiveTab] = useState('orders');

  // 11. Pincode
  const [deliveryPincode, setDeliveryPincodeState] = useState('560038');
  const [pincodeEstimatedDays, setPincodeEstimatedDays] = useState('Tomorrow by 7:00 PM');

  const setDeliveryPincode = (pin: string) => {
    setDeliveryPincodeState(pin);
    if (pin.startsWith('11') || pin.startsWith('40') || pin.startsWith('56')) {
      setPincodeEstimatedDays('Tomorrow by 7:00 PM (Express Air)');
    } else {
      setPincodeEstimatedDays('Within 2-3 Business Days');
    }
  };

  const navigateTo = (
    view: AppView,
    params?: { productId?: string; collectionId?: string; filterUpdates?: Partial<FilterState> }
  ) => {
    if (params?.productId) {
      setSelectedProductId(params.productId);
    }
    if (params?.collectionId) {
      setSelectedCollectionId(params.collectionId);
    }
    if (params?.filterUpdates) {
      setFilterState((prev) => ({ ...prev, ...params.filterUpdates }));
    }
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Cart operations
  const addToCart = (product: Product, color: string, size: string, quantity = 1) => {
    setCart((prev) => {
      const cartId = `${product.id}-${color}-${size}`;
      const existing = prev.find((item) => item.cartId === cartId);
      if (existing) {
        return prev.map((item) =>
          item.cartId === cartId ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [
        ...prev,
        {
          cartId,
          product,
          selectedColor: color,
          selectedSize: size,
          quantity,
        },
      ];
    });
  };

  const removeFromCart = (cartId: string) => {
    setCart((prev) => prev.filter((item) => item.cartId !== cartId));
  };

  const updateCartQty = (cartId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(cartId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.cartId === cartId ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => setCart([]);

  // Wishlist operations
  const toggleWishlist = (productId: string) => {
    setWishlist((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    );
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  const moveCartItemToWishlist = (cartId: string) => {
    const item = cart.find((i) => i.cartId === cartId);
    if (item) {
      toggleWishlist(item.product.id);
      removeFromCart(cartId);
    }
  };

  const moveWishlistItemToCart = (productId: string, size?: string, color?: string) => {
    const product = products.find((p) => p.id === productId);
    if (!product) return;
    const defaultColor = color || product.colors[0]?.name || 'Standard';
    const defaultSize = size || product.sizes[0] || 'M';
    addToCart(product, defaultColor, defaultSize, 1);
    setWishlist((prev) => prev.filter((id) => id !== productId));
  };

  // Calculations
  const cartTotalAmount = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const cartMRP = cart.reduce((acc, item) => acc + item.product.originalPrice * item.quantity, 0);
  const cartDiscountAmount = cartMRP - cartTotalAmount;
  const cartDeliveryFee = cartTotalAmount >= 1999 || cart.length === 0 ? 0 : 149;

  let couponDiscount = 0;
  if (appliedCoupon && cartTotalAmount >= appliedCoupon.minOrderValue) {
    if (appliedCoupon.discountType === 'percentage') {
      couponDiscount = Math.round((cartTotalAmount * appliedCoupon.discountValue) / 100);
    } else {
      couponDiscount = appliedCoupon.discountValue;
    }
  }

  const finalPayableAmount = Math.max(0, cartTotalAmount + cartDeliveryFee - couponDiscount);

  // Coupons
  const applyCoupon = (code: string) => {
    const trimmed = code.trim().toUpperCase();
    const found = coupons.find((c) => c.code.toUpperCase() === trimmed && c.isActive);
    if (!found) {
      return { success: false, message: 'Invalid or expired coupon code.' };
    }
    if (cartTotalAmount < found.minOrderValue) {
      return {
        success: false,
        message: `Add ₹${found.minOrderValue - cartTotalAmount} more to apply ${found.code}.`,
      };
    }
    setAppliedCoupon(found);
    return { success: true, message: `Offer "${found.code}" applied successfully!` };
  };

  const removeCoupon = () => setAppliedCoupon(null);

  const createCoupon = (newCoupon: Coupon) => {
    setCoupons((prev) => [newCoupon, ...prev]);
  };

  const toggleCoupon = (code: string) => {
    setCoupons((prev) =>
      prev.map((c) => (c.code === code ? { ...c, isActive: !c.isActive } : c))
    );
  };

  // Address operations
  const savedAddresses = user.savedAddresses;

  const addAddress = (addressData: Omit<Address, 'id'>) => {
    const newAddr: Address = {
      ...addressData,
      id: `addr-${Date.now()}`,
    };
    setUser((prev) => ({
      ...prev,
      savedAddresses: [newAddr, ...prev.savedAddresses],
    }));
  };

  const updateAddress = (id: string, updates: Partial<Address>) => {
    setUser((prev) => ({
      ...prev,
      savedAddresses: prev.savedAddresses.map((a) => (a.id === id ? { ...a, ...updates } : a)),
    }));
  };

  const deleteAddress = (id: string) => {
    setUser((prev) => ({
      ...prev,
      savedAddresses: prev.savedAddresses.filter((a) => a.id !== id),
    }));
  };

  const setDefaultAddress = (id: string) => {
    setUser((prev) => ({
      ...prev,
      savedAddresses: prev.savedAddresses.map((a) => ({
        ...a,
        isDefault: a.id === id,
      })),
    }));
  };

  const updateUserProfile = (updates: Partial<UserProfile>) => {
    setUser((prev) => ({ ...prev, ...updates }));
  };

  // Orders
  const placeOrder = (
    orderDataOrAddress:
      | {
          items?: CartItem[];
          address: Address;
          paymentMethod: Order['paymentMethod'];
          deliveryMethod?: 'standard' | 'express';
        }
      | Address,
    maybePaymentMethod?: any
  ): Order => {
    let orderItems = cart;
    let orderAddress: Address;
    let orderPaymentMethod: Order['paymentMethod'] = 'UPI';
    let orderDeliveryMethod: 'standard' | 'express' = 'standard';

    if ('items' in orderDataOrAddress && orderDataOrAddress.items) {
      orderItems = orderDataOrAddress.items;
      orderAddress = orderDataOrAddress.address;
      orderPaymentMethod = orderDataOrAddress.paymentMethod;
      orderDeliveryMethod = orderDataOrAddress.deliveryMethod || 'standard';
    } else if ('address' in orderDataOrAddress && (orderDataOrAddress as any).address) {
      orderAddress = (orderDataOrAddress as any).address;
      orderPaymentMethod = (orderDataOrAddress as any).paymentMethod || 'UPI';
      orderDeliveryMethod = (orderDataOrAddress as any).deliveryMethod || 'standard';
    } else {
      orderAddress = orderDataOrAddress as Address;
      orderPaymentMethod = (maybePaymentMethod as any) || 'UPI';
    }

    const orderNum = `SVR${Math.floor(100000 + Math.random() * 900000)}`;
    const newOrder: Order = {
      id: `ord-${Date.now()}`,
      orderNumber: orderNum,
      date: new Date().toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
      items: orderItems.map((i) => ({
        productId: i.product.id,
        productName: i.product.name,
        productImage: i.product.images[0],
        color: i.selectedColor,
        size: i.selectedSize,
        quantity: i.quantity,
        price: i.product.price,
      })),
      totalAmount: finalPayableAmount,
      discountAmount: couponDiscount,
      deliveryFee: orderDeliveryMethod === 'express' ? 149 : cartDeliveryFee,
      couponApplied: appliedCoupon?.code,
      status: 'Confirmed',
      shippingAddress: orderAddress,
      paymentMethod: orderPaymentMethod,
      paymentId: `pay_${String(orderPaymentMethod).replace(/\s+/g, '')}_${Math.floor(10000000 + Math.random() * 90000000)}`,
      trackingId: `SVR-TRK-${Math.floor(100000000 + Math.random() * 900000000)}`,
      courierPartner: 'BlueDart Express Air',
      estimatedDeliveryDate: orderDeliveryMethod === 'express' ? 'Tomorrow by 07:00 PM' : 'In 3-4 Business Days',
      trackingTimeline: [
        { title: 'Order Confirmed', date: 'Just now', completed: true, current: true },
        { title: 'Packed at SAVARA Atelier', date: 'Upcoming', completed: false, current: false },
        { title: 'Shipped via BlueDart Air', date: 'Upcoming', completed: false, current: false },
        { title: 'Out for Delivery', date: 'Upcoming', completed: false, current: false },
        { title: 'Delivered', date: 'Upcoming', completed: false, current: false },
      ],
    };

    // If paid by wallet, deduct
    if (orderPaymentMethod === 'SAVARA Wallet' || (orderPaymentMethod as any) === 'Wallet') {
      setUser((prev) => ({
        ...prev,
        walletBalance: Math.max(0, prev.walletBalance - finalPayableAmount),
      }));
    }

    setOrders((prev) => [newOrder, ...prev]);
    setLastPlacedOrder(newOrder);
    clearCart();
    setAppliedCoupon(null);

    // Add notification
    const orderNotif: NotificationItem = {
      id: `notif-${Date.now()}`,
      title: `Order ${newOrder.orderNumber} Confirmed!`,
      message: `Your payment via ${orderPaymentMethod} was received. Delivery tracking is live.`,
      time: 'Just now',
      type: 'order',
      read: false,
      link: 'orders',
    };
    setNotifications((prev) => [orderNotif, ...prev]);

    return newOrder;
  };

  const cancelOrder = (orderId: string) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: 'Cancelled' as OrderStatus } : o))
    );
  };

  const requestReturn = (orderId: string, reason: string, type: 'Return' | 'Exchange') => {
    setOrders((prev) =>
      prev.map((o) =>
        o.id === orderId
          ? {
              ...o,
              returnRequested: true,
              returnReason: reason,
              returnType: type,
              status: 'Returned' as OrderStatus,
            }
          : o
      )
    );
  };

  const requestOrderReturn = (orderId: string, reason: string, type: string) => {
    const normType = type.toLowerCase().includes('exchange') ? 'Exchange' : 'Return';
    requestReturn(orderId, reason, normType as any);
  };

  const updateCartItemSize = (cartId: string, newSize: string) => {
    setCart((prev) =>
      prev.map((item) =>
        item.cartId === cartId
          ? {
              ...item,
              cartId: `${item.product.id}-${item.selectedColor}-${newSize}`,
              selectedSize: newSize,
            }
          : item
      )
    );
  };

  const cartSummary = {
    subtotal: cartTotalAmount,
    discount: cartDiscountAmount,
    delivery: cartDeliveryFee,
    couponDiscount,
    finalTotal: finalPayableAmount,
    totalItems: cart.reduce((acc, i) => acc + i.quantity, 0),
  };

  const userProfile = {
    ...user,
    addresses: user.savedAddresses,
  };

  const updateOrderStatus = (orderId: string, newStatus: OrderStatus) => {
    setOrders((prev) =>
      prev.map((o) => {
        if (o.id === orderId) {
          const updatedTimeline = o.trackingTimeline.map((step) => {
            if (newStatus === 'Delivered') return { ...step, completed: true, current: false };
            if (newStatus === 'Out for Delivery' && step.title.includes('Out for Delivery'))
              return { ...step, completed: true, current: true };
            if (newStatus === 'Shipped' && step.title.includes('Shipped'))
              return { ...step, completed: true, current: true };
            return step;
          });
          return { ...o, status: newStatus, trackingTimeline: updatedTimeline };
        }
        return o;
      })
    );
  };

  // Admin Product Operations
  const addProduct = (prodData: Omit<Product, 'id' | 'sku' | 'reviews'>) => {
    const newId = `svr-${Date.now().toString().slice(-4)}`;
    const newProd: Product = {
      ...prodData,
      id: newId,
      sku: `SVR-${prodData.gender[0]}-${prodData.category.slice(0, 3).toUpperCase()}-${Math.floor(100 + Math.random() * 900)}`,
      reviews: [],
    };
    setProducts((prev) => [newProd, ...prev]);
  };

  const updateProduct = (id: string, updates: Partial<Product>) => {
    setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, ...updates } : p)));
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const updateStock = (id: string, newStock: number) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, stockQuantity: Math.max(0, newStock) } : p))
    );
  };

  // Add review to product
  const addReviewToProduct = (
    productId: string,
    reviewData: {
      userName: string;
      rating: number;
      title: string;
      comment: string;
      sizePurchased?: string;
      colorPurchased?: string;
    }
  ) => {
    const newRev = {
      id: `rev-${Date.now()}`,
      userName: reviewData.userName,
      rating: reviewData.rating,
      date: 'Today',
      title: reviewData.title,
      comment: reviewData.comment,
      verifiedPurchase: true,
      helpfulCount: 1,
      sizePurchased: reviewData.sizePurchased,
      colorPurchased: reviewData.colorPurchased,
    };

    setProducts((prev) =>
      prev.map((p) => {
        if (p.id === productId) {
          const updatedReviews = [newRev, ...p.reviews];
          const newAvgRating = Number(
            (updatedReviews.reduce((acc, r) => acc + r.rating, 0) / updatedReviews.length).toFixed(1)
          );
          return {
            ...p,
            reviews: updatedReviews,
            rating: newAvgRating,
            reviewCount: p.reviewCount + 1,
          };
        }
        return p;
      })
    );
  };

  // Filter updates
  const updateFilter = <K extends keyof FilterState>(key: K, value: FilterState[K]) => {
    setFilterState((prev) => ({ ...prev, [key]: value }));
  };

  const resetFilters = () => setFilterState(DEFAULT_FILTERS);

  const setSearchQuery = (query: string) => {
    setFilterState((prev) => ({ ...prev, searchQuery: query }));
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  return (
    <ShopContext.Provider
      value={{
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        updateStock,
        currentView,
        navigateTo,
        selectedProductId,
        selectedCollectionId,
        lastPlacedOrder,
        cart,
        addToCart,
        removeFromCart,
        updateCartQty,
        clearCart,
        cartTotalAmount,
        cartDiscountAmount,
        cartDeliveryFee,
        finalPayableAmount,
        wishlist,
        toggleWishlist,
        isInWishlist,
        moveCartItemToWishlist,
        moveToWishlist: moveCartItemToWishlist,
        moveWishlistItemToCart,
        user,
        userProfile,
        cartSummary,
        updateCartItemQuantity: updateCartQty,
        updateCartItemSize,
        updateUserProfile,
        savedAddresses,
        addAddress,
        updateAddress,
        deleteAddress,
        setDefaultAddress,
        orders,
        placeOrder,
        cancelOrder,
        requestReturn,
        requestOrderReturn,
        updateOrderStatus,
        activeTrackingOrder,
        setActiveTrackingOrder,
        coupons,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        createCoupon,
        toggleCoupon,
        filterState,
        setFilterState,
        updateFilter,
        resetFilters,
        searchQuery: filterState.searchQuery,
        setSearchQuery,
        deliveryPincode,
        setDeliveryPincode,
        pincodeEstimatedDays,
        isSearchOpen,
        setIsSearchOpen,
        quickViewProduct,
        setQuickViewProduct,
        isSizeGuideOpen,
        setIsSizeGuideOpen,
        isSupportOpen,
        setIsSupportOpen,
        accountActiveTab,
        setAccountActiveTab,
        notifications,
        markNotificationAsRead,
        clearAllNotifications,
        addReviewToProduct,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};

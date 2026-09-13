export interface ProductColor {
  name: string;
  hex: string;
  image?: string;
}

export interface ProductReview {
  id: string;
  userName: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verifiedPurchase: boolean;
  helpfulCount: number;
  userImages?: string[];
  sizePurchased?: string;
  colorPurchased?: string;
}

export interface Product {
  id: string;
  sku: string;
  name: string;
  brand: string;
  tagline?: string;
  category: string; // e.g. 'T-Shirts', 'Hoodies', 'Cargo Pants', 'Jackets', 'Co-ord Sets', 'Dresses', 'Shirts', 'Jeans', 'Trousers'
  gender: 'Men' | 'Women' | 'Unisex';
  price: number; // Current selling price in INR
  originalPrice: number; // MRP in INR
  discountPercent: number;
  images: string[];
  colors: ProductColor[];
  sizes: string[]; // ['XS', 'S', 'M', 'L', 'XL', 'XXL']
  rating: number;
  reviewCount: number;
  stockQuantity: number;
  stock?: number;
  isNew?: boolean;
  isBestseller?: boolean;
  isLimitedStock?: boolean;
  isTrending?: boolean;
  isSale?: boolean;
  collectionName?: string; // 'The Essentials', 'Midnight Collection', 'Urban Edit', etc.
  description: string;
  details: {
    material: string;
    fit: string;
    care: string;
    fabricWeight?: string;
    modelStats?: string;
  };
  reviews: ProductReview[];
}

export interface CartItem {
  cartId: string;
  product: Product;
  selectedColor: string;
  selectedSize: string;
  quantity: number;
}

export interface WishlistItem {
  productId: string;
  addedAt: string;
}

export interface Address {
  id: string;
  fullName?: string;
  name?: string;
  mobile?: string;
  phone?: string;
  houseFlat?: string;
  street: string;
  landmark?: string;
  city: string;
  state: string;
  pincode: string;
  addressType?: 'Home' | 'Office' | 'Other';
  type?: string;
  isDefault?: boolean;
}

export type OrderStatus = 'Confirmed' | 'Packed' | 'Shipped' | 'Out for Delivery' | 'Delivered' | 'Cancelled' | 'Returned';

export interface OrderItem {
  productId: string;
  productName: string;
  productImage: string;
  color: string;
  size: string;
  quantity: number;
  price: number;
}

export interface OrderTrackingStep {
  title: string;
  date: string;
  completed: boolean;
  current: boolean;
}

export interface Order {
  id: string;
  orderNumber: string; // e.g. SVR102948
  date: string;
  items: OrderItem[];
  totalAmount: number;
  discountAmount: number;
  deliveryFee: number;
  couponApplied?: string;
  status: OrderStatus;
  shippingAddress: Address;
  paymentMethod: 'UPI' | 'Credit / Debit Card' | 'Net Banking' | 'SAVARA Wallet' | 'Cash on Delivery';
  paymentId?: string;
  trackingId?: string;
  courierPartner?: string;
  estimatedDeliveryDate: string;
  trackingTimeline: OrderTrackingStep[];
  returnRequested?: boolean;
  returnReason?: string;
  returnType?: 'Return' | 'Exchange';
}

export interface Coupon {
  code: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  minOrderValue: number;
  description: string;
  expiryDate: string;
  isActive: boolean;
}

export interface UserProfile {
  name: string;
  email: string;
  phone: string;
  walletBalance: number;
  savedAddresses: Address[];
  addresses?: Address[];
}

export interface FilterState {
  gender: string[];
  categories: string[];
  brands: string[];
  priceRange: string[];
  sizes: string[];
  colors: string[];
  rating: number | null;
  discount: number | null;
  availability: string[];
  searchQuery: string;
  sortBy: 'recommended' | 'newest' | 'popularity' | 'price-asc' | 'price-desc' | 'rating' | 'discount';
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  type: 'order' | 'offer' | 'drop' | 'stock';
  read: boolean;
  link?: string;
}

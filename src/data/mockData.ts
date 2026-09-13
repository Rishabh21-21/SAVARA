import { Coupon, Order, Address, NotificationItem } from '../types';

export const INITIAL_COUPONS: Coupon[] = [
  {
    code: 'SAVARA10',
    discountType: 'percentage',
    discountValue: 10,
    minOrderValue: 0,
    description: '10% OFF on all items',
    expiryDate: '31 Dec 2026',
    isActive: true,
  },
  {
    code: 'FIRST500',
    discountType: 'fixed',
    discountValue: 500,
    minOrderValue: 2999,
    description: 'Flat ₹500 OFF on orders above ₹2,999',
    expiryDate: '30 Nov 2026',
    isActive: true,
  },
  {
    code: 'SAVARA20',
    discountType: 'percentage',
    discountValue: 20,
    minOrderValue: 3999,
    description: '20% OFF on premium orders above ₹3,999',
    expiryDate: '15 Oct 2026',
    isActive: true,
  },
  {
    code: 'WELCOME',
    discountType: 'percentage',
    discountValue: 15,
    minOrderValue: 1499,
    description: 'Special 15% OFF for new SAVARA tastemakers',
    expiryDate: '31 Dec 2026',
    isActive: true,
  },
];

export const AVAILABLE_COUPONS = INITIAL_COUPONS;

export const EDITORIAL_COLLECTIONS = [
  {
    id: 'the-essentials',
    name: 'THE ESSENTIALS',
    tagline: 'Perfection in reduction. Everyday luxury foundations.',
    image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1200&q=80',
    itemCount: '12 Pieces',
  },
  {
    id: 'midnight-collection',
    name: 'MIDNIGHT COLLECTION',
    tagline: 'Onyx textures, heavyweight fleeces & nocturnal tailoring.',
    image: 'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=1200&q=80',
    itemCount: '8 Pieces',
  },
  {
    id: 'urban-edit',
    name: 'URBAN EDIT',
    tagline: 'Utility reimagined for high-density modern living.',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=80',
    itemCount: '14 Pieces',
  },
  {
    id: 'summer-2026',
    name: 'SUMMER 2026',
    tagline: 'Sun-bleached linens, bias-cut silks and ocean breezes.',
    image: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1200&q=80',
    itemCount: '10 Pieces',
  },
  {
    id: 'street-luxe',
    name: 'STREET LUXE',
    tagline: 'Voluminous boxy cuts, selvedge denim & modern proportion.',
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=80',
    itemCount: '11 Pieces',
  },
  {
    id: 'signature-collection',
    name: 'SIGNATURE COLLECTION',
    tagline: 'Limited-run bespoke tailored outerwear and outerwear pieces.',
    image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1200&q=80',
    itemCount: '6 Pieces',
  },
];

export const INITIAL_ADDRESSES: Address[] = [
  {
    id: 'addr-1',
    fullName: 'Rishabh Rana',
    mobile: '9876543210',
    houseFlat: 'Penthouse 4B, Silver Heights',
    street: '14th Cross, Indiranagar',
    landmark: 'Near 100ft Road Metro',
    city: 'Bengaluru',
    state: 'Karnataka',
    pincode: '560038',
    addressType: 'Home',
    isDefault: true,
  },
  {
    id: 'addr-2',
    fullName: 'Rishabh Rana',
    mobile: '9876543210',
    houseFlat: 'Studio 201, Maker Chambers',
    street: 'Nariman Point',
    landmark: 'Opposite NCPA',
    city: 'Mumbai',
    state: 'Maharashtra',
    pincode: '400021',
    addressType: 'Office',
    isDefault: false,
  },
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'order-102948',
    orderNumber: 'SVR102948',
    date: '10 Sep 2026, 02:45 PM',
    items: [
      {
        productId: 'svr-001',
        productName: 'SAVARA Essential Oversized Tee',
        productImage: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=600&q=80',
        color: 'Onyx Black',
        size: 'L',
        quantity: 1,
        price: 1499,
      },
      {
        productId: 'svr-003',
        productName: 'SAVARA Urban Cargo',
        productImage: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=600&q=80',
        color: 'Tactical Black',
        size: 'L',
        quantity: 1,
        price: 2499,
      },
    ],
    totalAmount: 3498,
    discountAmount: 500,
    deliveryFee: 0,
    couponApplied: 'FIRST500',
    status: 'Out for Delivery',
    shippingAddress: INITIAL_ADDRESSES[0],
    paymentMethod: 'UPI',
    paymentId: 'pay_UPI_992144919',
    trackingId: 'BD-847291039IN',
    courierPartner: 'BlueDart Express Air',
    estimatedDeliveryDate: 'Today by 07:00 PM',
    trackingTimeline: [
      { title: 'Order Confirmed', date: '10 Sep 2026, 02:45 PM', completed: true, current: false },
      { title: 'Packed at SAVARA Central Hub', date: '11 Sep 2026, 09:15 AM', completed: true, current: false },
      { title: 'Shipped via BlueDart Priority', date: '12 Sep 2026, 04:30 PM', completed: true, current: false },
      { title: 'Out for Delivery (Agent: Ramesh K. +91 9845012345)', date: 'Today, 09:10 AM', completed: true, current: true },
      { title: 'Delivered', date: 'Expected today by 7 PM', completed: false, current: false },
    ],
  },
  {
    id: 'order-101882',
    orderNumber: 'SVR101882',
    date: '28 Aug 2026, 11:20 AM',
    items: [
      {
        productId: 'svr-002',
        productName: 'SAVARA Signature Hoodie',
        productImage: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=600&q=80',
        color: 'Charcoal Black',
        size: 'XL',
        quantity: 1,
        price: 2999,
      },
    ],
    totalAmount: 2699,
    discountAmount: 300,
    deliveryFee: 0,
    couponApplied: 'SAVARA10',
    status: 'Delivered',
    shippingAddress: INITIAL_ADDRESSES[0],
    paymentMethod: 'Credit / Debit Card',
    paymentId: 'pay_CARD_102830491',
    trackingId: 'DLV-401928374IN',
    courierPartner: 'Delhivery Surface',
    estimatedDeliveryDate: '01 Sep 2026',
    trackingTimeline: [
      { title: 'Order Confirmed', date: '28 Aug 2026, 11:20 AM', completed: true, current: false },
      { title: 'Packed', date: '28 Aug 2026, 06:00 PM', completed: true, current: false },
      { title: 'Shipped', date: '29 Aug 2026, 10:00 AM', completed: true, current: false },
      { title: 'Out for Delivery', date: '01 Sep 2026, 11:00 AM', completed: true, current: false },
      { title: 'Delivered to recipient', date: '01 Sep 2026, 03:25 PM', completed: true, current: true },
    ],
  },
];

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-1',
    title: 'Out for Delivery 🚚',
    message: 'Order #SVR102948 is out for delivery today with BlueDart rider Ramesh.',
    time: '2 hours ago',
    type: 'order',
    read: false,
    link: 'orders',
  },
  {
    id: 'notif-2',
    title: 'Price Drop Alert ✨',
    message: 'SAVARA Signature Hoodie in Charcoal is now at 33% OFF! Grab yours before stock depletes.',
    time: 'Yesterday',
    type: 'offer',
    read: false,
    link: 'catalog',
  },
  {
    id: 'notif-3',
    title: 'Drop Alert: Midnight Collection',
    message: 'Explore our latest heavyweight streetwear cuts engineered for the nocturnal aesthetic.',
    time: '3 days ago',
    type: 'drop',
    read: true,
    link: 'collections',
  },
];

export const SIZE_CHART_MEN = [
  { size: 'XS', chest: '36 in / 91 cm', shoulder: '18.5 in / 47 cm', length: '28 in / 71 cm', waist: '28-30 in' },
  { size: 'S', chest: '38 in / 96 cm', shoulder: '19.5 in / 49 cm', length: '29 in / 73 cm', waist: '30-32 in' },
  { size: 'M', chest: '41 in / 104 cm', shoulder: '20.5 in / 52 cm', length: '30 in / 76 cm', waist: '32-34 in' },
  { size: 'L', chest: '44 in / 112 cm', shoulder: '21.5 in / 54 cm', length: '31 in / 78 cm', waist: '34-36 in' },
  { size: 'XL', chest: '47 in / 119 cm', shoulder: '22.5 in / 57 cm', length: '31.5 in / 80 cm', waist: '36-38 in' },
  { size: 'XXL', chest: '50 in / 127 cm', shoulder: '23.5 in / 60 cm', length: '32 in / 82 cm', waist: '38-42 in' },
];

export const SIZE_CHART_WOMEN = [
  { size: 'XS', chest: '32 in / 81 cm', shoulder: '14.5 in / 37 cm', length: '22 in / 56 cm', waist: '24-25 in' },
  { size: 'S', chest: '34 in / 86 cm', shoulder: '15.5 in / 39 cm', length: '23 in / 58 cm', waist: '26-27 in' },
  { size: 'M', chest: '36 in / 91 cm', shoulder: '16.5 in / 42 cm', length: '24 in / 61 cm', waist: '28-29 in' },
  { size: 'L', chest: '39 in / 99 cm', shoulder: '17.5 in / 44 cm', length: '25 in / 63 cm', waist: '30-32 in' },
  { size: 'XL', chest: '42 in / 107 cm', shoulder: '18.5 in / 47 cm', length: '26 in / 66 cm', waist: '33-35 in' },
];

export const FAQS = [
  {
    q: 'What is SAVARA\'s return and exchange policy?',
    a: 'We offer an effortless, hassle-free 7-day doorstep return and exchange policy on all unworn items with original tags intact. Pickups are scheduled directly from your delivery address with zero return fees.',
  },
  {
    q: 'How long does standard shipping take?',
    a: 'Metropolitan cities (Mumbai, Bengaluru, Delhi NCR, Hyderabad, Chennai) receive deliveries within 24–48 hours. Other cities take 3–5 business days. Express next-day air dispatch is also available at checkout.',
  },
  {
    q: 'How should I care for heavyweight SAVARA cottons?',
    a: 'For our 280+ GSM heavyweight tees and 420 GSM hoodies, wash inside out in cold water on gentle cycle and hang dry in the shade. This prevents shrinkage and preserves the deep matte dye.',
  },
  {
    q: 'Are all payment options secure?',
    a: 'Yes, 100%. All transactions are processed through 256-bit encrypted Razorpay PCI-DSS Level 1 compliant gateway. We never store raw card or UPI credentials.',
  },
];

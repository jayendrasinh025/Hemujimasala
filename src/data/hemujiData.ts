export interface ProductItem {
  id: string;
  name: string;
  regionalName?: string;
  category: 'everyday' | 'beverage' | 'specialty';
  categoryLabel: string;
  shortDescription: string;
  culinaryUsage: string;
  image: string;
  secondaryImage?: string;
  packVariants: string[];
  accentColor: string;
  cardBg: string;
  verifiedHighlights: string[];
}

export interface CarouselCardItem {
  id: string;
  type: 'product' | 'culinary';
  title: string;
  subtitle: string;
  tag: string;
  image: string;
  accentColor: string;
  bgTint: string;
  productId?: string;
  imageCropStyle?: 'full-pack' | 'macro-spices' | 'macro-cooking' | 'macro-ingredients';
}

export const BRAND_CONTACT = {
  businessName: 'Hemuji Masala',
  originNote: 'Nadiad, Gujarat · Pan-India Supply Network',
  phoneRaw: '9328244234',
  phoneFormatted: '+91 93282 44234',
  whatsappNumber: '919328244234',
  email: 'hemujimasala@gmail.com',
  instagramUrl: 'https://www.instagram.com/hemujimasala/',
  instagramHandle: '@hemujimasala',
  googleMapsUrl: 'https://maps.app.goo.gl/hXM7qyXmijdLM8Mk7',
  logoImage: '/assets/brand/hemuji-logo.jpg',
  fallbackLogoSource: '/assets/aistudio/Screenshot_2026-10-30-12-45-53-52_7352322957d4404136654ef4adb64504_d220095e.jpg',
};

export const PRODUCTS: ProductItem[] = [
  {
    id: 'vaghareli-khichdi-masalo',
    name: 'Vaghareli Khichdi Masalo',
    regionalName: 'નડીયાદનો પ્રખ્યાત વઘારેલી ખીચડીનો મસાલો',
    category: 'specialty',
    categoryLabel: 'Signature Regional Blend',
    shortDescription:
      'Nadiad’s celebrated aromatic spice blend crafted specifically for traditional Gujarati Vaghareli Khichdi, pulao, and spiced rice preparations.',
    culinaryUsage: 'Everyday Vaghareli Khichdi, Masala Pulao & Spiced Rice',
    image: '/assets/aistudio/Screenshot_2026-10-30-12-45-59-54_7352322957d4404136654ef4adb64504_f4b1e4ed.jpg',
    secondaryImage: '/assets/aistudio/Screenshot_2026-10-30-12-46-28-62_7352322957d4404136654ef4adb64504_332e85dd.jpg',
    packVariants: ['₹5 Retail Pouch', '₹10 Family Pouch'],
    accentColor: '#0284C7',
    cardBg: '#F0F9FF',
    verifiedHighlights: ['ISO 9001:2015 Certified', 'No Onion · No Garlic · No Salt', 'No Added Colours or Flavours'],
  },
  {
    id: 'dal-shak-masalo',
    name: 'Dal-Shak Masalo',
    regionalName: 'दाल-सब्जी का मसाला · દાળ-શાક મસાલો',
    category: 'everyday',
    categoryLabel: 'Everyday Kitchen Essential',
    shortDescription:
      'Balanced, fragrant everyday masala formulated for homestyle Gujarati and North Indian dal, rassa-wali sabji, and festive varani dal.',
    culinaryUsage: 'All Dal Varieties, Rassa Sabji & Festive Varani Dal',
    image: '/assets/aistudio/Screenshot_2026-10-30-12-45-53-52_7352322957d4404136654ef4adb64504_d220095e.jpg',
    secondaryImage: '/assets/aistudio/Screenshot_2026-10-30-12-46-17-05_7352322957d4404136654ef4adb64504_4ee69070.jpg',
    packVariants: ['₹5 Retail Pouch', '₹10 Family Pouch'],
    accentColor: '#B91C1C',
    cardBg: '#FFFBEB',
    verifiedHighlights: ['ISO 9001:2015 Certified', 'No Onion · No Garlic · No Salt', '100% Natural Organic Badge'],
  },
  {
    id: 'special-natural-masalo',
    name: 'Special Natural Masalo',
    regionalName: 'સ્પે. નેચરલ મસાલો (નડીઆદવાળા)',
    category: 'specialty',
    categoryLabel: 'Traditional Roasted Blend',
    shortDescription:
      'Rich, dark-roasted whole spice blend bursting with warm clove, cinnamon, star anise, and cardamom aroma for signature curries and dry sabjis.',
    culinaryUsage: 'Rich Gravies, Traditional Kathiyawadi & Gujarati Sabjis',
    image: '/assets/aistudio/Screenshot_2026-10-30-12-46-22-57_7352322957d4404136654ef4adb64504_9ff72a62.jpg',
    secondaryImage: '/assets/aistudio/Screenshot_2026-10-30-12-46-06-47_7352322957d4404136654ef4adb64504_392ca6c5.jpg',
    packVariants: ['₹5 Retail Pouch', '₹10 Family Pouch'],
    accentColor: '#78350F',
    cardBg: '#FAF5EF',
    verifiedHighlights: ['Authentic Nadiad Recipe', 'Rich Whole-Spice Aroma', 'High Repeat Retail Demand'],
  },
  {
    id: 'all-in-one-masalo',
    name: 'All-in-One Masalo (Sp. Natural)',
    regionalName: 'Sp. Natural Masalo — All In One',
    category: 'everyday',
    categoryLabel: 'Multi-Purpose Culinary Blend',
    shortDescription:
      'Versatile single-pack kitchen companion combining select whole spices so home cooks and caterers can season any vegetable, pulse, or curry effortlessly.',
    culinaryUsage: 'Universal Seasoning for Curries, Pulses & Everyday Sabjis',
    image: '/assets/aistudio/Screenshot_2026-10-30-12-46-06-47_7352322957d4404136654ef4adb64504_392ca6c5.jpg',
    secondaryImage: '/assets/aistudio/Screenshot_2026-10-30-12-46-22-57_7352322957d4404136654ef4adb64504_9ff72a62.jpg',
    packVariants: ['₹10 Family Pouch', '₹5 Retail Pouch'],
    accentColor: '#92400E',
    cardBg: '#F8F4EE',
    verifiedHighlights: ['ISO 9001:2015 Certified', 'No Onion · No Garlic · No Salt', 'No Added Colours or Flavours'],
  },
  {
    id: 'dhana-jeera-powder',
    name: 'Dhana-Jeera Powder',
    regionalName: 'Pure Coriander & Cumin Blend',
    category: 'everyday',
    categoryLabel: 'Pure Ground Spice Staple',
    shortDescription:
      'Finely ground blend of cleaned coriander seeds (dhana) and aromatic cumin (jeera) that forms the foundational flavour base of Indian cooking.',
    culinaryUsage: 'Daily Tadka, Vegetable Sabjis, Dals & Farsan',
    image: '/assets/aistudio/Screenshot_2026-10-30-12-45-48-19_7352322957d4404136654ef4adb64504_93dc7096.jpg',
    packVariants: ['₹10 Family Pouch'],
    accentColor: '#15803D',
    cardBg: '#F0FDF4',
    verifiedHighlights: ['ISO 9001:2015 Certified', 'No Onion · No Garlic · No Salt', 'No Added Colours or Flavours'],
  },
  {
    id: 'chhas-masala',
    name: 'Chhas Masala',
    regionalName: 'हेमुजी छास मसाला (नडियाद के प्रसिद्ध)',
    category: 'beverage',
    categoryLabel: 'Beverage & Refreshment',
    shortDescription:
      'Refreshing, tangy spice mix crafted for buttermilk (chhas), raita, nimbu sharbat, and sugarcane juice—delivering instant digestive zest.',
    culinaryUsage: 'Buttermilk (Chhas), Boondi Raita, Nimbu Sharbat & Ganna Ras',
    image: '/assets/aistudio/Screenshot_2026-10-30-12-45-42-49_7352322957d4404136654ef4adb64504_e64e9732.jpg',
    packVariants: ['Retail Box Pack'],
    accentColor: '#0D9488',
    cardBg: '#F0FDFA',
    verifiedHighlights: ['No Onion · No Garlic', '100% Natural Organic Badge', 'Multi-Use Beverage & Raita Spice'],
  },
  {
    id: 'rajwadi-chai-masalo',
    name: 'Rajwadi Chai Masalo',
    regionalName: 'નડીયાદનો પ્રખ્યાત રજવાડી ચા નો મસાલો',
    category: 'beverage',
    categoryLabel: 'Royal Tea Spice Blend',
    shortDescription:
      'Warming royal blend of cardamom, ginger, black pepper, clove, and cinnamon that transforms every cup of Indian milk tea into aromatic Rajwadi Chai.',
    culinaryUsage: 'Morning & Evening Masala Chai, Ukala & Spiced Milk',
    image: '/assets/aistudio/Screenshot_2026-10-30-12-45-35-29_7352322957d4404136654ef4adb64504_a527ff6f.jpg',
    secondaryImage: '/assets/aistudio/Screenshot_2026-10-30-12-45-27-50_7352322957d4404136654ef4adb64504_7ea18a76.jpg',
    packVariants: ['₹5 Retail Pouch', '₹10 Family Pouch'],
    accentColor: '#D97706',
    cardBg: '#FEFCE8',
    verifiedHighlights: ['ISO 9001:2015 Certified', 'No Onion · No Garlic · No Salt', 'No Added Colours or Flavours'],
  },
];

// 10 Tall Visual Cards for the Signature Reelmark Curved Carousel
export const HERO_CAROUSEL_CARDS: CarouselCardItem[] = [
  {
    id: 'card-1',
    type: 'product',
    title: 'Dal-Shak Masalo',
    subtitle: 'Everyday Homestyle Dal & Sabji Blend',
    tag: '01 · Core Staple',
    image: '/assets/aistudio/Screenshot_2026-10-30-12-45-53-52_7352322957d4404136654ef4adb64504_d220095e.jpg',
    accentColor: '#B91C1C',
    bgTint: '#FFFFFF',
    productId: 'dal-shak-masalo',
    imageCropStyle: 'full-pack',
  },
  {
    id: 'card-2',
    type: 'product',
    title: 'Vaghareli Khichdi Masalo',
    subtitle: 'Nadiad’s Famous Spiced Khichdi Blend',
    tag: '02 · Regional Favourite',
    image: '/assets/aistudio/Screenshot_2026-10-30-12-45-59-54_7352322957d4404136654ef4adb64504_f4b1e4ed.jpg',
    accentColor: '#0284C7',
    bgTint: '#FFFFFF',
    productId: 'vaghareli-khichdi-masalo',
    imageCropStyle: 'full-pack',
  },
  {
    id: 'card-3',
    type: 'product',
    title: 'Dhana-Jeera Powder',
    subtitle: 'Pure Coriander & Cumin Kitchen Base',
    tag: '03 · Pure Ground Spice',
    image: '/assets/aistudio/Screenshot_2026-10-30-12-45-48-19_7352322957d4404136654ef4adb64504_93dc7096.jpg',
    accentColor: '#15803D',
    bgTint: '#FFFFFF',
    productId: 'dhana-jeera-powder',
    imageCropStyle: 'full-pack',
  },
  {
    id: 'card-4',
    type: 'product',
    title: 'Chhas Masala',
    subtitle: 'Refreshing Buttermilk, Raita & Sharbat Spice',
    tag: '04 · Box Pack',
    image: '/assets/aistudio/Screenshot_2026-10-30-12-45-42-49_7352322957d4404136654ef4adb64504_e64e9732.jpg',
    accentColor: '#0D9488',
    bgTint: '#FFFFFF',
    productId: 'chhas-masala',
    imageCropStyle: 'full-pack',
  },
  {
    id: 'card-5',
    type: 'product',
    title: 'Rajwadi Chai Masalo',
    subtitle: 'Aromatic Royal Indian Tea Spice Mix',
    tag: '05 · Beverage Bestseller',
    image: '/assets/aistudio/Screenshot_2026-10-30-12-45-35-29_7352322957d4404136654ef4adb64504_a527ff6f.jpg',
    accentColor: '#D97706',
    bgTint: '#FFFFFF',
    productId: 'rajwadi-chai-masalo',
    imageCropStyle: 'full-pack',
  },
  {
    id: 'card-6',
    type: 'product',
    title: 'Special Natural Masalo',
    subtitle: 'Traditional Dark-Roasted Gujarati Spice',
    tag: '06 · Nadiad Special',
    image: '/assets/aistudio/Screenshot_2026-10-30-12-46-22-57_7352322957d4404136654ef4adb64504_9ff72a62.jpg',
    accentColor: '#78350F',
    bgTint: '#FFFFFF',
    productId: 'special-natural-masalo',
    imageCropStyle: 'full-pack',
  },
  {
    id: 'card-7',
    type: 'product',
    title: 'All-in-One Masalo',
    subtitle: 'Complete Multi-Purpose Culinary Spice',
    tag: '07 · All-In-One Blend',
    image: '/assets/aistudio/Screenshot_2026-10-30-12-46-06-47_7352322957d4404136654ef4adb64504_392ca6c5.jpg',
    accentColor: '#92400E',
    bgTint: '#FFFFFF',
    productId: 'all-in-one-masalo',
    imageCropStyle: 'full-pack',
  },
  {
    id: 'card-8',
    type: 'culinary',
    title: 'Freshly Ground Indian Spices',
    subtitle: 'Cleaned Coriander, Roasted Cumin & Whole Aromatics',
    tag: '08 · Raw Ingredient Quality',
    image: '/assets/aistudio/Screenshot_2026-10-30-12-45-48-19_7352322957d4404136654ef4adb64504_93dc7096.jpg',
    accentColor: '#15803D',
    bgTint: '#1F140E',
    productId: 'dhana-jeera-powder',
    imageCropStyle: 'macro-spices',
  },
  {
    id: 'card-9',
    type: 'culinary',
    title: 'Authentic Indian Cooking',
    subtitle: 'Homestyle Dal-Sabji & Vaghareli Khichdi in Every Kitchen',
    tag: '09 · Culinary Heritage',
    image: '/assets/aistudio/Screenshot_2026-10-30-12-46-17-05_7352322957d4404136654ef4adb64504_4ee69070.jpg',
    accentColor: '#B91C1C',
    bgTint: '#FFFFFF',
    productId: 'dal-shak-masalo',
    imageCropStyle: 'macro-cooking',
  },
  {
    id: 'card-10',
    type: 'culinary',
    title: 'Whole Spices & Ingredients',
    subtitle: 'Star Anise, Cinnamon, Cardamom, Cloves & Black Pepper',
    tag: '10 · Whole Spice Craft',
    image: '/assets/aistudio/Screenshot_2026-10-30-12-46-06-47_7352322957d4404136654ef4adb64504_392ca6c5.jpg',
    accentColor: '#D97706',
    bgTint: '#1F140E',
    productId: 'all-in-one-masalo',
    imageCropStyle: 'macro-ingredients',
  },
];

export const DISTRIBUTOR_HIGHLIGHTS = [
  {
    index: '01',
    title: 'Opportunity to Distribute Across India',
    description:
      'Expand your wholesale or FMCG distribution footprint with a brand built for kirana stores, supermarkets, semi-wholesalers, and regional retail counters across India.',
  },
  {
    index: '02',
    title: 'Diverse Range of High-Velocity Masala Products',
    description:
      'From daily cooking staples like Dal-Shak Masalo and Dhana-Jeera Powder to regional favourites like Vaghareli Khichdi Masalo, Chhas Masala, and Rajwadi Chai Masalo.',
  },
  {
    index: '03',
    title: 'Growing Demand for Everyday Indian Spices',
    description:
      'Available in fast-moving ₹5 and ₹10 retail sachets as well as box packs—designed for high repeat household consumption and effortless kirana shelf movement.',
  },
  {
    index: '04',
    title: 'Long-Term Business Partnership',
    description:
      'We believe in transparent, relationship-driven trade built on consistent product quality, dependable supply, and direct communication with our brand team.',
  },
  {
    index: '05',
    title: 'Build Your Own Distribution Network',
    description:
      'Supply local retailers, horeca buyers, and sub-stockists in your city and district with attractive, shelf-ready packaging that customers recognize and trust.',
  },
];

export const INDIAN_STATES = [
  'Gujarat',
  'Maharashtra',
  'Rajasthan',
  'Madhya Pradesh',
  'Delhi NCR',
  'Uttar Pradesh',
  'Karnataka',
  'Telangana',
  'Tamil Nadu',
  'West Bengal',
  'Punjab',
  'Haryana',
  'Bihar',
  'Chhattisgarh',
  'Goa',
  'Other State / UT',
];

export const BUSINESS_TYPES = [
  'FMCG / Masala Distributor',
  'Wholesale Spice Trader / Stockist',
  'Super Stockist / C&F Agent',
  'Retail Chain / Supermarket Buyer',
  'HoReCa / Catering Supplier',
  'New Distribution Business Venture',
];

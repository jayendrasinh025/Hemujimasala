import React, { useState, useEffect } from 'react';
import {
  ArrowRight,
  ArrowUpRight,
  Building2,
  CheckCircle2,
  Copy,
  Check,
  ExternalLink,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Phone,
  ShieldCheck,
  Sparkles,
  Store,
  Truck,
  Users,
  X,
} from 'lucide-react';
import {
  BRAND_CONTACT,
  BUSINESS_TYPES,
  DISTRIBUTOR_HIGHLIGHTS,
  INDIAN_STATES,
  PRODUCTS,
  ProductItem,
} from './data/hemujiData';
import { CurvedCarousel } from './components/CurvedCarousel';
import {
  CurvedArrowLeftToCarousel,
  CurvedArrowRightToCarousel,
  SpiceMortarSketch,
  SpiceStarAniseSketch,
} from './components/HandDrawnAccents';

interface EnquiryFormState {
  fullName: string;
  mobile: string;
  city: string;
  state: string;
  businessName: string;
  businessType: string;
  selectedProducts: string[];
  message: string;
}

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<'all' | 'everyday' | 'specialty' | 'beverage'>('all');
  const [activePackView, setActivePackView] = useState<Record<string, 'primary' | 'secondary'>>({});
  const [selectedModalProduct, setSelectedModalProduct] = useState<ProductItem | null>(null);

  // Distributor Enquiry Form state
  const [formData, setFormData] = useState<EnquiryFormState>({
    fullName: '',
    mobile: '',
    city: '',
    state: 'Gujarat',
    businessName: '',
    businessType: BUSINESS_TYPES[0],
    selectedProducts: ['Vaghareli Khichdi Masalo', 'Dal-Shak Masalo'],
    message: '',
  });
  const [formErrors, setFormErrors] = useState<Partial<Record<keyof EnquiryFormState, string>>>({});
  const [enquiryPrepared, setEnquiryPrepared] = useState(false);
  const [copiedWhatsappText, setCopiedWhatsappText] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const filteredProducts =
    activeCategory === 'all'
      ? PRODUCTS
      : PRODUCTS.filter((p) => p.category === activeCategory);

  const handleEnquireProduct = (productName: string) => {
    setFormData((prev) => {
      const exists = prev.selectedProducts.includes(productName);
      return {
        ...prev,
        selectedProducts: exists ? prev.selectedProducts : [...prev.selectedProducts, productName],
      };
    });
    setSelectedModalProduct(null);
    const enquiryEl = document.getElementById('enquiry');
    if (enquiryEl) {
      enquiryEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleCarouselSelectProduct = (productId: string) => {
    const found = PRODUCTS.find((p) => p.id === productId);
    if (found) {
      setSelectedModalProduct(found);
    }
  };

  const toggleProductSelection = (productName: string) => {
    setFormData((prev) => {
      const exists = prev.selectedProducts.includes(productName);
      const updated = exists
        ? prev.selectedProducts.filter((p) => p !== productName)
        : [...prev.selectedProducts, productName];
      return { ...prev, selectedProducts: updated };
    });
  };

  const buildWhatsAppMessage = () => {
    const lines = [
      `*NEW DISTRIBUTOR ENQUIRY — HEMUJI MASALA*`,
      `----------------------------------`,
      `*Full Name:* ${formData.fullName.trim() || 'Not specified'}`,
      `*Mobile Number:* ${formData.mobile.trim() || 'Not specified'}`,
      `*City & State:* ${formData.city.trim() || 'Not specified'}, ${formData.state}`,
      `*Business Name:* ${formData.businessName.trim() || 'Not specified'}`,
      `*Business Type:* ${formData.businessType}`,
      `*Interested Products:* ${
        formData.selectedProducts.length > 0 ? formData.selectedProducts.join(', ') : 'Full Product Range'
      }`,
      formData.message.trim() ? `*Additional Note:* ${formData.message.trim()}` : '',
      `----------------------------------`,
      `Sent via Hemuji Masala Official Website`,
    ].filter(Boolean);
    return lines.join('\n');
  };

  const validateForm = () => {
    const errors: Partial<Record<keyof EnquiryFormState, string>> = {};
    if (!formData.fullName.trim() || formData.fullName.trim().length < 2) {
      errors.fullName = 'Please enter your full name.';
    }
    const cleanedMobile = formData.mobile.replace(/[\s\-+]/g, '');
    if (!/^(91)?[6-9]\d{9}$/.test(cleanedMobile)) {
      errors.mobile = 'Please enter a valid 10-digit Indian mobile number.';
    }
    if (!formData.city.trim()) {
      errors.city = 'Please enter your city or district.';
    }
    if (!formData.state.trim()) {
      errors.state = 'Please select your state.';
    }
    if (!formData.businessName.trim()) {
      errors.businessName = 'Please enter your firm or business name.';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmitEnquiry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setEnquiryPrepared(true);
    const encodedText = encodeURIComponent(buildWhatsAppMessage());
    const whatsappUrl = `https://wa.me/${BRAND_CONTACT.whatsappNumber}?text=${encodedText}`;

    // Navigate via anchor click so the visitor can review and press Send in WhatsApp
    const anchor = document.createElement('a');
    anchor.href = whatsappUrl;
    anchor.target = '_blank';
    anchor.rel = 'noopener noreferrer';
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
  };

  const handleCopyMessage = async () => {
    try {
      await navigator.clipboard.writeText(buildWhatsAppMessage());
      setCopiedWhatsappText(true);
      setTimeout(() => setCopiedWhatsappText(false), 2500);
    } catch {
      // ignore clipboard error
    }
  };

  return (
    <div className="min-h-screen bg-[#FBF8F3] text-[#1F140E] flex flex-col">
      {/* 4. HEADER / NAVIGATION (Strict 3-Zone Top Bar Contract) */}
      <header
        className={`sticky top-0 z-50 transition-all duration-200 ${
          isScrolled
            ? 'bg-[#FBF8F3]/92 backdrop-blur-md border-b border-[#1F140E]/10 py-3 shadow-[0_4px_24px_rgba(31,20,14,0.05)]'
            : 'bg-[#FBF8F3]/70 border-b border-[#1F140E]/6 py-4'
        }`}
      >
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-8">
          {/* Zone 1: Brand Logo & Single-Line Wordmark */}
          <a
            href="#home"
            className="flex items-center gap-3 whitespace-nowrap shrink-0 group focus:outline-none"
          >
            <span className="inline-flex items-center justify-center w-14 h-9 rounded-[50%] overflow-hidden border-2 border-[#B91C1C]/25 bg-[#B91C1C] shadow-sm shrink-0">
              <img
                src={BRAND_CONTACT.logoImage}
                alt="Hemuji Masala Logo"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover scale-105"
              />
            </span>
            <span className="font-display text-xl sm:text-2xl font-bold tracking-tight text-[#1F140E] group-hover:text-[#B91C1C] transition-colors">
              Hemuji Masala
            </span>
          </a>

          {/* Zone 2: 5 Concise Single-Line Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-[#5C493E]">
            <a
              href="#home"
              className="hover:text-[#B91C1C] transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 border-transparent hover:border-[#B91C1C]"
            >
              Home
            </a>
            <a
              href="#about"
              className="hover:text-[#B91C1C] transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 border-transparent hover:border-[#B91C1C]"
            >
              About Us
            </a>
            <a
              href="#products"
              className="hover:text-[#B91C1C] transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 border-transparent hover:border-[#B91C1C]"
            >
              Our Products
            </a>
            <a
              href="#opportunity"
              className="hover:text-[#B91C1C] transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 border-transparent hover:border-[#B91C1C]"
            >
              Distributor Opportunity
            </a>
            <a
              href="#contact"
              className="hover:text-[#B91C1C] transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 border-transparent hover:border-[#B91C1C]"
            >
              Contact
            </a>
          </nav>

          {/* Zone 3: 1 Prominent Primary Action Button (+ Mobile Menu Toggle) */}
          <div className="flex items-center gap-3 shrink-0">
            <a
              href="#enquiry"
              className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-[#B91C1C] hover:bg-[#991B1B] rounded-xl shadow-[0_6px_18px_rgba(185,28,28,0.25)] transition-all duration-150 whitespace-nowrap shrink-0"
            >
              <span>Become a Distributor</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="lg:hidden inline-flex items-center justify-center w-10 h-10 rounded-xl border border-[#1F140E]/12 text-[#1F140E] hover:bg-[#1F140E]/5 transition-colors cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Compact Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-[#1F140E]/10 bg-[#FBF8F3] px-4 pt-3 pb-5 space-y-2">
            {[
              { label: 'Home', href: '#home' },
              { label: 'About Us', href: '#about' },
              { label: 'Our Products', href: '#products' },
              { label: 'Distributor Opportunity', href: '#opportunity' },
              { label: 'Contact', href: '#contact' },
            ].map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-lg text-sm font-medium text-[#1F140E] hover:bg-[#B91C1C]/8 hover:text-[#B91C1C]"
              >
                {item.label}
              </a>
            ))}
            <div className="pt-2">
              <a
                href="#enquiry"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-white bg-[#B91C1C] rounded-xl"
              >
                <span>Become a Distributor</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        )}
      </header>

      <main className="flex-1">
        {/* 5. HERO SECTION — Reelmark Centered Editorial Layout + Arched Cylindrical Carousel */}
        <section id="home" className="relative pt-8 sm:pt-12 lg:pt-16 pb-12 sm:pb-20 overflow-hidden">
          {/* Subtle Warm Radial Backdrop */}
          <div
            className="pointer-events-none absolute inset-x-0 top-0 h-[520px] opacity-60"
            style={{
              background:
                'radial-gradient(60% 55% at 50% 22%, rgba(245, 158, 11, 0.12) 0%, rgba(185, 28, 28, 0.05) 55%, transparent 100%)',
            }}
          />

          <div className="relative max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
            {/* Top Trust / Brand Kicker (Zero-Pill clean typographic metadata) */}
            <div className="flex flex-wrap items-center justify-center gap-2 text-xs sm:text-sm font-semibold tracking-wide text-[#991B1B] mb-4">
              <span>AUTHENTIC INDIAN SPICES & MASALA MANUFACTURER</span>
              <span aria-hidden="true">·</span>
              <span className="text-[#5C493E]">NADIAD, GUJARAT</span>
              <span aria-hidden="true">·</span>
              <span className="text-[#15803D]">ISO 9001:2015 CERTIFIED</span>
            </div>

            {/* Main Headline */}
            <div className="relative max-w-4xl mx-auto text-center">
              {/* Subtle Hand-Drawn Spice Accents (Desktop) */}
              <div className="hidden xl:flex flex-col items-center absolute -left-24 top-4 text-[#B91C1C]/75 pointer-events-none">
                <SpiceStarAniseSketch className="w-11 h-11 mb-1" />
                <span className="font-display italic text-xs text-[#5C493E]">
                  Authentic Nadiad blends
                </span>
                <CurvedArrowLeftToCarousel className="w-28 h-16 mt-1" />
              </div>

              <div className="hidden xl:flex flex-col items-center absolute -right-24 top-4 text-[#D97706]/85 pointer-events-none">
                <SpiceMortarSketch className="w-11 h-11 mb-1" />
                <span className="font-display italic text-xs text-[#5C493E]">
                  High-velocity ₹5 & ₹10 packs
                </span>
                <CurvedArrowRightToCarousel className="w-28 h-16 mt-1" />
              </div>

              <h1
                className="font-display font-bold text-[#1F140E] tracking-tight leading-[1.08] mx-auto"
                style={{
                  fontSize: 'clamp(2.35rem, 4.8vw, 4.35rem)',
                  textWrap: 'balance',
                }}
              >
                Bring the Taste of{' '}
                <span className="text-[#B91C1C] underline decoration-[#F59E0B]/60 decoration-wavy decoration-2 underline-offset-8">
                  Hemuji
                </span>{' '}
                to Every Home.
              </h1>

              <p className="mt-5 text-base sm:text-lg text-[#5C493E] max-w-2xl mx-auto leading-relaxed">
                Partner with Hemuji Masala and grow your business with quality masala products, a
                trusted brand and a long-term distribution opportunity.
              </p>

              {/* Hero CTAs */}
              <div className="mt-7 sm:mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4">
                <a
                  href="#enquiry"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 text-sm sm:text-base font-semibold text-white bg-[#B91C1C] hover:bg-[#991B1B] rounded-xl shadow-[0_10px_28px_rgba(185,28,28,0.28)] hover:-translate-y-0.5 transition-all duration-150 whitespace-nowrap shrink-0"
                >
                  <span>Become a Distributor</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
                <a
                  href="#products"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm sm:text-base font-semibold text-[#1F140E] bg-white hover:bg-[#F4EFE6] border border-[#1F140E]/15 rounded-xl transition-all duration-150 whitespace-nowrap shrink-0"
                >
                  <span>Explore Our Products</span>
                </a>
              </div>
            </div>
          </div>

          {/* Centerpiece: Reelmark-Inspired Curved Cylindrical Carousel (Full Viewport Bleed) */}
          <div className="mt-6 sm:mt-8 lg:mt-10 w-full">
            <CurvedCarousel onSelectProduct={handleCarouselSelectProduct} />
          </div>

          {/* Proof / Trade Highlights Strip directly below Hero */}
          <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 mt-10">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 pt-8 border-t border-[#1F140E]/10">
              <div>
                <div className="font-mono text-xl sm:text-2xl font-semibold text-[#B91C1C] tabular-nums">
                  7+ Core Lines
                </div>
                <p className="text-xs sm:text-sm text-[#5C493E] mt-1">
                  Everyday masalas, regional specialties & beverage blends
                </p>
              </div>
              <div>
                <div className="font-mono text-xl sm:text-2xl font-semibold text-[#1F140E] tabular-nums">
                  ₹5 & ₹10 Packs
                </div>
                <p className="text-xs sm:text-sm text-[#5C493E] mt-1">
                  Fast-moving price points engineered for kirana & retail velocity
                </p>
              </div>
              <div>
                <div className="font-mono text-xl sm:text-2xl font-semibold text-[#15803D] tabular-nums">
                  ISO 9001:2015
                </div>
                <p className="text-xs sm:text-sm text-[#5C493E] mt-1">
                  Certified quality management & hygienic spice packaging
                </p>
              </div>
              <div>
                <div className="font-mono text-xl sm:text-2xl font-semibold text-[#D97706] tabular-nums">
                  No Onion · No Garlic
                </div>
                <p className="text-xs sm:text-sm text-[#5C493E] mt-1">
                  Pure vegetarian formulations suitable for every Indian household
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 6. DISTRIBUTOR OPPORTUNITY SECTION — Primary Business Section */}
        <section
          id="opportunity"
          className="py-16 sm:py-24 bg-[#F4EFE6] border-y border-[#1F140E]/8"
        >
          <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
              {/* Left Column: Value Proposition & CTA */}
              <div className="lg:col-span-5 lg:sticky lg:top-28">
                <div className="text-xs font-semibold tracking-wider text-[#B91C1C] mb-3">
                  PAN-INDIA DISTRIBUTION PARTNERSHIP
                </div>
                <h2
                  className="font-display text-3xl sm:text-4xl font-bold text-[#1F140E] tracking-tight leading-tight"
                  style={{ textWrap: 'balance' }}
                >
                  Become a Hemuji Masala Distributor
                </h2>
                <p className="mt-4 text-base text-[#5C493E] leading-relaxed">
                  Join our growing distribution network and bring authentic masala products to
                  customers across India.
                </p>

                {/* Retail Pack Advantage Showcase */}
                <div className="mt-6 p-5 rounded-2xl bg-[#FBF8F3] border border-[#1F140E]/10">
                  <div className="text-xs font-semibold text-[#1F140E] mb-3">
                    PACK FORMATS READY FOR GENERAL & MODERN TRADE
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3.5 rounded-xl bg-white border border-[#1F140E]/8">
                      <div className="font-mono text-lg font-bold text-[#B91C1C] tabular-nums">
                        ₹5 Sachets
                      </div>
                      <p className="text-xs text-[#5C493E] mt-1">
                        High-turnover impulse & daily kirana store packs in regional scripts.
                      </p>
                    </div>
                    <div className="p-3.5 rounded-xl bg-white border border-[#1F140E]/8">
                      <div className="font-mono text-lg font-bold text-[#D97706] tabular-nums">
                        ₹10 & Box Packs
                      </div>
                      <p className="text-xs text-[#5C493E] mt-1">
                        Household pouches & Chhas Masala boxes for supermarkets & wholesalers.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-7 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  <a
                    href="#enquiry"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-[#B91C1C] hover:bg-[#991B1B] rounded-xl shadow-[0_8px_22px_rgba(185,28,28,0.22)] transition-all whitespace-nowrap shrink-0"
                  >
                    <span>Start Your Distribution Journey</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                  <a
                    href={`https://wa.me/${BRAND_CONTACT.whatsappNumber}?text=${encodeURIComponent(
                      'Hello Hemuji Masala Team, I am interested in becoming a distributor in my city. Please share details.'
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-5 py-3.5 text-sm font-semibold text-[#1F140E] bg-white hover:bg-[#FBF8F3] border border-[#1F140E]/15 rounded-xl transition-colors whitespace-nowrap shrink-0"
                  >
                    <MessageCircle className="w-4 h-4 text-[#15803D]" />
                    <span>Direct WhatsApp</span>
                  </a>
                </div>
              </div>

              {/* Right Column: 5 Numbered Editorial Opportunity Pillars */}
              <div className="lg:col-span-7 space-y-4">
                {DISTRIBUTOR_HIGHLIGHTS.map((item) => (
                  <div
                    key={item.index}
                    className="p-6 sm:p-7 rounded-2xl bg-[#FBF8F3] border border-[#1F140E]/10 hover:border-[#B91C1C]/35 transition-colors"
                  >
                    <div className="flex items-start gap-4">
                      <span className="font-mono text-sm font-semibold text-[#B91C1C] pt-1 tabular-nums shrink-0">
                        {item.index}.
                      </span>
                      <div>
                        <h3 className="font-display text-lg sm:text-xl font-bold text-[#1F140E]">
                          {item.title}
                        </h3>
                        <p className="mt-2 text-sm sm:text-base text-[#5C493E] leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Official Business Terms Transparency Note */}
                <div className="p-5 rounded-2xl bg-white/80 border border-[#1F140E]/10 flex items-start gap-3.5 text-xs sm:text-sm text-[#5C493E]">
                  <ShieldCheck className="w-5 h-5 text-[#15803D] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#1F140E] font-semibold">
                      Transparent Trade Discussion:
                    </strong>{' '}
                    Commercial terms, product rate cards, dispatch schedules, and regional supply
                    arrangements are shared directly by the Hemuji Masala management team upon
                    receiving your distributor enquiry.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 7. OUR PRODUCT RANGE — Authentic Product Showcase (No E-Commerce Cart) */}
        <section id="products" className="py-16 sm:py-24 bg-[#FBF8F3]">
          <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
              <div>
                <div className="text-xs font-semibold tracking-wider text-[#B91C1C] mb-2">
                  AUTHENTIC PACKAGING · HIGH REPEAT DEMAND
                </div>
                <h2
                  className="font-display text-3xl sm:text-4xl font-bold text-[#1F140E] tracking-tight"
                  style={{ textWrap: 'balance' }}
                >
                  Our Masala & Spice Range
                </h2>
                <p className="mt-2 text-base text-[#5C493E] max-w-2xl">
                  Explore our complete portfolio of everyday cooking masalas, regional Nadiad
                  specialties, and beverage spice blends. Toggle pack views to inspect both ₹10 and
                  ₹5 retail formats.
                </p>
              </div>

              {/* Interactive Category Filter Controls */}
              <div className="flex flex-wrap items-center gap-1.5 p-1.5 bg-[#F4EFE6] rounded-xl border border-[#1F140E]/8 self-start">
                {[
                  { id: 'all', label: 'All Products (7)' },
                  { id: 'everyday', label: 'Everyday Cooking' },
                  { id: 'specialty', label: 'Nadiad Specialties' },
                  { id: 'beverage', label: 'Chai & Chhas' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveCategory(tab.id as typeof activeCategory)}
                    className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                      activeCategory === tab.id
                        ? 'bg-[#1F140E] text-white shadow-sm'
                        : 'text-[#5C493E] hover:text-[#1F140E]'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Product Grid (3 Columns Desktop, 2 Tablet, 1 Mobile) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {filteredProducts.map((product) => {
                const currentView = activePackView[product.id] || 'primary';
                const displayImage =
                  currentView === 'secondary' && product.secondaryImage
                    ? product.secondaryImage
                    : product.image;

                return (
                  <article
                    key={product.id}
                    className="group rounded-2xl bg-white border border-[#1F140E]/10 overflow-hidden flex flex-col justify-between transition-transform duration-200 hover:-translate-y-1 hover:shadow-[0_20px_40px_-15px_rgba(31,20,14,0.12)]"
                  >
                    <div>
                      {/* Top Meta Line inside Card */}
                      <div className="px-6 pt-5 pb-2 flex items-center justify-between text-xs text-[#5C493E]">
                        <span className="font-medium">{product.categoryLabel}</span>
                        <span className="font-mono text-[11px] text-[#1F140E]/70 tabular-nums">
                          {product.packVariants.join(' · ')}
                        </span>
                      </div>

                      {/* Product Image Stage */}
                      <div className="relative px-6 py-2 flex items-center justify-center bg-white">
                        <div
                          onClick={() => setSelectedModalProduct(product)}
                          className="w-full aspect-square max-h-[290px] overflow-hidden flex items-center justify-center cursor-pointer"
                        >
                          <img
                            src={displayImage}
                            alt={product.name}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>

                        {/* Interactive Pack Format Switcher if product has both ₹10 and ₹5 photos */}
                        {product.secondaryImage && (
                          <div className="absolute bottom-3 right-5 flex items-center gap-1 bg-[#FBF8F3]/95 backdrop-blur-sm p-1 rounded-lg border border-[#1F140E]/12 shadow-sm">
                            <button
                              type="button"
                              onClick={() =>
                                setActivePackView((prev) => ({ ...prev, [product.id]: 'primary' }))
                              }
                              className={`px-2 py-1 text-[11px] font-mono font-medium rounded transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                                currentView === 'primary'
                                  ? 'bg-[#B91C1C] text-white'
                                  : 'text-[#5C493E] hover:text-[#1F140E]'
                              }`}
                            >
                              Pack 1
                            </button>
                            <button
                              type="button"
                              onClick={() =>
                                setActivePackView((prev) => ({ ...prev, [product.id]: 'secondary' }))
                              }
                              className={`px-2 py-1 text-[11px] font-mono font-medium rounded transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                                currentView === 'secondary'
                                  ? 'bg-[#B91C1C] text-white'
                                  : 'text-[#5C493E] hover:text-[#1F140E]'
                              }`}
                            >
                              Pack 2
                            </button>
                          </div>
                        )}
                      </div>

                      {/* Product Details */}
                      <div className="px-6 pt-3 pb-5">
                        <h3 className="font-display text-xl font-bold text-[#1F140E]">
                          {product.name}
                        </h3>
                        {product.regionalName && (
                          <p className="text-xs font-medium text-[#991B1B] mt-0.5">
                            {product.regionalName}
                          </p>
                        )}
                        <p className="mt-2.5 text-sm text-[#5C493E] leading-relaxed">
                          {product.shortDescription}
                        </p>

                        {/* Unboxed Verified Highlights (Zero-Pill Rule) */}
                        <div className="mt-4 pt-3 border-t border-[#1F140E]/8 text-xs text-[#5C493E] flex flex-wrap items-center gap-x-2 gap-y-1">
                          {product.verifiedHighlights.map((hl, idx) => (
                            <React.Fragment key={hl}>
                              {idx > 0 && <span aria-hidden="true">·</span>}
                              <span>{hl}</span>
                            </React.Fragment>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Product Action Footer */}
                    <div className="px-6 py-4 bg-[#FBF8F3] border-t border-[#1F140E]/8 flex items-center justify-between gap-3">
                      <button
                        type="button"
                        onClick={() => setSelectedModalProduct(product)}
                        className="text-xs font-semibold text-[#5C493E] hover:text-[#1F140E] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                      >
                        View Pack Details
                      </button>
                      <button
                        type="button"
                        onClick={() => handleEnquireProduct(product.name)}
                        className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-[#1F140E] hover:bg-[#B91C1C] rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                      >
                        <span>Enquire for Distribution</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* 8. WHY HEMUJI MASALA? — Asymmetric Bento Brand-Value Section */}
        <section className="py-16 sm:py-24 bg-[#F4EFE6] border-t border-[#1F140E]/8">
          <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mb-12">
              <div className="text-xs font-semibold tracking-wider text-[#B91C1C] mb-2">
                WHY PARTNER WITH HEMUJI MASALA
              </div>
              <h2
                className="font-display text-3xl sm:text-4xl font-bold text-[#1F140E] tracking-tight"
                style={{ textWrap: 'balance' }}
              >
                Crafted for Indian Kitchens. Packaged for High Retail Movement.
              </h2>
              <p className="mt-3 text-base text-[#5C493E] leading-relaxed">
                Distributors and wholesalers choose Hemuji Masala because our blends combine
                time-tested regional flavour profiles with eye-catching, accessible retail packaging.
              </p>
            </div>

            {/* Asymmetric Bento Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Feature 1: 7-col Span with Real Packaging Visual */}
              <div className="lg:col-span-7 rounded-2xl bg-[#FBF8F3] border border-[#1F140E]/10 p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-6">
                <div className="flex-1">
                  <div className="text-xs font-mono font-semibold text-[#B91C1C]">
                    01 · SHELF-READY PACKAGING
                  </div>
                  <h3 className="font-display text-2xl font-bold text-[#1F140E] mt-2">
                    Distinctive Color-Coded Pouches & Box Packs
                  </h3>
                  <p className="mt-3 text-sm sm:text-base text-[#5C493E] leading-relaxed">
                    Each product in the Hemuji range features vibrant, color-distinct pouches in
                    English, Gujarati, and Hindi lettering with clear ₹5 and ₹10 price visibility—making
                    it effortless for kirana shopkeepers to display and customers to pick up.
                  </p>
                  <div className="mt-4 text-xs font-medium text-[#1F140E]/80">
                    English, Hindi & Gujarati Packs · Clear MRP Callouts · Hygienic Laminated Pouches
                  </div>
                </div>
                <div className="w-44 sm:w-48 aspect-square rounded-xl bg-white border border-[#1F140E]/8 p-2 shrink-0 flex items-center justify-center">
                  <img
                    src="/assets/aistudio/Screenshot_2026-10-30-12-45-35-29_7352322957d4404136654ef4adb64504_a527ff6f.jpg"
                    alt="Hemuji Rajwadi Chai Masalo Packaging"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>

              {/* Feature 2: 5-col Span */}
              <div className="lg:col-span-5 rounded-2xl bg-[#1F140E] text-[#FBF8F3] p-6 sm:p-8 flex flex-col justify-between">
                <div>
                  <div className="text-xs font-mono font-semibold text-[#FBBF24]">
                    02 · EVERYDAY CULINARY APPLICATIONS
                  </div>
                  <h3 className="font-display text-2xl font-bold text-white mt-2">
                    From Morning Chai to Dinner Khichdi & Dal
                  </h3>
                  <p className="mt-3 text-sm sm:text-base text-[#E7DDD3]/85 leading-relaxed">
                    Unlike seasonal specialty items, Hemuji products are used multiple times a day—in
                    morning Rajwadi Chai, afternoon Dal-Sabji and Chhas, and evening Vaghareli
                    Khichdi.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-white/12 flex items-center justify-between text-xs text-[#FBBF24]">
                  <span>High Frequency Household Repeat</span>
                  <Sparkles className="w-4 h-4" />
                </div>
              </div>

              {/* Feature 3: 4-col Span */}
              <div className="lg:col-span-4 rounded-2xl bg-[#FBF8F3] border border-[#1F140E]/10 p-6 sm:p-7">
                <div className="text-xs font-mono font-semibold text-[#15803D]">
                  03 · VERIFIED PACK STANDARDS
                </div>
                <h3 className="font-display text-xl font-bold text-[#1F140E] mt-2">
                  Pure Vegetarian · No Onion · No Garlic
                </h3>
                <p className="mt-2.5 text-sm text-[#5C493E] leading-relaxed">
                  As printed on our certified pouches, Hemuji masalas are formulated without onion,
                  garlic, or added artificial colours and flavours—expanding your customer base to
                  all traditional households.
                </p>
              </div>

              {/* Feature 4: 4-col Span */}
              <div className="lg:col-span-4 rounded-2xl bg-[#FBF8F3] border border-[#1F140E]/10 p-6 sm:p-7">
                <div className="text-xs font-mono font-semibold text-[#D97706]">
                  04 · AUTHENTIC NADIAD FLAVOUR
                </div>
                <h3 className="font-display text-xl font-bold text-[#1F140E] mt-2">
                  Signature Regional Taste Profile
                </h3>
                <p className="mt-2.5 text-sm text-[#5C493E] leading-relaxed">
                  Rooted in Nadiad’s rich culinary tradition, our Vaghareli Khichdi Masalo, Special
                  Natural Masalo, and Dal-Shak Masalo deliver unmistakable aroma and consistency.
                </p>
              </div>

              {/* Feature 5: 4-col Span */}
              <div className="lg:col-span-4 rounded-2xl bg-[#FBF8F3] border border-[#1F140E]/10 p-6 sm:p-7">
                <div className="text-xs font-mono font-semibold text-[#B91C1C]">
                  05 · TRADE PARTNERSHIP
                </div>
                <h3 className="font-display text-xl font-bold text-[#1F140E] mt-2">
                  Built for Wholesalers & Stockists
                </h3>
                <p className="mt-2.5 text-sm text-[#5C493E] leading-relaxed">
                  Whether you supply urban supermarkets, rural kirana networks, or catering counters,
                  our multi-format range helps you serve every retail tier effectively.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 9. ABOUT THE BRAND — "Adding Flavour to Every Kitchen." */}
        <section id="about" className="py-16 sm:py-24 bg-[#FBF8F3] border-t border-[#1F140E]/8">
          <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
              {/* Left Column: Brand Story */}
              <div className="lg:col-span-6 flex flex-col justify-center">
                <div className="text-xs font-semibold tracking-wider text-[#B91C1C] mb-2">
                  ABOUT HEMUJI MASALA
                </div>
                <h2
                  className="font-display text-3xl sm:text-4xl lg:text-[42px] font-bold text-[#1F140E] tracking-tight leading-tight"
                  style={{ textWrap: 'balance' }}
                >
                  Adding Flavour to Every Kitchen.
                </h2>
                <p className="mt-5 text-base sm:text-lg text-[#5C493E] leading-relaxed">
                  Hemuji Masala is an Indian spices and masala brand dedicated to crafting authentic,
                  aromatic spice blends that make everyday cooking effortless and deeply flavourful.
                </p>
                <p className="mt-4 text-sm sm:text-base text-[#5C493E] leading-relaxed">
                  Known for Nadiad’s popular spice preparations—including Vaghareli Khichdi Masalo,
                  Dal-Shak Masalo, Special Natural Masalo, All-in-One Masalo, Dhana-Jeera Powder,
                  Chhas Masala, and Rajwadi Chai Masalo—our focus is on delivering honest quality in
                  convenient, affordable pack sizes.
                </p>
                <p className="mt-4 text-sm sm:text-base text-[#5C493E] leading-relaxed">
                  As demand for packaged, hygienic, everyday Indian masalas continues to grow, Hemuji
                  Masala is actively expanding its distribution network across towns, cities, and
                  states—inviting committed distributors, stockists, and wholesalers to grow with us.
                </p>

                <div className="mt-8 pt-6 border-t border-[#1F140E]/10 flex flex-wrap items-center gap-6">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex items-center justify-center w-12 h-8 rounded-[50%] overflow-hidden bg-[#B91C1C]">
                      <img
                        src={BRAND_CONTACT.logoImage}
                        alt="Hemuji"
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                    </span>
                    <div>
                      <div className="text-sm font-bold text-[#1F140E]">Hemuji Masala</div>
                      <div className="text-xs text-[#5C493E]">Authentic Indian Spice Blends</div>
                    </div>
                  </div>

                  <a
                    href={BRAND_CONTACT.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#B91C1C] hover:underline whitespace-nowrap shrink-0"
                  >
                    <span>Follow {BRAND_CONTACT.instagramHandle} on Instagram</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* Right Column: Visual Composition of Actual Brand & Regional Packaging */}
              <div className="lg:col-span-6 grid grid-cols-2 gap-4 sm:gap-5">
                <div className="rounded-2xl bg-white border border-[#1F140E]/10 p-4 flex flex-col justify-between shadow-sm">
                  <div className="aspect-square overflow-hidden flex items-center justify-center">
                    <img
                      src="/assets/aistudio/Screenshot_2026-10-30-12-46-28-62_7352322957d4404136654ef4adb64504_332e85dd.jpg"
                      alt="Hemuji Vaghareli Khichdi Masala Gujarati Pack"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="pt-2 border-t border-[#1F140E]/6 text-center">
                    <div className="text-xs font-bold text-[#1F140E]">Vaghareli Khichdi</div>
                    <div className="text-[11px] text-[#5C493E]">Popular ₹5 Retail Pack</div>
                  </div>
                </div>

                <div className="rounded-2xl bg-white border border-[#1F140E]/10 p-4 flex flex-col justify-between shadow-sm">
                  <div className="aspect-square overflow-hidden flex items-center justify-center">
                    <img
                      src="/assets/aistudio/Screenshot_2026-10-30-12-46-17-05_7352322957d4404136654ef4adb64504_4ee69070.jpg"
                      alt="Hemuji Dal-Sabji Ka Masala Pack"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="pt-2 border-t border-[#1F140E]/6 text-center">
                    <div className="text-xs font-bold text-[#1F140E]">Dal-Sabji Ka Masala</div>
                    <div className="text-[11px] text-[#5C493E]">Hindi & Gujarati Edition</div>
                  </div>
                </div>

                <div className="rounded-2xl bg-white border border-[#1F140E]/10 p-4 flex flex-col justify-between shadow-sm">
                  <div className="aspect-square overflow-hidden flex items-center justify-center">
                    <img
                      src="/assets/aistudio/Screenshot_2026-10-30-12-45-27-50_7352322957d4404136654ef4adb64504_7ea18a76.jpg"
                      alt="Hemuji Rajwadi Cha No Masalo"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="pt-2 border-t border-[#1F140E]/6 text-center">
                    <div className="text-xs font-bold text-[#1F140E]">Rajwadi Cha Masalo</div>
                    <div className="text-[11px] text-[#5C493E]">Tea Stall & Home Favourite</div>
                  </div>
                </div>

                <div className="rounded-2xl bg-white border border-[#1F140E]/10 p-4 flex flex-col justify-between shadow-sm">
                  <div className="aspect-square overflow-hidden flex items-center justify-center">
                    <img
                      src="/assets/aistudio/Screenshot_2026-10-30-12-45-42-49_7352322957d4404136654ef4adb64504_e64e9732.jpg"
                      alt="Hemuji Chhas Masala Box"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="pt-2 border-t border-[#1F140E]/6 text-center">
                    <div className="text-xs font-bold text-[#1F140E]">Chhas Masala Box</div>
                    <div className="text-[11px] text-[#5C493E]">Buttermilk & Raita Blend</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 10. DISTRIBUTOR ENQUIRY SECTION — "Let's Grow Together." */}
        <section
          id="enquiry"
          className="py-16 sm:py-24 bg-[#F4EFE6] border-t border-[#1F140E]/10"
        >
          <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
              {/* Left Info Column */}
              <div className="lg:col-span-5">
                <div className="text-xs font-semibold tracking-wider text-[#B91C1C] mb-2">
                  OFFICIAL DISTRIBUTOR APPLICATION
                </div>
                <h2
                  className="font-display text-3xl sm:text-4xl font-bold text-[#1F140E] tracking-tight"
                  style={{ textWrap: 'balance' }}
                >
                  Let&apos;s Grow Together.
                </h2>
                <p className="mt-3 text-base text-[#5C493E] leading-relaxed">
                  Complete the distributor enquiry form below. Clicking submit will open WhatsApp with
                  your formatted business details addressed directly to our team at{' '}
                  <span className="font-mono font-semibold text-[#1F140E]">
                    {BRAND_CONTACT.phoneRaw}
                  </span>{' '}
                  so you can review and press Send.
                </p>

                <div className="mt-8 space-y-4">
                  <div className="p-4 rounded-xl bg-[#FBF8F3] border border-[#1F140E]/10 flex items-start gap-3.5">
                    <Store className="w-5 h-5 text-[#B91C1C] shrink-0 mt-0.5" />
                    <div>
                      <div className="text-sm font-bold text-[#1F140E]">
                        Who Should Apply?
                      </div>
                      <p className="text-xs text-[#5C493E] mt-1 leading-relaxed">
                        FMCG distributors, spice wholesalers, kirana super-stockists, supermarket
                        buyers, and entrepreneurs looking to establish a masala distribution line.
                      </p>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-[#FBF8F3] border border-[#1F140E]/10 flex items-start gap-3.5">
                    <Truck className="w-5 h-5 text-[#D97706] shrink-0 mt-0.5" />
                    <div>
                      <div className="text-sm font-bold text-[#1F140E]">
                        Direct Brand Coordination
                      </div>
                      <p className="text-xs text-[#5C493E] mt-1 leading-relaxed">
                        Your enquiry goes straight to Hemuji Masala’s official WhatsApp desk (
                        <span className="font-mono">{BRAND_CONTACT.phoneFormatted}</span>) for prompt
                        product catalog and trade discussion.
                      </p>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-[#FBF8F3] border border-[#1F140E]/10 flex items-start gap-3.5">
                    <Users className="w-5 h-5 text-[#15803D] shrink-0 mt-0.5" />
                    <div>
                      <div className="text-sm font-bold text-[#1F140E]">
                        Manual Confirmation Control
                      </div>
                      <p className="text-xs text-[#5C493E] mt-1 leading-relaxed">
                        We never send automated messages without your consent—review your pre-filled
                        WhatsApp message and press Send when ready.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Form Column */}
              <div className="lg:col-span-7">
                <form
                  onSubmit={handleSubmitEnquiry}
                  noValidate
                  className="rounded-2xl bg-[#FBF8F3] border border-[#1F140E]/12 p-6 sm:p-8 lg:p-10 shadow-[0_16px_40px_-15px_rgba(31,20,14,0.08)]"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Full Name */}
                    <div>
                      <label
                        htmlFor="fullName"
                        className="block text-xs font-semibold text-[#1F140E] mb-1.5"
                      >
                        Full Name <span className="text-[#B91C1C]">*</span>
                      </label>
                      <input
                        id="fullName"
                        type="text"
                        value={formData.fullName}
                        onChange={(e) => {
                          setFormData({ ...formData, fullName: e.target.value });
                          if (formErrors.fullName) setFormErrors({ ...formErrors, fullName: undefined });
                        }}
                        placeholder="e.g. Rajeshbhai Patel"
                        className={`w-full px-3.5 py-2.5 text-sm rounded-xl bg-white border ${
                          formErrors.fullName ? 'border-[#B91C1C]' : 'border-[#1F140E]/15'
                        } text-[#1F140E] placeholder:text-[#5C493E]/50 focus:outline-none focus:border-[#B91C1C]`}
                      />
                      {formErrors.fullName && (
                        <p className="mt-1 text-xs text-[#B91C1C]">{formErrors.fullName}</p>
                      )}
                    </div>

                    {/* Mobile Number */}
                    <div>
                      <label
                        htmlFor="mobile"
                        className="block text-xs font-semibold text-[#1F140E] mb-1.5"
                      >
                        Mobile Number (WhatsApp) <span className="text-[#B91C1C]">*</span>
                      </label>
                      <input
                        id="mobile"
                        type="tel"
                        value={formData.mobile}
                        onChange={(e) => {
                          setFormData({ ...formData, mobile: e.target.value });
                          if (formErrors.mobile) setFormErrors({ ...formErrors, mobile: undefined });
                        }}
                        placeholder="10-digit mobile number"
                        className={`w-full px-3.5 py-2.5 text-sm font-mono rounded-xl bg-white border ${
                          formErrors.mobile ? 'border-[#B91C1C]' : 'border-[#1F140E]/15'
                        } text-[#1F140E] placeholder:text-[#5C493E]/50 focus:outline-none focus:border-[#B91C1C]`}
                      />
                      {formErrors.mobile && (
                        <p className="mt-1 text-xs text-[#B91C1C]">{formErrors.mobile}</p>
                      )}
                    </div>

                    {/* City */}
                    <div>
                      <label
                        htmlFor="city"
                        className="block text-xs font-semibold text-[#1F140E] mb-1.5"
                      >
                        City / District <span className="text-[#B91C1C]">*</span>
                      </label>
                      <input
                        id="city"
                        type="text"
                        value={formData.city}
                        onChange={(e) => {
                          setFormData({ ...formData, city: e.target.value });
                          if (formErrors.city) setFormErrors({ ...formErrors, city: undefined });
                        }}
                        placeholder="e.g. Ahmedabad, Surat, Rajkot, Mumbai"
                        className={`w-full px-3.5 py-2.5 text-sm rounded-xl bg-white border ${
                          formErrors.city ? 'border-[#B91C1C]' : 'border-[#1F140E]/15'
                        } text-[#1F140E] placeholder:text-[#5C493E]/50 focus:outline-none focus:border-[#B91C1C]`}
                      />
                      {formErrors.city && (
                        <p className="mt-1 text-xs text-[#B91C1C]">{formErrors.city}</p>
                      )}
                    </div>

                    {/* State */}
                    <div>
                      <label
                        htmlFor="state"
                        className="block text-xs font-semibold text-[#1F140E] mb-1.5"
                      >
                        State <span className="text-[#B91C1C]">*</span>
                      </label>
                      <select
                        id="state"
                        value={formData.state}
                        onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                        className="w-full px-3.5 py-2.5 text-sm rounded-xl bg-white border border-[#1F140E]/15 text-[#1F140E] focus:outline-none focus:border-[#B91C1C]"
                      >
                        {INDIAN_STATES.map((st) => (
                          <option key={st} value={st}>
                            {st}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Business Name */}
                    <div>
                      <label
                        htmlFor="businessName"
                        className="block text-xs font-semibold text-[#1F140E] mb-1.5"
                      >
                        Business / Agency Name <span className="text-[#B91C1C]">*</span>
                      </label>
                      <input
                        id="businessName"
                        type="text"
                        value={formData.businessName}
                        onChange={(e) => {
                          setFormData({ ...formData, businessName: e.target.value });
                          if (formErrors.businessName)
                            setFormErrors({ ...formErrors, businessName: undefined });
                        }}
                        placeholder="e.g. Shreeji Trading Co."
                        className={`w-full px-3.5 py-2.5 text-sm rounded-xl bg-white border ${
                          formErrors.businessName ? 'border-[#B91C1C]' : 'border-[#1F140E]/15'
                        } text-[#1F140E] placeholder:text-[#5C493E]/50 focus:outline-none focus:border-[#B91C1C]`}
                      />
                      {formErrors.businessName && (
                        <p className="mt-1 text-xs text-[#B91C1C]">{formErrors.businessName}</p>
                      )}
                    </div>

                    {/* Business Type */}
                    <div>
                      <label
                        htmlFor="businessType"
                        className="block text-xs font-semibold text-[#1F140E] mb-1.5"
                      >
                        Business Type <span className="text-[#B91C1C]">*</span>
                      </label>
                      <select
                        id="businessType"
                        value={formData.businessType}
                        onChange={(e) => setFormData({ ...formData, businessType: e.target.value })}
                        className="w-full px-3.5 py-2.5 text-sm rounded-xl bg-white border border-[#1F140E]/15 text-[#1F140E] focus:outline-none focus:border-[#B91C1C]"
                      >
                        {BUSINESS_TYPES.map((bt) => (
                          <option key={bt} value={bt}>
                            {bt}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Product Interest Selector */}
                  <div className="mt-5">
                    <label className="block text-xs font-semibold text-[#1F140E] mb-2">
                      Products of Interest (Click to toggle)
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {PRODUCTS.map((prod) => {
                        const selected = formData.selectedProducts.includes(prod.name);
                        return (
                          <button
                            key={prod.id}
                            type="button"
                            onClick={() => toggleProductSelection(prod.name)}
                            className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                              selected
                                ? 'bg-[#B91C1C] text-white border-[#B91C1C]'
                                : 'bg-white text-[#5C493E] border-[#1F140E]/12 hover:border-[#1F140E]/30'
                            }`}
                          >
                            {selected ? '✓ ' : '+ '}
                            {prod.name}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Message */}
                  <div className="mt-5">
                    <label
                      htmlFor="message"
                      className="block text-xs font-semibold text-[#1F140E] mb-1.5"
                    >
                      Message / Current Distribution Coverage
                    </label>
                    <textarea
                      id="message"
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Share details about your current retail network, area covered, or specific pack enquiries..."
                      className="w-full px-3.5 py-2.5 text-sm rounded-xl bg-white border border-[#1F140E]/15 text-[#1F140E] placeholder:text-[#5C493E]/50 focus:outline-none focus:border-[#B91C1C]"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="mt-6">
                    <button
                      type="submit"
                      className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-4 text-sm sm:text-base font-semibold text-white bg-[#15803D] hover:bg-[#166534] rounded-xl shadow-[0_10px_24px_rgba(21,128,61,0.25)] transition-all cursor-pointer"
                    >
                      <MessageCircle className="w-5 h-5" />
                      <span>Submit Distributor Enquiry</span>
                    </button>
                    <p className="mt-2.5 text-center text-xs text-[#5C493E]">
                      Opens WhatsApp chat with{' '}
                      <span className="font-mono font-semibold text-[#1F140E]">
                        +91 {BRAND_CONTACT.phoneRaw}
                      </span>
                      . Please press <strong>Send</strong> in WhatsApp to complete your enquiry.
                    </p>
                  </div>

                  {/* Prepared WhatsApp Preview & Fallback Link */}
                  {enquiryPrepared && (
                    <div className="mt-6 p-4 rounded-xl bg-white border border-[#15803D]/30">
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <div className="flex items-center gap-2 text-xs font-semibold text-[#15803D]">
                          <CheckCircle2 className="w-4 h-4" />
                          <span>Enquiry Formatted for WhatsApp ({BRAND_CONTACT.phoneRaw})</span>
                        </div>
                        <button
                          type="button"
                          onClick={handleCopyMessage}
                          className="inline-flex items-center gap-1 text-xs font-medium text-[#1F140E] hover:text-[#B91C1C] cursor-pointer"
                        >
                          {copiedWhatsappText ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-[#15803D]" /> Copied
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5" /> Copy Text
                            </>
                          )}
                        </button>
                      </div>
                      <pre className="text-[11px] font-mono text-[#5C493E] whitespace-pre-wrap bg-[#FBF8F3] p-3 rounded-lg border border-[#1F140E]/8">
                        {buildWhatsAppMessage()}
                      </pre>
                      <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
                        <span className="text-xs text-[#5C493E]">
                          Didn&apos;t open automatically? Click right to launch WhatsApp:
                        </span>
                        <a
                          href={`https://wa.me/${BRAND_CONTACT.whatsappNumber}?text=${encodeURIComponent(
                            buildWhatsAppMessage()
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-[#15803D] rounded-lg"
                        >
                          <span>Open WhatsApp Now</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </div>
                  )}
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* 11. CONTACT SECTION */}
        <section id="contact" className="py-16 sm:py-24 bg-[#FBF8F3] border-t border-[#1F140E]/8">
          <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mb-10">
              <div className="text-xs font-semibold tracking-wider text-[#B91C1C] mb-2">
                DIRECT BUSINESS CONTACT
              </div>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#1F140E] tracking-tight">
                Connect with Hemuji Masala
              </h2>
              <p className="mt-2.5 text-base text-[#5C493E]">
                Reach out to us directly via phone, WhatsApp, email, Instagram, or visit our location
                on Google Maps.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {/* Phone / WhatsApp Card */}
              <div className="p-6 rounded-2xl bg-white border border-[#1F140E]/10 flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-[#15803D]/10 text-[#15803D] flex items-center justify-center mb-4">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div className="text-xs font-medium text-[#5C493E]">Phone & WhatsApp</div>
                  <div className="font-mono text-lg font-bold text-[#1F140E] mt-1 tabular-nums">
                    +91 {BRAND_CONTACT.phoneRaw}
                  </div>
                  <p className="text-xs text-[#5C493E] mt-1">
                    Direct distributor & wholesale helpline
                  </p>
                </div>
                <div className="mt-5 pt-4 border-t border-[#1F140E]/8 flex items-center gap-3">
                  <a
                    href={`https://wa.me/${BRAND_CONTACT.whatsappNumber}?text=${encodeURIComponent(
                      'Hello Hemuji Masala, I would like to enquire about distribution partnership.'
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#15803D] hover:underline whitespace-nowrap shrink-0"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>WhatsApp Enquiry</span>
                  </a>
                  <span aria-hidden="true" className="text-[#1F140E]/20">
                    ·
                  </span>
                  <a
                    href={`tel:+91${BRAND_CONTACT.phoneRaw}`}
                    className="text-xs font-semibold text-[#1F140E] hover:text-[#B91C1C] whitespace-nowrap shrink-0"
                  >
                    Call Now
                  </a>
                </div>
              </div>

              {/* Email Card */}
              <div className="p-6 rounded-2xl bg-white border border-[#1F140E]/10 flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-[#B91C1C]/10 text-[#B91C1C] flex items-center justify-center mb-4">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="text-xs font-medium text-[#5C493E]">Official Email</div>
                  <div className="font-mono text-sm sm:text-base font-bold text-[#1F140E] mt-1 break-all">
                    {BRAND_CONTACT.email}
                  </div>
                  <p className="text-xs text-[#5C493E] mt-1">
                    For trade inquiries & documentation
                  </p>
                </div>
                <div className="mt-5 pt-4 border-t border-[#1F140E]/8">
                  <a
                    href={`mailto:${BRAND_CONTACT.email}?subject=${encodeURIComponent(
                      'Distributor Partnership Enquiry — Hemuji Masala'
                    )}`}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#B91C1C] hover:underline whitespace-nowrap shrink-0"
                  >
                    <span>Send Email</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* Instagram Card */}
              <div className="p-6 rounded-2xl bg-white border border-[#1F140E]/10 flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-[#D97706]/10 text-[#D97706] flex items-center justify-center mb-4">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <div className="text-xs font-medium text-[#5C493E]">Official Instagram</div>
                  <div className="font-mono text-base font-bold text-[#1F140E] mt-1">
                    {BRAND_CONTACT.instagramHandle}
                  </div>
                  <p className="text-xs text-[#5C493E] mt-1">
                    Product updates, reels & brand showcase
                  </p>
                </div>
                <div className="mt-5 pt-4 border-t border-[#1F140E]/8">
                  <a
                    href={BRAND_CONTACT.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#D97706] hover:underline whitespace-nowrap shrink-0"
                  >
                    <span>Visit Instagram Profile</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* Google Maps Direction Card */}
              <div className="p-6 rounded-2xl bg-white border border-[#1F140E]/10 flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-[#0284C7]/10 text-[#0284C7] flex items-center justify-center mb-4">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div className="text-xs font-medium text-[#5C493E]">Location & Directions</div>
                  <div className="font-display text-base font-bold text-[#1F140E] mt-1">
                    Hemuji Masala
                  </div>
                  <p className="text-xs text-[#5C493E] mt-1">
                    View verified business location on Google Maps
                  </p>
                </div>
                <div className="mt-5 pt-4 border-t border-[#1F140E]/8">
                  <a
                    href={BRAND_CONTACT.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0284C7] hover:underline whitespace-nowrap shrink-0"
                  >
                    <span>Get Directions on Google Maps</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* 12. FOOTER */}
      <footer className="bg-[#1F140E] text-[#FBF8F3] pt-14 pb-10 border-t border-white/10">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/10">
            {/* Brand Column */}
            <div className="lg:col-span-4">
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center justify-center w-14 h-9 rounded-[50%] overflow-hidden bg-[#B91C1C] border border-white/25 shrink-0">
                  <img
                    src={BRAND_CONTACT.logoImage}
                    alt="Hemuji Masala Logo"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover scale-105"
                  />
                </span>
                <span className="font-display text-2xl font-bold tracking-tight text-white">
                  Hemuji Masala
                </span>
              </div>
              <p className="mt-4 text-sm text-[#E7DDD3]/75 leading-relaxed max-w-sm">
                Authentic Indian spices and masala manufacturer bringing the traditional taste of
                Hemuji to kitchens across India. Partner with us for wholesale and distribution
                opportunities.
              </p>
              <div className="mt-5 text-xs text-[#FBBF24] font-medium">
                ISO 9001:2015 Certified · Pure Vegetarian Blends
              </div>
            </div>

            {/* Quick Navigation */}
            <div className="lg:col-span-2">
              <div className="text-xs font-semibold tracking-wider text-white/60 uppercase mb-4">
                Navigation
              </div>
              <ul className="space-y-2.5 text-sm text-[#E7DDD3]/80">
                <li>
                  <a href="#home" className="hover:text-white transition-colors">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#about" className="hover:text-white transition-colors">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#products" className="hover:text-white transition-colors">
                    Our Products
                  </a>
                </li>
                <li>
                  <a href="#opportunity" className="hover:text-white transition-colors">
                    Distributor Opportunity
                  </a>
                </li>
                <li>
                  <a href="#enquiry" className="hover:text-white transition-colors">
                    Distributor Enquiry
                  </a>
                </li>
                <li>
                  <a href="#contact" className="hover:text-white transition-colors">
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            {/* Product Links */}
            <div className="lg:col-span-3">
              <div className="text-xs font-semibold tracking-wider text-white/60 uppercase mb-4">
                Our Masala Range
              </div>
              <ul className="space-y-2.5 text-sm text-[#E7DDD3]/80">
                {PRODUCTS.map((prod) => (
                  <li key={prod.id}>
                    <button
                      type="button"
                      onClick={() => handleEnquireProduct(prod.name)}
                      className="hover:text-[#FBBF24] transition-colors text-left cursor-pointer"
                    >
                      {prod.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div className="lg:col-span-3">
              <div className="text-xs font-semibold tracking-wider text-white/60 uppercase mb-4">
                Contact & Trade Desk
              </div>
              <div className="space-y-3 text-sm text-[#E7DDD3]/85">
                <div>
                  <div className="text-xs text-white/50">Phone / WhatsApp</div>
                  <a
                    href={`https://wa.me/${BRAND_CONTACT.whatsappNumber}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono font-semibold text-white hover:text-[#FBBF24]"
                  >
                    +91 {BRAND_CONTACT.phoneRaw}
                  </a>
                </div>
                <div>
                  <div className="text-xs text-white/50">Email</div>
                  <a
                    href={`mailto:${BRAND_CONTACT.email}`}
                    className="font-mono text-white hover:text-[#FBBF24] break-all"
                  >
                    {BRAND_CONTACT.email}
                  </a>
                </div>
                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <a
                    href={BRAND_CONTACT.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-semibold text-[#FBBF24] hover:underline"
                  >
                    <span>Instagram</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <span aria-hidden="true" className="text-white/25">
                    ·
                  </span>
                  <a
                    href={BRAND_CONTACT.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-semibold text-[#FBBF24] hover:underline"
                  >
                    <span>Google Maps</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#E7DDD3]/55">
            <div>© {new Date().getFullYear()} Hemuji Masala. All rights reserved.</div>
            <div>Bring the Taste of Hemuji to Every Home · Official Distributor Portal</div>
          </div>
        </div>
      </footer>

      {/* Product Detail Inspection Modal (Triggered from Carousel or Product Cards) */}
      {selectedModalProduct && (
        <div
          className="fixed inset-0 z-50 bg-[#1F140E]/65 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setSelectedModalProduct(null)}
        >
          <div
            className="relative w-full max-w-2xl rounded-2xl bg-[#FBF8F3] border border-[#1F140E]/15 overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setSelectedModalProduct(null)}
              className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white border border-[#1F140E]/12 flex items-center justify-center text-[#1F140E] hover:bg-[#B91C1C] hover:text-white transition-colors cursor-pointer"
              aria-label="Close product details"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="grid grid-cols-1 sm:grid-cols-2">
              <div className="bg-white p-6 flex flex-col items-center justify-center border-b sm:border-b-0 sm:border-r border-[#1F140E]/10">
                <div className="w-full aspect-square overflow-hidden flex items-center justify-center">
                  <img
                    src={selectedModalProduct.image}
                    alt={selectedModalProduct.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-contain"
                  />
                </div>
                {selectedModalProduct.secondaryImage && (
                  <div className="mt-3 flex items-center gap-2">
                    <img
                      src={selectedModalProduct.secondaryImage}
                      alt={`${selectedModalProduct.name} alternate pack`}
                      referrerPolicy="no-referrer"
                      className="w-14 h-14 object-contain rounded-lg border border-[#1F140E]/12 bg-white p-1"
                    />
                    <span className="text-[11px] text-[#5C493E]">
                      Available in both ₹5 and ₹10 retail pouches
                    </span>
                  </div>
                )}
              </div>

              <div className="p-6 sm:p-7 flex flex-col justify-between">
                <div>
                  <div className="text-xs font-semibold text-[#B91C1C]">
                    {selectedModalProduct.categoryLabel}
                  </div>
                  <h3 className="font-display text-2xl font-bold text-[#1F140E] mt-1">
                    {selectedModalProduct.name}
                  </h3>
                  {selectedModalProduct.regionalName && (
                    <div className="text-xs font-medium text-[#5C493E] mt-0.5">
                      {selectedModalProduct.regionalName}
                    </div>
                  )}

                  <p className="mt-4 text-sm text-[#5C493E] leading-relaxed">
                    {selectedModalProduct.shortDescription}
                  </p>

                  <div className="mt-4 pt-4 border-t border-[#1F140E]/10 space-y-2 text-xs">
                    <div>
                      <span className="font-semibold text-[#1F140E]">Culinary Applications: </span>
                      <span className="text-[#5C493E]">{selectedModalProduct.culinaryUsage}</span>
                    </div>
                    <div>
                      <span className="font-semibold text-[#1F140E]">Pack Formats: </span>
                      <span className="font-mono text-[#5C493E]">
                        {selectedModalProduct.packVariants.join(', ')}
                      </span>
                    </div>
                    <div>
                      <span className="font-semibold text-[#1F140E]">Pack Highlights: </span>
                      <span className="text-[#5C493E]">
                        {selectedModalProduct.verifiedHighlights.join(' · ')}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-[#1F140E]/10 flex flex-col gap-2.5">
                  <button
                    type="button"
                    onClick={() => handleEnquireProduct(selectedModalProduct.name)}
                    className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 text-xs sm:text-sm font-semibold text-white bg-[#B91C1C] hover:bg-[#991B1B] rounded-xl transition-colors cursor-pointer"
                  >
                    <span>Add to My Distributor Enquiry</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { CarouselCardItem, HERO_CAROUSEL_CARDS } from '../data/hemujiData';
import { ArrowUpRight, MoveHorizontal, Pause, Play } from 'lucide-react';

interface CurvedCarouselProps {
  onSelectProduct: (productId: string) => void;
}

/**
 * Reelmark-inspired 3D Arched Cylindrical Carousel:
 * - 10 tall visual cards arranged along the inside of a cylinder.
 * - Center cards appear smaller and upright.
 * - Cards toward the left and right edges become progressively taller and follow the curved perspective.
 * - Continuous right-to-left automatic movement with seamless infinite looping.
 * - Pointer & touch dragging with natural momentum decay on release.
 */
export const CurvedCarousel: React.FC<CurvedCarouselProps> = ({ onSelectProduct }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  // Duplicate the 10 cards once (20 virtual slots) so wide desktop screens always have
  // a dense, uninterrupted 360-degree cylindrical ring with zero edge pop-in.
  const virtualCards = React.useMemo(
    () => [
      ...HERO_CAROUSEL_CARDS.map((c, idx) => ({ ...c, virtualKey: `${c.id}-a`, index: idx })),
      ...HERO_CAROUSEL_CARDS.map((c, idx) => ({ ...c, virtualKey: `${c.id}-b`, index: idx + 10 })),
    ],
    []
  );

  const physicsRef = useRef({
    scrollPos: 0,
    dragVelocity: 0,
    isPointerDown: false,
    startX: 0,
    lastX: 0,
    lastTime: 0,
    totalDragDistance: 0,
    autoSpeed: 0.95, // Smooth continuous right-to-left movement (px per 16.6ms frame)
  });

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
    const listener = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener('change', listener);
    return () => mq.removeEventListener('change', listener);
  }, []);

  const updateCarouselLayout = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    const viewportWidth = container.clientWidth || window.innerWidth;
    const isMobile = viewportWidth < 640;
    const isTablet = viewportWidth >= 640 && viewportWidth < 1024;

    // Card spacing & dimensions tuned proportionally for Desktop, Tablet, and Mobile
    const cardSpacing = isMobile ? 188 : isTablet ? 236 : 272;
    const totalTrackWidth = virtualCards.length * cardSpacing;
    const halfTrack = totalTrackWidth / 2;

    // Normalize scrollPos into [0, totalTrackWidth)
    const state = physicsRef.current;
    state.scrollPos = ((state.scrollPos % totalTrackWidth) + totalTrackWidth) % totalTrackWidth;

    // Reference half-span for curve math
    const curveSpan = isMobile ? viewportWidth * 0.68 : viewportWidth * 0.54;

    for (let i = 0; i < virtualCards.length; i++) {
      const el = cardRefs.current[i];
      if (!el) continue;

      // Raw position relative to current scroll offset (right-to-left flow)
      let rawX = i * cardSpacing - state.scrollPos;
      // Wrap seamlessly into [-halfTrack, halfTrack]
      while (rawX < -halfTrack) rawX += totalTrackWidth;
      while (rawX > halfTrack) rawX -= totalTrackWidth;

      // Hide virtual cards far offscreen to save GPU work
      const maxVisibleX = Math.max(viewportWidth * 0.78, 560);
      if (Math.abs(rawX) > maxVisibleX) {
        el.style.opacity = '0';
        el.style.pointerEvents = 'none';
        el.style.transform = `translate3d(${rawX}px, 0px, -400px) scale(0.5)`;
        continue;
      }

      // Normalized distance from center: t = 0 at center, t = -1 at left edge, t = +1 at right edge
      const t = rawX / curveSpan;
      const absT = Math.min(Math.abs(t), 1.35);
      const t2 = t * t;

      // REELMARK CYLINDRICAL ARCH GEOMETRY:
      // 1. Center cards appear smaller and upright (scaleY ~ 0.78 at center).
      // 2. Cards toward the left and right edges become progressively taller (scaleY grows with t^2).
      // 3. Concave cylinder depth (translateZ increases toward edges, rotateY angles inward toward viewer).
      // 4. Sweeping vertical arch curve (translateY curves along the cylinder rim).
      const baseCenterScaleY = isMobile ? 0.80 : 0.76;
      const edgeGrowthY = isMobile ? 0.28 : 0.38;
      const scaleY = baseCenterScaleY + edgeGrowthY * Math.min(t2, 1.45);

      const baseCenterScaleX = isMobile ? 0.84 : 0.82;
      const edgeGrowthX = isMobile ? 0.16 : 0.22;
      const scaleX = baseCenterScaleX + edgeGrowthX * Math.min(t2, 1.45);

      // Vertical arch: center sits slightly recessed, outer cards rise/arch gracefully
      const archLift = isMobile ? -14 * Math.min(t2, 1.3) : -24 * Math.min(t2, 1.35);

      // Cylindrical 3D inward perspective rotation
      const rotateY = -t * (isMobile ? 22 : 31);
      const rotateZ = t * (isMobile ? 3.2 : 4.8);
      const translateZ = Math.min(t2, 1.3) * (isMobile ? 65 : 130);

      // Horizontal compression toward edges to simulate cylindrical curvature
      const cylindricalX = rawX * (1 - 0.065 * Math.min(t2, 1.2));

      // Smooth edge fade only at the very far outer boundary
      const edgeFade = absT > 1.18 ? Math.max(0, 1 - (absT - 1.18) * 4.5) : 1;

      el.style.opacity = `${edgeFade}`;
      el.style.pointerEvents = edgeFade > 0.2 ? 'auto' : 'none';
      el.style.zIndex = `${Math.round(100 + absT * 60)}`;
      el.style.transform = `translate3d(${cylindricalX.toFixed(2)}px, ${archLift.toFixed(2)}px, ${translateZ.toFixed(2)}px) rotateY(${rotateY.toFixed(2)}deg) rotateZ(${rotateZ.toFixed(2)}deg) scale3d(${scaleX.toFixed(3)}, ${scaleY.toFixed(3)}, 1)`;
    }
  }, [virtualCards.length]);

  useEffect(() => {
    let rafId: number;
    let lastFrameTime = performance.now();

    const tick = (now: number) => {
      const dt = Math.min((now - lastFrameTime) / 16.667, 2.5);
      lastFrameTime = now;

      const state = physicsRef.current;

      if (!state.isPointerDown) {
        if (Math.abs(state.dragVelocity) > 0.08) {
          // Apply natural momentum after user releases drag
          state.scrollPos += state.dragVelocity * dt;
          state.dragVelocity *= Math.pow(0.94, dt);
        } else {
          state.dragVelocity = 0;
          // Continuous right-to-left movement unless paused or prefers-reduced-motion
          if (!isPaused && !reducedMotion) {
            state.scrollPos += state.autoSpeed * dt;
          }
        }
      }

      updateCarouselLayout();
      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    window.addEventListener('resize', updateCarouselLayout);
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', updateCarouselLayout);
    };
  }, [isPaused, reducedMotion, updateCarouselLayout]);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    // Ignore clicks on explicit control buttons
    if ((e.target as HTMLElement).closest('button[data-carousel-control]')) return;

    const state = physicsRef.current;
    state.isPointerDown = true;
    state.startX = e.clientX;
    state.lastX = e.clientX;
    state.lastTime = performance.now();
    state.totalDragDistance = 0;
    state.dragVelocity = 0;
    setIsDragging(true);
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const state = physicsRef.current;
    if (!state.isPointerDown) return;

    const now = performance.now();
    const dx = e.clientX - state.lastX;
    const elapsed = Math.max(now - state.lastTime, 8);

    // Dragging left moves scrollPos forward (right-to-left); dragging right reverses
    state.scrollPos -= dx * 1.15;
    state.dragVelocity = (-dx / elapsed) * 16.667;
    state.totalDragDistance += Math.abs(dx);
    state.lastX = e.clientX;
    state.lastTime = now;
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    const state = physicsRef.current;
    if (!state.isPointerDown) return;
    state.isPointerDown = false;
    setIsDragging(false);
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
  };

  const nudgeCarousel = (direction: 'left' | 'right') => {
    const state = physicsRef.current;
    state.dragVelocity = direction === 'right' ? 14 : -14;
  };

  const handleCardClick = (card: CarouselCardItem) => {
    if (physicsRef.current.totalDragDistance > 8) return;
    if (card.productId) {
      onSelectProduct(card.productId);
    }
  };

  return (
    <div className="relative w-full select-none">
      {/* Subtle Top & Bottom Cylindrical Arch Framing Curves (Reelmark signature look) */}
      <div
        ref={containerRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        className={`relative w-full h-[390px] sm:h-[460px] lg:h-[540px] overflow-hidden perspective-cylinder flex items-center justify-center touch-pan-y ${
          isDragging ? 'cursor-grabbing' : 'cursor-grab'
        }`}
        aria-label="Hemuji Masala Interactive Curved Product & Spice Showcase"
      >
        {/* Subtle ambient spice glow behind the cylinder center */}
        <div
          className="pointer-events-none absolute inset-x-1/4 top-1/2 -translate-y-1/2 h-64 rounded-full opacity-35 blur-3xl"
          style={{
            background:
              'radial-gradient(circle, rgba(217,119,6,0.28) 0%, rgba(185,28,28,0.14) 55%, transparent 100%)',
          }}
        />

        {/* 3D Cylindrical Stage */}
        <div className="relative w-full h-full flex items-center justify-center" style={{ transformStyle: 'preserve-3d' }}>
          {virtualCards.map((card, i) => {
            const isMacroSpice = card.imageCropStyle === 'macro-spices';
            const isMacroIngredients = card.imageCropStyle === 'macro-ingredients';
            const isMacroCooking = card.imageCropStyle === 'macro-cooking';
            const isDarkCard = isMacroSpice || isMacroIngredients;

            return (
              <div
                key={card.virtualKey}
                ref={(el) => {
                  cardRefs.current[i] = el;
                }}
                onClick={() => handleCardClick(card)}
                style={{
                  willChange: 'transform, opacity',
                }}
                className={`group absolute w-[172px] sm:w-[216px] lg:w-[248px] h-[300px] sm:h-[365px] lg:h-[430px] rounded-[26px] overflow-hidden backface-hidden transition-shadow duration-200 ${
                  isDarkCard
                    ? 'bg-[#1F140E] text-[#FBF8F3] border border-[#1F140E]/20 shadow-[0_22px_50px_-12px_rgba(31,20,14,0.34)]'
                    : 'bg-white text-[#1F140E] border border-[#1F140E]/10 shadow-[0_20px_44px_-12px_rgba(31,20,14,0.18)]'
                }`}
              >
                {/* Top Meta Bar inside Card (Zero-Pill clean text separator) */}
                <div className="relative z-20 flex items-center justify-between px-4 pt-3.5 pb-1 text-[11px] font-medium tracking-tight opacity-75">
                  <span className="truncate">{card.tag}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 shrink-0 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>

                {/* Visual Area */}
                <div className="relative w-full h-[68%] flex items-center justify-center overflow-hidden px-3">
                  {card.imageCropStyle === 'full-pack' && (
                    <div className="w-full aspect-square overflow-hidden flex items-center justify-center bg-white rounded-xl">
                      <img
                        src={card.image}
                        alt={card.title}
                        referrerPolicy="no-referrer"
                        draggable={false}
                        className="w-full h-full object-contain scale-[1.06] group-hover:scale-[1.12] transition-transform duration-300 pointer-events-none"
                      />
                    </div>
                  )}

                  {isMacroSpice && (
                    <div className="relative w-full h-full rounded-2xl overflow-hidden bg-[#2A1B12]">
                      {/* Zoom into the high-resolution spice bowl & cumin/coriander sacks on the Dhana-Jeera studio artwork */}
                      <img
                        src={card.image}
                        alt={card.title}
                        referrerPolicy="no-referrer"
                        draggable={false}
                        className="w-full h-full object-cover object-[50%_72%] scale-[2.1] group-hover:scale-[2.22] transition-transform duration-300 pointer-events-none"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#1F140E] via-[#1F140E]/20 to-transparent" />
                      <div className="absolute bottom-2.5 left-3 right-3 text-[11px] text-[#FDE68A] font-medium">
                        Coriander · Cumin · Freshly Ground
                      </div>
                    </div>
                  )}

                  {isMacroCooking && (
                    <div className="relative w-full h-full rounded-2xl overflow-hidden bg-[#FFFDF9]">
                      <img
                        src={card.image}
                        alt={card.title}
                        referrerPolicy="no-referrer"
                        draggable={false}
                        className="w-full h-full object-contain scale-[1.08] group-hover:scale-[1.14] transition-transform duration-300 pointer-events-none"
                      />
                    </div>
                  )}

                  {isMacroIngredients && (
                    <div className="relative w-full h-full rounded-2xl overflow-hidden bg-[#2A1B12]">
                      {/* Zoom into the high-resolution whole spices & roasted masala bowl on the Sp. Natural studio artwork */}
                      <img
                        src={card.image}
                        alt={card.title}
                        referrerPolicy="no-referrer"
                        draggable={false}
                        className="w-full h-full object-cover object-[48%_74%] scale-[2.15] group-hover:scale-[2.28] transition-transform duration-300 pointer-events-none"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#1F140E] via-[#1F140E]/20 to-transparent" />
                      <div className="absolute bottom-2.5 left-3 right-3 text-[11px] text-[#FDE68A] font-medium">
                        Star Anise · Cloves · Cardamom · Bark
                      </div>
                    </div>
                  )}
                </div>

                {/* Card Bottom Editorial Caption */}
                <div
                  className={`relative z-20 px-4 pt-2 pb-4 flex flex-col justify-between h-[23%] border-t ${
                    isDarkCard ? 'border-white/10 bg-[#1F140E]' : 'border-[#1F140E]/6 bg-white'
                  }`}
                >
                  <div>
                    <h3
                      className={`font-display text-sm sm:text-[15px] font-bold leading-snug truncate ${
                        isDarkCard ? 'text-white' : 'text-[#1F140E]'
                      }`}
                    >
                      {card.title}
                    </h3>
                    <p
                      className={`text-[11px] sm:text-xs line-clamp-1 mt-0.5 ${
                        isDarkCard ? 'text-[#E7DDD3]/75' : 'text-[#5C493E]'
                      }`}
                    >
                      {card.subtitle}
                    </p>
                  </div>
                  <div className="flex items-center justify-between text-[11px] font-semibold tracking-tight pt-1">
                    <span style={{ color: isDarkCard ? '#FBBF24' : card.accentColor }}>
                      Enquire for Wholesale
                    </span>
                    <span className="font-mono text-[10px] opacity-60">₹5 / ₹10</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Interactive Carousel Control Bar below the Arch */}
      <div className="mt-3 flex items-center justify-center gap-4 text-xs text-[#5C493E]">
        <button
          type="button"
          data-carousel-control="true"
          onClick={() => nudgeCarousel('left')}
          className="px-3 py-1.5 rounded-lg border border-[#1F140E]/12 bg-white/80 hover:bg-white text-[#1F140E] font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          aria-label="Roll carousel left"
        >
          ← Roll Left
        </button>

        <div className="flex items-center gap-2 text-xs text-[#5C493E] px-2">
          <MoveHorizontal className="w-3.5 h-3.5 text-[#B91C1C] shrink-0" />
          <span className="hidden sm:inline">Drag horizontally to spin the spice cylinder</span>
          <span className="sm:hidden">Swipe to spin</span>
          <span aria-hidden="true">·</span>
          <button
            type="button"
            data-carousel-control="true"
            onClick={() => setIsPaused((prev) => !prev)}
            className="inline-flex items-center gap-1 font-medium text-[#1F140E] hover:text-[#B91C1C] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            {isPaused ? (
              <>
                <Play className="w-3 h-3" /> Resume Flow
              </>
            ) : (
              <>
                <Pause className="w-3 h-3" /> Pause
              </>
            )}
          </button>
        </div>

        <button
          type="button"
          data-carousel-control="true"
          onClick={() => nudgeCarousel('right')}
          className="px-3 py-1.5 rounded-lg border border-[#1F140E]/12 bg-white/80 hover:bg-white text-[#1F140E] font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          aria-label="Roll carousel right"
        >
          Roll Right →
        </button>
      </div>
    </div>
  );
};

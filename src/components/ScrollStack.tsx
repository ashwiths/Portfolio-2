import React, { useLayoutEffect, useRef, useCallback } from 'react';
import './ScrollStack.css';

export interface ScrollStackItemProps {
  children: React.ReactNode;
  itemClassName?: string;
}

export const ScrollStackItem: React.FC<ScrollStackItemProps> = ({
  children,
  itemClassName = '',
}) => (
  <div className={`scroll-stack-card ${itemClassName}`.trim()}>{children}</div>
);

export interface ScrollStackProps {
  children: React.ReactNode;
  className?: string;
  itemDistance?: number;
  itemScale?: number;
  itemStackDistance?: number;
  stackPosition?: string;
  scaleEndPosition?: string;
  baseScale?: number;
  scaleDuration?: number;
  rotationAmount?: number;
  blurAmount?: number;
  useWindowScroll?: boolean;
  onStackComplete?: () => void;
}

declare global {
  interface Window {
    __lenis?: any;
  }
}

const ScrollStack: React.FC<ScrollStackProps> = ({
  children,
  className = '',
  itemDistance = 80,
  itemScale = 0.03,
  itemStackDistance = 32,
  stackPosition = '15%',
  scaleEndPosition = '8%',
  baseScale = 0.88,
  rotationAmount = 0,
  blurAmount = 0,
  useWindowScroll = true,
  onStackComplete,
}) => {
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const stackCompletedRef = useRef(false);
  const animationFrameRef = useRef<number | null>(null);
  const cardsRef = useRef<HTMLElement[]>([]);
  const initialTopsRef = useRef<number[]>([]);
  const endElementTopRef = useRef<number>(0);
  const lastTransformsRef = useRef(new Map());
  const isUpdatingRef = useRef(false);

  const calculateProgress = useCallback((scrollTop: number, start: number, end: number) => {
    if (scrollTop < start) return 0;
    if (scrollTop > end) return 1;
    return (scrollTop - start) / (end - start);
  }, []);

  const parsePercentage = useCallback((value: string | number, containerHeight: number) => {
    if (typeof value === 'string' && value.includes('%')) {
      return (parseFloat(value) / 100) * containerHeight;
    }
    return typeof value === 'number' ? value : parseFloat(value);
  }, []);

  const getScrollData = useCallback(() => {
    if (useWindowScroll) {
      return {
        scrollTop: window.scrollY || window.pageYOffset || 0,
        containerHeight: window.innerHeight || 800,
      };
    } else {
      const scroller = scrollerRef.current;
      return {
        scrollTop: scroller ? scroller.scrollTop : 0,
        containerHeight: scroller ? scroller.clientHeight : 0,
      };
    }
  }, [useWindowScroll]);

  // Robust transform-free layout measurement that handles webfont CDN loads and layout changes
  const measurePositions = useCallback(() => {
    if (!scrollerRef.current || !cardsRef.current.length) return;

    const scrollerRect = scrollerRef.current.getBoundingClientRect();
    const scrollerDocTop = scrollerRect.top + (window.scrollY || window.pageYOffset || 0);

    initialTopsRef.current = cardsRef.current.map((card) => {
      let offset = 0;
      let curr: HTMLElement | null = card;
      while (curr && curr !== scrollerRef.current) {
        offset += curr.offsetTop;
        curr = curr.offsetParent as HTMLElement | null;
      }
      return scrollerDocTop + offset;
    });

    const endElement = scrollerRef.current.querySelector('.scroll-stack-end') as HTMLElement | null;
    if (endElement) {
      let endOffset = 0;
      let curr: HTMLElement | null = endElement;
      while (curr && curr !== scrollerRef.current) {
        endOffset += curr.offsetTop;
        curr = curr.offsetParent as HTMLElement | null;
      }
      endElementTopRef.current = scrollerDocTop + endOffset;
    }
  }, []);

  const updateCardTransforms = useCallback(() => {
    if (!cardsRef.current.length || isUpdatingRef.current) return;

    isUpdatingRef.current = true;

    const { scrollTop, containerHeight } = getScrollData();
    const stackPositionPx = parsePercentage(stackPosition, containerHeight);
    const scaleEndPositionPx = parsePercentage(scaleEndPosition, containerHeight);

    if (!initialTopsRef.current.length || initialTopsRef.current.length !== cardsRef.current.length) {
      measurePositions();
    }

    const endElementTop = endElementTopRef.current || 0;

    cardsRef.current.forEach((card, i) => {
      if (!card) return;

      const cardTop = initialTopsRef.current[i] || 0;
      const triggerStart = cardTop - stackPositionPx - itemStackDistance * i;
      const triggerEnd = cardTop - scaleEndPositionPx;
      const pinStart = cardTop - stackPositionPx - itemStackDistance * i;
      const pinEnd = endElementTop ? endElementTop - containerHeight / 2 : pinStart + 1000;

      const scaleProgress = calculateProgress(scrollTop, triggerStart, triggerEnd);
      const targetScale = baseScale + i * itemScale;
      const scale = 1 - scaleProgress * (1 - targetScale);
      const rotation = rotationAmount ? i * rotationAmount * scaleProgress : 0;

      let blur = 0;
      if (blurAmount) {
        let topCardIndex = 0;
        for (let j = 0; j < cardsRef.current.length; j++) {
          const jCardTop = initialTopsRef.current[j] || 0;
          const jTriggerStart = jCardTop - stackPositionPx - itemStackDistance * j;
          if (scrollTop >= jTriggerStart) {
            topCardIndex = j;
          }
        }

        if (i < topCardIndex) {
          const depthInStack = topCardIndex - i;
          blur = Math.max(0, depthInStack * blurAmount);
        }
      }

      let translateY = 0;
      const isPinned = scrollTop >= pinStart && scrollTop <= pinEnd;

      if (isPinned) {
        translateY = scrollTop - cardTop + stackPositionPx + itemStackDistance * i;
      } else if (scrollTop > pinEnd) {
        translateY = pinEnd - cardTop + stackPositionPx + itemStackDistance * i;
      }

      const newTransform = {
        translateY: Math.round(translateY * 100) / 100,
        scale: Math.round(scale * 1000) / 1000,
        rotation: Math.round(rotation * 100) / 100,
        blur: Math.round(blur * 100) / 100,
      };

      const lastTransform = lastTransformsRef.current.get(i);
      const hasChanged =
        !lastTransform ||
        Math.abs(lastTransform.translateY - newTransform.translateY) > 0.1 ||
        Math.abs(lastTransform.scale - newTransform.scale) > 0.001 ||
        Math.abs(lastTransform.rotation - newTransform.rotation) > 0.1 ||
        Math.abs(lastTransform.blur - newTransform.blur) > 0.1;

      if (hasChanged) {
        const transform = `translate3d(0, ${newTransform.translateY}px, 0) scale(${newTransform.scale}) rotate(${newTransform.rotation}deg)`;
        const filter = newTransform.blur > 0 ? `blur(${newTransform.blur}px)` : '';

        card.style.transform = transform;
        card.style.filter = filter;

        lastTransformsRef.current.set(i, newTransform);
      }

      if (i === cardsRef.current.length - 1) {
        const isInView = scrollTop >= pinStart && scrollTop <= pinEnd;
        if (isInView && !stackCompletedRef.current) {
          stackCompletedRef.current = true;
          onStackComplete?.();
        } else if (!isInView && stackCompletedRef.current) {
          stackCompletedRef.current = false;
        }
      }
    });

    isUpdatingRef.current = false;
  }, [
    itemScale,
    itemStackDistance,
    stackPosition,
    scaleEndPosition,
    baseScale,
    rotationAmount,
    blurAmount,
    onStackComplete,
    calculateProgress,
    parsePercentage,
    getScrollData,
    measurePositions,
  ]);

  const requestUpdate = useCallback(() => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    animationFrameRef.current = requestAnimationFrame(updateCardTransforms);
  }, [updateCardTransforms]);

  useLayoutEffect(() => {
    if (!scrollerRef.current) return;

    const cards = Array.from(
      scrollerRef.current.querySelectorAll('.scroll-stack-card')
    ) as HTMLElement[];

    cardsRef.current = cards;

    cards.forEach((card, i) => {
      card.style.zIndex = `${i + 1}`;
      if (i < cards.length - 1) {
        card.style.marginBottom = `${itemDistance}px`;
      }
      card.style.willChange = 'transform, filter';
      card.style.transformOrigin = 'top center';
      card.style.backfaceVisibility = 'hidden';
      card.style.transform = 'translateZ(0)';
      card.style.perspective = '1000px';
    });

    measurePositions();
    updateCardTransforms();

    const handleResize = () => {
      measurePositions();
      requestUpdate();
    };

    const handleScroll = () => {
      requestUpdate();
    };

    window.addEventListener('resize', handleResize, { passive: true });
    
    if (useWindowScroll) {
      window.addEventListener('scroll', handleScroll, { passive: true });
    } else {
      const scroller = scrollerRef.current;
      scroller?.addEventListener('scroll', handleScroll, { passive: true });
    }

    const lenis = window.__lenis;
    if (lenis) {
      lenis.on('scroll', handleScroll);
    }

    // Auto-recalibrate when CDN fonts (Bebas Neue, Montserrat, etc.) finish loading
    if (document.fonts?.ready) {
      document.fonts.ready.then(() => {
        measurePositions();
        requestUpdate();
      });
    }

    let resizeObserver: ResizeObserver | null = null;
    if (window.ResizeObserver && scrollerRef.current) {
      resizeObserver = new ResizeObserver(() => {
        measurePositions();
        requestUpdate();
      });
      resizeObserver.observe(scrollerRef.current);
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      window.removeEventListener('resize', handleResize);
      if (useWindowScroll) {
        window.removeEventListener('scroll', handleScroll);
      } else {
        const scroller = scrollerRef.current;
        scroller?.removeEventListener('scroll', handleScroll);
      }
      if (lenis) {
        lenis.off('scroll', handleScroll);
      }
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
      stackCompletedRef.current = false;
      cardsRef.current = [];
      initialTopsRef.current = [];
      lastTransformsRef.current.clear();
      isUpdatingRef.current = false;
    };
  }, [
    itemDistance,
    useWindowScroll,
    measurePositions,
    updateCardTransforms,
    requestUpdate,
  ]);

  return (
    <div className={`scroll-stack-scroller ${className}`.trim()} ref={scrollerRef}>
      <div className="scroll-stack-inner">
        {children}
        <div className="scroll-stack-end" />
      </div>
    </div>
  );
};

export default ScrollStack;
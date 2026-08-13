import { useCallback, useEffect, useRef, useState, type CSSProperties } from 'react';
import { createPortal } from 'react-dom';
import { ArrowLeft2, ArrowRight2, CloseCircle } from 'iconsax-react';
import vectrroWorkflow from '../asset/personal-site-showcase/vectrro-workflow.png';
import cooragentLanding from '../asset/personal-site-showcase/cooragent-landing.png';
import cooragentAgentMarket from '../asset/personal-site-showcase/cooragent-agent-market.png';
import vectrroCover from '../asset/personal-site-showcase/vectrro-cover.png';
import vectrroInterface from '../asset/personal-site-showcase/vectrro-interface-alt.png';
import cooragentMessages from '../asset/personal-site-showcase/cooragent-messages.png';
import hitaWebsite from '../asset/personal-site-showcase/hita-website.png';
import hitaCover from '../asset/personal-site-showcase/hita-cover.png';
import hitaChat from '../asset/personal-site-showcase/hita-chat.png';
import nottaCover from '../asset/personal-site-showcase/notta-cover-2x.png';

type GalleryItem = {
  project: string;
  alt: string;
  src: string;
  aspectRatio: string;
};

const galleryItems: GalleryItem[] = [
  { project: 'Vectrro', src: vectrroWorkflow, alt: 'Vectrro trucking operations website design', aspectRatio: '3670 / 2174' },
  { project: 'Cooragent', src: cooragentLanding, alt: 'Cooragent landing page', aspectRatio: '3178 / 1920' },
  { project: 'Cooragent', src: cooragentAgentMarket, alt: 'Cooragent agent market interface', aspectRatio: '3178 / 1920' },
  { project: 'Vectrro', src: vectrroCover, alt: 'Vectrro quote reply UI elements', aspectRatio: '1024 / 564' },
  { project: 'Vectrro', src: vectrroInterface, alt: 'Vectrro product interface', aspectRatio: '3670 / 2174' },
  { project: 'Cooragent', src: cooragentMessages, alt: 'Cooragent messages interface', aspectRatio: '3178 / 1924' },
  { project: 'HiTA', src: hitaWebsite, alt: 'HiTA assignment grading interface', aspectRatio: '3206 / 1942' },
  { project: 'HiTA', src: hitaCover, alt: 'HiTA product and website cover', aspectRatio: '1780 / 1071' },
  { project: 'HiTA', src: hitaChat, alt: 'HiTA chat details interface', aspectRatio: '6412 / 4096' },
  { project: 'Notta', src: nottaCover, alt: 'Notta Pro checkout modal', aspectRatio: '1024 / 728' },
];

const componentArtworkTerms = /\b(component|dialog|modal|overlay|panel|popover|popup|sheet|ui elements?|widget)\b/i;
const productScreenTerms = /\b(agent market|chat|interface|landing page|product|website|workflow)\b/i;

type ArtworkPresentation = {
  isComponent: boolean;
  backgroundColor: string;
};

function clampChannel(value: number) {
  return Math.max(214, Math.min(238, Math.round(value)));
}

function analyzeArtwork(image: HTMLImageElement, description: string): ArtworkPresentation {
  if (!image.naturalWidth || !image.naturalHeight) {
    return { isComponent: false, backgroundColor: '#e8e8e7' };
  }

  try {
    const canvas = document.createElement('canvas');
    const sampleWidth = 120;
    const sampleHeight = Math.max(48, Math.round(sampleWidth * image.naturalHeight / image.naturalWidth));
    canvas.width = sampleWidth;
    canvas.height = sampleHeight;

    const context = canvas.getContext('2d', { willReadFrequently: true });
    if (!context) {
      return {
        isComponent: componentArtworkTerms.test(description),
        backgroundColor: '#e8e8e7',
      };
    }
    context.drawImage(image, 0, 0, sampleWidth, sampleHeight);

    const pixels = context.getImageData(0, 0, sampleWidth, sampleHeight).data;
    let transparentPixels = 0;
    let red = 0;
    let green = 0;
    let blue = 0;
    let colorWeight = 0;

    for (let pixelIndex = 0; pixelIndex < pixels.length; pixelIndex += 4) {
      const alpha = pixels[pixelIndex + 3];
      if (alpha < 245) transparentPixels += 1;
      if (alpha < 32) continue;

      const weight = alpha / 255;
      red += pixels[pixelIndex] * weight;
      green += pixels[pixelIndex + 1] * weight;
      blue += pixels[pixelIndex + 2] * weight;
      colorWeight += weight;
    }

    const averageRed = red / Math.max(colorWeight, 1);
    const averageGreen = green / Math.max(colorWeight, 1);
    const averageBlue = blue / Math.max(colorWeight, 1);
    const average = (averageRed + averageGreen + averageBlue) / 3;
    const luminance = averageRed * 0.2126 + averageGreen * 0.7152 + averageBlue * 0.0722;
    const grayBase = Math.max(222, Math.min(234, 218 + luminance * 0.065));
    const tintStrength = 0.08;
    const backgroundColor = `rgb(${clampChannel(grayBase + (averageRed - average) * tintStrength)} ${clampChannel(grayBase + (averageGreen - average) * tintStrength)} ${clampChannel(grayBase + (averageBlue - average) * tintStrength)})`;
    const transparentRatio = transparentPixels / (pixels.length / 4);

    const isSemanticallyComponent = componentArtworkTerms.test(description);
    const isProductScreen = productScreenTerms.test(description) && !isSemanticallyComponent;

    return {
      isComponent: !isProductScreen && (isSemanticallyComponent || transparentRatio > 0.015),
      backgroundColor,
    };
  } catch {
    return {
      isComponent: componentArtworkTerms.test(description),
      backgroundColor: '#e8e8e7',
    };
  }
}

function GalleryArtwork({
  item,
  onPresentationDetected,
}: {
  item: GalleryItem;
  onPresentationDetected?: (presentation: ArtworkPresentation) => void;
}) {
  return (
    <span className="gallery-artwork-media">
      <img
        src={item.src}
        alt={item.alt}
        loading="eager"
        onLoad={(event) => onPresentationDetected?.(analyzeArtwork(event.currentTarget, item.alt))}
      />
    </span>
  );
}

export default function Gallery() {
  const trackRef = useRef<HTMLDivElement>(null);
  const lastOverlayNavigationRef = useRef(0);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [componentArtworkBackgrounds, setComponentArtworkBackgrounds] = useState<Map<number, string>>(() => new Map());

  const classifyArtwork = useCallback((index: number, presentation: ArtworkPresentation) => {
    setComponentArtworkBackgrounds((current) => {
      const currentBackground = current.get(index);
      if (presentation.isComponent && currentBackground === presentation.backgroundColor) return current;
      if (!presentation.isComponent && currentBackground === undefined) return current;

      const next = new Map(current);
      if (presentation.isComponent) next.set(index, presentation.backgroundColor);
      else next.delete(index);
      return next;
    });
  }, []);

  const moveGallery = (direction: -1 | 1) => {
    const track = trackRef.current;
    if (!track) return;

    track.scrollBy({ left: direction * track.clientWidth * 0.78, behavior: 'smooth' });
  };

  const moveOverlay = useCallback((direction: -1 | 1) => {
    const now = performance.now();
    if (now - lastOverlayNavigationRef.current < 360) return;
    lastOverlayNavigationRef.current = now;

    setActiveIndex((current) => {
      if (current === null) return current;
      return (current + direction + galleryItems.length) % galleryItems.length;
    });
  }, []);

  useEffect(() => {
    if (activeIndex === null) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setActiveIndex(null);
      if (event.repeat) return;
      if (event.key === 'ArrowLeft') moveOverlay(-1);
      if (event.key === 'ArrowRight') moveOverlay(1);
    };

    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [activeIndex, moveOverlay]);

  const activeItem = activeIndex === null ? null : galleryItems[activeIndex];

  return (
    <section
      id="gallery"
      data-analytics-section="gallery"
      aria-labelledby="gallery-heading"
      className="online-gallery-section"
    >
      <div className="online-gallery-heading">
        <h2 id="gallery-heading">A Glimpse of Recent Work</h2>
        <p>Interfaces, interactions, and visual details from recent work.</p>
      </div>

      <div className="online-gallery-frame">
        <button
          type="button"
          className="online-gallery-arrow is-left"
          aria-label="Scroll showcase images left"
          onClick={() => moveGallery(-1)}
        >
          <ArrowLeft2 size={20} color="currentColor" variant="Linear" />
        </button>

        <div ref={trackRef} className="online-gallery-grid">
          {galleryItems.map((item, index) => (
            <button
              type="button"
              key={item.alt}
              className={`online-gallery-card${componentArtworkBackgrounds.has(index) ? ' is-component-artwork' : ''}`}
              data-artwork-presentation={componentArtworkBackgrounds.has(index) ? 'component' : 'screen'}
              style={{
                aspectRatio: item.aspectRatio,
                '--component-artwork-background': componentArtworkBackgrounds.get(index),
              } as CSSProperties}
              aria-label={`Open ${item.project} showcase image`}
              onClick={() => {
                lastOverlayNavigationRef.current = 0;
                setActiveIndex(index);
              }}
            >
              <GalleryArtwork item={item} onPresentationDetected={(presentation) => classifyArtwork(index, presentation)} />
            </button>
          ))}
        </div>

        <button
          type="button"
          className="online-gallery-arrow is-right"
          aria-label="Scroll showcase images right"
          onClick={() => moveGallery(1)}
        >
          <ArrowRight2 size={20} color="currentColor" variant="Linear" />
        </button>
      </div>

      {activeItem && activeIndex !== null && createPortal(
        <div
          className="gallery-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={`${activeItem.project} showcase image`}
          onMouseDown={(event) => {
            if (event.currentTarget === event.target) setActiveIndex(null);
          }}
        >
          <button
            type="button"
            className="gallery-lightbox-close"
            aria-label="Close image lightbox"
            onClick={() => setActiveIndex(null)}
          >
            <CloseCircle size={28} color="currentColor" variant="Linear" />
          </button>
          <button
            type="button"
            className="gallery-lightbox-arrow is-left"
            aria-label="Previous showcase image"
            onClick={() => moveOverlay(-1)}
          >
            <ArrowLeft2 size={28} color="currentColor" variant="Linear" />
          </button>
          <div
            className={`gallery-lightbox-stage${componentArtworkBackgrounds.has(activeIndex) ? ' is-component-artwork' : ''}`}
            style={{ '--component-artwork-background': componentArtworkBackgrounds.get(activeIndex) } as CSSProperties}
          >
            <GalleryArtwork item={activeItem} />
          </div>
          <button
            type="button"
            className="gallery-lightbox-arrow is-right"
            aria-label="Next showcase image"
            onClick={() => moveOverlay(1)}
          >
            <ArrowRight2 size={28} color="currentColor" variant="Linear" />
          </button>
        </div>,
        document.body,
      )}
    </section>
  );
}

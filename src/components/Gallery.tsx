import { useCallback, useEffect, useRef, useState } from 'react';
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
import nottaCover from '../asset/personal-site-showcase/notta-cover.png';

type GalleryItem = {
  project: string;
  alt: string;
  src: string;
  aspectRatio: string;
  treatment?: 'ui-elements';
};

const galleryItems: GalleryItem[] = [
  { project: 'Vectrro', src: vectrroWorkflow, alt: 'Vectrro trucking operations website design', aspectRatio: '3670 / 2174' },
  { project: 'Cooragent', src: cooragentLanding, alt: 'Cooragent landing page', aspectRatio: '3178 / 1920' },
  { project: 'Cooragent', src: cooragentAgentMarket, alt: 'Cooragent agent market interface', aspectRatio: '3178 / 1920' },
  { project: 'Vectrro', src: vectrroCover, alt: 'Vectrro quote reply UI elements', aspectRatio: '1024 / 564', treatment: 'ui-elements' },
  { project: 'Vectrro', src: vectrroInterface, alt: 'Vectrro product interface', aspectRatio: '3670 / 2174' },
  { project: 'Cooragent', src: cooragentMessages, alt: 'Cooragent messages interface', aspectRatio: '3178 / 1924' },
  { project: 'HiTA', src: hitaWebsite, alt: 'HiTA assignment grading interface', aspectRatio: '3206 / 1942' },
  { project: 'HiTA', src: hitaCover, alt: 'HiTA product and website cover', aspectRatio: '1780 / 1071' },
  { project: 'HiTA', src: hitaChat, alt: 'HiTA chat details interface', aspectRatio: '6412 / 4096' },
  { project: 'Notta', src: nottaCover, alt: 'Notta meeting notetaker product work', aspectRatio: '1024 / 728' },
];

function GalleryArtwork({ item }: { item: GalleryItem }) {
  return <img src={item.src} alt={item.alt} loading="eager" />;
}

export default function Gallery() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const moveGallery = (direction: -1 | 1) => {
    const track = trackRef.current;
    if (!track) return;

    track.scrollBy({ left: direction * track.clientWidth * 0.78, behavior: 'smooth' });
  };

  const moveOverlay = useCallback((direction: -1 | 1) => {
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
              className={`online-gallery-card${item.treatment === 'ui-elements' ? ' is-ui-elements' : ''}`}
              style={{ aspectRatio: item.aspectRatio }}
              aria-label={`Open ${item.project} showcase image`}
              onClick={() => setActiveIndex(index)}
            >
              <GalleryArtwork item={item} />
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
          <div className={`gallery-lightbox-stage${activeItem.treatment === 'ui-elements' ? ' is-ui-elements' : ''}`}>
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

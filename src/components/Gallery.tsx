import { useRef } from 'react';
import { ArrowLeft2, ArrowRight2 } from 'iconsax-react';
import vectrroWorkflow from '../asset/personal-site-showcase/vectrro-workflow.png';
import cooragentLanding from '../asset/personal-site-showcase/cooragent-landing.png';
import cooragentAgentMarket from '../asset/personal-site-showcase/cooragent-agent-market.png';
import vectrroCover from '../asset/personal-site-showcase/vectrro-cover.png';
import vectrroInterface from '../asset/personal-site-showcase/vectrro-interface-alt.png';

type GalleryItem = { src: string; alt: string; ratio: string; treatment?: 'ui-elements' };

const galleryItems: GalleryItem[] = [
  { src: cooragentLanding, alt: 'Cooragent landing page', ratio: '3178 / 1920' },
  { src: vectrroWorkflow, alt: 'Vectrro trucking operations website design', ratio: '3670 / 2174' },
  { src: cooragentAgentMarket, alt: 'Cooragent agent market interface', ratio: '3178 / 1920' },
  { src: vectrroCover, alt: 'Vectrro trucking operations website', ratio: '16 / 10', treatment: 'ui-elements' },
  { src: vectrroInterface, alt: 'Vectrro product interface', ratio: '3670 / 2174' },
];

export default function Gallery() {
  const trackRef = useRef<HTMLDivElement>(null);

  const moveGallery = (direction: -1 | 1) => {
    const track = trackRef.current;
    if (!track) return;

    const card = track.querySelector<HTMLElement>('.online-gallery-card');
    const gap = Number.parseFloat(getComputedStyle(track).columnGap) || 0;
    track.scrollBy({ left: direction * ((card?.offsetWidth ?? track.clientWidth) + gap), behavior: 'smooth' });
  };

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
          aria-label="Show previous work"
          onClick={() => moveGallery(-1)}
        >
          <ArrowLeft2 size={20} color="currentColor" variant="Linear" />
        </button>

        <div ref={trackRef} className="online-gallery-grid">
          {galleryItems.map((item) => (
            <figure
              key={item.alt}
              className={`online-gallery-card${item.treatment === 'ui-elements' ? ' is-ui-elements' : ''}`}
              style={{ aspectRatio: item.ratio }}
            >
              <img src={item.src} alt={item.alt} loading="eager" />
            </figure>
          ))}
        </div>

        <button
          type="button"
          className="online-gallery-arrow is-right"
          aria-label="Show next work"
          onClick={() => moveGallery(1)}
        >
          <ArrowRight2 size={20} color="currentColor" variant="Linear" />
        </button>
      </div>
    </section>
  );
}

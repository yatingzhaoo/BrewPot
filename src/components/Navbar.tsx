import { ArrowRight, Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import logo from '../asset/公司Logo.svg';
import { BLOG_ENABLED } from '../config';
import { track } from '../analytics';

const BOOKING_URL = 'https://cal.com/yating-zhao/15min';

function trackBookingClick(source: 'navbar_desktop' | 'navbar_mobile') {
  track('booking_link_clicked', {
    source,
    destination: BOOKING_URL,
    cta_label: 'Book a call',
  });
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [navVisible, setNavVisible] = useState(true);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollDelta = currentScrollY - lastScrollY;

      setScrolled(currentScrollY > 16);

      if (currentScrollY <= 20) {
        setNavVisible(true);
      } else if (scrollDelta > 6 && currentScrollY > 80) {
        setNavVisible(false);
        lastScrollY = currentScrollY;
      } else if (scrollDelta < -6) {
        setNavVisible(true);
        lastScrollY = currentScrollY;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`brand-nav ${scrolled ? 'is-scrolled' : ''} ${isOpen || navVisible ? '' : 'is-hidden'}`}
    >
      <div className="brand-nav-inner">
        <a href="/" aria-label="BrewPot home"><img src={logo} alt="BrewPot" /></a>
        <div className="brand-nav-links">
          <a href="/?view=case-studies">Case Studies</a>
          <a href="/#pricing">Pricing</a>
          {BLOG_ENABLED && <a href="/?view=blog">Blog</a>}
        </div>
        <a
          className="nav-cta"
          data-analytics-booking
          href={BOOKING_URL}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackBookingClick('navbar_desktop')}
        >
          Book a call <ArrowRight size={16} />
        </a>
        <button className="nav-menu-button" type="button" aria-label={isOpen ? 'Close menu' : 'Open menu'} onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
      {isOpen && (
        <div className="brand-mobile-menu">
          <a href="/?view=case-studies" onClick={() => setIsOpen(false)}>Case Studies</a>
          <a href="/#pricing" onClick={() => setIsOpen(false)}>Pricing</a>
          {BLOG_ENABLED && <a href="/?view=blog" onClick={() => setIsOpen(false)}>Blog</a>}
          <a
            data-analytics-booking
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackBookingClick('navbar_mobile')}
          >
            Book a call <ArrowRight size={16} />
          </a>
        </div>
      )}
    </nav>
  );
}

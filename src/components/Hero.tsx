import { motion } from 'motion/react';
import {
  ArrowRight,
  Bell,
  Bookmark,
  CalendarDays,
  Folder,
  Heart,
  Home,
  ListFilter,
  Menu,
  MessageCircle,
  Search,
  Settings,
  Star,
  UserRound,
} from 'lucide-react';
import laptop from '../asset/branding/laptop-reference.png';
import mouse from '../asset/branding/mouse-reference.png';

const calendarDays = Array.from({ length: 31 }, (_, index) => index + 1);

const cardMotion = {
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
};

function CalendarCard() {
  return (
    <article className="brand-card result-card calendar-card" aria-label="August 2026 calendar design">
      <div className="calendar-heading">
        <strong>August</strong>
        <span>2026</span>
      </div>
      <div className="calendar-grid calendar-weekdays" aria-hidden="true">
        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => <span key={`${day}-${index}`}>{day}</span>)}
      </div>
      <div className="calendar-grid">
        {Array.from({ length: 5 }).map((_, index) => <span key={`empty-${index}`} />)}
        {calendarDays.map((day) => <span key={day} className={day === 10 ? 'selected-day' : ''}>{day}</span>)}
      </div>
    </article>
  );
}

function IconCard() {
  const icons = [Home, Heart, Bell, Star, Settings, UserRound, Search, MessageCircle, Bookmark, CalendarDays, Folder, ListFilter];
  return (
    <article className="brand-card result-card icon-card" aria-label="Icon system design">
      <h2>Icons</h2>
      <div className="icon-grid">
        {icons.map((Icon, index) => (
          <span key={index} className="icon-cell">
            <Icon size={21} strokeWidth={2.2} color={index === 1 ? '#F05637' : 'currentColor'} />
          </span>
        ))}
      </div>
    </article>
  );
}

function TypeCard() {
  return (
    <article className="brand-card result-card type-card" aria-label="Typography design">
      <h2>Typography</h2>
      <div className="type-sample">Aa</div>
      <div className="type-line">Ideas rise.<br />Momentum builds.</div>
      <p>Inter Regular</p>
    </article>
  );
}

function ColorCard() {
  const colors = [
    ['Coral', '#F05637'],
    ['Black', '#000000'],
    ['Sage', '#7F958E'],
    ['Sand', '#EEF1F1'],
    ['Cream', '#FFFFFF'],
  ];
  return (
    <article className="brand-card result-card color-card" aria-label="Color palette design">
      <h2>Colors</h2>
      <div className="color-list">
        {colors.map(([name, value]) => (
          <div className="color-row" key={name}>
            <span className="color-swatch" style={{ backgroundColor: value }} />
            <span><strong>{name}</strong><small>{value}</small></span>
          </div>
        ))}
      </div>
    </article>
  );
}

function ComponentCard() {
  return (
    <article className="brand-card result-card component-card" aria-label="Component library design">
      <h2>Components</h2>
      <div className="component-grid">
        <button className="mini-primary" type="button" aria-label="Primary button"><span>Primary</span></button>
        <button className="mini-accent" type="button" aria-label="Primary accent button"><span>Primary / Accent</span></button>
        <button className="mini-secondary" type="button" aria-label="Secondary button"><span>Secondary</span></button>
        <label className="mini-input"><span>Input field</span></label>
      </div>
      <div className="component-footer">
        <button className="mini-toggle" type="button" aria-label="Toggle active"><span /></button>
        <div className="component-icons">
          <button className="mini-icon" type="button" aria-label="Search"><Search size={19} /></button>
          <button className="mini-icon" type="button" aria-label="Favorite"><Heart size={19} /></button>
          <button className="mini-icon" type="button" aria-label="Notifications"><Bell size={19} /></button>
          <button className="mini-icon" type="button" aria-label="More options"><Menu size={19} /></button>
        </div>
      </div>
    </article>
  );
}

export default function Hero() {
  return (
    <section className="branding-hero">
      <img className="desk-object laptop-object" src={laptop} alt="Silver laptop" />
      <img className="desk-object mouse-object" src={mouse} alt="White Apple Magic Mouse" />

      <div className="hero-copy">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
          <span className="availability-badge">Next availability: August 10, 2026</span>
        </motion.div>
        <motion.h1 initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.08 }}>
          Product design support,
          <span>on demand.</span>
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.16 }}>
          Expert product UI and UX design support for one flat monthly rate. No hiring. No waiting.
        </motion.p>
        <motion.a
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.22 }}
          href="https://cal.com/yating-zhao/15min"
          target="_blank"
          rel="noopener noreferrer"
          className="hero-cta"
        >
          Book a 15-min call
        </motion.a>
      </div>

      <div className="result-showcase" aria-label="Selected product design deliverables">
        <motion.div className="result-card-wrap calendar-wrap" {...cardMotion} transition={{ duration: 0.55, delay: 0.26 }}><CalendarCard /></motion.div>
        <motion.div className="result-card-wrap icon-wrap" {...cardMotion} transition={{ duration: 0.55, delay: 0.32 }}><IconCard /></motion.div>
        <motion.div className="result-card-wrap type-wrap" {...cardMotion} transition={{ duration: 0.55, delay: 0.38 }}><TypeCard /></motion.div>
        <motion.div className="result-card-wrap color-wrap" {...cardMotion} transition={{ duration: 0.55, delay: 0.44 }}><ColorCard /></motion.div>
        <motion.div className="result-card-wrap component-wrap" {...cardMotion} transition={{ duration: 0.55, delay: 0.5 }}><ComponentCard /></motion.div>
      </div>
    </section>
  );
}

export type AnalyticsProperties = Record<string, string | number | boolean | null | undefined>;

type PostHogClient = {
  init: (token: string, config: Record<string, unknown>) => void;
  register: (properties: AnalyticsProperties) => void;
  capture: (event: string, properties?: AnalyticsProperties) => void;
};

declare global {
  interface Window {
    posthog?: PostHogClient;
  }
}

const POSTHOG_TOKEN = 'phc_D5CVxCv7SL9dd4hBaL24doGifhHGJqAwbuDXqAToBXFN';
const CONTEXT = {
  site: 'brewpot_co',
  visitor_type: 'visitor',
} as const;

let ready = false;
let loading = false;
const queuedEvents: Array<[string, AnalyticsProperties]> = [];
const seenSections = new Set<string>();
const engagedSections = new Set<string>();
const seenCtas = new Set<string>();

function pageProperties(): AnalyticsProperties {
  return {
    current_url: window.location.href,
    page_path: window.location.pathname,
    page_title: document.title,
  };
}

function capture(event: string, properties: AnalyticsProperties = {}) {
  if (!ready || !window.posthog) {
    queuedEvents.push([event, properties]);
    return;
  }

  window.posthog.capture(event, properties);
}

function loadAnalytics() {
  if (loading || typeof window === 'undefined') return;
  loading = true;

  const script = document.createElement('script');
  script.async = true;
  script.src = 'https://us.i.posthog.com/static/array.js';
  script.onload = () => {
    const client = window.posthog;
    if (!client) return;

    client.init(POSTHOG_TOKEN, {
      api_host: 'https://us.i.posthog.com',
      autocapture: false,
      capture_pageview: false,
      capture_pageleave: true,
      person_profiles: 'identified_only',
      persistence: 'localStorage',
    });
    client.register(CONTEXT);
    ready = true;
    client.capture('$pageview', pageProperties());
    queuedEvents.splice(0).forEach(([event, properties]) => client.capture(event, properties));
  };
  script.onerror = () => {
    // Leave the queue in memory so a transient blocker does not affect the page itself.
    loading = false;
  };
  document.head.append(script);
}

function installClickTracking() {
  document.addEventListener('click', (event) => {
    const target = event.target instanceof Element ? event.target : null;
    if (!target) return;

    const cta = target.closest<HTMLElement>('[data-analytics-cta]');
    if (cta) {
      capture('cta_clicked', {
        cta_id: cta.dataset.analyticsCta ?? 'unknown',
        source: cta.dataset.analyticsCtaSource ?? 'unknown',
        label: cta.dataset.analyticsCtaLabel ?? cta.textContent?.trim() ?? 'unknown',
      });
      return;
    }

    const navLink = target.closest<HTMLAnchorElement>('nav a');
    if (navLink) {
      capture('section_nav_clicked', {
        label: navLink.textContent?.trim() ?? 'unknown',
        target: navLink.href,
      });
      return;
    }

    const galleryItem = target.closest<HTMLElement>('[data-analytics-section="gallery"] [aria-label^="Open "]');
    if (galleryItem) {
      capture('showcase_visual_clicked', {
        label: galleryItem.getAttribute('aria-label') ?? 'unknown',
        section: 'gallery',
      });
    }
  }, { capture: true });
}

export function track(event: string, properties: AnalyticsProperties = {}) {
  capture(event, properties);
}

export function setCtaVisibility(
  ctaId: string,
  visible: boolean,
  ratio: number,
  source: string,
  label: string,
) {
  if (!visible || ratio < 0.5 || seenCtas.has(ctaId)) return;
  seenCtas.add(ctaId);
  capture('cta_viewed', { cta_id: ctaId, source, label, visibility_ratio: ratio });
}

export function setSectionVisibility(
  section: string,
  visible: boolean,
  ratio: number,
  order: number,
) {
  if (!visible || ratio < 0.2) return;
  const properties = { section, section_order: order, visibility_ratio: ratio };

  if (!seenSections.has(section)) {
    seenSections.add(section);
    capture('section_viewed', properties);
  }
  if (ratio >= 0.5 && !engagedSections.has(section)) {
    engagedSections.add(section);
    capture('section_engaged', properties);
  }
}

loadAnalytics();
if (typeof document !== 'undefined') installClickTracking();

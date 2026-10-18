/* BrewPot inline booking enhancement; preserves the existing application bundle. */
(() => {
  const bookingUrl = 'https://cal.com/yating-zhao/15min';
  const isHome = new URLSearchParams(location.search).get('view') !== 'case-studies';
  const namespace = 'brewpot-intro';
  let started = false;

  function mountCalendar(section) {
    if (started) return;
    started = true;
    const status = section.querySelector('.calendar-status');
    const setReady = () => {
      clearTimeout(slowTimer);
      status.hidden = true;
      section.dataset.calendarState = 'ready';
    };
    const showSlow = () => {
      clearTimeout(slowTimer);
      status.hidden = false;
      status.textContent = 'Please refresh the page to load available times.';
      section.dataset.calendarState = 'slow';
    };
    const slowTimer = setTimeout(showSlow, 20000);

    // Cal.com's official embed bootstrap, scoped to this one booking panel.
    (function (C, A, L) {
      const push = (a, ar) => a.q.push(ar);
      const d = C.document;
      C.Cal = C.Cal || function () {
        const cal = C.Cal;
        const ar = arguments;
        if (!cal.loaded) {
          cal.ns = {};
          cal.q = cal.q || [];
          const script = d.createElement('script');
          script.src = A;
          script.async = true;
          script.onerror = showSlow;
          d.head.appendChild(script);
          cal.loaded = true;
        }
        if (ar[0] === L) {
          const api = function () { push(api, arguments); };
          const ns = ar[1];
          api.q = api.q || [];
          if (typeof ns === 'string') {
            cal.ns[ns] = cal.ns[ns] || api;
            push(cal.ns[ns], ar);
            push(cal, ['initNamespace', ns]);
          } else push(cal, ar);
          return;
        }
        push(cal, ar);
      };
    })(window, 'https://app.cal.com/embed/embed.js', 'init');

    window.Cal('init', namespace, { origin: 'https://app.cal.com' });
    const cal = window.Cal.ns[namespace];
    cal('on', { action: 'linkReady', callback: setReady });
    cal('on', { action: 'linkFailed', callback: showSlow });
    cal('inline', {
      elementOrSelector: '#brewpot-calendar',
      calLink: 'yating-zhao/15min',
      config: { layout: 'month_view', theme: 'light' },
    });
    cal('ui', {
      theme: 'light',
      hideEventTypeDetails: true,
      showTimezoneWhenEventDetailsHidden: true,
      layout: 'month_view',
      styles: { body: { background: 'transparent' } },
      cssVarsPerTheme: { light: {
        'cal-brand': '#202020',
        'font-sans': 'Inter, ui-sans-serif, system-ui, sans-serif',
        'radius-md': '12px',
        'cal-bg': '#ffffff',
        'cal-bg-emphasis': '#f0f0ee',
        'cal-bg-subtle': '#f7f7f5',
        'cal-border-booker': '#E5E5E8',
        'cal-border-booker-width': '1px',
        'cal-border': '#E5E5E8',
        'cal-border-subtle': '#E5E5E8',
      } },
    });
  }

  function enhance(main) {
    let section;
    if (isHome) {
      section = document.createElement('section');
      section.id = 'book-call';
      section.className = 'brewpot-calendar-section';
      section.setAttribute('aria-labelledby', 'booking-heading');
      section.dataset.calendarState = 'loading';
      section.innerHTML = `
        <div class="brewpot-calendar-inner">
          <div class="calendar-intro">
            <h2 id="booking-heading" tabindex="-1">Book a <span class="section-heading-accent">call</span></h2><p>Book a 15-minute call to explore working together.</p>
          </div>
          <div class="calendar-frame">
            <p class="calendar-status" role="status">Loading available times…</p>
            <div id="brewpot-calendar" aria-label="Schedule a 15-minute call with Yating"></div>
          </div>
        </div>`;
      main.appendChild(section);
      const observer = new IntersectionObserver(entries => {
        if (entries.some(entry => entry.isIntersecting)) {
          observer.disconnect();
          mountCalendar(section);
        }
      }, { rootMargin: '500px' });
      observer.observe(section);
      if (location.hash === '#book-call') {
        mountCalendar(section);
        requestAnimationFrame(() => section.scrollIntoView({ block: 'start' }));
      }
    }

    const patchLinks = () => {
      document.querySelectorAll(`a[href="${bookingUrl}"]`).forEach(link => {
        link.href = '/#book-call';
        link.removeAttribute('target');
        link.dataset.calendarTarget = 'true';
      });
    };
    patchLinks();
    new MutationObserver(patchLinks).observe(document.getElementById('root'), { childList: true, subtree: true });
    document.addEventListener('click', event => {
      const link = event.target.closest?.('a[data-calendar-target]');
      if (!link || !isHome || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      // Let the existing React handlers record the booking click before closing the menu.
      setTimeout(() => {
        document.querySelector('.brand-mobile-menu') && document.querySelector('.nav-menu-button')?.click();
      }, 0);
      history.pushState({}, '', '#book-call');
      mountCalendar(section);
      section.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' });
      section.querySelector('h2').focus({ preventScroll: true });
    }, true);
  }

  const main = document.querySelector('main');
  if (main) enhance(main);
  else {
    const ready = new MutationObserver(() => {
      const main = document.querySelector('main');
      if (main) { ready.disconnect(); enhance(main); }
    });
    ready.observe(document.getElementById('root'), { childList: true, subtree: true });
  }
})();

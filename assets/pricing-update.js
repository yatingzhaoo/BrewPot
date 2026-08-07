(() => {
  const plans = [
    {
      name: 'Starter',
      description: 'For new clients only',
      price: '$800',
      suffix: '/week',
      amount: 800,
      period: 'week',
      href: 'https://buy.stripe.com/14AfZjdvYc544wS3WJ6Na0m',
      benefits: [
        ['Unlimited', ' Design Requests'],
        ['48-Hour', ' Average Turnaround'],
        ['One', ' Consultation Call per Week'],
        ['Up to 10', ' Hours'],
      ],
    },
    {
      name: 'Standard',
      description: 'Ongoing product design support',
      price: '$2,799',
      suffix: '/mo',
      amount: 2799,
      period: 'month',
      href: 'https://buy.stripe.com/eVqaEZfE6edcgfAfFr6Na0l',
      popular: true,
      benefits: [
        ['Unlimited', ' Design Requests'],
        ['48-Hour', ' Average Turnaround'],
        ['One', ' Consultation Call per Week'],
        ['Up to 10 Hours', ' per Week'],
      ],
    },
    {
      name: 'Pro',
      description: 'Deep product partnership',
      price: '$4,999',
      suffix: '/mo',
      amount: 4999,
      period: 'month',
      href: 'https://buy.stripe.com/00w7sNdvY4CC3sO50N6Na0d',
      benefits: [
        ['Unlimited', ' Design Requests'],
        ['24-Hour', ' Average Turnaround'],
        ['Two', ' Consultation Calls per Week'],
        ['Up to 20 Hours', ' per Week'],
      ],
    },
  ];

  const styles = `
    #pricing .pricing-plans {
      display: grid;
      width: 100%;
      max-width: 1320px;
      margin: 0 auto;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 20px;
    }
    #pricing .pricing-card {
      position: relative;
      display: flex;
      min-height: 520px;
      flex-direction: column;
      overflow: hidden;
      box-sizing: border-box;
      padding: 28px;
      border: 1px solid #e5e5e8;
      border-radius: 12px;
      background: #fff;
    }
    #pricing .pricing-card.is-popular {
      border-color: #171717;
      box-shadow: 0 14px 34px rgba(32, 32, 32, 0.08);
    }
    #pricing .pricing-corner {
      pointer-events: none;
      position: absolute;
      top: 0;
      right: 0;
      width: 112px;
      height: 112px;
      background: #171717;
      clip-path: polygon(0 0, 100% 0, 100% 100%);
    }
    #pricing .pricing-corner-label {
      pointer-events: none;
      position: absolute;
      z-index: 2;
      top: 18px;
      right: 0;
      width: 76px;
      transform: rotate(45deg);
      color: #fff;
      text-align: center;
      font: 500 15px/16px Inter, sans-serif;
      letter-spacing: -0.02em;
    }
    #pricing .pricing-card-head {
      position: relative;
      z-index: 1;
      margin-bottom: 24px;
    }
    #pricing .pricing-card-head h3 {
      margin: 0;
      color: #000;
      font: 600 22px/1.25 Inter, sans-serif;
      letter-spacing: -0.025em;
    }
    #pricing .pricing-card-head p {
      margin: 4px 0 0;
      color: #737373;
      font: 400 16px/1.5 Inter, sans-serif;
    }
    #pricing .pricing-price {
      position: relative;
      z-index: 1;
      display: flex;
      align-items: baseline;
      margin-bottom: 28px;
      color: #202020;
    }
    #pricing .pricing-price strong {
      font: 500 56px/1 "Bricolage Grotesque", sans-serif;
      letter-spacing: -0.04em;
    }
    #pricing .pricing-price span {
      margin-left: 8px;
      font: 500 19px/1 Inter, sans-serif;
    }
    #pricing .pricing-benefits {
      position: relative;
      z-index: 1;
      display: flex;
      flex-direction: column;
      gap: 16px;
      margin: 0 0 32px;
      padding: 0;
      list-style: none;
    }
    #pricing .pricing-benefits li {
      display: flex;
      align-items: center;
      gap: 12px;
      color: #171717;
      font: 400 16px/1.45 Inter, sans-serif;
    }
    #pricing .pricing-benefits svg {
      width: 18px;
      height: 18px;
      flex: 0 0 auto;
      color: #000;
    }
    #pricing .pricing-benefits strong { color: #000; font-weight: 600; }
    #pricing .pricing-button {
      position: relative;
      z-index: 1;
      display: flex;
      width: 100%;
      height: 58px;
      margin-top: auto;
      align-items: center;
      justify-content: center;
      border-radius: 6px;
      background: #000;
      color: #fff;
      text-decoration: none;
      font: 500 17px/1 Inter, sans-serif;
    }
    @media (max-width: 1023px) {
      #pricing .pricing-plans { grid-template-columns: repeat(2, minmax(0, 1fr)); }
    }
    @media (max-width: 767px) {
      #pricing .pricing-plans { grid-template-columns: 1fr; }
      #pricing .pricing-card { min-height: 500px; padding: 24px; }
      #pricing .pricing-price strong { font-size: 48px; }
    }
  `;

  const checkIcon = `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.75"
      stroke-linecap="butt" stroke-linejoin="miter" aria-hidden="true">
      <path d="M20 6 9 17l-5-5"></path>
    </svg>
  `;

  function cardMarkup(plan) {
    const benefits = plan.benefits
      .map(([bold, rest]) => `<li>${checkIcon}<span><strong>${bold}</strong>${rest}</span></li>`)
      .join('');
    const corner = plan.popular
      ? '<div class="pricing-corner"></div><span class="pricing-corner-label">Most<br>popular</span>'
      : '';

    return `
      <article class="pricing-card${plan.popular ? ' is-popular' : ''}">
        ${corner}
        <div class="pricing-card-head">
          <h3>${plan.name}</h3>
          <p>${plan.description}</p>
        </div>
        <div class="pricing-price"><strong>${plan.price}</strong><span>${plan.suffix}</span></div>
        <ul class="pricing-benefits">${benefits}</ul>
        <a
          class="pricing-button"
          href="${plan.href}"
          target="_blank"
          rel="noopener noreferrer"
          data-plan="${plan.name.toLowerCase()}"
          data-price="${plan.amount}"
          data-period="${plan.period}"
        >Get started</a>
      </article>
    `;
  }

  function updatePricing() {
    const section = document.querySelector('#pricing');
    if (!section || section.dataset.pricingUpdate === 'complete') return false;

    const standardLink = section.querySelector('[data-analytics-cta="pricing_standard_checkout"]');
    const currentGrid = standardLink?.parentElement?.parentElement;
    if (!currentGrid) return false;

    if (!document.querySelector('#pricing-update-styles')) {
      const style = document.createElement('style');
      style.id = 'pricing-update-styles';
      style.textContent = styles;
      document.head.appendChild(style);
    }

    currentGrid.className = 'pricing-plans';
    currentGrid.innerHTML = plans.map(cardMarkup).join('');
    currentGrid.querySelectorAll('.pricing-button').forEach((button) => {
      button.addEventListener('click', () => {
        const properties = {
          source: 'pricing',
          plan: button.dataset.plan,
          price_amount: Number(button.dataset.price),
          billing_period: button.dataset.period,
          currency: 'USD',
          destination: 'stripe_checkout',
        };
        window.posthog?.capture?.('checkout_started', properties);
        window.gtag?.('event', 'checkout_started', properties);
      });
    });

    section.dataset.pricingUpdate = 'complete';
    return true;
  }

  if (!updatePricing()) {
    const observer = new MutationObserver(() => {
      if (updatePricing()) observer.disconnect();
    });
    observer.observe(document.documentElement, { childList: true, subtree: true });
  }
})();

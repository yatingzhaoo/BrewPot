import { Check } from 'lucide-react';
import { track } from '../analytics';

const CHECKOUT_URL = 'https://buy.stripe.com/8x23cx0Jcglk9RcgJv6Na0n';

export default function Pricing() {
  return (
    <section id="pricing" aria-labelledby="pricing-title" data-analytics-section="pricing" className="subscription-section">
      <div className="subscription-container">
        <div className="subscription-layout">
          <div className="subscription-overview">
            <h2 id="pricing-title">Fixed price.<br /><span>Unlimited requests.</span></h2>
            <p>Know what your startup will spend on design each month.</p>
          </div>
          <article className="subscription-card" aria-label="Monthly design subscription">
            <div className="subscription-price"><span>$3,500</span><span>USD / month</span></div>
            <ul className="subscription-details" aria-label="Subscription details">
              <li><Check aria-hidden="true" /><span>Up to <strong>15 design hours</strong> per week</span></li>
              <li><Check aria-hidden="true" /><span>Unlimited design requests</span></li>
              <li><Check aria-hidden="true" /><span>Pause by arrangement</span></li>
            </ul>
            <a
              className="subscription-cta"
              href={CHECKOUT_URL}
              target="_blank"
              rel="noopener noreferrer"
              data-analytics-cta="pricing_subscription_checkout"
              data-analytics-cta-source="价格方案 > Design subscription"
              data-analytics-cta-label="Get started"
              onClick={() => track('checkout_started', {
                source: 'pricing', plan: 'subscription', plan_title: 'BrewPot Design Subscription',
                price_amount: 3500, billing_period: 'month', currency: 'USD', destination: 'stripe_checkout',
              })}
            >Get started</a>
          </article>
        </div>
      </div>
    </section>
  );
}

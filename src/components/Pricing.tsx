import { Check } from 'lucide-react';
import { track } from '../analytics';

const plans = [
  {
    name: 'Starter',
    description: 'For new clients only',
    price: '$800',
    priceSuffix: '/week',
    priceAmount: 800,
    billingPeriod: 'week',
    analyticsCta: 'pricing_starter_checkout',
    analyticsSource: '价格方案 > Starter',
    href: 'https://buy.stripe.com/14AfZjdvYc544wS3WJ6Na0m',
    popular: false,
    benefits: [
      { bold: 'Unlimited', rest: ' Design Requests' },
      { bold: '48-Hour', rest: ' Average Turnaround' },
      { bold: 'One', rest: ' Consultation Call per Week' },
      { bold: 'Up to 10', rest: ' Hours' },
    ],
  },
  {
    name: 'Standard',
    description: 'Ongoing product design support',
    price: '$2,799',
    priceSuffix: '/mo',
    priceAmount: 2799,
    billingPeriod: 'month',
    analyticsCta: 'pricing_standard_checkout',
    analyticsSource: '价格方案 > Standard',
    href: 'https://buy.stripe.com/eVqaEZfE6edcgfAfFr6Na0l',
    popular: true,
    benefits: [
      { bold: 'Unlimited', rest: ' Design Requests' },
      { bold: '48-Hour', rest: ' Average Turnaround' },
      { bold: 'One', rest: ' Consultation Call per Week' },
      { bold: 'Up to 10 Hours', rest: ' per Week' },
    ],
  },
  {
    name: 'Pro',
    description: 'Deep product partnership',
    price: '$4,999',
    priceSuffix: '/mo',
    priceAmount: 4999,
    billingPeriod: 'month',
    analyticsCta: 'pricing_pro_checkout',
    analyticsSource: '价格方案 > Pro',
    href: 'https://buy.stripe.com/00w7sNdvY4CC3sO50N6Na0d',
    popular: false,
    benefits: [
      { bold: 'Unlimited', rest: ' Design Requests' },
      { bold: '24-Hour', rest: ' Average Turnaround' },
      { bold: 'Two', rest: ' Consultation Calls per Week' },
      { bold: 'Up to 20 Hours', rest: ' per Week' },
    ],
  },
];

export default function Pricing() {
  return (
    <section
      id="pricing"
      data-analytics-section="pricing"
      className="relative overflow-hidden bg-transparent pb-12 pt-24 md:pb-16 md:pt-28"
    >
      <div className="relative z-10 mx-auto flex max-w-[1180px] flex-col gap-12 px-6 sm:px-8 lg:px-12">
        <div className="text-center">
          <h2 className="font-heading text-[42px] font-medium leading-tight tracking-tight text-[#202020] md:text-[52px]">
            Flat-Rate Design Retainer
          </h2>
        </div>

        <div className="mx-auto grid w-full max-w-[1180px] items-stretch gap-7 md:grid-cols-2 md:gap-5 lg:grid-cols-3">
          {plans.map((plan) => (
            <article
              key={plan.name}
              className="relative flex flex-col overflow-hidden rounded-[12px] bg-white p-6 sm:p-7"
              style={{
                boxShadow: plan.popular
                  ? '0 14px 34px rgba(32, 32, 32, 0.08), inset 0 0 0 1px #171717'
                  : 'inset 0 0 0 1px #E5E5E8',
              }}
            >
              {plan.popular && (
                <>
                  <div
                    className="pointer-events-none absolute right-0 top-0 h-[112px] w-[112px] bg-[#171717] [clip-path:polygon(0_0,100%_0,100%_100%)]"
                  />
                  <span className="pointer-events-none absolute right-0 top-[18px] z-20 w-[76px] rotate-45 text-center font-sans text-[15px] font-medium leading-[16px] tracking-[-0.02em] text-white">
                    Most<br />popular
                  </span>
                </>
              )}

              <div className="relative z-10 mb-6">
                <h3 className="font-sans text-[22px] font-semibold tracking-tight text-black">{plan.name}</h3>
                <p className="mt-1 font-sans text-[16px] text-neutral-500">{plan.description}</p>
              </div>

              <div className="relative z-10 mb-7 flex items-baseline">
                <span className="font-heading text-[48px] font-medium leading-none tracking-tight text-[#202020] md:text-[56px]">
                  {plan.price}
                </span>
                <span className="ml-2 font-sans text-[19px] font-medium text-[#202020]">{plan.priceSuffix}</span>
              </div>

              <ul className="relative z-10 mb-8 space-y-4">
                {plan.benefits.map((item) => (
                  <li
                    key={`${item.bold}-${item.rest}`}
                    className="flex items-center gap-3 font-sans text-[16px] text-neutral-900"
                  >
                    <Check
                      className="mt-[1px] h-[18px] w-[18px] flex-shrink-0 text-black"
                      strokeWidth={2.75}
                      strokeLinecap="butt"
                      strokeLinejoin="miter"
                    />
                    <span>
                      <span className="font-semibold text-black">{item.bold}</span>
                      {item.rest}
                    </span>
                  </li>
                ))}
              </ul>

              <a
                data-analytics-cta={plan.analyticsCta}
                data-analytics-cta-source={plan.analyticsSource}
                data-analytics-cta-label={`Get started — ${plan.name}`}
                href={plan.href}
                target="_blank"
                rel="noopener noreferrer"
                className="relative z-10 mt-auto flex h-[58px] w-full items-center justify-center rounded-[6px] bg-black font-sans text-[17px] font-medium text-white transition-opacity duration-200 hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                onClick={() =>
                  track('checkout_started', {
                    source: 'pricing',
                    plan: plan.name.toLowerCase(),
                    plan_title: plan.name,
                    price_amount: plan.priceAmount,
                    billing_period: plan.billingPeriod,
                    currency: 'USD',
                    destination: 'stripe_checkout',
                  })
                }
              >
                Get started
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

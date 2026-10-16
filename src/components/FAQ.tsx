import { useCallback, useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { Minus, Plus } from 'lucide-react';
import { track } from '../analytics';

const PERSONAL_SITE_URL = 'https://yatingzhao.com';

const faqs = [
  {
    question: "What does the subscription include?",
    answer: "Product strategy, UX and UI design for your startup, with up to 15 design hours per week. We will focus on the product challenges and design work that matter most to your team."
  },
  {
    question: "Who will work with our startup?",
    answer: "You will work directly with me, Yating Zhao. I handle product strategy, UX and UI throughout our collaboration."
  },
  {
    question: "How will we collaborate?",
    answer: "We’ll start with your product goals and agree on priorities. You’ll have a shared link to the latest designs, so you can follow progress and share feedback as we go. We’ll use messages for everyday updates and meet when it helps us work through a problem or review ideas together."
  },
  {
    question: "How do weekly hours work?",
    answer: "You can share your design needs directly with me. I’m careful about how I spend your 15 weekly hours. How much we complete depends on the scope and complexity of the work.\n\nProject meetings count toward your weekly hours.\nUnused hours do not roll over to the next week."
  },
  {
    question: "Can you sign an NDA?",
    answer: "Yes, I can sign an NDA to protect your product and project confidentiality."
  },
  {
    question: "Which time zones do you work with?",
    answer: "I am based in California and primarily work Monday to Friday in Pacific Time. I collaborate with teams across time zones, using asynchronous updates and scheduling workshops at times that work for both of us."
  },
  {
    question: "How does payment work?",
    answer: "The subscription is $3,500 USD per month, with two payment options:\n\nStripe: pay directly through the website, with automatic monthly renewal from your first payment.\n\nMercury: pay by invoice. Payment dates and terms are agreed with you and stated on the invoice."
  },
  {
    question: "Can we pause or cancel the subscription?",
    answer: "To cancel automatic renewal through Stripe, just let me know before your next charge.\n\nTo pause, contact me so we can agree on pause and restart dates and confirm the billing arrangement. For Mercury invoices, contact me to arrange changes to the engagement and future invoices."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const prefersReducedMotion = useReducedMotion();
  const openFaqIndex = useRef<number | null>(null);
  const faqOpenedAt = useRef<number | null>(null);

  const completeFaqReading = useCallback((exitAction: 'closed' | 'switched' | 'page_exit') => {
    if (openFaqIndex.current === null || faqOpenedAt.current === null) return;
    const faq = faqs[openFaqIndex.current];

    track('faq_read_completed', {
      faq_id: `faq_${openFaqIndex.current + 1}`,
      question: faq.question,
      active_open_time_ms: Date.now() - faqOpenedAt.current,
      exit_action: exitAction,
      source: '常见问题区块',
      page_area: 'homepage.faq',
      page_area_label: '常见问题',
    });

    openFaqIndex.current = null;
    faqOpenedAt.current = null;
  }, []);

  useEffect(() => () => completeFaqReading('page_exit'), [completeFaqReading]);

  const renderFaq = (faq: (typeof faqs)[number], index: number) => {
    const isOpen = openIndex === index;

    return (
      <motion.article
        layout="position"
        key={faq.question}
        transition={{
          layout: prefersReducedMotion
            ? { duration: 0 }
            : { duration: 0.28, ease: [0.22, 1, 0.36, 1] },
        }}
        className={`overflow-hidden rounded-[10px] border bg-white transition-colors duration-200 ${
          isOpen ? 'border-[#F05637]/45' : 'border-[#D9DAD8] hover:border-[#B8BAB7]'
        }`}
      >
        <button
          type="button"
          aria-expanded={isOpen}
          aria-controls={`faq-answer-${index}`}
          onClick={() => {
            const opened = !isOpen;
            if (openIndex !== null) {
              completeFaqReading(opened ? 'switched' : 'closed');
            }
            track('faq_toggled', {
              faq_id: `faq_${index + 1}`,
              question: faq.question,
              opened,
              source: '常见问题区块',
              page_area: 'homepage.faq',
              page_area_label: '常见问题',
            });
            if (opened) {
              openFaqIndex.current = index;
              faqOpenedAt.current = Date.now();
            }
            setOpenIndex(opened ? index : null);
          }}
          className="group flex w-full items-start px-4 py-4 text-left sm:px-5 sm:py-5"
        >
          <span className="flex min-w-0 flex-1 items-start justify-between gap-4">
            <span className="max-w-[640px] font-sans text-[16px] font-semibold leading-[1.3] tracking-[-0.018em] text-[#171717] sm:text-[17px] lg:text-[18px]">
              {faq.question}
            </span>
            <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center text-[#111111]">
              {isOpen ? (
                <Minus className="h-5 w-5 text-[#F05637]" strokeWidth={2.1} />
              ) : (
                <Plus className="h-5 w-5 transition-colors group-hover:text-[#F05637]" strokeWidth={2.05} />
              )}
            </span>
          </span>
        </button>

        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              id={`faq-answer-${index}`}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={prefersReducedMotion
                ? { duration: 0 }
                : { duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <p className="px-4 pb-5 font-sans text-[16px] leading-[1.6] text-[#545454] whitespace-pre-line sm:px-5 sm:pb-6 sm:text-[16px]">
                {faq.answer.split('Yating Zhao').map((part, partIndex, parts) => (
                  <span key={`${index}-${partIndex}`}>
                    {part}
                    {partIndex < parts.length - 1 && (
                      <a
                        href={PERSONAL_SITE_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline decoration-neutral-400 underline-offset-4 transition-colors hover:text-black hover:decoration-black"
                        onClick={() => track('outbound_link_clicked', {
                          label: 'Yating Zhao',
                          href: PERSONAL_SITE_URL,
                          source: 'faq',
                        })}
                      >
                        Yating Zhao
                      </a>
                    )}
                  </span>
                ))}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.article>
    );
  };

  return (
    <section id="faq" data-analytics-section="faq" className="scroll-mt-20 bg-transparent pb-24 pt-20 text-[#171717] md:scroll-mt-24 md:pb-28 md:pt-24">
      <div className="mx-auto max-w-[1180px] px-6 sm:px-8 lg:px-12">
        <h2 className="text-center font-heading text-[42px] font-medium leading-tight tracking-tight text-[#202020] md:text-[52px]">
          Questions from startup teams
        </h2>

        <div className="mx-auto mt-10 flex max-w-[800px] flex-col gap-3 md:mt-12">
          {faqs.map((faq, index) => renderFaq(faq, index))}
        </div>

        <div className="mt-8 text-center md:mt-10">
          <p className="font-sans text-[16px] leading-relaxed text-[#555]">
            More questions? Email <a
              href="mailto:yatzhao@brewpot.co"
              className="font-semibold text-black underline decoration-transparent underline-offset-4 transition-colors hover:decoration-black"
              onClick={() => track('outbound_link_clicked', {
                label: 'yatzhao@brewpot.co',
                href: 'mailto:yatzhao@brewpot.co',
                source: 'faq',
              })}
            >yatzhao@brewpot.co</a>.
          </p>
        </div>

      </div>
    </section>
  );
}

import { useCallback, useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { Minus, Plus } from 'lucide-react';
import { track } from '../analytics';

const PERSONAL_SITE_URL = 'https://yatingzhao.com';

const faqs = [
  {
    question: "How many people are on the BrewPot team?",
    answer: "BrewPot is a one‑person studio run solely by me, Yating Zhao. Over my 10-year career, I have supported product definition and design for more than 30 software products spanning complex domains and use cases, including Web3, logistics and last-mile delivery, education, payments, banking, healthcare, consumer products, enterprise software, and internal tools. My work covers web apps, mobile apps, desktop apps, browser extensions, websites, and internal tools."
  },
  {
    question: "How do we communicate during the project?",
    answer: "We will have 1–2 face-to-face design workshops each week. Each workshop will focus on a specific product problem or improvement opportunity. I will present a complete design solution, along with supporting research and the strategy behind it.\n\nBetween workshops, we will communicate asynchronously, and I will respond directly to your messages and questions."
  },
  {
    question: "Is there a limit to what I can request?",
    answer: "Requests for design and product problem-solving are unlimited. Complex tasks may take 1–2 weeks, while simpler ones are completed quickly, usually within 24–48 hours. I work on multiple tasks in parallel, so no task queue is needed."
  },
  {
    question: "Can I book if you are currently fully booked?",
    answer: "Yes. If I’m fully booked, you can reserve my next available slot and lock your preferred start date. Once secured, your spot is reserved exclusively for you and will not be offered to others."
  },
  {
    question: "Can you sign an NDA?",
    answer: "Yes, I can sign an NDA to protect your product and project confidentiality."
  },
  {
    question: "Where are you based?",
    answer: "I am based in California, USA (Pacific Time). Previous clients have been based in Canada, Dubai, the Netherlands, China, Hong Kong, and beyond, and every team has been able to keep regular face-to-face communication."
  },
  {
    question: "When are your working hours?",
    answer: "My schedule is flexible. I primarily work during daytime on Monday to Friday in Pacific Time, but I will respond to messages and accommodate urgent needs at any time."
  },
  {
    question: "How do I pay?",
    answer: "You can pay directly through the website to secure your spot, or request a formal Mercury invoice after we confirm the collaboration.\n\nPayments are primarily accepted in USD, and a receipt will be issued once payment is processed. Alternative currencies and payment methods can be discussed case by case."
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
            <span className="max-w-[410px] font-sans text-[16px] font-semibold leading-[1.3] tracking-[-0.018em] text-[#171717] sm:text-[17px] lg:text-[18px]">
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
              <p className="px-4 pb-5 font-sans text-[15px] leading-[1.6] text-[#545454] whitespace-pre-line sm:px-5 sm:pb-6 sm:text-[16px]">
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
          Frequently Asked Questions
        </h2>

        <div className="mt-4 text-center md:mt-5">
          <p className="font-sans text-[16px] leading-relaxed text-[#555]">
            Have more questions? Reach out at <a
              href="mailto:yatzhao@brewpot.co"
              className="font-semibold text-black underline decoration-transparent underline-offset-4 transition-colors hover:decoration-black"
              onClick={() => track('outbound_link_clicked', {
                label: 'yatzhao@brewpot.co',
                href: 'mailto:yatzhao@brewpot.co',
                source: 'faq',
              })}
            >yatzhao@brewpot.co</a> for a reply within 12 hours.
          </p>
        </div>

        <div className="mt-10 grid items-start gap-3 md:mt-12 md:grid-cols-2 md:gap-5">
          <div className="flex flex-col gap-3">
            {faqs.slice(0, 4).map((faq, index) => renderFaq(faq, index))}
          </div>
          <div className="flex flex-col gap-3">
            {faqs.slice(4).map((faq, index) => renderFaq(faq, index + 4))}
          </div>
        </div>

      </div>
    </section>
  );
}

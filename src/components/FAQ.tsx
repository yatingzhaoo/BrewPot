import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus } from 'lucide-react';

const faqs = [
  {
    question: "What is BrewPot?",
    answer: "BrewPot is a one-person design studio founded in 2024 by me, Yating Zhao. My mission is to make it easy for every team to access professional UI/UX design support in a highly flexible and seamless way."
  },
  {
    question: "How do we communicate during the project? Will I talk directly with the designer?",
    answer: "Yes. You will work directly with me, the only designer behind BrewPot. I communicate through whichever tools you prefer, including Slack, WeChat, and Lark. I also hold regular face-to-face discussions via Zoom, Google Meet, Tencent Meeting, or Lark to review progress and answer any questions."
  },
  {
    question: "Is there a limit to what I can request?",
    answer: "During your subscription, you can submit unlimited design requests of any size. I use the dedicated weekly hours you've booked to work through them, and you can typically expect thoughtful, well-crafted design deliverables within two days."
  },
  {
    question: "What types of design are supported?",
    answer: "My core focus is delivering high-quality, user-friendly app interface designs and solving product UX problems, even for complex products and scenarios such as banking, web3, logistics, and healthcare.\n\nI also help refine and improve websites so your customers and users can clearly understand your product or service and appreciate its value.\n\nIn addition, I provide light brand design support, including logos, brand guidelines, and social media assets."
  },
  {
    question: "How do I pay?",
    answer: "You can pay directly through my website or via a custom payment link. I accept credit cards, debit cards, ACH transfers, Zelle, Alipay, USD, RMB, and cryptocurrency payments. A formal invoice is provided for every payment."
  },
  {
    question: "How long do different design projects usually take?",
    answer: "A mobile or web application typically takes three to eight weeks. A complete website usually takes two to eight weeks. Single pages or smaller features may take only a few days. I adapt to your timeline when possible and work efficiently to deliver high-quality results."
  },
  {
    question: "Can I reserve a future slot if you're currently full?",
    answer: "Yes. You can secure a future start date by paying in advance."
  },
  {
    question: "Can you sign an NDA?",
    answer: "Yes. Protecting client privacy and confidential information is a top priority. I am happy to sign an NDA and follow all confidentiality requirements."
  },
  {
    question: "Do you also do development?",
    answer: "Yes. I build with Framer and Webflow for no-code development. For more complex or custom engineering needs, I work with trusted development partners to support your project."
  },
  {
    question: "Why should I choose BrewPot instead of working with a large design agency?",
    answer: "Unlike large agencies, BrewPot gives you direct access to a single senior designer who works closely with you at all times. There are no intermediaries, no waiting periods, and no complicated processes. Your needs are understood and executed quickly, giving you an experience similar to having an in-house designer."
  },
  {
    question: "Where are you based?",
    answer: "I am based in Southern California and work remotely with clients around the world."
  },
  {
    question: "When do you work?",
    answer: "My schedule is highly flexible to support teams across different time zones. I respond promptly and set aside dedicated face-to-face time to help you with any questions you may have."
  },
  {
    question: "What will I actually receive?",
    answer: "You will receive complete design deliverables, including Figma files, wireframes, clickable prototypes, and UI component libraries or design systems if needed. Everything is tailored to your product requirements, and all source files are included."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="pt-16 pb-12 bg-[#0A0A0A] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-12 gap-12">
          <div className="md:col-span-4">
            <h2 className="font-heading font-normal text-[42px] md:text-[52px] text-white mb-2 tracking-tight leading-tight">Frequently Asked<br />Questions</h2>
          </div>

          <div className="md:col-span-8">
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className={`${index !== faqs.length - 1 ? 'border-b border-white/10' : ''} pb-2`}>
                  <button
                    onClick={() => setOpenIndex(openIndex === index ? null : index)}
                    className="w-full flex justify-between items-start text-left py-3 group"
                  >
                    <span className="text-lg font-normal text-gray-200 group-hover:text-white transition-colors pr-8">
                      {faq.question}
                    </span>
                    <Plus
                      className={`w-5 h-5 text-gray-400 transform transition-transform duration-300 ${openIndex === index ? 'rotate-45' : ''}`}
                    />
                  </button>
                  <AnimatePresence>
                    {openIndex === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <p className="text-gray-400 pt-1 pb-3 leading-relaxed whitespace-pre-line">
                          {faq.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-20 text-center">
          <p className="text-gray-400 text-[16px] font-sans">
            Have more questions? Reach out at <a href="mailto:yatzhao@brewpot.co" className="text-white font-medium hover:underline">yatzhao@brewpot.co</a> for a reply within 12 hours.
          </p>
        </div>
      </div>
    </section>
  );
}

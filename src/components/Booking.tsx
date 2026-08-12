import { track } from '../analytics';

type BookingProps = {
  compact?: boolean;
};

export default function Booking({ compact = false }: BookingProps) {
  return (
    <section
      id="contact"
      data-analytics-section="contact"
      className={`bg-transparent ${compact ? 'pt-12 pb-16 px-6' : 'py-24'}`}
    >
      <div className={compact ? 'case-study-media-bg max-w-[640px] mx-auto rounded-[12px] px-8 py-10 md:py-12' : 'max-w-[1180px] mx-auto px-6 sm:px-8 lg:px-12'}>
        <div className="flex flex-col items-center text-center">
          <div className={compact ? 'text-center max-w-[500px]' : 'text-center max-w-[920px]'}>
            <h2 className={`font-heading font-medium text-[#202020] mb-2 tracking-tight leading-tight ${compact ? 'text-[32px] md:text-[36px]' : 'text-[42px] md:text-[52px]'}`}>
              Unlock Your Product’s Potential
            </h2>
            <p className={`text-neutral-500 ${compact ? 'text-[16px] leading-[26px] mb-6' : 'mx-auto max-w-[760px] text-[19px] mb-8'}`}>
              Tell me what you’re building, and let’s find the right way to improve it.
            </p>

            <a
              data-analytics-cta={compact ? 'case_study_booking' : 'closing_booking'}
              data-analytics-cta-source={compact ? 'Case Study 底部' : '页面底部联系区域'}
              data-analytics-cta-label="Book a 15-min call"
              href="https://cal.com/yating-zhao/15min"
              target="_blank"
              rel="noopener noreferrer"
              className={`bg-black text-white rounded-[6px] font-medium hover:opacity-90 transition-opacity flex items-center justify-center inline-flex ${compact ? 'px-5 h-[48px] text-[16px]' : 'px-8 h-[58px] text-[17px]'}`}
              onClick={() => track('booking_link_clicked', {
                source: compact ? 'case_study_detail' : 'contact_section',
                destination: 'https://cal.com/yating-zhao/15min',
                cta_label: 'Book a 15-min call',
                page_context: compact ? 'case_study' : 'closing_cta',
              })}
            >
              Book a 15-min call
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}

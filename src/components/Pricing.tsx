import { Check } from 'lucide-react';

export default function Pricing() {
  return (
    <section id="pricing" className="relative py-24 bg-transparent">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: 'radial-gradient(circle at 50% 42%, rgba(255, 149, 0, 0.12) 0%, rgba(255, 149, 0, 0) 35%)',
          pointerEvents: 'none',
        }}
      />
      <div className="max-w-[1100px] mx-auto px-6 sm:px-8 lg:px-12 flex flex-col gap-8 relative z-10">
        <div className="text-center mb-6">
          <h2 className="font-heading font-medium text-[42px] md:text-[52px] text-[#202020] tracking-tight leading-tight">Pricing</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Standard Plan */}
          <div className="bg-white rounded-[8px] px-6 py-8 border border-[#E5E5E8] flex flex-col relative">
            <div className="flex justify-between items-start mb-0.5">
              <h3 className="text-[20px] font-sans font-semibold text-black tracking-tight">Standard</h3>
            </div>

            <p className="text-neutral-500 text-[16px] mb-4 font-sans">Ongoing design support</p>

            <div className="flex items-baseline mb-6">
              <span className="text-[56px] font-heading font-medium text-[#202020] tracking-tight leading-none">$2,799</span>
              <span className="text-[#202020] ml-2 font-sans font-medium text-[20px]">/mo</span>
            </div>

            <a
              href="https://buy.stripe.com/eVqaEZfE6edcgfAfFr6Na0l"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-black text-white h-[58px] rounded-[7px] font-medium text-[17px] mt-2 mb-8 hover:opacity-90 transition-opacity flex items-center justify-center"
            >
              Subscribe
            </a>

            <ul className="space-y-4">
              {[
                { bold: "Up to 10", rest: " Hours/Week" },
                { bold: "1x/Week", rest: " Sync" },
                { bold: "Timely", rest: " Replies" },
                { bold: "3-Day", rest: " Free Trial" }
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-[16px] text-neutral-900 font-sans">
                  <Check className="w-[18px] h-[18px] text-black mt-[1px] flex-shrink-0" strokeWidth={1.5} />
                  <span>
                    <span className="font-semibold text-black">{item.bold}</span>{item.rest}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Pro Plan */}
          <div className="bg-white rounded-[8px] px-6 py-8 border border-[#E5E5E8] flex flex-col relative">
            <div className="flex justify-between items-start mb-0.5">
              <h3 className="text-[20px] font-sans font-semibold text-black tracking-tight">Pro</h3>
            </div>

            <p className="text-neutral-500 text-[16px] mb-4 font-sans">Deep product partnership</p>

            <div className="flex items-baseline mb-6">
              <span className="text-[56px] font-heading font-medium text-[#202020] tracking-tight leading-none">$4,999</span>
              <span className="text-[#202020] ml-2 font-sans font-medium text-[20px]">/mo</span>
            </div>

            <a
              href="https://buy.stripe.com/00w7sNdvY4CC3sO50N6Na0d"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-black text-white h-[58px] rounded-[7px] font-medium text-[17px] mt-2 mb-8 hover:opacity-90 transition-opacity flex items-center justify-center"
            >
              Subscribe
            </a>

            <ul className="space-y-4">
              {[
                { bold: "Up to 20", rest: " Hours/Week" },
                { bold: "2x/Week", rest: " Sync" },
                { bold: "Priority", rest: " Replies" },
                { bold: "1-Day", rest: " Free Trial" }
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-[16px] text-neutral-900 font-sans">
                  <Check className="w-[18px] h-[18px] text-black mt-[1px] flex-shrink-0" strokeWidth={1.5} />
                  <span>
                    <span className="font-semibold text-black">{item.bold}</span>{item.rest}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

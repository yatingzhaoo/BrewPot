import { Check } from 'lucide-react';

export default function Pricing() {
  return (
    <section id="pricing" className="py-24 bg-transparent">
      <div className="max-w-[1100px] mx-auto px-6 sm:px-8 lg:px-12 flex flex-col gap-8">
        <div className="text-center mb-12">
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
              <span className="text-[56px] font-heading font-normal text-[#202020] tracking-tight leading-none">$2,799</span>
              <span className="text-[#202020] ml-2 font-sans font-medium text-[20px]">/mo</span>
            </div>

            <a
              href="https://buy.stripe.com/eVqaEZfE6edcgfAfFr6Na0l"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-black text-white h-[58px] rounded-[7px] font-medium text-[17px] mt-2 mb-3 hover:opacity-90 transition-opacity flex items-center justify-center"
            >
              Secure your next slot
            </a>
            <p className="text-center text-[16px] mb-8 font-sans">
              <span className="font-semibold text-black">11 bought</span> <span className="text-neutral-400 font-medium">in past year</span>
            </p>

            <ul className="space-y-4">
              {[
                { bold: "Unlimited", rest: " Design Output" },
                { bold: "Stable", rest: " design support" },
                { bold: "Same-day", rest: " Replies" },
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
              <span className="text-[56px] font-heading font-normal text-[#202020] tracking-tight leading-none">$3,999</span>
              <span className="text-[#202020] ml-2 font-sans font-medium text-[20px]">/mo</span>
            </div>

            <a
              href="https://buy.stripe.com/6oU8wR8bE9WW3sOdxj6Na0k"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-black text-white h-[58px] rounded-[7px] font-medium text-[17px] mt-2 mb-3 hover:opacity-90 transition-opacity flex items-center justify-center"
            >
              Secure your next slot
            </a>
            <p className="text-center text-[16px] mb-8 font-sans">
              <span className="font-semibold text-black">9 bought</span> <span className="text-neutral-400 font-medium">in past year</span>
            </p>

            <ul className="space-y-4">
              {[
                { bold: "Unlimited", rest: " Design Output" },
                { bold: "Fast and complex", rest: " design support" },
                { bold: "Instant", rest: " Replies" },
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

import { Check } from 'lucide-react';

export default function Pricing() {
  return (
    <section id="pricing" className="py-16 bg-[#fafafa]">
      <div className="max-w-[960px] mx-auto px-6 lg:px-0 flex flex-col gap-8">
        <div className="text-center">
          <h2 className="font-heading font-normal text-[42px] md:text-[52px] text-[#202020] mb-2 tracking-tight leading-tight">Truly Unlimited Design Requests</h2>
          <p className="text-[18px] text-gray-500 max-w-2xl mx-auto font-sans">Accept truly unlimited design requests and efficiently deliver multiple tasks with speed.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {/* Standard Plan */}
          <div className="bg-white rounded-[8px] p-6 border border-[#E5E5E8] flex flex-col relative">
            <div className="flex justify-between items-start mb-0.5">
              <h3 className="text-[17px] font-sans font-medium text-black tracking-tight">Standard</h3>
              <div className="bg-[#F05537] text-white text-[12px] font-semibold px-2 py-[3px] rounded-full tracking-wide">
                Most popular
              </div>
            </div>

            <p className="text-gray-500 text-[14px] mb-4 font-sans">Ongoing design support</p>

            <div className="flex items-baseline mb-4">
              <span className="text-[56px] font-heading font-normal text-[#202020] tracking-tight leading-none">$2,799</span>
              <span className="text-[#202020] ml-2 font-sans font-medium text-[20px]">/mo</span>
            </div>

            <button className="w-full bg-black text-white h-[58px] rounded-[7px] font-medium text-[17px] mb-3 hover:opacity-90 transition-opacity">
              Secure your next slot
            </button>
            <p className="text-center text-[16px] mb-6 font-sans">
              <span className="font-semibold text-black">11 bought</span> <span className="text-gray-400 font-medium">in past year</span>
            </p>

            <ul className="space-y-4">
              {[
                { bold: "Unlimited", rest: " Design Output" },
                { bold: "Stable", rest: " design support" },
                { bold: "Same-day", rest: " Replies" },
                { bold: "3-Day", rest: " Free Trial" }
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-[14px] text-gray-900 font-sans">
                  <Check className="w-[18px] h-[18px] text-gray-200 mt-[1px] flex-shrink-0" strokeWidth={1.5} />
                  <span>
                    <span className="font-semibold text-black">{item.bold}</span>{item.rest}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Pro Plan */}
          <div className="bg-white rounded-[8px] p-6 border border-[#E5E5E8] flex flex-col relative">
            <div className="flex justify-between items-start mb-0.5">
              <h3 className="text-[17px] font-sans font-medium text-black tracking-tight">Pro</h3>
            </div>

            <p className="text-gray-500 text-[14px] mb-4 font-sans">Deep product partnership</p>

            <div className="flex items-baseline mb-4">
              <span className="text-[56px] font-heading font-normal text-[#202020] tracking-tight leading-none">$3,999</span>
              <span className="text-[#202020] ml-2 font-sans font-medium text-[20px]">/mo</span>
            </div>

            <button className="w-full bg-black text-white h-[58px] rounded-[7px] font-medium text-[17px] mb-3 hover:opacity-90 transition-opacity">
              Secure your next slot
            </button>
            <p className="text-center text-[16px] mb-6 font-sans">
              <span className="font-semibold text-black">9 bought</span> <span className="text-gray-400 font-medium">in past year</span>
            </p>

            <ul className="space-y-4">
              {[
                { bold: "Unlimited", rest: " Design Output" },
                { bold: "Fast and complex", rest: " design support" },
                { bold: "Instant", rest: " Replies" },
                { bold: "1-Day", rest: " Free Trial" }
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-[14px] text-gray-900 font-sans">
                  <Check className="w-[18px] h-[18px] text-gray-200 mt-[1px] flex-shrink-0" strokeWidth={1.5} />
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

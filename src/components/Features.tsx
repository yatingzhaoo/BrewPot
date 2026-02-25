import {
  Rocket,
  Sparkles,
  Target,
  Component,
  Minimize2,
  LayoutDashboard,
  Zap,
  TrendingUp
} from 'lucide-react';

const features = [
  {
    icon: Rocket,
    title: "Optimize Onboarding Flow",
    description: "Make starting feel easy."
  },
  {
    icon: Sparkles,
    title: "Enhance Look and Feel",
    description: "Make your UI more refined and harmonious."
  },
  {
    icon: Target,
    title: "Improve Retention Rates",
    description: "Turn one-timers into daily users."
  },
  {
    icon: Component,
    title: "Unify Visual Consistency",
    description: "Make everything look like it belongs together."
  },
  {
    icon: Minimize2,
    title: "Simplify Complex Features",
    description: "Keep power but make it feel simple."
  },
  {
    icon: LayoutDashboard,
    title: "Dashboards Design",
    description: "Turn data mess into clear insights fast."
  },
  {
    icon: Zap,
    title: "Deliver Core Value Fast",
    description: "Make the product's power obvious."
  },
  {
    icon: TrendingUp,
    title: "Boost Paid Conversion",
    description: "Get more free users to upgrade."
  }
];

export default function Features() {
  return (
    <section className="pt-8 pb-16 bg-white">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12">
        <div className="text-center mb-12">
          <h2 className="font-heading font-normal text-[42px] md:text-[52px] text-[#202020] mb-2 tracking-tight leading-tight">What's Included?</h2>
          <p className="text-[18px] text-gray-500 max-w-2xl mx-auto font-sans">We value all work that helps your product succeed.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-[28px] gap-y-[36px]">
          {features.map((feature, index) => (
            <div key={index} className="flex gap-4 group">
              <div className="flex-shrink-0">
                <div className="w-11 h-11 rounded-[5px] bg-white border border-[#E5E5E8] flex items-center justify-center shadow-[0_2px_8px_-2px_rgba(0,0,0,0.04)]">
                  <feature.icon className="w-5 h-5 text-[#202020]" strokeWidth={2} />
                </div>
              </div>
              <div className="pt-0.5">
                <h3 className="text-[17px] font-medium text-gray-900 mb-1 tracking-tight font-sans">{feature.title}</h3>
                <p className="text-gray-500 text-[15px] leading-snug font-sans">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

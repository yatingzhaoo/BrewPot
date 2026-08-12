import {
  AirplaneSquare,
  Discover,
  Eye,
  Global,
  HierarchySquare,
  MessageProgramming,
  MouseSquare,
  Profile2User,
  Routing,
  TrendUp,
} from 'iconsax-react';

const features = [
  {
    title: "Improve Onboarding & Activation",
    description: "Simplifying the first experience so more users reach value and adopt the product.",
    Icon: AirplaneSquare,
  },
  {
    title: "Design Roles & Permissions",
    description: "Structuring access, permissions, and interfaces for users with different responsibilities.",
    Icon: Profile2User,
  },
  {
    title: "Simplify Complex B2B Workflows",
    description: "Turning multistep business logic into clear and efficient product flows.",
    Icon: HierarchySquare,
  },
  {
    title: "Adapt Products for North American Users",
    description: "Aligning interaction patterns, language, and product expectations with the local market.",
    Icon: Global,
  },
  {
    title: "Uncover User Needs & Friction",
    description: "Researching behavior and feedback to reveal unmet needs and product opportunities.",
    Icon: Eye,
  },
  {
    title: "Design AI Agent Workflows",
    description: "Creating intuitive ways for users to configure, guide, and collaborate with AI agents.",
    Icon: MessageProgramming,
  },
  {
    title: "Improve Conversion Flows",
    description: "Reducing friction across discovery, trial, and upgrade paths so more users become customers.",
    Icon: TrendUp,
  },
  {
    title: "Optimize Landing Pages",
    description: "Clarifying page hierarchy, messaging, and calls to action so visitors understand and act.",
    Icon: MouseSquare,
  },
  {
    title: "Restructure Navigation & Content",
    description: "Organizing navigation, page hierarchy, and content so users can find what they need.",
    Icon: Discover,
  }
];

export default function Features() {
  return (
    <section data-analytics-section="services" className="py-24 pb-32 bg-transparent">
      <div className="max-w-[1180px] mx-auto px-6 sm:px-8 lg:px-12">
        <div className="text-center mb-12">
          <h2 className="font-heading font-medium text-[42px] md:text-[52px] text-[#202020] mb-2 tracking-tight leading-tight">What's Included?</h2>
          <p className="text-[18px] text-neutral-500 max-w-2xl mx-auto font-sans">Anything that prevents your product from reaching its full potential.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-[28px] lg:gap-x-[64px] gap-y-[36px]">
          {features.map((feature, index) => (
            <div key={index} className="flex flex-col gap-3 group">
              <div className="flex gap-3 items-center">
                <div className="w-11 h-11 rounded-[6px] bg-white border border-[#E5E5E8] flex items-center justify-center flex-shrink-0 shadow-[0_8px_24px_rgba(32,32,32,0.04)]">
                  <feature.Icon size={22} color="#202020" variant="Outline" />
                </div>
                <h3 className="text-[20px] font-semibold text-neutral-900 tracking-tight font-sans">{feature.title}</h3>
              </div>
              <p className="text-neutral-500 text-[16px] leading-snug font-sans pl-14">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

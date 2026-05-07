const features = [
  {
    title: "Onboarding Optimization",
    description: "Streamlining the first-experience to drive higher user adoption."
  },
  {
    title: "Multi-User Role UI",
    description: "Architecting complex permission interfaces for enterprise systems."
  },
  {
    title: "B2B Workflow Design",
    description: "Taming complex B2B logic into high-efficiency product workflows."
  },
  {
    title: "App Localization",
    description: "Adhering to North American behavioral patterns for local impact."
  },
  {
    title: "Find User Insights",
    description: "Deep-diving into user behavior to find true product-market fit."
  },
  {
    title: "Agentic UX Design",
    description: "The future of UI—creating interfaces that anticipate user needs."
  }
];

export default function Features() {
  return (
    <section className="py-24 pb-32 bg-transparent">
      <div className="max-w-[1100px] mx-auto px-6 sm:px-8 lg:px-12">
        <div className="text-center mb-12">
          <h2 className="font-heading font-medium text-[42px] md:text-[52px] text-[#202020] mb-2 tracking-tight leading-tight">What's Included?</h2>
          <p className="text-[18px] text-neutral-500 max-w-2xl mx-auto font-sans">Anything that prevents your product from reaching its full potential.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-[28px] gap-y-[36px]">
          {features.map((feature, index) => (
            <div key={index} className="flex flex-col gap-2 group">
              <div className="flex gap-2 items-center">
                <div className="w-2 h-2 bg-black flex-shrink-0" />
                <h3 className="text-[20px] font-semibold text-neutral-900 tracking-tight font-sans">{feature.title}</h3>
              </div>
              <p className="text-neutral-500 text-[16px] leading-snug font-sans">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

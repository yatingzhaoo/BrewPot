export default function Booking() {
  return (
    <section id="contact" className="py-24 bg-neutral-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="font-heading font-normal text-[42px] md:text-[52px] text-[#202020] mb-2 tracking-tight leading-tight">Talk Today, Start Tomorrow</h2>
        <p className="text-[19px] text-neutral-500 mb-8">Not sure if it's a good fit, that's okay. We can talk about anything.</p>

        <div className="flex justify-center">
          <a
            href="https://cal.com/yating-zhao/15min"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-black text-white px-10 h-[58px] flex items-center justify-center rounded-[7px] font-medium text-[17px] hover:opacity-90 transition-opacity"
          >
            Book a 15-min call
          </a>
        </div>
      </div>
    </section>
  );
}

export default function Booking() {
  return (
    <section id="contact" className="py-24 bg-transparent">
      <div className="max-w-[1100px] mx-auto px-6 sm:px-8 lg:px-12 text-center">
        <h2 className="font-heading font-medium text-[42px] md:text-[52px] text-[#202020] mb-2 tracking-tight leading-tight">Talk Today, Start Tomorrow</h2>
        <p className="text-[19px] text-neutral-500 mb-8">Not sure if it's a good fit, that's okay. We can talk about anything.</p>

        <a
          href="https://cal.com/yating-zhao/15min"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-black text-white px-8 h-[58px] rounded-[7px] font-medium text-[17px] hover:opacity-90 transition-opacity flex items-center justify-center inline-flex"
        >
          Book a 15-min call
        </a>
      </div>
    </section>
  );
}

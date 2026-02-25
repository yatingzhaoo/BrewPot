import logo from '../asset/公司Logo.svg';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-12">
          {/* Left Side: Brand & Socials */}
          <div className="flex flex-col space-y-12">
            <div className="flex items-center gap-2">
              <img src={logo} alt="BrewPot Logo" className="w-[21px] h-[27px]" />
              <span className="font-logo font-medium text-[24px] tracking-[-1.4px] leading-[1.2] text-black">BrewPot</span>
            </div>

            <div className="flex gap-6">
              <a href="#" className="hover:opacity-60 transition-opacity">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="black" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932 6.064-6.932zm-1.294 19.497h2.039L6.482 3.239H4.293l13.314 17.411z" />
                </svg>
              </a>
              <a href="#" className="hover:opacity-60 transition-opacity">
                <svg width="23" height="23" viewBox="0 0 24 24" fill="black" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Right Side: Copyright */}
          <p className="text-[17px] font-medium text-black font-sans pb-1">
            © 2025 BrewPot LLC | All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

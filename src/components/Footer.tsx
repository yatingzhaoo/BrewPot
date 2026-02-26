
export default function Footer() {
  return (
    <footer className="bg-white border-t border-neutral-100 py-12">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-12">
          {/* Left Side: Socials */}
          <div className="flex flex-col">

            <div className="flex gap-5">
              <a href="https://x.com/yatingzhao_ux" target="_blank" rel="noopener noreferrer" className="hover:opacity-60 transition-opacity">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="black" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932 6.064-6.932zm-1.294 19.497h2.039L6.482 3.239H4.293l13.314 17.411z" />
                </svg>
              </a>
              <a href="https://www.linkedin.com/company/brewpot" target="_blank" rel="noopener noreferrer" className="hover:opacity-60 transition-opacity">
                <svg width="19" height="19" viewBox="0 0 24 24" fill="black" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0zM7.12 19H3.558V9h3.562v10zM5.339 7.433c-1.146 0-2.066-.926-2.066-2.065 0-1.139.92-2.063 2.066-2.063 1.141 0 2.064.924 2.064 2.063 0 1.139-.923 2.065-2.064 2.065zm15.108 11.567h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Right Side: Copyright */}
          <p className="text-[17px] font-medium text-neutral-500 font-sans pb-1">
            © 2025 BrewPot LLC | All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

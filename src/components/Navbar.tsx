import { ArrowRight, Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import logo from '../asset/公司Logo.svg';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/70 backdrop-blur-md' : 'bg-transparent'
      }`}>
      <div className="max-w-7xl mx-auto px-6 md:px-[40px]">
        <div className="flex justify-between items-center h-[64px]">
          <div className="flex items-center gap-2">
            <img src={logo} alt="BrewPot Logo" className="w-[21px] h-[27px]" />
            <span className="font-logo font-medium text-[24px] tracking-[-1.4px] leading-[1.2] text-black">BrewPot</span>
          </div>

          <div className="hidden md:flex items-center space-x-10">
            <a href="#pricing" className="text-[15px] font-medium text-black hover:opacity-70 transition-opacity font-sans">Pricing</a>
            <a href="#contact" className="bg-black text-white px-5 h-[46px] flex items-center justify-center rounded-[7px] text-[16px] font-medium hover:opacity-90 transition-opacity font-sans gap-2">
              Let's talk <ArrowRight className="w-4 h-4" strokeWidth={2.5} />
            </a>
          </div>

          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="p-2 text-gray-900">
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white border-b border-gray-100 p-6 absolute top-full left-0 right-0 shadow-lg">
          <div className="flex flex-col space-y-5">
            <a href="#pricing" className="text-base font-medium text-gray-600" onClick={() => setIsOpen(false)}>Pricing</a>
            <a href="#contact" className="text-base font-medium text-black flex items-center gap-2" onClick={() => setIsOpen(false)}>
              Let's talk <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}

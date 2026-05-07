import logo1 from '../asset/客户logo/Cooragent.webp';
import logo2 from '../asset/客户logo/imgi_10_1lS9erwBAh18LCQTIq0Btluq5iI.png';
import logo3 from '../asset/客户logo/imgi_11_Dm2KjflLO1QDNohPYtWXgUnzeQ.png';
import logo4 from '../asset/客户logo/imgi_12_vv67UFHe2kVOc1oLqMvjQfJ08I.png';
import logo5 from '../asset/客户logo/imgi_13_Nn8dpshxMgsuQ7It6iWPlfrtQo.png';
import logo6 from '../asset/客户logo/imgi_6_o4UWPHLGPNwYlcELZ4oZzdXn9I.png';
import logo7 from '../asset/客户logo/imgi_7_MlMNTVlGyQd08dXZRRurmqPjo.png';
import logo8 from '../asset/客户logo/imgi_8_7bCZJUraCFC0DQkcEEHToiQTFk.png';
import logo9 from '../asset/客户logo/imgi_9_W6yiYTdcW0BT9FE0qobXvGVTCY.png';
import logo10 from '../asset/客户logo/Totalis-logo.svg';

import { motion } from 'motion/react';

export default function Logos() {
  const logos = [logo1, logo10, logo6, logo3, logo5, logo4, logo7, logo8, logo9, logo2];

  return (
    <section className="pt-12 pb-16 bg-transparent overflow-hidden">
      <div className="w-full relative px-6 md:px-12 lg:px-24">
        <p className="text-center font-heading font-medium text-[26px] md:text-[32px] text-[#202020] tracking-tight leading-tight mb-11">
          Trusted by over 20 teams in the past two years:
        </p>

        <div className="relative flex w-full">
          <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-10 md:gap-x-16 max-w-4xl mx-auto grayscale opacity-100 contrast-[1.2] hover:opacity-80 transition-opacity duration-700">
            {logos.map((logo, index) => {
              const isCooragent = (index % logos.length) === 0; // logo1
              const isAlphaPilot = (index % logos.length) === 5; // logo4
              const isHiTA = (index % logos.length) === 4; // logo5
              const isNotta = (index % logos.length) === 2; // logo6
              const isTotalis = (index % logos.length) === 1; // logo10
              
              let heightClass = 'h-[26.4px]';
              if (isCooragent) heightClass = 'h-[39.6px]';
              if (isHiTA) heightClass = 'h-[31.2px]';
              if (isNotta) heightClass = 'h-[21.6px]';
              if (isAlphaPilot) heightClass = 'h-[54px]';
              if (isTotalis) heightClass = 'h-[39.6px]';

              return (
                <div key={index} className={`${heightClass} w-max flex items-center justify-center flex-shrink-0`}>
                  <img src={logo} alt="Partner Logo" className="h-full w-auto object-contain" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>

  );
}

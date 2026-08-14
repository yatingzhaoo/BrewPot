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
import logoDeviceConnection from '../asset/device-connection-logo.svg';

import { motion } from 'motion/react';

export default function Logos() {
  const logos = [logo1, logo10, logoDeviceConnection, logo6, logo3, logo5, logo4, logo7, logo8, logo9, logo2];

  return (
    <section data-analytics-section="client_logos" className="overflow-hidden bg-transparent pb-16 pt-16 md:pt-20">
      <div className="w-full relative px-6 md:px-12 lg:px-24">
        <p className="text-center font-heading font-medium text-[26px] md:text-[32px] text-[#202020] tracking-tight leading-tight mb-11">
          Trusted by over 20 product teams:
        </p>

        <div className="relative flex w-full">
          <div className="flex max-w-[936px] flex-wrap items-center justify-center gap-x-6 gap-y-10 mx-auto">
            {logos.map((logo, index) => {
              const isCooragent = (index % logos.length) === 0; // logo1
              const isAlphaPilot = (index % logos.length) === 6; // logo4
              const isHiTA = (index % logos.length) === 5; // logo5
              const isNotta = (index % logos.length) === 3; // logo6
              const isTotalis = (index % logos.length) === 1; // logo10
              const isDeviceConnection = (index % logos.length) === 2; // logoDeviceConnection
              const isTeXPage = index === 7;
              const preservesTonalDetail = isHiTA;
              
              let heightClass = 'h-[26px]';
              if (isCooragent) heightClass = 'h-[40px]';
              if (isHiTA) heightClass = 'h-[31px]';
              if (isNotta) heightClass = 'h-[22px]';
              if (isAlphaPilot) heightClass = 'h-[54px]';
              if (isTotalis) heightClass = 'h-[40px]';
              if (isDeviceConnection) heightClass = 'h-[30px]';
              if (isTeXPage) heightClass = 'h-[30px]';

              return (
                <div key={index} className={`${heightClass} w-[136px] flex items-center justify-center flex-shrink-0`}>
                  {isTeXPage ? (
                    <span
                      role="img"
                      aria-label="TeX Page"
                      className="inline-flex items-center whitespace-nowrap font-sans text-[24px] font-black italic leading-none tracking-[-0.06em]"
                    >
                      <span className="rounded-[2px] border border-black/30 bg-[#d8d8d8] px-[6px] py-[3px] text-black shadow-[inset_0_0_0_1px_rgba(255,255,255,0.35)]">
                        TeX
                      </span>
                      <span className="ml-[3px] text-[#4a4a4a]">Page</span>
                    </span>
                  ) : (
                    <img
                      src={logo}
                      alt="Partner Logo"
                      className={`h-full max-w-full w-auto object-contain grayscale ${preservesTonalDetail ? 'contrast-[1.55]' : 'brightness-0'}`}
                      decoding="async"
                      draggable={false}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>

  );
}

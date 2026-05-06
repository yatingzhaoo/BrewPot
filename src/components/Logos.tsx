import logo1 from '../asset/客户logo/Cooragent.webp';
import logo2 from '../asset/客户logo/imgi_10_1lS9erwBAh18LCQTIq0Btluq5iI.png';
import logo3 from '../asset/客户logo/imgi_11_Dm2KjflLO1QDNohPYtWXgUnzeQ.png';
import logo4 from '../asset/客户logo/imgi_12_vv67UFHe2kVOc1oLqMvjQfJ08I.png';
import logo5 from '../asset/客户logo/imgi_13_Nn8dpshxMgsuQ7It6iWPlfrtQo.png';
import logo6 from '../asset/客户logo/imgi_6_o4UWPHLGPNwYlcELZ4oZzdXn9I.png';
import logo7 from '../asset/客户logo/imgi_7_MlMNTVlGyQd08dXZRRurmqPjo.png';
import logo8 from '../asset/客户logo/imgi_8_7bCZJUraCFC0DQkcEEHToiQTFk.png';
import logo9 from '../asset/客户logo/imgi_9_W6yiYTdcW0BT9FE0qobXvGVTCY.png';

import { motion } from 'motion/react';

export default function Logos() {
  const logos = [logo1, logo2, logo3, logo4, logo5, logo6, logo7, logo8, logo9];

  return (
    <section className="pt-0 pb-16 bg-transparent overflow-hidden">
      <div className="w-full relative px-6 md:px-12 lg:px-24">
        <p className="text-center text-[18px] text-neutral-500 font-sans mb-8">
          Trusted by 19 teams
        </p>

        <div className="relative flex w-full overflow-hidden mask-image-linear-gradients">

          <motion.div
            className="flex flex-nowrap items-center gap-x-12 md:gap-x-16 pr-12 md:pr-16 grayscale opacity-100 contrast-[1.2] hover:opacity-80 transition-opacity duration-700 w-max"
            animate={{ x: ["0%", "-33.33%"] }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 35,
                ease: "linear",
              },
            }}
          >
            {[...logos, ...logos, ...logos].map((logo, index) => {
              const isCooragent = (index % logos.length) === 0; // logo1
              const isAlphaPilot = (index % logos.length) === 3; // logo4
              const isHiTA = (index % logos.length) === 4; // logo5
              const isNotta = (index % logos.length) === 5; // logo6
              
              let heightClass = 'h-[22px]';
              if (isCooragent) heightClass = 'h-[33px]';
              if (isHiTA) heightClass = 'h-[26px]';
              if (isNotta) heightClass = 'h-[18px]';
              if (isAlphaPilot) heightClass = 'h-[45px]';

              return (
                <div key={index} className={`${heightClass} w-max flex items-center justify-center flex-shrink-0`}>
                  <img src={logo} alt="Partner Logo" className="h-full w-auto object-contain" />
                </div>
              );
            })}
          </motion.div>

        </div>
      </div>
    </section>

  );
}


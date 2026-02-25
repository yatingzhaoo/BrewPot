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
    <section className="py-32 bg-white overflow-hidden">
      <div className="max-w-[1400px] mx-auto text-center relative">
        <p className="text-[18px] leading-[36px] font-medium text-black mb-8 tracking-normal font-sans">19 teams have chosen BrewPot:</p>

        <div className="relative flex w-full overflow-hidden mask-image-linear-gradients">
          {/* Add a fade mask to the left and right edges for a refined look */}
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
          <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>

          <motion.div
            className="flex flex-nowrap items-center gap-x-12 md:gap-x-16 pr-12 md:pr-16 opacity-60 grayscale hover:opacity-100 hover:grayscale-0 transition-opacity transition-filter duration-700 w-max"
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
            {[...logos, ...logos, ...logos].map((logo, index) => (
              <div key={index} className="h-8 w-max flex items-center justify-center flex-shrink-0">
                <img src={logo} alt="Partner Logo" className="h-full w-auto object-contain" />
              </div>
            ))}
          </motion.div>

        </div>
      </div>
    </section>

  );
}


import { motion, AnimatePresence, useAnimationControls } from 'motion/react';
import React, { useState, useRef } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import work1 from '../asset/work-1.png';
import frame110 from '../asset/Frame 483110.png';
import frame112 from '../asset/Frame 483112.png';
import frame116 from '../asset/Frame 483116.png';
import vectroQuote from '../asset/Frame 483111.png';

const SHOWCASE_IMAGES = [
  { src: frame116, alt: 'Work Showcase 1' },
  { src: frame112, alt: 'Work Showcase 2' },
  { src: work1, alt: 'Work Showcase 3' },
  { src: frame110, alt: 'Work Showcase 4' },
  { src: vectroQuote, alt: 'Work Showcase 5' },
];

export default function Hero() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [isHovering, setIsHovering] = useState(false);
  const controls = useAnimationControls();

  const handleGalleryHover = () => {
    setIsHovering(true);
    controls.stop();
  };

  const handleGalleryLeave = async () => {
    setIsHovering(false);
    await controls.start({
      x: ["0%", "-50%"],
      transition: {
        x: {
          repeat: Infinity,
          repeatType: "loop",
          duration: 40,
          ease: "linear",
        },
      },
    });
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex + 1) % SHOWCASE_IMAGES.length);
    }
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex - 1 + SHOWCASE_IMAGES.length) % SHOWCASE_IMAGES.length);
    }
  };

  return (
    <section
      className="relative min-h-screen flex flex-col overflow-hidden"
      style={{
        background: '#faf9f8',
      }}
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: 'radial-gradient(circle at 50% 42%, rgba(255, 149, 0, 0.15) 0%, rgba(255, 149, 0, 0) 35%)',
          animation: 'glow-float 10s ease-in-out infinite',
          pointerEvents: 'none',
        }}
      />
      <div className="flex-1 flex flex-col items-center justify-center pt-32 pb-24 px-4 sm:px-6 text-center max-w-[1100px] mx-auto w-full relative gap-[16px]">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-white border border-[#E5E5E8] text-[15px] leading-[21px] text-black font-sans font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E] animate-pulse" />
            Next available slot: 2026/5/11
          </div>
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-heading font-medium text-[#202020] leading-[1.2] max-w-4xl mx-auto tracking-normal"
          style={{ fontSize: 'clamp(72px, 10vw, 112px)' }}
        >
          Product. Design.<br />Strategy
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-[20px] text-black font-sans font-medium max-w-[720px] mx-auto leading-[32px] tracking-normal"
        >
          Get ongoing product design support for a fixed price. No hiring, no waiting.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-4"
        >
          <a
            href="https://cal.com/yating-zhao/15min"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-black text-white px-8 h-[58px] rounded-[7px] font-medium text-[17px] hover:opacity-90 transition-opacity flex items-center justify-center inline-flex"
          >
            Book a 15-min call
          </a>
        </motion.div>
      </div>

      <div className="relative w-full max-w-[1100px] mx-auto px-6 mb-12 group/gallery" onMouseEnter={handleGalleryHover} onMouseLeave={handleGalleryLeave}>
        <div
          className="relative overflow-visible px-4"
          style={{
            maskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)',
            WebkitMaskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)',
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="pb-10 pt-4 overflow-hidden relative z-0"
          >
            <motion.div
              className="flex gap-[10px] w-max pr-[10px]"
              animate={controls}
              initial={{ x: "0%" }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 40,
                  ease: "linear",
                },
              }}
            >
              {[...SHOWCASE_IMAGES, ...SHOWCASE_IMAGES].map(({ src, alt }, index) => {
                const actualIndex = index % SHOWCASE_IMAGES.length;
                return (
                  <div
                    key={index}
                    className="flex-shrink-0 w-[270px] md:w-[360px] h-[210px] md:h-[281.5px] rounded-[10px] overflow-hidden bg-white border border-neutral-100 cursor-pointer group transition-transform duration-300"
                    onClick={() => setSelectedIndex(actualIndex)}
                  >
                    <img
                      src={src}
                      alt={alt}
                      className="w-full h-full object-cover object-top transition-transform duration-1000 ease-out"
                    />
                  </div>
                );
              })}
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Fullscreen Image Overlay */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md p-4 sm:p-12 cursor-zoom-out"
            onClick={() => setSelectedIndex(null)}
          >
            {/* Close Button */}
            <button
              className="absolute top-6 right-6 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-all hover:scale-110 z-50"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedIndex(null);
              }}
            >
              <X className="w-6 h-6" />
            </button>

            {/* Left/Right Navigation */}
            <button
              className="absolute left-6 top-1/2 -translate-y-1/2 p-4 bg-white/10 hover:bg-white/20 rounded-full text-white transition-all hover:scale-110 z-50"
              onClick={handlePrev}
            >
              <ChevronLeft className="w-8 h-8" strokeWidth={2.5} />
            </button>

            <button
              className="absolute right-6 top-1/2 -translate-y-1/2 p-4 bg-white/10 hover:bg-white/20 rounded-full text-white transition-all hover:scale-110 z-50"
              onClick={handleNext}
            >
              <ChevronRight className="w-8 h-8" strokeWidth={2.5} />
            </button>

            {/* Selected Image */}
            <AnimatePresence mode="wait">
              <motion.img
                key={selectedIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                src={SHOWCASE_IMAGES[selectedIndex].src}
                alt={SHOWCASE_IMAGES[selectedIndex].alt}
                className="max-w-full max-h-full object-contain rounded-[10px] shadow-2xl cursor-default"
                onClick={(e) => e.stopPropagation()}
              />
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

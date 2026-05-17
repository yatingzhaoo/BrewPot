import React, { useState } from 'react';
import { X } from 'lucide-react';
import brewpotLogo from '../asset/公司Logo.svg';
import cooragentLogo from '../asset/客户logo/Cooragent.webp';
import totalisLogo from '../asset/客户logo/Totalis-logo.svg';
import logoNotta from '../asset/客户logo/imgi_6_o4UWPHLGPNwYlcELZ4oZzdXn9I.png';
import logoHita from '../asset/客户logo/imgi_13_Nn8dpshxMgsuQ7It6iWPlfrtQo.png';
import logoAlphaPilot from '../asset/客户logo/imgi_12_vv67UFHe2kVOc1oLqMvjQfJ08I.png';
import imgVectrroNew from '../asset/personal-projects/vectrro-new-cover.png';
import imgVectrroCandidate1 from '../asset/personal-projects/Vectrro/New.png';
import imgVectrroCandidate2 from '../asset/personal-projects/Vectrro/New-1.png';
import imgNottaNew from '../asset/personal-projects/notta-new-cover.png';
import imgHiTA from '../asset/personal-projects/HiTA/Frame 1437254438 3.png';
import imgHiTA2 from '../asset/personal-projects/hita-new.png';
import imgHiTA3 from '../asset/personal-projects/HiTA/Chat Details.png';
import imgCooragent from '../asset/personal-projects/Cooragent/Landing Page.png';
import imgCooragent2 from '../asset/personal-projects/Cooragent/Agent Market.png';
import imgCooragent3 from '../asset/personal-projects/Cooragent/Messages.png';
import logoVectrro from '../asset/personal-projects/logo-cooragent.png';
import logoProjectNotta from '../asset/personal-projects/logo-notta.png';
import logoProjectHiTA from '../asset/personal-projects/logo-hita.png';
import logoProjectCooragent from '../asset/personal-projects/logo-vectrro.png';

interface ProjectConfig {
  title: string;
  subtitle: string;
  fundingStage?: string;
  images: string[];
  logo?: string;
  noBorderIndices?: number[];
  containerBg?: string;
}

const projectConfigs: ProjectConfig[] = [
  {
    title: 'Vectrro',
    subtitle: 'Trucking operation.',
    fundingStage: 'Pre-seed',
    images: [imgVectrroNew, imgVectrroCandidate1, imgVectrroCandidate2],
    noBorderIndices: [0],
    logo: logoVectrro,
  },
  {
    title: 'Notta',
    subtitle: 'Meeting Notetaker.',
    fundingStage: 'Series B',
    images: [imgNottaNew],
    logo: logoProjectNotta,
  },
  {
    title: 'HiTA',
    subtitle: 'Higher Education AI',
    fundingStage: 'Seed',
    images: [imgHiTA, imgHiTA2, imgHiTA3],
    logo: logoProjectHiTA,
  },
  {
    title: 'Cooragent',
    subtitle: 'AI Agents',
    fundingStage: 'Seed',
    images: [imgCooragent, imgCooragent2, imgCooragent3],
    logo: logoProjectCooragent,
  },
];

const clientLogos = [
  { src: cooragentLogo, label: 'Cooragent', className: 'h-[34px]' },
  { src: totalisLogo, label: 'Totalis', className: 'h-[34px]' },
  { src: logoNotta, label: 'Notta', className: 'h-[20px]' },
  { src: logoHita, label: 'HiTA', className: 'h-[28px]' },
  { src: logoAlphaPilot, label: 'AlphaPilot', className: 'h-[44px]' },
];

function ChatButton() {
  return (
    <button
      onClick={() => window.open('https://cal.com/yating-zhao/15min', '_blank')}
      className="bg-[#1d1d1d] flex items-center justify-center px-[20px] py-[12px] rounded-full hover:bg-[#2d2d2d] transition-colors cursor-pointer border-none my-[12px] w-full shadow-sm"
    >
      <p className="font-['Geist',sans-serif] font-normal leading-none text-[15px] text-white m-0 py-[2px]">
        Let's Chat
      </p>
    </button>
  );
}

function Hero() {
  return (
    <section className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full">
      <div className="relative shrink-0 h-[35px] w-[128px] overflow-hidden">
        <img src={brewpotLogo} alt="BrewPot" className="h-full w-full object-contain" />
      </div>
      <div className="content-stretch flex flex-col gap-[8px] items-start not-italic relative shrink-0 text-[16px] w-full">
        <div className="flex flex-col font-['Geist',sans-serif] font-medium justify-center relative shrink-0 text-black w-full">
          <p className="leading-[28px]">
            BrewPot is a small product design studio for teams that need polished digital products without building a full in-house design team.
          </p>
        </div>
        <div className="flex flex-col font-['Geist',sans-serif] font-normal justify-center text-[16px] leading-[28px] relative shrink-0 text-black w-full">
          <p className="mb-[12px]">
            The work sits between product direction, interface design, and launch polish. BrewPot helps early-stage teams turn rough ideas, unfinished product surfaces, and important launch pages into clear, refined experiences that feel ready for the market.
          </p>
          <p>
            Engagements are small, direct, and focused. Priorities stay close to the product, communication stays lightweight, and the work moves quickly from direction to visible progress.
          </p>
        </div>

        <ChatButton />

        <div className="flex flex-col font-['Geist',sans-serif] font-normal justify-center text-[16px] leading-[28px] relative shrink-0 text-black w-full">
          <p>
            Next available engagement starts 2026/5/21.
          </p>
        </div>
      </div>
    </section>
  );
}

function ProjectCard({
  config,
  index,
  onImageClick,
}: {
  config: ProjectConfig;
  index: number;
  onImageClick: (url: string) => void;
}) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const hasMultipleImages = config.images.length > 1;

  const nextImage = (event: React.MouseEvent) => {
    event.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % config.images.length);
  };

  const prevImage = (event: React.MouseEvent) => {
    event.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + config.images.length) % config.images.length);
  };

  return (
    <div
      className="group content-stretch flex flex-col gap-[8px] items-start justify-center min-h-px min-w-px relative w-full cursor-pointer"
      onClick={() => onImageClick(config.images[currentImageIndex])}
    >
      <div
        className="relative flex items-center justify-center shrink-0 w-full rounded-[16px] overflow-hidden group/carousel aspect-[1.25]"
        style={{ backgroundColor: config.containerBg || '#F4F4F5' }}
      >
        <div className={`relative flex items-center justify-center ${index === 1 ? 'w-[68%] h-[68%]' : 'w-[85%] h-[85%]'}`}>
          <img
            alt={config.title}
            className={`max-w-full max-h-full object-contain pointer-events-none ${config.noBorderIndices?.includes(currentImageIndex) ? 'rounded-none' : 'shadow-[0_0_24px_rgba(0,0,0,0.08)] rounded-[8px] border border-black/[0.015]'}`}
            src={config.images[currentImageIndex]}
            loading="lazy"
          />
        </div>

        {hasMultipleImages && (
          <>
            <div className="absolute top-[16px] right-[18px] flex items-center gap-[6px] z-30 opacity-0 group-hover/carousel:opacity-100 transition-opacity">
              {config.images.map((_, i) => (
                <div
                  key={i}
                  className={`w-[5px] h-[5px] rounded-full transition-colors ${i === currentImageIndex ? 'bg-black/60' : 'bg-black/15'}`}
                />
              ))}
            </div>
            <button
              onClick={prevImage}
              aria-label={`Previous ${config.title} image`}
              className="absolute left-[12px] top-1/2 -translate-y-1/2 w-[40px] h-[40px] rounded-full bg-white shadow-[0_0_2px_rgba(0,0,0,0.05)] flex items-center justify-center text-black opacity-0 group-hover/carousel:opacity-100 transition-opacity z-30 hover:bg-gray-50 border border-black/5"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="19" y1="12" x2="5" y2="12" />
                <polyline points="12 19 5 12 12 5" />
              </svg>
            </button>
            <button
              onClick={nextImage}
              aria-label={`Next ${config.title} image`}
              className="absolute right-[12px] top-1/2 -translate-y-1/2 w-[40px] h-[40px] rounded-full bg-white shadow-[0_0_2px_rgba(0,0,0,0.05)] flex items-center justify-center text-black opacity-0 group-hover/carousel:opacity-100 transition-opacity z-30 hover:bg-gray-50 border border-black/5"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </button>
          </>
        )}
      </div>
      <div className="flex items-center justify-start gap-[10px] w-full mt-[4px]">
        {config.logo && (
          <img src={config.logo} alt="" className="w-[36px] h-[36px] bg-white rounded-[8px] border border-black/[0.05] object-contain shrink-0 p-[5px]" />
        )}
        <div className="flex flex-col justify-center gap-[1px] min-w-0">
          <div className="flex items-center gap-[6px]">
            <p className="font-['Geist',sans-serif] font-semibold text-[14px] leading-[18px] text-[#111] shrink-0 m-0 tracking-tight">{config.title}</p>
            {config.fundingStage && (
              <div className="px-[5px] py-[4px] rounded-[4px] bg-black/[0.05] flex items-center justify-center shrink-0">
                <span className="font-['Geist',sans-serif] text-[11px] font-medium text-[#666] leading-none">{config.fundingStage}</span>
              </div>
            )}
          </div>
          <p className="font-['Geist',sans-serif] font-normal text-[#666] text-[13px] leading-[18px] m-0">
            {config.subtitle}
          </p>
        </div>
      </div>
    </div>
  );
}

function RecentProjects({ onImageClick }: { onImageClick: (url: string) => void }) {
  return (
    <section className="flex flex-col gap-[16px] w-full">
      <h2 className="font-['Geist',sans-serif] font-semibold text-[17px] text-black">
        Recent Projects
      </h2>
      <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-[20px] gap-y-[32px] items-start relative w-full">
          {projectConfigs.map((config, idx) => (
            <div key={config.title}>
              <ProjectCard
                config={config}
                index={idx}
                onImageClick={onImageClick}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SelectedClients() {
  return (
    <section className="flex flex-col gap-[16px] w-full mt-[32px]">
      <h2 className="font-['Geist',sans-serif] font-semibold text-[17px] text-black">
        Selected Clients
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-[28px] gap-y-[20px] items-center w-full py-[2px] grayscale">
        {clientLogos.map((logo) => (
          <div key={logo.label} className="h-[48px] flex items-center justify-start">
            <img src={logo.src} alt={logo.label} className={`${logo.className} max-w-[126px] w-auto object-contain opacity-70`} />
          </div>
        ))}
      </div>
    </section>
  );
}

function Plans() {
  return (
    <section className="flex flex-col gap-[16px] w-full mt-[32px]">
      <h2 className="font-['Geist',sans-serif] font-semibold text-[17px] text-black">
        Plans
      </h2>
      <div className="flex flex-col gap-[12px] font-['Geist',sans-serif] text-[16px] leading-[28px] text-black">
        <p>
          <span className="font-medium">Standard:</span> Focused product design support for one active priority at a time. $2,799/month.
        </p>
        <p>
          <span className="font-medium">Pro:</span> More design capacity for teams moving through larger launches or faster product cycles. $4,999/month.
        </p>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="w-full pt-[100px] pb-[8px]">
      <div className="flex flex-row items-center justify-between gap-[24px] font-['Geist',sans-serif] text-black text-[15px] font-normal opacity-50">
        <img src={brewpotLogo} alt="BrewPot" className="h-[24px] w-auto object-contain" />
        <span className="text-right">© 2026 BrewPot LLC | All rights reserved.</span>
      </div>
    </footer>
  );
}

export default function BlogStylePage() {
  const [lightbox, setLightbox] = useState<string | null>(null);

  return (
    <div className="bg-white content-stretch flex flex-col items-center px-[16px] md:px-[40px] pt-[40px] md:pt-[80px] pb-[24px] md:pb-[32px] relative w-full min-h-screen overflow-x-hidden selection:bg-neutral-200 selection:text-black">
      <div className="content-stretch flex flex-col items-center max-w-[640px] relative shrink-0 w-full">
        <div className="content-stretch flex flex-col gap-[44px] items-start relative shrink-0 w-full">
          <Hero />
          <RecentProjects onImageClick={(url) => setLightbox(url)} />
          <SelectedClients />
          <Plans />
          <Footer />
        </div>
      </div>

      {lightbox && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-xl p-4 md:p-12 cursor-zoom-out"
          onClick={() => setLightbox(null)}
        >
          <div className="relative w-full h-full flex items-center justify-center pointer-events-none">
            <div className="pointer-events-auto relative max-w-[95%] max-h-[90%] flex items-center justify-center">
              <img
                src={lightbox}
                alt="Project detail"
                className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-[0_0_60px_rgba(0,0,0,0.15)]"
              />
            </div>
          </div>
          <button
            aria-label="Close image preview"
            className="fixed top-8 right-8 flex items-center justify-center w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md text-white/70 hover:text-white transition-all cursor-pointer z-[110]"
            onClick={(event) => {
              event.stopPropagation();
              setLightbox(null);
            }}
          >
            <X className="h-6 w-6" />
          </button>
        </div>
      )}
    </div>
  );
}

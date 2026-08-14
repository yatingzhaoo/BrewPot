import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowUpRight, X } from 'lucide-react';
import { track } from '../analytics';
import Booking from './Booking';
import {
  CASE_STUDIES,
  type CaseStudy,
  projectProperties,
} from './CaseStudies';
import {
  CASE_STUDY_DETAILS,
  type CaseStudyComparison,
} from './CaseStudyDetails';

function ComparisonFrame({
  comparison,
  expanded = false,
}: {
  comparison: CaseStudyComparison;
  expanded?: boolean;
}) {
  const isPortrait = comparison.layout === 'portrait';
  const imageClass = isPortrait
    ? expanded
      ? 'h-[82vh] max-h-[800px] w-auto max-w-full object-contain'
      : 'h-[360px] sm:h-[460px] w-auto max-w-full object-contain'
    : 'h-full w-full object-cover';
  const gridClass = isPortrait
    ? expanded
      ? 'grid-cols-2 justify-center gap-4 sm:grid-cols-[260px_260px] sm:gap-8'
      : 'grid-cols-2 justify-center gap-4 sm:grid-cols-[170px_170px] sm:gap-6'
    : 'grid-cols-2 gap-3 sm:gap-5';

  return (
    <div
      className={`grid ${gridClass} items-start rounded-[12px] bg-[#F3F1ED] ${
        expanded
          ? isPortrait
            ? 'w-full max-w-[760px] p-4 sm:p-6'
            : 'w-full max-w-[1480px] p-4 sm:p-6'
          : 'w-full p-4 sm:p-6'
      }`}
    >
      {([
        ['Before', comparison.before, comparison.beforeAlt],
        ['After', comparison.after, comparison.afterAlt],
      ] as const).map(([label, src, alt]) => (
        <div key={label} className="flex min-w-0 flex-col items-center gap-3">
          <span className="self-center text-[14px] font-semibold leading-5 text-[#202020] sm:text-[16px]">
            {label}
          </span>
          <div
            className={`flex min-w-0 items-start justify-center ${
              isPortrait
                ? 'w-full'
                : 'aspect-[1.217/1] w-full overflow-hidden rounded-[8px] border border-black/[0.07] bg-white shadow-[0_12px_32px_rgba(32,32,32,0.14)]'
            }`}
          >
            <img
              src={src}
              alt={alt}
              loading={expanded ? 'eager' : 'lazy'}
              className={`${imageClass} max-w-full ${
                isPortrait
                  ? 'rounded-[8px] border border-black/[0.07] bg-white shadow-[0_12px_32px_rgba(32,32,32,0.14)]'
                  : ''
              }`}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

function caseFromUrl() {
  const caseId = new URLSearchParams(window.location.search).get('case');
  return CASE_STUDIES.find((caseStudy) => caseStudy.id === caseId) ?? null;
}

export default function CaseStudiesRedesign() {
  const [activeCaseStudy, setActiveCaseStudy] = useState<CaseStudy | null>(caseFromUrl);
  const [selectedComparison, setSelectedComparison] = useState<CaseStudyComparison | null>(null);
  const activeCaseStudyRef = useRef<CaseStudy | null>(activeCaseStudy);
  const openedAt = useRef<number | null>(activeCaseStudy ? Date.now() : null);

  const openCaseStudy = (caseStudy: CaseStudy) => {
    const properties = projectProperties(caseStudy);
    track('project_card_clicked', {
      ...properties,
      has_case_study: true,
      source: 'Case Studies 独立页面',
      page_area: 'case_studies.index',
      page_area_label: '案例研究独立页面',
    });
    track('case_study_opened', {
      ...properties,
      source: 'case_study_card',
      content_source: 'yatingzhao.com',
      page_area: 'case_studies.index',
      page_area_label: '案例研究独立页面',
    });

    activeCaseStudyRef.current = caseStudy;
    openedAt.current = Date.now();
    setActiveCaseStudy(caseStudy);
    window.history.pushState({}, '', `/?view=case-studies&case=${caseStudy.id}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const closeCaseStudy = () => {
    const caseStudy = activeCaseStudyRef.current;
    if (caseStudy) {
      track('case_study_closed', {
        ...projectProperties(caseStudy),
        source: 'browser_back',
        active_open_time_ms: openedAt.current === null ? null : Date.now() - openedAt.current,
        content_source: 'yatingzhao.com',
        page_area: 'case_studies.detail',
        page_area_label: '案例研究详情',
      });
    }

    activeCaseStudyRef.current = null;
    openedAt.current = null;
    setActiveCaseStudy(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const handlePopState = () => {
      const nextCaseStudy = caseFromUrl();
      if (!nextCaseStudy && activeCaseStudyRef.current) closeCaseStudy();
      if (nextCaseStudy) {
        activeCaseStudyRef.current = nextCaseStudy;
        openedAt.current = Date.now();
        setActiveCaseStudy(nextCaseStudy);
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    if (!activeCaseStudy) return;
    document.title = `${activeCaseStudy.title} — BrewPot Case Study`;
    const engagementTimer = window.setTimeout(() => {
      track('case_study_engaged', {
        ...projectProperties(activeCaseStudy),
        active_open_time_ms: 10_000,
        engagement_threshold_ms: 10_000,
        content_source: 'yatingzhao.com',
        page_area: 'case_studies.detail',
        page_area_label: '案例研究详情',
      });
    }, 10_000);
    return () => window.clearTimeout(engagementTimer);
  }, [activeCaseStudy]);

  useEffect(() => {
    if (!selectedComparison) return;

    const previousOverflow = document.body.style.overflow;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setSelectedComparison(null);
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedComparison]);

  if (activeCaseStudy) {
    const detail = CASE_STUDY_DETAILS[activeCaseStudy.id];

    return (
      <>
        <article data-analytics-section="case_study_detail" className="min-h-screen pt-24">
          <div className="mx-auto flex w-full max-w-[1180px] flex-col gap-6 px-6 md:px-10">
          <div className="case-study-media-bg relative flex items-center justify-center w-full rounded-[12px] overflow-hidden p-6 md:p-10">
            <img
              src={detail.hero}
              alt={`${activeCaseStudy.title} Hero`}
              className={`w-full h-auto object-contain ${detail.heroBorderless ? 'rounded-none' : 'rounded-[8px] border border-black/[0.05] shadow-[0_0_24px_rgba(0,0,0,0.08)]'}`}
            />
          </div>

          <div className="mx-auto flex w-full max-w-[640px] flex-col gap-5 text-[16px] leading-[28px] text-black">
            {detail.overview.split('\n\n').map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          {detail.sections.map((section, index) => (
            <section key={`${activeCaseStudy.id}-${index}`} className="flex flex-col gap-10">
              <div className="flex flex-col gap-4">
                {section.heading && (
                  <h2 className="mx-auto w-full max-w-[640px] text-[18px] font-semibold text-black tracking-tight">{section.heading}</h2>
                )}

                {section.image && (
                  <div className={section.transparentImage
                    ? 'relative flex items-center justify-center w-full overflow-hidden'
                    : 'case-study-media-bg relative flex items-center justify-center w-full rounded-[12px] overflow-hidden p-6 md:p-10'}>
                    <img
                      src={section.image}
                      alt={section.heading ?? activeCaseStudy.title}
                      loading="lazy"
                      className={section.transparentImage
                        ? 'w-full h-auto object-contain'
                        : 'w-full h-auto object-contain rounded-[8px] border border-black/[0.05] shadow-[0_0_24px_rgba(0,0,0,0.08)]'}
                    />
                  </div>
                )}

                {section.comparison && (
                  <button
                    type="button"
                    className="block w-full cursor-zoom-in text-left"
                    aria-label={`Open ${section.heading ?? activeCaseStudy.title} comparison`}
                    onClick={() => setSelectedComparison(section.comparison ?? null)}
                  >
                    <ComparisonFrame comparison={section.comparison} />
                  </button>
                )}

                <div className="mx-auto flex w-full max-w-[640px] flex-col gap-5">
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph} className="text-[16px] leading-[28px] text-black">{paragraph}</p>
                  ))}
                </div>
              </div>
            </section>
          ))}

          </div>
        </article>
        <AnimatePresence>
          {selectedComparison && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[110] flex items-center justify-center overflow-auto bg-black/90 p-4 sm:p-10"
              role="dialog"
              aria-modal="true"
              aria-label="Case study before and after comparison"
              onClick={() => setSelectedComparison(null)}
            >
              <button
                type="button"
                className="fixed right-5 top-5 z-10 grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
                aria-label="Close case study comparison"
                onClick={() => setSelectedComparison(null)}
              >
                <X className="h-6 w-6" />
              </button>
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                className="flex w-full items-center justify-center"
                onClick={(event) => event.stopPropagation()}
              >
                <ComparisonFrame comparison={selectedComparison} expanded />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
        <Booking compact />
      </>
    );
  }

  return (
    <section id="case-studies" data-analytics-section="case_studies" className="min-h-screen bg-[#fdfcfb] pb-28 pt-28 md:pt-36">
      <div className="mx-auto max-w-[1180px] px-6 md:px-10">
        <header className="mx-auto mb-10 max-w-[760px] text-center md:mb-12">
          <h1 className="font-heading text-[40px] font-medium leading-[1.12] tracking-[-0.03em] text-[#202020] sm:text-[48px]">
            Selected Case Studies
          </h1>
          <p className="mx-auto mt-3 max-w-[620px] text-[16px] leading-6 text-[#737373] sm:text-[17px] sm:leading-7">
            A closer look at product strategy, interaction design, and interface work.
          </p>
        </header>

        <div className="grid grid-cols-1 items-start gap-5 md:grid-cols-2 md:gap-6">
          {CASE_STUDIES.map((caseStudy) => (
            <button
              type="button"
              key={caseStudy.id}
              className="group flex h-full w-full flex-col overflow-hidden rounded-[12px] border border-[#dedddb] bg-white text-left shadow-[0_8px_22px_rgba(0,0,0,0.03)] transition duration-200 hover:-translate-y-0.5 hover:border-[#c8c3bf] hover:shadow-[0_12px_30px_rgba(0,0,0,0.07)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
              onClick={() => openCaseStudy(caseStudy)}
              aria-label={`Open ${caseStudy.title} case study`}
            >
              <div className="relative flex aspect-[1.34] w-full items-center justify-center overflow-hidden border-b border-[#dedddb] bg-[#f3f1ed]">
                <div className={`flex items-center justify-center ${
                  caseStudy.id === 'notta' ? 'h-[72%] w-[72%]' : 'h-[88%] w-[88%]'
                }`}>
                  <img
                    src={caseStudy.cover}
                    alt={`${caseStudy.title} product design case study`}
                    className={`max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-[1.012] ${
                      caseStudy.id === 'vectrro'
                        ? 'rounded-none'
                        : 'rounded-[8px] border border-black/[0.04] shadow-[0_10px_30px_rgba(0,0,0,0.08)]'
                    }`}
                  />
                </div>
              </div>

              <div className="flex w-full items-end justify-between gap-5 px-5 pb-5 pt-5 sm:px-6 sm:pb-6 sm:pt-6">
                <div className="min-w-0">
                  <h2 className="font-heading text-[24px] font-medium leading-7 tracking-[-0.025em] text-[#202020]">{caseStudy.title}</h2>
                  <p className="mt-1.5 flex flex-wrap items-center gap-x-2 text-[14px] leading-5 text-[#737373]">
                    <span>{caseStudy.subtitle}</span>
                    <span className="text-[#bbb6b0]" aria-hidden="true">·</span>
                    <span>{caseStudy.fundingStage}</span>
                  </p>
                </div>

                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-[#d8d5d2] bg-[#fdfcfb] text-[#202020] transition duration-200 group-hover:border-[#e94f37] group-hover:text-[#e94f37]" aria-hidden="true">
                  <ArrowUpRight className="h-[19px] w-[19px]" strokeWidth={1.8} />
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
